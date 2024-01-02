

const getOriginalCOuntries = () => {
    let originalCountries = ['Canada<==original', 'USA<==original'];
    let endCountries = ['England<==End', 'Japan<==End'];
    originalCountries.push(...endCountries);
    return originalCountries;
};

const getAllCountries = () => {
    let original = getOriginalCOuntries();
    let beginCountries = ['Germany<==begin', 'Mexico<==begin'];
    original.unshift(...beginCountries);
    return original;
}

getAllCountries().forEach(country => console.log(country));