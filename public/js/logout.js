window.addEventListener('load', login);

const butaoLogin = document.getElementById('butao-login');
const nomeUser = document.getElementById('user-nome');

async function login() {
    const token = localStorage.getItem('Token');

    if (token) {
        butaoLogin.addEventListener('click', () => {
            localStorage.removeItem('Token');
            localStorage.removeItem('cart');
            window.location.reload()
            nomeUser.textContent = ''; 
        });
        butaoLogin.textContent = 'Log out';
        butaoLogin.style.background = 'red';

        const userId = parseJwt(token).id;

        try {
            const response = await fetch("http://localhost:3000/user/profile", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao obter perfil do usuário');
            }

            const user = await response.json();
            if(nomeUser){
                nomeUser.textContent = `Bem-vindo, ${user.user}!`; 
                console.log('user:',user);

            }
            

        } catch (error) {
            console.error('Erro:', error);
        }
    }
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
