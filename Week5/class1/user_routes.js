import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
import { Router } from "express";
const user_router = Router();
// define a default route to retrieve all users
user_router.get("/", async (req, res) => {
    try {
        let db = await dbRtns.getDBInstance();
        let users = await dbRtns.findAll(db, cfg.collection);
        res.status(200).send({ users: users });
    } catch (err) {
        console.log(err.stack);
        res.status(500).send("get all users failed - internal server error");
    }
});

user_router.post("/", async (req, res) => {
    try {
        let db = await dbRtns.getDBInstance();
        let user = req.body;
        await dbRtns.addOne(db, cfg.collection, user);
        res.status(200).send("user added");
    } catch (err) {
        console.log(err.stack);
        res.status(500).send("add user failed - internal server error");
    }
});

user_router.get("/:name", async (req, res) => {
    try {
        let db = await dbRtns.getDBInstance();
        let name = { name: req.params.name };
        let user = await dbRtns.findOne(db, cfg.collection, name);
        if (user) {
            return res.status(200).send({ user: user });
        }
        else {
            return res.status(404).send("finding user failed");
        }

    }
    catch (err) {
        console.log(err.stack);
        res.status(500).send("finding user failed");
    }


});


user_router.put("/", async (req, res) => {
    try {
        let db = await dbRtns.getDBInstance();
        let user = req.body;
        let msg = "";
        let updateResults = await dbRtns.updateOne(db, cfg.collection, { name: user.name }, { age: user.age, email: user.email });
        updateResults.lastErrorObject.updatedExisting
            ? (msg = `user data ${updateResults.value.name} was updated`)
            : res.status(404).send({ msg: `user data not found` });
        res.status(200).send({ msg: msg });

    } catch (err) {
        console.log(err.stack);
        res.status(500).send("updating user failed - internal server error");
    }
});

user_router.delete("/:name", async (req, res) => {
    try {
        let db = await dbRtns.getDBInstance();
        let msg = "";
        let deletedResult = await dbRtns.deleteOne(db, cfg.collection, { name: req.params.name });
        if (deletedResult.deletedCount === 1) {
            (msg = `1 user data was deleted`)
        } else {
            return res.status(404).send({ msg: `user data not found` });
        }

        res.status(200).send({ msg: msg });
    }
    catch (err) {
        console.log(err.stack);
        res.status(500).send("delete user failed - internal server error");
    }


});


export default user_router;
