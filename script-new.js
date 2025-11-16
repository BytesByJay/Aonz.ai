/* ================================
   Aonz.AI - JavaScript
   ================================ */

// Configuration
const CONFIG = {
    rotatingTexts: ['BFSI', 'Healthcare', 'Manufacturing', 'Government'],
    rotationInterval: 3000,
    headerScrollThreshold: 50
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollAnimations();
    initScrollEffects();
    initSmoothScroll();
    initMobileOptimizations();
    initTouchFriendly();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileToggle || !navMenu) return;
    
    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = mobileToggle.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInside && navMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Scroll-based Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                
                // Trigger animations based on data-animate attribute
                const animType = entry.target.getAttribute('data-animate');
                if (animType) {
                    entry.target.style.animationPlayState = 'running';
                }
                
                // Unobserve after animating
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Activate journey step animation
    animateJourneySteps();
}

// Animate Journey Steps Progressively
function animateJourneySteps() {
    const journeySteps = document.querySelectorAll('.journey-step');
    let currentStep = 0;
    
    if (journeySteps.length === 0) return;
    
    function activateNextStep() {
        if (currentStep < journeySteps.length) {
            journeySteps[currentStep].classList.add('active');
            currentStep++;
            setTimeout(activateNextStep, 2000); // 2 second delay between steps
        } else {
            // Loop back to first step
            setTimeout(() => {
                journeySteps.forEach(step => step.classList.remove('active'));
                currentStep = 0;
                activateNextStep();
            }, 3000);
        }
    }
    
    // Start animation
    setTimeout(activateNextStep, 1000);
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class to header
        if (currentScroll > CONFIG.headerScrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Intersection Observer for fade-in animations
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
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Observe cards
    const cards = document.querySelectorAll('.solution-card, .benefit-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty hash links
            if (href === '#' || href === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility: Throttle function
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function(...args) {
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

// Add scroll-to-top button
window.addEventListener('load', function() {
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.setAttribute('aria-label', 'Scroll to top');
    
    // Styles
    scrollToTop.style.cssText = `
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
        z-index: 999;
        box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(scrollToTop);
    
    // Show/hide on scroll
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 500) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }
    }, 100));
    
    // Scroll to top on click
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollToTop.addEventListener('mouseenter', () => {
        scrollToTop.style.transform = 'translateY(-3px) scale(1.05)';
        scrollToTop.style.boxShadow = '0 6px 20px rgba(168, 85, 247, 0.4)';
    });
    
    scrollToTop.addEventListener('mouseleave', () => {
        scrollToTop.style.transform = 'translateY(0) scale(1)';
        scrollToTop.style.boxShadow = '0 4px 15px rgba(168, 85, 247, 0.3)';
    });
});

// Performance: Preload critical images
window.addEventListener('load', function() {
    const logo = document.querySelector('.logo-img');
    if (logo && logo.complete && logo.naturalHeight === 0) {
        console.warn('Logo image failed to load');
    }
});

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 10px;
                height: 10px;
                margin-left: -5px;
                margin-top: -5px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add ripple animation
    if (!document.getElementById('ripple-animation-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation-style';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Log page load time (for performance monitoring)
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log('Page loaded in ' + loadTime + 'ms');
});

// Mobile Optimizations
function initMobileOptimizations() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        // Optimize images for mobile
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
        
        // Prevent zoom on input focus (iOS)
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                const viewport = document.querySelector('meta[name=viewport]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                }
            });
            
            input.addEventListener('blur', function() {
                const viewport = document.querySelector('meta[name=viewport]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
                }
            });
        });
        
        // Optimize scroll performance on mobile
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    // Mobile scroll optimizations
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
}

// Touch-Friendly Interactions
function initTouchFriendly() {
    // Add touch feedback to buttons
    const interactiveElements = document.querySelectorAll('.btn-primary, .btn-secondary, .text-link, .nav-link, .card-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = '';
        }, { passive: true });
    });
    
    // Prevent double-tap zoom on buttons
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        });
    });
    
    // Swipe gesture for mobile menu
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const navMenu = document.getElementById('navMenu');
        const mobileToggle = document.getElementById('mobileToggle');
        
        if (!navMenu || !mobileToggle) return;
        
        // Swipe right to open menu (from left edge)
        if (touchEndX > touchStartX + 100 && touchStartX < 50) {
            if (!navMenu.classList.contains('active')) {
                mobileToggle.click();
            }
        }
        
        // Swipe left to close menu
        if (touchStartX > touchEndX + 100) {
            if (navMenu.classList.contains('active')) {
                mobileToggle.click();
            }
        }
    }
    
    // Improve scrolling on mobile
    if (CSS.supports('scroll-behavior', 'smooth')) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

// Orientation change handler
window.addEventListener('orientationchange', function() {
    // Reload or adjust layout on orientation change
    setTimeout(function() {
        window.scrollTo(0, window.scrollY + 1);
        window.scrollTo(0, window.scrollY - 1);
    }, 100);
});

// Handle viewport resize on mobile keyboards
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', function() {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

