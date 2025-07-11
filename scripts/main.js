// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth Scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            showMessage('Thank you for subscribing to our newsletter!', 'success');
            this.querySelector('input[type="email"]').value = '';
        }
    });
}

// Download Button Functionality
document.querySelectorAll('.btn').forEach(button => {
    if (button.textContent.trim() === 'Download') {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const appName = this.closest('.app-card').querySelector('h3').textContent;
            showDownloadModal(appName);
        });
    }
});

// Show Download Modal
function showDownloadModal(appName) {
    const modal = createModal(`
        <div class="modal-content">
            <h3>Download ${appName}</h3>
            <p>Please note that downloading APK files from third-party sources may pose security risks. Make sure you trust the source and have proper antivirus protection.</p>
            <div class="modal-buttons">
                <button class="btn btn-primary" onclick="startDownload('${appName}')">Continue Download</button>
                <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

// Start Download
function startDownload(appName) {
    closeModal();
    showMessage(`Download started for ${appName}`, 'success');
    
    // Simulate download progress
    const progressModal = createModal(`
        <div class="modal-content">
            <h3>Downloading ${appName}</h3>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <p id="progressText">0%</p>
        </div>
    `);
    document.body.appendChild(progressModal);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                closeModal();
                showMessage(`${appName} downloaded successfully!`, 'success');
            }, 500);
        }
        
        document.getElementById('progressFill').style.width = progress + '%';
        document.getElementById('progressText').textContent = Math.round(progress) + '%';
    }, 200);
}

// Create Modal
function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-dialog" onclick="event.stopPropagation()">
                ${content}
            </div>
        </div>
    `;
    return modal;
}

// Close Modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Show Message
function showMessage(text, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${text}</span>
        <button onclick="this.parentElement.remove()" class="message-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

// Category Card Click Events
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const categoryName = card.querySelector('h3').textContent;
        showMessage(`Loading ${categoryName} apps...`, 'info');
        // Here you would typically navigate to a category page
    });
});

// Animate elements on scroll
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
    const animateElements = document.querySelectorAll('.app-card, .category-card, .feature-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Search functionality (if search bar is added)
function initSearch() {
    const searchInput = document.querySelector('#searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            // Implement search logic here
            console.log('Searching for:', query);
        });
    }
}

// Theme toggle (if dark mode is needed)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Add loading animation for page transitions
function showLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.remove();
    }
}

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Search Overlay Functions
function openSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    if (searchOverlay) {
        searchOverlay.style.display = 'flex';
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 300);
        }
    }
}

function closeSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    if (searchOverlay) {
        searchOverlay.style.display = 'none';
    }
}

// Enhanced Navbar Scroll Effect
function updateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    const floatingBtn = document.querySelector('.btn-floating');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        if (floatingBtn) {
            floatingBtn.classList.add('visible');
        }
    } else {
        navbar.classList.remove('scrolled');
        if (floatingBtn) {
            floatingBtn.classList.remove('visible');
        }
    }
}

// Intersection Observer for Animations
function createIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.app-card, .category-card, .feature-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Enhanced Search with Keyboard Support
function enhanceSearch() {
    const searchInput = document.querySelector('#searchInput');
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.toLowerCase();
                if (query.trim()) {
                    closeSearch();
                    showMessage(`Searching for "${query}"...`, 'info');
                    // Implement actual search logic here
                }
            } else if (e.key === 'Escape') {
                closeSearch();
            }
        });
    }

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            openSearch();
        } else if (e.key === 'Escape') {
            closeSearch();
        }
    });
}

// Parallax and Smooth Animations
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        // Floating shapes animation
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Enhanced Button Interactions
function enhanceButtonInteractions() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('btn-floating')) {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-floating')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });

        // Add ripple effect on click
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    enhanceSearch();
    createIntersectionObserver();
    initParallaxEffects();
    enhanceButtonInteractions();
    
    // Enhanced scroll listener
    window.addEventListener('scroll', updateNavbarOnScroll);
    
    // Initialize floating button visibility
    updateNavbarOnScroll();
});