document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector("#category-content");

    if (!content) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const categoryKey = params.get("category") || "education";
    const categoryName = CATEGORY_NAMES[categoryKey] || categoryKey;
    const categoryProjects = PROJECTS.filter(
        project => project.category === categoryKey
    );

    content.innerHTML = `
        <section class="category-section">
            <div class="category-container">

                <div class="category-heading">
                    <h1>${categoryName}</h1>
                    <span></span>
                </div>

                <div class="catalog-grid">
                    ${categoryProjects.length
            ? categoryProjects
                .map(createProjectCard)
                .join("")
            : `
                                <p class="empty-category">
                                    No projects available in this category.
                                </p>
                            `
        }
                </div>

            </div>
        </section>
    `;

    if (typeof activateFavorites === "function") {
        activateFavorites();
    }
});