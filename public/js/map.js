// console.log("Map.js coords:", window.coordinates); // should work

mapboxgl.accessToken = window.mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: window.coordinates,   // [lng, lat]
    zoom: 9
});

const marker = new mapboxgl.Marker({color: "red"})
   .setLngLat(window.coordinates)
   .addTo(map);
console.log(window.lc);

   // Create popup
const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h4>${window.lc}</h4><p>Exact Loaction provided after booking!</p >`);

// Get the DOM element of the marker
const markerEl = marker.getElement();

// Show popup on mouse enter
markerEl.addEventListener("mouseenter", () => popup.addTo(map).setLngLat(window.coordinates));


// Hide popup on mouse leave
markerEl.addEventListener("mouseleave", () => popup.remove());