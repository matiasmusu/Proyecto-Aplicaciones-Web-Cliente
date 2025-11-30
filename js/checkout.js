const summaryContainer = document.querySelector("#checkout-summary");
const form = document.querySelector("#checkout-form");
const msg = document.querySelector("#checkout-msg");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderSummary() {
    if (cart.length === 0) {
        summaryContainer.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    let html = `<h2>Resumen de compra</h2>`;

    cart.forEach(item => {
        html += `
            <div class="cart-item">
                <div class="cart-product-info">
                    <img src="${item.imagen}" class="cart-img">
                    <div>
                        <h3>${item.nombre}</h3>
                        <p>Cantidad: ${item.cantidad}</p>
                        <p>Subtotal: $${item.precio * item.cantidad}</p>
                    </div>
                </div>
            </div>
        `;
    });

    const total = cart.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    html += `<h3>Total: $${total}</h3>`;

    summaryContainer.innerHTML = html;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const direccion = document.querySelector("#direccion").value;

    if (!nombre || !email || !direccion) return;

    msg.textContent = "Compra realizada con éxito. ¡Gracias por tu pedido!";
    msg.style.color = "lightgreen";

    localStorage.removeItem("cart");
});

renderSummary();
