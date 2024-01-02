// different fs library from week 1
import { promises as fsp } from "fs";
import got from "got";
const getJSONFromWWWPromise = async (url) => {
  let data;
  try {
    data = await got(url).json();
  } catch (error) {
    console.log(error);
  }
  return data;
};

export { getJSONFromWWWPromise };
