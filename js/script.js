/*=========================================
  FASTCARE DIAGNOSTICS
  MAIN JAVASCRIPT
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
      PRELOADER
    ==============================*/

    const preloader = document.querySelector(".preloader");

    window.addEventListener("load", () => {

        if (preloader) {

            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";

            setTimeout(() => {

                preloader.style.display = "none";

            }, 500);

        }

    });


    /*==============================
      CURRENT YEAR
    ==============================*/

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }


    /*==============================
      STICKY HEADER
    ==============================*/

    const header = document.getElementById("header");

    function stickyHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    }

    stickyHeader();

    window.addEventListener("scroll", stickyHeader);


    /*==============================
      MOBILE MENU
    ==============================*/

    const menuBtn = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            menuBtn.classList.toggle("open");

        });

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuBtn.classList.remove("open");

            });

        });

    }


    /*==============================
      BACK TO TOP
    ==============================*/

    const backToTop = document.getElementById("backToTop");

    function toggleBackButton() {

        if (!backToTop) return;

        if (window.scrollY > 400) {

            backToTop.style.display = "flex";

        } else {

            backToTop.style.display = "none";

        }

    }

    toggleBackButton();

    window.addEventListener("scroll", toggleBackButton);

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

/*==============================
        FAQ ACCORDION
==============================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    if (question) {

        question.addEventListener("click", () => {

            const alreadyOpen = item.classList.contains("active");

            // Close all FAQs
            faqItems.forEach(faq => {
                faq.classList.remove("active");
            });

            // Open only the clicked FAQ
            if (!alreadyOpen) {
                item.classList.add("active");
            }

        });

    }

});

    /*==============================
      ANIMATED COUNTERS
    ==============================*/

    const counters = document.querySelectorAll(".stat-card h2");

    function animateCounter(counter) {

        const text = counter.innerText;

        const target = parseInt(text.replace(/\D/g, ""));

        if (isNaN(target)) return;

        const suffix = text.replace(/[0-9]/g, "");

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 100));

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

                counter.innerText = target + suffix;

                clearInterval(timer);

            } else {

                counter.innerText = current + suffix;

            }

        }, 20);

    }

    let counterStarted = false;

    function startCounters() {

        const stats = document.querySelector(".statistics");

        if (!stats || counterStarted) return;

        const rect = stats.getBoundingClientRect();

        if (rect.top < window.innerHeight - 100) {

            counterStarted = true;

            counters.forEach(animateCounter);

        }

    }

    window.addEventListener("scroll", startCounters);

    startCounters();


    /*==============================
      SEARCH FILTER
    ==============================*/

    const searchInput = document.querySelector(".search-box input");

    const testCards = document.querySelectorAll(".test-card");

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value = searchInput.value.toLowerCase();

            testCards.forEach(card => {

                const title = card.querySelector("h3").innerText.toLowerCase();

                if (title.includes(value)) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }


    /*==============================
      SMOOTH SCROLL
    ==============================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

        /*==============================
      ACTIVE NAVIGATION
    ==============================*/

    const navItems = document.querySelectorAll(".nav-links a");

    function updateActiveNav() {

        const currentPage = window.location.pathname.split("/").pop() || "index.html";

        navItems.forEach(link => {

            const href = link.getAttribute("href");

            if (href === currentPage) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

    }

    updateActiveNav();


    /*==============================
      SCROLL REVEAL
    ==============================*/

    const revealItems = document.querySelectorAll(
".hero-text, .hero-image, .section-header, .about-story-image, .about-story-text, .test-card, .package-card, .process-box, .why-card, .testimonial-card, .tip-card"
);

    function revealOnScroll() {

        revealItems.forEach(item => {

            const rect = item.getBoundingClientRect();

            if (rect.top < window.innerHeight - 80) {

                item.classList.add("show");

            }

        });

    }

    window.addEventListener("scroll", revealOnScroll);

    revealOnScroll();


    /*==============================
      LAZY IMAGE LOADING
    ==============================*/

    const images = document.querySelectorAll("img");

    images.forEach(img => {

        img.setAttribute("loading", "lazy");

    });

    /*==============================
    MINIMUM BOOKING DATE
==============================*/

const appointmentDate = document.getElementById("appointmentDate");

if (appointmentDate) {

    const today = new Date().toISOString().split("T")[0];

    appointmentDate.min = today;

}

/*==============================
    VALIDATE APPOINTMENT TIME
==============================*/

const appointmentTime = document.getElementById("appointmentTime");

function updateMinimumTime() {

    if (!appointmentDate || !appointmentTime) return;

    const today = new Date().toISOString().split("T")[0];

    if (appointmentDate.value === today) {

        const now = new Date();

        const hours = String(now.getHours()).padStart(2, "0");

        const minutes = String(now.getMinutes()).padStart(2, "0");

        appointmentTime.min = `${hours}:${minutes}`;

    } else {

        appointmentTime.removeAttribute("min");

    }

}

if (appointmentDate) {

    appointmentDate.addEventListener("change", updateMinimumTime);

}

if (appointmentTime) {

    appointmentTime.addEventListener("focus", updateMinimumTime);

}

/*==============================
    BOOKING BUTTON LOADING
==============================*/

const bookingForm = document.querySelector('form[action*="web3forms"]');

const submitBtn = document.getElementById("submitBtn");

const submitText = document.getElementById("submitText");

if (bookingForm && submitBtn && submitText) {

    bookingForm.addEventListener("submit", function () {

        submitBtn.disabled = true;

        submitText.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            Booking...
        `;

    });

}


});


const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(link => {

    const page = link.getAttribute("href");

    if (page === currentPage || (currentPage === "" && page === "index.html")) {
        link.classList.add("active");
    }

});
