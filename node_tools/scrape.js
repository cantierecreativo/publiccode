const cheerio = require("cheerio");
const fs = require("fs");
let data = fs.readFileSync("./langs-code.html", "utf8");
const $ = cheerio.load(data);

const fetchPage = () => {
  let url = "https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes";
  fetch(url)
    .then(res => res.text())
    .then(data => {
      console.log("ok");
      const $ = cheerio.load(data);
      $("#Table td:first-child").each((i, el) => {
        let item = $(this).text();
        console.log(item);
      });
    });
};

const getTD2 = $ => {
  $("tr > td:nth-child(1) td:nth-child(4) > p > span ").each((i, el) => {
    let s =
      el && elem.children[0] && elem.children[0].data
        ? elem.children[0].data
        : null;
    console.log(i, s);
  });
};

const getLangCodes = $ => {
  let obj = [];
  $("tr > td:nth-child(1) > p > span > a:first-child ").map((i, el) => {
    let s =
      el && el.children[0] && el.children[0].data ? el.children[0].data : null;
    s = s.substring(0, 4);
    // console.log(i, s);
    obj.push(s);
  });
  console.log(obj.length);
  fs.writeFileSync("./lang_codes.json", JSON.stringify(obj));
};

const genLangObjs = $ => {
  let obj = [];
  $("tr > td:nth-child(1) > p > span > a:first-child ").map((i, el) => {
    let s =
      el && el.children[0] && el.children[0].data ? el.children[0].data : null;
    s = s.substring(0, 4);
    // console.log(i, s);
    obj.push(s);
  });
  console.log(obj.length);

  let values = obj.map(o => {
    let item = {
      type: "object",
      title: "" + o,
      description: "language  width code: " + o,
      examples: ["eng", "ita"],
      properties: {}
    };
    item.properties[o] = {
      $ref: "#/definitions/translatedDescr"
    };
    return item;
  });
  fs.writeFileSync("./gen.json", JSON.stringify(values));
};

const getLangCodesWithDescr = $ => {
  var tr = $("tr");
  console.log(tr.length);
  let obj = [];
  tr.each(function(i, el) {
    var td0 = $(el)
      .find("td:nth-child(1) > p > span > a:first-child ")
      .text();
    var td5 = $(el)
      .find("td:nth-child(5) > p > span > a:first-child ")
      .text();

    obj.push({ lang: td0, descr: td5 ? td5 : td0 });
  });

  console.log(obj.length);
  fs.writeFileSync("./lang_codes_n_descrs.json", JSON.stringify(obj));
};


const getCountriesCodesWithDescr = () => {
  let data = fs.readFileSync("./country-codes.html", "utf8");
const $ = cheerio.load(data);
  var tr = $("tr");
  console.log(tr.length);
  let obj = [];
  tr.each(function(i, el) {
    var c = $(el)
      .find("td:nth-child(2) > p > span > b:first-child ")
      .text();
    var d = $(el)
      .find("td:nth-child(3) > p > span > a:first-child ")
      .text();

    obj.push({ code: c, descr: d ? d : c });
  });

  console.log(obj.length);
  fs.writeFileSync("./countries_codes_n_descrs.json", JSON.stringify(obj));
};

//getCodes($);
//getCodesWithDescr($);
//genLangObjs($);
getCountriesCodesWithDescr();

