const schema = `
type Query {
 project1_setup: results,
 alerts: [Alert],
 alertsfortravel(name: String): [Advisory],
 alertsforregion(region: String): [Alert],
 alertsforsubregion(subregion: String): [Alert],
 regions: [String],
 subregions: [String],
 travel: [String]
 },
type results{
 results: String   
},
type Alert {
country: String
name: String
text: String
date: String
region: String
subregion: String
},
type Mutation1 {
 addAlert(country: String, name: String, text: String): Alert
},
type Advisory{
 name: String
 country: String
 date: String
 text: String
},
type Mutation {
 addaddvisory(name: String, country: String): Advisory
}
`;
export { schema };