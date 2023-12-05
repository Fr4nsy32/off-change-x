
document.addEventListener('DOMContentLoaded', function () {
  // simulation data (to replace this with real data from API later)
  const currencyPairs = ['EUR/USD', 'EUR/GBP', 'EUR/CHF'];
  const currencyValues = [1.12, 0.85, 1.07];

  // function to update the currency pairs and values on the page
  function updateCurrencyPairs() {
    const currencyPairsDiv = document.getElementById('currency-pairs');

    // clear existing content
    currencyPairsDiv.innerHTML = '';

    // create and append new content
    for (let i = 0; i < currencyPairs.length; i++) {
      const pairDiv = document.createElement('div');
      pairDiv.innerHTML = `<span>${currencyPairs[i]}:</span> ${currencyValues[i]}`;
      currencyPairsDiv.appendChild(pairDiv);
    }
  }

  // initial update
  updateCurrencyPairs();
});
