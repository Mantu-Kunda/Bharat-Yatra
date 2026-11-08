const navigation = document.querySelector("#search");
const mobileMenu = document.querySelector(".side-bar");
const menuButton = document.createElement("button");

menuButton.type = "button";
menuButton.className = "menu-toggle";
menuButton.setAttribute("aria-label", "Open navigation menu");
menuButton.setAttribute("aria-expanded", "false");
menuButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>';
mobileMenu.replaceChildren(menuButton);

function closeMenu() {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    navigation.classList.remove("is-open");
}

menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navigation.classList.toggle("is-open", !isOpen);
});

const routes = {
    home: "index.html",
    about: "index.html#about-section",
    contact: "index.html#contact-section"
};

["home", "about", "contact"].forEach((id) => {
    const item = document.querySelector(`#${id}`);
    if (!item) {
        return;
    }

    item.setAttribute("role", "link");
    item.tabIndex = 0;
    const navigate = () => {
        window.location.href = routes[id];
    };
    item.addEventListener("click", navigate);
    item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            navigate();
        }
    });
    item.addEventListener("click", closeMenu);
});

const modeButton = document.querySelector("#mode");
if (modeButton) {
    modeButton.setAttribute("role", "button");
    modeButton.tabIndex = 0;
    const toggleTheme = () => {
        document.body.classList.toggle("theme-dark");
        modeButton.setAttribute(
            "aria-pressed",
            String(document.body.classList.contains("theme-dark"))
        );
    };
    modeButton.addEventListener("click", toggleTheme);
    modeButton.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleTheme();
        }
    });
}

const searchIcon = navigation.querySelector("img");
if (searchIcon) {
    searchIcon.setAttribute("role", "link");
    searchIcon.setAttribute("aria-label", "Search destinations");
    searchIcon.tabIndex = 0;
    const openSearch = () => {
        window.location.href = "index.html#destinations";
    };
    searchIcon.addEventListener("click", openSearch);
    searchIcon.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openSearch();
        }
    });
}

navigation.querySelectorAll("span").forEach((item) => {
    item.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});
