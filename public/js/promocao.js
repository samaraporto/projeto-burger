window.addEventListener('load', promocao)

const infoBurger = document.querySelector('.info-produto')
const infoPreco = document.querySelector('.preco')
const btnFazerPedidoContainer = document.querySelector('.botao-fazer-pedido > div')

async function promocao(){
    const burgerDaPromocao = await fetch("http://localhost:3000/burguer/recuperar/2")

    const burger = await burgerDaPromocao.json()
    infoBurger.innerHTML = `
        <div>
              <img src=${"./img/" + burger.image_url} alt=${burger.name} />
            </div>

            <div class="description">
              <h2>${burger.name}</h2>
              <p>
                ${burger.description}
              </p>
            </div>
    `
    infoPreco.innerHTML = `
        <div class="ant-preco">
                <p>De R$${burger.price.toFixed(2)}</p>
              </div>
              <div>
                <p>Por</p>
              </div>
              <div class="preco-promocional">R$${(burger.price - (burger.price * 0.3)).toFixed(2)}</div>
    `

    btnFazerPedidoContainer.innerHTML = `
    <p id=${burger.id}>Adicionar ao pedido</p>
    `
    const btnFazerPedido = document.querySelector('.botao-fazer-pedido > div p')
    btnFazerPedido.addEventListener("click", async (event)=>{
        if(localStorage.getItem('Token')){
            const productID = event.target.id
            const product = await fetch(`http://localhost:3000/burguer/recuperar/${productID}`)
            const productData = await product.json()
            //aplica o desconto
            productData.price = (productData.price - (productData.price * 0.3)).toFixed(2)

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(productData);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'fazerPedido.html'
        }else{
            alert('Faça login para adicionar')
            window.location.href = 'login.html'            
        }

    })
    
}