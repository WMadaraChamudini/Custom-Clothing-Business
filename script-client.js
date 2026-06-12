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
    contactForm.addEventListener('submit', async (e) => {
        console.log("Form submit detected");
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
            showMessage('Please fill all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Build WhatsApp message as fallback
        const messageLines = [
            'Hello Fashion By Nilu, I would like to enquire about your services.',
            '',
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Phone: ${data.phone}`,
            `Service: ${data.service}`,
            `Message: ${data.message}`
        ];

        const message = messageLines.join('\n');
        const waNumber = '94719660046'; 
        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

        // Payload for server email send
        const emailPayload = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            service: data.service,
            message: data.message,
            to: 'madaraweerasinghe02@gmail.com'
        };

        // Attempt server-side email send; if it fails, fallback to opening wa.me so user can send manually
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emailPayload)
            });

            if (res.ok) {
                showMessage('Message sent via email — we will contact you soon.', 'success');
                console.log('Server response:', await res.json());
                contactForm.reset();
            } else {
                // server returned error; fallback to wa.me
                console.warn('Email send failed, falling back to wa.me', res.status);
                showMessage('Could not send automatically; opening WhatsApp. Please press Send.', 'error');
                window.open(waUrl, '_blank');
            }
        } catch (err) {
            console.error('Error sending email to server:', err);
            showMessage('Could not send automatically; opening WhatsApp. Please press Send.', 'error');
            window.open(waUrl, '_blank');
        }

        // Re-enable the button after short delay. Keep form contents so user can review if they need to resend.
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);

        // Log message for debugging
        console.log('WhatsApp Message (preview):', message);
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
