import got from "got";

const getJSONFromWWWPromise = async (url) => {
    let rawData;
    try {
        rawData = await got(url).json();
    }
    catch (error) {
        console.log(error)
    }finally {
        if (rawData !== undefined) return rawData;
    }
}

export {
    getJSONFromWWWPromise,
};