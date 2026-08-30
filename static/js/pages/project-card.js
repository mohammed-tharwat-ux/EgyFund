function createProjectCard(project) {
    return `
        <article class="project-card catalog-card">
            <a href="project-details.html?id=${project.id}"
               class="project-card-link">

                <div class="project-image-wrapper">
                    <img src="../../assets/images/${project.image}"
                         alt="${project.title}"
                         class="project-image">
                </div>

                <div class="project-content">
                    <div class="project-meta">
                        <span class="project-category">
                            ${project.categoryLabel}
                        </span>

                        <button type="button"
                                class="project-favorite"
                                data-project-id="${project.id}"
                                aria-label="Add project to favorites"
                                aria-pressed="false">
                            <span class="favorite-count">
                                ${project.backers}
                            </span>

                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>

                    <h2 class="project-title">${project.title}</h2>

                    <p class="project-description">
                        ${project.description}
                    </p>

                    <p class="project-amount">${project.amount}</p>

                    <div class="project-progress">
                        <span style="width: ${project.funded}%"></span>
                    </div>

                    <div class="project-footer">
                        <strong>${project.funded}% funded</strong>
                        <span>${project.days}</span>
                    </div>
                </div>
            </a>
        </article>
    `;
}

function activateFavorites() {
    const savedFavorites = JSON.parse(
        localStorage.getItem("egyfund-favorites") || "[]"
    );

    document.querySelectorAll(".project-favorite").forEach(button => {
        const projectId = button.dataset.projectId;

        if (savedFavorites.includes(projectId)) {
            button.classList.add("is-favorite");
            button.setAttribute("aria-pressed", "true");
        }

        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const favorites = JSON.parse(
                localStorage.getItem("egyfund-favorites") || "[]"
            );

            const index = favorites.indexOf(projectId);

            if (index === -1) {
                favorites.push(projectId);
                button.classList.add("is-favorite");
                button.setAttribute("aria-pressed", "true");
            } else {
                favorites.splice(index, 1);
                button.classList.remove("is-favorite");
                button.setAttribute("aria-pressed", "false");
            }

            localStorage.setItem(
                "egyfund-favorites",
                JSON.stringify(favorites)
            );
        });
    });
}