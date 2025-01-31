# odin-shopping-cart

Created for [The Odin Project](https://www.theodinproject.com/)

Test shopping cart to practice retrieving data from an API and building a UI to add items to the cart.

## Features

- Shopping Cart toggled on and off by cart button in top right.
- Items can be added, quantity updated.
- Calculates total cost for each item * quantity, and the total cart, and displays this in the cart.
- Cart persists when navigating between Home and Shop.
- Independent scroll bars for shop and cart.

## Code

- Uses a requestData and localStorage module to store and retrieve data in place of the API, when a request has already been made by the browser on that date, to reduce unnecessary API calls. These modules are largely independent of the rest of the implementation, with only a hard-coded baseURL in requestData.
- Uses a Layout element to manage showing and hiding Cart.
- Avoids useContext as a constraint of the project.

## Design

- Based on the location of the cart in the desktop Amazon website.
- Uses a similar button layout and design to Amazon, adapted to the requirements of the project to include increment / decrement / type in value for each item card.