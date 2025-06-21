const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
const rememberMeCheckbox = document.getElementById('rememberMe');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const loginButton = document.querySelector('.btn-login');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');
const toast = document.getElementById('toast');
const googleLoginBtn = document.getElementById('googleLogin');
const discordLoginBtn = document.getElementById('discordLogin');

// Password visibility toggle
passwordToggle.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    passwordToggle.textContent = type === 'password' ? '👁️' : '🙈';
});

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(element, message) {
    element.textContent = message;
    element.previousElementSibling.classList.add('error');
}

function clearError(element) {
    element.textContent = '';
    element.previousElementSibling.classList.remove('error');
}

function showToast(message, type = 'success') {
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastIcon.textContent = type === 'success' ? '✅' : '❌';
    toastMessage.textContent = message;
    
    if (type === 'error') {
        toast.style.borderColor = '#ef4444';
    } else {
        toast.style.borderColor = '#10b981';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function setLoadingState(isLoading) {
    if (isLoading) {
        loginButton.disabled = true;
        loginButton.classList.add('btn-loading');
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
    } else {
        loginButton.disabled = false;
        loginButton.classList.remove('btn-loading');
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

// Real-time validation
emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() === '') {
        clearError(emailError);
    } else if (!validateEmail(emailInput.value)) {
        showError(emailError, 'Por favor, digite um email válido');
    } else {
        clearError(emailError);
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.value === '') {
        clearError(passwordError);
    } else if (!validatePassword(passwordInput.value)) {
        showError(passwordError, 'A senha deve ter pelo menos 6 caracteres');
    } else {
        clearError(passwordError);
    }
});

// Form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    let isValid = true;
    
    // Clear previous errors
    clearError(emailError);
    clearError(passwordError);
    
    // Validate email
    if (!email) {
        showError(emailError, 'Email é obrigatório');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailError, 'Por favor, digite um email válido');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showError(passwordError, 'Senha é obrigatória');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(passwordError, 'A senha deve ter pelo menos 6 caracteres');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Simulate login process
    setLoadingState(true);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate login validation
        if (email === 'admin@gamevault.com' && password === '123456') {
            // Success
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('rememberMe', 'true');
            }
            
            showToast('Login realizado com sucesso!');
            
            // Redirect after successful login
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            
        } else {
            // Error
            showError(passwordError, 'Email ou senha incorretos');
            showToast('Credenciais inválidas. Tente novamente.', 'error');
        }
        
    } catch (error) {
        showToast('Erro no servidor. Tente novamente mais tarde.', 'error');
        console.error('Login error:', error);
    } finally {
        setLoadingState(false);
    }
});

// Social login handlers
googleLoginBtn.addEventListener('click', () => {
    showToast('Redirecionando para login do Google...', 'success');
    // Here you would typically redirect to Google OAuth
    console.log('Google login initiated');
});

discordLoginBtn.addEventListener('click', () => {
    showToast('Redirecionando para login do Discord...', 'success');
    // Here you would typically redirect to Discord OAuth
    console.log('Discord login initiated');
});

// Check if user should be remembered
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('rememberMe') === 'true') {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
            rememberMeCheckbox.checked = true;
        }
    }
    
    // Check if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showToast('Você já está logado!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
});

// Input focus effects
const inputs = document.querySelectorAll('.form-input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Forgot password handler
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    if (!email) {
        showError(emailError, 'Digite seu email primeiro para recuperar a senha');
        emailInput.focus();
        return;
    }
    
    if (!validateEmail(email)) {
        showError(emailError, 'Digite um email válido para recuperar a senha');
        emailInput.focus();
        return;
    }
    
    showToast(`Instruções de recuperação enviadas para ${email}`, 'success');
});

// Register link handler
document.querySelector('.register-link').addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Página de cadastro em breve!', 'success');
    // Here you would typically redirect to registration page
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Enter key submits form when focused on inputs
    if (e.key === 'Enter' && (emailInput === document.activeElement || passwordInput === document.activeElement)) {
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape key clears form
    if (e.key === 'Escape') {
        emailInput.value = '';
        passwordInput.value = '';
        rememberMeCheckbox.checked = false;
        clearError(emailError);
        clearError(passwordError);
    }
});

// Add particle effects to background
function createLoginParticles() {
    const loginSection = document.querySelector('.login-section');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'login-particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(139, 92, 246, 0.6);
            border-radius: 50%;
            animation: loginFloat ${Math.random() * 3 + 2}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    loginSection.appendChild(particlesContainer);
}

// Add particles CSS animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes loginFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        50% { transform: translateY(-15px) rotate(180deg); opacity: 1; }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
createLoginParticles();

// Console welcome message
console.log('%c🔐 GameVault Login - Ready! 🔐', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
console.log('%cDemo credentials: admin@gamevault.com / 123456', 'color: #06d6a0; font-size: 12px;');