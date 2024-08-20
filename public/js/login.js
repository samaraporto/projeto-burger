window.addEventListener("load", main);

async function main() {
  if (localStorage.getItem("Token")) {
    isLogged();
  }
  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email-login").value;
    const senha = document.querySelector("#senha-login").value;

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: email, password: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem(`Token`, token);
        window.location.href = "index.html";
      } else {
        `Erro: ${data.message}`;
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
    if (!data.user) {
      return;
    }
    window.location.href = "index.html";
    console.log(data.user);
  } catch (error) {
    console.log("erro");
  }
}

export { isLogged };
