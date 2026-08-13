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
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (
            link.getAttribute('href') === currentPage ||
            (currentPage === '' && link.getAttribute('href') === 'index.html')
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
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const matchesFilter =
                    filterValue === 'all' ||
                    item.getAttribute('data-category') === filterValue;

                item.style.display = matchesFilter ? 'block' : 'none';
                item.style.opacity = matchesFilter ? '1' : '0';
            });
        });
    });
}

// ====================== PRODUCT GALLERY LIGHTBOX ======================
const galleryItems = document.querySelectorAll('.portfolio-item[data-gallery]');

if (galleryItems.length > 0) {
    galleryItems.forEach(card => {
        const galleryImages = (card.getAttribute('data-gallery') || '')
            .split('|')
            .map(entry => entry.trim())
            .filter(Boolean);
        const collageHost = card.querySelector('.portfolio-img');

        if (!collageHost || collageHost.querySelector('.gallery-collage')) {
            return;
        }

        const collageImages = galleryImages.slice(0, 4);

        if (collageImages.length < 1) {
            return;
        }

        const collage = document.createElement('div');
        collage.className = 'gallery-collage';
        collage.dataset.previewCount = String(collageImages.length);
        collage.innerHTML = collageImages.map((src, index) => `
            <div class="gallery-collage__tile gallery-collage__tile--${index + 1}">
                <img src="${src}" alt="" aria-hidden="true" loading="lazy" />
            </div>
        `).join('');

        collageHost.classList.add('portfolio-img--collage');
        collageHost.appendChild(collage);
    });

    const galleryModal = document.createElement('div');
    galleryModal.className = 'gallery-modal';
    galleryModal.setAttribute('aria-hidden', 'true');
    galleryModal.innerHTML = `
        <div class="gallery-modal__backdrop" data-close-gallery></div>
        <div class="gallery-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="galleryTitle">
            <button class="gallery-modal__close" type="button" aria-label="Close gallery" data-close-gallery>&times;</button>
            <div class="gallery-modal__media">
                <img class="gallery-modal__image" src="" alt="" />
            </div>
            <div class="gallery-modal__content">
                <div class="gallery-modal__header">
                    <h3 id="galleryTitle"></h3>
                    <span class="gallery-modal__counter"></span>
                </div>
                <p class="gallery-modal__caption"></p>
                <div class="gallery-modal__styles"></div>
                <div class="gallery-modal__thumbnails"></div>
                <div class="gallery-modal__controls">
                    <button class="gallery-modal__nav" type="button" data-gallery-prev aria-label="Previous image">&larr;</button>
                    <button class="gallery-modal__nav" type="button" data-gallery-next aria-label="Next image">&rarr;</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(galleryModal);

    const galleryImage = galleryModal.querySelector('.gallery-modal__image');
    const galleryTitle = galleryModal.querySelector('#galleryTitle');
    const galleryCaption = galleryModal.querySelector('.gallery-modal__caption');
    const galleryCounter = galleryModal.querySelector('.gallery-modal__counter');
    const galleryStyles = galleryModal.querySelector('.gallery-modal__styles');
    const galleryThumbnails = galleryModal.querySelector('.gallery-modal__thumbnails');
    const prevButton = galleryModal.querySelector('[data-gallery-prev]');
    const nextButton = galleryModal.querySelector('[data-gallery-next]');
    const closeButtons = galleryModal.querySelectorAll('[data-close-gallery]');
    const viewButtons = document.querySelectorAll('.view-btn');

    let activeGallery = [];
    let activeIndex = 0;

    function renderGalleryImage(index) {
        if (!activeGallery.length) {
            return;
        }

        activeIndex = (index + activeGallery.length) % activeGallery.length;
        const activeImage = activeGallery[activeIndex];

        galleryImage.src = activeImage.src;
        galleryImage.alt = activeImage.alt;
        galleryTitle.textContent = activeImage.title;
        galleryCaption.textContent = activeImage.caption || activeImage.alt;
        galleryCounter.textContent = `${activeIndex + 1} / ${activeGallery.length}`;

        galleryThumbnails.innerHTML = activeGallery.map((image, thumbIndex) => `
            <button class="gallery-modal__thumbnail ${thumbIndex === activeIndex ? 'is-active' : ''}" type="button" data-gallery-index="${thumbIndex}">
                <img src="${image.src}" alt="${image.alt}" />
            </button>
        `).join('');

        galleryThumbnails.querySelectorAll('[data-gallery-index]').forEach(button => {
            button.addEventListener('click', () => {
                renderGalleryImage(Number(button.getAttribute('data-gallery-index')));
            });
        });
    }

    function openGallery(card) {
        const rawGallery = card.getAttribute('data-gallery') || '';
        const fallbackTitle = card.querySelector('.portfolio-info h3')?.textContent?.trim() || 'Product';
        const fallbackCaption = card.querySelector('.portfolio-info p')?.textContent?.trim() || '';
        const styles = (card.getAttribute('data-styles') || '').split('|').map(style => style.trim()).filter(Boolean);
        
        galleryStyles.innerHTML = styles.map(style => ` <span>${style}</span>`).join('');

        activeGallery = rawGallery
            .split('|')
            .map(entry => entry.trim())
            .filter(Boolean)
            .map(src => ({
                src,
                alt: fallbackTitle,
                title: fallbackTitle,
                caption: fallbackCaption
            }));

        if (!activeGallery.length) {
            return;
        }

        renderGalleryImage(0);
        galleryModal.classList.add('is-open');
        galleryModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('gallery-open');
    }

    function closeGallery() {
        galleryModal.classList.remove('is-open');
        galleryModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('gallery-open');
    }

    galleryItems.forEach(card => {
        card.classList.add('portfolio-item--clickable');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View images for ${card.querySelector('.portfolio-info h3')?.textContent?.trim() || 'product'}`);

        card.addEventListener('click', event => {
            if (event.target.closest('a, button')) {
                return;
            }

            openGallery(card);
        });

        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openGallery(card);
            }
        });
    });

    viewButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const card = button.closest('.portfolio-item');
            if (card) {
                openGallery(card);
            }
        });
    });

    prevButton.addEventListener('click', () => renderGalleryImage(activeIndex - 1));
    nextButton.addEventListener('click', () => renderGalleryImage(activeIndex + 1));
    closeButtons.forEach(button => button.addEventListener('click', closeGallery));

    document.addEventListener('keydown', event => {
        if (!galleryModal.classList.contains('is-open')) {
            return;
        }

        if (event.key === 'Escape') {
            closeGallery();
        }

        if (event.key === 'ArrowLeft') {
            renderGalleryImage(activeIndex - 1);
        }

        if (event.key === 'ArrowRight') {
            renderGalleryImage(activeIndex + 1);
        }
    });
}

// ====================== CONTACT FORM ======================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

function showMessage(message, type) {
    if (!formMessage) {
        return;
    }

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
            showMessage('Please fill all required fields', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton ? submitButton.textContent : '';

        if (submitButton) {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                contactForm.reset();
                showMessage('Thank you for reaching out! We will contact you soon.', 'success');
            } else {
                showMessage('Failed to send message. Please try again.', 'error');
                console.error(result);
            }
        } catch (error) {
            showMessage('Network error. Please try again.', 'error');
            console.error(error);
        } finally {
            if (submitButton) {
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        }
    });
}

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

const statsSection = document.querySelector('.stats-section');

if (statsSection) {
    const statsObserver = new IntersectionObserver(entries => {
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
document.querySelectorAll('.booking-option .btn').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        const option = button.parentElement.querySelector('h3')?.textContent || 'Booking option';
        alert(`Please contact us to book: ${option}\nEmail: info@fashionbynilu.com\nPhone: +94 718 755 366`);
    });
});

// ====================== SCROLL ANIMATIONS ======================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
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

// ====================== PAGE LOAD ======================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ====================== CONSOLE BRANDING ======================
console.log('%cFashion By Nilu', 'font-size:24px;font-weight:bold;color:#8B4789;');
console.log('%cPremium Custom Tailoring & Bespoke Clothing', 'font-size:14px;color:#666;');
console.log('%cWebsite Created with ❤️', 'font-size:12px;color:#D4A5A5;');
