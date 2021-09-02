let request = require("request");
let cheerio = require("cheerio");
let getIssuesPageHtml = require("./issue");

function getReposPageHtml(url, topic) {
    request(url, cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else if (response.statusCode == 404) {
            console.log("Page Not Found");
        } else {
            getReposLink(html);
            //console.log(html);
        }
    }

    function getReposLink(html) {
        let $ = cheerio.load(html);
        let headingsArr = $(".f3.color-text-secondary.text-normal.lh-condensed");
        console.log(topic);
        for (let i = 0; i < 8; i++) {
            let twoAnchor = $(headingsArr[i]).find("a");
            let link = $(twoAnchor[1]).attr("href");
            //console.log(link);
            let fullLink = "https://github.com" + link + "/issues";
            let repoName = link.split("/").pop();
            getIssuesPageHtml(fullLink, topic, repoName);
        }
        console.log("`````````````````````````````````````````");
    }
}
module.exports = getReposPageHtml;