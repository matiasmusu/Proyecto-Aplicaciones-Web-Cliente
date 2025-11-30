// js/admin.js
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "./api.js";

const tbody = document.querySelector("#admin-tbody");
const form = document.querySelector("#admin-form");
const formTitle = document.querySelector("#admin-form-title");
const msg = document.querySelector("#admin-msg");
const btnCancelar = document.querySelector("#admin-cancelar");

const inputId = document.querySelector("#prod-id");
const inputNombre = document.querySelector("#prod-nombre");
const inputPrecio = document.querySelector("#prod-precio");
const inputCategoria = document.querySelector("#prod-categoria");
const inputEstado = document.querySelector("#prod-estado");
const inputStock = document.querySelector("#prod-stock");
const inputImagen = document.querySelector("#prod-imagen");
const inputDescripcion = document.querySelector("#prod-descripcion");

let currentProducts = [];

async function loadProducts() {
    msg.textContent = "";
    currentProducts = await getProducts();
    renderTable();
}

function renderTable() {
    tbody.innerHTML = "";

    currentProducts.forEach(p => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.nombre || ""}</td>
            <td>$${p.precio || 0}</td>
            <td>${p.categoria || ""}</td>
            <td>${p.estado || ""}</td>
            <td>${p.stock || 0}</td>
            <td>
                <button class="admin-edit-btn" data-id="${p.id}">Editar</button>
                <button class="admin-delete-btn" data-id="${p.id}">Eliminar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    bindRowButtons();
}

function bindRowButtons() {
    document.querySelectorAll(".admin-edit-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const product = currentProducts.find(p => p.id === id);
            fillForm(product);
        });
    });

    document.querySelectorAll(".admin-delete-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const id = btn.dataset.id;
            const confirmar = confirm("¿Seguro que deseas eliminar este producto?");
            if (!confirmar) return;

            await deleteProduct(id);
            await loadProducts();
        });
    });
}

function fillForm(product) {
    inputId.value = product.id;
    inputNombre.value = product.nombre || "";
    inputPrecio.value = product.precio || "";
    inputCategoria.value = product.categoria || "";
    inputEstado.value = product.estado || "";
    inputStock.value = product.stock || "";
    inputImagen.value = product.imagen || "";
    inputDescripcion.value = product.descripcion || "";

    formTitle.textContent = "Editar producto";
}

function resetForm() {
    inputId.value = "";
    form.reset();
    formTitle.textContent = "Crear producto";
    msg.textContent = "";
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fields = {
        nombre: inputNombre.value,
        precio: Number(inputPrecio.value),
        categoria: inputCategoria.value,
        estado: inputEstado.value,
        stock: Number(inputStock.value),
        imagen: inputImagen.value,
        descripcion: inputDescripcion.value
    };

    const id = inputId.value;

    if (id) {
        await updateProduct(id, fields);
        msg.textContent = "Producto actualizado correctamente.";
    } else {
        await createProduct(fields);
        msg.textContent = "Producto creado correctamente.";
    }

    await loadProducts();
    resetForm();
});

btnCancelar.addEventListener("click", () => {
    resetForm();
});

loadProducts();
