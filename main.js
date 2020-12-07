const https = require("https");
const word = "fish";
const URL = "https://api.datamuse.com/words?rel_syn=" + word;
var Response;

https.get(URL, (resp) => {
    let data = "";

    resp.on("data", (chunk) => {
        data += chunk;
    });

    resp.on("end", () => {
        Response = JSON.parse(data);
        main();
    });
});

function main() {
    console.log("Apparently synonyms for", word, "are:");
    for (let syn of Response) {
        process.stdout.write(`${syn.word}, `);
    }
    console.log();
}
