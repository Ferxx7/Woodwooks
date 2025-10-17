/* 
 * ===============================================
 * WOOKS - MOBILE FIRST JAVASCRIPT FOR iOS OPTIMIZATION
 * ===============================================
 * 
 * IMPORTANT: This JavaScript is designed MOBILE-FIRST and optimized for iOS devices
 * All functionality is designed primarily for mobile phones, then enhanced for larger screens
 * 
 * Key iOS optimizations:
 * - Touch-friendly interactions
 * - iOS Safari compatibility
 * - Mobile-first event handling
 * - iOS-specific optimizations
 * 
 * REMEMBER: Always think mobile-first, iOS-optimized when making changes!
 */

// Mobile Navigation Toggle - iOS optimized
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !service || !message) {
            showNotification('Por favor, completa todos los campos obligatorios.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, ingresa un email válido.', 'error');
            return;
        }
        
        // Show loading state
        setFormLoading(true);
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            this.reset();
            setFormLoading(false);
        }, 1500);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles based on type
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Form loading state
function setFormLoading(loading) {
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    if (submitBtn) {
        if (loading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.style.opacity = '0.7';
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Enviar Mensaje';
            submitBtn.style.opacity = '1';
        }
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .product-card, .category-item, .security-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Product cards hover effects
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Service cards hover effects
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Category items hover effects
document.addEventListener('DOMContentLoaded', () => {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});

// Security items hover effects
document.addEventListener('DOMContentLoaded', () => {
    const securityItems = document.querySelectorAll('.security-item');
    
    securityItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.security-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(-5deg)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.security-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
`;

document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// Back to top functionality
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form field animations
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = '#3498db';
            input.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
        });
        
        input.addEventListener('blur', () => {
            input.style.borderColor = '#e1e8ed';
            input.style.boxShadow = 'none';
        });
    });
});

// Service selection highlighting
document.addEventListener('DOMContentLoaded', () => {
    const serviceSelect = document.querySelector('#service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', () => {
            const selectedValue = serviceSelect.value;
            if (selectedValue) {
                serviceSelect.style.borderColor = '#27ae60';
                serviceSelect.style.backgroundColor = '#f8fff8';
            } else {
                serviceSelect.style.borderColor = '#e1e8ed';
                serviceSelect.style.backgroundColor = 'white';
            }
        });
    }
});

// Product image lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const productImages = document.querySelectorAll('.product-image img');
    
    productImages.forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            const placeholder = img.nextElementSibling;
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        });
    });
});

// Add click handlers for product cards
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productName = card.querySelector('h3').textContent;
            showNotification(`Información sobre ${productName} enviada por WhatsApp`, 'info');
        });
    });
});

// Package buttons functionality for domótica page
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.package-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const packageType = this.getAttribute('data-package');
            const packageName = this.closest('.package-card').querySelector('.package-title h3').textContent;
            
            // Scroll to contact form
            const contactSection = document.getElementById('contacto');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Pre-fill the service select if it exists
                setTimeout(() => {
                    const serviceSelect = document.getElementById('service');
                    if (serviceSelect) {
                        serviceSelect.value = packageType;
                    }
                }, 500);
            }
            
            // Show notification
            showNotification(`Interesado en ${packageName}`, 'success');
        });
    });
});

// ===============================================
// EL CARRUSEL DE ATMÓSFERA - JAVASCRIPT
// ===============================================

// Carousel functionality for "El Carrusel de Atmósfera"
document.addEventListener('DOMContentLoaded', () => {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const productItems = document.querySelectorAll('.product-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const totalItems = productItems.length;
    
    // Initialize carousel
    function initCarousel() {
        if (!carouselWrapper || !productItems.length) return;
        
        // Set initial active state
        updateActiveState();
        
        // Add event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                updateCarousel();
                updateInfoPanels();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
                updateInfoPanels();
            });
        }
        
        // Add indicator event listeners
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                updateInfoPanels();
            });
        });
        
        // Add touch/swipe support for mobile
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        
        carouselWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });
        
        carouselWrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        }, { passive: false });
        
        carouselWrapper.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next item
                    currentIndex = (currentIndex + 1) % totalItems;
                } else {
                    // Swipe right - previous item
                    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                }
                updateCarousel();
            }
            
            isDragging = false;
        }, { passive: true });
        
        // Auto-advance carousel (optional)
        let autoAdvanceInterval;
        
        function startAutoAdvance() {
            autoAdvanceInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            }, 8000); // Change every 8 seconds
        }
        
        function stopAutoAdvance() {
            if (autoAdvanceInterval) {
                clearInterval(autoAdvanceInterval);
            }
        }
        
        // Start auto-advance
        startAutoAdvance();
        
        // Pause auto-advance on hover/touch
        carouselWrapper.addEventListener('mouseenter', stopAutoAdvance);
        carouselWrapper.addEventListener('mouseleave', startAutoAdvance);
        carouselWrapper.addEventListener('touchstart', stopAutoAdvance);
        carouselWrapper.addEventListener('touchend', () => {
            setTimeout(startAutoAdvance, 3000); // Resume after 3 seconds
        });
    }
    
    // Update carousel position and active states
    function updateCarousel() {
        if (!carouselWrapper) return;
        
        // Update wrapper transform
        const translateX = -currentIndex * 100;
        carouselWrapper.style.transform = `translateX(${translateX}%)`;
        
        // Update active states
        updateActiveState();
        
        // Add smooth transition
        carouselWrapper.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // iOS smooth transitions
        carouselWrapper.style.webkitTransition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    // Update active states for products and indicators
    function updateActiveState() {
        // Update product items
        productItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Update info panels
    function updateInfoPanels() {
        const infoPanels = document.querySelectorAll('.info-panel');
        infoPanels.forEach((panel, index) => {
            // No panel is active by default
            panel.classList.remove('active');
        });
    }
    
    // Initialize the carousel
    initCarousel();
    
    // Initialize info panels
    updateInfoPanels();
    
    // Panel toggle functionality
    const panelToggles = document.querySelectorAll('.panel-toggle');
    panelToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const panel = toggle.closest('.info-panel');
            const isActive = panel.classList.contains('active');
            
            // Close all panels first
            document.querySelectorAll('.info-panel').forEach(p => {
                p.classList.remove('active');
            });
            
            // Toggle current panel if it wasn't active
            if (!isActive) {
                panel.classList.add('active');
            }
        });
    });
    
    // Panel header click functionality
    const panelHeaders = document.querySelectorAll('.panel-header');
    panelHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const panel = header.closest('.info-panel');
            const isActive = panel.classList.contains('active');
            
            // Close all panels first
            document.querySelectorAll('.info-panel').forEach(p => {
                p.classList.remove('active');
            });
            
            // Toggle current panel if it wasn't active
            if (!isActive) {
                panel.classList.add('active');
            }
        });
    });
    
    // Shopify Style Product Interactions
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    // Wishlist functionality
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                icon.className = 'fas fa-heart';
                showNotification('Agregado a favoritos', 'success');
            } else {
                icon.className = 'far fa-heart';
                showNotification('Removido de favoritos', 'info');
            }
        });
    });
    
    // Quick view functionality
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = btn.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            showNotification(`Vista rápida: ${productTitle}`, 'info');
        });
    });
    
    // Add to cart functionality
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = btn.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // Add loading state
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Agregando...</span>';
            btn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i><span>Agregado</span>';
                showNotification(`${productTitle} agregado al carrito - ${productPrice}`, 'success');
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 2000);
            }, 1000);
        });
    });
    
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('active')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });
    
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }
    });
    
    // Intersection Observer for auto-play when in view
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Carousel is in view, resume auto-advance
                    startAutoAdvance();
                } else {
                    // Carousel is out of view, pause auto-advance
                    stopAutoAdvance();
                }
            });
        }, { threshold: 0.5 });
        
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            observer.observe(carouselContainer);
        }
    }
});

// Add click handlers for category items
document.addEventListener('DOMContentLoaded', () => {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const categoryName = item.querySelector('h4').textContent;
            showNotification(`Explorando categoría: ${categoryName}`, 'info');
        });
    });
});

// Add WhatsApp integration
function openWhatsApp(message = '') {
    const phoneNumber = '525598765432'; // WhatsApp number without + and spaces
    const defaultMessage = 'Hola, me interesa conocer más sobre los productos de Wooks.';
    const finalMessage = message || defaultMessage;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
    window.open(whatsappUrl, '_blank');
}

// Add WhatsApp buttons to product cards
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent;
        const productPrice = card.querySelector('.product-price').textContent;
        
        // Add WhatsApp button
        const whatsappBtn = document.createElement('button');
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Consultar';
        whatsappBtn.className = 'whatsapp-btn';
        whatsappBtn.style.cssText = `
            background: #25d366;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            cursor: pointer;
            margin-top: 10px;
            transition: all 0.3s ease;
        `;
        
        whatsappBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const message = `Hola, me interesa el producto: ${productName} - ${productPrice}`;
            openWhatsApp(message);
        });
        
        whatsappBtn.addEventListener('mouseenter', () => {
            whatsappBtn.style.background = '#128c7e';
            whatsappBtn.style.transform = 'translateY(-2px)';
        });
        
        whatsappBtn.addEventListener('mouseleave', () => {
            whatsappBtn.style.background = '#25d366';
            whatsappBtn.style.transform = 'translateY(0)';
        });
        
        const productInfo = card.querySelector('.product-info');
        productInfo.appendChild(whatsappBtn);
    });
});

// Add scroll animations for better UX
const scrollElements = document.querySelectorAll('.service-card, .product-card, .category-item, .security-item');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimation();
});

// PDF Modal functionality
const pdfModal = document.getElementById('pdfModal');
const pdfViewer = document.getElementById('pdfViewer');
const modalTitle = document.getElementById('modalTitle');
const downloadPdf = document.getElementById('downloadPdf');
const closeModal = document.getElementById('closeModal');
const modalClose = document.querySelector('.modal-close');

let currentPdfUrl = '';

// Open PDF modal
function openPdfModal(pdfUrl, title) {
    currentPdfUrl = pdfUrl;
    modalTitle.textContent = title;
    pdfViewer.src = pdfUrl;
    pdfModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close PDF modal
function closePdfModal() {
    pdfModal.style.display = 'none';
    pdfViewer.src = '';
    document.body.style.overflow = 'auto';
}

// Project showcase cards click handlers
document.addEventListener('DOMContentLoaded', () => {
    const projectShowcaseCards = document.querySelectorAll('.project-showcase-card');
    
    projectShowcaseCards.forEach(card => {
        const pdfUrl = card.getAttribute('data-pdf');
        const title = card.querySelector('.project-title').textContent;
        
        // Click on card to open modal
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking on button
            if (!e.target.closest('.project-cta')) {
                openPdfModal(pdfUrl, title);
            }
        });
        
        // Click on CTA button to open modal
        const projectCta = card.querySelector('.project-cta');
        if (projectCta) {
            projectCta.addEventListener('click', (e) => {
                e.stopPropagation();
                openPdfModal(pdfUrl, title);
            });
        }
    });
});

// Modal close handlers
if (modalClose) {
    modalClose.addEventListener('click', closePdfModal);
}

if (closeModal) {
    closeModal.addEventListener('click', closePdfModal);
}

// Close modal when clicking outside
if (pdfModal) {
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            closePdfModal();
        }
    });
}

// Download PDF functionality
if (downloadPdf) {
    downloadPdf.addEventListener('click', () => {
        if (currentPdfUrl) {
            const link = document.createElement('a');
            link.href = currentPdfUrl;
            link.download = currentPdfUrl.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal.style.display === 'block') {
        closePdfModal();
    }
});

// Add loading state to PDF viewer
if (pdfViewer) {
    pdfViewer.addEventListener('load', () => {
        // PDF loaded successfully
        console.log('PDF loaded');
    });
    
    pdfViewer.addEventListener('error', () => {
        // PDF failed to load
        console.error('PDF failed to load');
        showNotification('Error al cargar el PDF. Intenta descargarlo directamente.', 'error');
    });
}

// Tab functionality for detailed services
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Show corresponding panel
                const targetPanel = document.getElementById(targetTab + '-tab');
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
});