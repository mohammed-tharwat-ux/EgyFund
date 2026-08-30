document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector("#project-details-content");

    if (!content) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("id");
    const project = PROJECTS.find(item => item.id === projectId);

    if (!project) {
        content.innerHTML = `
            <section class="project-not-found">
                <h1>Project not found</h1>
                <a href="all-projects.html">Back to All Projects</a>
            </section>
        `;
        return;
    }

    const categoryName =
        CATEGORY_NAMES[project.category] || project.category;

    const similarProjects = PROJECTS
        .filter(item =>
            item.category === project.category &&
            item.id !== project.id
        )
        .slice(0, 3);

    const daysLeft = project.days.split(" ")[0];

    content.innerHTML = `
        <section class="details-section">
            <div class="details-container">

                <div class="details-meta">
                    <span>${project.categoryLabel}</span>
                    <b>By EgyFund</b>
                </div>

                <h1 class="details-title">${project.title}</h1>

                <div class="details-cover">
                    <img src="../../assets/images/${project.image}"
                        alt="${project.title}">
                    <div class="cover-dots" aria-hidden="true">
                        ● ● ● ●
                    </div>
                </div>

                <div class="details-layout">

                    <article class="project-story">
                        <div class="story-tags">
                            ${project.tags || ""}
                        </div>

                        <h2>About the Project</h2>

                        <p>${project.description}</p>

                        <p>
                            Your support helps this project reach the people
                            who need it and turn the idea into a useful,
                            sustainable result.
                        </p>

                        <p>
                            Every contribution helps the project move closer
                            to its funding goal.
                        </p>

                        <div class="project-dates">
                            <span>
                                Start Date:
                                <b>Aug 1, 2026</b>
                            </span>

                            <span>
                                End Date:
                                <b>Sep 15, 2026</b>
                            </span>
                        </div>
                    </article>

                    <aside class="funding-card">
                        <h2>${project.amount}</h2>

                        <p>
                            pledged of
                            <b>EGP 250000</b> target
                        </p>

                        <div class="funding-progress">
                            <span style="width: ${project.funded}%"></span>
                        </div>

                        <strong>${project.funded}% Funded</strong>

                        <div class="funding-stats">
                            <span>
                                <b>${project.backers}</b>
                                Backers
                            </span>

                            <span>
                                <b>${daysLeft}</b>
                                Days Left
                            </span>
                        </div>

                        <input
                            type="number"
                            min="1"
                            value="500"
                            aria-label="Donation amount">

                        <button type="button" class="donate-button">
                            Donate Now
                        </button>

                        <p class="donate-message" aria-live="polite"></p>

                        <a href="#" class="report-link">
                            ⚑ Report This Project
                        </a>
                    </aside>

                </div>
            </div>
        </section>

        <section class="comments-section">
            <div class="details-container">
                <h2>Comments (24)</h2>

                <form class="comment-box">
                    <textarea
                        required
                        placeholder="Ask a question or share your thoughts with the creator..."
                    ></textarea>

                    <button type="submit">Post Comment</button>
                </form>

                <div class="comment-list">
                    <article class="comment">
                        <b>Sarah Jenkins</b>
                        <small>2 hours ago</small>
                        <p>
                            I've been looking for a project that supports
                            a real community need. Backed!
                        </p>
                    </article>

                    <article class="comment">
                        <b>Tarek El-Masry</b>
                        <small>5 hours ago</small>
                        <p>
                            This project can make a real difference.
                            Great work!
                        </p>
                    </article>
                </div>
            </div>
        </section>

        <section class="similar-section">
            <div class="details-container">
                <h2>Similar Projects</h2>
                <p>You might also be interested in</p>

                <div class="similar-grid">
                    ${similarProjects
            .map(createSimilarProjectCard)
            .join("")
        }
                </div>
            </div>
        </section>
    `;

    setupDonation();
    setupComments();
});

function createSimilarProjectCard(project) {
    return `
        <article class="similar-card">
            <a href="project-details.html?id=${project.id}">
                <img
                    src="../../assets/images/${project.image}"
                    alt="${project.title}">

                <div class="similar-card-content">
                    <div class="similar-card-meta">
                        <span>${project.categoryLabel}</span>
                        <b>${project.backers} ♡</b>
                    </div>

                    <h3>${project.title}</h3>

                    <p>${project.description}</p>

                    <div class="project-progress">
                        <span style="width: ${project.funded}%"></span>
                    </div>

                    <div class="similar-card-footer">
                        <strong>${project.funded}% funded</strong>
                        <span>${project.days}</span>
                    </div>
                </div>
            </a>
        </article>
    `;
}

function setupDonation() {
    const donateButton = document.querySelector(".donate-button");
    const donationInput = document.querySelector(
        ".funding-card input"
    );
    const message = document.querySelector(".donate-message");

    if (!donateButton || !donationInput || !message) {
        return;
    }

    donateButton.addEventListener("click", () => {
        const amount = Number(donationInput.value);

        if (!amount || amount < 1) {
            message.textContent = "Enter a valid amount.";
            message.classList.add("is-error");
            return;
        }

        message.classList.remove("is-error");
        message.textContent =
            "Thank you for supporting this project.";
    });
}

function setupComments() {
    const form = document.querySelector(".comment-box");

    if (!form) {
        return;
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        const textarea = form.querySelector("textarea");

        if (!textarea.value.trim()) {
            return;
        }

        textarea.value = "";
        alert("Your comment has been posted.");
    });
}