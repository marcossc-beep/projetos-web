const form = document.querySelector(".formulario");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const postIdInput = document.getElementById("postId");
const postsContainer = document.querySelector(".posts");

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// --- READ (GET) ---
async function getPosts() {
  try {
    const response = await fetch(API_URL + "?_limit=5"); // mostra só 5
    const posts = await response.json();

    postsContainer.innerHTML = posts
      .map(
        (post) => `
      <div class="post">
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <div class="acoes">
          <button onclick="editPost(${post.id}, '${post.title.replace(
          /'/g,
          "\\'"
        )}', '${post.body.replace(/'/g, "\\'")}')">Editar</button>
          <button onclick="deletePost(${post.id})">Excluir</button>
        </div>
      </div>
    `
      )
      .join("");
  } catch (error) {
    postsContainer.innerHTML = `<p class="error-message">Erro ao carregar posts: ${error.message}</p>`;
  }
}

// --- CREATE (POST) ---
async function createPost(title, body) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, userId: 1 }),
    });
    const newPost = await response.json();
    alert("✅ Post criado com sucesso!");
    console.log(newPost);
    getPosts();
  } catch (error) {
    alert("Erro ao criar post: " + error.message);
  }
}

// --- UPDATE (PUT) ---
async function updatePost(id, title, body) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, body, userId: 1 }),
    });
    const updatedPost = await response.json();
    alert("✏️ Post atualizado!");
    console.log(updatedPost);
    getPosts();
  } catch (error) {
    alert("Erro ao atualizar post: " + error.message);
  }
}

// --- DELETE ---
async function deletePost(id) {
  if (!confirm("Tem certeza que deseja excluir este post?")) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    alert("🗑️ Post excluído!");
    getPosts();
  } catch (error) {
    alert("Erro ao excluir post: " + error.message);
  }
}

// --- EDITAR (Preencher formulário) ---
function editPost(id, title, body) {
  postIdInput.value = id;
  titleInput.value = title;
  bodyInput.value = body;
  form.querySelector("button").textContent = "Atualizar Post";
}

// --- SUBMIT FORM (CREATE ou UPDATE) ---
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = postIdInput.value;
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title || !body) {
    alert("Preencha todos os campos!");
    return;
  }

  if (id) {
    updatePost(id, title, body);
  } else {
    createPost(title, body);
  }

  form.reset();
  form.querySelector("button").textContent = "Criar Post";
});

// Inicializa com posts
getPosts();
