// js/detail.js
import { getProductById } from "./api.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const img = document.querySelector("#prod-img");
const nombre = document.querySelector("#prod-nombre");
const precio = document.querySelector("#prod-precio");
const descripcion = document.querySelector("#prod-descripcion");
const stock = document.querySelector("#prod-stock");
const btnCart = document.querySelector("#btn-cart");

async function loadProduct() {
    const p = await getProductById(id);

    img.src = p.imagen;
    img.alt = p.nombre;

    nombre.textContent = p.nombre;
    precio.textContent = `$${p.precio}`;
    descripcion.textContent = p.descripcion || "";
    stock.textContent = `Stock disponible: ${p.stock || 1}`;

    btnCart.addEventListener("click", () => addToCart(p));
}

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = cart.find(item => item.id === product.id);

    if (found) {
        found.cantidad += 1;
    } else {
        cart.push({ ...product, cantidad: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

loadProduct();
