// Authentication JavaScript for ASHURA STORE

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        
        // Real-time password validation
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (password && confirmPassword) {
            confirmPassword.addEventListener('input', validatePasswordMatch);
            password.addEventListener('input', validatePassword);
        }
    }
});

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password'),
        remember: formData.get('remember') === 'on'
    };
    
    // Validate input
    if (!validateEmail(loginData.email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    if (loginData.password.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.auth-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await simulateAuthRequest();
        
        // Store user session
        if (loginData.remember) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        // Set user session
        sessionStorage.setItem('userLoggedIn', 'true');
        sessionStorage.setItem('userEmail', loginData.email);
        
        showMessage('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard or home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        
    } catch (error) {
        showMessage('Login failed. Please check your credentials and try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Handle Registration
async function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const registerData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        username: formData.get('username'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        terms: formData.get('terms') === 'on'
    };
    
    // Validate all fields
    if (!validateRegistration(registerData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.auth-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating account...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await simulateAuthRequest();
        
        // Store user data
        sessionStorage.setItem('userLoggedIn', 'true');
        sessionStorage.setItem('userEmail', registerData.email);
        sessionStorage.setItem('userName', registerData.fullName);
        
        showMessage('Account created successfully! Welcome to ASHURA STORE!', 'success');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    } catch (error) {
        showMessage('Registration failed. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Validate Registration Data
function validateRegistration(data) {
    // Check full name
    if (data.fullName.length < 2) {
        showMessage('Please enter your full name', 'error');
        return false;
    }
    
    // Check email
    if (!validateEmail(data.email)) {
        showMessage('Please enter a valid email address', 'error');
        return false;
    }
    
    // Check username
    if (data.username.length < 3) {
        showMessage('Username must be at least 3 characters long', 'error');
        return false;
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
        showMessage('Username can only contain letters, numbers, and underscores', 'error');
        return false;
    }
    
    // Check password
    if (!validatePasswordStrength(data.password)) {
        return false;
    }
    
    // Check password confirmation
    if (data.password !== data.confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return false;
    }
    
    // Check terms acceptance
    if (!data.terms) {
        showMessage('Please accept the Terms of Service and Privacy Policy', 'error');
        return false;
    }
    
    return true;
}

// Validate Email Format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate Password Strength
function validatePasswordStrength(password) {
    if (password.length < 8) {
        showMessage('Password must be at least 8 characters long', 'error');
        return false;
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        showMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number', 'error');
        return false;
    }
    
    return true;
}

// Real-time Password Match Validation
function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmField = document.getElementById('confirmPassword');
    
    if (confirmPassword && password !== confirmPassword) {
        confirmField.style.borderColor = '#ff6b6b';
        showTooltip(confirmField, 'Passwords do not match');
    } else {
        confirmField.style.borderColor = '#e1e1e1';
        hideTooltip(confirmField);
    }
}

// Real-time Password Strength Validation
function validatePassword() {
    const password = document.getElementById('password').value;
    const passwordField = document.getElementById('password');
    const strength = getPasswordStrength(password);
    
    // Update field border color based on strength
    if (password.length === 0) {
        passwordField.style.borderColor = '#e1e1e1';
    } else if (strength < 3) {
        passwordField.style.borderColor = '#ff6b6b';
    } else if (strength < 4) {
        passwordField.style.borderColor = '#ffc107';
    } else {
        passwordField.style.borderColor = '#28a745';
    }
}

// Get Password Strength Score
function getPasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;
    
    return score;
}

// Social Authentication Functions
function loginWithGoogle() {
    showMessage('Google authentication is not yet implemented in this demo', 'info');
    // In a real application, you would integrate with Google OAuth
}

function signupWithGoogle() {
    showMessage('Google registration is not yet implemented in this demo', 'info');
    // In a real application, you would integrate with Google OAuth
}

function loginWithFacebook() {
    showMessage('Facebook authentication is not yet implemented in this demo', 'info');
    // In a real application, you would integrate with Facebook Login
}

function signupWithFacebook() {
    showMessage('Facebook registration is not yet implemented in this demo', 'info');
    // In a real application, you would integrate with Facebook Login
}

// Simulate Authentication Request
function simulateAuthRequest() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 90% success rate for demo
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Authentication failed'));
            }
        }, 1500);
    });
}

// Show Tooltip
function showTooltip(element, message) {
    // Remove existing tooltip
    hideTooltip(element);
    
    const tooltip = document.createElement('div');
    tooltip.className = 'field-tooltip';
    tooltip.textContent = message;
    
    element.parentNode.style.position = 'relative';
    element.parentNode.appendChild(tooltip);
}

// Hide Tooltip
function hideTooltip(element) {
    const tooltip = element.parentNode.querySelector('.field-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Show Message Function (if not already defined)
function showMessage(text, type = 'info') {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${text}</span>
            <button onclick="this.closest('.message').remove()" class="message-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

// Check if user is already logged in
function checkAuthStatus() {
    const isLoggedIn = sessionStorage.getItem('userLoggedIn');
    const currentPage = window.location.pathname;
    
    if (isLoggedIn && (currentPage.includes('login.html') || currentPage.includes('register.html'))) {
        // Redirect logged-in users away from auth pages
        window.location.href = 'index.html';
    }
}

// Logout function
function logout() {
    sessionStorage.clear();
    localStorage.removeItem('rememberMe');
    showMessage('You have been logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Initialize authentication check
document.addEventListener('DOMContentLoaded', checkAuthStatus);