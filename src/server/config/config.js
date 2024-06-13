import dotenv from 'dotenv';
import { PublicKey } from '@solana/web3.js';

dotenv.config();

export const PORT = process.env.PORT || 3001;
export const RPC_URL = process.env.RPC;
export const WSS_URL = process.env.WSS;
export const RAYDIUM_PROGRAM_ID = new PublicKey('675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8');
export const INSTRUCTION_NAME = 'initialize2';
export const SOLANA_TOKEN_ADDRESS = 'So11111111111111111111111111111111111111112';
export const TOKEN_A_INDEX = 8;
export const TOKEN_B_INDEX = 9;
export const MONGO_URI = process.env.MONGO_URI;
export const DB_NAME = process.env.DB_NAME;
export const COLLECTION_NAME = process.env.COLLECTION_NAME;