# Tracks of Change — Railroad History

A static, responsive history website with an interactive, year-controlled map of representative railroad growth in the Northeastern United States. It is ready to publish on GitHub Pages; there is no build step.

## Publish on GitHub Pages

1. Create a GitHub repository and upload the contents of this folder (keep `index.html` at the repository root).
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select your publishing branch (usually `main`) and `/ (root)`, then save.
4. Open the Pages URL GitHub provides.

## Files

- `index.html` — page content and metadata
- `styles.css` — responsive visual design
- `script.js` — map, route data, year slider, playback, and route details

## Map and external services

The map uses Leaflet 1.9.4 and OpenStreetMap tiles via public CDNs. An internet connection is needed for the interactive basemap and web fonts. The page structure and story remain readable if external services are unavailable. Review the current usage policies for Leaflet's CDN, OpenStreetMap tile service, and Google Fonts before high-traffic production use.

## Historical accuracy

The map is an educational visualization, not a cadastral or comprehensive historical map. Its selected routes and geometries are schematic approximations, and each year is a representative opening or network-connection milestone rather than a precise, complete construction chronology. Railroad companies reorganized, merged, and changed names; route labels are simplified for readability. Historical claims in the text are concise overviews.

Useful starting points for further research:
- Library of Congress, Railroad Maps collection: https://www.loc.gov/collections/railroad-maps-1828-to-1900/
- Smithsonian National Museum of American History, transportation collections: https://americanhistory.si.edu/collections
- Encyclopaedia Britannica, “Railroad”: https://www.britannica.com/technology/railroad
- National Park Service, Baltimore & Ohio Railroad resources: https://www.nps.gov/
- New York Central System Historical Society: https://www.nycshs.org/

## License and attribution

The original page code and schematic route overlay are provided for reuse. OpenStreetMap map data is © OpenStreetMap contributors and is available under the Open Database License; attribution is shown on the map. Third-party libraries, map tiles, and fonts are governed by their respective terms.
