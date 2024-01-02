import * as cfg from "./config.js";
import * as dbRtns from "./db_routines.js";
import { loadAlerts } from "./project1_setup.js";
const resolvers = {
  project1_setup: async () => {
    return await loadAlerts();
  },
  alerts: async () => {
    let db = await dbRtns.getDBInstance();
    let data = await dbRtns.findAll(db, cfg.alerts, {}, {});
    return data;
  },
  alertsforregion: async (args) => {
    let db = await dbRtns.getDBInstance();
    let data = await dbRtns.findAll(
      db,
      cfg.alerts,
      { region: args.region },
      {}
    );
    return data;
  },
  alertsforsubregion: async (args) => {
    let db = await dbRtns.getDBInstance();
    let data = await dbRtns.findAll(
      db,
      cfg.alerts,
      { subregion: args.subregion },
      {}
    );
    return data;
  },
  regions: async () => {
    let db = await dbRtns.getDBInstance();
    let data = await dbRtns.findUniqueValues(db, cfg.alerts, "region");
    return data;
  },
  subregions: async () => {
    let db = await dbRtns.getDBInstance();
    let data = await dbRtns.findUniqueValues(db, cfg.alerts, "subregion");
    return data;
  },
  advisories: async () => {
    let db = await dbRtns.getDBInstance();
    let data = await dbRtns.findUniqueValues(
      db,
      cfg.advisorycollection,
      "name"
    );
    return data;
  },
  addAdvisory: async (args) => {
    const db = await dbRtns.getDBInstance();

    const usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    const time = new Date(usaTime);
    time.setHours(time.getHours() - 5);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "America/New_York",
    };
    const formattedTime = time.toLocaleString("en-US", options);
    const formattedDate = time.toISOString().slice(0, 10);
    const currentDate = formattedDate.replace(/-/g, "/");
    const alerts = await dbRtns.findAll(db, cfg.alerts, {}, {});
    const alertObj = alerts.find((element) => element.name === args.country);
    const alertInfo = alertObj.text;

    const advisory = {
      name: args.name,
      country: args.country,
      date: `${currentDate} ${formattedTime}`,
      text: alertInfo,
    };

    const results = await dbRtns.addOne(db, cfg.advisorycollection, advisory);

    return results.insertedCount === 1 ? null : advisory;
  },
  alertsByName: async (args) => {
    let db = await dbRtns.getDBInstance();
    let data = await dbRtns.findAll(
      db,
      cfg.advisorycollection,
      { name: args.name },
      {}
    );
    return data;
  },
};
export { resolvers };
