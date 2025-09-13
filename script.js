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
document.addEventListener('DOMContentLoaded', initCountdown);

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
        // Simulate video play (you can replace this with actual video functionality)
        const playButton = thumbnail.querySelector('.play-button');
        playButton.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            playButton.style.transform = 'translate(-50%, -50%) scale(1)';
            // Here you would typically open a video modal or redirect to video
            alert('Video functionality would be implemented here');
        }, 200);
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

// Add custom cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(255, 0, 0, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.custom-cursor');
    cursorElement.style.left = e.clientX - 10 + 'px';
    cursorElement.style.top = e.clientY - 10 + 'px';
});

// Enhanced hover effects for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .video-thumbnail, .album-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(255, 0, 0, 0.8)';
        }
    });
    
    element.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(255, 0, 0, 0.5)';
        }
    });
});

// Console easter egg
console.log(`
    ██████╗ ██╗   ██╗██╗     ██╗      ██████╗ ██╗    ██╗
    ██╔════╝ ██║   ██║██║     ██║     ██╔═══██╗██║    ██║
    ██║  ███╗██║   ██║██║     ██║     ██║   ██║██║ █╗ ██║
    ██║   ██║╚██╗ ██╔╝██║     ██║     ██║   ██║██║███╗██║
    ╚██████╔╝ ╚████╔╝ ███████╗███████╗╚██████╔╝╚███╔███╔╝
     ╚═════╝   ╚═══╝  ╚══════╝╚══════╝ ╚═════╝  ╚══╝╚══╝ 
     
    Welcome to GVLLOW's official website!
    Built with passion and code.
`);
