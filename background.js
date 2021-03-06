// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Called when the user clicks on the browser action.

let state = 0;

// set state in local storage
localStorage.setItem("state", state);

chrome.browserAction.onClicked.addListener(function(tab) {
	if (localStorage.getItem("state") == 0) {
		chrome.browserAction.setIcon({ path:"icon-on.png" });
		chrome.tabs.executeScript(null, {file: "content.js"})
		state++
  	localStorage.setItem("state", state);
		return state;
	} 
	chrome.browserAction.setIcon({ path:"icon-off.png" });
	state--;
	localStorage.setItem("state", state);
	return state;
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (localStorage.getItem("state") == 1) {
		const twitter = /^https:\/\/twitter\.com\/*/;
		if (twitter.test(tab.url)) {
	 		chrome.tabs.executeScript(null, { file: "content.js" })
		}
	} 
}); 

	

