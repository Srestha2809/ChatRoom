import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
import * as setup from "./project1_setup.js"
const resolvers = {

    project1_setup: async () => {
        try {
            const result = await setup.getCounts();
            return result;
        }
        catch (error) {
            throw new Error(error);
        }
    },
    alerts: async () => {
        try {
            let db = await dbRtns.getDBInstance();
            return await dbRtns.findAll(db, cfg.collect, {}, {});
        } catch (error) {
            throw new Error(error);
        }
    },
    alertsforregion: async (args) => {
        try {
            let db = await dbRtns.getDBInstance();
            return await dbRtns.findAll(db, cfg.collect, { region: args.region }, {});
        }
        catch (error) {
            throw new Error(error);
        }
    },
    alertsfortravel: async (args) => {
        try {
            let db = await dbRtns.getDBInstance();
            return await dbRtns.findAll(db, cfg.advisoriescollection, { name: args.name }, {});
        }
        catch (error) {
            throw new Error(error);
        }
    },
    alertsforsubregion: async (args) => {
        try {
            let db = await dbRtns.getDBInstance();
            return await dbRtns.findAll(db, cfg.collect, { subregion: args.subregion }, {});
        }
        catch (error) {
            throw new Error(error);
        }
    },
    regions: async () => {
        try {
            let db = await dbRtns.getDBInstance();
            return await dbRtns.findUniqueValues(db, cfg.collect, 'region');
        }
        catch (error) {
            throw new Error(error);
        }
    },
    subregions: async () => {
        try {
            let db = await dbRtns.getDBInstance();
            return await dbRtns.findUniqueValues(db, cfg.collect, 'subregion');
        }
        catch (error) {
            throw new Error(error);
        }
    },
    travel: async () => {
        try {
            let db = await dbRtns.getDBInstance();
            return await dbRtns.findUniqueValues(db, cfg.advisoriescollection, 'name');
        }
        catch (error) {
            throw new Error(error);
        }
    },
    addAlert: async (args) => {
        try {
            let db = await dbRtns.getDBInstance();
            const currentDate = new Date().toISOString();
            const alert = {
                name: args.name, country: args.country, text: args.text, date: currentDate
            };
            const rsult = await dbRtns.addOne(db, cfg.collect, alert);
            return rsult.acknowledged === 1 ? null : alert;
        }
        catch (error) {
            throw new Error(error);
        }
    },
    addaddvisory: async (args) => {
        const db = await dbRtns.getDBInstance();

        const torontoTime = new Date().toLocaleString("en-US", {
            timeZone: "America/Toronto",
        });
        const time = new Date(torontoTime);
        time.setHours(time.getHours() - 5); // Convert to UTC
        time.setHours(time.getHours() - 4); // Convert to Toronto time (UTC-4)
        const options = {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "America/Toronto",
        };
        const formattedTime = time.toLocaleString("en-US", options);
        const formattedDate = time.toISOString().slice(0, 10);
        const currentDate = formattedDate.replace(/-/g, "/");
        const alerts = await dbRtns.findAll(db, cfg.collect, {}, {});
        const alertObj = alerts.find((element) => element.name === args.country);
        const alertInfo = alertObj.text;

        const advisory = {
            name: args.name,
            country: args.country,
            date: `${currentDate} ${formattedTime}`,
            text: alertInfo,
        };

        const results = await dbRtns.addOne(db, cfg.advisoriescollection, advisory);

        return results.insertedCount === 1 ? null : advisory;
    },
};

export { resolvers };