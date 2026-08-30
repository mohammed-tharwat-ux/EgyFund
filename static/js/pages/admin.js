document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll("[data-tab]");
    const tabLinks = document.querySelectorAll("[data-tab-link]");
    const showTabButtons = document.querySelectorAll("[data-show-tab]");

    function showTab(tabName) {
        tabs.forEach((tab) => {
            const isActive = tab.dataset.tab === tabName;

            tab.classList.toggle("active-tab", isActive);
            tab.hidden = !isActive;
        });

        tabLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.dataset.tabLink === tabName
            );
        });

        window.history.replaceState(null, "", `#${tabName}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function getInitialTab() {
        const requestedTab = window.location.hash.replace("#", "");

        const validTab = [...tabs].some(
            (tab) => tab.dataset.tab === requestedTab
        );

        return validTab ? requestedTab : "dashboard";
    }

    tabLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            showTab(link.dataset.tabLink);
        });
    });

    showTabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            showTab(button.dataset.showTab);
        });
    });

    window.addEventListener("hashchange", () => {
        showTab(getInitialTab());
    });

    const categoryForm = document.querySelector("#category-form");

    categoryForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        alert("Category saved successfully.");

        showTab("categories");
    });

    const globalSearch = document.querySelector("#admin-global-search");
    const searchButton = document.querySelector("#global-search-button");

    function runSearch() {
        const value = globalSearch.value.trim().toLowerCase();

        if (!value) {
            return;
        }

        const searchableRows = document.querySelectorAll(
            ".admin-table tbody tr"
        );

        searchableRows.forEach((row) => {
            row.hidden = !row.textContent.toLowerCase().includes(value);
        });
    }

    searchButton?.addEventListener("click", runSearch);

    globalSearch?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            runSearch();
        }
    });
});