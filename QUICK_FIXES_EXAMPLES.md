# Quick Fix Examples

This file shows code examples for the most critical fixes. Copy and adapt these to your actual HTML files.

## 1. SEO Meta Tags (Add to `<head>` section)

```html
<!-- Essential Meta Tags -->
<meta name="description" content="Aonz.AI - Leading AI consulting firm specializing in digital transformation, AI solutions, and enterprise software development. Transform your business with AI-powered solutions.">
<meta name="keywords" content="AI consulting, digital transformation, AI solutions, enterprise software, machine learning, predictive analytics">
<meta name="author" content="Aonz.AI">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.aonzai.com/">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.aonzai.com/">
<meta property="og:title" content="Aonz.AI - Digital Transformation Leaders">
<meta property="og:description" content="Transform your business with AI-powered solutions. Leading AI consulting firm specializing in digital transformation.">
<meta property="og:image" content="https://www.aonzai.com/images/og-image.jpg">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://www.aonzai.com/">
<meta name="twitter:title" content="Aonz.AI - Digital Transformation Leaders">
<meta name="twitter:description" content="Transform your business with AI-powered solutions.">
<meta name="twitter:image" content="https://www.aonzai.com/images/twitter-image.jpg">

<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

## 2. Structured Data (JSON-LD) - Add before closing `</head>`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aonz.AI",
  "url": "https://www.aonzai.com",
  "logo": "https://www.aonzai.com/images/logo.png",
  "description": "Leading AI consulting firm specializing in digital transformation and enterprise solutions",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-123-4567",
    "contactType": "Customer Service",
    "email": "contact@aonzai.com",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/aonzai",
    "https://twitter.com/aonzai",
    "https://www.facebook.com/aonzai"
  ]
}
</script>
```

## 3. Subresource Integrity (SRI) - Update external resources

```html
<!-- Font Awesome with SRI -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
      rel="stylesheet"
      integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" 
      crossorigin="anonymous">

<!-- AOS CSS with SRI -->
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" 
      rel="stylesheet"
      integrity="sha384-..." 
      crossorigin="anonymous">

<!-- AOS JS with SRI -->
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"
        integrity="sha384-..."
        crossorigin="anonymous"></script>

<!-- Note: You'll need to get actual SRI hashes from:
https://www.srihash.org/ or calculate them yourself -->
```

## 4. Accessibility Fixes

### Remove Inline Styles
```html
<!-- Before -->
<a href="#home" class="logo-link" style="text-decoration: none;">

<!-- After -->
<a href="#home" class="logo-link">
```

Add to CSS:
```css
.logo-link {
  text-decoration: none;
}
```

### Add ARIA Labels
```html
<!-- Icon buttons -->
<button onclick="bookDemo()" aria-label="Book a demo appointment">
  <i class="fas fa-calendar-alt" aria-hidden="true"></i>
  Book a Demo
</button>

<!-- Mobile menu toggle -->
<button class="mobile-menu-toggle" 
        aria-label="Toggle navigation menu"
        aria-expanded="false"
        aria-controls="nav-menu">
  <span></span>
  <span></span>
  <span></span>
</button>

<!-- Close button -->
<button class="floating-cta-close" 
        onclick="closeFloatingCTA()"
        aria-label="Close floating call-to-action">
  <i class="fas fa-times" aria-hidden="true"></i>
</button>
```

### Skip to Content Link
```html
<!-- Add at the very top of <body> -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Add CSS -->
<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>

<!-- Wrap main content -->
<main id="main-content">
  <!-- All main page content -->
</main>
```

## 5. JavaScript Error Handling Example

```javascript
// Before
function initPageLoader() {
  const loader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    // ...
  });
}

// After
function initPageLoader() {
  try {
    const loader = document.getElementById('pageLoader');
    
    if (!loader) {
      console.warn('Page loader element not found');
      return;
    }
    
    window.addEventListener('load', () => {
      try {
        setTimeout(() => {
          loader.classList.add('fade-out');
          document.body.style.overflow = 'auto';
          
          setTimeout(() => {
            if (loader && loader.parentNode) {
              loader.parentNode.removeChild(loader);
            }
          }, 600);
        }, 1000);
      } catch (error) {
        console.error('Error in page loader animation:', error);
      }
    });
  } catch (error) {
    console.error('Error initializing page loader:', error);
  }
}
```

## 6. Constants Instead of Magic Numbers

```javascript
// Add at top of script.js
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

// Then use in code:
setTimeout(() => { ... }, CONFIG.LOADER_DURATION);
```

## 7. Reduced Motion Support

```css
/* Add to styles.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .particle,
  .floating-shapes,
  .gradient-orbs {
    display: none !important;
  }
}
```

## 8. Preconnect for Performance

```html
<!-- Add in <head> before other external resources -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdnjs.cloudflare.com">
<link rel="preconnect" href="https://unpkg.com">
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
<link rel="dns-prefetch" href="https://unpkg.com">
```

## 9. Footer Copyright Fix

```html
<!-- Find and replace in all HTML files -->
<!-- Before -->
<p>&copy; 2024 CorpTech Solutions. All rights reserved.</p>

<!-- After -->
<p>&copy; 2024 Aonz.AI. All rights reserved.</p>
```

## 10. Form Input Labels (if missing)

```html
<!-- Before -->
<div class="form-group">
  <input type="text" placeholder="Full Name" required>
</div>

<!-- After -->
<div class="form-group">
  <label for="fullName" class="visually-hidden">Full Name</label>
  <input type="text" id="fullName" name="fullName" placeholder="Full Name" required>
</div>

<!-- Or if label should be visible -->
<div class="form-group">
  <label for="fullName">Full Name</label>
  <input type="text" id="fullName" name="fullName" required>
</div>
```

## 11. Content Security Policy Example

```html
<!-- Add in <head> - Adjust as needed based on your resources -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self';
               script-src 'self' 'unsafe-inline' https://unpkg.com https://cdnjs.cloudflare.com;
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://unpkg.com;
               font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
               img-src 'self' data: https:;
               connect-src 'self';
               frame-ancestors 'none';">
```

**Note**: CSP can be strict. Test thoroughly after adding!

## 12. Function Documentation Example

```javascript
/**
 * Initializes the page loader animation
 * 
 * Hides the page loader after the page is fully loaded with a fade-out animation.
 * Removes the loader from the DOM after the animation completes.
 * 
 * @function initPageLoader
 * @returns {void}
 * @throws {Error} If DOM manipulation fails
 */
function initPageLoader() {
  // ... implementation
}

/**
 * Shows a toast notification
 * 
 * Creates and displays a temporary notification message to the user.
 * Automatically removes the toast after the specified duration.
 * 
 * @function showToast
 * @param {string} message - The message to display
 * @param {string} [type='info'] - The toast type ('info', 'error', 'success')
 * @returns {void}
 */
function showToast(message, type = 'info') {
  // ... implementation
}
```

## Quick Implementation Steps

1. **Copy meta tags** from section 1 → Add to all HTML files
2. **Copy structured data** from section 2 → Add to index.html
3. **Update external resources** with SRI (section 3) → Get hashes first
4. **Add ARIA labels** (section 4) → Update buttons and interactive elements
5. **Add error handling** (section 5) → Wrap init functions
6. **Extract constants** (section 6) → Create CONFIG object

These are the highest priority fixes. Start here, then move to other improvements from the checklist.

