chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
    { width: 256, height: 256, consoleLog: true },
    function() {
      console.log("init qrcode width height");
    }
  );
});

function showPageAction(tabId, changeInfo, tab) {
  // changeInfo.status === "complete"
  if (changeInfo.status === "loading") {
    chrome.pageAction.show(tabId);

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {
        file: "qrcode.js"
      });
      chrome.tabs.executeScript(tabs[0].id, {
        file: "browser.js"
      });
    });
  }
}

chrome.tabs.onUpdated.addListener(showPageAction);
