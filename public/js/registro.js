import { isLogged } from "./login.js";
window.addEventListener("load", main);

async function main() {
  if (localStorage.getItem("Token")) {
    isLogged();
    console.log("aqui");
  }
  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    try {
      const response = await fetch("http://localhost:3000/user/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: email, password: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Usuário criado com sucesso");
        window.location.href = "login.html";
      } else {
        console.log();
        `Erro: ${data.message}`;
      }
    } catch (error) {
      console.log(`erro na requisição: ${error.message}`);
    }
  });
}
