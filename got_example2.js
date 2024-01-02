// Load the got module
import got from "got";
// Lets try to make a HTTP GET request to GOC's website and get some transfer info in JSON.
const dumpJson = async () => {
    const srcAddr =
        "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";
    // Create a currency formatter.
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    });
    try {
        const FISCALYEAR = "2022-2023"
        const response = await got(srcAddr, { responseType: "json" });
        // strip out the Ontario amount
        let bcp = response.body.ccbf.bc[FISCALYEAR];
        let abp = response.body.ccbf.ab[FISCALYEAR];
        let bcF = bcp - abp;
        let abF = abp - bcp;
        // format to currency
        bcp = formatter.format(bcp);
        abp = formatter.format(abp);
        bcF = formatter.format(bcF);
        abF = formatter.format(abF);
        // dump to the console using template literal
        console.log(`B.C.'s transfer amount for ${FISCALYEAR} was ${bcp}`);
        console.log(`Alberta's transfer amount for ${FISCALYEAR} was ${abp}`);
        if (abp > bcp) {
            console.log(`Alberta received ${abF} more than B.C. for ${FISCALYEAR}`);

        }
        else {
            console.log(`B.C. received ${bcF} more than Alberta for ${FISCALYEAR}`);
        }

    } catch (error) {
        console.log(error);
        //=> 'Internal server error ...'
    }
};
dumpJson();