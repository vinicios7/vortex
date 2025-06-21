const gameAccounts = [
    {
        id: 1,
        title: "Valorant Radiant",
        game: "Valorant",
        description: "Conta Radiant com skins exclusivas",
        features: ["Rank Radiant", "Skins Phantom/Vandal", "Todas as armas desbloqueadas", "Battle Pass completo"],
        currentPrice: "R$ 299",
        originalPrice: "R$ 450",
        icon: "🎯"
    },
    {
        id: 2,
        title: "League of Legends Challenger",
        game: "League of Legends",
        description: "Conta Challenger com 150+ skins",
        features: ["Rank Challenger", "150+ Skins", "Todos os campeões", "Chromas exclusivos"],
        currentPrice: "R$ 499",
        originalPrice: "R$ 750",
        icon: "⚔️"
    },
    {
        id: 3,
        title: "CS2 Global Elite",
        game: "Counter-Strike 2",
        description: "Conta Global com skins valiosas",
        features: ["Global Elite", "Skins AK/M4A4", "Knife Karambit", "Service Medal"],
        currentPrice: "R$ 399",
        originalPrice: "R$ 600",
        icon: "🔫"
    },
    {
        id: 4,
        title: "Apex Legends Master",
        game: "Apex Legends",
        description: "Conta Master com heirloom rara",
        features: ["Rank Master", "Heirloom Wraith", "Todas as lendas", "Skins lendárias"],
        currentPrice: "R$ 350",
        originalPrice: "R$ 500",
        icon: "🏆"
    },
    {
        id: 5,
        title: "Fortnite Championship",
        game: "Fortnite",
        description: "Conta com skins raras e V-Bucks",
        features: ["Skins Chapter 1", "Renegade Raider", "10.000 V-Bucks", "Emotes exclusivos"],
        currentPrice: "R$ 275",
        originalPrice: "R$ 400",
        icon: "🎮"
    },
    {
        id: 6,
        title: "Overwatch 2 Grandmaster",
        game: "Overwatch 2",
        description: "Conta Grandmaster completa",
        features: ["Rank Grandmaster", "Todos os heróis", "Skins lendárias", "Golden weapons"],
        currentPrice: "R$ 325",
        originalPrice: "R$ 480",
        icon: "🦾"
    }
];

// DOM elementos
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const accountsGrid = document.getElementById('accountsGrid');

// navegação mobile
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// fecha menu mobile quando clica em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Render game accounts
function renderAccounts() {
    if (!accountsGrid) return;
    
    accountsGrid.innerHTML = gameAccounts.map(account => `
        <div class="account-card">
            <div class="account-image">
                ${account.icon}
            </div>
            <div class="account-content">
                <h3 class="account-title">${account.title}</h3>
                <p class="account-description">${account.description}</p>
                <ul class="account-features">
                    ${account.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="account-price">
                    <span class="price-current">${account.currentPrice}</span>
                    <span class="price-original">${account.originalPrice}</span>
                </div>
                <button class="btn btn-primary" onclick="buyAccount(${account.id})">
                    Comprar Agora
                </button>
            </div>
        </div>
    `).join('');
}

// Buy account function
function buyAccount(accountId) {
    const account = gameAccounts.find(acc => acc.id === accountId);
    if (account) {
        alert(`Redirecionando para compra da conta: ${account.title}\nPreço: ${account.currentPrice}`);
        // Here you would typically redirect to a payment page or open a modal
        console.log('Buying account:', account);
    }
}

// Testimonials slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }
    
    // Activate current dot
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function currentSlide(index) {
    currentTestimonial = index - 1;
    showTestimonial(currentTestimonial);
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-advance testimonials
setInterval(nextTestimonial, 5000);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
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

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Initialize accounts grid
    renderAccounts();
    
    // Set up animations
    const animatedElements = document.querySelectorAll('.benefit-card, .account-card, .testimonial');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Smooth scroll for navigation links
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

// Add loading states to buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn') && e.target.textContent.includes('Comprar')) {
        const originalText = e.target.textContent;
        e.target.textContent = 'Processando...';
        e.target.disabled = true;
        
        setTimeout(() => {
            e.target.textContent = originalText;
            e.target.disabled = false;
        }, 2000);
    }
});

// Particles effect for hero background
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(59, 130, 246, 0.6);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Add particles CSS animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles on load
document.addEventListener('DOMContentLoaded', createParticles);

// Console welcome message
console.log('%c🎮 GameVault - Landing Page Loaded Successfully! 🎮', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');