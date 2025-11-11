/* FUNCAO OVERLAY MENU-MOBILE */
let btnMenu = document.getElementById("btn-menu");
let menu = document.getElementById("menu-mobile");
let overlay = document.getElementById("overlay-menu");

btnMenu.addEventListener("click", () => {
  menu.classList.add("abrir-menu");
});

menu.addEventListener("click", () => {
  menu.classList.remove("abrir-menu");
});

overlay.addEventListener("click", () => {
  menu.classList.remove("abrir-menu");
});

/* FUNCAO VALIDAR EMAIL */
const tel = document.getElementById("input-fone");

tel.addEventListener("keypress", (e) => mascaraTelefone(e.target.value));
tel.addEventListener("change", (e) => mascaraTelefone(e.target.value));

const mascaraTelefone = (valor) => {
  valor = valor.replace(/\D/g, "");
  valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
  valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
  tel.value = valor;
};

/* FUNÇÃO CALCCARBONO*/
function calculadora() {
  var eletrecidade = parseFloat(document.getElementById("eletrecidade").value);
  var gas = parseFloat(document.getElementById("gas").value);
  var combustivel = parseFloat(document.getElementById("combustivel").value);

  var emissaoCarbono = eletrecidade * 0.5 + gas * 2 + combustivel * 2.3;

  document.getElementById("resultado").innerHTML =
    "<p>Emissões de Carbono Estimadas: <strong>" +
    emissaoCarbono.toFixed(2) +
    " kg CO2e</strong></p>";
}

/* BUSCADOR */
// function buscador() {
//   var query = document.getElementById("buscador").value.toLowerCase();

//   if (document.body.innerText.toLowerCase().includes(query)) {
//     var element = document.getElementById(query);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth", block: "start" });
//       }
//   } else {
//     alert("Nenhum item encontrado com a palavra: " + query);
//   }
// }
