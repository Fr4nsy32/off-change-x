
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

💰 The exchange process is run thorugh this [API](https://exchangeratesapi.io/) as an endpoint for the latest rates.

📌 The map can be accessed via the [Mapbox](https://www.mapbox.com/) API using a custom map. Partners are displayed as a pin geolocated from the store address;
the 'Near Me' feature geolocates live and displays the nearest partner on the map and as a list.

🔢 Using the unique code of a partner (displayed on the map page => list of stores), you can select the store where you wish to exchange. You can check if the shop is the right one below the form.

🔒 [Devise](https://github.com/heartcombo/devise) login and [Pundit Gem](https://github.com/varvet/pundit) secure every page and action in app.

## Limits

- Only EUR can be used as the base currency for the exchange.

- Only 10 currencies supported.

- Stripe integration for main wallet does not update balance live.

- After using the Near Me feature, a complete reload of the page is required to see the map and all partners again.

💪 As a team we are actively looking to solve these limitations and add new features, if anyone is inspired by this little project feel free to contribute or contact us for more information.
## Work in progress

- Stripe webhook to get live updates after the top up of the wallet.

- A chart for the recent rates of the currencies.

- Improve the performaces and some minors bugs.

- Integrate a new API for the exchange so more base currency are supported.

## Screenshots

<p>Here are some screenshots to take a look to the app. Feel free to use the the app with the login details:</p>
<p>email: user@example.com</p>
<p>password: password </p>

<br>

<h3> HOMEPAGE : ⬇️ </h3>

![Homepage](/app/assets/images/Screenshot%202024-01-11%20163651.png)


<h3> WALLETS : ⬇️ </h3>

![Wallets](/app/assets/images/Wallet.png)


<h3> FIND A STORE : ⬇️ </h3>

https://github.com/Fr4nsy32/off-change-x/assets/62887350/c9c734a2-00c5-4b92-ab8e-36982d151d60


<h3> SEARCH ON THE MAP : ⬇️ </h3>

https://github.com/Fr4nsy32/off-change-x/assets/62887350/dac47e40-0815-4eaf-a4cb-0bf94f4aaa13


<h3> EXCHANGE CURRENCY : ⬇️ </h3>

https://github.com/Fr4nsy32/off-change-x/assets/62887350/bd5cf277-b274-4376-b193-831568cb349f
