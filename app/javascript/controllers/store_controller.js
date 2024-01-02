import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="store"
export default class extends Controller {
  static targets = ["info", "code"]
  connect() {
    this.codeTarget.outerHTML = '<input class=\"form-control string optional\" data-store-target=\"code\" type="text\" name=\"transaction[receiver]\" id=\"transaction_receiver\" data-action=\"keyup->store#complete\">'
  }

  complete() {
    const url = `https://www.offchangex.com/stores/render/${this.codeTarget.value}`
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'If-Unmodified-Since': 'Wed, 21 Oct 2015 07:28:00 GMT',
      },
    })
    .then(response => response.json())
    .then((data) => {
      this.infoTarget.lastElementChild.innerHTML = ""
      this.infoTarget.firstElementChild.innerHTML = `${data.name}`
      this.infoTarget.lastElementChild.outerHTML = `<p>${data.address}</p>`
      // console.log(Object.values(data.name).join(''));
      // console.log(Object(data.stores[0]).address);
    })
  }
}
