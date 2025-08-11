document.addEventListener('DOMContentLoaded', function () {
    // ✅ Initialize EmailJS (public key from your dashboard)
    emailjs.init("d2GucmwuX4lWT1Lyr"); // Replace with your actual public key

    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('form-message');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Show loading
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;

        // Gather form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Send email
        emailjs.send('service_ky0uw4i', 'template_d69xmvb', formData)
            .then(() => {
                formMessage.textContent = '✅ Message sent successfully!';
                formMessage.className = 'success';
                formMessage.style.display = 'block';
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Email send error:', error);
                formMessage.textContent = '❌ Failed to send message. Please try again later.';
                formMessage.className = 'error';
                formMessage.style.display = 'block';
            })
            .finally(() => {
                // Reset button
                btnText.style.display = 'inline-flex';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            });
    });
});
