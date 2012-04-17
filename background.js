// ------------------
// background.js
// ------------------

function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.match(/^http\:\/\/www\.nhk\.or\.jp\/gogaku\/(\w+)\/(\w+)\/.*/i)) {
	alert("言語：" + RegExp.$1 + "\n講座：" + RegExp.$2);
	chrome.pageAction.show(tabId);
    }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
