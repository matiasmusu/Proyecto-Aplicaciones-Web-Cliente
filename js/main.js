// js/main.js
import { getProducts } from "./api.js";

let allProducts = [];
let filtered = [];

const container = document.querySelector(".product-container");

const categoria = document.querySelector("#categoria");
const precio = document.querySelector("#precio");
const precioValor = document.querySelector("#precio-valor");
const checkNuevo = document.querySelector("input[name='nuevo']");
const checkUsado = document.querySelector("input[name='usado']");
const searchInput = document.querySelector("#search");
const filterForm = document.querySelector(".filters-sidebar form");

async function init() {
    allProducts = await getProducts();
    filtered = [...allProducts];
    renderProducts();
    initFilters();
}

function renderProducts() {
    container.innerHTML = "";

    filtered.forEach(prod => {
        const item = document.createElement("article");
        item.classList.add("product-item");

        item.innerHTML = `
            <a href="./productos.html?id=${prod.id}">
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>Precio: $${prod.precio}</p>
            </a>
        `;

        container.appendChild(item);
    });
}

function initFilters() {
    categoria.addEventListener("change", applyFilters);
    precio.addEventListener("input", () => {
        precioValor.textContent = `$${precio.value}`;
        applyFilters();
    });
    checkNuevo.addEventListener("change", applyFilters);
    checkUsado.addEventListener("change", applyFilters);

    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }

    filterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        applyFilters();
    });

    filterForm.addEventListener("reset", () => {
        setTimeout(() => {
            precioValor.textContent = `$${precio.value}`;
            applyFilters();
        }, 0);
    });
}

function applyFilters() {
    const searchText = searchInput ? searchInput.value.toLowerCase() : "";

    filtered = allProducts.filter(p => {
        const matchCategoria = categoria.value ? p.categoria === categoria.value : true;
        const matchPrecio = p.precio <= Number(precio.value);

        const isNuevo = checkNuevo.checked;
        const isUsado = checkUsado.checked;

        const matchEstado =
            (!isNuevo && !isUsado) ||
            (isNuevo && p.estado === "nuevo") ||
            (isUsado && p.estado === "usado");

        const matchSearch =
            !searchText ||
            (p.nombre && p.nombre.toLowerCase().includes(searchText)) ||
            (p.descripcion && p.descripcion.toLowerCase().includes(searchText));

        return matchCategoria && matchPrecio && matchEstado && matchSearch;
    });

    renderProducts();
}

init();
