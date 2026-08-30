document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector("#all-projects-content");

    if (!content) {
        return;
    }

    const categories = [
        "education",
        "health-care",
        "animal-welfare",
        "green-tech",
        "handicrafts",
        "agriculture",
        "medical"
    ];

    content.innerHTML = categories.map(category => {
        const projects = PROJECTS.filter(
            project => project.category === category
        );

        if (!projects.length) {
            return "";
        }

        return `
            <section class="catalog-section">
                <div class="catalog-container">

                    <div class="catalog-heading">
                        <h1>${CATEGORY_NAMES[category]}</h1>
                        <span></span>
                    </div>

                    <div class="catalog-grid">
                        ${projects.map(createProjectCard).join("")}
                    </div>

                </div>
            </section>
        `;
    }).join("");

    activateFavorites();
});