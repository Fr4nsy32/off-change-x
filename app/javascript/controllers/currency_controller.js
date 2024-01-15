import { Controller } from "@hotwired/stimulus"
import Swal from 'sweetalert2';

// Connects to data-controller="currency"
export default class extends Controller {

  static targets = ["currency", "rates", "tag", "amount","amountcheck", "walletscheck",
  "wallet", "ratecheck", "totalcheck", "checkout", "commcheck","exchangedcheck","button","click","wallet-js"]

  static values = {
    key: String
  }

  connect() {
    // setting a data-action for the amount input field
    this.amountTarget.outerHTML = '<input data-action="keyup->currency#selectAmount" class="form-control numeric float required" data-currency-target="amount" type="number" step="any" name="transaction[amount]" id="transaction_amount">'
    // declaring a variable to store the currency symbols from the first API call
    let currencies;
    fetch('https://api.frankfurter.app/latest?from=EUR')
    .then(response => response.json())
    .then((data) => {
      currencies = Object.keys(data.rates);
    })
    // after the first API call is done, we make a second API call to get the currency symbols
    // using .then so we can get the data stored in [currencies]
    .then(() => {
      // fetching a request from backend (transactions_controller.rb/proxy)
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
        // if the API call is successful, if the currency symbols are NOT included in the array of [currencies] we push them in
        Object.keys(data.rates).forEach((key) => {
          if (currencies.includes(key) === false){
            currencies.push(key)
          }
        })
        // we sort the array of [currencies] alphabetically and we iterate through it to create the options for the select field
        currencies.sort().forEach((symbol) => {
          this.currencyTarget.insertAdjacentHTML('beforeend', `<option data-currency-target="tag" data-action="click->currency#selectCurrency" value="${symbol}">${symbol}</option>`)
        })
      });
    })
  }

  selectCurrency(){
    // checking if the amount input field is empty or not
    if (this.amountTarget.value === ''){
      this.#alertamount()
    } else {
      let currencies;
      fetch('https://api.frankfurter.app/latest?from=EUR')
      .then(response => response.json())
      .then((data) => {
        currencies = Object.keys(data.rates);
      })
      .then(() => {
        // after the API call depending on the currency selected we check if it's included in the array of [currencies]
        // if it is we call the #frankfurter method, if it's not we call the #exchangeApi method
        if(currencies.includes(this.currencyTarget.value)){
          this.#frankfurter()
        } else {
          console.log(this.currencyTarget.value);
          this.#exchangeApi()
        }
      })
    }
  }

  selectAmount(){
    // selecting the button element id = button-exc
    var element = document.getElementById('button-exc')
    // checking if the amount input field is empty or not
    if (this.amountTarget.value !== ''){
      // if the amount input field is not empty we check if the button element is present in the DOM
      if (document.body.contains(element)){
        // if the button element is present in the DOM we call the #fetchController and depending on the currency we call the #frankfurter or #exchangeApi method
        let currency = [];
        this.#fetchController(currency)
          if(currency.includes(this.currencyTarget.value)){
            this.#frankfurter()
          } else {
            this.#exchangeApi()
          }
        // we remove the disabled class from the button element
        this.clickTarget.classList.remove("disabled")
      }
    } else {
      // if the amount input field is empty we call the #checkout method and we add the disabled class to the button element
      this.#checkout()
      if (document.body.contains(element)){
        this.clickTarget.classList.add("disabled")
       }
    }
  }

  #frankfurter(){
    // fetching a request from th API
    fetch(`https://api.frankfurter.app/latest?from=${this.walletTarget.value}&to=${this.currencyTarget.value}`)
    .then(response => response.json())
    .then((data) => {
      // if the API call is NOT successful we call the #alertcurrency method
      if (data.message === "not found") {
        this.#alertcurrency()
      } else {
        // if the API call is successful we call the #checkout method and we remove the disabled class from the button element
        this.#checkout(data)
        var element = document.getElementById('button-exc')
        if (document.body.contains(element)){
          this.clickTarget.classList.remove("disabled")
        }
      }
    })
  }

  #exchangeApi(){
    // fetching a request from backend (transactions_controller.rb/proxy)
    const url =  "/transactions/proxy"
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRF-Token": document.getElementsByName('csrf-token')[0].content
      },
      body: JSON.stringify({base: this.walletTarget.value, currency: this.currencyTarget.value, access_key: this.keyValue})
    })
    .then(response => response.json())
    .then((data) => {
      // if the API call is successful we call the #checkout method and we remove the disabled class from the button element
      if (data.success === true) {
        var element = document.getElementById('button-exc')
        if (document.body.contains(element)){
          this.clickTarget.classList.remove("disabled")
        }
        this.#checkout(data)
      } else {
        // if the API call is NOT successful we call the #alertcurrency method
        this.#alertcurrency()
      }
    })
  }

  #alertcurrency(){
    // using sweetalert2 we crate a pop-up message to alert the user that the currency is not available for exchange
    Swal.fire({
      confirmButtonText: 'Try another currency',
      icon: "warning",
      // in local environment we use the localhost link for the complete list of currencies => http://localhost:3000/currency
      html: `<div class="card">
      <p><strong>Sorry you can't exchange this currency!</strong></p>
      <br>
      <br>
      <p style="margin-bottom: 5px">You can't use <strong>${this.walletTarget.value}</strong> as a base currency.<p>
      <p>Check the complete list <a id="sweet" href="https://www.offchangex.com/currency">    HERE</a></p>
      </div>`,
    });
    // if the alert is been triggered we add the id to the button
    this.buttonTarget.childNodes[1].outerHTML = '<input id="button-exc" type="submit" data-currency-target="click" name="commit" value="Exchange" class="btn btn btn-create-transaction" data-disable-with="Exchange">'
    this.clickTarget.classList.add("disabled")
    let element = document.getElementById('button-exc')
    // we select all the options from the select wallet field
    let list = this.walletTarget.options;
    // we iterate through the options and add the .wallet-js class to all the options except the first one
    for (var i = 0; i < list.length; i++) {
      if (i >= 1) {
        list[i].outerHTML = `<option class="wallet-js" value="${list[i].value}">${list[i].value}</option>`
      }
    }
    // we select all the options with the .wallet-js class
    let collection = document.querySelectorAll('.wallet-js')
    // we iterate through the options and we add an event listener to each one
    collection.forEach((element) => {
      element.addEventListener('click', (event) => {
        let currency = [];
        // we call the #fetchController and depending on the currency we call the #frankfurter or #exchangeApi method
        this.#fetchController(currency)
          if(currency.includes(this.currencyTarget.value)){
            this.#frankfurter()
          } else {
            this.#exchangeApi()
          }
      })
    })
  }

  #alertamount(){
    // using sweetalert2 we crate a pop-up message to alert the user that the amount is not valid
    Swal.fire({
    confirmButtonText: 'Insert a valid amount',
    icon: "warning",
    html: `<div class="card">
    <p><strong>Sorry you have to put a valid amount!</strong></p>
    <br>
    <br>
    <p style="margin-bottom: 5px">You are amount must be grater than 0.<p>
    </div>`,
  });
  // if the alert is been triggered we add the id to the button and the disabled class
  this.buttonTarget.childNodes[1].outerHTML = '<input id="button-exc" type="submit" data-currency-target="click" name="commit" value="Exchange" class="btn btn btn-create-transaction" data-disable-with="Exchange">'
  this.clickTarget.classList.add("disabled")
  }

  #checkout(data){
    // if the amount input field is empty we reset all the values
    if (this.amountTarget.value === ''){
      this.ratesTarget.value = ""
      this.ratesTarget.innerHTML = ""
      this.amountcheckTarget.lastChild.nodeValue = "--"
      this.walletscheckTarget.innerHTML = "--"
      this.ratecheckTarget.innerHTML = "--"
      this.exchangedcheckTarget.innerHTML = "--"
      this.totalcheckTarget.lastChild.nodeValue = "--"
    } else {
      // if the amount input field is NOT empty we set the values from the different API responses
      // the API response for both API's is similar so we can use only one method to set the values
      this.ratesTarget.value = ""
      this.ratesTarget.innerHTML = ""
      this.ratesTarget.value = Object.values(data.rates)[0]
      this.ratesTarget.innerHTML = Object.values(data.rates)[0]
      this.amountcheckTarget.lastChild.nodeValue = `     ${this.amountTarget.value} €`
      this.walletscheckTarget.innerHTML = `<strong>${this.walletTarget.value} → ${this.currencyTarget.value}</strong>`
      this.ratecheckTarget.innerHTML = `<strong>${this.ratesTarget.value}</strong>`
      this.exchangedcheckTarget.innerHTML = `      ${(this.amountTarget.value * this.ratesTarget.value ).toFixed(2)} ${this.currencyTarget.value}`
      this.totalcheckTarget.lastChild.nodeValue = `      ${parseFloat(this.amountTarget.value) + parseFloat(this.commcheckTarget.lastChild.nodeValue)}`
    }
  }

  #fetchController(array){
    // fetching a request from backend (pages_controller.rb/currency)
    fetch('/currency', {
      method: 'GET',
          headers: {
            'Accept': 'application/json'
    }
    })
    .then(response => response.json())
    .then((data) => {
      // iterating through the API response and pushing the currency symbols in the array passed as argument
      data.rates.forEach((symbol) => {
        array.push(symbol)
      })
    })
  }
}
