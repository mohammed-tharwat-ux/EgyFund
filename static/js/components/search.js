document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.querySelector(
        "#home-search"
    );

    const searchButton = searchBar?.querySelector(
        ".search-btn"
    );

    if (!searchBar) {
        return;
    }

    function openSearchPage() {
        window.location.href =
            "pages/projects/search.html";
    }

    searchBar.addEventListener("click", (event) => {
        /*
         * نترك أيقونة البحث تعمل كرابط طبيعي.
         */
        if (event.target.closest(".search-btn")) {
            return;
        }

        openSearchPage();
    });

    searchBar.addEventListener("keydown", (event) => {
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            openSearchPage();
        }
    });

    /*
     * منع تحذير المتغير غير المستخدم في بعض الأدوات.
     */
    void searchButton;
});