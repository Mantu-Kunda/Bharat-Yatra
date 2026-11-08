# BHARAT YATRA

A travel discovery website celebrating destinations across India. Explore destination highlights, browse travel photography, and learn more about creator Mantu Kunda.

## Features

- Responsive homepage with an autoplaying Ladakh travel-video hero and scenic image fallback
- Floating 3D scenic photo beside the creator story, with photo attribution
- Destination directory cards with a state-specific photo and visible image credits
- India-wide editorial picks for distinctive places, linked to the destination directory
- Photo highlights spanning famous destinations across India
- Searchable directory covering all 28 states and 8 Union Territories
- Filters for jurisdiction, region, and experience category
- Creator profile and social links on the homepage
- Responsive layouts styled with CSS
- Local images and video stored in the `IMAGE/` folder

The state directory uses locally stored Wikimedia Commons photos matched to each state or Union Territory. Every card displays the photographer and license and links to the original source page.

Destination highlights are curated for discovery; the site does not provide live travel conditions, availability, or prices.

The creator profile and social links are on the homepage in [About Me](./index.html#about-section).

## Photo credits

- Taj Mahal: Antrix3, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), [source](https://commons.wikimedia.org/wiki/File:Aks_The_Reflection_Taj_Mahal.jpg)
- Kerala backwaters: Varghesepunnamada, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), [source](https://commons.wikimedia.org/wiki/File:Houseboat_on_Punnamada_Backwaters_-Kerala.jpg)
- Hampi: Vyacheslav Argenberg, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), [source](https://commons.wikimedia.org/wiki/File:Hampi,_India,_Lotus_Mahal.jpg)
- Hawa Mahal: Jakub Hałun, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), [source](https://commons.wikimedia.org/wiki/File:20191218,_Hawa_Mahal_(The_Palace_of_Winds)_in_Jaipur,_1128_9119.jpg)
- Living root bridge: Sanchit1504, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), [source](https://commons.wikimedia.org/wiki/File:A_living_root_bridge_in_Meghalaya.jpg)
- Varanasi Ganga Aarti: Mommyatwork, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), [source](https://commons.wikimedia.org/wiki/File:GangaAarti_Varanasi_India.jpg)

## Built with

- HTML
- CSS
- JavaScript

The static frontend has no package installation or build step. Run it from a local HTTP server so the destination data can be loaded.

Destination records are stored in [`data/destinations.json`](./data/destinations.json), which powers the static directory. The frontend is complete as a static site: it does not provide live travel conditions, and contact/newsletter messages are not sent or stored.

## Run locally

From the repository root, start the static site:

```bash
python -m http.server 8001
```

Open `http://localhost:8001/`.

## Publish with GitHub Pages

In the repository settings, enable GitHub Pages and select the `main` branch and root folder. The site uses [`index.html`](./index.html) as its homepage entry point and [`Style.css`](./Style.css) as its stylesheet; keep the filename casing unchanged because GitHub Pages is case-sensitive.

Backend and live integrations have not been started.
