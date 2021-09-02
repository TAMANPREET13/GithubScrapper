let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
let pdfkit = require("pdfkit");

function getIssuesPageHtml(url, topic, repoName) {
    request(url, cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else if (response.statusCode == 404) {
            console.log("Page Not Found");
        } else {
            // getReposLink(html);
            //console.log(html);
            getIssues(html);
        }
    }

    function getIssues(html) {
        let $ = cheerio.load(html);
        let issuesElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        console.log(issuesElemArr.length);
        let arr = [];
        for (let i = 0; i < issuesElemArr.length; i++) {
            let link = $(issuesElemArr[i]).attr("href");
            //console.log(link);
            arr.push(link);
        }
        //console.log(topic, "        ", arr);
        let folderPath = path.join(__dirname, topic);
        dirCreator(folderPath);
        let filePath = path.join(folderPath, repoName + ".pdf");
        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
        //fs.writeFileSync(filePath, );
    }
}
module.exports = getIssuesPageHtml;

function dirCreator(folderPath) {
    if (fs.existsSync(folderPath) == false) {
        fs.mkdirSync(folderPath);
    }
}