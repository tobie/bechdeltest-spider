var jsdom = require("jsdom");
var request = require("request");


function fetch(url, callback) {
    request(url, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            callback(null, body);
        } else {
            callback(err || new Error(response.statusText));            
        }
    });
}

function getDOM(html, callback) {
    jsdom.env({
        html: html,
        scripts: [
            'http://code.jquery.com/jquery-1.11.1.min.js'
        ],
        done: function (err, window) {
            if (err) {
                callback(err);
            } else {
                callback(null, window);
            }
        }
    });
}

function toArr(arr) {
    return array.prototype.slice.call(arr, 0);
}

var url = "http://bechdeltest.com/"; 
// To get the whole list, uncomment the below.
// Beware, it's SLOW.
// url = "http://bechdeltest.com/?list=all";  

fetch(url, function(err, body) {
    if (err) return console.log(err);
    getDOM(body, function(err, window) {
        if (err) return console.log(err);
        var $ = window.jQuery;
        var output = [];
        $("div.movie").each(function() {
            var $div = $(this);
            var idb = $div.find("a").get(0);
            var rating = $div.find("a img").get(0);
            var title = $div.find("a").get(1);
            output.push({
                idb: idb ? idb.href : null,
                rating: rating && rating.alt ? Number(rating.alt.replace(/[\[\]]/g, "")) : null,
                title: title ? title.textContent.trim() : null,
            });
        });
        console.log(JSON.stringify(output, null, 4));
    })
})