document.addEventListener("DOMContentLoaded", function () {

    /* ── Helpers ─────────────────────────────────────────────────── */

    function openMenu(toggle, menu, wrapper) {
        menu.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        if (wrapper) wrapper.classList.add("is-open");
    }

    function closeMenu(toggle, menu, wrapper) {
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        if (wrapper) wrapper.classList.remove("is-open");
    }

    function wireDropdown(toggleId, menuId, wrapperId) {
        var toggle  = document.getElementById(toggleId);
        var menu    = document.getElementById(menuId);
        var wrapper = wrapperId ? document.querySelector(wrapperId) : null;

        if (!toggle || !menu) return;

        /* Open / close on button click */
        toggle.addEventListener("click", function (e) {
            e.stopPropagation();
            if (menu.hidden) {
                openMenu(toggle, menu, wrapper);
            } else {
                closeMenu(toggle, menu, wrapper);
            }
        });

        /* Close when a link inside the menu is clicked */
        menu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                closeMenu(toggle, menu, wrapper);
            });
        });

        /* Close on outside click */
        document.addEventListener("click", function (e) {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                closeMenu(toggle, menu, wrapper);
            }
        });

        /* Close on Escape */
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                closeMenu(toggle, menu, wrapper);
                toggle.focus();
            }
        });
    }

    /* ── Wire each dropdown ──────────────────────────────────────── */

    wireDropdown(
        "projects-toggle",
        "projects-menu",
        ".projects-navigation"
    );

    wireDropdown(
        "categories-toggle",
        "categories-menu",
        ".categories-navigation"
    );

    wireDropdown(
        "user-navigation-toggle",
        "user-navigation-menu",
        ".user-navigation"
    );

});