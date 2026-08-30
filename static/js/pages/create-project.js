document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#campaign-form");
    const mediaInput = document.querySelector("#campaign-media");
    const previewList = document.querySelector("#image-preview-list");
    const message = document.querySelector("#form-message");
    const draftButton = document.querySelector("#save-draft-button");

    let selectedFiles = [];

    mediaInput.addEventListener("change", () => {
        const newFiles = Array.from(mediaInput.files);

        selectedFiles = [...selectedFiles, ...newFiles]
            .filter((file, index, files) =>
                files.findIndex(item =>
                    item.name === file.name &&
                    item.size === file.size
                ) === index
            )
            .slice(0, 5);

        renderPreviews();
        mediaInput.value = "";
    });

    function renderPreviews() {
        previewList.innerHTML = "";

        selectedFiles.forEach((file, index) => {
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                const preview = document.createElement("div");
                preview.className = "image-preview";

                preview.innerHTML = `
                    <img src="${reader.result}" alt="">
                    <button
                        type="button"
                        class="remove-image"
                        aria-label="Remove image">
                        ×
                    </button>
                `;

                preview
                    .querySelector(".remove-image")
                    .addEventListener("click", () => {
                        selectedFiles.splice(index, 1);
                        renderPreviews();
                    });

                previewList.appendChild(preview);
            });

            reader.readAsDataURL(file);
        });
    }

    draftButton.addEventListener("click", () => {
        const formData = new FormData(form);
        const draft = Object.fromEntries(formData.entries());

        draft.mediaCount = selectedFiles.length;

        localStorage.setItem(
            "egyfund-campaign-draft",
            JSON.stringify(draft)
        );

        showMessage("Campaign saved as draft.");
    });

    form.addEventListener("submit", event => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (!selectedFiles.length) {
            showMessage("Please upload at least one image.", true);
            return;
        }

        const startDate = new Date(
            document.querySelector("#start-date").value
        );

        const endDate = new Date(
            document.querySelector("#end-date").value
        );

        if (endDate <= startDate) {
            showMessage(
                "The end date must be after the start date.",
                true
            );
            return;
        }

        const campaign = {
            title: document.querySelector("#campaign-title").value.trim(),
            category: document.querySelector("#campaign-category").value,
            tags: document.querySelector("#campaign-tags").value.trim(),
            description: document.querySelector("#campaign-description").value.trim(),
            amount: document.querySelector("#target-amount").value,
            startDate: document.querySelector("#start-date").value,
            endDate: document.querySelector("#end-date").value,
            mediaCount: selectedFiles.length
        };

        localStorage.setItem(
            "egyfund-campaign-draft",
            JSON.stringify(campaign)
        );

        showMessage("Campaign details are ready to be launched.");
    });

    function showMessage(text, isError = false) {
        message.textContent = text;
        message.classList.toggle("is-error", isError);
    }
});