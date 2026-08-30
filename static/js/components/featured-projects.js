/* filepath: c:\Users\Super-Magic\OneDrive - Faculty Of Specific Education (Kafr Elsheikh University)\Desktop\EgyFond\Front-end\js\components\featured-projects.js */

document.addEventListener("DOMContentLoaded", () => {
    const featuredSection = document.querySelector(
        ".featured-projects-section"
    );

    if (!featuredSection) {
        return;
    }


    const projects = [
        {
            category: "MEDICAL",
            title: "Custom 3D-printed prosthetic legs and arms for children who have lost limbs — affordable, lightweight, and made to grow with them.",
            image: "assets/images/tumblr_m4ffrbSoiu1qjpfe3o1_1280.png",
            alt: "Custom 3D-printed prosthetic legs",
            details: "pages/projects/project-details.html?id=prosthetic-legs"
        },

        {
            category: "MEDICAL",
            title: "Essential medical and wound-care supplies for patients receiving treatment at home — funding helps keep this shelf stocked for those who depend on it.",
            image: "assets/images/ACTIVATE-3.jpg",
            alt: "Mobile library for rural children",
            details: "pages/projects/project-details.html?id=mobile-library"
        },

        {
            category: "EDUCATION",
            title: "A scholarship fund to cover tuition and books for students who can't afford to continue their education",
            image: "assets/images/1363284-scholarships - Copy.webp",
            alt: "Healthcare support project",
            details: "pages/projects/project-details.html?id=health-care"
        },

        {
            category: "GREEA TECH",
            title: "Bringing safe drinking water systems to villages in Upper Egypt that still struggle with unclean water sources.",
            image: "assets/images/an-egyptian-farm-irrigation-system-to-channel-water-from-the-river-nile-to-sugar-cane-plantations-in-rural-upper-egypt-2R217.jpg",
            alt: "Animal welfare project",
            details: "pages/projects/project-details.html?id=animal-care"
        },

        {
            category: "ORPHAN",
            title: "Supporting shelter and schooling for orphaned children across Egypt, giving them a real chance at a stable future.",
            image: 'assets/images/IMG_2401.jpg',
            alt: "Green technology project",
            details: "pages/projects/project-details.html?id=green-tech",
        }
    ];


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