const swaggerSpec = {
    openapi: "3.0.0",
    info: {
        title: "TechForge E-Commerce API",
        description: "REST API for TechForge e-commerce platform",
        version: "1.0.0",
        contact: {
            name: "TechForge Support",
            email: "support@techforge.com",
        },
    },
    servers: [
        {
            url: "http://localhost:5000",
            description: "Development Server",
        },
        {
            url: "https://api.techforge.com",
            description: "Production Server",
        },
    ],
    paths: {
        "/": {
            get: {
                summary: "Welcome endpoint",
                description: "Returns a welcome message from the TechForge API",
                tags: ["Health Check"],
                responses: {
                    "200": {
                        description: "Successful response",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/auth/register": {
            post: {
                summary: "Register a new user",
                description: "Create a new user account",
                tags: ["Authentication"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "email", "password"],
                                properties: {
                                    name: { type: "string", example: "John Doe" },
                                    email: { type: "string", format: "email", example: "user@example.com" },
                                    password: { type: "string", example: "securePassword123" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "User registered successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        message: { type: "string" },
                                        user: {
                                            type: "object",
                                            properties: {
                                                id: { type: "string" },
                                                name: { type: "string" },
                                                email: { type: "string" },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Validation error",
                    },
                },
            },
        },
        "/api/auth/login": {
            post: {
                summary: "User login",
                description: "Authenticate user and get access token",
                tags: ["Authentication"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email", "password"],
                                properties: {
                                    email: { type: "string", format: "email", example: "user@example.com" },
                                    password: { type: "string", example: "securePassword123" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Login successful",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        message: { type: "string" },
                                        token: { type: "string" },
                                        user: {
                                            type: "object",
                                            properties: {
                                                id: { type: "string" },
                                                name: { type: "string" },
                                                email: { type: "string" },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Invalid credentials",
                    },
                },
            },
        },
        "/api/products": {
            get: {
                summary: "Get all products",
                description: "Fetch list of all products with optional filtering by category, brand, price range, etc.",
                tags: ["Products"],
                parameters: [
                    {
                        name: "category",
                        in: "query",
                        schema: { type: "string" },
                        description: "Filter by category ObjectId",
                    },
                    {
                        name: "brand",
                        in: "query",
                        schema: { type: "string" },
                        description: "Filter by brand ObjectId",
                    },
                    {
                        name: "page",
                        in: "query",
                        schema: { type: "integer", default: 1 },
                        description: "Page number for pagination",
                    },
                    {
                        name: "limit",
                        in: "query",
                        schema: { type: "integer", default: 10 },
                        description: "Number of results per page",
                    },
                ],
                responses: {
                    "200": {
                        description: "List of products",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    _id: { type: "string" },
                                                    name: { type: "string" },
                                                    description: { type: "string" },
                                                    price: { type: "number" },
                                                    discountPrice: { type: "number" },
                                                    stock: { type: "integer" },
                                                    images: { type: "array", items: { type: "string" } },
                                                    category: { type: "object" },
                                                    brand: { type: "object" },
                                                    rating: { type: "number" },
                                                    numReviews: { type: "integer" },
                                                    isFeatured: { type: "boolean" },
                                                    isActive: { type: "boolean" },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: "Create a new product",
                description: "Create a new product with category and brand validation",
                tags: ["Products"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "price", "category", "brand"],
                                properties: {
                                    name: { type: "string", example: "iPhone 17" },
                                    description: { type: "string", example: "Latest smartphone" },
                                    price: { type: "number", example: 99999 },
                                    discountPrice: { type: "number", example: 94999 },
                                    stock: { type: "integer", example: 20 },
                                    brand: { type: "string", description: "Brand ObjectId", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
                                    category: { type: "string", description: "Category ObjectId", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
                                    images: { type: "array", items: { type: "string" }, example: ["front.jpg", "back.jpg"] },
                                    isFeatured: { type: "boolean", default: false },
                                    isActive: { type: "boolean", default: true },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Product created successfully",
                    },
                    "400": {
                        description: "Validation error or invalid category/brand",
                    },
                    "404": {
                        description: "Category or brand not found",
                    },
                },
            },
        },
        "/api/products/{id}": {
            get: {
                summary: "Get product by ID",
                description: "Fetch a specific product with populated category and brand",
                tags: ["Products"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                        description: "Product ID",
                    },
                ],
                responses: {
                    "200": {
                        description: "Product found",
                    },
                    "404": {
                        description: "Product not found",
                    },
                },
            },
            put: {
                summary: "Update product",
                description: "Update an existing product",
                tags: ["Products"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    description: { type: "string" },
                                    price: { type: "number" },
                                    discountPrice: { type: "number" },
                                    stock: { type: "integer" },
                                    brand: { type: "string" },
                                    category: { type: "string" },
                                    images: { type: "array", items: { type: "string" } },
                                    isFeatured: { type: "boolean" },
                                    isActive: { type: "boolean" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Product updated successfully",
                    },
                    "404": {
                        description: "Product not found",
                    },
                },
            },
            delete: {
                summary: "Delete product",
                description: "Delete a product by ID",
                tags: ["Products"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Product deleted successfully",
                    },
                    "404": {
                        description: "Product not found",
                    },
                },
            },
        },
        "/api/categories": {
            get: {
                summary: "Get all categories",
                description: "Fetch list of all available product categories",
                tags: ["Categories"],
                responses: {
                    "200": {
                        description: "List of categories",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        count: { type: "integer" },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    _id: { type: "string" },
                                                    name: { type: "string" },
                                                    description: { type: "string" },
                                                    image: { type: "string" },
                                                    isActive: { type: "boolean" },
                                                    createdAt: { type: "string" },
                                                    updatedAt: { type: "string" },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: "Create a new category",
                description: "Create a new product category",
                tags: ["Categories"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name"],
                                properties: {
                                    name: { type: "string", example: "Electronics" },
                                    description: { type: "string", example: "Electronic products" },
                                    image: { type: "string", example: "electronics.jpg" },
                                    isActive: { type: "boolean", default: true },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Category created successfully",
                    },
                    "400": {
                        description: "Validation error",
                    },
                    "409": {
                        description: "Duplicate category name",
                    },
                },
            },
        },
        "/api/categories/{id}": {
            get: {
                summary: "Get category by ID",
                description: "Fetch a specific category by its ID",
                tags: ["Categories"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                        description: "Category ID",
                    },
                ],
                responses: {
                    "200": {
                        description: "Category found",
                    },
                    "404": {
                        description: "Category not found",
                    },
                },
            },
            put: {
                summary: "Update category",
                description: "Update an existing category",
                tags: ["Categories"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    description: { type: "string" },
                                    image: { type: "string" },
                                    isActive: { type: "boolean" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Category updated successfully",
                    },
                    "404": {
                        description: "Category not found",
                    },
                },
            },
            delete: {
                summary: "Delete category",
                description: "Delete a category by ID",
                tags: ["Categories"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Category deleted successfully",
                    },
                    "404": {
                        description: "Category not found",
                    },
                },
            },
        },
        "/api/brands": {
            get: {
                summary: "Get all brands",
                description: "Fetch list of all available brands",
                tags: ["Brands"],
                responses: {
                    "200": {
                        description: "List of brands",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            _id: { type: "string" },
                                            name: { type: "string" },
                                            description: { type: "string" },
                                            logo: { type: "string" },
                                            isActive: { type: "boolean" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: "Create a new brand",
                description: "Create a new product brand",
                tags: ["Brands"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name"],
                                properties: {
                                    name: { type: "string", example: "Apple" },
                                    description: { type: "string", example: "Premium electronics" },
                                    logo: { type: "string", example: "apple.png" },
                                    isActive: { type: "boolean", default: true },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Brand created successfully",
                    },
                    "400": {
                        description: "Validation error",
                    },
                },
            },
        },
        "/api/brands/{id}": {
            get: {
                summary: "Get brand by ID",
                description: "Fetch a specific brand by its ID",
                tags: ["Brands"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                        description: "Brand ID",
                    },
                ],
                responses: {
                    "200": {
                        description: "Brand found",
                    },
                    "404": {
                        description: "Brand not found",
                    },
                },
            },
            put: {
                summary: "Update brand",
                description: "Update an existing brand",
                tags: ["Brands"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    description: { type: "string" },
                                    logo: { type: "string" },
                                    isActive: { type: "boolean" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Brand updated successfully",
                    },
                    "404": {
                        description: "Brand not found",
                    },
                },
            },
            delete: {
                summary: "Delete brand",
                description: "Delete a brand by ID",
                tags: ["Brands"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Brand deleted successfully",
                    },
                    "404": {
                        description: "Brand not found",
                    },
                },
            },
        },
        "/api/cart": {
            get: {
                summary: "Get user cart",
                description: "Fetch the current user's shopping cart",
                tags: ["Cart"],
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description: "User cart",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        userId: { type: "string" },
                                        items: { type: "array" },
                                        total: { type: "number" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                    },
                },
            },
            post: {
                summary: "Add item to cart",
                description: "Add a product to the user's shopping cart",
                tags: ["Cart"],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["productId", "quantity"],
                                properties: {
                                    productId: { type: "string" },
                                    quantity: { type: "integer", minimum: 1 },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Item added to cart",
                    },
                    "401": {
                        description: "Unauthorized",
                    },
                },
            },
        },
        "/api/test": {
            get: {
                summary: "API test endpoint",
                description: "Test if the API is working",
                tags: ["Health Check"],
                responses: {
                    "200": {
                        description: "API is working",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "JWT token for authentication",
            },
        },
    },
    tags: [
        {
            name: "Health Check",
            description: "API health and status endpoints",
        },
        {
            name: "Authentication",
            description: "User registration and login endpoints",
        },
        {
            name: "Products",
            description: "Product listing and details endpoints",
        },
        {
            name: "Brands",
            description: "Product brand management endpoints",
        },
        {
            name: "Categories",
            description: "Product category endpoints",
        },
        {
            name: "Cart",
            description: "Shopping cart operations",
        },
    ],
};

module.exports = swaggerSpec;
