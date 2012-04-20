// ------------------
// background.js
// ------------------

var language = "";
var program = "";
var code = "";

function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.match(/^http\:\/\/www\.nhk\.or\.jp\/gogaku\/(\w+)\/(\w+)\/.*/i)) {
	chrome.pageAction.show(tabId);
	language = RegExp.$1;
	program = RegExp.$2;
	console.log("言語：" + language + "\n講座：" + program);

    }
};

function checkStreamingURL(details){
    console.log("checkStreamingURL(" + details.type + " type)");
    if (details.url.match(/^http\:\/\/www\.nhk\.or\.jp\/gogaku\/(\w+)\/(\w+)\/(\w+)\/listdataflv.xml.*/i)){
	code = RegExp.$3;
	console.log("code:" + code);
	url = "http://pythxsh.geek.jp/nhksd/download/?code%3D" + code + "&language%3D" + language + "&program%3D" + program;
	chrome.pageAction.setPopup({
		tabId: details.tabId,
		popup:"popup.html?url="+url,
	    })
    }
    return details;
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.webRequest.onCompleted.addListener(
     checkStreamingURL,
     {
	 urls: ["*://www.nhk.or.jp/gogaku/*/*/*/listdataflv.xml*"],
         types:["object"]
     },
     []
 );
