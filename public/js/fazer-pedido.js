window.addEventListener('load', fazerPedido)

const cartItens = document.getElementById('lista-itens')
const totalPedido = document.getElementById('total-pedido')
let total=0

function fazerPedido(){
    const cart = localStorage.getItem('cart')
    if(cart){
        const produtos = JSON.parse(cart)
        for(p of produtos){
            total += p.price
            cartItens.innerHTML +=  `
            <li>
              <img src=${"../img/"+p.image_url} alt=${p.name}>
              <p>${p.name}</p>
              <p>R$${(p.price).toFixed(2)}</p>
            </li>
            `
        }
        totalPedido.innerHTML = `Total: R$${(total).toFixed(2)}`
    }
}