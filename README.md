# Food Delivery App

This repository contains a food delivery application with a full user and admin functionality. The app allows users to explore restaurants, place orders, track deliveries, and manage their profiles, while admins can manage restaurant settings and orders. Delivery partners can also access the app to manage delivery tasks.

## App Structure

### Home Page

The **Home Page** (`/`) is the main page where users can access all the features. From here, users can navigate to:

- **Login/Sign Up**: For users to create or access their accounts.
- **Admin Login/Sign Up**: If someone wants to sign up or log in as a restaurant admin.
- **User Profile** (if logged in as a user).
- **Admin Profile** (if logged in as an admin).
- **Delivery Partner Link**: A link for individuals who want to be delivery partners.

---

## Features

### If logged in as User:

- **Restaurants**: View available restaurants.
- **Delivery Time**: See estimated delivery time for each restaurant.
- **Dine-in Option**: Check if dine-in is available.
- **Search**: Search for restaurants.
- **Sales**: View ongoing sales at any restaurants.
- **Restaurant Timings**: Check the restaurant's closing time or how much time is left before closing.
- **Make Payment**: Complete payments via UPI, debit card, or credit card.
- **Order Status**:

  - A pop-up notification showing order status (accepted or not).
  - Track driver location.
  - View order ID, delivery time, bill details.
  - Add a tip for the delivery person.
  - Share status with someone else.
  - Option to cancel the order.

- **User Profile**:
  - View profile with:
    - Username
    - Last name
    - Address
    - Birthday
    - Orders
    - Available coupons
  - **Logout** option.

### If logged in as Admin:

- **Restaurant Management**:
  - Turn the restaurant on or off.
  - Add restaurant timings.
  - Check food availability.
  - Accept or reject orders.
  - Add items to the menu.
  - Create categories.
  - Upload images of food items.
  - Mark orders as picked up when the delivery person takes the order.

---

### If Order is Delivered:

- Users can rate the delivery experience.
- Users can file complaints in case of bad behavior.
- Users can add a tip for the delivery person.

---

## Navigation Structure

```js
if(logged === 'user') {
    // User Navigation
    home, dine-in, profile
}

if(logged === 'admin') {
    // Admin Navigation
    home, orders, dashboard
}
```

## to generate Random key

```
 node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"

```

# Postman

## Users

```
http://localhost:3000/api/users/login
http://localhost:3000/api/users/register

```

## Admin

```
http://localhost:3000/api/adminusers/alogin
http://localhost:3000/api/adminusers/aregister

```

## Menu

```
http://localhost:3000/api/menu/view
http://localhost:3000/api/menu/

```
