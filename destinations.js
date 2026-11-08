let indiaDestinations = [];
const destinationGrid = document.querySelector("#destination-grid");
const destinationSearch = document.querySelector("#destination-search");
const destinationType = document.querySelector("#destination-type");
const destinationRegion = document.querySelector("#destination-region");
const destinationCategory = document.querySelector("#destination-category");
const destinationCount = document.querySelector("#destination-count");
const destinationEmpty = document.querySelector("#destination-empty");
const destinationSearchForm = document.querySelector("#destination-filters");
const destinationSuggestions = document.querySelector("#destination-suggestions");

function createDestinationCard(destination) {
    const card = document.createElement("article");
    card.className = "destination-card";

    const landscape = destination.photo;
    if (!landscape?.src || !landscape.credit || !landscape.artist || !landscape.license || !landscape.alt) {
        throw new Error(`No complete destination photo is configured for ${destination.name}.`);
    }

    const landscapeFrame = document.createElement("div");
    landscapeFrame.className = "destination-card-landscape";

    const landscapeImage = document.createElement("img");
    landscapeImage.src = landscape.src;
    landscapeImage.alt = landscape.alt;
    landscapeImage.loading = "lazy";
    landscapeImage.decoding = "async";

    const landscapeShade = document.createElement("span");
    landscapeShade.className = "destination-card-landscape-shade";
    landscapeShade.setAttribute("aria-hidden", "true");
    landscapeFrame.append(landscapeImage, landscapeShade);

    const landscapeCredit = document.createElement("a");
    landscapeCredit.className = "destination-card-landscape-credit";
    landscapeCredit.href = landscape.credit;
    landscapeCredit.target = "_blank";
    landscapeCredit.rel = "noopener noreferrer";
    landscapeCredit.textContent = `Photo: ${landscape.artist} · ${landscape.license}`;
    landscapeCredit.title = `Photo by ${landscape.artist}, licensed ${landscape.license}. View the source.`;
    landscapeCredit.setAttribute("aria-label", `Photo credit and license for ${destination.name}: ${landscape.artist}, ${landscape.license}`);
    landscapeFrame.append(landscapeCredit);

    const cardTop = document.createElement("div");
    cardTop.className = "destination-card-top";

    const initials = document.createElement("span");
    initials.className = "destination-initials";
    initials.setAttribute("aria-hidden", "true");
    initials.textContent = destination.name
        .split(/\s+/)
        .filter((word) => !["and", "of", "the"].includes(word.toLowerCase()))
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();

    const region = document.createElement("span");
    region.className = "destination-region";
    region.textContent = destination.region === "Islands"
        ? "Island territories"
        : `${destination.region} India`;
    cardTop.append(initials, region);

    const type = document.createElement("p");
    type.className = "destination-type";
    type.textContent = destination.type;

    const title = document.createElement("h3");
    title.textContent = destination.name;

    const highlightsLabel = document.createElement("p");
    highlightsLabel.className = "destination-highlights-label";
    highlightsLabel.textContent = "Places to explore";

    const highlights = document.createElement("ul");
    highlights.className = "destination-highlights";
    destination.highlights.forEach((place) => {
        const item = document.createElement("li");
        item.textContent = place;
        highlights.append(item);
    });

    const category = document.createElement("span");
    category.className = "destination-category";
    category.textContent = destination.category;

    const details = document.createElement("button");
    details.className = "destination-card-action";
    details.type = "button";
    details.dataset.destinationId = destination.id;
    details.textContent = "View highlights";

    card.append(landscapeFrame, cardTop, type, title, highlightsLabel, highlights, category, details);
    return card;
}

function renderDestinations() {
    const query = destinationSearch.value.trim().toLocaleLowerCase();
    const filteredDestinations = indiaDestinations.filter((destination) => {
        const searchableText = [
            destination.name,
            destination.type,
            destination.region,
            destination.category,
            ...destination.highlights
        ].join(" ").toLocaleLowerCase();

        return searchableText.includes(query)
            && (!destinationType.value || destination.type === destinationType.value)
            && (!destinationRegion.value || destination.region === destinationRegion.value)
            && (!destinationCategory.value || destination.category === destinationCategory.value);
    });

    destinationGrid.replaceChildren(...filteredDestinations.map(createDestinationCard));
    destinationCount.textContent = `${filteredDestinations.length} of ${indiaDestinations.length} states and Union Territories`;
    destinationEmpty.hidden = filteredDestinations.length > 0;
}

[destinationSearch, destinationType, destinationRegion, destinationCategory].forEach((control) => {
    control.addEventListener("input", renderDestinations);
    control.addEventListener("change", renderDestinations);
});

destinationSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderDestinations();
});

destinationSearchForm.addEventListener("reset", () => {
    window.setTimeout(renderDestinations, 0);
});

const destinationDialog = document.querySelector("#destination-dialog");
destinationGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-destination-id]");
    if (!button) {
        return;
    }

    const destination = indiaDestinations.find((item) => item.id === button.dataset.destinationId);
    if (!destination) {
        return;
    }

    document.querySelector("#dialog-title").textContent = destination.name;
    document.querySelector("#dialog-region").textContent = destination.region === "Islands"
        ? "Island territories"
        : `${destination.region} India`;
    document.querySelector("#dialog-type").textContent = `${destination.type} · ${destination.category}`;
    const highlights = document.querySelector("#dialog-highlights");
    highlights.replaceChildren(...destination.highlights.map((place) => {
        const item = document.createElement("li");
        item.textContent = place;
        return item;
    }));
    destinationDialog.showModal();
});

const headerSearchForm = document.querySelector(".d-flex");
headerSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    destinationSearch.value = document.querySelector(".search-bar").value;
    renderDestinations();
    document.querySelector("#destinations").scrollIntoView({ behavior: "smooth" });
});

async function loadDestinations() {
    destinationCount.textContent = "Loading destinations...";
    try {
        const response = await fetch("./data/destinations.json");
        if (!response.ok) {
            throw new Error(`Static destination data request failed: ${response.status}`);
        }
        indiaDestinations = await response.json();
        destinationSuggestions.replaceChildren(...indiaDestinations.flatMap((destination) => [
            destination.name,
            ...destination.highlights
        ]).map((value) => {
            const option = document.createElement("option");
            option.value = value;
            return option;
        }));
        renderDestinations();
    } catch (error) {
        destinationCount.textContent = "Destinations could not be loaded. Please try again later.";
        console.error("Unable to load destination data.", error);
    }
}

loadDestinations();
