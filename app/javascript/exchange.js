document.addEventListener('DOMContentLoaded', function () {
  // Simulated data (replace this with real data from your API later)
  const currencyPairs = ['EUR/USD', 'EUR/GBP', 'EUR/CHF'];
  const currencyValues = [1.12, 0.85, 1.07];

  // Function to update the currency pairs and values on the page
  function updateCurrencyPairs() {
    const currencyPairsDiv = document.getElementById('currency-pairs');

    // Clear existing content
    currencyPairsDiv.innerHTML = '';

    // Create and append new content as an unordered list
    const list = document.createElement('ul');
    for (let i = 0; i < currencyPairs.length; i++) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<span>${currencyPairs[i]}:</span> ${currencyValues[i]}`;
      list.appendChild(listItem);
    }

    // Append the list to the container
    currencyPairsDiv.appendChild(list);
  }

  // Initial update
  updateCurrencyPairs();
});
