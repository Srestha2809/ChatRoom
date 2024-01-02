import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { fullNameAndProvincePromise, transferPaymentsFromWebPromise, transferPaymentForPromise } from "./lab2_routines.js";
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
fullNameAndProvincePromise(argv.firstname, argv.lastname, argv.province)
    .then((results) => {
        console.log(`Lab2`)
        txt += results;
        return transferPaymentsFromWebPromise();
    })
    .then((gocData) => {
        return transferPaymentForPromise(gocData, argv.province);
    })
    .then((goc) => {
        txt += goc;
        console.log(txt);
    })
    .catch((err) => {
        console.log(`Error ==> ${err}`);
    });
