// Seleção de elementos
const multiplicationForm = document.querySelector("#multiplication-form");
const numberInput = document.querySelector("#number");
const multiplicatorInput = document.querySelector("#multiplicator");
const multiplicationTitle = document.querySelector("#multiplication-title");
multiplicationTitle.style.display = "none";

const multiplicationTitleSpan = document.querySelector(
  "#multiplication-title span"
);
const multiplicationTable = document.querySelector(
  "#multiplication-operations"
);
const animationScreen = document.querySelector(".animation");
const ralphText = document.querySelector(".text-ralph");
const teddyText = document.querySelector(".text-teddy");
let multiplicationsAndResults = [];

// Funções
const createTable = (number, multiplicator) => {
  multiplicationTable.innerHTML = "";

  for (i = 1; i <= multiplicator; i++) {
    const result = number * i;
    multiplicationsAndResults.push(`${number} x ${i}`);
    multiplicationsAndResults.push(result);

    const template = `<div class="row">
        <div class="operation">${number} x ${i} = </div>
        <div class="result">${result}</div>
      </div>`;
    const parser = new DOMParser();
    const htmlTemplate = parser.parseFromString(template, "text/html");
    const row = htmlTemplate.querySelector(".row");
    multiplicationTable.appendChild(row);
  }

  multiplicationTitleSpan.innerText = number;
};

const animationDogs = () => {
  ralphText.innerText = "Ook Teddy!!!\n Vamos fazer algumas contas...";
  ralphText.style.display = "block";
  teddyText.style.display = "none";

  setTimeout(() => {
    let index = 0;

    const displayNext = () => {
      if (index < multiplicationsAndResults.length) {
        const isRalphTurn = index % 2 === 0;

        if (isRalphTurn) {
          ralphText.innerText = multiplicationsAndResults[index];
          ralphText.style.display = "block";
          teddyText.style.display = "none";
        } else {
          teddyText.innerText = multiplicationsAndResults[index];
          teddyText.style.display = "block";
          ralphText.style.display = "none";
        }

        index++;

        setTimeout(displayNext, 1500);
      } else {
        teddyText.innerText = "Obrigado por praticar!!!";
        teddyText.style.display = "block";
        ralphText.style.display = "none";
        multiplicationTitle.style.display = "flex";
        multiplicationTable.style.display = "flex";
      }
    };

    displayNext();
  }, 2000); // Aguardar 2 segundos antes de iniciar o ciclo de exibição das contas
};

// Eventos
multiplicationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const multiplicationNumber = +numberInput.value;
  const multiplicatorNumber = +multiplicatorInput.value;

  if (!multiplicationNumber || !multiplicatorNumber) {
    return;
  }

  createTable(multiplicationNumber, multiplicatorNumber);
  animationScreen.style.display = "flex";
  multiplicationTitle.style.display = "none";
  multiplicationTable.style.display = "none";
  animationDogs();
});
