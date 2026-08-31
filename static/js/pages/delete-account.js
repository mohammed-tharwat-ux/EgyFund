document.addEventListener("DOMContentLoaded", () => {
    const passwordForm = document.querySelector("#delete-password-form");
    const passwordStep = document.querySelector("#delete-step-password");
    const confirmStep = document.querySelector("#delete-step-confirm");
    const continueButton = document.querySelector(
        "#continue-delete-button"
    );

    passwordForm.addEventListener("submit", event => {
        event.preventDefault();

        if (!passwordForm.checkValidity()) {
            passwordForm.reportValidity();
            return;
        }

        passwordStep.hidden = true;
        confirmStep.hidden = false;
    });

    continueButton.addEventListener("click", () => {
        localStorage.removeItem("egyfund-campaign-draft");
        localStorage.removeItem("egyfund-favorites");

        window.location.href = "/";
    });
});