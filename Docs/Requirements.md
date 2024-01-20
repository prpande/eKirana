# Requirements for eKirana (Grocery/Food delivery app)

## Back end Requirements

### Authorization/Security Requirements

1. Users should be able to securely login into the application to view protected content or perform protected steps.
2. Users should be able to store their credentials securely in a database.
3. Secure tokens should be generated to allow access to secure views/content.  

### User Management Requirements

1. Details of all application users should be stored in a database allowing CRUD operations on the entries.
2. Users should be able to register themselves on the application providing information like username, password, userType, email, address etc.
3. Users should be able to update/modify their information.

### Product Management Requirements

1. All product details should be stored in a database allowing CRUD operations on the entries.
2. User with type `seller` only should be able to add products available on sale by them providing information like productId, product name, description, stock etc.
3. `seller` should be able to update/delete product items for sale.
4. Product availability and count should automatically be handled on order placement.
5. `seller` should be able to query all the products on sale by them.  
6. `customer` should be able to query all the products on sale.

### Order Management Requirements

1. All the order details should be stored in a database allowing CRUD operations on the entries.
2. `customer` should be able to add products and their quantities to their carts. (FE feature)
3. `customer` should be able to place orders with the items in their carts.
4. `customer` should be able to query all their orders and check their status.
5. Details for the order should be populated using the details entered during `customer` & `seller` user registration.
6. `seller` should be able to query all the orders placed for their products.

## Front End requirements

### Header

1. Header should provide users links to login/ register to the application.
2. Header should provide users links to get to the landing view.

### Landing view

1. Application should have an aesthetically pleasing landing view for users to interact with.
2. Landing view should display the products for sale.
3. Landing view should provide the ability to filter items based on category, price etc.
4. Landing view should provide the ability to search for products based on their name/description/specifications.

### Login view

1. Login view should allow user to enter username and password to  login into the application.
2. Login view should raise appropriate alert in case of invalid credentials/ failure to login.

### Register User view

1. Register User view should allow user to enter their personal information in order to register with the application
2. Register User view should check validity of inputs
3. Register User view should alert if the username is already taken/registered.
4. Register User view should alert appropriately if the registration is unsuccessful.
5. Register User view should prevent accidental navigation to other pages if the registration process is not complete.
6. Register User view should ask for shop details if registering as a `seller` along with required govt. IDs/numbers like GSTIN etc.
7. Register User view should ask for mode of transportation, capacity and preferred locality if registering as a `carrier`.

### User Dashboard view

1. `seller` after logging should be routed to this view and shown the list of their orders with option to add/update/remove products and inventory.
2. `customer` should be able to view all their previous orders and their status on this view with option to cancel/track order.
3. Users should be able to search the orders based on product name.
4. `carrier` should be able to see the available deliveries within a certain radius of his location and select them.

### User Information view

1. Users should be taken to their personal information view on selecting the related link.
2. Users should have provision to navigate to their dash board from this view.

### Product Information view

1. Users should be taken to this view on clicking on a product card.
2. View should have provision to add the item and quantity to their cart.

### Cart view

1. Cart view should be visible on the right hand side of the page whenever the cart is not empty and list all the items in the user's cart.
2. Cart view should allow users to change item quantity in the cart
3. Cart view should have a provision for the user to proceed to placing the order going to the Order view.

### Order view

1. Order view should allow users to view/edit the delivery location fetched from the user address in the database.
2. It should indicate the total sum for the order.
3. It should display a confirmation prompt after an order has been successfully placed.
4. It should prevent accidental navigation to other pages if the order placement process is not complete.
5. It should accept and process payment information from the user when placing an order.

### Page not found view

1. Page not found view should be displayed if user tries to access a non-existent endpoint.