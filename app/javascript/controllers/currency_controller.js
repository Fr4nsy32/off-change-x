import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="currency"
export default class extends Controller {
  static targets = ["currency", "rates", "tag", "amount","amountcheck", "walletscheck", "wallet", "ratecheck", "totalcheck", "checkout", "commcheck"]
  static values = {
    key: String
  }
  connect() {
    const symbols = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'COP']
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
    console.log(this.currencyTarget);
    // const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${this.keyValue}&base=EUR&symbols=${this.currencyTarget.value}`
    const url =  "/transactions/proxy"
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRF-Token": document.getElementsByName('csrf-token')[0].content
      },
      body: JSON.stringify({currency: this.currencyTarget.value, access_key: this.keyValue})
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      this.ratesTarget.value = ""
      this.ratesTarget.innerHTML = ""
      this.ratesTarget.value = Object.values(data.rates)[0]
      this.ratesTarget.innerHTML = Object.values(data.rates)[0]
      console.log(Object.values(data.rates)[0]);
      this.amountcheckTarget.lastChild.nodeValue = `     ${this.amountTarget.value}`
      this.walletscheckTarget.innerHTML = `<strong style="color: black; text-shadow: black 0 0 0; font-weight: 600">${this.walletTarget.value} → ${this.currencyTarget.value}</strong>`
      this.ratecheckTarget.innerHTML = `<strong>${this.ratesTarget.value}</strong>`
      this.totalcheckTarget.lastChild.nodeValue = `      ${parseFloat(this.amountTarget.value) + parseFloat(this.commcheckTarget.lastChild.nodeValue)}`
      // this.totalcheckTarget.lastChild.nodeValue = `      ${(this.amountTarget.value * this.ratesTarget.value).toFixed(2)}`
      this.checkoutTarget.classList.remove("d-none")
      // console.log(this.buttonTarget);
      // this.buttonTarget.classList.remove("disabled")
    })
}
}
