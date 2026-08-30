// filepath: c:\Users\Super-Magic\OneDrive - Faculty Of Specific Education (Kafr Elsheikh University)\Desktop\EgyFond\Front-end\js\pages\activate.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#activation-form");
    const codeInput = document.querySelector("#activation-code");
    const emailElement = document.querySelector("#user-email");
    const messageElement = document.querySelector(
        "#activation-message"
    );
    const errorElement = document.querySelector(
        '[data-error-for="activation-code"]'
    );
    const resendButton = document.querySelector(
        "#resend-code"
    );

    if (
        !form ||
        !codeInput ||
        !emailElement ||
        !messageElement
    ) {
        console.error(
            "Activation page elements are missing."
        );

        return;
    }

    const email = sessionStorage.getItem(
        "egyfund_activation_email"
    );

    if (!email) {
        showMessage(
            "No pending activation was found.",
            "error"
        );

        return;
    }

    emailElement.textContent = email;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const code = codeInput.value.trim();
        const submitButton = form.querySelector(
            "button[type='submit']"
        );

        clearError();

        if (!/^\d{6}$/.test(code)) {
            errorElement.textContent =
                "Enter a valid 6-digit code.";

            codeInput.classList.add("input-error");

            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Verifying...";

        try {
            await window.EgyFundAuthApi.activateAccount(
                email,
                code
            );

            sessionStorage.removeItem(
                "egyfund_activation_email"
            );

            /*
             * يجعل زر الهيدر يظهر Login
             * بدل Sign up بعد إتمام التسجيل.
             */
            sessionStorage.setItem(
                "egyfund_registration_started",
                "true"
            );

            showMessage(
                "Your account has been activated successfully.",
                "success"
            );

            setTimeout(() => {
                window.location.href =
                    "../../index.html?login=1";
            }, 1000);
        } catch (error) {
            showMessage(
                error.message || "Activation failed.",
                "error"
            );

            submitButton.disabled = false;
            submitButton.textContent = "Continue";
        }
    });

    if (resendButton) {
        resendButton.addEventListener(
            "click",
            async () => {
                resendButton.disabled = true;
                resendButton.textContent = "Sending...";

                try {
                    const result =
                        await window.EgyFundAuthApi
                            .resendActivationCode(email);

                    showMessage(
                        result.message ||
                        "A new code has been sent.",
                        "success"
                    );
                } catch (error) {
                    showMessage(
                        error.message ||
                        "Could not resend the code.",
                        "error"
                    );
                } finally {
                    resendButton.disabled = false;
                    resendButton.textContent = "Resend";
                }
            }
        );
    }

    function clearError() {
        errorElement.textContent = "";
        codeInput.classList.remove("input-error");
        messageElement.textContent = "";
        messageElement.className = "register-message";
    }

    function showMessage(text, type) {
        messageElement.textContent = text;
        messageElement.className =
            `register-message ${type}`;
    }
});