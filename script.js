let cart = []; // Arreglo para almacenar los productos del carrito

// Función para agregar productos al carrito
function addToCart(productName, productPrice) {
    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito, incrementamos la cantidad
        cart[existingProductIndex].quantity += 1;
    } else {
        // Si no existe, lo agregamos con cantidad 1
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    
    renderCart(); // Actualizar la vista del carrito
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Eliminar el producto del arreglo
    renderCart(); // Actualizar la vista del carrito
}

// Función para actualizar la cantidad de productos
function updateQuantity(index, quantity) {
    if (quantity < 1) {
        removeFromCart(index); // Si la cantidad es menor a 1, eliminamos el producto
    } else {
        cart[index].quantity = quantity; // Actualizamos la cantidad del producto
    }
    renderCart(); // Actualizar la vista del carrito
}

// Función para renderizar el carrito
function renderCart() {
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = ''; // Limpiar el contenido actual del carrito

    cart.forEach((item, index) => {
        // Crear una nueva fila para cada producto en el carrito
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.name}</td>
            <td>
                <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart(${index})">Eliminar</button></td>
        `;

        cartBody.appendChild(row);
    });

    // Calcular el total de la compra
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('total-price').textContent = `Total: $${totalPrice.toFixed(2)}`;
}
