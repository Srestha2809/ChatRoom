const schema = `
type Query {
    backlogs: [Backlog],
    members: [Member],
    getbacklog: [Backlog],
    basicinfo: [BasicInfo]
},
type BasicInfo {
    _id: ID!,
    projectname: String,
    description: String,
    startDate: String,
    endDate: String
},
type Member {
   _id: String,
   name: String,
   role: String
},
type Subtask {
    description: String,
    actualhour: Float,
    reestimate: Float
},
type Backlog {
    _id: String,
    sprint: String,
    asa: String,
    iwantto: String,
    sothatican: String,
    re: Float,
    rc: Float,
    member: String,
    actualhour: Float,
    subtask: [Subtask],
    reestimate: Float
},
type Mutation {
    updatebacklog(
        _id: String,
        sprint: String,
        asa: String,
        iwantto: String,
        sothatican: String,
        re: Float,
        rc: Float,
        member: String,
        actualhour: Float,
        subtask: [SubtaskInput],
        reestimate: Float
    ): Backlog,
    addmember(name: String, role: String): Member,
    editmember(_id: String, name: String, role: String): Member,
    deletemember(name: String): Member,
    editbacklog(_id: String, sprint: String, asa: String, iwantto: String, sothatican: String, re: Float, rc: Float, member: String, actualhour: Float, subtask: [ISubtask], reestimate: Float): Backlog,
    addBacklog(sprint: String, asa: String, iwantto: String, sothatican: String, re: Float, rc: Float, member: String, actualhour: Float, subtask: [SubtaskInput], reestimate: Float): Backlog,
    deleteBacklog(_id: String): Backlog,
    addBasicInfo(projectname: String, description: String, startDate: String, endDate: String): BasicInfo,
    deleteBasicInfo(_id: ID!): BasicInfo
},
input SubtaskInput {
    description: String!,
    actualhour: Float!,
    reestimate: Float!
},
input ISubtask {
   description: String!
   actualhour: Float!
   reestimate: Float!
},
input IBacklog {
  sprint: String!
  asa: String!
  iwantto: String!
  sothatican: String!
  re: Float!
  rc: Float!
  member: String!
  actualhour: Float!
  subtask: [ISubtask]!
  reestimate: Float!
}
`;
export { schema };
