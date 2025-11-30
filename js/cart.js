// js/cart.js
const cartItemsContainer = document.querySelector("#cart-items");
const cartTotalContainer = document.querySelector("#cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    cartItemsContainer.innerHTML = "";

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <div class="cart-product-info">
                <img src="${item.imagen}" alt="${item.nombre}" class="cart-img">
                <div>
                    <h3>${item.nombre}</h3>
                    <p>Precio: $${item.precio}</p>
                </div>
            </div>

            <div class="cart-controls">
                <button class="qty-btn" data-action="minus" data-id="${item.id}">-</button>
                <span class="qty">${item.cantidad}</span>
                <button class="qty-btn" data-action="plus" data-id="${item.id}">+</button>
                <button class="delete-btn" data-id="${item.id}">Eliminar</button>
            </div>
        `;

        cartItemsContainer.appendChild(div);
    });

    updateTotal();
    bindButtons();
}

function bindButtons() {
    document.querySelectorAll(".qty-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const action = btn.dataset.action;
            const item = cart.find(p => p.id === id);

            if (action === "minus" && item.cantidad > 1) item.cantidad--;
            if (action === "plus") item.cantidad++;

            saveCart();
            renderCart();
        });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            cart = cart.filter(p => p.id !== id);

            saveCart();
            renderCart();
        });
    });
}

function updateTotal() {
    const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    cartTotalContainer.textContent = `Total: $${total}`;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

renderCart();
 