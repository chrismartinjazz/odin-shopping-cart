# odin-shopping-cart Planning

## Spec

- At least two pages with persistent navigation bar
  - Home page
    - Images and basic layout
  - Shop page
    - Navigation bar displays number of items in cart with button to checkout and pay (inactive button)
    - Card elements for products
      - Product title
      - Input field for number of items to buy
      - Increment "+" and Decrement "-" button to fine-tune number of items
      - "Add to Cart" button
    - Shop items are fetched from [FakeStore API](https://fakestoreapi.com/)
    - After order submitted, the amount on the cart itself should adjust accordingly

Additionally:

- No props validation errors - use PropTypes
- Test using React Testing Library
  - Don't test `react-router-dom` directly
- Style application using CSS Modules
- Deploy to Netlify

## My implementation

The description of the Shopping Cart being in the Navbar is confusing me - typically Shopping Cart icons are in the Navbar but the cart itself will be a modal or its own distinct page (the total cost and list of items won't be in the Navbar). The Amazon website has a vertical column that appears once the shopping cart has an item in it, listing the subtotal, item, quantity, remove button. Also a button to go to the cart as its own page.

```txt
+----------------------------------------------------------+
|     NAVBAR                            1 Basket->|Subtotal|
|-------------------------------------------------|        |
|                                                 | ... ...|
|     SHOP                                        |        |
```

The Cart column has:

```txt
Subtotal
$XXX.XX

+----------+
|Go to cart|
+----------+

------------
[ITEM IMAGE]

$XXX.XX

+----+
|1 V |        (Down arrow next to the number, clicking opens up a simple quantity selector)
+----+

 🗑
------------
[ITEM IMAGE]

...etc
```

So I think I will do this as a grid with Navbar, Shop and Cart, where Cart ~~only shows if it has items in it~~ can be toggled to display or hide by the user.

```txt
+---------------------------------------------------+-------+
| HOME  SHOP                                        | CART  |
+---------------------------------------------------|       |
|               (SHOP)                              |       |
|                                                   |       |
| ITEM      ITEM      ITEM      ITEM                |       |
|                                                   |       |
|                                                   |       |
```

Each Item:

Example data...

- id: 1
- title: Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
- price: $109.95
- image: [image](https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg)

```txt
+-------------------------------+
|                               |
|         IMAGE                 |
|                               |
| $100.00                       |
|                               |
| TITLE                         |
|        +------------------+   |
| QTY:   |  🛒Add to Cart  |   |
| - 1 +  |                  |   |
|        +------------------+   |
|                               |
+-------------------------------+
```

## Steps

- DONE Research shopping cart designs and decide initial design
- DONE home `/` and `shop` routes, `<Navbar />` navigates to each
- DONE localStorage for API request and error handling
- `<Shop />`
  - DONE list of products from API
  - DONE Show set of product cards
- DONE Shop item `<Card />`
- DONE Add `cart` to state
- `<Cart />` sidebar shows list of products in Cart
- DONE Basic home page on `<App />`
- DONE Layout using ~~Grid~~ or **Flexbox**
- DONE Styling