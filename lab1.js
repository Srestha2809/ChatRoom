// Load the got module
import got from "got";
// Lets try to make a HTTP GET request to GOC's website and get some transfer info in JSON.
const labJson = async () => {
    const srcAddr =
        "https://microdata.worldbank.org/index.php/metadata/export/5401/json";

    try {
        const response = await got(srcAddr, { responseType: "json" });
        // strip out the Ontario amount
        let name = response.body.study_desc.title_statement["title"];
        let update = response.body.study_desc.title_statement["alt_title"]
        // dump to the console using template literal
        console.log(`${name} was changed to ${update}`);
    } catch (error) {
        console.log(error);
        //=> 'Internal server error ...'
    }
};
labJson();