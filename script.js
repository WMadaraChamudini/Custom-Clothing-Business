// ====================== MOBILE MENU ======================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {

    hamburger.addEventListener('click', () => {

        navMenu.classList.toggle('active');

    });

    document.querySelectorAll('.nav-link').forEach(link => {

        link.addEventListener('click', () => {

            navMenu.classList.remove('active');

        });

    });
}

// ====================== ACTIVE NAVIGATION ======================
function updateActiveNavLink() {

    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {

        link.classList.remove('active');

        const currentPage =
            window.location.pathname.split('/').pop();

        if (
            link.getAttribute('href') === currentPage ||
            (currentPage === '' &&
             link.getAttribute('href') === 'index.html')
        ) {

            link.classList.add('active');

        }

    });
}

updateActiveNavLink();

// ====================== PORTFOLIO FILTER ======================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0) {

    filterButtons.forEach(button => {

        button.addEventListener('click', () => {

            filterButtons.forEach(btn =>
                btn.classList.remove('active')
            );

            button.classList.add('active');

            const filterValue =
                button.getAttribute('data-filter');

            portfolioItems.forEach(item => {

                if (
                    filterValue === 'all' ||
                    item.getAttribute('data-category') === filterValue
                ) {

                    item.style.display = 'block';

                } else {

                    item.style.display = 'none';

                }

            });

        });

    });
}

// ====================== CONTACT FORM (WEB3FORMS) ======================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {

    contactForm.addEventListener('submit', async function (e) {

        e.preventDefault();

        formMessage.className = "form-message";
        formMessage.textContent = "Sending...";
        formMessage.style.display = "block";

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {

            const response = await fetch(
                'https://api.web3forms.com/submit',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                }
            );

            const result = await response.json();

            if (response.ok && result.success) {

                contactForm.reset();

                formMessage.textContent =
                    "Thank you for reaching out! We'll contact you soon.";

                formMessage.className =
                    "form-message success";

            } else {

                formMessage.textContent =
                    "Failed to send message. Please try again.";

                formMessage.className =
                    "form-message error";

                console.error(result);
            }

        } catch (error) {

            formMessage.textContent =
                "Network error. Please try again.";

            formMessage.className =
                "form-message error";

            console.error(error);
        }
    });
}

// ====================== COUNTER ANIMATION ======================
function animateCounters() {

    const statItems =
        document.querySelectorAll('.stat-item h3');

    statItems.forEach(item => {

        const targetValue =
            parseInt(item.textContent.replace(/[^0-9]/g, ''));

        const originalText = item.textContent;

        let currentValue = 0;

        const increment =
            Math.ceil(targetValue / 50);

        const counter = setInterval(() => {

            currentValue += increment;

            if (currentValue >= targetValue) {

                currentValue = targetValue;

                clearInterval(counter);

            }

            item.textContent =
                currentValue +
                originalText.replace(/[0-9]/g, '');

        }, 30);

    });

}

const statsSection =
    document.querySelector('.stats-section');

if (statsSection) {

    const statsObserver =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !entry.target.classList.contains('animated')
                ) {

                    animateCounters();

                    entry.target.classList.add('animated');

                    statsObserver.unobserve(entry.target);

                }

            });

        });

    statsObserver.observe(statsSection);

}

// ====================== SCROLL ANIMATIONS ======================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.animation =
                    'fadeInUp 0.6s ease-out';

                observer.unobserve(entry.target);

            }

        });

    }, observerOptions);

document.querySelectorAll(
    '.service-card, .portfolio-item, .testimonial-card'
).forEach(element => {

    observer.observe(element);

});

// ====================== SMOOTH SCROLL ======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        const target =
            document.querySelector(
                this.getAttribute('href')
            );

        if (target) {

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    });

});

// ====================== PAGE LOAD ======================
window.addEventListener('load', () => {

    document.body.style.opacity = '1';

});

// ====================== CONSOLE BRANDING ======================
console.log(
    '%cFashion By Nilu',
    'font-size:24px;font-weight:bold;color:#8B4789;'
);

console.log(
    '%cPremium Custom Tailoring & Bespoke Clothing',
    'font-size:14px;color:#666;'
);