document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(
        "#forgot-password-form"
    );

    const emailInput = document.querySelector(
        "#forgot-email"
    );

    const errorElement = document.querySelector(
        '[data-error-for="forgot-email"]'
    );

    const messageElement = document.querySelector(
        "#forgot-password-message"
    );

    const submitButton = form.querySelector(
        "button[type='submit']"
    );

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        clearState();

        const email = emailInput.value
            .trim()
            .toLowerCase();

        if (!email || !emailInput.validity.valid) {
            emailInput.classList.add("input-error");
            errorElement.textContent =
                "Enter a valid email address.";

            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
            await window.EgyFundAuthApi
                .requestPasswordReset(email);

            /*
             * هذه الرسالة لا تكشف هل الإيميل موجود أم لا.
             * هذا هو السلوك الأمني الصحيح.
             */
            showMessage(
                "If an account exists for this email, " +
                "a password reset link has been sent.",
                "success"
            );

            emailInput.disabled = true;
            submitButton.textContent = "Email Sent";
        } catch (error) {
            showMessage(
                error.message ||
                "Unable to process your request.",
                "error"
            );

            submitButton.disabled = false;
            submitButton.textContent = "Send";
        }
    });

    function clearState() {
        emailInput.classList.remove("input-error");
        errorElement.textContent = "";
        messageElement.textContent = "";
        messageElement.className = "register-message";
    }

    function showMessage(text, type) {
        messageElement.textContent = text;
        messageElement.className =
            `register-message ${type}`;
    }
});