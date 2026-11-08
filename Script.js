const navigationEntry = performance.getEntriesByType("navigation")[0];
if (navigationEntry?.type === "reload") {
    history.scrollRestoration = "manual";
    history.replaceState(history.state, "", `${location.pathname}${location.search}`);
    window.addEventListener("pageshow", () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, { once: true });
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");
const siteStatus = document.querySelector("#site-status");
const contactForm = document.querySelector("#contact-form");
const destinationSearchField = document.querySelector("#destination-search");
const heroVideo = document.querySelector(".bg-video");
const videoPlayButton = document.querySelector(".video-play-btn");

siteStatus.textContent = "";
siteStatus.classList.remove("is-visible");
heroVideo.muted = true;
heroVideo.defaultMuted = true;
heroVideo.autoplay = true;
heroVideo.loop = true;
heroVideo.playsInline = true;

function playHeroVideo() {
    if (document.hidden) {
        return;
    }

    const playback = heroVideo.play();
    if (!playback) {
        return;
    }

    playback.then(() => {
        videoPlayButton.hidden = true;
        siteStatus.classList.remove("is-visible");
    }).catch((error) => {
        if (error.name === "AbortError") {
            return;
        }

        if (error.name === "NotAllowedError") {
            videoPlayButton.hidden = false;
            return;
        }

        console.error("The hero background video could not start.", error);
        showSiteStatus("The hero video could not be loaded.");
    });
}

playHeroVideo();

videoPlayButton.addEventListener("click", playHeroVideo);

heroVideo.addEventListener("playing", () => {
    videoPlayButton.hidden = true;
});

document.addEventListener("visibilitychange", () => {
    if (!document.hidden && heroVideo.paused) {
        playHeroVideo();
    }
});

window.addEventListener("pageshow", () => {
    if (!document.hidden && heroVideo.paused) {
        playHeroVideo();
    }
});

function showSiteStatus(message) {
    siteStatus.textContent = message;
    siteStatus.classList.add("is-visible");
    window.clearTimeout(showSiteStatus.timeoutId);
    showSiteStatus.timeoutId = window.setTimeout(() => {
        siteStatus.classList.remove("is-visible");
    }, 5000);
}

function closeNavigation() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    siteNavigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    siteNavigation.classList.toggle("is-open", !isOpen);
});

siteNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeNavigation();
    }
});

document.querySelector(".main-btn").addEventListener("click", () => {
    document.querySelector("#destinations").scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
});

document.querySelector(".unique-places-grid").addEventListener("click", (event) => {
    const place = event.target.closest("[data-destination-query]");
    if (!place) {
        return;
    }

    destinationSearchField.value = place.dataset.destinationQuery;
    destinationSearchField.dispatchEvent(new Event("input", { bubbles: true }));
});

document.querySelector("#destination-dialog").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
        event.currentTarget.close();
    }
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) {
        return;
    }

    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(formData.get("subject").toString());
    const body = encodeURIComponent(
        `From: ${formData.get("name")}\nReply to: ${formData.get("email")}\n\n${formData.get("message")}`
    );
    showSiteStatus("Your email app will open with this message. This website does not send or store it.");
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
});
