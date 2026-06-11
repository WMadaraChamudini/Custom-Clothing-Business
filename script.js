// ====================== MOBILE MENU TOGGLE ======================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ====================== ACTIVE NAV LINK ======================
function updateActiveNavLink() {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === window.location.pathname.split('/').pop() || 
            (window.location.pathname === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

updateActiveNavLink();

// ====================== PORTFOLIO FILTER ======================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 0);
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    });
});

// ====================== FORM SUBMISSION ======================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!data.name || !data.email || !data.phone || !data.message) {
            showMessage('Please fill all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        setTimeout(() => {
            showMessage('Thank you for reaching out! We\'ll contact you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Log form data (in real app, send to server)
            console.log('Form Data:', data);
        }, 1500);
    });
}

function showMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        setTimeout(() => {
            formMessage.className = '';
        }, 5000);
    }
}

// ====================== SCROLL ANIMATIONS ======================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card').forEach(element => {
    observer.observe(element);
});

// ====================== SMOOTH SCROLL FOR ANCHOR LINKS ======================
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

// ====================== COUNTER ANIMATION ======================
function animateCounters() {
    const statItems = document.querySelectorAll('.stat-item h3');
    
    statItems.forEach(item => {
        const targetValue = parseInt(item.textContent.replace(/[^0-9]/g, ''));
        const originalText = item.textContent;
        let currentValue = 0;
        const increment = Math.ceil(targetValue / 50);

        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
            }
            item.textContent = currentValue + originalText.replace(/[0-9]/g, '');
        }, 30);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounters();
                entry.target.classList.add('animated');
                statsObserver.unobserve(entry.target);
            }
        });
    });
    statsObserver.observe(statsSection);
}

// ====================== BOOKING BUTTON HANDLERS ======================
const bookingButtons = document.querySelectorAll('.booking-option .btn');
bookingButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const option = button.parentElement.querySelector('h3').textContent;
        alert(`Please contact us to book: ${option}\nEmail: info@fashionbynilu.com\nPhone: +91 98765 43210`);
    });
});

// ====================== PORTFOLIO MODAL (OPTIONAL) ======================
const viewButtons = document.querySelectorAll('.view-btn');
viewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const portfolioCard = button.closest('.portfolio-item');
        const title = portfolioCard.querySelector('.portfolio-info h3').textContent;
        alert(`Viewing: ${title}\n\nThis would open a lightbox in a full implementation.`);
    });
});

// ====================== PAGE LOAD ANIMATIONS ======================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ====================== UTILITY FUNCTIONS ======================

// Add smooth transitions to page changes
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a:not([href^="#"]):not([target])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.hostname === window.location.hostname) {
                e.preventDefault();
                const url = link.getAttribute('href');
                window.location.href = url;
            }
        });
    });
});

// ====================== CONSOLE WELCOME MESSAGE ======================
console.log('%cFashion By Nilu', 'font-size: 24px; font-weight: bold; color: #8B4789;');
console.log('%cPremium Custom Tailoring & Bespoke Clothing', 'font-size: 14px; color: #666;');
console.log('%cWebsite Created with ❤️', 'font-size: 12px; color: #D4A5A5;');
