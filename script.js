// Configuration Constants
const CONFIG = {
    LOADER_DURATION: 1000,
    LOADER_FADE_OUT: 600,
    TOAST_DISPLAY_TIME: 3000,
    TOAST_FADE_OUT: 300,
    THROTTLE_DELAY: 16, // 60fps
    SCROLL_THRESHOLD: 50,
    FLOATING_CTA_DELAY: 1500,
    FLOATING_CTA_FADE_TIME: 25000
};

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    try {
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
        initFloatingCTA();
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

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
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
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
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
}

// Form Handling
function initFormHandling() {
    const contactForm = document.querySelector('.form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
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
                // Simulate form submission
                const submitButton = this.querySelector('.form-submit');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    submitButton.textContent = 'Message Sent!';
                    submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    
                    // Reset form
                    setTimeout(() => {
                        this.reset();
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        submitButton.style.background = 'linear-gradient(135deg, #a855f7, #7c3aed)';
                    }, 2000);
                }, 1000);
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
        let timeout;
        
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            dropdownContent.style.opacity = '1';
            dropdownContent.style.visibility = 'visible';
            dropdownContent.style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                dropdownContent.style.opacity = '0';
                dropdownContent.style.visibility = 'hidden';
                dropdownContent.style.transform = 'translateY(-10px)';
            }, 100);
        });
    });
}

// CTA Button Click Handlers
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    const contactSection = document.getElementById('contact');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
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
    
    // Text typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            typeWriter();
        }, 1500);
    }
}

// Enhanced cursor effects
document.addEventListener('DOMContentLoaded', function() {
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);
    
    // Add cursor styles
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            width: 10px;
            height: 10px;
            background: var(--color-primary);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        }
        
        .cursor-follower {
            width: 30px;
            height: 30px;
            border: 2px solid rgba(168, 85, 247, 0.3);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.3s ease;
        }
        
        .custom-cursor.hover {
            transform: scale(2);
        }
        
        .cursor-follower.hover {
            transform: scale(1.5);
            border-color: var(--color-primary);
        }
    `;
    document.head.appendChild(cursorStyle);
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 5 + 'px';
        cursor.style.top = e.clientY - 5 + 'px';
        
        cursorFollower.style.left = e.clientX - 15 + 'px';
        cursorFollower.style.top = e.clientY - 15 + 'px';
    });
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .service-card, .product-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
});

// Floating CTA Functionality
function initFloatingCTA() {
    const floatingCTA = document.getElementById('floatingCTA');
    let hasShown = false;
    
    if (!floatingCTA) return;
    
    // Show floating CTA after scrolling down a bit
    const handleScroll = throttle(() => {
        const scrolled = window.scrollY > window.innerHeight * 0.6;
        
        if (scrolled && !hasShown && !floatingCTA.classList.contains('hide')) {
            setTimeout(() => {
                floatingCTA.classList.add('show');
                hasShown = true;
            }, 1500); // Show after 1.5 seconds of being in scroll position
        }
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    
    // Auto hide after some time if no interaction
    setTimeout(() => {
        if (floatingCTA.classList.contains('show')) {
            floatingCTA.style.opacity = '0.8';
        }
    }, 25000); // Fade after 25 seconds
}

// Close floating CTA
function closeFloatingCTA() {
    const floatingCTA = document.getElementById('floatingCTA');
    if (floatingCTA) {
        floatingCTA.classList.remove('show');
        floatingCTA.classList.add('hide');
    }
}

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
    
    // Close floating CTA if it's open
    closeFloatingCTA();
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
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Success!';
        submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            showToast('Thank you! We\'ll contact you soon.', 'success');
            closeCTAModal();
            
            // Reset form
            form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))';
        }, 1500);
    }, 2000);
}
