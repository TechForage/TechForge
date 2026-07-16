const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('../config/db');
const Brand = require('../models/Brand');
const Category = require('../models/Category');
const Product = require('../models/Product');

const brandsData = [
    { name: 'Acme', description: 'Quality products' },
    { name: 'Orbit', description: 'Innovative tech' },
    { name: 'Nova', description: 'Modern designs' },
    { name: 'Pioneer', description: 'Trusted brand' },
    { name: 'Vertex', description: 'High performance' },
    { name: 'Lumen', description: 'Bright ideas' },
    { name: 'Astra', description: 'Space-age gear' },
    { name: 'Zephyr', description: 'Lightweight goods' },
    { name: 'Pulse', description: 'Energy & style' },
    { name: 'Echo', description: 'Reliable classics' },
];

const categoriesData = [
    { name: 'Electronics', description: 'Gadgets and devices' },
    { name: 'Home Appliances', description: 'Appliances for home' },
    { name: 'Books', description: 'Printed and digital books' },
    { name: 'Clothing', description: 'Apparel and wearables' },
    { name: 'Toys', description: 'Toys and games' },
    { name: 'Beauty', description: 'Personal care and cosmetics' },
    { name: 'Sports', description: 'Sporting goods' },
    { name: 'Outdoors', description: 'Outdoor equipment' },
    { name: 'Automotive', description: 'Car accessories' },
    { name: 'Garden', description: 'Garden tools and decor' },
];

const productsData = [
    { name: 'SmartPhone X', description: 'Flagship smartphone', price: 799.99, discountPrice: 699.99, stock: 50 },
    { name: '4K TV 55"', description: 'Crisp 4K television', price: 599.99, discountPrice: 549.99, stock: 20 },
    { name: 'Mystery Novel', description: 'A gripping mystery', price: 14.99, stock: 200 },
    { name: 'Running Shoes', description: 'Lightweight running shoes', price: 89.99, stock: 120 },
    { name: 'Building Blocks Set', description: 'Creative toy set', price: 39.99, stock: 80 },
    { name: 'Face Serum', description: 'Hydrating serum', price: 29.99, stock: 150 },
    { name: 'Tennis Racket', description: 'Professional racket', price: 129.99, stock: 40 },
    { name: 'Camping Tent', description: '4-person tent', price: 149.99, stock: 30 },
    { name: 'Car Dash Cam', description: '1080p dash camera', price: 69.99, stock: 60 },
    { name: 'Garden Shovel', description: 'Durable shovel', price: 24.99, stock: 90 },
];

const seed = async () => {
    await connectDB();

    try {
        await Brand.deleteMany();
        await Category.deleteMany();
        await Product.deleteMany();

        const createdBrands = await Brand.insertMany(brandsData);
        const createdCategories = await Category.insertMany(categoriesData);

        // Map products to brands and categories (round-robin)
        const productsToInsert = productsData.map((p, idx) => {
            const brand = createdBrands[idx % createdBrands.length]._id;
            const category = createdCategories[idx % createdCategories.length]._id;
            return {
                ...p,
                brand,
                category,
                images: [],
                rating: 0,
                numReviews: 0,
                isFeatured: false,
                isActive: true,
            };
        });

        await Product.insertMany(productsToInsert);

        console.log('✅ Seed completed:');
        console.log(`- Brands: ${createdBrands.length}`);
        console.log(`- Categories: ${createdCategories.length}`);
        console.log(`- Products: ${productsToInsert.length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed');
        console.error(error);
        process.exit(1);
    }
};

seed();
