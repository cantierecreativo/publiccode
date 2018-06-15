const cheerio = require('cheerio');

//"iso-codes"
// "Table"
const url = "https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes";

fetch(url)
.then(res => res.text())
.then(data => {
     console.log("ok");
     const $ = cheerio.load(data);
     $('#Table td:first-child').each((i, elem) =>{
        let item = $(this).text();
        console.log(item);
    })
}

