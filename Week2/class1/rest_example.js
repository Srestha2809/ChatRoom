const calculateTotalCost = (id, name, ...costs) => {
    let totalCost = 0.0;
    costs.forEach((amount) => (totalCost += amount));
    return {
        productId: id,
        productName: name,
        totalCost: totalCost,
    };
};

let mfgCost = 100.0;
let shipping = 12.99;
let taxes = 5.43;
let insurance = 3.22;

let productInfo = calculateTotalCost(1001, "Widget", mfgCost,
    shipping,
    taxes,
    insurance);

let fmtCost = productInfo.totalCost.toLocaleString("en-US",
    { style: "currency", currency: "USD" });

console.log(`product ${productInfo.productId} a ${productInfo.productName} has a total cost of ${fmtCost}`);
