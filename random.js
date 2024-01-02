let random = Math.floor(Math.random() * 100) + 1;
let desiredrandom = -1;
let count = 0;

while (desiredrandom !== random) {
    desiredrandom = Math.floor(Math.random() * 100) + 1;
    console.log(desiredrandom);
    count++;
}

console.log(`it took ${count} iterations to randomly re-generate the random number ${random}`);