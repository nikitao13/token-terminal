/* eslint-env node */

import { config } from "dotenv";
import { Connection, PublicKey } from "@solana/web3.js";
import { Server } from "socket.io";
import http from "http";

config();

const RPC_URL = process.env.RPC2;
const WSS_URL = process.env.WSS2;
const RAYDIUM_PROGRAM_ID = new PublicKey(
  "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"
);
const INSTRUCTION_NAME = "initialize2";
const SOLANA_TOKEN_ADDRESS = "So11111111111111111111111111111111111111112";
const TOKEN_A_INDEX = 8;
const TOKEN_B_INDEX = 9;

const connection = new Connection(RPC_URL, {
  wsEndpoint: WSS_URL
});

let lastProcessedSignature = null;
let retryDelay = 500;
let logsSubscriptionId = null;
let isShuttingDown = false;

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*"
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
      const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      console.log("\nnew LP found");
      let logObject = {};
      logObject[time] = newLpPair;
      console.table(logObject);

      io.emit("new_lp_pair", { time, newLpPair });
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

function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log("Shutting down...");
  if (logsSubscriptionId) {
    connection.removeOnLogsListener(logsSubscriptionId);
  }
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startConnection(connection, RAYDIUM_PROGRAM_ID, INSTRUCTION_NAME).catch(
  console.error
);

server.listen(3001, () => {
  console.log("WebSocket server listening on port 3001");
});
