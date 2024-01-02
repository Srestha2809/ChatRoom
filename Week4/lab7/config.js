import { config } from 'dotenv';
config();
export const atlas = process.env.DBURL;
export const appdb = process.env.DB;
export const link = process.env.ISOCOUNTRIES;
export const collect = process.env.COLLECTION;
export const port = process.env.PORT;
export const graphql = process.env.GRAPHQLURL;