// ==================== PRODUCT DATA ==================== 
const products = [
    {
        id: 1,
        name: "Royal Emerald Panjabi",
        category: "Premium Panjabi",
        image: "https://via.placeholder.com/300x400?text=Royal+Emerald+Panjabi",
        originalPrice: 2500,
        discountedPrice: 1999,
        discount: 20,
        description: "Elegant emerald green Panjabi with intricate embroidery and traditional Panjabi collar design. Perfect for formal occasions.",
        stock: 5
    },
    {
        id: 2,
        name: "Golden Heritage Panjabi",
        category: "Luxury Collection",
        image: "https://via.placeholder.com/300x400?text=Golden+Heritage",
        originalPrice: 3200,
        discountedPrice: 2399,
        discount: 25,
        description: "Luxurious white Panjabi with golden embroidered details. An excellent choice for weddings and celebrations.",
        stock: 3
    },
    {
        id: 3,
        name: "Maroon Majesty Panjabi",
        category: "Classic Panjabi",
        image: "https://via.placeholder.com/300x400?text=Maroon+Majesty",
        originalPrice: 2200,
        discountedPrice: 1649,
        discount: 25,
        description: "Deep maroon Panjabi with sophisticated stitching and comfortable fit. Ideal for everyday formal wear.",
        stock: 8
    },
    {
        id: 4,
        name: "Cream Elegance Panjabi",
        category: "Premium Panjabi",
        image: "https://via.placeholder.com/300x400?text=Cream+Elegance",
        originalPrice: 2400,
        discountedPrice: 1799,
        discount: 25,
        description: "Creamy white Panjabi with subtle embellishments. Perfect for religious ceremonies and family gatherings.",
        stock: 6
    },
    {
        id: 5,
        name: "Navy Midnight Panjabi",
        category: "Modern Collection",
        image: "https://via.placeholder.com/300x400?text=Navy+Midnight",
        originalPrice: 2300,
        discountedPrice: 1699,
        discount: 26,
        description: "Deep navy blue Panjabi with contemporary design. A versatile choice for various occasions.",
        stock: 7
    },
    {
        id: 6,
        name: "Silver Moonlight Panjabi",
        category: "Luxury Collection",
        image: "https://via.placeholder.com/300x400?text=Silver+Moonlight",
        originalPrice: 3500,
        discountedPrice: 2449,
        discount: 30,
        description: "Exquisite silver and white Panjabi with premium quality fabric. Perfect for grand celebrations.",
        stock: 2
    }
];

// ==================== INITIALIZE CART ==================== 
let cart = JSON.parse(localStorage.getItem('nooranCart')) || [];

// ==================== DOM ELEMENTS ==================== 
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartSubtotal = document.getElementById('cartSubtotal');
const closeCart = document.getElementById('closeCart');
const quickViewModal = document.getElementById('quickViewModal');
const closeModal = document.getElementById('closeModal');
const overlay = document.getElementById('overlay');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutForm = document.getElementById('checkoutForm');
const successNotification = document.getElementById('successNotification');
const okBtn = document.getElementById('okBtn');
const addToCartBtn = document.getElementById('addToCartBtn');
const sizeOptions = document.getElementById('sizeOptions');
const quantityInput = document.getElementById('quantityInput');
const decreaseQty = document.getElementById('decreaseQty');
const increaseQty = document.getElementById('increaseQty');
const shopNowBtn = document.getElementById('shopNowBtn');
const menuToggle = document.getElementById('menuToggle');

let selectedSize = '';
let currentProductId = '';

// ==================== RENDER PRODUCTS ==================== 
/**
 * Renders all products to the product grid
 */
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="discount-badge">${product.discount}% OFF</div>
            </div>
            <div class="product-content">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="original-price">৳${product.originalPrice}</span>
                    <span class="discounted-price">৳${product.discountedPrice}</span>
                </div>
                <button class="quick-view-btn" data-product-id="${product.id}">Quick View</button>
            </div>
        </div>
    `).join('');

    // Add click listeners to Quick View buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openQuickView(parseInt(btn.dataset.productId));
        });
    });
}

// ==================== QUICK VIEW MODAL FUNCTIONALITY ==================== 
/**
 * Opens the quick view modal with product details
 * @param {number} productId - The ID of the product to display
 */
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    currentProductId = productId;
    selectedSize = '';

    // Reset form
    quantityInput.value = 1;
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));

    // Populate modal with product data
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalOriginalPrice').textContent = `৳${product.originalPrice}`;
    document.getElementById('modalDiscountedPrice').textContent = `৳${product.discountedPrice}`;
    document.getElementById('modalDiscount').textContent = `${product.discount}% OFF`;
    document.getElementById('modalProductDescription').textContent = product.description;
    
    const stockStatus = product.stock > 0 ? `${product.stock} pieces left` : 'Out of Stock';
    document.getElementById('modalStockStatus').textContent = stockStatus;

    openModal(quickViewModal);
}

/**
 * Opens a modal with overlay
 * @param {HTMLElement} modal - The modal element to open
 */
function openModal(modal) {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Closes a modal and overlay
 * @param {HTMLElement} modal - The modal element to close
 */
function closeModalFunc(modal) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ==================== SIZE SELECTION ==================== 
/**
 * Handles size button clicks
 */
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('size-btn')) {
        // Remove active class from all size buttons
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');
        selectedSize = e.target.dataset.size;
    }
});

// ==================== QUANTITY CONTROLS ==================== 
/**
 * Increases quantity
 */
increaseQty.addEventListener('click', () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
});

/**
 * Decreases quantity
 */
decreaseQty.addEventListener('click', () => {
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
});

// ==================== ADD TO CART ==================== 
/**
 * Adds a product to the cart
 */
addToCartBtn.addEventListener('click', () => {
    if (!selectedSize) {
        alert('Please select a size');
        return;
    }

    const product = products.find(p => p.id === currentProductId);
    const quantity = parseInt(quantityInput.value);

    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.discountedPrice,
        size: selectedSize,
        quantity: quantity,
        image: product.image,
        totalPrice: product.discountedPrice * quantity
    };

    // Check if item with same size already exists in cart
    const existingItem = cart.find(item => item.id === product.id && item.size === selectedSize);
    
    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
        cart.push(cartItem);
    }

    saveCart();
    updateCartUI();
    closeModalFunc(quickViewModal);

    // Show success feedback
    showAddToCartNotification(product.name);
});

/**
 * Shows a temporary notification when item is added to cart
 */
function showAddToCartNotification(productName) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #1a472a, #8b2e2e);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 500;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;
    notification.textContent = `✓ ${productName} added to cart!`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== CART MANAGEMENT ==================== 
/**
 * Saves cart to localStorage
 */
function saveCart() {
    localStorage.setItem('nooranCart', JSON.stringify(cart));
}

/**
 * Updates the cart UI (sidebar and count badge)
 */
function updateCartUI() {
    // Update cart count
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        cartEmpty.style.display = 'flex';
    } else {
        cartEmpty.style.display = 'none';
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-size">Size: ${item.size}</div>
                    <div class="cart-item-price">৳${item.totalPrice} (x${item.quantity})</div>
                </div>
                <button class="cart-item-remove" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        // Add remove button functionality
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                removeFromCart(parseInt(btn.dataset.index));
            });
        });
    }

    // Update subtotal
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    cartSubtotal.textContent = `৳${subtotal}`;
}

/**
 * Removes an item from the cart
 * @param {number} index - The index of the item to remove
 */
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

// ==================== CART SIDEBAR TOGGLE ==================== 
/**
 * Opens the cart sidebar
 */
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

/**
 * Closes the cart sidebar
 */
closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

/**
 * Close cart when clicking overlay
 */
overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    quickViewModal.classList.remove('active');
    checkoutModal.classList.remove('active');
    overlay.classList.remove('active');
});

// ==================== CHECKOUT FUNCTIONALITY ==================== 
/**
 * Opens the checkout modal
 */
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    // Populate order summary
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const orderSummaryItems = document.getElementById('orderSummaryItems');
    
    orderSummaryItems.innerHTML = cart.map(item => `
        <div class="order-summary-item">
            <span>${item.name} (${item.size}) x${item.quantity}</span>
            <span>৳${item.totalPrice}</span>
        </div>
    `).join('');

    document.getElementById('orderTotal').textContent = `৳${subtotal}`;

    // Open checkout modal
    cartSidebar.classList.remove('active');
    overlay.classList.add('active');
    checkoutModal.classList.add('active');
});

/**
 * Form validation
 */
function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    let isValid = true;

    // Full Name validation
    if (!fullName || fullName.length < 3) {
        document.getElementById('nameError').textContent = 'Please enter a valid full name';
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }

    // Phone Number validation (BD format)
    const bdPhoneRegex = /^(\+?880|0)[1-9]\d{8,9}$/;
    if (!bdPhoneRegex.test(phoneNumber.replace(/\s+/g, ''))) {
        document.getElementById('phoneError').textContent = 'Please enter a valid BD phone number';
        isValid = false;
    } else {
        document.getElementById('phoneError').textContent = '';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    // Address validation
    if (!address || address.length < 10) {
        document.getElementById('addressError').textContent = 'Please enter a complete address';
        isValid = false;
    } else {
        document.getElementById('addressError').textContent = '';
    }

    return isValid;
}

/**
 * Handles form submission
 */
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const fullName = document.getElementById('fullName').value;
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

    // Close checkout modal
    closeModalFunc(checkoutModal);

    // Show success notification
    const successMessage = document.getElementById('successMessage');
    successMessage.innerHTML = `
        Thank you for shopping with Nooran, ${fullName}!<br>
        Order Total: ৳${subtotal}<br>
        Payment Method: ${paymentMethod.toUpperCase()}
    `;

    successNotification.classList.add('active');

    // Reset cart and form after 5 seconds
    setTimeout(() => {
        cart = [];
        saveCart();
        updateCartUI();
        checkoutForm.reset();
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
        successNotification.classList.remove('active');
    }, 5000);
});

/**
 * Closes success notification
 */
okBtn.addEventListener('click', () => {
    cart = [];
    saveCart();
    updateCartUI();
    checkoutForm.reset();
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
    successNotification.classList.remove('active');
});

// ==================== MODAL CLOSE BUTTONS ==================== 
/**
 * Close quick view modal
 */
closeModal.addEventListener('click', () => {
    closeModalFunc(quickViewModal);
});

/**
 * Close checkout modal
 */
closeCheckout.addEventListener('click', () => {
    closeModalFunc(checkoutModal);
});

// ==================== SHOP NOW BUTTON ==================== 
/**
 * Scrolls to products section when Shop Now is clicked
 */
shopNowBtn.addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});

// ==================== MOBILE MENU TOGGLE ==================== 
/**
 * Toggles mobile menu (placeholder for mobile navigation)
 */
menuToggle.addEventListener('click', () => {
    // You can implement mobile menu functionality here if needed
    alert('Navigation menu for mobile devices');
});

// ==================== INITIALIZE APPLICATION ==================== 
/**
 * Initializes the application on page load
 */
function init() {
    renderProducts();
    updateCartUI();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// ==================== ADD ANIMATION KEYFRAME ==================== 
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// ==================== KEYBOARD SHORTCUTS ==================== 
/**
 * Closes modals when Escape key is pressed
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (quickViewModal.classList.contains('active')) {
            closeModalFunc(quickViewModal);
        }
        if (checkoutModal.classList.contains('active')) {
            closeModalFunc(checkoutModal);
        }
    }
});

// ==================== LAZY LOADING IMAGES ==================== 
/**
 * Implements lazy loading for product images
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// ==================== UTILITY FUNCTIONS ==================== 
/**
 * Formats currency for display
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return `৳${amount.toLocaleString('bn-BD')}`;
}
