//"content.js"

chrome.extension.onRequest.addListener
    (function(request, sender, sendResponse){
	if (sender.tab){
	    var url = request.url.replace(/%3D/g, "=");
	    sendResponse({farewell: "goodbye!"});
	    document.getElementsByClassName("link")[0].innerHTML += ("<br /><iframe width='100%' frameborder='0' scrolling='auto' src='" + url + "'></iframe>");
	}else {
	    sendResponse({farewell: "error"});	    
	}
    })
