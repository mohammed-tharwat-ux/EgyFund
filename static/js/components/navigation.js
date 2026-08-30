document.addEventListener("DOMContentLoaded", () => {

    const startProjectLink = document.querySelector(
        '[data-protected-action="create-project"]'
    );

    if (startProjectLink) {
        startProjectLink.addEventListener(
            "click",
            (event) => {
                if (isUserLoggedIn()) {
                    return;
                }

                event.preventDefault();
                openLoginModal();
            }
        );
    }

    // ...existing code...

    const projectsNavigation = document.querySelector(
        ".projects-navigation"
    );

    const projectsToggle = document.querySelector(
        "#projects-toggle"
    );

    const projectsMenu = document.querySelector(
        "#projects-menu"
    );

    if (
        !projectsNavigation ||
        !projectsToggle ||
        !projectsMenu
    ) {
        console.error(
            "Projects menu elements were not found."
        );

        return;
    }

    function openProjectsMenu() {
        projectsMenu.hidden = false;

        projectsToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        projectsNavigation.classList.add("is-open");
    }

    function closeProjectsMenu() {
        projectsMenu.hidden = true;

        projectsToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        projectsNavigation.classList.remove("is-open");
    }

    projectsToggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (projectsMenu.hidden) {
            openProjectsMenu();
        } else {
            closeProjectsMenu();
        }
    });

    projectsMenu
        .querySelectorAll(".project-menu-item")
        .forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId =
                    link.dataset.projectTarget;

                closeProjectsMenu();

                /*
                 * All Projects:
                 * فحص تسجيل الدخول قبل الانتقال.
                 */
                if (targetId === "all-projects") {
                    event.preventDefault();

                    if (isUserLoggedIn()) {
                        window.location.href =
                            "pages/projects/projects.html";
                    } else {
                        openLoginModal();
                    }

                    return;
                }

                /*
                 * الأقسام الموجودة داخل Home.
                 */
                const targetSection =
                    document.getElementById(targetId);

                if (!targetSection) {
                    event.preventDefault();

                    console.error(
                        `Section #${targetId} was not found.`
                    );

                    return;
                }

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                window.history.replaceState(
                    null,
                    "",
                    `#${targetId}`
                );
            });
        });

    /*
     * إغلاق القائمة عند الضغط خارجها.
     */
    document.addEventListener("click", (event) => {
        if (
            !projectsNavigation.contains(event.target) &&
            !projectsMenu.hidden
        ) {
            closeProjectsMenu();
        }
    });

    /*
     * إغلاق القائمة بزر Escape.
     */
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeProjectsMenu();
        }
    });

    function isUserLoggedIn() {
        if (
            window.EgyFundStorage &&
            typeof window.EgyFundStorage
                .getCurrentUser === "function"
        ) {
            return Boolean(
                window.EgyFundStorage.getCurrentUser()
            );
        }

        return false;
    }

    function openLoginModal() {
        const loginModal = document.querySelector(
            "#login-modal"
        );

        if (!loginModal) {
            window.location.href =
                "index.html?login=1";

            return;
        }

        loginModal.hidden = false;

        document.body.classList.add(
            "login-modal-open"
        );

        const emailInput = document.querySelector(
            "#login-email"
        );

        if (emailInput) {
            emailInput.focus();
        }
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const categoriesNavigation = document.querySelector(
        ".categories-navigation"
    );

    const categoriesToggle = document.querySelector(
        "#categories-toggle"
    );

    const categoriesMenu = document.querySelector(
        "#categories-menu"
    );

    if (
        !categoriesNavigation ||
        !categoriesToggle ||
        !categoriesMenu
    ) {
        console.error(
            "Categories menu elements were not found."
        );

        return;
    }

    function openCategoriesMenu() {
        categoriesMenu.hidden = false;

        categoriesToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        categoriesNavigation.classList.add("is-open");
    }

    function closeCategoriesMenu() {
        categoriesMenu.hidden = true;

        categoriesToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        categoriesNavigation.classList.remove(
            "is-open"
        );
    }

    categoriesToggle.addEventListener(
        "click",
        (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (categoriesMenu.hidden) {
                openCategoriesMenu();
            } else {
                closeCategoriesMenu();
            }
        }
    );

    categoriesMenu
        .querySelectorAll("a[data-category]")
        .forEach((link) => {
            link.addEventListener("click", () => {
                closeCategoriesMenu();
            });
        });

    document.addEventListener("click", (event) => {
        if (
            !categoriesNavigation.contains(event.target) &&
            !categoriesMenu.hidden
        ) {
            closeCategoriesMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeCategoriesMenu();
        }
    });
});