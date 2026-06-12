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

                formMessage.className = "form-message success";

            } else {

                formMessage.textContent =
                    "Failed to send message. Please try again.";

                formMessage.className = "form-message error";

                console.error(result);
            }

        } catch (error) {

            formMessage.textContent =
                "Network error. Please try again.";

            formMessage.className = "form-message error";

            console.error(error);
        }
    });
}