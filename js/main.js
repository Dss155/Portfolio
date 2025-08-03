
// Futuristic Portfolio Controller
class FuturisticPortfolio {
    constructor() {
        this.init();
        this.setupParticles();
    }

    init() {
        this.setupNavigation();
        this.setupAnimations();
        this.setupTypingEffect();
        this.setupCounters();
        this.setupContactForm();
        this.setCurrentYear();
        this.setupScrollEffects();
    }

    setupNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        const links = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        navToggle?.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu and smooth scroll
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');

                const target = link.getAttribute('href');
                this.smoothScrollTo(target);
                this.setActiveLink(link);
            });
        });

        // Scroll spy
        this.setupScrollSpy();
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    setActiveLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => observer.observe(section));
    }

    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    setupTypingEffect() {
        const texts = [
            'Full Stack Developer',
            'AI Enthusiast',
            'Future Architect',
            'Digital Innovator',
            'Tech Visionary'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typedElement = document.getElementById('typed-text');

        const type = () => {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typedElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 120;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        if (typedElement) type();
    }

    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');

        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2500;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCounter();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');

        form?.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Futuristic loading animation
            submitBtn.innerHTML = '<i class="fas fa-satellite-dish fa-spin"></i> Transmitting...';
            submitBtn.disabled = true;

            // Simulate transmission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Transmission Complete!';
                submitBtn.style.background = 'var(--gradient-tertiary)';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    form.reset();

                    // Success feedback
                    this.showNotification('Mission brief received! I\'ll respond within 24 hours.');
                }, 3000);
            }, 2000);
        });
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--gradient-primary);
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                    box-shadow: 0 10px 25px rgba(0, 212, 255, 0.3);
                `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 4000);
    }

    setupScrollEffects() {
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            // Parallax for background orbs
            document.querySelectorAll('.orb').forEach((orb, index) => {
                const speed = 0.5 + (index * 0.2);
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });

            // Parallax for floating cards
            document.querySelectorAll('.floating-card').forEach((card, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = -(scrolled * speed);
                card.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    setupParticles() {
        // Create floating particles for extra visual flair
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                        position: fixed;
                        width: 2px;
                        height: 2px;
                        background: var(--neon-blue);
                        pointer-events: none;
                        z-index: -1;
                        border-radius: 50%;
                        opacity: 0;
                    `;

            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight + 10;
            const endY = -10;
            const duration = Math.random() * 3000 + 2000;

            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';

            document.body.appendChild(particle);

            // Animate particle
            particle.animate([
                { transform: 'translateY(0px)', opacity: 0 },
                { transform: 'translateY(-50px)', opacity: 1, offset: 0.1 },
                { transform: `translateY(${endY - startY}px)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'linear'
            }).addEventListener('finish', () => {
                document.body.removeChild(particle);
            });
        };

        // Create particles periodically
        setInterval(createParticle, 500);
    }

    setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}

// Initialize the futuristic experience
document.addEventListener('DOMContentLoaded', () => {
    new FuturisticPortfolio();

    // Add some extra CSS animations
    const style = document.createElement('style');
    style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                
                /* Glitch effect for hover states */
                .hero-title:hover {
                    animation: glitch 0.3s ease-in-out;
                }
                
                @keyframes glitch {
                    0% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                    100% { transform: translate(0); }
                }
                
                /* Neon pulse effect */
                .btn-primary:hover {
                    animation: neon-pulse 1.5s ease-in-out infinite alternate;
                }
                
                @keyframes neon-pulse {
                    from {
                        box-shadow: 0 0 20px var(--neon-blue), 0 0 30px var(--neon-blue), 0 0 40px var(--neon-blue);
                    }
                    to {
                        box-shadow: 0 0 10px var(--neon-blue), 0 0 20px var(--neon-blue), 0 0 30px var(--neon-blue);
                    }
                }
                
                /* Holographic effect for cards */
                .skill-card:hover,
                .project-card:hover {
                    background: linear-gradient(45deg, 
                        rgba(0, 212, 255, 0.1) 0%, 
                        rgba(179, 68, 255, 0.1) 25%, 
                        rgba(255, 68, 179, 0.1) 50%, 
                        rgba(68, 255, 136, 0.1) 75%, 
                        rgba(0, 212, 255, 0.1) 100%);
                    background-size: 300% 300%;
                    animation: holographic 3s ease infinite;
                }
                
                @keyframes holographic {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                /* Matrix-style text reveal */
                .section-title {
                    position: relative;
                    overflow: hidden;
                }
                
                .section-title::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, 
                        transparent, 
                        rgba(0, 212, 255, 0.4), 
                        transparent);
                    animation: matrix-sweep 2s ease-in-out;
                }
                
                @keyframes matrix-sweep {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
                
                /* Cyber grid overlay */
                .hero::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: 
                        linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
                    background-size: 100px 100px;
                    pointer-events: none;
                    animation: cyber-grid 20s linear infinite;
                }
                
                @keyframes cyber-grid {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(100px, 100px); }
                }
                
                /* Data stream effect */
                .nav::after {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, 
                        transparent, 
                        var(--neon-blue), 
                        transparent);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .nav:hover::after {
                    opacity: 1;
                    animation: data-stream 1s ease-in-out infinite;
                }
                
                @keyframes data-stream {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                /* Quantum loading effect */
                .btn-primary:active {
                    animation: quantum-load 0.6s ease-in-out;
                }
                
                @keyframes quantum-load {
                    0% { transform: scale(1); }
                    50% { transform: scale(0.95); box-shadow: inset 0 0 20px rgba(0, 212, 255, 0.5); }
                    100% { transform: scale(1); }
                }
                
                /* Responsive enhancements */
                @media (max-width: 768px) {
                    .floating-elements {
                        display: none;
                    }
                    
                    .bg-orbs {
                        opacity: 0.5;
                    }
                    
                    .hero-title {
                        font-size: 2.5rem;
                        text-align: center;
                    }
                    
                    .hero-visual {
                        margin-top: 2rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .hero-buttons {
                        width: 100%;
                    }
                    
                    .btn {
                        width: 100%;
                        max-width: none;
                    }
                    
                    .social-links {
                        gap: 1rem;
                    }
                    
                    .contact-method {
                        padding: 1rem;
                    }
                }
            `;
    document.head.appendChild(style);
});

// Advanced interaction effects
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--neon-blue);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX - 2}px;
                top: ${e.clientY - 2}px;
                animation: cursor-trail 0.6s ease-out forwards;
            `;

    document.body.appendChild(cursor);

    setTimeout(() => {
        if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
    }, 600);
});

// Add cursor trail animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
            @keyframes cursor-trail {
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0);
                }
            }
        `;
document.head.appendChild(trailStyle);

// Smooth scrolling for all internal links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Performance optimization for animations
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reducedMotion.matches) {
    document.documentElement.style.setProperty('--ease-spring', 'ease');
    document.documentElement.style.setProperty('--ease-smooth', 'ease');
}
