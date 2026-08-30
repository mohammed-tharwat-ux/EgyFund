document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".profile-tab");
    const panels = document.querySelectorAll(".profile-panel");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const panelId = tab.dataset.tab;

            tabs.forEach(item => {
                const isActive = item === tab;

                item.classList.toggle("is-active", isActive);
                item.setAttribute("aria-selected", String(isActive));
            });

            panels.forEach(panel => {
                const isActive = panel.id === panelId;

                panel.hidden = !isActive;
                panel.classList.toggle("is-active", isActive);
            });

            window.history.replaceState(
                null,
                "",
                `#${panelId}`
            );
        });
    });

    const initialPanel = window.location.hash.replace("#", "");

    if (initialPanel) {
        const initialTab = document.querySelector(
            `[data-tab="${initialPanel}"]`
        );

        if (initialTab) {
            initialTab.click();
        }
    }

    const editForm = document.querySelector(".edit-profile-form");

    if (editForm) {
        editForm.addEventListener("submit", event => {
            event.preventDefault();

            const message = editForm.querySelector(".edit-message");

            if (message) {
                message.textContent = "Changes saved successfully.";
            }
        });
    }

    const uploadInput = document.querySelector("#profile-picture");
    const profileImage = document.querySelector("#profile-preview");

    if (uploadInput && profileImage) {
        uploadInput.addEventListener("change", () => {
            const file = uploadInput.files[0];

            if (!file) {
                return;
            }

            const reader = new FileReader();

            reader.addEventListener("load", () => {
                profileImage.src = reader.result;
            });

            reader.readAsDataURL(file);
        });
    }
});