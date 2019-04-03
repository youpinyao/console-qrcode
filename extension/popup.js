let button = document.getElementById("button");

button.addEventListener("click", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'window.consoleQrcode()'
    });
  });
});
