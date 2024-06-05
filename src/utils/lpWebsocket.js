/* eslint-env node */

import { config } from "dotenv";
import { Connection, PublicKey } from "@solana/web3.js";
import { Server } from "socket.io";
import http from "http";

config();

const rpc_url = process.env.RPC;
const wss_url = process.env.WSS;
const raydium_pub_key = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8";

const raydium = new PublicKey(raydium_pub_key);
const instruction_name = "initialize2";

const connection = new Connection(rpc_url, {
  wsEndpoint: wss_url
});

let lastProcessedSignature = null;
let retryDelay = 500;

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

async function startConnection(connection, programAddress, searchInstruction) {
  console.log(
    "monitoring logs for program:",
    programAddress.toString() + "..."
  );
  connection.onLogs(
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
      (ix) => ix.programId.toBase58() === raydium_pub_key
    );

    if (!instruction) {
      console.log("No instruction found in the transaction.");
      return;
    }

    const accounts = instruction.accounts;

    const tokenAIndex = 8;
    const tokenBIndex = 9;

    const tokenAAccount = accounts[tokenAIndex];
    const tokenBAccount = accounts[tokenBIndex];

    const solanaTokenAddress = "So11111111111111111111111111111111111111112";
    let newLpPair;

    if (tokenAAccount.toBase58() !== solanaTokenAddress) {
      newLpPair = tokenAAccount.toBase58();
    } else if (tokenBAccount.toBase58() !== solanaTokenAddress) {
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
    console.log("error fetching transaction:", txId);
    console.log(error.message);
    handleRetry(txId, connection);
  }
}

async function handleRetry(txId, connection) {
  console.log(
    `server responded with 429 too many requests.\nretrying after ${retryDelay}ms delay...`
  );
  setTimeout(async () => {
    try {
      await fetchRaydiumMints(txId, connection);
      retryDelay = 3000;
    } catch (error) {
      retryDelay = Math.min(retryDelay * 2, 32000);
      handleRetry(txId, connection);
    }
  }, retryDelay);
}

function shutdown() {
  console.log("Shutting down gracefully...");
  connection.removeAllListeners();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startConnection(connection, raydium, instruction_name).catch(console.error);

server.listen(3001, () => {
  console.log("websocket server listening on port 3001");
});
