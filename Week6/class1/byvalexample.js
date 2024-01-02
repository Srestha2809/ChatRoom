// primitives are passed ByVal
let var1 = 'My string';
let var2 = var1;
console.log(`var2 ==> '${var2}' after first assignment`);
var2 = 'My new string';
console.log(`var2 ==> '${var2}' after second assignment`);
console.log(`var1 ==> '${var1}' after second assignment`); // original data doesn't change


//
// objects are passed ByRef
//let var1 = { name: 'Evan' }
//let var2 = var1;
//console.log(`var2 ==> '${var2.name}' after first assignment`);
//var2.name = 'Sam';
//console.log(`var2 ==> '${var2.name}' after second assignment`);
//console.log(`var1 ==> '${var1.name}' after second assignment`); // original overwritten