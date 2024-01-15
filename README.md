
# [OffChangeX](https://www.offchangex.com/)

A new way to exchange currency when travelling!


![Logo](https://www.offchangex.com/assets/logo-9369f4cd61bc09b214431f596a0c2185b0b92c7576c358efec9a0210ccf33bec.png)


## Authors

<img src="http://ForTheBadge.com/images/badges/built-with-love.svg" />   by the ![Web development bootcamp](https://www.lewagon.com) team.

- [@Fr4nsy32](https://github.com/Fr4nsy32)
- [@VanessaMarchiori](https://github.com/VanessaMarchiori)
- [@MattRobinson](https://github.com/MattRobinson)
- [@annacaff](https://github.com/annacaff)



## Concept
An application designed for frequent and occasional travellers who want to exchange money abroad 🌍.
The basic concept of OffChangeX is to provide an easy way to exchange cash currency when travelling, without high fees and with a trusted network of partners around the world 🤝.

## Main tools
🛠️ The app is built on Rails using [Hotwire Stimulus](https://stimulus.hotwired.dev/) for Javascript.

💰 The exchange process is run thorugh two API's :
- [API](https://exchangeratesapi.io/) as an endpoint for EUR (140 currency).
- [API](https://www.frankfurter.app/) as endpoint with multiple currencies as a base (30 currencies)

⚠️ Sweetalert2 to communicate with the user for validations and a dedicated page to check the currencies you can use.

📌 The map can be accessed via the [Mapbox](https://www.mapbox.com/) API using a custom map. Partners are displayed as a pin geolocated from the store address;
the 'Near Me' feature [geolocates live](https://github.com/alexreisner/geocoder) and displays the nearest partner on the map and as a list.

🔢 Using the unique code of a partner (displayed on the map page => list of stores), you can select the store where you wish to exchange. You can check if the shop is the right one below the form.

🔒 [Devise login](https://github.com/heartcombo/devise) and [Pundit Gem](https://github.com/varvet/pundit) secure every page and action in app.

## Limits

- Only EUR can be used as the base currency for most of the currency.

- <s>Only 10 currencies supported.</s> ✅

- JS mainly supported on Mozilla Firefox

- Stripe integration for main wallet does not update balance live.

- After using the Near Me feature, a complete reload of the page is required to see the map and all partners again.

💪 As a team we are actively looking to solve these limitations and add new features, if anyone is inspired by this little project feel free to contribute or contact us for more information.
## Work in progress

- Stripe webhook to get live updates after the top up of the wallet.

- A chart for the recent rates of the currencies.

- Improve the performaces and some minors bugs.

- <s>Integrate a new API for the exchange so more base currency are supported.</s> ✅

## Screenshots

<p>Here are some screenshots to take a look to the app. Feel free to use the the app with the login details:</p>
<p>email: user@example.com</p>
<p>password: password </p>

<br>

<h3> HOMEPAGE : ⬇️ </h3>

![Homepage](/app/assets/images/Screenshot%202024-01-11%20163651.png)

<br>
<h3> WALLETS : ⬇️ </h3>

![Wallets](/app/assets/images/Wallet.png)


<br>
<h3> EXCHANGE CURRENCY : ⬇️ </h3>



https://github.com/Fr4nsy32/off-change-x/assets/62887350/f0cbe90d-552e-40f7-aefc-4b364023ec1f




<br>
<h3> SEARCH ON THE MAP : ⬇️ </h3>



https://github.com/Fr4nsy32/off-change-x/assets/62887350/c7876be3-5f9c-4f57-b4ca-ed91d35bd5be


<br>

<h3> MAIN WALLET DETAILS : ⬇️ </h3>

https://github.com/Fr4nsy32/off-change-x/assets/62887350/0c957b0f-2c27-4fd9-8017-e5f4a7edaa71



<br>
<h3> FIND A STORE : ⬇️ </h3>


https://github.com/Fr4nsy32/off-change-x/assets/62887350/ed41789f-8518-4b69-a3bb-72e273c7dbd7










