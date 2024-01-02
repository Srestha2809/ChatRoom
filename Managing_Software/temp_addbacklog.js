import * as cfg from "./config.js";
import * as dbRtns from "./db_routines.js";
const backlogJSON = `[{"projectname":"Sprint Compass", "description":"A product to assist in the planning of other tasks/assignments", "startDate": "12-03-2023",  "endDate": "13-03-2023"}]`;
const addBacklogs = async () => {
    let backlogs = JSON.parse(backlogJSON);
    try {
        const db = await dbRtns.getDBInstance();
        //clean out collection before adding new users
        let results = await dbRtns.deleteAll(db, cfg.basicinfoCollection);
        console.log(
            `deleted ${results.deletedCount} documents from the users collection`
        );
        results = await dbRtns.addMany(db, cfg.basicinfoCollection, backlogs);
        console.log(
            `added ${results.insertedCount} documents to the user collection`
        );
        process.exit(0);
    } catch (err) {
        console.log("Error: " + err);
        process.exit(1);
    }
};
addBacklogs();