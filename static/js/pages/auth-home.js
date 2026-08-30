document.addEventListener("DOMContentLoaded", () => {
    setupDropdown(
        "#projects-toggle",
        "#projects-menu",
        ".projects-navigation"
    );

    setupDropdown(
        "#categories-toggle",
        "#categories-menu",
        ".categories-navigation"
    );

    setupDropdown(
        "#user-navigation-toggle",
        "#user-navigation-menu",
        ".user-navigation"
    );

    document
        .querySelector("#user-logout")
        ?.addEventListener("click", () => {
            if (
                window.EgyFundStorage &&
                typeof window.EgyFundStorage
                    .clearCurrentUser === "function"
            ) {
                window.EgyFundStorage.clearCurrentUser();
            }

            localStorage.removeItem(
                "egyfund_current_user"
            );

            localStorage.removeItem("currentUser");
            localStorage.removeItem("user");

            window.location.href = "index.html";
        });

    function setupDropdown(
        toggleSelector,
        menuSelector,
        containerSelector
    ) {
        const toggle = document.querySelector(
            toggleSelector
        );

        const menu = document.querySelector(
            menuSelector
        );

        const container = document.querySelector(
            containerSelector
        );

        if (!toggle || !menu || !container) {
            return;
        }

        toggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const willOpen = menu.hidden;

            closeAllMenus();

            menu.hidden = !willOpen;

            toggle.setAttribute(
                "aria-expanded",
                String(willOpen)
            );

            container.classList.toggle(
                "is-open",
                willOpen
            );
        });
    }

    document.addEventListener("click", () => {
        closeAllMenus();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllMenus();
        }
    });

    function closeAllMenus() {
        document
            .querySelectorAll(
                ".projects-dropdown, " +
                ".categories-dropdown, " +
                ".user-navigation-menu"
            )
            .forEach((menu) => {
                menu.hidden = true;
            });

        document
            .querySelectorAll(
                "#projects-toggle, " +
                "#categories-toggle, " +
                "#user-navigation-toggle"
            )
            .forEach((toggle) => {
                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        document
            .querySelectorAll(
                ".projects-navigation, " +
                ".categories-navigation, " +
                ".user-navigation"
            )
            .forEach((container) => {
                container.classList.remove("is-open");
            });
    }
});