const schema = ` 
type Query {
 project1_setup: Results
 alerts: [Alert]
 alertsforregion(region: String): [Alert]
 alertsforsubregion(subregion: String): [Alert]
 regions: [String]
 subregions: [String]
 advisories: [String]
 alertsByName(name: String) : [Alert]
 },
type Results {
 results: String
}
type Alert {
 country: String
 name: String
 text: String
 date: String
 region: String
 subregion: String
}
type Advisory {
  name: String
  country: String
  text: String
  date: String
}
type Mutation {
 addAdvisory(name: String, country: String): Advisory
}
`;
export { schema };
