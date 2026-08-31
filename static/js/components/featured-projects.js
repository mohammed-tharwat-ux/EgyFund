/* filepath: c:\Users\Super-Magic\OneDrive - Faculty Of Specific Education (Kafr Elsheikh University)\Desktop\EgyFond\Front-end\js\components\featured-projects.js */

document.addEventListener("DOMContentLoaded", () => {
    const featuredSection = document.querySelector(
        ".featured-projects-section"
    );

    if (!featuredSection) {
        return;
    }


    const projects = window.FEATURED_PROJECTS || [];


    const categoryElement = featuredSection.querySelector(
        ".featured-project-category"
    );

    const titleElement = featuredSection.querySelector(
        ".featured-project-title"
    );

    const imageElement = featuredSection.querySelector(
        ".featured-project-image"
    );

    const imageLink = featuredSection.querySelector(
        ".featured-project-image-link"
    );

    const previousButton = featuredSection.querySelector(
        ".featured-arrow-prev"
    );

    const nextButton = featuredSection.querySelector(
        ".featured-arrow-next"
    );

    const dotsContainer = featuredSection.querySelector(
        ".featured-project-dots"
    );

    let currentIndex = 0;
    let isChanging = false;

    const preloadedImages = projects.map((project) => {
        const image = new Image();
        image.src = project.image;
        return image;
    });

    projects.forEach((project, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "featured-project-dot";
        dot.setAttribute(
            "aria-label",
            `Show featured project ${index + 1}`
        );
        dot.addEventListener("click", () => {
            showProject(index);
        });

        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(
        ".featured-project-dot"
    );

    function showProject(index) {
        if (isChanging) {
            return;
        }

        isChanging = true;
        currentIndex = (index + projects.length) % projects.length;

        const project = projects[currentIndex];

        categoryElement.textContent = project.category;
        titleElement.textContent = project.title;
        imageElement.src = project.image;
        imageElement.alt = project.alt;
        imageLink.href = project.details;

        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === currentIndex;

            dot.classList.toggle("active", isActive);

            if (isActive) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });

        window.setTimeout(() => {
            isChanging = false;
        }, 250);
    }

    previousButton.addEventListener("click", () => {
        showProject(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showProject(currentIndex + 1);
    });

    showProject(0);
});