import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { FISCALYEAR, currencyFormatter, provinces, fullNameAndProvincePromise, transferPaymentsFromWebPromise, transferPaymentForPromise, transferPaymentForProvincePromise } from "./lab3_routines.js";
const argv = yargs(hideBin(process.argv))
    .options({
        firstname: {
            demandOption: true,
            alias: "fname",
            describe: "Resident's first name",
            string: true,
        },
        lastname: {
            demandOption: true,
            alias: "lname",
            describe: "Resident's last name",
            string: true,
        },
        province: {
            demandOption: true,
            alias: "prov",
            describe: "Resident's home province",
            choices: ['NS', 'NL', 'NB', 'PE,', 'QC', 'ON', 'MB', 'SK', 'AB', 'BC', 'NT', 'NU', 'YT'],
            string: true,
        },
    })
    .help()
    .alias("help", "h")
    .parse();
let txt = "";
const fullNameAndProvince = async (argv) => {
    try {
        let results = await fullNameAndProvincePromise(argv.firstname, argv.lastname, argv.province);
        txt += results;
        let gocData = await transferPaymentsFromWebPromise();
        let data = await transferPaymentForPromise(gocData, argv.province);
        let text = `It received ${data} in transfer paymets.`
        txt += text;
        console.log(`${txt} \n Transfer Payments By Province/Territory:`)

        let call = await Promise.allSettled(
            provinces.map((name) => {
                return transferPaymentForPromise(gocData, name.code);
            })
        )

        let i = 0;
        while (i < provinces.length) {
            if (provinces[i].code === argv.province) {
                console.log(`\t\x1b[33m${provinces[i].name} had a transfer payment of ${call[i].value}`)

            }
            else {
                console.log(`\t\x1b[0m${provinces[i].name} had a transfer payment of ${call[i].value}`)
            }
            i++;
        }



        //await transferPaymentForProvincePromise(gocData);
        txt += call;
    }
    catch (err) {
        console.log(`Error ==> ${err}`);
    }
};
fullNameAndProvince(argv);

