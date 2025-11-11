const container = document.querySelector(".container");
const qrCodeBtn = document.querySelector("#qr-form button");
const qrCodeInput = document.querySelector("#qr-form input");
const qrCodeImg = document.querySelector("#qr-code img");

function generateQrCode() {
  const qrCodeInputValue = qrCodeInput.value;

  if (!qrCodeInputValue) return;

  qrCodeBtn.innerText = "Gerando código...";

  qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`;

  qrCodeImg.addEventListener("load", () => {
    container.classList.add("active");
    qrCodeBtn.innerText = "Código criado";
  });
}

function updateTransformations() {
  const isActive = container.classList.contains("active");
  const imgRalph = document.querySelector(".img-ralph");
  const imgTeddy = document.querySelector(".img-teddy");

  if (isActive) {
    if (window.matchMedia("(max-width: 360px").matches) {
      imgRalph.style.transform = "translate(-30%, -70%) rotate(0deg)";
      imgTeddy.style.transform = "translate(40%, -60%) rotate(0deg)";
      container.style.marginTop = "15vh";
    } else if (window.matchMedia("(max-width: 500px)").matches) {
      imgRalph.style.transform = "translate(-30%, -65%) rotate(0deg)";
      imgTeddy.style.transform = "translate(40%, -55%) rotate(0deg)";
      container.style.marginTop = "17vh";
      console.log("Estou no 500px");
    } else if (window.matchMedia("(max-width: 850px)").matches) {
      imgRalph.style.transform = "translate(-125%, -50%) rotate(-25deg)";
      imgTeddy.style.transform = "translate(110%, -40%) rotate(45deg)";
    } else {
      imgRalph.style.transform = "translate(-75%, -50%) rotate(-25deg)";
      imgTeddy.style.transform = "translate(70%, -40%) rotate(45deg)";
    }
  }
}

qrCodeBtn.addEventListener("click", () => {
  generateQrCode();
});

qrCodeInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    generateQrCode();
  }
});

container.addEventListener("transitionend", updateTransformations);
