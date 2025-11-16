// Configuration Constants
const CONFIG = {
    LOADER_DURATION: 1000,
    LOADER_FADE_OUT: 600,
    TOAST_DISPLAY_TIME: 3000,
    TOAST_FADE_OUT: 300,
    THROTTLE_DELAY: 16, // 60fps
    SCROLL_THRESHOLD: 50,
    FLOATING_CTA_DELAY: 10000, // 10 seconds delay after page load
    FLOATING_CTA_FADE_TIME: 25000,
    // EmailJS Configuration
    // TODO: Replace these with your actual EmailJS credentials
    // Get them from https://www.emailjs.com/
    EMAILJS_SERVICE_ID: 'service_0wycke7', // e.g., 'service_abc123'
    EMAILJS_TEMPLATE_ID: 'template_5xyb616', // e.g., 'template_xyz789'
    EMAILJS_PUBLIC_KEY: '0IGXwgdA1wKH6MrfX', // e.g., 'abcdefghijklmnop'
    CONTACT_EMAIL: 'info@aonz.in' // Your contact email
};

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
        }
        
        // Initialize all functionality
        initPageLoader();
        initMobileMenu();
        initSmoothScrolling();
        initFormHandling();
        initScrollEffects();
        initDropdownMenus();
        initCTAButtons();
        initScrollToTop();
        initModernAnimations();
    } catch (error) {
        console.error('Error initializing page functionality:', error);
    }
});

/**
 * Initializes the page loader animation
 * Hides loader after page is fully loaded with fade-out animation
 * @returns {void}
 */
function initPageLoader() {
    try {
        const loader = document.getElementById('pageLoader');
        
        if (!loader) {
            console.warn('Page loader element not found');
            return;
        }
        
        // Hide loader after page is fully loaded
        window.addEventListener('load', () => {
            try {
                setTimeout(() => {
                    loader.classList.add('fade-out');
                    document.body.style.overflow = 'auto';
                    
                    // Remove loader from DOM after animation
                    setTimeout(() => {
                        if (loader && loader.parentNode) {
                            loader.parentNode.removeChild(loader);
                        }
                    }, CONFIG.LOADER_FADE_OUT);
                }, CONFIG.LOADER_DURATION);
            } catch (error) {
                console.error('Error in page loader animation:', error);
            }
        });
    } catch (error) {
        console.error('Error initializing page loader:', error);
    }
}

/**
 * Initializes mobile menu toggle functionality
 * Handles menu open/close and accessibility attributes
 * @returns {void}
 */
function initMobileMenu() {
    try {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!mobileMenuToggle || !navMenu) {
            console.warn('Mobile menu elements not found');
            return;
        }
        mobileMenuToggle.addEventListener('click', function() {
            try {
                // Toggle active classes
                const isActive = navMenu.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
                
                // Update ARIA attributes for accessibility
                mobileMenuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = isActive ? 'hidden' : '';
            } catch (error) {
                console.error('Error toggling mobile menu:', error);
            }
        });

        // Close menu when clicking on nav links (but not dropdown parent links in mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't close menu if clicking on dropdown parent link in mobile (handled by dropdown toggle)
                const isDropdownParent = link.closest('.dropdown') && !link.closest('.dropdown-content') && window.innerWidth <= 768;
                
                // Only close menu if it's NOT a dropdown parent link in mobile
                if (!isDropdownParent) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            try {
                const isClickInsideNav = navMenu.contains(event.target);
                const isClickOnToggle = mobileMenuToggle.contains(event.target);
                
                if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            } catch (error) {
                console.error('Error handling menu click outside:', error);
            }
        });
    } catch (error) {
        console.error('Error initializing mobile menu:', error);
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]:not(.skip-link)');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle skip to main content link
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                event.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Focus the main content for screen readers
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
            }
        });
    }
}

// Form Handling
function initFormHandling() {
    const contactForm = document.querySelector('.form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data by placeholder or name attribute
            const inputs = this.querySelectorAll('input, select, textarea');
            let name = '';
            let email = '';
            let phone = '';
            let service = '';
            let message = '';
            
            inputs.forEach(input => {
                const placeholder = (input.placeholder || '').toLowerCase();
                const inputType = input.type || '';
                const tagName = input.tagName.toLowerCase();
                
                if (placeholder.includes('name') || input.name === 'name') {
                    name = input.value.trim();
                } else if (placeholder.includes('email') || inputType === 'email' || input.name === 'email') {
                    email = input.value.trim();
                } else if (placeholder.includes('phone') || inputType === 'tel' || input.name === 'phone') {
                    phone = input.value.trim();
                } else if (tagName === 'select' || placeholder.includes('service') || input.name === 'service') {
                    service = input.value.trim();
                } else if (tagName === 'textarea' || placeholder.includes('message') || input.name === 'message') {
                    message = input.value.trim();
                }
            });
            
            // Validate required fields
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
            });
            
            if (isValid) {
                const submitButton = this.querySelector('.form-submit');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Send email via EmailJS
                sendContactEmail({
                    name: name,
                    email: email,
                    phone: phone,
                    company: service, // Using service as company field
                    message: message,
                    subject: 'Contact Form Submission',
                    type: 'Contact Form'
                }, submitButton, originalText, this);
            } else {
                // Show validation message
                showToast('Please fill in all required fields', 'error');
            }
        });
    }
}

// Scroll Effects (Header background and animations)
function initScrollEffects() {
    const header = document.querySelector('.header');
    const heroCards = document.querySelectorAll('.hero-card');
    const serviceCards = document.querySelectorAll('.service-card');
    const productCards = document.querySelectorAll('.product-card');
    const industryCards = document.querySelectorAll('.industry-card');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
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
    
    // Observe cards for animation
    [...heroCards, ...serviceCards, ...productCards, ...industryCards].forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Dropdown Menu Functionality
function initDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const dropdownLink = dropdown.querySelector('.nav-link');
        let timeout;
        
        // Desktop hover behavior
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                clearTimeout(timeout);
                dropdownContent.style.opacity = '1';
                dropdownContent.style.visibility = 'visible';
                dropdownContent.style.transform = 'translateY(0)';
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                timeout = setTimeout(() => {
                    dropdownContent.style.opacity = '0';
                    dropdownContent.style.visibility = 'hidden';
                    dropdownContent.style.transform = 'translateY(-10px)';
                }, 100);
            }
        });
        
        // Mobile click behavior
        if (dropdownLink) {
            dropdownLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
}

// CTA Button Click Handlers
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Only handle clicks for same-page anchors
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    event.preventDefault();
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // For links to other pages (like contact.html#contact-form), let the browser handle it naturally
        });
    });
}

// Scroll to Top Functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopButton.classList.add('scroll-to-top');
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #a855f7, #7c3aed);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
    `;
    
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollToTopButton.addEventListener('mouseenter', () => {
        scrollToTopButton.style.transform = 'translateY(-3px) scale(1.1)';
        scrollToTopButton.style.boxShadow = '0 6px 20px rgba(168, 85, 247, 0.4)';
    });
    
    scrollToTopButton.addEventListener('mouseleave', () => {
        scrollToTopButton.style.transform = 'translateY(0) scale(1)';
        scrollToTopButton.style.boxShadow = '0 4px 15px rgba(168, 85, 247, 0.3)';
    });
}

/**
 * Shows a toast notification to the user
 * Creates and displays a temporary notification message
 * @param {string} message - The message to display
 * @param {string} [type='info'] - The toast type ('info', 'error', 'success')
 * @returns {void}
 */
function showToast(message, type = 'info') {
    try {
        const toast = document.createElement('div');
        const bgColor = type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6';
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${bgColor};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            font-weight: 500;
        `;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
        
        document.body.appendChild(toast);
        
        // Show toast
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        });
        
        // Hide toast after configured time
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, CONFIG.TOAST_FADE_OUT);
        }, CONFIG.TOAST_DISPLAY_TIME);
    } catch (error) {
        console.error('Error showing toast:', error);
    }
}

// Video Preview Click Handler
document.addEventListener('DOMContentLoaded', function() {
    const videoPreview = document.querySelector('.video-preview');
    
    if (videoPreview) {
        videoPreview.addEventListener('click', function() {
            // Simulate video modal or redirect
            showToast('Video player would open here', 'info');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
            }, 150);
        });
    }
});

// Service and Product Card Click Handlers
document.addEventListener('DOMContentLoaded', function() {
    const serviceLinks = document.querySelectorAll('.service-link');
    const productLinks = document.querySelectorAll('.product-link');
    
    [...serviceLinks, ...productLinks].forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            showToast('More details would be shown here', 'info');
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Apply throttling to scroll-heavy functions
const throttledScrollHandler = throttle(function() {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = 'none';
    }
}, 16); // 60fps

// Replace the scroll event listener in initScrollEffects
window.addEventListener('scroll', throttledScrollHandler);

// Modern Animations and Effects
function initModernAnimations() {
    // Initialize particles with random positions
    initParticleSystem();
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            const bgElements = hero.querySelector('.hero-bg-elements');
            if (bgElements) {
                bgElements.style.transform = `translateY(${parallax}px)`;
            }
        }, 16));
    }
}

// Initialize Particle System
function initParticleSystem() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        // Random horizontal position
        const randomX = Math.random() * 100;
        particle.style.left = randomX + '%';
        
        // Add random delay for infinite animation
        const randomDelay = Math.random() * 10;
        particle.style.animationDelay = randomDelay + 's';
        
        // Random size variation
        const randomSize = 2 + Math.random() * 4;
        particle.style.width = randomSize + 'px';
        particle.style.height = randomSize + 'px';
    });
}

// Enhanced button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button, .service-link, .product-cta');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 10px;
                height: 10px;
                margin-left: -5px;
                margin-top: -5px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Magnetic effect for cards
    const cards = document.querySelectorAll('.service-card, .product-card, .industry-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const tiltX = (y / rect.height) * 10;
            const tiltY = (x / rect.width) * -10;
            
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
    
    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, revealOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0.3';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(section);
    });
    
    // Add revealed class styling
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        section.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(revealStyle);
});

// CTA Button Functions
function bookDemo() {
    // You can integrate with your booking system here
    showCTAModal('Book a Demo', 'Schedule a personalized demo of our AI solutions and see how we can transform your business.');
    // Or redirect to booking page: window.open('https://calendly.com/your-link', '_blank');
}

function scheduleCall() {
    // You can integrate with your calling system here
    showCTAModal('Schedule a Call', 'Book a consultation call with our experts to discuss your specific needs and requirements.');
    // Or redirect to scheduling page
}

function getQuote() {
    // Scroll to contact form or open quote modal
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = contactSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Highlight the form
        setTimeout(() => {
            const form = document.querySelector('.form');
            if (form) {
                form.style.border = '2px solid var(--color-primary)';
                form.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.3)';
                
                setTimeout(() => {
                    form.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    form.style.boxShadow = 'none';
                }, 3000);
            }
        }, 1000);
    }
}

// Modal functionality for CTAs
function showCTAModal(title, message) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('ctaModal');
    if (!modal) {
        modal = createCTAModal();
        document.body.appendChild(modal);
    }
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-message').textContent = message;
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function createCTAModal() {
    const modal = document.createElement('div');
    modal.id = 'ctaModal';
    modal.className = 'cta-modal';
    modal.innerHTML = `
        <div class="cta-modal-overlay" onclick="closeCTAModal()"></div>
        <div class="cta-modal-content">
            <div class="modal-header">
                <h3 class="modal-title"></h3>
                <button class="modal-close" onclick="closeCTAModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <p class="modal-message"></p>
            <form class="modal-form" onsubmit="submitCTAForm(event)">
                <div class="form-row">
                    <input type="text" name="name" placeholder="Your Name *" required>
                    <input type="email" name="email" placeholder="Your Email *" required>
                </div>
                <input type="tel" name="phone" placeholder="Your Phone Number">
                <input type="text" name="company" placeholder="Company Name">
                <textarea name="message" placeholder="Tell us about your needs..." rows="3"></textarea>
                <div class="modal-buttons">
                    <button type="submit" class="modal-btn-primary">
                        <i class="fas fa-paper-plane"></i>
                        Submit Request
                    </button>
                    <button type="button" class="modal-btn-secondary" onclick="closeCTAModal()">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;
    
    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .cta-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .cta-modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .cta-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .cta-modal-content {
            position: relative;
            background: linear-gradient(135deg, var(--color-gray-800), var(--color-gray-900));
            border-radius: var(--radius-xl);
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .cta-modal.show .cta-modal-content {
            transform: scale(1);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .modal-title {
            color: var(--color-white);
            font-size: 1.5rem;
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: var(--color-text-muted);
            font-size: 1.5rem;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .modal-close:hover {
            color: var(--color-white);
        }
        
        .modal-message {
            color: var(--color-text-secondary);
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        
        .modal-form .form-row {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .modal-form .form-row input {
            flex: 1;
        }
        
        .modal-form input,
        .modal-form textarea {
            width: 100%;
            padding: 0.75rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            color: var(--color-white);
            font-size: 0.95rem;
            transition: all 0.3s ease;
            margin-bottom: 1rem;
        }
        
        .modal-form input:focus,
        .modal-form textarea:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
        }
        
        .modal-form input::placeholder,
        .modal-form textarea::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
        
        .modal-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        
        .modal-btn-primary {
            flex: 1;
            background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .modal-btn-primary:hover {
            background: linear-gradient(135deg, #9333ea, #6d28d9);
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(168, 85, 247, 0.3);
        }
        
        .modal-btn-secondary {
            background: transparent;
            color: var(--color-text-primary);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .modal-btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: var(--color-primary);
        }
        
        @media (max-width: 768px) {
            .cta-modal-content {
                padding: 1.5rem;
                width: 95%;
            }
            
            .modal-form .form-row {
                flex-direction: column;
                gap: 0;
            }
            
            .modal-buttons {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(modalStyle);
    
    return modal;
}

function closeCTAModal() {
    const modal = document.getElementById('ctaModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function submitCTAForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.modal-btn-primary');
    const originalText = submitButton.innerHTML;
    
    // Get form data
    const formData = new FormData(form);
    const formObject = {};
    for (let [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    
    // Get modal title to determine request type
    const modalTitle = document.querySelector('.modal-title')?.textContent || 'Contact Request';
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitButton.disabled = true;
    
    // Send email via EmailJS
    sendContactEmail({
        name: formObject.name || '',
        email: formObject.email || '',
        phone: formObject.phone || '',
        company: formObject.company || '',
        message: formObject.message || '',
        subject: modalTitle,
        type: modalTitle
    }, submitButton, originalText, form, true);
}

/**
 * Sends an email using EmailJS
 * @param {Object} emailData - The email data to send
 * @param {HTMLElement} submitButton - The submit button element
 * @param {string} originalText - Original button text
 * @param {HTMLElement} form - The form element
 * @param {boolean} isModal - Whether this is from a modal form
 */
function sendContactEmail(emailData, submitButton, originalText, form, isModal = false) {
    // Check if EmailJS is configured
    if (CONFIG.EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
        CONFIG.EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
        CONFIG.EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        // EmailJS not configured, use mailto as fallback
        sendEmailViaMailto(emailData, submitButton, originalText, form, isModal);
        return;
    }
    
    // Prepare email template parameters
    const templateParams = {
        to_email: CONFIG.CONTACT_EMAIL,
        from_name: emailData.name,
        from_email: emailData.email,
        phone: emailData.phone || 'Not provided',
        company: emailData.company || 'Not provided',
        message: emailData.message || 'No message provided',
        subject: emailData.subject || 'Contact Request',
        request_type: emailData.type || 'General Inquiry',
        reply_to: emailData.email
    };
    
    // Send email via EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.send(
            CONFIG.EMAILJS_SERVICE_ID,
            CONFIG.EMAILJS_TEMPLATE_ID,
            templateParams
        )
        .then(() => {
            // Success
            submitButton.innerHTML = '<i class="fas fa-check"></i> Success!';
            submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                showToast('Thank you! We\'ll contact you soon.', 'success');
                
                if (isModal) {
                    closeCTAModal();
                }
                
                // Reset form
                form.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = isModal 
                    ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))'
                    : 'linear-gradient(135deg, #a855f7, #7c3aed)';
            }, 1500);
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            showToast('Failed to send message. Please try again or contact us directly.', 'error');
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Fallback to mailto
            sendEmailViaMailto(emailData, submitButton, originalText, form, isModal);
        });
    } else {
        // EmailJS not loaded, use mailto fallback
        sendEmailViaMailto(emailData, submitButton, originalText, form, isModal);
    }
}

/**
 * Fallback function to send email via mailto link
 * @param {Object} emailData - The email data
 * @param {HTMLElement} submitButton - The submit button
 * @param {string} originalText - Original button text
 * @param {HTMLElement} form - The form element
 * @param {boolean} isModal - Whether this is from a modal
 */
function sendEmailViaMailto(emailData, submitButton, originalText, form, isModal = false) {
    // Create mailto link
    const subject = encodeURIComponent(emailData.subject || 'Contact Request');
    const body = encodeURIComponent(
        `Name: ${emailData.name}\n` +
        `Email: ${emailData.email}\n` +
        `Phone: ${emailData.phone || 'Not provided'}\n` +
        `Company: ${emailData.company || 'Not provided'}\n` +
        `Request Type: ${emailData.type || 'General Inquiry'}\n\n` +
        `Message:\n${emailData.message || 'No message provided'}`
    );
    
    const mailtoLink = `mailto:${CONFIG.CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    
    // Open mailto link
    window.location.href = mailtoLink;
    
    // Show success message
    showToast('Opening your email client...', 'info');
    
    // Reset form after a delay
    setTimeout(() => {
        if (isModal) {
            closeCTAModal();
        }
        form.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1000);
}
