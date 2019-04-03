chrome.runtime.onInstalled.addListener(function() {
  // chrome.storage.sync.set({ color: "#3aa757" }, function() {
  //   console.log("The color is green.");
  // });
});

function showPageAction(tabId, changeInfo, tab) {
  // changeInfo.status === "complete" || c
  if (changeInfo.status === "loading") {
    chrome.pageAction.show(tabId);

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {
        file: 'qrcode.js'
      });
      chrome.tabs.executeScript(tabs[0].id, {
        file: 'browser.js'
      });
    });
  }
}

chrome.tabs.onUpdated.addListener(showPageAction);
