// ------------------
// background.js
// ------------------

var language = "";
var program = "";
var code = "";


function checkStreamingURL(details){
    console.log("checkStreamingURL(" + details.type + " type)");
    if (details.url.match(/^http\:\/\/www\.nhk\.or\.jp\/gogaku\/(\w+)\/(\w+)\/(\w+)\/listdataflv.xml.*/i)){
	language = RegExp.$1;
	program = RegExp.$2;
	code = RegExp.$3;
	console.log("language:" + language);
	console.log("program:" + program);
	console.log("code:" + code);
	url = "http://pythxsh.geek.jp/nhksd/download/?code%3D" + code + "&language%3D" + language + "&program%3D" + program;
	chrome.tabs.sendRequest(details.tabId, {url: url}, function(response){
		console.log(response.farewell);
	    });
	console.log(url);
    }
    return details;
};

chrome.webRequest.onCompleted.addListener(
     checkStreamingURL,
     {
	 urls: ["*://www.nhk.or.jp/gogaku/*/*/*/listdataflv.xml*"],
         types:["object"]
     },
     []
 );
