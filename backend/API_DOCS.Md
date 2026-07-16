# TechForge E-Commerce Backend API Documentation

Professional REST API reference for the TechForge e-commerce backend, covering the Category, Brand, and Product modules.

**Base URL**

```text
http://localhost:5000/api
```

> Replace with your deployed base URL (e.g. `https://api.techforge.com/api`) once in production. Note: the current implementation does **not** use a `/v1` version prefix — routes are mounted directly under `/api`.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Authentication](#2-authentication)
3. [Brand Module](#3-brand-module)
4. [Category Module](#4-category-module)
5. [Product Module](#5-product-module)
6. [Query Parameters](#6-query-parameters)
7. [Validation Rules](#7-validation-rules)
8. [Error Responses](#8-error-responses)
9. [Thunder Client Testing Guide](#9-thunder-client-testing-guide)
10. [MongoDB ID Flow](#10-mongodb-id-flow)
11. [API Summary Table](#11-api-summary-table)

---

## 1. Project Overview

TechForge is a REST API backend for an e-commerce platform selling computer parts and electronics. It exposes CRUD operations for product categories, brands, and products, with products referencing their parent category and brand via MongoDB ObjectIds.

### Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Atlas) |
| ODM | Mongoose |
| Architecture | MVC (Model–Controller–Route) |

### Features

- Full CRUD for Categories, Brands, and Products
- Product documents reference `Category` and `Brand` via Mongoose `ObjectId`, with automatic population on read
- Duplicate-name prevention on Category and Brand
- ObjectId validation on all `:id` routes and foreign-key fields
- Centralized error-handling middleware
- Consistent JSON response shape across all endpoints

### Folder Structure

```text
src/
├── config/
├── controllers/
│   ├── category.controller.js
│   ├── brand.controller.js
│   └── product.controller.js
├── middleware/
│   └── error.middleware.js
├── models/
│   ├── Category.js
│   ├── Brand.js
│   └── Product.js
├── routes/
│   ├── category.routes.js
│   ├── brand.routes.js
│   └── product.routes.js
├── utils/
├── app.js
└── server.js
```

---

## 2. Authentication

> ⚠️ **Not yet implemented.** The current codebase has no authentication or authorization middleware — all endpoints below are publicly accessible. This section documents the intended pattern for when JWT auth is added, so the contract is ready in advance.

### Planned flow

- **Register** — `POST /api/auth/register`
- **Login** — `POST /api/auth/login` → returns a JWT
- Protected routes will expect the token on every request via the `Authorization` header:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Planned endpoint protection

| Action | Planned auth requirement |
|---|---|
| `GET` (list/detail) on Category, Brand, Product | Public — no auth |
| `POST` / `PUT` / `DELETE` on Category, Brand, Product | Admin JWT required |

Until this is implemented, treat **all** endpoints in this document as unauthenticated.

---

## 3. Brand Module

Base path: `/api/brands`

### 3.1 Create Brand

```http
POST /api/brands
```

**Description:** Creates a new brand. Rejects duplicate names.

**Request Body**

```json
{
  "name": "Apple",
  "description": "Premium electronics brand",
  "logo": "apple.png",
  "isActive": true
}
```

**Success Response — `201 Created`**

```json
{
  "success": true,
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

**Error Responses**

| Status | Cause | Body |
|---|---|---|
| 400 | Missing `name` | `{ "success": false, "message": "Brand name is required" }` |
| 409 | Duplicate name | `{ "success": false, "message": "A brand with this name already exists" }` |
| 500 | Server/DB error | `{ "success": false, "message": "Server error while creating brand", "error": "..." }` |

**Thunder Client Example**

```text
Method: POST
URL: {{baseUrl}}/brands
Body: JSON (raw)
```

---

### 3.2 Get All Brands

```http
GET /api/brands
```

**Description:** Returns all brands, most recently created first.

**Success Response — `200 OK`**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "name": "Apple",
      "description": "Premium electronics brand",
      "logo": "apple.png",
      "isActive": true,
      "createdAt": "2026-07-16T10:00:00.000Z",
      "updatedAt": "2026-07-16T10:00:00.000Z"
    },
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
      "name": "Dell",
      "description": "Dell Technologies",
      "logo": "dell-logo.png",
      "isActive": true,
      "createdAt": "2026-07-15T09:00:00.000Z",
      "updatedAt": "2026-07-15T09:00:00.000Z"
    }
  ]
}
```

**Thunder Client Example**

```text
Method: GET
URL: {{baseUrl}}/brands
```

---

### 3.3 Get Brand by ID

```http
GET /api/brands/:id
```

**Success Response — `200 OK`**

```json
{
  "success": true,
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

**Error Responses**

| Status | Cause | Body |
|---|---|---|
| 400 | Malformed `:id` | `{ "success": false, "message": "Invalid brand ID" }` |
| 404 | No matching brand | `{ "success": false, "message": "Brand not found" }` |

**Thunder Client Example**

```text
Method: GET
URL: {{baseUrl}}/brands/{{brandId}}
```

---

### 3.4 Update Brand

```http
PUT /api/brands/:id
```

**Request Body** (any subset of fields)

```json
{
  "description": "Premium electronics and lifestyle brand",
  "isActive": false
}
```

**Success Response — `200 OK`**

```json
{
  "success": true,
  "message": "Brand updated successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "name": "Apple",
    "description": "Premium electronics and lifestyle brand",
    "logo": "apple.png",
    "isActive": false,
    "createdAt": "2026-07-16T10:00:00.000Z",
    "updatedAt": "2026-07-16T10:05:00.000Z"
  }
}
```

**Error Responses**

| Status | Cause | Body |
|---|---|---|
| 400 | Malformed `:id` | `{ "success": false, "message": "Invalid brand ID" }` |
| 404 | No matching brand | `{ "success": false, "message": "Brand not found" }` |
| 409 | New name collides with another brand | `{ "success": false, "message": "A brand with this name already exists" }` |

**Thunder Client Example**

```text
Method: PUT
URL: {{baseUrl}}/brands/{{brandId}}
Body: JSON (raw)
```

---

### 3.5 Delete Brand

```http
DELETE /api/brands/:id
```

**Success Response — `200 OK`**

```json
{
  "success": true,
  "message": "Brand deleted successfully"
}
```

**Error Responses**

| Status | Cause | Body |
|---|---|---|
| 400 | Malformed `:id` | `{ "success": false, "message": "Invalid brand ID" }` |
| 404 | No matching brand | `{ "success": false, "message": "Brand not found" }` |

**Thunder Client Example**

```text
Method: DELETE
URL: {{baseUrl}}/brands/{{brandId}}
```

---

## 4. Category Module

Base path: `/api/categories`

### 4.1 Create Category

```http
POST /api/categories
```

**Request Body**

```json
{
  "name": "Electronics",
  "description": "Electronic products",
  "image": "electronics.jpg",
  "isActive": true
}
```

**Success Response — `201 Created`**

```json
{
  "success": true,
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

**Error Responses**

| Status | Cause | Body |
|---|---|---|
| 400 | Missing `name` | `{ "success": false, "message": "Category name is required" }` |
| 409 | Duplicate name | `{ "success": false, "message": "A category with this name already exists" }` |
| 500 | Server/DB error | `{ "success": false, "message": "Server error while creating category", "error": "..." }` |

**Thunder Client Example**

```text
Method: POST
URL: {{baseUrl}}/categories
Body: JSON (raw)
```

---

### 4.2 Get All Categories

```http
GET /api/categories
```

**Success Response — `200 OK`**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Electronics",
      "description": "Electronic products",
      "image": "electronics.jpg",
      "isActive": true,
      "createdAt": "2026-07-16T09:50:00.000Z",
      "updatedAt": "2026-07-16T09:50:00.000Z"
    }
  ]
}
```

**Thunder Client Example**

```text
Method: GET
URL: {{baseUrl}}/categories
```

---

### 4.3 Get Category by ID

```http
GET /api/categories/:id
```

**Success Response — `200 OK`**

```json
{
  "success": true,
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

**Error Responses**

| Status | Cause | Body |
|---|---|---|
| 400 | Malformed `:id` | `{ "success": false, "message": "Invalid category ID" }` |
| 404 | No matching category | `{ "success": false, "message": "Category not found" }` |

**Thunder Client Example**

```text
Method: GET
URL: {{baseUrl}}/categories/{{categoryId}}
```

---

### 4.4 Update Category

```http
PUT /api/categories/:id
```

**Request Body** (any subset of fields)

```json
{
  "description": "Consumer electronics and gadgets",
  "isActive": true
}
```

**Success Response — `200 OK`**

```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Electronics",
    "description": "Consumer electronics and gadgets",
    "image": "electronics.jpg",
    "isActive": true,
    "createdAt": "2026-07-16T09:50:00.000Z",
    "updatedAt": "2026-07-16T09:55:00.000Z"
  }
}
```

**Error Responses**

| Status | Cause | Body |
|---|---|---|
| 400 | Malformed `:id` | `{ "success": false, "message": "Invalid category ID" }` |
| 404 | No matching category | `{ "success": false, "message": "Category not found" }` |
| 409 | New name collides with another category | `{ "success": false, "message": "A category with this name already exists" }` |

**Thunder Client Example**

```text
Method: PUT
URL: {{baseUrl}}/categories/{{categoryId}}
Body: JSON (raw)
```

---

### 4.5 Delete Category

```http
DELETE /api/categories/:id
```

**Success Response — `200 OK`**

```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

**Error Responses**

| Status | Cause | Body |
|---|---|---|
| 400 | Malformed `:id` | `{ "success": false, "message": "Invalid category ID" }` |
| 404 | No matching category | `{ "success": false, "message": "Category not found" }` |

**Thunder Client Example**

```text
Method: DELETE
URL: {{baseUrl}}/categories/{{categoryId}}
```

> **Note:** Deleting a category does **not** currently cascade to products referencing it. Products will keep a `category` ObjectId that no longer resolves, and population will return `null` for that field. Consider adding a pre-delete check or cascading soft-delete if this matters for your use case.

---

## 5. Product Module

Base path: `/api/products`

### 5.1 Create Product

```http
POST /api/products
```

**Description:** Creates a product. Validates that `category` and `brand` are syntactically valid ObjectIds **and** that they reference documents that actually exist.

**Request Body**

```json
{
  "name": "iPhone 17",
  "description": "Latest smartphone",
  "price": 99999,
  "discountPrice": 94999,
  "stock": 20,
  "brand": "<brand_id>",
  "category": "<category_id>",
  "images": ["front.jpg", "back.jpg"],
  "isFeatured": true,
  "isActive": true
}
```

**Success Response — `201 Created`**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d4",
    "name": "iPhone 17",
    "description": "Latest smartphone",
    "price": 99999,
    "discountPrice": 94999,
    "stock": 20,
    "images": ["front.jpg", "back.jpg"],
    "category": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Electronics"
    },
    "brand": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "name": "Apple"
    },
    "rating": 0,
    "numReviews": 0,
    "isFeatured": true,
    "isActive": true,
    "createdAt": "2026-07-16T10:10:00.000Z",
    "updatedAt": "2026-07-16T10:10:00.000Z"
  }
}
```

**Error Responses**

| Status | Cause | Body |
|---|---|---|
| 400 | Missing/invalid `name`, `price`, `stock` | `{ "success": false, "message": "A valid product price is required" }` |
| 400 | `category`/`brand` not a valid ObjectId | `{ "success": false, "message": "A valid category ID is required" }` |
| 404 | `category`/`brand` ObjectId valid but doesn't exist | `{ "success": false, "message": "Referenced category not found" }` |
| 500 | Server/DB error | `{ "success": false, "message": "Server error while creating product", "error": "..." }` |

**Thunder Client Example**

```text
Method: POST
URL: {{baseUrl}}/products
Body: JSON (raw)
```

---

### 5.2 Get All Products

```http
GET /api/products
```

**Description:** Returns all products with `category` and `brand` populated. Supports basic filtering — see [Query Parameters](#6-query-parameters).

**Success Response — `200 OK`**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
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
  ]
}
```

**Thunder Client Example**

```text
Method: GET
URL: {{baseUrl}}/products?category={{categoryId}}&isActive=true
```

---

### 5.3 Get Product by ID

```http
GET /api/products/:id
```

**Success Response — `200 OK`**

Same shape as a single item in [5.2](#52-get-all-products).

**Error Responses**

| Status | Cause | Body |
|---|---|---|
| 400 | Malformed `:id` | `{ "success": false, "message": "Invalid product ID" }` |
| 404 | No matching product | `{ "success": false, "message": "Product not found" }` |

**Thunder Client Example**

```text
Method: GET
URL: {{baseUrl}}/products/{{productId}}
```

---

### 5.4 Update Product

```http
PUT /api/products/:id
```

**Request Body** (any subset of fields; `category`/`brand` re-validated if present)

```json
{
  "price": 92999,
  "stock": 15
}
```

**Success Response — `200 OK`**

Returns the updated, populated product document with `message: "Product updated successfully"`.

**Error Responses**

| Status | Cause | Body |
|---|---|---|
| 400 | Malformed `:id`, or invalid `category`/`brand` ObjectId | `{ "success": false, "message": "Invalid category ID" }` |
| 404 | Product, category, or brand not found | `{ "success": false, "message": "Product not found" }` |

**Thunder Client Example**

```text
Method: PUT
URL: {{baseUrl}}/products/{{productId}}
Body: JSON (raw)
```

---

### 5.5 Delete Product

```http
DELETE /api/products/:id
```

**Success Response — `200 OK`**

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

**Error Responses**

| Status | Cause | Body |
|---|---|---|
| 400 | Malformed `:id` | `{ "success": false, "message": "Invalid product ID" }` |
| 404 | No matching product | `{ "success": false, "message": "Product not found" }` |

**Thunder Client Example**

```text
Method: DELETE
URL: {{baseUrl}}/products/{{productId}}
```

---

## 6. Query Parameters

### Currently supported (`GET /api/products` only)

| Parameter | Type | Description |
|---|---|---|
| `category` | ObjectId string | Filter products by category ID |
| `brand` | ObjectId string | Filter products by brand ID |
| `isFeatured` | `"true"` \| `"false"` | Filter featured products |
| `isActive` | `"true"` \| `"false"` | Filter active/inactive products |

**Example**

```http
GET /api/products?category=64f1a2b3c4d5e6f7a8b9c0d1&isFeatured=true
```

### Not yet implemented (planned)

> The following are common e-commerce list features **not currently built** into the controller. Documented here as a roadmap so consumers of this API know what's coming.

| Parameter | Purpose |
|---|---|
| `page`, `limit` | Pagination |
| `search` | Text search across `name`/`description` |
| `sort` | Sort by field (e.g. `price`, `-createdAt`) |
| `minPrice`, `maxPrice` | Price range filtering |

Example of the **intended** future usage (not yet functional):

```http
GET /api/products?page=1&limit=10&search=iphone&sort=-price&minPrice=50000&maxPrice=150000
```

---

## 7. Validation Rules

### Brand

| Field | Rule |
|---|---|
| `name` | Required, must be unique, trimmed |
| `description` | Optional |
| `logo` | Optional |
| `isActive` | Optional, defaults to `true` |

### Category

| Field | Rule |
|---|---|
| `name` | Required, must be unique, trimmed |
| `description` | Optional |
| `image` | Optional |
| `isActive` | Optional, defaults to `true` |

### Product

| Field | Rule |
|---|---|
| `name` | Required |
| `price` | Required, must be `>= 0` |
| `discountPrice` | Optional, must be `>= 0` |
| `stock` | Required, must be `>= 0` |
| `category` | Required, must be a valid ObjectId that references an existing Category |
| `brand` | Required, must be a valid ObjectId that references an existing Brand |
| `images` | Optional array of strings |
| `rating` | Optional, `0`–`5`, defaults to `0` |
| `numReviews` | Optional, `>= 0`, defaults to `0` |
| `isFeatured`, `isActive` | Optional booleans |

---

## 8. Error Responses

All error responses follow this consistent shape:

```json
{
  "success": false,
  "message": "Human-readable description",
  "error": "Optional low-level error detail (5xx only)"
}
```

| Status | Meaning | Example |
|---|---|---|
| **400 Bad Request** | Invalid input, missing required field, malformed ObjectId | `{ "success": false, "message": "Category name is required" }` |
| **401 Unauthorized** | *(Planned — not yet enforced)* Missing/invalid JWT | `{ "success": false, "message": "Not authorized, token missing or invalid" }` |
| **404 Not Found** | Resource (or referenced resource) doesn't exist | `{ "success": false, "message": "Product not found" }` |
| **409 Conflict** | Duplicate unique field (Brand/Category `name`) | `{ "success": false, "message": "A brand with this name already exists" }` |
| **500 Internal Server Error** | Unexpected server/database failure | `{ "success": false, "message": "Server error while creating product", "error": "..." }` |

---

## 9. Thunder Client Testing Guide

Recommended order for testing the full flow end-to-end:

1. *(Once auth is implemented)* Register a user.
2. *(Once auth is implemented)* Log in and copy the returned JWT token into a Thunder Client environment variable (`{{token}}`).
3. **Create Brand** — `POST /api/brands` → copy the returned `_id` into `{{brandId}}`.
4. **Create Category** — `POST /api/categories` → copy the returned `_id` into `{{categoryId}}`.
5. **Create Product** — `POST /api/products`, using `{{brandId}}` and `{{categoryId}}` in the body.
6. **Get All Products** — `GET /api/products` → confirm the new product appears with `category`/`brand` populated.
7. **Get Product by ID** — `GET /api/products/{{productId}}`.
8. **Update Product** — `PUT /api/products/{{productId}}` with a partial body (e.g. price change).
9. **Delete Product** — `DELETE /api/products/{{productId}}` → confirm `200` and that a subsequent `GET` returns `404`.
10. Repeat update/delete checks for **Brand** and **Category** independently.
11. Test negative cases: invalid ObjectId format, non-existent ID, duplicate brand/category name.

> Tip: set `{{baseUrl}}` as a Thunder Client environment variable pointing to `http://localhost:5000/api`, so you can switch between local and deployed environments without editing every request.

---

## 10. MongoDB ID Flow

Products don't own their category/brand data — they reference it. The creation order matters:

```text
Brand   (created first)  →  _id: 64f1a2b3c4d5e6f7a8b9c0d2
Category(created second) →  _id: 64f1a2b3c4d5e6f7a8b9c0d1
Product (created last)   →  references both:
                              "brand":    "64f1a2b3c4d5e6f7a8b9c0d2"
                              "category": "64f1a2b3c4d5e6f7a8b9c0d1"
```

When a product is fetched, Mongoose's `.populate()` resolves these IDs back into full documents:

```json
{
  "category": { "_id": "64f1a2b3c4d5e6f7a8b9c0d1", "name": "Electronics" },
  "brand": { "_id": "64f1a2b3c4d5e6f7a8b9c0d2", "name": "Apple" }
}
```

Because Brand and Category must exist **before** a Product can reference them, always create them first in any test flow or seed script.

---

## 11. API Summary Table

| Module | Method | Endpoint | Auth Required |
|---|---|---|---|
| Brand | POST | `/api/brands` | No *(planned: Yes)* |
| Brand | GET | `/api/brands` | No |
| Brand | GET | `/api/brands/:id` | No |
| Brand | PUT | `/api/brands/:id` | No *(planned: Yes)* |
| Brand | DELETE | `/api/brands/:id` | No *(planned: Yes)* |
| Category | POST | `/api/categories` | No *(planned: Yes)* |
| Category | GET | `/api/categories` | No |
| Category | GET | `/api/categories/:id` | No |
| Category | PUT | `/api/categories/:id` | No *(planned: Yes)* |
| Category | DELETE | `/api/categories/:id` | No *(planned: Yes)* |
| Product | POST | `/api/products` | No *(planned: Yes)* |
| Product | GET | `/api/products` | No |
| Product | GET | `/api/products/:id` | No |
| Product | PUT | `/api/products/:id` | No *(planned: Yes)* |
| Product | DELETE | `/api/products/:id` | No *(planned: Yes)* |

---

*Last updated: July 16, 2026*