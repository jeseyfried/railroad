# Iron Roads — The Railroad & the Making of the Northeast

A responsive, interactive historical website showing **selected rail corridors** across the northeastern United States from 1826 to 1900.

## Publish on GitHub Pages

1. Extract `iron-roads-northeast.zip`.
2. Create a GitHub repository such as `iron-roads`.
3. Upload **the contents** of the extracted `iron-roads-northeast` folder to the **root** of your repository. `index.html` must be in the repository root.
4. Commit the files to `main`.
5. Go to **Settings → Pages → Build and deployment**. Under **Source**, choose **Deploy from a branch**. Set **Branch** to `main`, **Folder** to `/ (root)`, and save.
6. GitHub Pages will serve your site at `https://YOUR-USERNAME.github.io/iron-roads/` (replace with your username and repository).

There is **no build step**, package manager, Jekyll theme, API key, hosted map service, or external JavaScript dependency. You can also double-click `index.html` to open it locally. All illustrations and map data are local. The only internet connection the site may use is when a visitor chooses to follow an external historical source link.

## Features

- Timeline slider and play/pause animation, stepping through 1830–1900.
- Pan/zoom map and reset-extent controls.
- Region filters for New England, New York, and the Mid-Atlantic.
- Search by railroad name, corridor, or place.
- Select any route on the map or the route list to view its note and linked historical source.
- Themed essays about invention, expansion, and economic/social consequences.
- Responsive design for mobile and desktop; keyboard map zoom and pan.

## Files

| File | Purpose |
|---|---|
| `index.html` | The website and historical essays |
| `css/style.css` | Visual appearance and mobile layout |
| `js/app.js` | Map rendering and interactions |
| `data/network.js` | Local city coordinates, state outlines, route segments and references |
| `assets/locomotive.svg` | Original railway illustration |
| `assets/favicon.svg` | Site icon |
| `SOURCES.md` | Research sources, geographic and historical limitations |
| `.nojekyll` | Makes GitHub Pages serve the files as a static website |

## Updating the map

The `routes` array in `data/network.js` is editable. Each record uses:

```js
['Railroad name','Region','Corridor label',1851,'city_a city_b',
 'Historical explanation','source_key']
```

The `cities` object defines coordinates keyed by IDs; each route must use known city keys. Regions should be `New England`, `New York`, or `Mid-Atlantic` to work with the built-in filters. Historical dates should be verified individually when adding new routes.

## Historical limitations

**This is a representative teaching map, not a complete historical GIS network.** Lines are simplified by connecting modern city coordinates; they do not follow surveyed nineteenth-century rights-of-way. Dates are approximate for some corridors. The count on the map is the number of selected illustrative corridor records shown — **not** a historical railroad count, regional track mileage, or a valid measure of economic growth. Modern state boundaries are background context, including the anachronistic West Virginia outline before 1863. See `SOURCES.md` for detailed methods and references.

## License

Original website code, site prose, and SVG artwork are published under the [MIT License](LICENSE). External references are linked for research and remain subject to their creators' rights.
