window.addEventListener("load", fazerPedido);

const cartItens = document.getElementById("lista-itens");
const totalPedido = document.getElementById("total-pedido");
let total = 0;

function fazerPedido() {
  const cart = localStorage.getItem("cart");
  const produtos = JSON.parse(cart);
  if (cart) {
    cartItens.innerHTML = "";
    let total = 0;

    produtos.forEach((p, index) => {
      total += p.price;
      cartItens.innerHTML += `
          <li data-index="${index}">
            <img src=${"../img/" + p.image_url} alt=${p.name}>
            <p>${p.name}</p>
            <p>R$${p.price.toFixed(2)}</p>
            <span class="remover-item" data-index="${index}"> X </span>
          </li>
          `;
    });
    totalPedido.innerHTML = `Total: R$${total.toFixed(2)}`;
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
}
