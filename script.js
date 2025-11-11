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

// FUNCAO FIXAR HEADER
const header = document.querySelector("header");
const headerHeight = header.offsetHeight;

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition > headerHeight) {
    header.classList.add("fixed");
    header.style.transition = "0.7s";
  } else {
    header.classList.remove("fixed");
    header.style.transition = "0.7s";
  }
});

// ANIMAÇÃO AO ROLAR
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      // Para animar só uma vez:
      observer.unobserve(entry.target);
    }
  });
});

// Ativa para todos os elementos com a classe .reveal
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
