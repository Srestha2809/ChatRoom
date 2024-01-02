import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import * as cfg from "./config.js";
import * as dbRtns from "./db_routines.js";

const argv = yargs(hideBin(process.argv))
    .option({
        code: {
            demandOption: true,
            describe: "Enter the country code",
            string: true,
        }
    })
    .help()
    .alias("help", "h")
    .parse();

const element = async () => {
    try {
        let value = await dbRtns.getJSONFromWWWPromise(cfg.link);
        const db = await dbRtns.getDBInstance();

        let call = value.map((result) => ({ name: result.name, code: result["alpha-2"] }));

        let count = await dbRtns.count(db, cfg.collect);
        console.log(
            `there are currently ${count} documents in the countries collection`
        );
        let results = await dbRtns.deleteAll(db, cfg.collect);
        console.log(
            `deleted ${results.deletedCount} documents from countries collection`
        );
        results = await dbRtns.addMany(db, cfg.collect, call);
        console.log(
            `there are now ${results.insertedCount} documents to the countries collection`
        );

        let someUser = await dbRtns.findOne(db, cfg.collect, { code: argv.code });
        if (someUser === null) {
            console.log(`The code ${argv.code} is not known in country alpha-3 code`);

        }
        else {
            console.log(
                `The code ${someUser.code} belongs to the country of ${someUser.name}`
            );
        }

        process.exit(0);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
element();