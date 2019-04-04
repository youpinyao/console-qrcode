const button = document.getElementById("button");
const widthInput = document.querySelector('input[name="width"]');
const heightInput = document.querySelector('input[name="height"]');
const consoleLogInput = document.querySelector('input[name="consoleLog"]');
const qrcodeElement = document.querySelector("#qrcode");

chrome.storage.sync.get(function({
  width = 256,
  height = 256,
  consoleLog = true
}) {
  widthInput.value = width;
  heightInput.value = height;
  consoleLogInput.checked = consoleLog;

  widthInput.addEventListener("blur", setWidthHeight);
  heightInput.addEventListener("blur", setWidthHeight);
  consoleLogInput.addEventListener("change", setWidthHeight);

  function setWidthHeight() {
    chrome.storage.sync.set(
      {
        width: parseInt(widthInput.value) || width,
        height: parseInt(heightInput.value) || height,
        consoleLog: consoleLogInput.checked
      },
      function() {
        console.log("set qrcode console.log width height");
      }
    );
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendRequest) {
  qrcodeElement.setAttribute("src", request);
});

function generateQrcode(log = false) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: `window.consoleQrcode(${!!log})`
    });
  });
}

button.addEventListener("click", generateQrcode);
generateQrcode();
