window.addEventListener("load", main);

async function main() {
  if (localStorage.getItem("Token")) {
    isLogged();
  }

  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const email = document.querySelector("#email-login").value;
      const senha = document.querySelector("#senha-login").value;
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: senha }),
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
