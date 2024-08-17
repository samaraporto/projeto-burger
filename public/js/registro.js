document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
  
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;
  
    try {
      const response = await fetch('/user/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: email, password: senha }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Usuário criado com sucesso');
      } else {
        console.log();
        (`Erro: ${data.message}`);
      }
    } catch (error) {
      console.log(`erro na requisição: ${error.message}`);
    }
  });
  