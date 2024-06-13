import dotenv from 'dotenv';
import { PublicKey } from '@solana/web3.js';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

export const PORT = process.env.PORT;
export const RPC_URL = isProd ? process.env.RPC : process.env.RPC2;
export const WSS_URL = isProd ? process.env.WSS : process.env.WSS2;
export const RAYDIUM_PROGRAM_ID = new PublicKey('675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8');
export const INSTRUCTION_NAME = 'initialize2';
export const SOLANA_TOKEN_ADDRESS = 'So11111111111111111111111111111111111111112';
export const TOKEN_A_INDEX = 8;
export const TOKEN_B_INDEX = 9;
export const MONGO_URI = process.env.MONGO_URI;
export const DB_NAME = process.env.DB_NAME;
export const COLLECTION_NAME = process.env.COLLECTION_NAME;