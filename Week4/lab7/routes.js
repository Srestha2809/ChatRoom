import * as cfg from "./config.js";
import * as dbRtns from "./db_routines.js";
import { Router } from "express";


const element = async (code) => {
    try {
        const db = await dbRtns.getDBInstance();

        let someUser = await dbRtns.findOne(db, cfg.collect, { code: code });


        return someUser;
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
const router = Router();
// define a default route
router.get("/", (req, res) => {
    res
        .status(200)
        .send({ msg: `this would be a response from the default route` });
});


// define a get route with a name parameter
router.get("/:name", async (req, res) => {
    let code = req.params.name;
    let someUser = await element(code);
    if (someUser === null) {
        res
            .status(200)
            .send(
                `The code ${code} is not known in country alpha-2 code`);
    }
    else {
        res
            .status(200)
            .send(
                `The code ${code} belongs to the country of ${someUser.name} `);
    }


});
export default router;
