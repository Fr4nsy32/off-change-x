import { Controller } from "@hotwired/stimulus"
import { Chart } from "chart.js";


// Connects to data-controller="chart"
export default class extends Controller {

static targets = ["usd","aud","gbp","date","buttonGBP","buttonAUD","buttonUSD","canvUsd","canvAud","canvGbp"]

  connect() {
    this.rates()
    setInterval(this.rates.bind(this), 60000)
  }

  rates(){
    fetch(`https://api.frankfurter.app/latest?from=EUR`)
    .then(response => response.json())
    .then((data) => {
        this.usdTarget.childNodes[5].childNodes[1].innerHTML = `1 EUR = ${data.rates.USD.toFixed(3)} USD `
        this.audTarget.childNodes[5].childNodes[1].innerHTML = `1 EUR = ${data.rates.AUD.toFixed(3)} AUD`
        this.gbpTarget.childNodes[5].childNodes[1].innerHTML = `1 EUR = ${data.rates.GBP.toFixed(3)} GBP`
    })
    fetch(`https://api.frankfurter.app/latest?from=USD`)
    .then(response => response.json())
    .then((data) => {
        this.usdTarget.childNodes[5].childNodes[3].innerHTML = `1 USD = ${data.rates.EUR.toFixed(3)} EUR`
    })
    fetch(`https://api.frankfurter.app/latest?from=AUD`)
    .then(response => response.json())
    .then((data) => {
        this.audTarget.childNodes[5].childNodes[3].innerHTML = `1 AUD = ${data.rates.EUR.toFixed(3)} EUR`
    })
    fetch(`https://api.frankfurter.app/latest?from=GBP`)
    .then(response => response.json())
    .then((data) => {
        this.gbpTarget.childNodes[5].childNodes[3].innerHTML = `1 GBP = ${data.rates.EUR.toFixed(3)} EUR`
    })
  }

  openChart(event){
    const button = event.currentTarget.dataset.chartTarget
    const months = ['01','02','03','04','05','06','07','08','09','10','11','12'].reverse();
    const date = new Date()
    const month = date.getMonth()
    const period = months[month + 6]
    // fetch(`https://api.frankfurter.app/2023-${month + 1 + 6 }-01..?from=EUR&to=USD,GBP,AUD`)
    fetch(`https://api.frankfurter.app/2023-${period}-01..?from=EUR&to=USD,GBP,AUD`)
    .then(response => response.json())
    .then((data) => {
      const result = this.#rates(data, month, button)
      if (button === 'buttonUSD') {
          this.#chart(this.canvUsdTarget, result, month)
          this.usdTarget.classList.remove('currency-rectangle')
          this.usdTarget.classList.add('favorite')
          this.canvUsdTarget.classList.add('canv-gr')
          this.canvUsdTarget.classList.remove('d-none')
        } else if (button === 'buttonAUD') {
          this.#chart(this.canvAudTarget, result, month)
          this.audTarget.classList.remove('currency-rectangle')
          this.audTarget.classList.add('favorite')
          this.canvAudTarget.classList.add('canv-gr')
          this.canvAudTarget.classList.remove('d-none')
        } else {
          this.#chart(this.canvGbpTarget, result, month)
          this.gbpTarget.classList.remove('currency-rectangle')
          this.gbpTarget.classList.add('favorite')
          this.canvGbpTarget.classList.add('canv-gr')
          this.canvGbpTarget.classList.remove('d-none')
        }
    })

  }

  #rates(data, month, element){
    let rates = []
    let firstMonth = []
    let secondMonth = []
    let thirdMonth = []
    let fourthMonth = []
    let fifthMonth = []
    let sicthMonth = []
    Object.keys(data.rates).forEach((value) => {
      let dateFirst = Object.values(data.rates[`${value}`])
        if (value.split('')[6] === `${month + 1 + 6}`) {
          if (element === 'buttonAUD') {
            firstMonth.push(dateFirst[0])
          } else if (element === 'buttonUSD') {
            firstMonth.push(dateFirst[2])
          }  else if (element === 'buttonGBP') {
            firstMonth.push(dateFirst[1])
          }
        }
        if (value.split('')[6] === `${month + 2 + 6}`) {
          if (element === 'buttonAUD') {
            secondMonth.push(dateFirst[0])
          } else if (element === 'buttonUSD') {
            secondMonth.push(dateFirst[2])
          }  else if (element === 'buttonGBP') {
            secondMonth.push(dateFirst[1])
          }
        }
        if (value.split('')[6] === `${month + 3 + 6}`) {
          if (element === 'buttonAUD') {
            thirdMonth.push(dateFirst[0])
          } else if (element === 'buttonUSD') {
            thirdMonth.push(dateFirst[2])
          }  else if (element === 'buttonGBP') {
            thirdMonth.push(dateFirst[1])
          }
        }
        if ((value.split('')[5] + value.split('')[6]) === `10`) {
          if (element === 'buttonAUD') {
            fourthMonth.push(dateFirst[0])
          } else if (element === 'buttonUSD') {
            fourthMonth.push(dateFirst[2])
          }  else if (element === 'buttonGBP') {
            fourthMonth.push(dateFirst[1])
          }
        }
        if ((value.split('')[5] + value.split('')[6]) === `11`) {
          if (element === 'buttonAUD') {
            fifthMonth.push(dateFirst[0])
          } else if (element === 'buttonUSD') {
            fifthMonth.push(dateFirst[2])
          }  else if (element === 'buttonGBP') {
            fifthMonth.push(dateFirst[1])
          }
        }
        if ((value.split('')[5] + value.split('')[6]) === `12`) {
          if (element === 'buttonAUD') {
            sicthMonth.push(dateFirst[0])
          } else if (element === 'buttonUSD') {
            sicthMonth.push(dateFirst[2])
          }  else if (element === 'buttonGBP') {
            sicthMonth.push(dateFirst[1])
          }
        }

    })

    let allMonths = []
    allMonths.push(firstMonth, secondMonth, thirdMonth, fourthMonth, fifthMonth, sicthMonth)
    let rateMonth = []
      allMonths.forEach((arrRate) => {
        let sum = 0
        arrRate.forEach((value) => {
          sum += value
        })
        let tot = sum / arrRate.length
        rateMonth.push(tot.toFixed(4))
      })
      return rateMonth
  }

  #chart(target, result, month){
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    new Chart(
      target,
      {
        type: 'line',
        data: {
          labels: [[months[month + 6]], [months[month + 7]], [months[month + 8]], [months[month + 9]], [months[month + 10]], [months[month + 11]]],
          datasets: [{
            label: 'Last 6 months',
            data: result,
            fill: false,
            borderColor: 'rgb(98, 42, 163)',
            pointBackgroundColor: 'rgb(255, 189, 89)',
            tension: 0.1
          }]
        }
      }
      )
  }

}
