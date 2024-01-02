const schema = `
type Query {
 countries: [Country],
 countrybyname(name: String): Country,
 countrybycode(code: String): Country
 },
type Country {
 name: String
 code: String
 },
type Mutation {
 addcountry(name: String, code: String): Country
}
`;
export { schema };