import got from "got";
import { promises as fsp } from "fs";

const fileStatsFromFSPromise = async (fname) => {
    let stats;
    try {
        stats = await fsp.stat(fname);
    } catch (error) {
        error.code === "ENOENT" // doesn't exist
            ? console.log("./countries.json does not exist")
            : console.log(error.message);
    }
    return stats;
};


const getJSONFromWWWPromise = async (url) => await got(url).json();

const writeFileFromFSPromise = async (fname, ...rawdata) => {
    let filehandle;
    try {
        filehandle = await fsp.open(fname, "w");
        let dataToWrite = "";
        rawdata.forEach((element) => (dataToWrite += JSON.stringify(element)));
        await fsp.writeFile(fname, dataToWrite);
    } catch (err) {
        console.log(err);
    } finally {
        if (filehandle !== undefined) {
            await filehandle.close();
        }
    }
};

const readFileFromFSPromise = async (fname) => {
    let rawData;
    try {
        rawData = await fsp.readFile(fname);
    } catch (error) {
        console.log(error);
    } finally {
        if (rawData !== undefined) return rawData;
    }
};

export {
    fileStatsFromFSPromise, getJSONFromWWWPromise, readFileFromFSPromise, writeFileFromFSPromise
};

