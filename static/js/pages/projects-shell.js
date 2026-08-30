document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("[data-site-header]");
    const footer = document.querySelector("[data-site-footer]");

    if (header) {
        header.innerHTML = `
            <header class="site-header">
                <div class="container header-container">
                    <div class="logo">
                        <a href="../../home-auth.html" aria-label="EgyFund Home">
                            <img src="../../assets/icons/logo_transparent.svg"
                                 alt="" class="logo-img-icon">
                            <img src="../../assets/icons/gyFund_logo.svg"
                                 alt="EgyFund" class="logo-img-text">
                        </a>
                    </div>

                    <nav class="main-navigation" aria-label="Main navigation">
                        <div class="projects-navigation">
                            <button type="button"
                                    class="nav-link projects-toggle"
                                    id="projects-toggle"
                                    aria-expanded="false"
                                    aria-controls="projects-menu">
                                Projects <span class="projects-arrow">▾</span>
                            </button>

                            <div id="projects-menu" class="projects-dropdown" hidden>
                                <a href="all-projects.html">All Projects</a>
                                <a href="all-projects.html#top-rated-projects">
                                    Top-Rated Active Projects
                                </a>
                                <a href="all-projects.html#recent-projects">
                                    Recently Added Projects
                                </a>
                                <a href="all-projects.html#featured-projects">
                                    Featured Projects
                                </a>
                            </div>
                        </div>

                        <div class="categories-navigation">
                            <button type="button"
                                    class="nav-link categories-toggle"
                                    id="categories-toggle"
                                    aria-expanded="false"
                                    aria-controls="categories-menu">
                                Categories <span class="categories-arrow">▾</span>
                            </button>

                            <div id="categories-menu"
                                 class="categories-dropdown"
                                 hidden>
                                <div class="categories-dropdown-content">
                                    ${Object.entries(CATEGORY_NAMES).map(([key, name]) => `
                                        <a href="category.html?category=${key}">
                                            ${name}
                                        </a>
                                    `).join("")}
                                </div>
                            </div>
                        </div>
                    </nav>

                    <div class="search-bar" id="home-search">
                        <input type="search"
                               placeholder="Try searching titles and tags"
                               aria-label="Search projects">
                        <a href="all-projects.html" class="search-btn"
                           aria-label="Search projects">⌕</a>
                    </div>

                    <div class="user-navigation">
                        <button type="button"
                                class="user-navigation-toggle"
                                id="user-navigation-toggle"
                                aria-expanded="false"
                                aria-controls="user-navigation-menu">
                            <span class="user-avatar">
                                <img src="../../assets/icons/profile-icon-white-bg.svg"
                                     alt="User profile">
                            </span>
                            <span class="user-name">User_Name</span>
                            <span class="user-chevron">‹</span>
                        </button>

                        <div class="user-navigation-menu"
                             id="user-navigation-menu"
                             hidden>
                            <a href="all-projects.html" class="user-menu-item">
                                <span class="user-menu-text">All Projects</span>
                            </a>
                            <a href="../profile/profile.html" class="user-menu-item">
                                <span class="user-menu-text">My Profile</span>
                            </a>
                            <a href="../funding/go-fund.html" class="user-menu-item">
                                <span class="user-menu-text">Go Fund</span>
                            </a>
                            <a href="../ai/ask-ai.html" class="user-menu-item">
                                <span class="user-menu-text">Ask AI</span>
                            </a>
                            <div class="user-menu-divider"></div>
                            <button type="button"
                                    class="user-menu-item user-logout">
                                <span class="user-menu-text">Log out</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="header-border"></div>
            </header>
        `;
    }

    if (footer) {
        footer.innerHTML = `
            <footer class="site-footer">
                <div class="footer-container">
                    <div class="footer-brand">
                        <div class="logo">
                            <a href="../../home-auth.html">
                                <img src="../../assets/icons/logo_transparent.svg"
                                     alt="" class="logo-img-icon">
                                <img src="../../assets/icons/gyFund_logo.svg"
                                     alt="EgyFund" class="logo-img-text">
                            </a>
                        </div>
                        <p class="footer-description">
                            EgyFund is a crowdfunding platform built for Egypt,
                            bringing people and ideas together to turn dreams
                            into real projects.
                        </p>
                    </div>

                    <nav class="footer-links" aria-label="Footer navigation">
                        <div class="footer-links-column">
                            <a href="../trust-safety.html">Trust &amp; Safety</a>
                            <a href="../help-center.html">Help Center</a>
                        </div>
                        <div class="footer-links-column">
                            <a href="../terms.html">Terms of Use</a>
                            <a href="../privacy.html">Privacy Policy</a>
                            <a href="../cookies.html">Cookie Policy</a>
                        </div>
                    </nav>
                </div>

                <div class="footer-bottom">
                    <p>© 2026 EgyFund. All rights reserved.
                        Together, we fund the future.</p>
                </div>
            </footer>
        `;
    }
});