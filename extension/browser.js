(function() {
  var qrcodeElement = document.createElement("div");

  var qrcode = new QRCode(qrcodeElement, {
    text: window.location.href,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  const imgElement = qrcodeElement.querySelector("img");

  function consoleQrcode() {
    const styleText = `background:url('${qrcodeElement
      .querySelector("img")
      .getAttribute("src")}') no-repeat; padding-bottom: ${
      imgElement.height
    }px; padding-left: ${imgElement.width}px`;
    console.log("%c ", styleText);
  }

  qrcodeElement.querySelector("img").addEventListener("load", consoleQrcode);

  window.consoleQrcode = consoleQrcode;
})();
