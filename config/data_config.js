import { config } from "dotenv";

config(); 

export const PORT = process.env.PORT || 3000;

export const PG_PORT = process.env.PG_PORT || 5432;
export const PG_HOST = process.env.PG_HOST || "localhost";
export const PG_USER = process.env.PG_USER || "benja";
export const PG_PASSWORD = process.env.PG_PASSWORD || "benja123";
export const PG_DATABASE = process.env.PG_DATABASE || "ecommerce";

export const ORIGIN = process.env.ORIGIN || "http://localhost:5173";
