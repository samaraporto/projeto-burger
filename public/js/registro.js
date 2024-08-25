import { isLogged } from "./login.js";
window.addEventListener("load", main);

const infos = document.getElementById("infos")
const nome = document.querySelector("#nome")
const email = document.querySelector("#email")
const senha = document.querySelector("#senha")
const confirmacaoSenha = document.querySelector("#confirmação-senha");
const numeroDeTelefone = document.querySelector("#telefone")
const termos = document.getElementById('termos-condicoes')

async function main() {
  if (localStorage.getItem("Token")) {
    isLogged();
  }
  
// validações
let nomeValido = false
let emailValido = false
let senhaValida = false
let confirmacaoSenhaValida = false
let telefoneValido = false

nome.addEventListener('blur', () => {
  const regex = /^[a-zA-Z\s]+$/; 
  const partesNome = nome.value.trim().split(" ");
  
  
  const tamanhoNome = nome.value.length;

  if (tamanhoNome > 10 && partesNome.length > 1 && regex.test(nome.value)) {
    nomeValido = true;
    infos.textContent = ''
    if(nome.style.border!='2px solid #90EE90') nome.style.border = '2px solid #90EE90'
  } else {
    if (nome.style.border!='2px solid red') nome.style.border = '2px solid red'
    if (tamanhoNome <= 10) infos.textContent = "O nome deve ter mais de 10 caracteres.";
    if (partesNome.length <= 1) infos.textContent = "O nome deve conter pelo menos um sobrenome."
    if (!regex.test(nome.value)) infos.textContent = "O nome não pode conter caracteres especiais ou números."
  }
});

email.addEventListener('blur', () => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const emailValor = email.value.trim();

  if (regexEmail.test(emailValor)) {
    emailValido = true;
    infos.textContent = '';
    if (email.style.border !== '2px solid #90EE90') email.style.border = '2px solid #90EE90'; // Validação correta
  } else {
    if (email.style.border !== '2px solid red') email.style.border = '2px solid red';
    infos.textContent = "O email deve ter um formato válido (exemplo: usuario@dominio.com).";
  }
});
senha.addEventListener('blur', () => {
  const regexSenha = /^(?=.*[0-9!@#$%^&*])[^\s]{8,}$/;
  
  const senhaValor = senha.value.trim();

  if (regexSenha.test(senhaValor)) {
    senhaValida = true;
    infos.textContent = '';
    if (senha.style.border !== '2px solid #90EE90') senha.style.border = '2px solid #90EE90'; // Validação correta
  } else {
    if (senha.style.border !== '2px solid red') senha.style.border = '2px solid red';
    if (senhaValor.length <= 7) infos.textContent = "A senha deve ter mais de 7 caracteres.";
    if (!/[0-9!@#$%^&*]/.test(senhaValor)) infos.textContent = "A senha deve conter pelo menos um caractere especial ou numérico.";
    if (/\s/.test(senhaValor)) infos.textContent = "A senha não deve conter espaços em branco.";
  }
});
confirmacaoSenha.addEventListener('blur', () => {
  const senhaValor = senha.value.trim();
  const confirmacaoSenhaValor = confirmacaoSenha.value.trim();
    
  if (confirmacaoSenhaValor === senhaValor && confirmacaoSenhaValor.length > 7 && !/\s/.test(confirmacaoSenhaValor) && /[0-9!@#$%^&*]/.test(confirmacaoSenhaValor)) {
    confirmacaoSenhaValida = true;
    infos.textContent = '';
    if (confirmacaoSenha.style.border !== '2px solid #90EE90') confirmacaoSenha.style.border = '2px solid #90EE90'; // Validação correta
  } else {
    if (confirmacaoSenha.style.border !== '2px solid red') confirmacaoSenha.style.border = '2px solid red';
    if (confirmacaoSenhaValor !== senhaValor) infos.textContent = "A confirmação de senha deve corresponder à senha.";
    if (confirmacaoSenhaValor.length <= 7) infos.textContent = "A senha deve ter mais de 7 caracteres.";
    if (/\s/.test(confirmacaoSenhaValor)) infos.textContent = "A senha não deve conter espaços em branco.";
    if (!/[0-9!@#$%^&*]/.test(confirmacaoSenhaValor)) infos.textContent = "A senha deve conter pelo menos um caractere especial ou numérico.";
  }
});

numeroDeTelefone.addEventListener('input', () => {
  let telefone = numeroDeTelefone.value.replace(/\D/g, '');

  if (telefone.length > 11) {
    telefone = telefone.substring(0, 11); 
  }

  if (telefone.length <= 10) {
    telefone = telefone.replace(/(\d{0,2})(\d{0,5})/, '($1) $2');
  } else {
    telefone = telefone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }

  numeroDeTelefone.value = telefone;
});

numeroDeTelefone.addEventListener('blur', () => {
  const telefone = numeroDeTelefone.value.replace(/\D/g, '');

  if (telefone.length > 10) {
    numeroDeTelefone.style.border = '2px solid #90EE90'; // Validação correta
    telefoneValido = true
    infosTelefone.textContent = '';
  } else {
    numeroDeTelefone.style.border = '2px solid red';
    infosTelefone.textContent = 'O telefone deve ter mais de 10 dígitos.';
  }
});


  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    if(senha.value !== confirmacaoSenha.value){
      console.log('as senhas nao coincidem');
      return;
    }

    if(!termos.checked){
      infos.textContent = 'Aceite os termos e condições'
      return
    }

      if (!senhaValida || !confirmacaoSenhaValida ||!emailValido || !nomeValido || !telefoneValido) {
        alert('Por favor, preencha todos os campos corretamente.');
        return
      }
    try {
      const response = await fetch("http://localhost:3000/user/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nome.value, email: email.value, password: senha.value, phone_number: numeroDeTelefone.value }),
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
