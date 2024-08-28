window.addEventListener("load", main);

const email =  document.querySelector("#email-login")
const senha =  document.querySelector("#senha-login")
const infos = document.querySelector(".informacoes")

async function main() {
  if (localStorage.getItem("Token")) {
    isLogged();
  }

  let emailValido = false
  let senhaValida = false

  email.addEventListener("blur", () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const emailValor = email.value.trim();

    if (regexEmail.test(emailValor)) {
      emailValido = true;
      infos.textContent = "";
      if (email.style.border !== "2px solid #90EE90")
        email.style.border = "2px solid #90EE90"; // Validação correta
    } else {
      if (email.style.border !== "2px solid red")
        email.style.border = "2px solid red";
      infos.textContent =
        "O email deve ter um formato válido (exemplo: usuario@dominio.com).";
    }
  });
  senha.addEventListener("blur", () => {
    const regexSenha = /^(?=.*[0-9!@#$%^&*])[^\s]{8,}$/;

    const senhaValor = senha.value.trim();

    if (regexSenha.test(senhaValor)) {
      senhaValida = true;
      infos.textContent = "";
      if (senha.style.border !== "2px solid #90EE90")
        senha.style.border = "2px solid #90EE90"; // Validação correta
    } else {
      if (senha.style.border !== "2px solid red")
        senha.style.border = "2px solid red";
      if (senhaValor.length <= 7)
        infos.textContent = "A senha deve ter mais de 7 caracteres.";
      if (!/[0-9!@#$%^&*]/.test(senhaValor))
        infos.textContent =
          "A senha deve conter pelo menos um caractere especial ou numérico.";
      if (/\s/.test(senhaValor))
        infos.textContent = "A senha não deve conter espaços em branco.";
    }
  });

  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    if (
      !senhaValida ||
      !emailValido
    ) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.value, password: senha.value }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem(`Token`, token);
        window.location.href = "index.html";
      } else {
        const senhaDiv = document.querySelector(".div-login");
        senhaDiv.innerHTML = "";
        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.paddingTop = "25px";
        const p = document.createElement("p");
        p.innerHTML = "E-mail ou senha inválidos";
        p.style.color = "red";
        div.appendChild(p);
        senhaDiv.appendChild(div);
      }
    } catch (error) {
      console.log(`erro na requisição: ${error.message}`);
    }
  });
}

async function isLogged() {
  try {
    const getProfile = await fetch("http://localhost:3000/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
        "Content-Type": "application/json",
      },
    });
    const data = await getProfile.json();
    if (data.error || !data.user) {
      localStorage.removeItem("Token");
      window.location.href = "login.html";
    } else {
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log("erro ao verificar token");
  }
}

export { isLogged };
