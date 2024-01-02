import { config } from "dotenv";
config();
export const json = process.env.COUNTRIES;
export const link = process.env.ISOCOUNTRIES;