window.addEventListener('load', createMenu);

const container = document.querySelector('.container');

function isLogged() {
    return localStorage.getItem('Token'); 
}

async function createMenu() {
    const response = await fetch('http://localhost:3000/burguers');
    const burguersData = await response.json();

    for (let burguer of burguersData) {
        container.innerHTML += `
        <div class="produto">
            <div>
                <img
                    class="burger-img"
                    src="../img/${burguer.image_url}"
                    alt="${burguer.name}"
                />
            </div>
            <div class="description">
                <p class="number-burger">#${burguer.id}</p>
                <p class="item-name">${burguer.name}</p>
                <p>${burguer.description}</p>
            </div>
            <div class="div-preco">
                <div class="preco">
                    <p>R$${burguer.price.toFixed(2)}</p>
                </div>
            </div>
            <button 
                id=${burguer.id}
                class="add-butao" 
                title="${isLogged() ? 'Adicionar ao pedido' : 'Faça login para adicionar ao pedido'}"
                ${isLogged() ? '' : 'disabled'}>
                +
            </button>
        </div>
        `;
    }
    addEventListeners();
}

async function addToCart(event) {
    const productID = event.target.id
    const product = await fetch(`http://localhost:3000/burguer/recuperar/${productID}`)
    const productData = await product.json()
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productData);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productData.name} foi adicionado ao pedido.`);
}

function addEventListeners() {
    const butoes = document.getElementsByClassName('add-butao');

    for (let b of butoes) {
        if (isLogged()) {
            b.addEventListener('click', addToCart);
        } else {
            b.addEventListener('click', () => {
                alert('Você precisa estar logado para adicionar ao pedido.');
            });
        }
    }
}
