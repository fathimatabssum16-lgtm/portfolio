
document.addEventListener("DOMContentLoaded", () => {

    // 1. MOBILE HAMBURGER MENU

    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".middle-section");
    const navLinks = document.querySelectorAll(".nav-link");

    menuButton.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // 2. TYPING ANIMATION

    const typedRole = document.getElementById("typed-role");

    const roles = [
        "Web Developer",
        "Frontend Developer",
        "Creative Problem Solver"
    ];

    let roleIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function typeRole() {

        const current = roles[roleIndex];

        typedRole.textContent = current.slice(0, letterIndex);

        if (!deleting && letterIndex < current.length) {

            letterIndex++;

            setTimeout(typeRole, 95);

        }

        else if (deleting && letterIndex > 0) {

            letterIndex--;

            setTimeout(typeRole, 45);

        }

        else {

            deleting = !deleting;

            if (!deleting) {

                roleIndex = (roleIndex + 1) % roles.length;

            }

            setTimeout(typeRole, deleting ? 1200 : 250);

        }

    }

    typeRole();


    // 3. PROJECT FILTERING

    const filterButtons = document.querySelectorAll(".filter-btn");

    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter = button.dataset.filter;

            filterButtons.forEach(item => {

                item.classList.toggle("active", item === button);

            });

            projectCards.forEach(card => {

                card.classList.toggle(
                    "hidden",
                    filter !== "all" &&
                    card.dataset.category !== filter
                );

            });

        });

    });


    // 4. CONTACT FORM VALIDATION

    const form = document.getElementById("contact-form");

    const formNote = document.getElementById("form-note");

    form.addEventListener("submit", event => {

        event.preventDefault();

        if (!form.reportValidity()) return;

        const name = document.getElementById("visitor-name").value.trim();

        const email = document.getElementById("visitor-email").value.trim();

        const message = document.getElementById("visitor-message").value.trim();

        const subject = encodeURIComponent(
            `Portfolio enquiry from ${name}`
        );

        const body = encodeURIComponent(
            `Hi Sania,

${message}

From: ${name}
Email: ${email}`
        );

        formNote.textContent =
            "Opening your email app with the message ready to send...";

        window.location.href =
            `mailto:jobs4tabassum@gmail.com?subject=${subject}&body=${body}`;

    });


    // 5. CURRENT YEAR

    document.getElementById("current-year").textContent =
        new Date().getFullYear();


    // 6. BACK TO TOP BUTTON

    const backToTop = document.querySelector(".back-to-top");

    window.addEventListener("scroll", () => {

        backToTop.classList.toggle(
            "visible",
            window.scrollY > 450
        );

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // 7. SCROLL REVEAL ANIMATIONS

    const revealTargets = document.querySelectorAll(
        ".section-heading, .about-card, .skill-card, .project-card, .timeline-item, .certificate-card, .contact-card"
    );

    revealTargets.forEach(element => {

        element.classList.add("reveal");

    });

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("in-view");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        revealTargets.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealTargets.forEach(element => {

            element.classList.add("in-view");

        });

    }


    // 8. ACTIVE NAVIGATION HIGHLIGHT

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            `#${entry.target.id}`
                        );

                    });

                }

            });

        }, {
            rootMargin: "-35% 0px -55% 0px"
        });

        sections.forEach(section => {

            sectionObserver.observe(section);

        });

    }

});
