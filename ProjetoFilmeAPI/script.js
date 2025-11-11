// Variáveis do DOM e Estado Global
const formulario = document.querySelector(".formulario");
const filmeInput = document.querySelector(".form-control");
const filmeInfo = document.querySelector(".filme-info");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");

// Estado da aplicação
let paginaInicial = 1;
let totalPaginas = 0;
let termoAtualDeBusca = "";

// Ocultar botões na inicialização (conforme seu código original)
prevPageButton.style.display = "none";
nextPageButton.style.display = "none";

/**
 * Atualiza a exibição e estado dos botões de paginação.
 */
function updatePaginationButtons() {
  if (totalPaginas <= 1 || termoAtualDeBusca === "") {
    prevPageButton.style.display = "none";
    nextPageButton.style.display = "none";
    return;
  }

  // Lógica de exibição baseada na página atual e total de páginas
  prevPageButton.style.display = paginaInicial > 1 ? "block" : "none";
  nextPageButton.style.display =
    paginaInicial < totalPaginas ? "block" : "none";
}

async function getApi(filme, pagina) {
  if (!filme) {
    filmeInfo.innerHTML = `<p class="error-message">Por favor, digite um termo de busca.</p>`;
    return;
  }

  termoAtualDeBusca = filme; // Salva o termo atual para navegação entre páginas

  // 1. Estado de Carregamento
  //   filmeInfo.innerHTML = `
  //         <div class="loading-message">
  //             <div style="font-size: 2rem; text-align: center;">⏳</div>
  //             <p>\nBuscando resultados para "${filme}"...</p>
  //         </div>`;
  prevPageButton.style.display = "none";
  nextPageButton.style.display = "none";

  const url = `https://www.omdbapi.com/?s=${filme}&apikey=e6c43dc6&page=${pagina}`;

  try {
    // 2. Requisição usando fetch (async/await)
    const request = await fetch(url);

    // 3. Tratamento de Erro HTTP
    if (!request.ok) {
      throw new Error(`Erro HTTP! Status: ${request.status}`);
    }

    const data = await request.json();

    // 4. Tratamento de Erro Específico da API (Filme não encontrado)
    if (data.Response === "False") {
      filmeInfo.innerHTML = `<p class="error-message"> Filme não encontrado. Tente outra busca.</p>`;
      totalPaginas = 0;
      updatePaginationButtons();
      return;
    }

    // 5. Renderizar os Resultados
    filmeInfo.innerHTML = ""; // Limpa antes de renderizar

    data.Search.forEach((filme) => {
      // Placeholder para imagem não disponível
      const posterUrl =
        filme.Poster !== "N/A" ? filme.Poster : "imagens/semImagem.PNG";

      filmeInfo.innerHTML += `
        <div class="filmes">
            <h2 class="filmes-h2">${filme.Title}</h2>
            <h3 class="filmes-h3">Lançamento: ${filme.Year}</h3>
            <p>
              <img src="${posterUrl}" 
                   alt="Poster de ${filme.Title}"
                   onerror="this.onerror=null;this.src='imagens/semImagem.PNG';">
            </p>
        </div>
      `;
    });

    // 6. Atualizar Paginação
    totalPaginas = Math.ceil(parseInt(data.totalResults) / 9);
    updatePaginationButtons();
  } catch (erro) {
    // 7. Captura erros de rede ou os erros lançados no ponto 3
    console.error("Erro na requisição da API:", erro);
    filmeInfo.innerHTML = `<p class="error-message">Erro ao carregar dados. Detalhes: ${erro.message}</p>`;

    // Ocultar botões em caso de erro
    prevPageButton.style.display = "none";
    nextPageButton.style.display = "none";
  }
}

// --- Event Listeners ---

// Evento de Submissão do Formulário
formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  // Sempre que houver uma nova busca, reinicia a página para 1
  paginaInicial = 1;
  getApi(filmeInput.value.trim(), paginaInicial);
});

// Evento do botão "Anterior"
prevPageButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (paginaInicial > 1) {
    paginaInicial--;
    // Reusa o termo de busca atual
    getApi(termoAtualDeBusca, paginaInicial);
  }
});

// Evento do botão "Próxima"
nextPageButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (paginaInicial < totalPaginas) {
    paginaInicial++;
    // Reusa o termo de busca atual
    getApi(termoAtualDeBusca, paginaInicial);
  }
});
