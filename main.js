// model url from: https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list?apix=true&apix_params=%7B%22cx%22%3A%22b948a108d74cf99d1%22%2C%22fileType%22%3A%22%5C%22png%5C%22%22%2C%22imgSize%22%3A%22MEDIUM%22%2C%22num%22%3A1%2C%22q%22%3A%22Cat%22%2C%22searchType%22%3A%22image%22%2C%22start%22%3A1%7D
// "https://customsearch.googleapis.com/customsearch/v1?cx=b948a108d74cf99d1&fileType=%22png%22&imgSize=MEDIUM&num=1&q=Cat&searchType=image&start=1&key=AIzaSyCAzlneuJaQ1NDv8b2mFlFom93BYYJsbfY";

const https = require("https");

var KEY = "AIzaSyCAzlneuJaQ1NDv8b2mFlFom93BYYJsbfY";
var CX = "b948a108d74cf99d1";
var imageURL;

let baseURL = "https://customsearch.googleapis.com/customsearch/v1?";
let Opts = {
    cx: `cx=${CX}`,
    fileType: "fileType=%22png%22",
    imgSize: "imgSize=MEDIUM",
    num: "num=1",
    q: "q=Cat",
    searchType: "searchType=image",
    start: "start=1",
    key: `key=${KEY}`,
};
let completedURL = `${baseURL}${Opts.cx}&${Opts.fileType}&${Opts.imgSize}&${Opts.num}&${Opts.q}&${Opts.searchType}&${Opts.start}&${Opts.key}`;

https.get(completedURL, (resp) => {
    let data = "";

    resp.on("data", (block) => {
        data += block;
    });

    resp.on("end", () => {
        let response = JSON.parse(data);

        console.log(response.items[0].link);
    });
});

// const https = require("https");
// const word = "fish";
// const URL = "https://api.datamuse.com/words?rel_syn=" + word;
// var Response;

// https.get(URL, (resp) => {
//     let data = "";

//     resp.on("data", (chunk) => {
//         data += chunk;
//     });

//     resp.on("end", () => {
//         Response = JSON.parse(data);
//         main();
//     });
// });

// function main() {
//     console.log("Apparently synonyms for", word, "are:");
//     for (let syn of Response) {
//         process.stdout.write(`${syn.word}, `);
//     }
//     console.log();
// }
