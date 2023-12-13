import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="flag"
export default class extends Controller {
  static targets = ["place"]
  static values = {
    key: String
  }
  connect() {
    const url = `https://emoji-api.com/emojis?${document.cookie}&access_key=${this.keyValue}`
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      this.placeTarget.innerHTML = ""
      this.placeTarget.innerHTML = data[0].character
    })
  }
}
