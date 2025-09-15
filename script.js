// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const header = document.querySelector('.header');
const newsletterForm = document.querySelector('.newsletter-form');
const videoThumbnails = document.querySelectorAll('.video-thumbnail');

// Countdown Timer
function initCountdown() {
    // Set target date to 3 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            // Countdown finished
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize countdown when page loads
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initNewsletterPopup();
    initParallaxEffect();
});

// Parallax Effect for Hero Background
function initParallaxEffect() {
    const heroImg = document.querySelector('.hero-bg-img');
    
    if (!heroImg) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3; // Reduced speed for smoother effect
        const yPos = -(scrolled * parallaxSpeed);
        
        heroImg.style.transform = `translate(-50%, calc(-50% + ${yPos}px)) scale(1.01)`;
    }
    
    // Smooth scroll handling with better throttling
    let ticking = false;
    
    function smoothScroll() {
        updateParallax();
        ticking = false;
    }
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(smoothScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter form submission
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (email) {
        // Simulate form submission
        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'SENDING...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'SUBSCRIBED!';
            button.style.background = '#28a745';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
                e.target.reset();
            }, 2000);
        }, 1000);
    }
});

// Video thumbnail click handlers
videoThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const videoUrl = thumbnail.getAttribute('data-video-url');
        if (videoUrl) {
            window.open(videoUrl, '_blank');
        } else {
            // Fallback for videos without URL
            const playButton = thumbnail.querySelector('.play-button');
            playButton.style.transform = 'translate(-50%, -50%) scale(0.8)';
            
            setTimeout(() => {
                playButton.style.transform = 'translate(-50%, -50%) scale(1)';
                alert('Video functionality would be implemented here');
            }, 200);
        }
    });
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

// Observe elements for animation
const animatedElements = document.querySelectorAll('.album-card, .video-card, .section-title');
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg-img');
    
    if (heroBackground) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${speed}px)`;
    }
});

// Social media links functionality
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Get the href attribute if it exists, otherwise prevent default
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            // Let the link work normally
            return;
        } else {
            e.preventDefault();
            const platform = link.textContent.trim();
            
            // Fallback URLs if not set in HTML
            const socialUrls = {
                'Spotify': 'https://open.spotify.com/artist/69a2ovTpqzQrzthSkARvGn?si=SoQZrPYHQHqKZ9Z3P-dxQQ',
                'Instagram': 'https://www.instagram.com/gvllow/',
                'YouTube': 'https://youtube.com/@gvllow'
            };
            
            if (socialUrls[platform]) {
                window.open(socialUrls[platform], '_blank');
            }
        }
    });
});

// Hero buttons functionality
const heroButtons = document.querySelectorAll('.hero-buttons .btn');
heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('LISTEN')) {
            e.preventDefault();
            // Redirect to Spotify
            window.open('https://open.spotify.com/artist/69a2ovTpqzQrzthSkARvGn?si=SoQZrPYHQHqKZ9Z3P-dxQQ', '_blank');
        }
    });
});

// Album buttons functionality
const albumButtons = document.querySelectorAll('.album-buttons .btn');
albumButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = button.textContent.trim();
        
        // Updated streaming URLs
        const streamingUrls = {
            'SPOTIFY': 'https://open.spotify.com/artist/69a2ovTpqzQrzthSkARvGn?si=SoQZrPYHQHqKZ9Z3P-dxQQ',
            'APPLE MUSIC': 'https://music.apple.com/artist/gvllow',
            'YOUTUBE': 'https://youtube.com/@gvllow'
        };
        
        if (streamingUrls[platform]) {
            window.open(streamingUrls[platform], '_blank');
        }
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add some CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'GVLLOW';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ff0000;
        font-size: 2rem;
        font-weight: 900;
        letter-spacing: 3px;
        z-index: 10000;
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    .loaded::before,
    .loaded::after {
        display: none;
    }
`;
document.head.appendChild(style);

// Email Copy Functionality
function copyEmail(email, event) {
    // Use the Clipboard API
    navigator.clipboard.writeText(email).then(function() {
        // Find the clicked element
        const clickedElement = event.target.closest('.email-copy');
        
        // Add copied class for animation
        clickedElement.classList.add('copied');
        
        // Add a slight pulse animation
        clickedElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
            clickedElement.style.transform = 'scale(1)';
        }, 150);
        
        // Remove the class after animation completes
        setTimeout(() => {
            clickedElement.classList.remove('copied');
        }, 3000);
    }).catch(function(err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show copied feedback
        const clickedElement = event.target.closest('.email-copy');
        clickedElement.classList.add('copied');
        
        // Add a slight pulse animation
        clickedElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
            clickedElement.style.transform = 'scale(1)';
        }, 150);
        
        setTimeout(() => {
            clickedElement.classList.remove('copied');
        }, 3000);
    });
    
    // Prevent default link behavior
    event.preventDefault();
    return false;
}

// Newsletter Form Validation and Animation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletterForm');
    const nameInput = document.getElementById('subscriberName');
    const emailInput = document.getElementById('subscriberEmail');
    const submitBtn = document.getElementById('subscribeBtn');
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');
    const btnSuccess = document.querySelector('.btn-success');
    
    // Rate limiting
    let lastSubmitTime = 0;
    const RATE_LIMIT_MS = 5000; // 5 seconds between submissions
    
    // Validation functions
    function validateName(name) {
        const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
        return nameRegex.test(name.trim());
    }
    
    function validateEmail(email) {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        return emailRegex.test(email.trim());
    }
    
    function isSpam() {
        // Check honeypot
        const honeypot = document.querySelector('input[name="website"]');
        if (honeypot && honeypot.value !== '') {
            return true;
        }
        
        // Rate limiting
        const now = Date.now();
        if (now - lastSubmitTime < RATE_LIMIT_MS) {
            return true;
        }
        
        return false;
    }
    
    // Real-time validation
    nameInput.addEventListener('input', function() {
        const isValid = validateName(this.value);
        this.classList.toggle('invalid', !isValid && this.value.length > 0);
    });
    
    emailInput.addEventListener('input', function() {
        const isValid = validateEmail(this.value);
        this.classList.toggle('invalid', !isValid && this.value.length > 0);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate inputs
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        
        if (!validateName(name)) {
            nameInput.focus();
            showError('Please enter a valid name (2-50 characters, letters only)');
            return;
        }
        
        if (!validateEmail(email)) {
            emailInput.focus();
            showError('Please enter a valid email address');
            return;
        }
        
        if (isSpam()) {
            showError('Please wait before submitting again');
            return;
        }
        
        // Update last submit time
        lastSubmitTime = Date.now();
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        
        // Submit to AWeber (using fetch for better control)
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // AWeber doesn't support CORS
        }).then(() => {
            // Show success state
            showSuccess();
        }).catch(() => {
            // Fallback to traditional form submission
            form.submit();
        });
    });
    
    function showSuccess() {
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        btnLoading.style.display = 'none';
        btnSuccess.style.display = 'flex';
        
        // Reset form
        form.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.classList.remove('success');
            submitBtn.disabled = false;
            btnSuccess.style.display = 'none';
            btnText.style.display = 'flex';
        }, 3000);
    }
    
    function showError(message) {
        // Create or update error message
        let errorEl = document.querySelector('.form-error');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'form-error';
            form.appendChild(errorEl);
        }
        
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorEl.style.display = 'none';
        }, 5000);
    }
});

// Newsletter Popup Functionality
function initNewsletterPopup() {
    const popup = document.getElementById('newsletterPopup');
    const popupClose = document.getElementById('popupClose');
    const popupForm = document.getElementById('popupForm');
    const popupBtn = document.getElementById('popupSubscribeBtn');
    const popupNameInput = document.getElementById('popupName');
    const popupEmailInput = document.getElementById('popupEmail');
    
    // Check if popup was shown in this session
    const popupShown = sessionStorage.getItem('newsletterPopupShown');
    
    // Show popup after 5 seconds if not shown in this session
    if (!popupShown) {
        setTimeout(() => {
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 5000);
    }
    
    // Close popup function
    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
        sessionStorage.setItem('newsletterPopupShown', 'true');
    }
    
    // Close popup on close button click
    popupClose.addEventListener('click', closePopup);
    
    // Close popup on outside click
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });
    
    // Close popup on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
    
    // Form validation functions (reuse from main form)
    function validatePopupName(name) {
        const namePattern = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
        return namePattern.test(name.trim());
    }
    
    function validatePopupEmail(email) {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        return emailPattern.test(email.trim());
    }
    
    // Real-time validation for popup form
    popupNameInput.addEventListener('input', function() {
        const isValid = validatePopupName(this.value);
        this.style.borderColor = isValid ? '#333' : '#ff4444';
    });
    
    popupEmailInput.addEventListener('input', function() {
        const isValid = validatePopupEmail(this.value);
        this.style.borderColor = isValid ? '#333' : '#ff4444';
    });
    
    // Handle popup form submission
    popupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = popupNameInput.value.trim();
        const email = popupEmailInput.value.trim();
        
        // Validate inputs
        if (!validatePopupName(name)) {
            popupNameInput.style.borderColor = '#ff4444';
            popupNameInput.focus();
            return;
        }
        
        if (!validatePopupEmail(email)) {
            popupEmailInput.style.borderColor = '#ff4444';
            popupEmailInput.focus();
            return;
        }
        
        // Check for spam (honeypot and rate limiting)
        const honeypot = popupForm.querySelector('input[name="website"]');
        if (honeypot.value) {
            return; // Silent fail for bots
        }
        
        // Rate limiting
        const lastSubmission = localStorage.getItem('lastPopupSubmission');
        const now = Date.now();
        if (lastSubmission && now - parseInt(lastSubmission) < 5000) {
            return; // Silent fail for rapid submissions
        }
        
        // Show loading state
        popupBtn.classList.add('loading');
        popupBtn.querySelector('.btn-text').style.display = 'none';
        popupBtn.querySelector('.btn-loading').style.display = 'flex';
        popupBtn.disabled = true;
        
        // Submit to AWeber
        const formData = new FormData(popupForm);
        
        fetch('https://www.aweber.com/scripts/addlead.pl', {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        }).then(() => {
            // Store submission time
            localStorage.setItem('lastPopupSubmission', now.toString());
            
            // Show success state
            popupBtn.classList.remove('loading');
            popupBtn.querySelector('.btn-loading').style.display = 'none';
            popupBtn.querySelector('.btn-success').style.display = 'flex';
            
            // Close popup after 2 seconds
            setTimeout(() => {
                closePopup();
                
                // Reset form after closing
                setTimeout(() => {
                    popupForm.reset();
                    popupBtn.classList.remove('loading');
                    popupBtn.querySelector('.btn-success').style.display = 'none';
                    popupBtn.querySelector('.btn-text').style.display = 'flex';
                    popupBtn.disabled = false;
                    popupNameInput.style.borderColor = '#333';
                    popupEmailInput.style.borderColor = '#333';
                }, 500);
            }, 2000);
            
        }).catch(() => {
            // Handle error
            popupBtn.classList.remove('loading');
            popupBtn.querySelector('.btn-loading').style.display = 'none';
            popupBtn.querySelector('.btn-text').style.display = 'flex';
            popupBtn.disabled = false;
            
            // Show error styling
            popupBtn.style.background = '#ff4444';
            setTimeout(() => {
                popupBtn.style.background = '';
            }, 3000);
        });
    });
}

// Console easter egg
console.log(`
    ██████╗ ██╗   ██╗██╗     ██╗      ██████╗ ██╗    ██╗
    ██╔════╝ ██║   ██║██║     ██║     ██╔═══██╗██║    ██║
    ██║  ███╗██║   ██║██║     ██║     ██║   ██║██║ █╗ ██║
    ██║   ██║╚██╗ ██╔╝██║     ██║     ██║   ██║██║███╗██║
    ╚██████╔╝ ╚████╔╝ ███████╗███████╗╚██████╔╝╚███╔███╔╝
     ╚═════╝   ╚═══╝  ╚══════╝╚══════╝ ╚═════╝  ╚══╝╚══╝ 
     
    Welcome to GVLLOW's official website!
`);
