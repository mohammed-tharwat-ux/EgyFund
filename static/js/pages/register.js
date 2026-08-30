document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#register-form");

    if (!form) {
        return;
    }

    const firstName = document.querySelector("#first-name");
    const lastName = document.querySelector("#last-name");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirm-password");
    const message = document.querySelector("#register-message");
    const submitButton = form.querySelector(".register-button");

    function getErrorElement(field) {
        return document.querySelector(
            `[data-error-for="${field.id}"]`
        );
    }

    function setError(field, errorText) {
        const errorElement = getErrorElement(field);

        field.classList.toggle(
            "input-error",
            Boolean(errorText)
        );

        if (errorElement) {
            errorElement.textContent = errorText;
        }
    }

    function showMessage(text, type) {
        message.textContent = text;
        message.className = `register-message ${type}`;
    }

    function clearErrors() {
        [
            firstName,
            lastName,
            email,
            phone,
            password,
            confirmPassword
        ].forEach((field) => {
            setError(field, "");
        });

        message.textContent = "";
        message.className = "register-message";
    }

    function isValidEgyptianPhone(value) {
        const normalizedPhone = value
            .trim()
            .replace(/[\s()-]/g, "");

        return /^(01[0125]\d{8}|(\+20|0020)1[0125]\d{8})$/
            .test(normalizedPhone);
    }

    function validateForm() {
        let isValid = true;

        if (firstName.value.trim().length < 2) {
            setError(firstName, "Enter your first name.");
            isValid = false;
        }

        if (lastName.value.trim().length < 2) {
            setError(lastName, "Enter your last name.");
            isValid = false;
        }

        if (
            !email.validity.valid ||
            email.value.trim() === ""
        ) {
            setError(email, "Enter a valid email address.");
            isValid = false;
        }

        if (!isValidEgyptianPhone(phone.value)) {
            setError(
                phone,
                "Enter a valid Egyptian mobile number."
            );
            isValid = false;
        }

        if (password.value.length < 8) {
            setError(
                password,
                "Password must be at least 8 characters."
            );
            isValid = false;
        }

        if (confirmPassword.value !== password.value) {
            setError(
                confirmPassword,
                "Passwords do not match."
            );
            isValid = false;
        }

        return isValid;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearErrors();

        if (!validateForm()) {
            showMessage(
                "Please correct the highlighted fields.",
                "error"
            );
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Creating Account...";

        const userData = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim().toLowerCase(),
            phone: phone.value.trim(),

            /*
             * كلمة المرور ترسل للـ Backend عبر HTTPS.
             * لا نحفظها في localStorage أو sessionStorage.
             */
            password: password.value
        };

        try {
            const result =
                await window.EgyFundAuthApi.register(userData);

            sessionStorage.setItem(
                "egyfund_activation_email",
                result.email
            );

            // ...existing code...

            sessionStorage.setItem(
                "egyfund_registration_completed",
                "true"
            );

            sessionStorage.setItem(
                "egyfund_activation_email",
                result.email
            );

            window.location.href = "activate.html";

            // ...existing code...


            window.location.href = "activate.html";
        } catch (error) {
            showMessage(
                error.message || "Something went wrong.",
                "error"
            );

            submitButton.disabled = false;
            submitButton.textContent = "Sign Up";
        }
    });
});