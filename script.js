const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {

    contactForm.addEventListener('submit', async function (e) {

        e.preventDefault();

        formMessage.textContent = 'Sending...';
        formMessage.style.color = '#8B4789';

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

                formMessage.textContent =
                    'Thank you! Your message has been sent successfully.';

                formMessage.style.color = 'green';

                contactForm.reset();

            } else {

                formMessage.textContent =
                    'Failed to send message. Please try again.';

                formMessage.style.color = 'red';

                console.error(result);
            }

        } catch (error) {

            formMessage.textContent =
                'Network error. Please try again.';

            formMessage.style.color = 'red';

            console.error(error);
        }
    });
}