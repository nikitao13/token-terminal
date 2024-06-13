// WEBSOCKET SERVER
// listening for new Raydium V4 liquidity pool program logs on the Solana Blockchain
import https from "https";
import http from 'http';
import fs from "fs";
import { Server } from "socket.io";
import { MongoClient } from "mongodb";
import {
  PORT,
  RPC_URL,
  WSS_URL,
  RAYDIUM_PROGRAM_ID,
  INSTRUCTION_NAME,
  SOLANA_TOKEN_ADDRESS,
  TOKEN_A_INDEX,
  TOKEN_B_INDEX,
  MONGO_URI,
  DB_NAME,
  COLLECTION_NAME
} from "./config/config.js";
import { Connection } from "@solana/web3.js";

const connection = new Connection(RPC_URL, {
  wsEndpoint: WSS_URL
});

const client = new MongoClient(MONGO_URI);
await client.connect();
const db = client.db(DB_NAME);
const collection = db.collection(COLLECTION_NAME);
console.log("MongoDB initialized");

let lastProcessedSignature = null;
let retryDelay = 500;
let logsSubscriptionId = null;
let isShuttingDown = false;

let server;

if (process.env.NODE_ENV === 'production') {
  console.log("Running in PRODUCTION");
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/zk13.xyz/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/zk13.xyz/fullchain.pem')
  };
  server = https.createServer(options);
} else {
  console.log("Running in DEVELOPMENT");
  server = http.createServer();
}

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*"
  }
});

async function startConnection(connection, programAddress, searchInstruction) {
  console.log(
    "Monitoring logs for program:",
    programAddress.toString() + "..."
  );
  logsSubscriptionId = connection.onLogs(
    programAddress,
    ({ logs, err, signature }) => {
      if (err) return;
      if (logs && logs.some((log) => log.includes(searchInstruction))) {
        if (signature !== lastProcessedSignature) {
          fetchRaydiumMints(signature, connection);
          lastProcessedSignature = signature;
        }
      }
    },
    "finalized"
  );
}

async function fetchRaydiumMints(txId, connection) {
  try {
    const tx = await connection.getParsedTransaction(txId, {
      maxSupportedTransactionVersion: 0,
      commitment: "confirmed"
    });

    const instruction = tx?.transaction.message.instructions.find(
      (ix) => ix.programId.toBase58() === RAYDIUM_PROGRAM_ID.toBase58()
    );

    if (!instruction) {
      console.log("No instruction found in the transaction.");
      return;
    }

    const accounts = instruction.accounts;
    const tokenAAccount = accounts[TOKEN_A_INDEX];
    const tokenBAccount = accounts[TOKEN_B_INDEX];

    let newLpPair;

    if (tokenAAccount.toBase58() !== SOLANA_TOKEN_ADDRESS) {
      newLpPair = tokenAAccount.toBase58();
    } else if (tokenBAccount.toBase58() !== SOLANA_TOKEN_ADDRESS) {
      newLpPair = tokenBAccount.toBase58();
    }

    if (newLpPair) {
      const now = new Date();
      const utcTime = now.toISOString();
      console.log("\nNew LP found");
      let logObject = {};
      logObject[utcTime] = newLpPair;
      console.table(logObject);

      await collection.insertOne({ utcTime, newLpPair });

      const count = await collection.countDocuments();
      if (count > 15) {
        const oldest = await collection
          .find()
          .sort({ utcTime: 1 })
          .limit(1)
          .toArray();
        if (oldest.length > 0) {
          await collection.deleteOne({ _id: oldest[0]._id });
        }
      }

      io.emit("new_lp_pair", { utcTime, newLpPair });
    }
  } catch (error) {
    console.log("Error fetching transaction:", txId);
    console.log(error.message);
    handleRetry(txId, connection);
  }
}

async function handleRetry(txId, connection) {
  if (isShuttingDown) return;

  console.log(
    `Server responded with 429 Too Many Requests. Retrying after ${retryDelay}ms delay...`
  );
  const delay = retryDelay + Math.random() * 1000;
  setTimeout(async () => {
    try {
      await fetchRaydiumMints(txId, connection);
      retryDelay = 30000;
    } catch (error) {
      retryDelay = Math.min(retryDelay * 2, 300000);
      handleRetry(txId, connection);
    }
  }, delay);
}

io.on("connection", async (socket) => {
  console.log(
    `client connected: ${socket.id} from ${socket.handshake.headers.origin}`
  );

  const latestLps = await collection
    .find()
    .sort({ utcTime: -1 })
    .limit(15)
    .toArray();
  socket.emit("initial_lp_pairs", latestLps);
});

function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log("Shutting down...");
  if (logsSubscriptionId) {
    connection.removeOnLogsListener(logsSubscriptionId);
  }
  server.close(() => {
    console.log("Server closed");
    client.close(() => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startConnection(connection, RAYDIUM_PROGRAM_ID, INSTRUCTION_NAME).catch(
  console.error
);

server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`);
});
