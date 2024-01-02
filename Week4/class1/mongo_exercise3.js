import * as dbRtns from "./db_routines.js";
const rawJSON = `[{"name":"Srestha", "country":"France","text":"","date":""}]`;
const addSomeUsers = async () => {
    let someUsers = JSON.parse(rawJSON);
    try {
        const db = await dbRtns.getDBInstance();
        let resultArray = await Promise.allSettled(
            // don't await this because we don't need any results immediately
            someUsers.map((advisory) => dbRtns.addOne(db, "advisories", advisory))
        );
        resultArray.forEach((result) => {
            result.value.acknowledged
                ? console.log(
                    `Promise ${result.status} and document added to advisorys collection`
                )
                : console.log(
                    `Promise ${result.status} and document not added to advisorys collection`
                );
        });
        let count = await dbRtns.count(db, "advisories");
        console.log(
            `there are currently ${count} documents in the advisorys collection`
        );
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
addSomeUsers();
