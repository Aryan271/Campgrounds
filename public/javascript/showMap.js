mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "show-map", // container ID
  style: "mapbox://styles/mapbox/outdoors-v11", // style URL
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 15, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker({ color: "#000" })
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${campground.title}</h3>
      <p>${campground.location}</p>`
    )
  )
  .addTo(map);
