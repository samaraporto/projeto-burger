import { isLogged } from "./login.js";

window.addEventListener("load", main);

async function main() {
  if (localStorage.getItem("Token")) {
    isLogged();
  }
  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.querySelector("#nome").value
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
    const confirmacaoSenha = document.querySelector("#confirmação-senha").value;
    const numeroDeTelefone = document.querySelector("#telefone").value

    if(senha !== confirmacaoSenha){
      console.log('as senhas nao coincidem');
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nome, email: email, password: senha, phone_number: numeroDeTelefone }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Usuário criado com sucesso");
        document.querySelector('form').reset()
        window.location.href = "login.html";
      } else {
        console.log(`Erro: ${data.message || "erro ao criar user"}`);
        
      }
    } catch (error) {
      console.log(`erro na requisição: ${error.message}`);
    }
  });
}
