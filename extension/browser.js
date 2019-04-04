(function() {
  function consoleQrcode(log = true) {
    chrome.storage.sync.get(function({ width = 256, height = 256, consoleLog = true }) {
      const qrcodeElement = document.createElement("div");
      const qrcode = new QRCode(qrcodeElement, {
        text: window.location.href,
        width,
        height,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });

      const imgElement = qrcodeElement.querySelector("img");
      const color = "color:green;";
      const logLine = function() {
        console.log(
          `%c${Array(parseInt(width / 7, 10))
            .fill("-")
            .join("")}`,
            color
        );
      };
      qrcodeElement.querySelector("img").addEventListener("load", function() {
        const src = qrcodeElement.querySelector("img").getAttribute("src");
        const styleText = `background:url('${src}') no-repeat; padding-bottom: ${
          imgElement.height
        }px; padding-left: ${imgElement.width}px; font-size: 0;`;

        if (log && consoleLog) {
          logLine();
          console.log(`%c二维码链接：${window.location.href}`, color);
          console.log("%c ", styleText);
          logLine();
        }
        chrome.runtime.sendMessage(src);
      });
    });
  }

  consoleQrcode();

  window.consoleQrcode = consoleQrcode;
})();
