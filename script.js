const routes = [
  {name:"Granite Railway", year:1826, group:"early", color:"#c55537", coords:[[42.71,-71.16],[42.64,-71.13],[42.58,-71.12],[42.51,-71.12]], note:"Opened in 1826 to carry granite from Quincy quarries to the Neponset River. Its flat, durable rails and working locomotives made it an influential early American railway."},
  {name:"Baltimore & Ohio Railroad", year:1830, group:"early", color:"#c55537", coords:[[39.29,-76.61],[39.34,-76.72],[39.37,-76.84],[39.40,-76.96],[39.41,-77.01]], note:"The B&O began public service in 1830, initially connecting Baltimore with nearby Ellicott's Mills. It became one of the country's most important early rail systems."},
  {name:"Mohawk & Hudson Railroad", year:1831, group:"early", color:"#c55537", coords:[[42.65,-73.75],[42.73,-73.84],[42.82,-73.95],[42.93,-74.06],[43.00,-74.13]], note:"Opened in 1831 between Albany and Schenectady, this line shortened a journey that had taken much longer by canal or road."},
  {name:"Boston & Providence Railroad", year:1835, group:"early", color:"#c55537", coords:[[42.36,-71.06],[42.24,-71.08],[42.15,-71.10],[42.05,-71.13],[41.92,-71.42],[41.82,-71.41]], note:"The Boston & Providence opened in 1835, part of the region's first wave of city-to-city passenger railways."},
  {name:"New York & Harlem Railroad", year:1837, group:"early", color:"#c55537", coords:[[40.71,-74.01],[40.78,-73.96],[40.85,-73.93],[40.92,-73.90],[41.03,-73.87]], note:"The New York & Harlem began service in the 1830s and steadily extended north from lower Manhattan, helping make rail travel part of metropolitan life."},
  {name:"Western Railroad (Massachusetts)", year:1841, group:"early", color:"#c55537", coords:[[42.36,-71.06],[42.28,-71.55],[42.20,-72.15],[42.27,-72.58],[42.30,-73.25],[42.45,-73.25],[42.65,-73.75]], note:"Completed across Massachusetts in 1841, the Western Railroad linked Boston with Albany and connected New England to the Hudson River corridor."},
  {name:"Erie Railway", year:1851, group:"trunk", color:"#315c52", coords:[[40.71,-74.01],[41.30,-74.12],[41.50,-74.65],[41.41,-75.66],[41.40,-76.88],[41.24,-77.01],[41.41,-77.38],[41.41,-77.64]], note:"The New York and Erie Railroad opened its main line in 1851, connecting the New York region westward across southern New York to Lake Erie."},
  {name:"New York Central (Hudson River route)", year:1851, group:"trunk", color:"#315c52", coords:[[40.71,-74.01],[41.45,-73.98],[41.70,-73.93],[42.10,-73.94],[42.65,-73.75],[42.90,-73.69],[43.65,-73.75],[44.30,-73.68]], note:"A continuous rail connection between New York City and Buffalo was completed in 1851 through the Hudson River and Mohawk Valley corridors."},
  {name:"Pennsylvania Railroad", year:1854, group:"trunk", color:"#315c52", coords:[[39.95,-75.16],[40.20,-75.13],[40.60,-75.49],[40.86,-77.03],[40.79,-77.86],[40.44,-78.40],[40.52,-80.00]], note:"The Pennsylvania Railroad completed a Philadelphia-to-Pittsburgh route in 1854, crossing the Alleghenies with help from tunnels and inclined planes."},
  {name:"New Haven Railroad", year:1848, group:"trunk", color:"#315c52", coords:[[40.71,-74.01],[41.03,-73.54],[41.31,-72.92],[41.76,-72.68],[41.82,-71.41],[42.36,-71.06]], note:"The New York, New Haven & Hartford system grew from mid-century lines linking coastal Connecticut, Rhode Island, and Boston with New York."},
  {name:"Delaware, Lackawanna & Western", year:1856, group:"trunk", color:"#315c52", coords:[[40.71,-74.01],[41.06,-74.15],[41.33,-74.74],[41.41,-75.66],[41.41,-76.00],[41.41,-76.87]], note:"The Lackawanna route joined the New York area to coal fields and industrial towns in northeastern Pennsylvania, carrying anthracite and passengers."},
  {name:"Boston & Maine Railroad", year:1843, group:"trunk", color:"#315c52", coords:[[42.36,-71.06],[42.70,-71.16],[43.00,-71.45],[43.66,-70.25],[44.31,-69.78],[44.48,-73.21]], note:"The Boston & Maine expanded north through New Hampshire and Maine, becoming a major regional carrier across northern New England."},
  {name:"Lehigh Valley Railroad", year:1855, group:"later", color:"#d1a452", coords:[[40.71,-74.01],[40.60,-75.49],[40.61,-75.49],[40.96,-75.19],[41.24,-75.88],[41.41,-76.87],[42.13,-76.25]], note:"The Lehigh Valley developed to move anthracite coal from Pennsylvania to markets and ports, later extending westward to connect with the Great Lakes region."},
  {name:"Reading Railroad", year:1842, group:"later", color:"#d1a452", coords:[[39.95,-75.16],[40.34,-75.93],[40.34,-76.42],[40.27,-76.88],[40.60,-75.49]], note:"The Philadelphia & Reading opened in 1842 and became a leading carrier of anthracite coal from eastern Pennsylvania."},
  {name:"Rutland Railroad", year:1849, group:"later", color:"#d1a452", coords:[[42.65,-73.75],[43.61,-72.97],[43.61,-72.97],[44.48,-73.21],[44.26,-72.58]], note:"Mid-century lines connected Vermont towns with the Hudson River and Lake Champlain, linking rural producers to broader markets."},
  {name:"Central New York & Hudson River corridor", year:1869, group:"later", color:"#d1a452", coords:[[40.71,-74.01],[41.45,-73.98],[42.65,-73.75],[43.05,-75.23],[43.10,-76.15],[43.55,-76.15],[43.65,-79.38]], note:"By the later 19th century, the New York Central system joined many regional lines into a high-capacity route between New York, the Mohawk Valley, and the Great Lakes."},
  {name:"Pittsburgh, Fort Wayne & Chicago", year:1859, group:"later", color:"#d1a452", coords:[[40.44,-80.00],[40.80,-81.38],[41.08,-81.52],[41.50,-81.69],[41.65,-83.54],[41.88,-87.63]], note:"A western extension from Pittsburgh connected the Northeast's industrial rail network to Chicago, completing an important east-west route in 1859."}
];

const timelineCopy = {
  1825:["THE FIRST LINES","A region awaits its rails.","The earliest U.S. railways were short industrial experiments. From 1830 onward, public lines began connecting cities, ports, and inland markets."],
  1850:["A GROWING WEB","Cities begin to connect.","By mid-century, routes linked New York, Boston, Philadelphia, Baltimore, and inland towns. Railways increasingly competed with canals and coastal shipping."],
  1875:["THE NETWORK EXPANDS","Regional lines, wider reach.","After the Civil War, rail construction accelerated. Coal, manufacturing, and long-distance trade fueled new routes and larger railroad systems."],
  1900:["A MATURE NETWORK","A continent within reach.","By 1900, dense corridors tied the Northeast to the interior. Consolidation and competition shaped the powerful rail systems of the next century."]
};
const map = L.map("map", {scrollWheelZoom:false, zoomControl:true}).setView([41.65,-74.4], 6);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const layerGroup = L.featureGroup().addTo(map);
const slider = document.getElementById("year-slider");
const yearLabel = document.getElementById("year-label");
let activeYear = Number(slider.value);
let playTimer = null;
let selectedLine = null;

function eraFor(year) {
  if (year < 1840) return ["THE FIRST LINES", "A region awaits its rails.", "The earliest U.S. railways were short industrial experiments. From 1830 onward, public lines began connecting cities, ports, and inland markets."];
  if (year < 1860) return ["A GROWING WEB", "Cities begin to connect.", "By mid-century, routes linked New York, Boston, Philadelphia, Baltimore, and inland towns. Railways increasingly competed with canals and coastal shipping."];
  if (year < 1880) return ["THE NETWORK EXPANDS", "Regional lines, wider reach.", "After the Civil War, rail construction accelerated. Coal, manufacturing, and long-distance trade fueled new routes and larger railroad systems."];
  return ["A MATURE NETWORK", "A continent within reach.", "By 1900, dense corridors tied the Northeast to the interior. Consolidation and competition shaped the powerful rail systems of the next century."];
}
function routePopup(route) {
  return `<div class="route-popup"><strong>${route.name}</strong><span>Representative route · opened/connected by ${route.year}<br>${route.note}</span></div>`;
}
function draw(year) {
  activeYear = year;
  yearLabel.textContent = year;
  slider.value = year;
  const [era,title,copy] = eraFor(year);
  document.getElementById("map-era").textContent = era;
  document.getElementById("info-title").innerHTML = title.replace(" ", "<br>");
  document.getElementById("info-copy").textContent = copy;
  layerGroup.clearLayers();
  selectedLine = null;
  document.getElementById("route-label").textContent = "Select a colored route";
  document.querySelector(".route-swatch").style.display = "none";
  const visible = routes.filter(route => route.year <= year);
  document.getElementById("route-count").textContent = visible.length;
  visible.forEach(route => {
    const line = L.polyline(route.coords, {color:route.color, weight:4, opacity:.88, lineCap:"round", lineJoin:"round"}).addTo(layerGroup);
    line.bindPopup(routePopup(route));
    line.bindTooltip(route.name, {sticky:true});
    line.on("click", () => {
      selectedLine = route;
      document.getElementById("route-label").textContent = route.name;
      const swatch = document.querySelector(".route-swatch");
      swatch.style.display = "block";
      swatch.style.backgroundColor = route.color;
      document.getElementById("info-title").textContent = route.name;
      document.getElementById("info-copy").textContent = route.note;
      document.getElementById("map-era").textContent = `ROUTE MILESTONE · ${route.year}`;
    });
  });
}
slider.addEventListener("input", () => draw(Number(slider.value)));
document.getElementById("play-button").addEventListener("click", event => {
  const button = event.currentTarget;
  if (playTimer) {
    clearInterval(playTimer);
    playTimer = null;
    button.innerHTML = '<span class="play-symbol">▶</span><span class="play-text">PLAY</span>';
    button.setAttribute("aria-label", "Play timeline");
    return;
  }
  button.innerHTML = '<span class="play-symbol">Ⅱ</span><span class="play-text">PAUSE</span>';
  button.setAttribute("aria-label", "Pause timeline");
  if (activeYear >= 1900) draw(1825);
  playTimer = setInterval(() => {
    const next = activeYear + 5;
    if (next > 1900) {
      clearInterval(playTimer); playTimer = null;
      button.innerHTML = '<span class="play-symbol">▶</span><span class="play-text">PLAY</span>';
      button.setAttribute("aria-label", "Play timeline");
    } else draw(next);
  }, 900);
});
draw(activeYear);
