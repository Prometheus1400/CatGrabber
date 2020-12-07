// model url from: https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list?apix=true&apix_params=%7B%22cx%22%3A%22b948a108d74cf99d1%22%2C%22fileType%22%3A%22%5C%22png%5C%22%22%2C%22imgSize%22%3A%22MEDIUM%22%2C%22num%22%3A1%2C%22q%22%3A%22Cat%22%2C%22searchType%22%3A%22image%22%2C%22start%22%3A1%7D
// "https://customsearch.googleapis.com/customsearch/v1?cx=b948a108d74cf99d1&fileType=%22png%22&imgSize=MEDIUM&num=1&q=Cat&searchType=image&start=1&key=AIzaSyCAzlneuJaQ1NDv8b2mFlFom93BYYJsbfY";

const https = require("https");
const fs = require("fs");
const request = require("request");
const os = require("os");

var KEY = "AIzaSyCAzlneuJaQ1NDv8b2mFlFom93BYYJsbfY";
var CX = "b948a108d74cf99d1";
var imageURL;

// determines the users operating system, returns: win, mac, linux
function getOS() {
    let osName = process.platform;

    switch (osName) {
        case "darwin":
            return "mac";
        case "win32":
            return "win";
        case "linux":
            return "linux";
        default:
            return "unsupported";
    }
}

// param: content for the image, and search result number
// calls the "download" function
function getImageURL(search, resultNum) {
    // base URL before options
    let baseURL = "https://customsearch.googleapis.com/customsearch/v1?";
    // options for URL
    let Opts = {
        cx: `cx=${CX}`,
        fileType: "fileType=%22png%22",
        imgSize: "imgSize=MEDIUM",
        num: "num=1",
        q: `q=${search}`,
        searchType: "searchType=image",
        start: `start=${resultNum}`,
        key: `key=${KEY}`,
    };
    // combines elements into one URL
    let completedURL = `${baseURL}${Opts.cx}&${Opts.fileType}&${Opts.imgSize}&${Opts.num}&${Opts.q}&${Opts.searchType}&${Opts.start}&${Opts.key}`;

    https.get(completedURL, (resp) => {
        let data = "";

        resp.on("data", (block) => {
            data += block;
        });

        resp.on("end", () => {
            let response = JSON.parse(data);
            imageURL = response.items[0].link;

            download(imageURL, "cat.png", () => {
                console.log("Downloaded Image");
            });
        });
    });
}

// downloads image based on url, names it filename, and calls callback
var download = function (url, filename, callback) {
    request.head(url, function (err, res, body) {
        console.log("content-type:", res.headers["content-type"]);
        console.log("content-length:", res.headers["content-length"]);

        request(url).pipe(fs.createWriteStream(filename)).on("close", callback);
    });
};

// param: content for the image, and search result number

let searchingFor = "cat";
let searchResNum = Math.trunc(Math.random() * 100 + 1);
getImageURL(searchingFor, searchResNum);
