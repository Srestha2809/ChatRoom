import { config } from "dotenv";
config();
export const atlas = process.env.DBURL;
export const appdb = process.env.DB;
export const basicinfoCollection = process.env.BASICINFOCOLLECTION;
export const memberCollection = process.env.MEMBERCOLLECTION;
export const backlogCollection = process.env.BACKLOGCOLLECTION;
export const port = process.env.PORT;