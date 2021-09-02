let url = "https://github.com/topics";
let request = require("request");
let cheerio = require("cheerio");
let getReposPageHtml = require("./reposPage");
request(url, cb);

function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else if (response.statusCode == 404) {
        console.log("Page Not Found");
    } else {
        //console.log(html);
        getTopicLink(html);
    }
}

function getTopicLink(html) {
    let $ = cheerio.load(html);
    let linkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for (let i = 0; i < linkElemArr.length; i++) {
        let href = $(linkElemArr[i]).attr("href");
        let topic = href.split("/").pop();
        let fullLink = "https://github.com" + href;
        //console.log(fullLink);
        getReposPageHtml(fullLink, topic);
    }
}