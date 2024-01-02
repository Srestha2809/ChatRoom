const schema = `
type Query {
  members: [Member],
  getbacklog: [Backlog]
},
type Member {
  _id: String,
  name: String,
  role: String
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
type Subtask {
  description: String,
  actualhour: Float,
  reestimate: Float
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
},
type Mutation {
  addmember(name: String, role: String): Member,
  editmember(_id: String, name: String, role: String): Member,
  deletemember(name: String): Member,
  editbacklog(_id: String, sprint: String, asa: String, iwantto: String, sothatican: String, re: Float, rc: Float, member: String, actualhour: Float, subtask: [ISubtask], reestimate: Float): Backlog,
  addBacklog(backlog: IBacklog!): Backlog,
  deleteBacklog(_id: String): Backlog,
}
`;
export { schema };
