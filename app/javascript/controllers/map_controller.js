import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl' // Don't forget this!
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array
  }

  connect() {
    console.log(this.markersValue)
     navigator.geolocation.getCurrentPosition(this.success.bind(this))
     mapboxgl.accessToken = this.apiKeyValue

     this.map = new mapboxgl.Map({
       container: this.element,
       style: "mapbox://styles/mapbox/streets-v12"
     })

    // console.log(crd)
    //navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  };

  search() {
    navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this), options);
    this.#fitMapToMarkers(getCurrentPosition);
  };

  success(pos) {
    const crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    let newMarkers = [...this.markersValue, {lng: crd.longitude, lat: crd.latitude,
                                            info_window_html: "You are here",
                                            marker_html: '<i class="fa-solid fa-map-pin"></i>'}]
    // console.log(this.markersValue)^
    this.markersValue = newMarkers

    console.log(this.markersValue)
    this.#addMarkersToMap();
    this.#fitMapToMarkers();
    this.map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl }))
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html)
      const customMarker = document.createElement("div")
    customMarker.innerHTML = marker.marker_html // Add this
      new mapboxgl.Marker(customMarker)
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup) // Add this
        .addTo(this.map)
    })
  };

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 5 })
  }
}
