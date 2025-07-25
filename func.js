// Scroll animation trigger
const animateElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });



animateElements.forEach(el => observer.observe(el));
document.addEventListener('DOMContentLoaded', function () {
    // Floor Tab Navigation
    const floorTabs = document.querySelectorAll('.floor-tab');
    const floorContents = document.querySelectorAll('.floor-content');

    floorTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const floorId = this.getAttribute('id').replace('-tab', '');

            // Update tab states
            floorTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
                t.setAttribute('tabindex', '-1');
            });

            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            this.removeAttribute('tabindex');

            // Update content visibility
            floorContents.forEach(content => {
                if (content.id === floorId) {
                    content.classList.add('active');
                    content.removeAttribute('hidden');
                    content.setAttribute('tabindex', '0');
                } else {
                    content.classList.remove('active');
                    content.setAttribute('hidden', 'true');
                    content.setAttribute('tabindex', '-1');
                }
            });
        });
    });

    // Book Now Button Handler
    const bookButtons = document.querySelectorAll('.btn-book');
    bookButtons.forEach(button => {
        button.addEventListener('click', function () {
            const roomId = this.getAttribute('data-room-id');
            const roomTitle = this.parentElement.parentElement.querySelector('h3').textContent;

            // Here you would typically open a booking modal or redirect to a booking page
            console.log(`Booking room: ${roomTitle} (ID: ${roomId})`);
            alert(`You are booking: ${roomTitle}\nRoom ID: ${roomId}\n\nThis would typically open a booking form.`);

            // In a real implementation, you might do something like:
            // openBookingModal(roomId, roomTitle);
        });
    });

    // Keyboard navigation for tabs
    floorTabs.forEach(tab => {
        tab.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }

            // Arrow key navigation between tabs
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const currentIndex = Array.from(floorTabs).indexOf(this);
                let nextIndex;

                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % floorTabs.length;
                } else {
                    nextIndex = (currentIndex - 1 + floorTabs.length) % floorTabs.length;
                }

                floorTabs[nextIndex].focus();
                floorTabs[nextIndex].click();
            }
        });
    });

    // Initialize the first tab as active
    if (floorTabs.length > 0) {
        floorTabs[0].click();
    }
});

// This would be part of your modal handling in a complete implementation
function openBookingModal(roomId, roomTitle) {
    // Create and show a modal with booking form
    // You would implement this based on your modal system
    console.log(`Opening booking modal for ${roomTitle}`);
}


document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.luxury-menu-toggle');
    const navLinks = document.querySelector('.luxury-nav-links');
    const navActions = document.querySelector('.luxury-nav-actions');

    menuToggle.addEventListener('click', function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
        navActions.classList.toggle('active');
    });
});

document.addEventListener('click', function (event) {
    if (!event.target.closest('.luxury-nav') &&
        navLinks.classList.contains('active')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        navActions.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // =====================
    // DINING SECTION FUNCTIONALITY
    // =====================
    const diningTabs = document.querySelectorAll('.dining-tab');
    const diningContents = document.querySelectorAll('.dining-content');

    // Initialize first tab as active
    if (diningTabs.length > 0) {
        diningTabs[0].classList.add('active');
        diningContents[0].removeAttribute('hidden');
    }

    // Tab switching functionality
    diningTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            diningTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
                t.removeAttribute('tabindex');
            });

            // Add active class to clicked tab
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            // Hide all content sections
            diningContents.forEach(content => {
                content.setAttribute('hidden', 'true');
            });

            // Show the selected content section
            const targetId = this.getAttribute('aria-controls');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.removeAttribute('hidden');

                // Smooth scroll to section if on mobile
                if (window.innerWidth < 768) {
                    targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // =====================
    // MENU ITEM INTERACTIONS
    // =====================
    const menuItems = document.querySelectorAll('.menu-card');

    menuItems.forEach(item => {
        // Add hover effects
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });

        // Add to cart functionality
        const addToCartBtn = item.querySelector('.btn-add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                const itemId = this.getAttribute('data-item-id');
                const itemTitle = this.parentElement.parentElement.querySelector('h3').textContent;
                const itemPrice = this.parentElement.querySelector('.menu-price').textContent;

                // Create visual feedback
                const feedback = document.createElement('span');
                feedback.textContent = 'Added!';
                feedback.style.position = 'absolute';
                feedback.style.right = '10px';
                feedback.style.bottom = '10px';
                feedback.style.color = '#A52A2A';
                feedback.style.fontWeight = '600';
                feedback.style.fontSize = '0.8rem';
                feedback.style.animation = 'fadeOut 1.5s forwards';

                this.parentElement.appendChild(feedback);

                // Remove feedback after animation
                setTimeout(() => {
                    feedback.remove();
                }, 1500);

                // Here you would typically add to cart logic
                console.log(`Added to cart: ${itemTitle} (${itemId}) - ${itemPrice}`);

                // You would replace this with actual cart functionality
                // addToCart(itemId, itemTitle, itemPrice);
            });
        }
    });

    // =====================
    // SERVICES SECTION INTERACTIONS
    // =====================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });

        // Book service button
        const bookBtn = card.querySelector('.btn-book-service');
        if (bookBtn) {
            bookBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const serviceTitle = this.closest('.service-card-content').querySelector('h3').textContent;

                // Visual feedback
                this.style.backgroundColor = '#D4AF37';
                this.style.color = '#ffffff';

                setTimeout(() => {
                    this.style.backgroundColor = 'transparent';
                    this.style.color = '#000000';
                }, 300);

                // Here you would typically implement booking logic
                console.log(`Booking service: ${serviceTitle}`);

                // You would replace this with actual booking functionality
                // bookService(serviceTitle);
            });
        }
    });

    // =====================
    // HELPER FUNCTIONS
    // =====================

    // Debounce function for scroll/resize events
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);

    // Handle window resize
    window.addEventListener('resize', debounce(function () {
        // Any responsive adjustments can go here
    }));
});
document.addEventListener('DOMContentLoaded', function () {
    // Cart state with localStorage
    const cart = {
        items: JSON.parse(localStorage.getItem('cartItems')) || [],
        total: 0,

        // Add item to cart
        addItem: function (itemId, name, price) {
            const existingItem = this.items.find(item => item.id === itemId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({
                    id: itemId,
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            this.updateCart();
        },

        // Remove item from cart
        removeItem: function (itemId) {
            this.items = this.items.filter(item => item.id !== itemId);
            this.updateCart();
        },

        // Update quantity of an item
        updateQuantity: function (itemId, newQuantity) {
            const item = this.items.find(item => item.id === itemId);
            if (item) {
                item.quantity = newQuantity;
                if (item.quantity <= 0) {
                    this.removeItem(itemId);
                } else {
                    this.updateCart();
                }
            }
        },

        // Clear all items
        clearCart: function () {
            this.items = [];
            this.updateCart();
        },

        // Calculate total and save to localStorage
        updateCart: function () {
            this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            localStorage.setItem('cartItems', JSON.stringify(this.items));
            this.renderCart();
            this.updateCartCounter();
        },

        // Render cart UI
        renderCart: function () {
            const cartList = document.querySelector('.cart-list');

            if (this.items.length === 0) {
                cartList.innerHTML = '<p class="empty-cart-message">Your cart is empty. Add some delicious items!</p>';
                document.querySelector('.cart-total span').textContent = '₦0';
                document.querySelector('.btn-clear-cart').style.display = 'none';
                return;
            }

            let html = '<ul class="cart-items">';

            this.items.forEach(item => {
                html += `
                    <li class="cart-item" data-item-id="${item.id}" style="
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    margin-bottom: 12px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-left: 4px solid #4CAF50;
">
    <div class="cart-item-info" style="flex: 1; min-width: 0; margin-right: 20px;">
        <h4 style="
            margin: 0 0 8px 0;
            font-size: 17px;
            font-weight: 600;
            color: #2c3e50;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        ">${item.name}</h4>
        <p style="
            margin: 0;
            font-size: 14px;
            color: #7f8c8d;
            font-weight: 500;
        ">₦${item.price.toLocaleString()} × <span style="color: #2c3e50;">${item.quantity}</span></p>
    </div>
    <div class="cart-item-controls" style="
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 0 15px;
    ">
        <button class="btn-quantity minus" aria-label="Decrease quantity" style="
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 6px;
            background: #f1f1f1;
            color: #2c3e50;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        ">−</button>
        <span style="
            min-width: 24px;
            text-align: center;
            font-weight: 600;
            color: #2c3e50;
            font-size: 15px;
        ">${item.quantity}</span>
        <button class="btn-quantity plus" aria-label="Increase quantity" style="
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 6px;
            background: #f1f1f1;
            color: #2c3e50;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        ">+</button>
        <button class="btn-remove" aria-label="Remove item" style="
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 6px;
            background: #ffeeee;
            color: #e74c3c;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            margin-left: 10px;
        ">×</button>
    </div>
    <p class="cart-item-total" style="
        font-weight: 700;
        color: #2c3e50;
        min-width: 90px;
        text-align: right;
        font-size: 16px;
    ">₦${(item.price * item.quantity).toLocaleString()}</p>
</li>
                `;
            });

            html += '</ul>';
            cartList.innerHTML = html;
            document.querySelector('.cart-total span').textContent = `₦${this.total.toLocaleString()}`;
            document.querySelector('.btn-clear-cart').style.display = 'block';

            this.addCartEventListeners();
        },

        // Update cart counter badge
        updateCartCounter: function () {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            const counter = document.querySelector('.cart-counter');

            if (totalItems > 0) {
                counter.textContent = totalItems;
                counter.style.display = 'flex';
            } else {
                counter.style.display = 'none';
            }
        },

        // Add event listeners to cart controls
        addCartEventListeners: function () {
            document.querySelectorAll('.btn-quantity.minus').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = e.target.closest('.cart-item').dataset.itemId;
                    const item = this.items.find(item => item.id === itemId);
                    if (item) this.updateQuantity(itemId, item.quantity - 1);
                });
            });

            document.querySelectorAll('.btn-quantity.plus').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = e.target.closest('.cart-item').dataset.itemId;
                    const item = this.items.find(item => item.id === itemId);
                    if (item) this.updateQuantity(itemId, item.quantity + 1);
                });
            });

            document.querySelectorAll('.btn-remove').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = e.target.closest('.cart-item').dataset.itemId;
                    this.removeItem(itemId);
                });
            });
        }
    };

    // Initialize cart on load
    cart.updateCart();

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.dataset.itemId;
            const menuCard = e.target.closest('.menu-card');
            const itemName = menuCard.querySelector('h3').textContent;
            const itemPrice = parseFloat(menuCard.querySelector('.menu-price').textContent.replace(/[^\d.]/g, ''));

            cart.addItem(itemId, itemName, itemPrice);

            // Visual feedback with animation
            const originalText = e.target.textContent;
            e.target.textContent = '✓ Added!';
            e.target.classList.add('added');

            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.classList.remove('added');
            }, 1500);
        });
    });

    // Clear cart button
    document.querySelector('.btn-clear-cart')?.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart.clearCart();
        }
    });

    // Checkout button (basic implementation)
    document.querySelector('.btn-checkout')?.addEventListener('click', () => {
        if (cart.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert(`Order placed! Total: ₦${cart.total.toLocaleString()}\n\nThis is a demo. Connect to a payment gateway for real transactions.`);
        cart.clearCart();
    });

    // Add cart counter to the UI if it doesn't exist
    if (!document.querySelector('.cart-counter')) {
        const cartIcon = document.querySelector('.cart-icon') || document.querySelector('#cart-heading');
        if (cartIcon) {
            const counter = document.createElement('span');
            counter.className = 'cart-counter';
            cartIcon.appendChild(counter);
            cart.updateCartCounter();
        }
    }
});

// Enhanced CSS (add to your stylesheet)
const style = document.createElement('style');
style.textContent = `
    /* Cart counter badge */
    .cart-counter {
        display: none;
        position: absolute;
        top: -8px;
        right: -8px;
        background: #e91e63;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 12px;
        align-items: center;
        justify-content: center;
    }
    
    /* Cart item animations */
    .cart-item {
        transition: all 0.3s ease;
    }
    
    .cart-item:hover {
        background: #f9f9f9;
    }
    
    /* Add to cart button animation */
    .btn-add-to-cart.added {
        background-color: #4CAF50 !important;
        transform: scale(0.95);
    }
    
    .btn-add-to-cart {
        transition: all 0.3s ease;
    }
    
    /* Empty cart message */
    .empty-cart-message {
        text-align: center;
        padding: 2rem;
        color: #666;
    }
    
    /* Clear cart button */
    .btn-clear-cart {
        background: none;
        border: none;
        color: #ff5252;
        cursor: pointer;
        margin-top: 1rem;
        display: none;
    }
    
    /* Checkout button */
    .btn-checkout {
        background: #4CAF50;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.3s;
    }
    
    .btn-checkout:hover {
        background: #388E3C;
    }
`;
document.head.appendChild(style);

// Inject CSS styles for enhanced animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Smooth scroll behavior for the entire page */
    html {
        scroll-behavior: smooth;
        scroll-padding-top: 80px; /* Adjust for fixed header */
    }

    /* Base animation for elements fading in */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px); /* Reduced offset for mobile */
        transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: opacity, transform;
    }

    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* Reset animation state when out of viewport */
    .animate-on-scroll:not(.visible) {
        opacity: 0;
        transform: translateY(20px);
    }

    /* Staggered animations for grid items */
    .room-card, .menu-card, .service-card, .gallery-item {
        transition-delay: calc(0.1s * var(--animation-order));
    }

    /* Hero section parallax and animations */
    .luxury-hero {
        position: relative;
        overflow: hidden;
    }

    .luxury-hero-video video {
        transform: scale(1.1);
        transition: transform 1s ease-out;
        will-change: transform;
    }

    .luxury-hero.loaded .luxury-hero-video video {
        transform: scale(1);
    }

    .luxury-hero-text > * {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .luxury-hero-text .luxury-hero-pretitle {
        transition-delay: 0.3s;
    }

    .luxury-hero-text #hero-heading {
        transition-delay: 0.4s;
    }

    .luxury-hero-text .luxury-hero-subtitle {
        transition-delay: 0.5s;
    }

    .luxury-hero-cta {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.6s,
                    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
    }

    .luxury-hero.loaded .luxury-hero-text > *,
    .luxury-hero.loaded .luxury-hero-cta {
        opacity: 1;
        transform: translateY(0);
    }

    /* Scroll indicator animation */
    .luxury-hero-scroll {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.9s,
                    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.9s;
        cursor: pointer;
    }

    .luxury-hero.loaded .luxury-hero-scroll {
        opacity: 1;
        transform: translateY(0);
    }

    .luxury-scroll-indicator {
        width: 20px;
        height: 30px;
        border: 2px solid #e0a96d;
        border-radius: 15px;
        position: relative;
        margin: 10px auto;
    }

    .luxury-scroll-indicator::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 8px;
        background: #e0a96d;
        border-radius: 2px;
        animation: scrollBounce 2s infinite ease-in-out;
    }

    @keyframes scrollBounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        40% {
            transform: translateX(-50%) translateY(10px);
            opacity: 0.7;
        }
        60% {
            transform: translateX(-50%) translateY(5px);
            opacity: 0.9;
        }
    }

    /* Footer animation */
    .main-footer {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .main-footer.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* Parallax effect for hero background */
    .luxury-hero-video {
        will-change: transform;
    }

    /* Hover effects for cards */
    .room-card:hover, .menu-card:hover, .service-card:hover, .gallery-item:hover {
        transform: translateY(-5px) scale(1.02);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    /* Mobile-specific adjustments */
    @media (max-width: 768px) {
        .animate-on-scroll {
            transform: translateY(10px);
        }

        .animate-on-scroll:not(.visible) {
            transform: translateY(10px);
            opacity: 1; /* Prevent disappearing */
        }

        .room-card, .menu-card, .service-card, .gallery-item {
            transition-delay: calc(0.08s * var(--animation-order));
        }

        .luxury-hero-video video {
            transform: scale(1.15);
        }

        .luxury-hero.loaded .luxury-hero-video video {
            transform: scale(1.05);
        }

        /* Disable animations on very small screens */
        @media (max-width: 480px) {
            .animate-on-scroll, .animate-on-scroll.visible, .animate-on-scroll:not(.visible) {
                opacity: 1;
                transform: none;
                transition: none;
            }

            .room-card, .menu-card, .service-card, .gallery-item {
                transition-delay: 0s;
            }

            .main-footer, .main-footer.visible {
                opacity: 1;
                transform: none;
            }
        }
    }
`;
document.head.appendChild(styleSheet);

// Utility function to debounce scroll/resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll and animation logic
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero section load animation
    const heroSection = document.querySelector('.luxury-hero');
    if (heroSection) {
        setTimeout(() => heroSection.classList.add('loaded'), 100);
    }

    // Parallax effect for hero video
    const heroVideo = document.querySelector('.luxury-hero-video video');
    const heroSectionHeight = heroSection?.offsetHeight || 0;
    const handleParallax = debounce(() => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < heroSectionHeight && heroVideo) {
            const parallaxOffset = scrollPosition * 0.2;
            heroVideo.style.transform = `scale(1.1) translateY(${parallaxOffset}px)`;
        }
    }, 10);

    window.addEventListener('scroll', handleParallax);

    // Intersection Observer for bidirectional scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px', /* Increased margin for mobile */
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Stagger animations for grid items
                const gridItems = entry.target.querySelectorAll('.room-card, .menu-card, .service-card, .gallery-item');
                gridItems.forEach((item, index) => {
                    item.style.setProperty('--animation-order', index);
                });
            } else {
                // Remove visible class when element leaves viewport
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observe sections, headers, grids, and footer
    document.querySelectorAll('.section, .section-header, .room-grid, .menu-grid, .services-grid, .gallery-grid, .main-footer').forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });

    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.luxury-hero-scroll');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#main-content');
            if (nextSection) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = nextSection.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Optimize resize handling
    const handleResize = debounce(() => {
        // Recalculate header height for smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }, 100);

    window.addEventListener('resize', handleResize);
});

document.addEventListener('DOMContentLoaded', function () {
    // Get all tab buttons and content sections
    const tabButtons = document.querySelectorAll('.dining-tab');
    const tabContents = document.querySelectorAll('.dining-content');

    // Function to switch tabs
    function switchTab(event) {
        // Prevent default anchor behavior
        event.preventDefault();

        // Get the target tab ID from the clicked button
        const targetTabId = this.getAttribute('aria-controls');
        const targetTab = document.getElementById(targetTabId);

        // Remove active class from all tabs and buttons
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.setAttribute('hidden', '');
        });

        tabButtons.forEach(button => {
            button.classList.remove('active');
            button.setAttribute('aria-selected', 'false');
            button.setAttribute('tabindex', '-1');
        });

        // Add active class to the clicked button and target tab
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        this.removeAttribute('tabindex');

        targetTab.classList.add('active');
        targetTab.removeAttribute('hidden');
        targetTab.setAttribute('tabindex', '0');
    }

    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', switchTab);
    });

    // Optional: Keyboard navigation for tabs
    tabButtons.forEach(button => {
        button.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }

            // Arrow key navigation between tabs
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const currentIndex = Array.from(tabButtons).indexOf(this);
                let nextIndex;

                if (e.key === 'ArrowLeft') {
                    nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : tabButtons.length - 1;
                } else {
                    nextIndex = currentIndex + 1 < tabButtons.length ? currentIndex + 1 : 0;
                }

                tabButtons[nextIndex].focus();
                tabButtons[nextIndex].click();
            }
        });
    });
});