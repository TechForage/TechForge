# TechForge E-Commerce Backend API Documentation

Professional REST API reference for the TechForge e-commerce backend — Authentication, Category, Brand, Product, Cart, Wishlist, Order, and Review modules.

**Base URL**

```text
http://localhost:5000/api
```

> Replace with your deployed base URL once in production. No `/v1` version prefix — routes are mounted directly under `/api`.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Authentication](#2-authentication)
3. [Category Module](#3-category-module)
4. [Brand Module](#4-brand-module)
5. [Product Module](#5-product-module)
6. [Cart Module](#6-cart-module)
7. [Wishlist Module](#7-wishlist-module)
8. [Order Module](#8-order-module)
9. [Review Module](#9-review-module)
10. [Query Parameters](#10-query-parameters)
11. [Validation Rules](#11-validation-rules)
12. [Error Responses](#12-error-responses)
13. [Thunder Client Testing Guide](#13-thunder-client-testing-guide)
14. [Data Relationships](#14-data-relationships)
15. [API Summary Table](#15-api-summary-table)

---

## 1. Project Overview

TechForge is a REST API backend for an e-commerce platform. It handles user authentication, a product catalog (categories, brands, products), and the full purchase lifecycle (cart, wishlist, orders, reviews).

### Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Atlas) |
| ODM | Mongoose |
| Auth | JWT (Bearer token) |
| Architecture | Route → Controller → Repository → Model |
| API Docs | Scalar + swagger-jsdoc (OpenAPI 3.0), served at `/docs` |

### Architecture note

Every module follows the same layering: **routes** define paths and JSDoc; **controllers** validate input, call the repository, and shape the HTTP response; **repositories** hold all Mongoose/database access and business-rule checks (duplicates, existence, stock). Controllers never import a Mongoose model directly.

### Features

- JWT authentication: register, login, logout (session-based token revocation)
- Full CRUD for Categories, Brands, and Products, with Product referencing Category/Brand via ObjectId and auto-population on read
- Cart with automatic quantity merging, stock validation, and total price calculation
- Wishlist with duplicate prevention
- Orders created transactionally from the cart (stock decremented, cart cleared, price snapshotted)
- Reviews restricted to purchasers, one per product per user, with automatic Product rating/numReviews recalculation
- Consistent JSON response shape across all endpoints (see [Error Responses](#12-error-responses))
- Interactive OpenAPI documentation at `/docs`

### Folder Structure

```text
src/
├── config/
├── controllers/
│   ├── auth.controller.js
│   ├── category.controller.js
│   ├── brand.controller.js
│   ├── product.controller.js
│   ├── cart.controller.js
│   ├── wishlist.controller.js
│   ├── order.controller.js
│   └── review.controller.js
├── docs/
│   └── swagger.js
├── middleware/
│   ├── error.middleware.js
│   └── auth.middleware.js
├── models/
│   ├── User.js
│   ├── Category.js
│   ├── Brand.js
│   ├── Product.js
│   ├── Cart.js
│   ├── Wishlist.js
│   ├── Order.js
│   └── Review.js
├── repositories/
│   ├── auth.repository.js
│   ├── category.repository.js
│   ├── brand.repository.js
│   ├── product.repository.js
│   ├── cart.repository.js
│   ├── wishlist.repository.js
│   ├── order.repository.js
│   └── review.repository.js
├── routes/
│   ├── auth.routes.js
│   ├── category.routes.js
│   ├── brand.routes.js
│   ├── product.routes.js
│   ├── cart.routes.js
│   ├── wishlist.routes.js
│   ├── order.routes.js
│   └── review.routes.js
├── services/
│   └── auth.service.js
├── utils/
│   ├── ApiResponse.js
│   ├── ApiError.js
│   └── generateToken.js
├── app.js
└── server.js
```

---

## 2. Authentication

Base path: `/api/auth`. **Implemented and enforced** — `logout` requires a valid Bearer token; Category/Brand/Product currently do **not** enforce auth, while Cart, Wishlist, Orders, and review write actions all require it.

```http
Authorization: Bearer <JWT_TOKEN>
```

### 2.1 Register

```http
POST /api/auth/register
```

**Request Body**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

**Success — `201 Created`**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0e1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "",
      "avatar": "",
      "role": "user",
      "createdAt": "2026-07-19T09:00:00.000Z",
      "updatedAt": "2026-07-19T09:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresAt": "2026-07-19T10:00:00.000Z"
  }
}
```

**Errors**

| Status | Cause | Body |
|---|---|---|
| 409 | Email already registered | `{ "success": false, "statusCode": 409, "message": "User already exists" }` |
| 500 | Unhandled validation error (e.g. missing `firstName`) or DB error | `{ "success": false, "statusCode": 500, "message": "Internal Server Error" }` |

> ⚠️ Missing required fields currently surface as `500`, not `400` — Mongoose's `ValidationError` isn't caught and re-thrown as an `ApiError(400, ...)` yet.

---

### 2.2 Login

```http
POST /api/auth/login
```

**Request Body**

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

**Success — `200 OK`**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "user": { "_id": "64f1a2b3c4d5e6f7a8b9c0e1", "firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "role": "user" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresAt": "2026-07-19T10:00:00.000Z"
  }
}
```

**Errors**

| Status | Cause | Body |
|---|---|---|
| 401 | Email not found, or password mismatch | `{ "success": false, "statusCode": 401, "message": "Invalid email or password" }` |

---

### 2.3 Logout

```http
POST /api/auth/logout
```

🔒 **Requires** `Authorization: Bearer <token>`.

**Success — `200 OK`**

```json
{ "success": true, "statusCode": 200, "message": "Logout successful", "data": null }
```

**Errors**

| Status | Cause | Body |
|---|---|---|
| 401 | Missing/malformed header, invalid/expired JWT, or session already revoked | `{ "success": false, "statusCode": 401, "message": "Session is no longer active" }` |

---

## 3. Category Module

Base path: `/api/categories`. No auth currently enforced.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/categories` | Create a category |
| GET | `/api/categories` | List all categories |
| GET | `/api/categories/:id` | Get one category |
| PUT | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete a category |

**Create — Request Body**

```json
{ "name": "Electronics", "description": "Electronic products", "image": "electronics.jpg", "isActive": true }
```

**Create — Success `201`**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Category created successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Electronics",
    "description": "Electronic products",
    "image": "electronics.jpg",
    "isActive": true,
    "createdAt": "2026-07-16T09:50:00.000Z",
    "updatedAt": "2026-07-16T09:50:00.000Z"
  }
}
```

**Errors** (apply across create/update)

| Status | Cause |
|---|---|
| 400 | Missing/empty `name`, or malformed `:id` |
| 404 | No category with that `:id` |
| 409 | `name` collides with an existing category |
| 500 | Unexpected server/database error |

All error bodies: `{ "success": false, "statusCode": <code>, "message": "..." }` — see [Error Responses](#12-error-responses).

> **Note:** Deleting a category does not cascade to products referencing it. Population of a deleted category on an existing product will return `null`.

---

## 4. Brand Module

Base path: `/api/brands`. Same shape and behavior as Category — no auth currently enforced.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/brands` | Create a brand |
| GET | `/api/brands` | List all brands |
| GET | `/api/brands/:id` | Get one brand |
| PUT | `/api/brands/:id` | Update a brand |
| DELETE | `/api/brands/:id` | Delete a brand |

**Create — Request Body**

```json
{ "name": "Apple", "description": "Premium electronics brand", "logo": "apple.png", "isActive": true }
```

**Create — Success `201`**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Brand created successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "name": "Apple",
    "description": "Premium electronics brand",
    "logo": "apple.png",
    "isActive": true,
    "createdAt": "2026-07-16T10:00:00.000Z",
    "updatedAt": "2026-07-16T10:00:00.000Z"
  }
}
```

**Errors**: identical pattern to Category (400 validation/ID, 404 not found, 409 duplicate name, 500 server error).

---

## 5. Product Module

Base path: `/api/products`. No auth currently enforced. References `Category` and `Brand` by ObjectId; both are validated to exist before create/update, and populated on every read.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/products` | Create a product |
| GET | `/api/products` | List products (filterable) |
| GET | `/api/products/:id` | Get one product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

**Create — Request Body**

```json
{
  "name": "iPhone 17",
  "description": "Latest smartphone",
  "price": 99999,
  "discountPrice": 94999,
  "stock": 20,
  "brand": "64f1a2b3c4d5e6f7a8b9c0d2",
  "category": "64f1a2b3c4d5e6f7a8b9c0d1",
  "images": ["front.jpg", "back.jpg"],
  "isFeatured": true,
  "isActive": true
}
```

**Create — Success `201`**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Product created successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d4",
    "name": "iPhone 17",
    "price": 99999,
    "discountPrice": 94999,
    "stock": 20,
    "images": ["front.jpg", "back.jpg"],
    "category": { "_id": "64f1a2b3c4d5e6f7a8b9c0d1", "name": "Electronics" },
    "brand": { "_id": "64f1a2b3c4d5e6f7a8b9c0d2", "name": "Apple" },
    "rating": 0,
    "numReviews": 0,
    "isFeatured": true,
    "isActive": true,
    "createdAt": "2026-07-16T10:10:00.000Z",
    "updatedAt": "2026-07-16T10:10:00.000Z"
  }
}
```

**Errors**

| Status | Cause |
|---|---|
| 400 | Missing/invalid `name`, `price`, `stock`; invalid `category`/`brand` ObjectId format |
| 404 | `category`/`brand` is a valid ObjectId but doesn't exist |
| 404 | Product not found (GET/PUT/DELETE by `:id`) |
| 500 | Unexpected server/database error |

---

## 6. Cart Module

Base path: `/api/cart`. 🔒 **All endpoints require** `Authorization: Bearer <token>`. Uses `req.user.id` — one cart per user, created lazily on first add.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/cart` | Get the current user's cart |
| POST | `/api/cart/add` | Add an item (merges quantity if already present) |
| PUT | `/api/cart/update/:productId` | Set an item's quantity to an explicit value |
| DELETE | `/api/cart/remove/:productId` | Remove one item |
| DELETE | `/api/cart/clear` | Empty the cart |

**Add — Request Body**

```json
{ "productId": "64f1a2b3c4d5e6f7a8b9c0d4", "quantity": 2 }
```

**Add — Success `200`**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Item added to cart",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0e5",
    "user": "64f1a2b3c4d5e6f7a8b9c0e1",
    "items": [
      { "product": { "_id": "64f1a2b3c4d5e6f7a8b9c0d4", "name": "iPhone 17", "price": 99999, "discountPrice": 94999, "stock": 20 }, "quantity": 2 }
    ],
    "totalPrice": 189998,
    "createdAt": "2026-07-19T09:30:00.000Z",
    "updatedAt": "2026-07-19T09:30:00.000Z"
  }
}
```

**Update — Request Body**

```json
{ "quantity": 3 }
```

**Errors**

| Status | Cause |
|---|---|
| 400 | Invalid/missing `productId`, invalid/missing `quantity` (< 1), or requested quantity exceeds stock |
| 401 | Missing/invalid JWT |
| 404 | Product not found, cart not found, or item not in cart |
| 500 | Unexpected server/database error |

**Total price** is calculated as `Σ (quantity × unit price)`, where unit price is `discountPrice` if set and `> 0`, otherwise `price`.

---

## 7. Wishlist Module

Base path: `/api/wishlist`. 🔒 **All endpoints require** `Authorization: Bearer <token>`. One wishlist per user, created lazily.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/wishlist` | Get the current user's wishlist |
| POST | `/api/wishlist/add/:productId` | Add a product (rejects duplicates) |
| DELETE | `/api/wishlist/remove/:productId` | Remove a product |

**Success — `200` (add/remove/get)**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Product added to wishlist",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0e6",
    "user": "64f1a2b3c4d5e6f7a8b9c0e1",
    "products": [
      { "_id": "64f1a2b3c4d5e6f7a8b9c0d4", "name": "iPhone 17", "price": 99999, "discountPrice": 94999, "stock": 20 }
    ],
    "createdAt": "2026-07-19T09:35:00.000Z",
    "updatedAt": "2026-07-19T09:35:00.000Z"
  }
}
```

**Errors**

| Status | Cause |
|---|---|
| 400 | Invalid `:productId` |
| 401 | Missing/invalid JWT |
| 404 | Product not found; wishlist not found or product not in it (on remove) |
| 409 | Product already in wishlist (on add) |
| 500 | Unexpected server/database error |

---

## 8. Order Module

Base path: `/api/orders`. 🔒 **All endpoints require** `Authorization: Bearer <token>`. Status updates are **admin-only** (`req.user.role === "admin"`).

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Place an order from the current cart |
| GET | `/api/orders` | List the current user's orders |
| GET | `/api/orders/:id` | Get one order (owner or admin only) |
| PUT | `/api/orders/:id/status` | Update order status (admin only) |

**Create — Request Body**

```json
{
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "+91 9876543210",
    "addressLine1": "221B Baker Street",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "postalCode": "600001",
    "country": "India"
  },
  "paymentMethod": "COD"
}
```

**Create — Success `201`**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Order placed successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0f1",
    "user": "64f1a2b3c4d5e6f7a8b9c0e1",
    "items": [
      { "product": { "_id": "64f1a2b3c4d5e6f7a8b9c0d4", "name": "iPhone 17" }, "quantity": 2, "price": 94999 }
    ],
    "shippingAddress": { "fullName": "John Doe", "phone": "+91 9876543210", "addressLine1": "221B Baker Street", "city": "Chennai", "state": "Tamil Nadu", "postalCode": "600001", "country": "India" },
    "paymentMethod": "COD",
    "paymentStatus": "Pending",
    "orderStatus": "Pending",
    "totalAmount": 189998,
    "createdAt": "2026-07-19T09:40:00.000Z",
    "updatedAt": "2026-07-19T09:40:00.000Z"
  }
}
```

**Update Status — Request Body**

```json
{ "orderStatus": "Shipped" }
```

`orderStatus` enum: `Pending | Confirmed | Packed | Shipped | Delivered | Cancelled`
`paymentStatus` enum: `Pending | Paid | Failed`
`paymentMethod` enum: `COD | Card | UPI | NetBanking`

**What happens on create:** stock is validated for every cart item, a price snapshot (`price` field on each order item) is taken so later product price changes don't retroactively affect past orders, Product stock is decremented, and the cart is cleared — all inside a single MongoDB transaction. Requires a replica-set-backed cluster (Atlas, including the free M0 tier, satisfies this).

**Errors**

| Status | Cause |
|---|---|
| 400 | Missing `shippingAddress`/`paymentMethod`; empty cart; insufficient stock; invalid `:id`; invalid `orderStatus` value |
| 401 | Missing/invalid JWT |
| 403 | Viewing someone else's order without admin role; updating status without admin role |
| 404 | Order not found; a product in the cart no longer exists |
| 500 | Unexpected server/database error |

---

## 9. Review Module

Base paths: `/api/products/:id/reviews` (create/list) and `/api/reviews/:id` (update/delete). 🔒 Create/update/delete require `Authorization: Bearer <token>`; listing is public.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/products/:id/reviews` | Submit a review (must have purchased the product) |
| GET | `/api/products/:id/reviews` | List all reviews for a product |
| PUT | `/api/reviews/:id` | Update your own review |
| DELETE | `/api/reviews/:id` | Delete your own review (or any, if admin) |

**Create — Request Body**

```json
{ "rating": 5, "comment": "Exactly as described, fast shipping." }
```

**Create — Success `201`**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Review submitted successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0f9",
    "user": { "_id": "64f1a2b3c4d5e6f7a8b9c0e1", "firstName": "John", "lastName": "Doe", "avatar": "" },
    "product": "64f1a2b3c4d5e6f7a8b9c0d4",
    "rating": 5,
    "comment": "Exactly as described, fast shipping.",
    "createdAt": "2026-07-19T09:45:00.000Z",
    "updatedAt": "2026-07-19T09:45:00.000Z"
  }
}
```

**"Purchased" definition:** the user has at least one order (any `orderStatus`) containing the product. Tighten this to `Delivered`-only in `review.repository.js` if that better fits your business rules.

Every create/update/delete recalculates the parent Product's `rating` (average, rounded to 1 decimal) and `numReviews`.

**Errors**

| Status | Cause |
|---|---|
| 400 | Invalid `:id`; `rating` outside 1–5 |
| 401 | Missing/invalid JWT |
| 403 | Reviewing a product never purchased; updating/deleting someone else's review (delete allows admin) |
| 404 | Review not found |
| 409 | Already reviewed this product |
| 500 | Unexpected server/database error |

---

## 10. Query Parameters

### Currently supported (`GET /api/products` only)

| Parameter | Type | Description |
|---|---|---|
| `category` | ObjectId string | Filter by category |
| `brand` | ObjectId string | Filter by brand |
| `isFeatured` | `"true"` \| `"false"` | Filter featured products |
| `isActive` | `"true"` \| `"false"` | Filter active/inactive products |

```http
GET /api/products?category=64f1a2b3c4d5e6f7a8b9c0d1&isFeatured=true
```

### Not yet implemented (planned)

| Parameter | Purpose |
|---|---|
| `page`, `limit` | Pagination |
| `search` | Text search across `name`/`description` |
| `sort` | Sort by field |
| `minPrice`, `maxPrice` | Price range filtering |

---

## 11. Validation Rules

### User (Auth)

| Field | Rule |
|---|---|
| `firstName`, `lastName` | Required |
| `email` | Required, unique, lowercased |
| `password` | Required, min length 6, hashed with bcrypt before storage |
| `role` | `user` \| `admin`, defaults to `user` |

### Category / Brand

| Field | Rule |
|---|---|
| `name` | Required, unique, trimmed |
| `description`, `image`/`logo` | Optional |
| `isActive` | Optional, defaults to `true` |

### Product

| Field | Rule |
|---|---|
| `name` | Required |
| `price` | Required, `>= 0` |
| `discountPrice` | Optional, `>= 0` |
| `stock` | Required, `>= 0` |
| `category`, `brand` | Required, valid ObjectId referencing an existing document |
| `rating` | `0`–`5`, defaults to `0` |
| `numReviews` | `>= 0`, defaults to `0` |

### Cart item / Wishlist

| Field | Rule |
|---|---|
| `quantity` | Integer, `>= 1`, cannot exceed available stock |
| Wishlist product | No duplicates per user |

### Order

| Field | Rule |
|---|---|
| `items` | At least one, populated from cart at creation time |
| `shippingAddress` | All fields required except `addressLine2` |
| `paymentMethod` | One of `COD`, `Card`, `UPI`, `NetBanking` |
| `orderStatus` | One of `Pending`, `Confirmed`, `Packed`, `Shipped`, `Delivered`, `Cancelled` |

### Review

| Field | Rule |
|---|---|
| `rating` | Required, integer 1–5 |
| `comment` | Optional |
| Uniqueness | One review per (`user`, `product`) pair, enforced at the database level |
| Eligibility | Must have an existing order containing the product |

---

## 12. Error Responses

Every endpoint in this API — auth, catalog, and cart/wishlist/order/review — returns errors in the same shape, produced by a shared `ApiError` utility:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Human-readable description"
}
```

There is **no separate `error` field** — `message` carries the full detail. Success responses follow the matching `ApiResponse` shape:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Human-readable description",
  "data": { }
}
```

| Status | Meaning |
|---|---|
| **400 Bad Request** | Invalid input, missing required field, malformed ObjectId, insufficient stock |
| **401 Unauthorized** | Missing/malformed `Authorization` header, invalid/expired JWT, revoked session |
| **403 Forbidden** | Authenticated but not permitted (wrong owner, non-admin, unpurchased product) |
| **404 Not Found** | Resource (or a referenced resource) doesn't exist |
| **409 Conflict** | Duplicate unique field (name, wishlist entry, review) |
| **500 Internal Server Error** | Unexpected server/database failure |

---

## 13. Thunder Client Testing Guide

1. **Register** — `POST /api/auth/register` → copy `data.token` into `{{token}}`.
2. **Create Brand** — `POST /api/brands` → copy `_id` into `{{brandId}}`.
3. **Create Category** — `POST /api/categories` → copy `_id` into `{{categoryId}}`.
4. **Create Product** — `POST /api/products` using `{{brandId}}`/`{{categoryId}}` → copy `_id` into `{{productId}}`.
5. **Add to Cart** — `POST /api/cart/add` with `{{token}}` and `{{productId}}`.
6. **Place Order** — `POST /api/orders` with `{{token}}` → copy `_id` into `{{orderId}}`; confirm the cart is now empty and product stock decreased.
7. **Add to Wishlist** — `POST /api/wishlist/add/{{productId}}`.
8. **Submit Review** — `POST /api/products/{{productId}}/reviews` (requires the order from step 6 to exist).
9. **Update Order Status** — `PUT /api/orders/{{orderId}}/status` — requires a token belonging to a user with `role: "admin"`.
10. Test negative cases: invalid ObjectId formats, duplicate names/reviews/wishlist entries, insufficient stock, reviewing an unpurchased product, non-admin status update attempts.

> Set `{{baseUrl}}` to `http://localhost:5000/api` as a Thunder Client environment variable, and set the collection-level `Authorization` header to `Bearer {{token}}` so it applies automatically to protected requests.

---

## 14. Data Relationships

```text
User
 ├─< Cart (1:1, created lazily)
 ├─< Wishlist (1:1, created lazily)
 ├─< Order (1:many)
 └─< Review (1:many, one per Product)

Brand ──┐
        ├──< Product >──┐
Category┘                ├─< CartItem (Cart.items[])
                          ├─< OrderItem (Order.items[], price snapshotted)
                          ├─< Wishlist.products[]
                          └─< Review (product.rating/numReviews recalculated on change)
```

Because Product references Category and Brand, and Cart/Order/Wishlist/Review all reference Product, the typical creation order for a fresh environment is:

```text
1. Register a user
2. Create Brand
3. Create Category
4. Create Product (references Brand + Category)
5. Add Product to Cart / Wishlist
6. Place Order from Cart (references Product, snapshots price, decrements stock)
7. Submit Review for a purchased Product (references Order indirectly via purchase check)
```

---

## 15. API Summary Table

| Module | Method | Endpoint | Auth Required |
|---|---|---|---|
| Auth | POST | `/api/auth/register` | No |
| Auth | POST | `/api/auth/login` | No |
| Auth | POST | `/api/auth/logout` | **Yes** |
| Category | POST | `/api/categories` | No |
| Category | GET | `/api/categories` | No |
| Category | GET | `/api/categories/:id` | No |
| Category | PUT | `/api/categories/:id` | No |
| Category | DELETE | `/api/categories/:id` | No |
| Brand | POST | `/api/brands` | No |
| Brand | GET | `/api/brands` | No |
| Brand | GET | `/api/brands/:id` | No |
| Brand | PUT | `/api/brands/:id` | No |
| Brand | DELETE | `/api/brands/:id` | No |
| Product | POST | `/api/products` | No |
| Product | GET | `/api/products` | No |
| Product | GET | `/api/products/:id` | No |
| Product | PUT | `/api/products/:id` | No |
| Product | DELETE | `/api/products/:id` | No |
| Cart | GET | `/api/cart` | **Yes** |
| Cart | POST | `/api/cart/add` | **Yes** |
| Cart | PUT | `/api/cart/update/:productId` | **Yes** |
| Cart | DELETE | `/api/cart/remove/:productId` | **Yes** |
| Cart | DELETE | `/api/cart/clear` | **Yes** |
| Wishlist | GET | `/api/wishlist` | **Yes** |
| Wishlist | POST | `/api/wishlist/add/:productId` | **Yes** |
| Wishlist | DELETE | `/api/wishlist/remove/:productId` | **Yes** |
| Orders | POST | `/api/orders` | **Yes** |
| Orders | GET | `/api/orders` | **Yes** |
| Orders | GET | `/api/orders/:id` | **Yes** (owner or admin) |
| Orders | PUT | `/api/orders/:id/status` | **Yes** (admin only) |
| Reviews | POST | `/api/products/:id/reviews` | **Yes** (must have purchased) |
| Reviews | GET | `/api/products/:id/reviews` | No |
| Reviews | PUT | `/api/reviews/:id` | **Yes** (owner) |
| Reviews | DELETE | `/api/reviews/:id` | **Yes** (owner or admin) |

> No endpoint currently distinguishes "public catalog browsing" from "admin management" for Category/Brand/Product — all their write operations (POST/PUT/DELETE) are open to any caller, authenticated or not. If that's not intended for production, add `authenticate` + an admin-role check to those routes the same way Order's status update does it.

---

*Last updated: July 19, 2026*