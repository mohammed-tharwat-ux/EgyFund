/* filepath: c:\Users\Super-Magic\OneDrive - Faculty Of Specific Education (Kafr Elsheikh University)\Desktop\EgyFond\Front-end\js\pages\home.js */

// =========================
// Homepage Project Favorites
// =========================

document.addEventListener("DOMContentLoaded", () => {
    const favoriteButtons = document.querySelectorAll(".project-favorite");

    favoriteButtons.forEach((favoriteButton) => {
        const favoriteCount =
            favoriteButton.querySelector(".favorite-count");

        if (!favoriteCount) {
            return;
        }

        favoriteButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            const isFavorite =
                favoriteButton.classList.toggle("is-favorite");

            const currentCount =
                Number(favoriteCount.textContent) || 0;

            const updatedCount = isFavorite
                ? currentCount + 1
                : Math.max(0, currentCount - 1);

            favoriteCount.textContent = updatedCount;

            favoriteButton.setAttribute(
                "aria-pressed",
                String(isFavorite)
            );

            favoriteButton.setAttribute(
                "aria-label",
                isFavorite
                    ? "Remove project from favorites"
                    : "Add project to favorites"
            );
        });
    });
});