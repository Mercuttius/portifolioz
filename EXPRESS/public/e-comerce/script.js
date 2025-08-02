// Product data
const products = [
    { id: 1, name: 'Smartphone Premium', description: 'Último lançamento com tecnologia avançada', price: 1299.99, category: 'electronics', emoji: '📱' },
    { id: 2, name: 'Laptop Ultra', description: 'Performance excepcional para trabalho e jogos', price: 2499.99, category: 'electronics', emoji: '💻' },
    { id: 3, name: 'Fones Bluetooth', description: 'Som cristalino e cancelamento de ruído', price: 399.99, category: 'electronics', emoji: '🎧' },
    { id: 4, name: 'Camiseta Designer', description: 'Algodão premium com design exclusivo', price: 89.99, category: 'fashion', emoji: '👕' },
    { id: 5, name: 'Tênis Esportivo', description: 'Conforto e estilo para o dia a dia', price: 249.99, category: 'fashion', emoji: '👟' },
    { id: 6, name: 'Relógio Smart', description: 'Monitore sua saúde e receba notificações', price: 599.99, category: 'electronics', emoji: '⌚' },
    { id: 7, name: 'Mesa de Centro', description: 'Design moderno para sua sala de estar', price: 799.99, category: 'home', emoji: '🪑' },
    { id: 8, name: 'Luminária LED', description: 'Iluminação inteligente e econômica', price: 149.99, category: 'home', emoji: '💡' },
    { id: 9, name: 'Jaqueta Premium', description: 'Proteção e estilo para todas as estações', price: 199.99, category: 'fashion', emoji: '🧥' }
];

let cart = [];
let currentFilter = 'all';

// Initialize the app
function init() {
    displayProducts();
    updateCartCount();
}

// Display products
function displayProducts() {
    const grid = document.getElementById('products-grid');
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(product => product.category === currentFilter);

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');
}

// Filter products
function filterProducts(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    displayProducts();
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    updateCartDisplay();
    
    // Show feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Adicionado!';
    btn.style.background = '#27ae60';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '#3498db';
    }, 1000);
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Seu carrinho está vazio</p></div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.emoji}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 1rem; background: #e74c3c; color: white;">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateCartTotal();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = total.toFixed(2).replace('.', ',');
}

// Toggle cart sidebar
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    
    if (sidebar.classList.contains('open')) {
        updateCartDisplay();
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    alert(`Pedido realizado com sucesso!\n\nItens: ${itemCount}\nTotal: R$ ${total.toFixed(2).replace('.', ',')}\n\nObrigado pela sua compra!`);
    
    // Clear cart
    cart = [];
    updateCartCount();
    updateCartDisplay();
    toggleCart();
}

// Scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);