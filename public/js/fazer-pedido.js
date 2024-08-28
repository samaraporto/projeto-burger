window.addEventListener("load", fazerPedido);

const cartItens = document.getElementById("lista-itens");
const totalPedido = document.getElementById("total-pedido");
let total = 0;

function fazerPedido() {
  if(!localStorage.getItem('Token')){
    localStorage.removeItem('cart')
  }
  const cart = localStorage.getItem("cart");
  const produtos = JSON.parse(cart) || [];

  if (produtos.length > 0) {
    cartItens.innerHTML = "";

    produtos.forEach((p, index) => {
      total += Number(p.price);
      console.log("preco",p.price);
      console.log("total",total);
      
      
      cartItens.innerHTML += `
          <li data-index="${index}">
            <img src=${"../img/" + p.image_url} alt=${p.name}>
            <p>${p.name}</p>
            <p>R$${p.price}</p>
            <span class="remover-item" data-index="${index}"> X </span>
          </li>
          `;
    });
    
    totalPedido.innerHTML = `Total: R$${total.toFixed(2)}`;

  }else{
    cartItens.innerHTML = "<li>Seu carrinho está vazio</li>";
    totalPedido.innerHTML = "Total: R$0.00";
  }

  const items = document.querySelectorAll(".remover-item");
  items.forEach((item) => {
    item.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      produtos.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(produtos));
      fazerPedido();
    });
  });

  document.querySelector('form').addEventListener('submit', ()=>{
    localStorage.removeItem('cart')
    alert('Pedido realizado com sucesso!')
  })
}
