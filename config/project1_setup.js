import * as rtnLib from "./utilities.js";
import * as cfg from "./config.js";
import * as dbRtns from "./db_routines.js";
let loadAlerts = async () => {
  let textAlerts = "";
  let alertObjectArray = [];
  try {
    // Get the DB instance
    const db = await dbRtns.getDBInstance();

    // Clean out collection of alerts
    let results = await dbRtns.deleteAll(db, cfg.alerts);
    console.log(
      `deleted ${results.deletedCount} documents from the ${cfg.alerts} collection`
    );
    textAlerts += `Deleted ${results.deletedCount} documents from the ${cfg.alerts} collection. `;

    // Fetch the data from the url and write it to the countries.json file
    let isoCountryData = await rtnLib.getJSONFromWWWPromise(cfg.isoCountryJson);

    let alertsData = await rtnLib.getJSONFromWWWPromise(cfg.gocAlerts);

    isoCountryData.forEach((country) => {
      let alertsDataObj = alertsData.data[country["alpha-2"]];
      if (alertsDataObj) {
        alertObjectArray.push({
          country: country["alpha-2"],
          name: country["name"],
          text: alertsDataObj["eng"]["advisory-text"],
          date: alertsDataObj["date-published"]["date"],
          region: country["region"],
          subregion: country["sub-region"],
        });
      } else {
        alertObjectArray.push({
          country: country["alpha-2"],
          name: country["name"],
          text: "No travel alerts",
          date: "",
          region: country["region"],
          subregion: country["sub-region"],
        });
      }
    });

    console.log(`Retrieved Alert JSON from remote web site.`);
    console.log(`Retrieved Country JSON from GitHub.`);
    textAlerts += `Retrieved Alert JSON from remote web site. Retrieved Country JSON from GitHub.`;

    results = await dbRtns.addMany(db, cfg.alerts, alertObjectArray);
    console.log(
      `added ${results.insertedCount} documents in the ${cfg.alerts} collection`
    );
    textAlerts += ` Added ${results.insertedCount} documents in the ${cfg.alerts} collection.`;
  } catch (err) {
    console.log(err);
  } finally {
    return { results: textAlerts };
  }
};
export { loadAlerts };
