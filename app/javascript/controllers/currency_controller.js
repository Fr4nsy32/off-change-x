import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="currency"
export default class extends Controller {
  static targets = ["currency", "rates", "tag"]
  static values = {
    key: String
  }
  connect() {
    const symbols = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD']
    symbols.forEach((symbol) => {
      this.currencyTarget.insertAdjacentHTML('beforeend', `<option data-currency-target="tag" data-action="click->currency#fire" value="${symbol}">${symbol}</option>`)
    })
    // const url = `http://api.exchangeratesapi.io/v1/latest?access_key=f354999ca0f845d898c5563ae88f1544&base=EUR&symbols=${symbols.join(',')}`
    // fetch(url)
    // .then(response => response.json())
    // .then((data) => {
    //   console.log(Object.values(data.rates));
    //   Object.keys(data.rates).forEach((key) => {
    //     this.currencyTarget.insertAdjacentHTML('beforeend', `<option data-currency-target="tag" data-action="click->currency#fire" value="${key}">${key}</option>`)
    //     // this.ratesTarget.insertAdjacentHTML('beforeend', `<option value="${data.rates[key]}">${data.rates[key]}</option>`)
    //   })
    // })
    // console.log(this.tagTarget.value);
    // this.ratesTarget.value = data.rates[this.currencyTarget.value]
  }

  fire(){
    console.log(this.keyValue);
    console.log(this.currencyTarget.value);
    const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${this.keyValue}&base=EUR&symbols=${this.currencyTarget.value}`
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      this.ratesTarget.value = ""
      this.ratesTarget.innerHTML = ""
      this.ratesTarget.value = Object.values(data.rates)[0]
      this.ratesTarget.innerHTML = Object.values(data.rates)[0]
      console.log(Object.values(data.rates)[0]);
    })
}
}