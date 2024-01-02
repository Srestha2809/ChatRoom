import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import * as cfg from "./config.js";
import * as rtnLib from "./routines.js";

const argv = yargs(hideBin(process.argv))
    .options({
        refresh: {
            demandOption: false,

            describe: "is a fresh copy from the web required?",
            string: true,
        }

    })
    .help()
    .alias("help", "h")
    .parse();

const dotEnvWrite = async () => {
    try {
        let fileStats = await rtnLib.fileStatsFromFSPromise(cfg.json);
        if (!fileStats || argv.refresh === "") {
            let value = await rtnLib.getJSONFromWWWPromise(cfg.link);
            await rtnLib.writeFileFromFSPromise(cfg.json, value);

            fileStats = await rtnLib.fileStatsFromFSPromise(cfg.json);
            if (!fileStats) {
                console.log(`${cfg.json} file was read on ${fileStats.ctime}`);
            }
            else {
                console.log(`A new ${cfg.json} file was written to the system.`);
            }

        } else {
            console.log(`An existing ${cfg.json} file was readfrom the file system.`);
        }
        let countryData = await rtnLib.readFileFromFSPromise(cfg.json);
        let x = JSON.parse(countryData).length;

        console.log(`${cfg.json} was created on ${fileStats.ctime}`);
        console.log(`There are ${x} codes in ${cfg.json}`);

    } catch (err) {
        console.log(err);
        console.log(`${cfg.json} file not written to file system`);
    }
};
dotEnvWrite();    