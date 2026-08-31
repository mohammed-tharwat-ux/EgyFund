
document.addEventListener("DOMContentLoaded", () => {
    // 1. Dropdowns
    function setupDropdown(toggleId, menuId, wrapperSelector) {
        const toggle = document.getElementById(toggleId);
        const menu = document.getElementById(menuId);
        const wrapper = document.querySelector(wrapperSelector);

        if (!toggle || !menu) return;

        toggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isHidden = menu.hidden;
            
            // Close all other menus first if needed (optional)
            
            if (isHidden) {
                menu.hidden = false;
                toggle.setAttribute("aria-expanded", "true");
                if (wrapper) wrapper.classList.add("is-open");
            } else {
                menu.hidden = true;
                toggle.setAttribute("aria-expanded", "false");
                if (wrapper) wrapper.classList.remove("is-open");
            }
        });

        // Close when clicking outside
        document.addEventListener("click", (e) => {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                menu.hidden = true;
                toggle.setAttribute("aria-expanded", "false");
                if (wrapper) wrapper.classList.remove("is-open");
            }
        });
        
        // Close on Escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                menu.hidden = true;
                toggle.setAttribute("aria-expanded", "false");
                if (wrapper) wrapper.classList.remove("is-open");
            }
        });
    }

    setupDropdown("projects-toggle", "projects-menu", ".projects-navigation");
    setupDropdown("categories-toggle", "categories-menu", ".categories-navigation");
    setupDropdown("user-navigation-toggle", "user-navigation-menu", ".user-navigation");

    // 2. Smooth Scrolling for anchor links (About Us, Top-Rated, etc)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                // Close any open menus
                document.querySelectorAll('.projects-dropdown, .categories-dropdown').forEach(m => m.hidden = true);
                
                // Calculate offset for fixed header
                const headerOffset = document.querySelector('.site-header').offsetHeight || 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
