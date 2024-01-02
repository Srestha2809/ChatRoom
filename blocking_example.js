let fs = require('fs');
let users = fs.readFileSync('./sampledata/users', 'utf-8');
console.log(`${users}\n`);
let emails = fs.readFileSync('./sampledata/emailaddresses', 'utf-8');
console.log(emails);