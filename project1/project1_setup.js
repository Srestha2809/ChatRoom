import * as cfg from "./config.js";
import * as dbRtns from "./db_routines.js";

const getCounts = async () => {
    let results = '';
    let callAlert = [];
    try {


        const db = await dbRtns.getDBInstance();
        let countryJson = await dbRtns.getJSONFromWWWPromise(cfg.countryJson);
        let alertJson = await dbRtns.getJSONFromWWWPromise(cfg.alertJson);

        console.log("Retrieved Alert JSON from remote web site.");
        console.log("Retrieved Country JSON from remote GitHub.")
        let resul = await dbRtns.deleteAll(db, cfg.collect);
        console.log(
            `deleted ${resul.deletedCount} documents from countries collection`
        );
        results += `deleted ${resul.deletedCount} documents from countries collection. `

        callAlert = countryJson.map((result) => {
            let alert = {};
            let a = alertJson.data[result["alpha-2"]];
            if (a) {
                alert = {
                    country: result["alpha-2"], name: result.name,
                    text: alertJson.data[result["alpha-2"]].eng["advisory-text"],
                    date: alertJson.data[result["alpha-2"]]["date-published"].date,
                    region: result.region, subregion: result["sub-region"]
                };
            }
            else {
                alert = {
                    country: result["alpha-2"], name: result.name,
                    text: "No travel alerts",
                    date: "",
                    region: result.region, subregion: result["sub-region"]
                };
            }
            return alert;
        })

        resul = await dbRtns.addMany(db, cfg.collect, callAlert);
        console.log(
            `added ${resul.insertedCount} documents to the alerts collection`
        );
        results += `Retrieved Alert JSON from remote web site.Retrieved Country JSON from remote GitHub. Added ${resul.insertedCount} documents to the alerts collection`;

    }
    catch (error) {
        console.log(error.message);
    } finally {
        return { results: results, alters: callAlert };
    }
};

export { getCounts };