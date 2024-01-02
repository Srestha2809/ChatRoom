import got from "got";

const getJSONFromWWWPromise = async (url) => await got(url).json();

export { getJSONFromWWWPromise }