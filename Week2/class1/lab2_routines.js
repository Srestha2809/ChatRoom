import got from "got";
const provinces = [
    { code: "NS", name: "Nova Scotia" },
    { code: "NL", name: "Newfoundland" },
    { code: "NB", name: "New Brunswick" },
    { code: "PE", name: "Prince Edward Island" },
    { code: "QC", name: "Quebec" },
    { code: "ON", name: "Ontario" },
    { code: "MB", name: "Manitoba" },
    { code: "SK", name: "Saskatchewan" },
    { code: "AB", name: "Alberta" },
    { code: "BC", name: "British Columbia" },
    { code: "NT", name: "North West Territories" },
    { code: "NU", name: "Nunavut" },
    { code: "YT", name: "Yukon Territory" },
];
const FISCALYEAR = "2022-2023";
// Create a currency formatter.
const currencyFormatter = (numberToFormat) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(numberToFormat);


function myFunc(item, c) {
    if (item.code == c) {
        item = item.name
    }
}

const fullNameAndProvincePromise = (fname, lname, pc) => {

    return new Promise((resolve) => {
        let po = "error";
        provinces.forEach(province => {
            if (province.code === pc) {
                po = province.name;
            }

        });
        let data = `${fname}, ${lname} lives in ${po}. `;
        //let data = {
        //  f: fname, l: lname, p: po
        //};
        resolve(data);
    });
};

const transferPaymentsFromWebPromise = () => {
    let srcAddr =
        "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";

    return new Promise((resolve, reject) => {

        got(srcAddr, { responseType: "json" })
            .then((response) => {
                let ont = response.body.ccbf;
                resolve(ont);
            })
            .catch((err) => {
                console.log(`Error ==> ${err}`);
                reject(err);
            });
    });
};

const transferPaymentForPromise = (gocData, provCode) => {

    return new Promise((resolve) => {
        let data = `It received ${currencyFormatter(
            gocData[`${provCode.toLowerCase()}`][`${FISCALYEAR}`]
        )} in transfer payments.`;
        //let data = {p: currencyFormatter(gocData[])}
        resolve(data);
    });
};

export {
    provinces,
    currencyFormatter,
    fullNameAndProvincePromise,
    transferPaymentsFromWebPromise,
    transferPaymentForPromise,
};