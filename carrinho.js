// Função para carregar o carrinho do localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const retirada = document.getElementById('retirada');
    
    
    cartCount.textContent = cart.length;

    // Calcular total
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cartTotal) {
            cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    }
    
    return cart;
}

// Função para salvar o carrinho no localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para adicionar produto ao carrinho
function addToCart(name, price) {
    const cart = loadCart();
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    saveCart(cart);
    loadCart();  // Atualiza a contagem no carrinho
}

// Evento para adicionar ao carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const name = event.target.getAttribute('data-name');
        const price = parseFloat(event.target.getAttribute('data-price'));
        
        addToCart(name, price);
    });
});

// Função para renderizar o carrinho na página do carrinho
function renderCart() {
    const cart = loadCart();
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartContainer) return;

    cartContainer.innerHTML = '';  // Limpar carrinho atual
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="imagens/${item.name}.jpg" width="100px">
            <p>${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
            <button class="remove-item" data-name="${item.name}">Remover</button>
        `;
        cartContainer.appendChild(itemElement);

        total += item.price * item.quantity;
    });

    if (cartTotal) {
        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Evento de remoção de item do carrinho
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const name = event.target.getAttribute('data-name');
            removeFromCart(name);
        });
    });
}

// Função para remover item do carrinho
function removeFromCart(name) {
    let cart = loadCart();
    cart = cart.filter(item => item.name !== name);
    saveCart(cart);
    renderCart();  // Atualiza a lista do carrinho na página
}

// Carregar o carrinho ao iniciar a página
loadCart();

// Renderizar o carrinho na página do carrinho
if (document.getElementById('cart-items')) {
    renderCart();
}
