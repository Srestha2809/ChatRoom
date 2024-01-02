import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
const resolvers = {
  members: async () => {
    let db = await dbRtns.getDBInstance();
    let results = await dbRtns.findAll(db, cfg.memberCollection, {}, {});
    return results;
  },
  addmember: async (args) => {
    let db = await dbRtns.getDBInstance();
    let member = { name: args.name, role: args.role };
    let results = await dbRtns.addOne(db, cfg.memberCollection, member);
    return results.acknowledged ? member : null;
  },
  editmember: async (args) => {
    let db = await dbRtns.getDBInstance();
    let member = { name: args.name, role: args.role };
    let members = await dbRtns.findAll(db, cfg.memberCollection, {}, {});
    let chosenId = members.find(member => member._id.toString() == args._id)._id;
    results = await dbRtns.updateOne(db, cfg.memberCollection, { _id: chosenId }, member);
    return results.acknowledged ? member : null;
  },
  deletemember: async (args) => {
    let db = await dbRtns.getDBInstance();
    let results = await dbRtns.deleteOne(db, cfg.memberCollection, { name: args.name });
    return results.acknowledged ? results : null;
  },
  getbacklog: async () => {
    let db = await dbRtns.getDBInstance();
    let results = await dbRtns.findAll(db, cfg.backlogCollection, {}, {});
    return results
  },
  editbacklog: async (args) => {
    let db = await dbRtns.getDBInstance();
    let backlog = { sprint: args.sprint, asa: args.asa, iwantto: args.iwantto, sothatican: args.sothatican, re: args.re, rc: args.rc, member: args.member, actualhour: args.actualhour, subtask: args.subtask, reestimate: args.reestimate };
    let backlogs = await dbRtns.findAll(db, cfg.backlogCollection, {}, {});
    let chosenId = backlogs.find(backlog => backlog._id.toString() == args._id)._id;
    let results = await dbRtns.updateOne(db, cfg.backlogCollection, { _id: chosenId }, backlog);
    return results;
  },
  deleteBacklog: async (args) => {
    let db = await dbRtns.getDBInstance();
    let backlogs = await dbRtns.findAll(db, cfg.backlogCollection, {}, {});
    let chosenId = backlogs.find(backlog => backlog._id.toString() == args._id)._id;
    let results = await dbRtns.deleteOne(db, cfg.backlogCollection, { _id: chosenId });
    return results.acknowledged ? results : null;
  },

  addBacklog: async (args) => {
    let db = await dbRtns.getDBInstance();
    let backlog = args.backlog;
    let insertedBacklog = await dbRtns.addOne(db, cfg.backlogCollection, backlog);
    if (insertedBacklog) {
      return insertedBacklog; // Return the inserted object with the _id field populated
    } else {
      throw new Error("Failed to add backlog");
    }
  },
  addOne: async (db, collectionName, obj) => {
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(obj);
    return result.ops[0]; // Return the inserted object
  },
};

export { resolvers };