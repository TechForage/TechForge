import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import './Products.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Navbar/Sidebar';
import Footer from "../../components/Navbar/Footer";
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import { applyFilters, applySort } from '../../utils/productFilters';
import { useWatchlist } from '../../contexts/WatchlistContext';
import { useParams } from 'react-router-dom';
import {
  Cpu,
  CircuitBoard,
  Laptop,
  MemoryStick,
  HardDrive,
  Monitor,
  Gamepad2,
  Wifi,
  Watch,
} from "lucide-react";


const Allproducts = {
  keyboard: [
     { id: 1, name: 'HP K200 Bluetooth Standard Laptop Keyboard Compatible...', brand: 'HP', type: 'Black', rating: 3.9, reviews: '1,619', price: 599, originalPrice: 1199, discount: '50% off', badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&q=80' },
     { id: 3, name: 'ZEBRONICS Zeb-K20 / Zeb-K65 Wired USB Standard Desktop...', brand: 'ZEBRONICS', type: 'Black', rating: 4.1, reviews: '3,5246', price: 297, originalPrice: 399, discount: '25% off', badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=300&q=80' },
     { id: 4, name: 'ZEBRONICS Zeb-Judwaa 750 Combo Wired USB Standard Deskto...', brand: 'ZEBRONICS', type: 'Black', rating: 4.2, reviews: '2,1336', price: 422, originalPrice: 999, discount: '53% off', badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&q=80' },
     { id: 6, name: 'ZEBRONICS Transformer (ZEB Designed f...', brand: 'ZEBRONICS', type: 'White', rating: 4.1, reviews: '1,799', price: 1511, originalPrice: 1799, discount: '49% off', badge: 'Discount', image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=300&q=80' },
     { id: 7, name: 'ZEBRONICS Transformer (ZEB Designed f...', brand: 'ZEBRONICS', type: 'Yellow', rating: 4.1, reviews: '1,799', price: 1511, originalPrice: 1799, discount: '49% off', badge: 'Discount', image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&q=80' },
     {
  id: 8,
  name: "Logitech K380 Multi-Device Bluetooth Keyboard",
  brand: "Logitech",
  type: "Blue",
  rating: 4.6,
  reviews: "8,452",
  price: 2799,
  originalPrice: 3499,
  discount: "20% off",
  badge: "Top Rated",
  image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300&q=80"
},
{
  id: 9,
  name: "Logitech G213 RGB Gaming Keyboard",
  brand: "Logitech",
  type: "Black",
  rating: 4.5,
  reviews: "5,263",
  price: 3999,
  originalPrice: 4999,
  discount: "20% off",
  badge: "Gaming",
  image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&q=80"
},
{
  id: 10,
  name: "Redragon K552 Mechanical Gaming Keyboard",
  brand: "Redragon",
  type: "Black",
  rating: 4.7,
  reviews: "4,910",
  price: 3299,
  originalPrice: 4299,
  discount: "23% off",
  badge: "Mechanical",
  image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&q=80"
},
{
  id: 11,
  name: "Dell KB216 Wired Multimedia Keyboard",
  brand: "Dell",
  type: "Black",
  rating: 4.3,
  reviews: "7,856",
  price: 699,
  originalPrice: 999,
  discount: "30% off",
  badge: "Popular",
  image: "https://images.unsplash.com/photo-1595044426077-d36d9236d444?w=300&q=80"
},
{
  id: 12,
  name: "HP GK100 RGB Mechanical Gaming Keyboard",
  brand: "HP",
  type: "Black",
  rating: 4.4,
  reviews: "2,310",
  price: 2199,
  originalPrice: 2999,
  discount: "27% off",
  badge: "RGB",
  image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80"
},
{
  id: 13,
  name: "Cosmic Byte CB-GK-16 Firefly Mechanical Keyboard",
  brand: "Cosmic Byte",
  type: "Black",
  rating: 4.5,
  reviews: "3,845",
  price: 2499,
  originalPrice: 3499,
  discount: "29% off",
  badge: "Gaming",
  image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=300&q=80"
},
{
  id: 14,
  name: "Ant Esports MK1200 Mini Mechanical Keyboard",
  brand: "Ant Esports",
  type: "White",
  rating: 4.4,
  reviews: "2,125",
  price: 2899,
  originalPrice: 3799,
  discount: "24% off",
  badge: "Compact",
  image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=300&q=80"
},
{
  id: 15,
  name: "Razer BlackWidow V3 Mechanical Gaming Keyboard",
  brand: "Razer",
  type: "Black",
  rating: 4.8,
  reviews: "6,721",
  price: 8999,
  originalPrice: 10999,
  discount: "18% off",
  badge: "Premium",
  image: "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=300&q=80"
},
{
  id: 16,
  name: "ASUS TUF K3 RGB Mechanical Keyboard",
  brand: "ASUS",
  type: "Black",
  rating: 4.6,
  reviews: "1,982",
  price: 5499,
  originalPrice: 6999,
  discount: "21% off",
  badge: "Gaming",
  image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&q=80"
},
{
  id: 17,
  name: "HyperX Alloy Origins Core Mechanical Keyboard",
  brand: "HyperX",
  type: "Black",
  rating: 4.8,
  reviews: "3,520",
  price: 7499,
  originalPrice: 8999,
  discount: "17% off",
  badge: "Mechanical",
  image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&q=80"
},
{
  id: 18,
  name: "Keychron K2 Wireless Mechanical Keyboard",
  brand: "Keychron",
  type: "Gray",
  rating: 4.9,
  reviews: "5,612",
  price: 6999,
  originalPrice: 8499,
  discount: "18% off",
  badge: "Wireless",
  image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300&q=80"
},
{
  id: 19,
  name: "Microsoft Wired 600 USB Keyboard",
  brand: "Microsoft",
  type: "Black",
  rating: 4.2,
  reviews: "4,175",
  price: 899,
  originalPrice: 1199,
  discount: "25% off",
  badge: "Budget",
  image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&q=80"
},
{
  id: 20,
  name: "Lenovo Preferred Pro II USB Keyboard",
  brand: "Lenovo",
  type: "Black",
  rating: 4.3,
  reviews: "1,940",
  price: 1299,
  originalPrice: 1699,
  discount: "24% off",
  badge: "Office",
  image: "https://images.unsplash.com/photo-1595044426077-d36d9236d444?w=300&q=80"
},
{
  id: 21,
  name: "Corsair K70 RGB PRO Mechanical Gaming Keyboard",
  brand: "Corsair",
  type: "Black",
  rating: 4.9,
  reviews: "7,854",
  price: 10999,
  originalPrice: 12999,
  discount: "15% off",
  badge: "Premium",
  image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&q=80"
},
{
  id: 22,
  name: "ZEBRONICS MAX PRO V2 Mechanical Gaming Keyboard",
  brand: "ZEBRONICS",
  type: "White",
  rating: 4.5,
  reviews: "2,845",
  price: 2499,
  originalPrice: 3499,
  discount: "29% off",
  badge: "Mechanical",
  image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&q=80"
}
  ],

  monitors: [
  {
    id: 101,
    name: "Samsung 24-inch Full HD IPS Monitor",
    brand: "Samsung",
    type: "24 inch",
    rating: 4.5,
    reviews: "2,340",
    price: 8999,
    originalPrice: 11999,
    discount: "25% off",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80"
  },
  {
    id: 102,
    name: "LG UltraGear 27-inch Gaming Monitor",
    brand: "LG",
    type: "27 inch",
    rating: 4.7,
    reviews: "1,850",
    price: 16999,
    originalPrice: 19999,
    discount: "15% off",
    badge: "Discount",
    image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=300&q=80"
  },
  {
    id: 103,
    name: "Dell 24-inch Full HD LED Monitor",
    brand: "Dell",
    type: "24 inch",
    rating: 4.6,
    reviews: "1,245",
    price: 9999,
    originalPrice: 12999,
    discount: "23% off",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=300&q=80"
  },
  {
    id: 104,
    name: "Acer Nitro VG240Y Gaming Monitor",
    brand: "Acer",
    type: "24 inch",
    rating: 4.4,
    reviews: "980",
    price: 11499,
    originalPrice: 14999,
    discount: "23% off",
    badge: "Gaming",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&q=80"
  },
  {
    id: 105,
    name: "ASUS TUF Gaming 27-inch Monitor",
    brand: "ASUS",
    type: "27 inch",
    rating: 4.8,
    reviews: "2,150",
    price: 18999,
    originalPrice: 22999,
    discount: "17% off",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=300&q=80"
  },
  {
    id: 106,
    name: "MSI Optix G241 24-inch Gaming Monitor",
    brand: "MSI",
    type: "24 inch",
    rating: 4.6,
    reviews: "1,430",
    price: 12999,
    originalPrice: 15999,
    discount: "19% off",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=300&q=80"
  },
  {
    id: 107,
    name: "BenQ GW2780 27-inch IPS Monitor",
    brand: "BenQ",
    type: "27 inch",
    rating: 4.5,
    reviews: "1,120",
    price: 13999,
    originalPrice: 16999,
    discount: "18% off",
    badge: "Recommended",
    image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=300&q=80"
  },
  {
    id: 108,
    name: "HP M24f 24-inch Full HD Monitor",
    brand: "HP",
    type: "24 inch",
    rating: 4.4,
    reviews: "870",
    price: 9499,
    originalPrice: 12499,
    discount: "24% off",
    badge: "Value",
    image: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=300&q=80"
  },
  {
    id: 109,
    name: "Lenovo L24i-40 IPS Monitor",
    brand: "Lenovo",
    type: "24 inch",
    rating: 4.3,
    reviews: "645",
    price: 8999,
    originalPrice: 10999,
    discount: "18% off",
    badge: "Budget",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&q=80"
  },
  {
    id: 110,
    name: "Gigabyte G27Q QHD Gaming Monitor",
    brand: "Gigabyte",
    type: "27 inch",
    rating: 4.8,
    reviews: "1,090",
    price: 23999,
    originalPrice: 27999,
    discount: "14% off",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=300&q=80"
  },
  {
    id: 111,
    name: "ViewSonic VX2458 Gaming Monitor",
    brand: "ViewSonic",
    type: "24 inch",
    rating: 4.5,
    reviews: "780",
    price: 11999,
    originalPrice: 14999,
    discount: "20% off",
    badge: "Gaming",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80"
  },
  {
    id: 112,
    name: "Philips 241V8 Full HD Monitor",
    brand: "Philips",
    type: "24 inch",
    rating: 4.2,
    reviews: "590",
    price: 7999,
    originalPrice: 9999,
    discount: "20% off",
    badge: "Budget",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 113,
    name: "AOC 27G2 Gaming IPS Monitor",
    brand: "AOC",
    type: "27 inch",
    rating: 4.7,
    reviews: "1,540",
    price: 17499,
    originalPrice: 20999,
    discount: "17% off",
    badge: "Hot Deal",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=300&q=80"
  },
  {
    id: 114,
    name: "Samsung Odyssey G5 Curved Monitor",
    brand: "Samsung",
    type: "32 inch",
    rating: 4.8,
    reviews: "2,015",
    price: 25999,
    originalPrice: 30999,
    discount: "16% off",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=300&q=80"
  },
  {
    id: 115,
    name: "LG UltraFine 32-inch 4K Monitor",
    brand: "LG",
    type: "32 inch",
    rating: 4.9,
    reviews: "1,280",
    price: 39999,
    originalPrice: 45999,
    discount: "13% off",
    badge: "4K",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=300&q=80"
  }
],

  graphicscard: [
    {
      id: 301,
      name: "NVIDIA GeForce RTX 4060 8GB Graphics Card",
      brand: "NVIDIA",
      type: "8GB GDDR6",
      rating: 4.8,
      reviews: "720",
      price: 31999,
      originalPrice: 35999,
      discount: "11% off",
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
    },
    {
      id: 302,
      name: "AMD Radeon RX 7600 Graphics Card",
      brand: "AMD",
      type: "8GB GDDR6",
      rating: 4.6,
      reviews: "510",
      price: 26999,
      originalPrice: 29999,
      discount: "10% off",
      badge: "Discount",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
    },
    {
  id: 303,
  name: "NVIDIA GeForce RTX 4070 12GB Graphics Card",
  brand: "NVIDIA",
  type: "12GB GDDR6X",
  rating: 4.9,
  reviews: "1,120",
  price: 56999,
  originalPrice: 61999,
  discount: "8% off",
  badge: "Top Rated",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
},
{
  id: 304,
  name: "ASUS Dual GeForce RTX 4060 OC Edition",
  brand: "ASUS",
  type: "8GB GDDR6",
  rating: 4.7,
  reviews: "840",
  price: 33999,
  originalPrice: 37999,
  discount: "11% off",
  badge: "Gaming",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
},
{
  id: 305,
  name: "MSI GeForce RTX 3060 Ventus 2X",
  brand: "MSI",
  type: "12GB GDDR6",
  rating: 4.6,
  reviews: "2,310",
  price: 27999,
  originalPrice: 31999,
  discount: "13% off",
  badge: "Popular",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
},
{
  id: 306,
  name: "Gigabyte GeForce RTX 3050 Eagle OC",
  brand: "Gigabyte",
  type: "8GB GDDR6",
  rating: 4.4,
  reviews: "1,620",
  price: 20999,
  originalPrice: 23999,
  discount: "12% off",
  badge: "Budget",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
},
{
  id: 307,
  name: "ZOTAC Gaming GeForce RTX 4070 Twin Edge",
  brand: "ZOTAC",
  type: "12GB GDDR6X",
  rating: 4.8,
  reviews: "980",
  price: 55999,
  originalPrice: 60999,
  discount: "8% off",
  badge: "Premium",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
},
{
  id: 308,
  name: "AMD Radeon RX 7700 XT Graphics Card",
  brand: "AMD",
  type: "12GB GDDR6",
  rating: 4.7,
  reviews: "690",
  price: 42999,
  originalPrice: 46999,
  discount: "9% off",
  badge: "Gaming",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
},
{
  id: 309,
  name: "Sapphire Pulse Radeon RX 7800 XT",
  brand: "Sapphire",
  type: "16GB GDDR6",
  rating: 4.8,
  reviews: "760",
  price: 52999,
  originalPrice: 56999,
  discount: "7% off",
  badge: "Top Rated",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
},
{
  id: 310,
  name: "PowerColor Fighter Radeon RX 6600",
  brand: "PowerColor",
  type: "8GB GDDR6",
  rating: 4.5,
  reviews: "1,180",
  price: 19999,
  originalPrice: 22999,
  discount: "13% off",
  badge: "Value",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
},
{
  id: 311,
  name: "ASRock Radeon RX 6700 XT Challenger",
  brand: "ASRock",
  type: "12GB GDDR6",
  rating: 4.6,
  reviews: "920",
  price: 34999,
  originalPrice: 38999,
  discount: "10% off",
  badge: "Recommended",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
},
{
  id: 312,
  name: "Gigabyte Radeon RX 7900 GRE Gaming OC",
  brand: "Gigabyte",
  type: "16GB GDDR6",
  rating: 4.9,
  reviews: "540",
  price: 58999,
  originalPrice: 63999,
  discount: "8% off",
  badge: "Premium",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
},
{
  id: 313,
  name: "MSI GeForce RTX 4080 SUPER Gaming X Slim",
  brand: "MSI",
  type: "16GB GDDR6X",
  rating: 4.9,
  reviews: "430",
  price: 109999,
  originalPrice: 116999,
  discount: "6% off",
  badge: "Flagship",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
},
{
  id: 314,
  name: "ASUS ROG Strix GeForce RTX 4090 OC",
  brand: "ASUS",
  type: "24GB GDDR6X",
  rating: 5.0,
  reviews: "385",
  price: 189999,
  originalPrice: 199999,
  discount: "5% off",
  badge: "Ultimate",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
},
{
  id: 315,
  name: "ZOTAC Gaming GeForce RTX 3060 Twin Edge",
  brand: "ZOTAC",
  type: "12GB GDDR6",
  rating: 4.5,
  reviews: "1,540",
  price: 26999,
  originalPrice: 29999,
  discount: "10% off",
  badge: "Popular",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
},
{
  id: 316,
  name: "AMD Radeon RX 6650 XT Graphics Card",
  brand: "AMD",
  type: "8GB GDDR6",
  rating: 4.5,
  reviews: "980",
  price: 23999,
  originalPrice: 26999,
  discount: "11% off",
  badge: "Budget",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
}
  ],

  laptop: [
    {
      id: 401,
      name: "HP Pavilion 15 Intel Core i5 Laptop",
      brand: "HP",
      type: "16GB RAM | 512GB SSD",
      rating: 4.5,
      reviews: "2,810",
      price: 58999,
      originalPrice: 65999,
      discount: "11% off",
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
    },
    {
      id: 402,
      name: "Lenovo IdeaPad Slim 5",
      brand: "Lenovo",
      type: "Ryzen 7 | 16GB RAM",
      rating: 4.6,
      reviews: "1,430",
      price: 64999,
      originalPrice: 71999,
      discount: "10% off",
      badge: "Discount",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
    },
    {
  id: 403,
  name: "Dell Inspiron 15 Intel Core i5 Laptop",
  brand: "Dell",
  type: "16GB RAM | 512GB SSD",
  rating: 4.5,
  reviews: "2,145",
  price: 57999,
  originalPrice: 64999,
  discount: "11% off",
  badge: "Popular",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
},
{
  id: 404,
  name: "ASUS VivoBook 15 OLED",
  brand: "ASUS",
  type: "Intel Core i5 | 16GB RAM",
  rating: 4.7,
  reviews: "1,860",
  price: 62999,
  originalPrice: 69999,
  discount: "10% off",
  badge: "Top Rated",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
},
{
  id: 405,
  name: "Acer Aspire 7 Gaming Laptop",
  brand: "Acer",
  type: "Ryzen 5 | RTX 3050",
  rating: 4.6,
  reviews: "2,320",
  price: 61999,
  originalPrice: 69999,
  discount: "11% off",
  badge: "Gaming",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
},
{
  id: 406,
  name: "MSI Katana 15 Gaming Laptop",
  brand: "MSI",
  type: "Intel Core i7 | RTX 4060",
  rating: 4.8,
  reviews: "1,520",
  price: 104999,
  originalPrice: 114999,
  discount: "9% off",
  badge: "Gaming",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
},
{
  id: 407,
  name: "Apple MacBook Air M3",
  brand: "Apple",
  type: "8GB RAM | 256GB SSD",
  rating: 4.9,
  reviews: "6,520",
  price: 109900,
  originalPrice: 114900,
  discount: "4% off",
  badge: "Premium",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
},
{
  id: 408,
  name: "Apple MacBook Pro 14-inch M4",
  brand: "Apple",
  type: "16GB RAM | 512GB SSD",
  rating: 5.0,
  reviews: "3,180",
  price: 169900,
  originalPrice: 174900,
  discount: "3% off",
  badge: "Flagship",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
},
{
  id: 409,
  name: "Samsung Galaxy Book4",
  brand: "Samsung",
  type: "Intel Core i5 | 16GB RAM",
  rating: 4.6,
  reviews: "1,090",
  price: 69999,
  originalPrice: 75999,
  discount: "8% off",
  badge: "Recommended",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
},
{
  id: 410,
  name: "LG Gram 16 Ultra-Light Laptop",
  brand: "LG",
  type: "Intel Core Ultra 7 | 16GB RAM",
  rating: 4.8,
  reviews: "980",
  price: 119999,
  originalPrice: 129999,
  discount: "8% off",
  badge: "Lightweight",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
},
{
  id: 411,
  name: "Lenovo Legion 5 Gaming Laptop",
  brand: "Lenovo",
  type: "Ryzen 7 | RTX 4060",
  rating: 4.8,
  reviews: "2,740",
  price: 114999,
  originalPrice: 124999,
  discount: "8% off",
  badge: "Gaming",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
},
{
  id: 412,
  name: "HP Victus 15 Gaming Laptop",
  brand: "HP",
  type: "Intel Core i7 | RTX 4050",
  rating: 4.7,
  reviews: "2,080",
  price: 79999,
  originalPrice: 87999,
  discount: "9% off",
  badge: "Gaming",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
},
{
  id: 413,
  name: "Dell XPS 13 OLED Laptop",
  brand: "Dell",
  type: "Intel Core Ultra 7 | 16GB RAM",
  rating: 4.9,
  reviews: "1,450",
  price: 139999,
  originalPrice: 149999,
  discount: "7% off",
  badge: "Premium",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
},
{
  id: 414,
  name: "ASUS ROG Strix G16 Gaming Laptop",
  brand: "ASUS",
  type: "Intel Core i9 | RTX 4070",
  rating: 4.9,
  reviews: "1,920",
  price: 154999,
  originalPrice: 164999,
  discount: "6% off",
  badge: "Flagship",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
},
{
  id: 415,
  name: "Acer Swift Go 14 OLED",
  brand: "Acer",
  type: "Intel Core Ultra 5 | 16GB RAM",
  rating: 4.6,
  reviews: "1,140",
  price: 68999,
  originalPrice: 74999,
  discount: "8% off",
  badge: "Office",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
},
{
  id: 416,
  name: "MSI Modern 15 Business Laptop",
  brand: "MSI",
  type: "Intel Core i5 | 16GB RAM",
  rating: 4.5,
  reviews: "890",
  price: 55999,
  originalPrice: 61999,
  discount: "10% off",
  badge: "Business",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
}
  ],

  motherboard: [
  {
    id: 501,
    name: "ASUS PRIME B760M Motherboard",
    brand: "ASUS",
    type: "LGA1700",
    rating: 4.7,
    reviews: "690",
    price: 11999,
    originalPrice: 13999,
    discount: "14% off",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 502,
    name: "MSI B650 Gaming Plus WiFi Motherboard",
    brand: "MSI",
    type: "AM5",
    rating: 4.8,
    reviews: "540",
    price: 17999,
    originalPrice: 19999,
    discount: "10% off",
    badge: "Discount",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 503,
    name: "Gigabyte B550M DS3H Motherboard",
    brand: "Gigabyte",
    type: "AM4",
    rating: 4.6,
    reviews: "1,120",
    price: 8999,
    originalPrice: 10499,
    discount: "14% off",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 504,
    name: "ASRock B760 Pro RS Motherboard",
    brand: "ASRock",
    type: "LGA1700",
    rating: 4.5,
    reviews: "430",
    price: 12999,
    originalPrice: 14999,
    discount: "13% off",
    badge: "New",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 505,
    name: "ASUS ROG Strix B650-A Gaming WiFi",
    brand: "ASUS",
    type: "AM5",
    rating: 4.9,
    reviews: "780",
    price: 24999,
    originalPrice: 27999,
    discount: "11% off",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 506,
    name: "MSI MAG B760 Tomahawk WiFi DDR5",
    brand: "MSI",
    type: "LGA1700",
    rating: 4.8,
    reviews: "620",
    price: 20999,
    originalPrice: 22999,
    discount: "9% off",
    badge: "Gaming",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 507,
    name: "Gigabyte X670 AORUS Elite AX",
    brand: "Gigabyte",
    type: "AM5",
    rating: 4.9,
    reviews: "365",
    price: 28999,
    originalPrice: 31999,
    discount: "9% off",
    badge: "Flagship",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 508,
    name: "ASRock B550 Steel Legend",
    brand: "ASRock",
    type: "AM4",
    rating: 4.7,
    reviews: "940",
    price: 11999,
    originalPrice: 13999,
    discount: "14% off",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 509,
    name: "ASUS TUF Gaming Z790-Plus WiFi",
    brand: "ASUS",
    type: "LGA1700",
    rating: 4.8,
    reviews: "510",
    price: 29999,
    originalPrice: 32999,
    discount: "9% off",
    badge: "High-End",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 510,
    name: "MSI PRO H610M-E DDR4 Motherboard",
    brand: "MSI",
    type: "LGA1700",
    rating: 4.4,
    reviews: "860",
    price: 6499,
    originalPrice: 7499,
    discount: "13% off",
    badge: "Budget",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 511,
    name: "Gigabyte B760M Gaming X AX",
    brand: "Gigabyte",
    type: "LGA1700",
    rating: 4.7,
    reviews: "445",
    price: 15999,
    originalPrice: 17999,
    discount: "11% off",
    badge: "WiFi 6",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 512,
    name: "ASRock X870 Pro RS WiFi Motherboard",
    brand: "ASRock",
    type: "AM5",
    rating: 4.8,
    reviews: "275",
    price: 26999,
    originalPrice: 29999,
    discount: "10% off",
    badge: "Latest",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  }
],

  hardware: [
  {
    id: 601,
    name: "Corsair RM750x 750W Power Supply",
    brand: "Corsair",
    type: "80+ Gold, Fully Modular",
    rating: 4.7,
    reviews: "890",
    price: 9999,
    originalPrice: 11999,
    discount: "16% off",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 602,
    name: "NZXT H510 Mid Tower Cabinet",
    brand: "NZXT",
    type: "ATX Case",
    rating: 4.5,
    reviews: "615",
    price: 6999,
    originalPrice: 8499,
    discount: "18% off",
    badge: "Discount",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80"
  },
  {
    id: 603,
    name: "Cooler Master Hyper 212 CPU Air Cooler",
    brand: "Cooler Master",
    type: "120mm Air Cooler",
    rating: 4.6,
    reviews: "1,240",
    price: 3499,
    originalPrice: 4299,
    discount: "19% off",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 604,
    name: "DeepCool AK620 CPU Cooler",
    brand: "DeepCool",
    type: "Dual Tower Air Cooler",
    rating: 4.8,
    reviews: "745",
    price: 5999,
    originalPrice: 6999,
    discount: "14% off",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 605,
    name: "Lian Li Lancool 216 RGB Cabinet",
    brand: "Lian Li",
    type: "ATX Mid Tower",
    rating: 4.9,
    reviews: "530",
    price: 8999,
    originalPrice: 10499,
    discount: "14% off",
    badge: "Gaming",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80"
  },
  {
    id: 606,
    name: "Corsair iCUE 4000X RGB Cabinet",
    brand: "Corsair",
    type: "ATX Mid Tower",
    rating: 4.8,
    reviews: "670",
    price: 10999,
    originalPrice: 12999,
    discount: "15% off",
    badge: "RGB",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80"
  },
  {
    id: 607,
    name: "Cooler Master MWE 650 Bronze V2",
    brand: "Cooler Master",
    type: "650W, 80+ Bronze",
    rating: 4.6,
    reviews: "980",
    price: 5499,
    originalPrice: 6499,
    discount: "15% off",
    badge: "Value",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 608,
    name: "Corsair LL120 RGB Fan Kit",
    brand: "Corsair",
    type: "120mm RGB Fans (3-Pack)",
    rating: 4.7,
    reviews: "810",
    price: 7499,
    originalPrice: 8999,
    discount: "17% off",
    badge: "RGB",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 609,
    name: "Noctua NH-D15 CPU Cooler",
    brand: "Noctua",
    type: "Dual Tower Air Cooler",
    rating: 4.9,
    reviews: "1,320",
    price: 9499,
    originalPrice: 10999,
    discount: "14% off",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 610,
    name: "Arctic MX-6 Thermal Paste",
    brand: "Arctic",
    type: "4g Thermal Compound",
    rating: 4.8,
    reviews: "2,150",
    price: 799,
    originalPrice: 999,
    discount: "20% off",
    badge: "Essential",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 611,
    name: "ASUS ROG Strix 850W Power Supply",
    brand: "ASUS",
    type: "80+ Gold, Fully Modular",
    rating: 4.8,
    reviews: "465",
    price: 13999,
    originalPrice: 15999,
    discount: "13% off",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
  },
  {
    id: 612,
    name: "DeepCool CH560 Digital Cabinet",
    brand: "DeepCool",
    type: "ATX Mid Tower",
    rating: 4.7,
    reviews: "390",
    price: 8499,
    originalPrice: 9999,
    discount: "15% off",
    badge: "New",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80"
  }
],
gamingaccessories: [
  {
    id: 801,
    name: "Logitech G502 HERO Gaming Mouse",
    brand: "Logitech",
    type: "Wired RGB Mouse",
    rating: 4.8,
    reviews: "4,520",
    price: 4499,
    originalPrice: 5499,
    discount: "18% off",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&q=80"
  },
  {
    id: 802,
    name: "Razer BlackWidow V4 Gaming Keyboard",
    brand: "Razer",
    type: "Mechanical RGB Keyboard",
    rating: 4.8,
    reviews: "2,180",
    price: 9999,
    originalPrice: 11999,
    discount: "17% off",
    badge: "Gaming",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&q=80"
  },
  {
    id: 803,
    name: "SteelSeries Arctis Nova 3 Gaming Headset",
    brand: "SteelSeries",
    type: "Wired RGB Headset",
    rating: 4.7,
    reviews: "1,340",
    price: 6999,
    originalPrice: 8499,
    discount: "18% off",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
  },
  {
    id: 804,
    name: "HyperX Pulsefire Haste Gaming Mouse",
    brand: "HyperX",
    type: "Ultra-Light RGB Mouse",
    rating: 4.7,
    reviews: "980",
    price: 3999,
    originalPrice: 4999,
    discount: "20% off",
    badge: "Lightweight",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&q=80"
  },
  {
    id: 805,
    name: "Redragon K552 Kumara Keyboard",
    brand: "Redragon",
    type: "Mechanical Keyboard",
    rating: 4.6,
    reviews: "2,650",
    price: 2999,
    originalPrice: 3799,
    discount: "21% off",
    badge: "Budget",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&q=80"
  },
  {
    id: 806,
    name: "Corsair MM300 Extended Mouse Pad",
    brand: "Corsair",
    type: "Extended Gaming Mouse Pad",
    rating: 4.8,
    reviews: "1,120",
    price: 1799,
    originalPrice: 2299,
    discount: "22% off",
    badge: "Essential",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&q=80"
  },
  {
    id: 807,
    name: "Xbox Wireless Controller",
    brand: "Microsoft",
    type: "Bluetooth Game Controller",
    rating: 4.9,
    reviews: "3,540",
    price: 5499,
    originalPrice: 6499,
    discount: "15% off",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&q=80"
  },
  {
    id: 808,
    name: "Sony DualSense Wireless Controller",
    brand: "Sony",
    type: "PS5 Wireless Controller",
    rating: 4.9,
    reviews: "4,110",
    price: 5999,
    originalPrice: 6999,
    discount: "14% off",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&q=80"
  },
  {
    id: 809,
    name: "Logitech G733 Lightspeed Headset",
    brand: "Logitech",
    type: "Wireless RGB Gaming Headset",
    rating: 4.8,
    reviews: "1,460",
    price: 10999,
    originalPrice: 12999,
    discount: "15% off",
    badge: "Wireless",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
  },
  {
    id: 810,
    name: "Razer Gigantus V2 Mouse Pad",
    brand: "Razer",
    type: "Large Gaming Mouse Pad",
    rating: 4.7,
    reviews: "870",
    price: 1499,
    originalPrice: 1899,
    discount: "21% off",
    badge: "Value",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&q=80"
  },
  {
    id: 811,
    name: "ASUS ROG Chakram X Gaming Mouse",
    brand: "ASUS",
    type: "Wireless RGB Gaming Mouse",
    rating: 4.8,
    reviews: "650",
    price: 12999,
    originalPrice: 14999,
    discount: "13% off",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&q=80"
  },
  {
    id: 812,
    name: "HyperX Cloud III Gaming Headset",
    brand: "HyperX",
    type: "Wired Gaming Headset",
    rating: 4.8,
    reviews: "1,090",
    price: 7999,
    originalPrice: 9499,
    discount: "16% off",
    badge: "New",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
  }
],
processor: [
  {
    id: 201,
    name: "Intel Core i5-14400F Desktop Processor",
    brand: "Intel",
    type: "10 Cores | 16 Threads",
    rating: 4.8,
    reviews: "2,430",
    price: 18499,
    originalPrice: 20999,
    discount: "12% off",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 202,
    name: "Intel Core i7-14700K Desktop Processor",
    brand: "Intel",
    type: "20 Cores | 28 Threads",
    rating: 4.9,
    reviews: "1,520",
    price: 38999,
    originalPrice: 41999,
    discount: "7% off",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 203,
    name: "Intel Core i9-14900K Desktop Processor",
    brand: "Intel",
    type: "24 Cores | 32 Threads",
    rating: 5.0,
    reviews: "980",
    price: 56999,
    originalPrice: 59999,
    discount: "5% off",
    badge: "Flagship",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 204,
    name: "AMD Ryzen 5 7600 Processor",
    brand: "AMD",
    type: "6 Cores | 12 Threads",
    rating: 4.8,
    reviews: "2,180",
    price: 19499,
    originalPrice: 21999,
    discount: "11% off",
    badge: "Gaming",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 205,
    name: "AMD Ryzen 7 7700X Processor",
    brand: "AMD",
    type: "8 Cores | 16 Threads",
    rating: 4.9,
    reviews: "1,760",
    price: 30999,
    originalPrice: 33999,
    discount: "9% off",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 206,
    name: "AMD Ryzen 9 7900X Processor",
    brand: "AMD",
    type: "12 Cores | 24 Threads",
    rating: 4.9,
    reviews: "1,240",
    price: 43999,
    originalPrice: 46999,
    discount: "6% off",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 207,
    name: "Intel Core i3-14100 Desktop Processor",
    brand: "Intel",
    type: "4 Cores | 8 Threads",
    rating: 4.5,
    reviews: "1,320",
    price: 11499,
    originalPrice: 12999,
    discount: "12% off",
    badge: "Budget",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 208,
    name: "AMD Ryzen 5 5600GT Processor",
    brand: "AMD",
    type: "6 Cores | 12 Threads",
    rating: 4.7,
    reviews: "2,950",
    price: 12499,
    originalPrice: 14499,
    discount: "14% off",
    badge: "Value",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 209,
    name: "Intel Core Ultra 7 265K Processor",
    brand: "Intel",
    type: "20 Cores",
    rating: 4.9,
    reviews: "620",
    price: 46999,
    originalPrice: 49999,
    discount: "6% off",
    badge: "Latest",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 210,
    name: "AMD Ryzen 7 8700G Processor",
    brand: "AMD",
    type: "8 Cores | Radeon Graphics",
    rating: 4.8,
    reviews: "860",
    price: 28999,
    originalPrice: 31999,
    discount: "9% off",
    badge: "APU",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 211,
    name: "Intel Core i5-14600K Desktop Processor",
    brand: "Intel",
    type: "14 Cores | 20 Threads",
    rating: 4.8,
    reviews: "1,430",
    price: 28999,
    originalPrice: 31999,
    discount: "9% off",
    badge: "Recommended",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 212,
    name: "AMD Ryzen 9 9950X Processor",
    brand: "AMD",
    type: "16 Cores | 32 Threads",
    rating: 5.0,
    reviews: "540",
    price: 64999,
    originalPrice: 68999,
    discount: "6% off",
    badge: "Ultimate",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  }
],
ram: [
  {
    id: 501,
    name: "Corsair Vengeance LPX 16GB DDR4 RAM",
    brand: "Corsair",
    type: "16GB (2x8GB) | 3200MHz",
    rating: 4.8,
    reviews: "8,240",
    price: 4299,
    originalPrice: 5199,
    discount: "17% off",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80"
  },
  {
    id: 502,
    name: "Corsair Vengeance RGB Pro 32GB DDR4 RAM",
    brand: "Corsair",
    type: "32GB (2x16GB) | 3600MHz RGB",
    rating: 4.9,
    reviews: "5,180",
    price: 9299,
    originalPrice: 10999,
    discount: "15% off",
    badge: "RGB",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80"
  },
  {
    id: 503,
    name: "G.SKILL Trident Z5 RGB 32GB DDR5 RAM",
    brand: "G.SKILL",
    type: "32GB (2x16GB) | 6000MHz DDR5",
    rating: 4.9,
    reviews: "3,420",
    price: 12499,
    originalPrice: 13999,
    discount: "11% off",
    badge: "Gaming",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80"
  },
  {
    id: 504,
    name: "Kingston Fury Beast 16GB DDR5 RAM",
    brand: "Kingston",
    type: "16GB | 5600MHz DDR5",
    rating: 4.7,
    reviews: "2,890",
    price: 4899,
    originalPrice: 5799,
    discount: "16% off",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80"
  },
  {
    id: 505,
    name: "Crucial Pro 32GB DDR5 RAM",
    brand: "Crucial",
    type: "32GB (2x16GB) | 6000MHz",
    rating: 4.8,
    reviews: "2,140",
    price: 10999,
    originalPrice: 12499,
    discount: "12% off",
    badge: "Recommended",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80"
  },
  {
    id: 506,
    name: "ADATA XPG Lancer RGB 16GB DDR5 RAM",
    brand: "ADATA",
    type: "16GB | 5200MHz RGB",
    rating: 4.6,
    reviews: "1,860",
    price: 5599,
    originalPrice: 6499,
    discount: "14% off",
    badge: "RGB",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80"
  },
  {
    id: 507,
    name: "TeamGroup T-Force Delta RGB 32GB DDR5 RAM",
    brand: "TeamGroup",
    type: "32GB (2x16GB) | 6400MHz",
    rating: 4.8,
    reviews: "1,430",
    price: 13499,
    originalPrice: 14999,
    discount: "10% off",
    badge: "High Speed",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80"
  },
  {
    id: 508,
    name: "Patriot Viper Steel 16GB DDR4 RAM",
    brand: "Patriot",
    type: "16GB | 3600MHz",
    rating: 4.7,
    reviews: "2,010",
    price: 3999,
    originalPrice: 4699,
    discount: "15% off",
    badge: "Value",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80"
  },
  {
    id: 509,
    name: "Kingston Fury Renegade 64GB DDR5 RAM",
    brand: "Kingston",
    type: "64GB (2x32GB) | 6400MHz",
    rating: 4.9,
    reviews: "980",
    price: 22999,
    originalPrice: 24999,
    discount: "8% off",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80"
  },
  {
    id: 510,
    name: "Corsair Dominator Titanium RGB 64GB DDR5 RAM",
    brand: "Corsair",
    type: "64GB (2x32GB) | 6600MHz",
    rating: 5.0,
    reviews: "740",
    price: 28999,
    originalPrice: 30999,
    discount: "6% off",
    badge: "Flagship",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80"
  }
],
networking: [
  {
    id: 901,
    name: "TP-Link Archer AX55 Wi-Fi 6 Router",
    brand: "TP-Link",
    type: "AX3000 Dual Band",
    rating: 4.7,
    reviews: "5,820",
    price: 6999,
    originalPrice: 8499,
    discount: "18% off",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=300&q=80"
  },
  {
    id: 902,
    name: "ASUS RT-AX58U Wi-Fi 6 Router",
    brand: "ASUS",
    type: "AX3000 Dual Band",
    rating: 4.8,
    reviews: "3,210",
    price: 10999,
    originalPrice: 12499,
    discount: "12% off",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=300&q=80"
  },
  {
    id: 903,
    name: "Netgear Nighthawk AX5400 Router",
    brand: "Netgear",
    type: "Wi-Fi 6 | Gigabit",
    rating: 4.9,
    reviews: "2,870",
    price: 16999,
    originalPrice: 18999,
    discount: "11% off",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=300&q=80"
  },
  {
    id: 904,
    name: "D-Link DIR-825 Gigabit Router",
    brand: "D-Link",
    type: "AC1200 Dual Band",
    rating: 4.5,
    reviews: "4,150",
    price: 2999,
    originalPrice: 3799,
    discount: "21% off",
    badge: "Budget",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=300&q=80"
  },
  {
    id: 905,
    name: "TP-Link TL-SG108 8-Port Gigabit Switch",
    brand: "TP-Link",
    type: "8-Port Unmanaged",
    rating: 4.8,
    reviews: "3,690",
    price: 2199,
    originalPrice: 2699,
    discount: "19% off",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=300&q=80"
  },
  {
    id: 906,
    name: "Cisco CBS110-8T-D Switch",
    brand: "Cisco",
    type: "8-Port Gigabit",
    rating: 4.7,
    reviews: "1,420",
    price: 6499,
    originalPrice: 7299,
    discount: "11% off",
    badge: "Business",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=300&q=80"
  },
  {
    id: 907,
    name: "TP-Link RE450 Wi-Fi Range Extender",
    brand: "TP-Link",
    type: "AC1750 Dual Band",
    rating: 4.6,
    reviews: "2,530",
    price: 3799,
    originalPrice: 4499,
    discount: "16% off",
    badge: "Recommended",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=300&q=80"
  },
  {
    id: 908,
    name: "Mercusys Halo H50G Mesh Wi-Fi System",
    brand: "Mercusys",
    type: "AC1900 Mesh (2 Pack)",
    rating: 4.7,
    reviews: "1,980",
    price: 6999,
    originalPrice: 8199,
    discount: "15% off",
    badge: "Mesh",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=300&q=80"
  },
  {
    id: 909,
    name: "TP-Link UE300 USB 3.0 Ethernet Adapter",
    brand: "TP-Link",
    type: "USB to Gigabit LAN",
    rating: 4.8,
    reviews: "6,120",
    price: 1499,
    originalPrice: 1899,
    discount: "21% off",
    badge: "Essential",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=300&q=80"
  },
  {
    id: 910,
    name: "ASUS ZenWiFi XT9 Mesh Wi-Fi System",
    brand: "ASUS",
    type: "AX7800 Tri-Band",
    rating: 4.9,
    reviews: "960",
    price: 32999,
    originalPrice: 35999,
    discount: "8% off",
    badge: "Flagship",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=300&q=80"
  }
],
smartdevices: [
  {
    id: 1001,
    name: "Apple Watch Series 10 Smartwatch",
    brand: "Apple",
    type: "GPS | 46mm",
    rating: 4.9,
    reviews: "4,520",
    price: 46999,
    originalPrice: 49999,
    discount: "6% off",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
  },
  {
    id: 1002,
    name: "Samsung Galaxy Watch Ultra",
    brand: "Samsung",
    type: "LTE | 47mm",
    rating: 4.8,
    reviews: "3,180",
    price: 42999,
    originalPrice: 46999,
    discount: "9% off",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
  },
  {
    id: 1003,
    name: "boAt Storm Call 3 Smartwatch",
    brand: "boAt",
    type: "Bluetooth Calling | 1.83-inch",
    rating: 4.5,
    reviews: "12,640",
    price: 1799,
    originalPrice: 2999,
    discount: "40% off",
    badge: "Budget",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
  },
  {
    id: 1004,
    name: "Noise ColorFit Pro 5 Smartwatch",
    brand: "Noise",
    type: "AMOLED Display",
    rating: 4.6,
    reviews: "8,950",
    price: 3499,
    originalPrice: 4999,
    discount: "30% off",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
  },
  {
    id: 1005,
    name: "Google Nest Mini Smart Speaker",
    brand: "Google",
    type: "Voice Assistant",
    rating: 4.7,
    reviews: "5,230",
    price: 3499,
    originalPrice: 4499,
    discount: "22% off",
    badge: "Smart Home",
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=300&q=80"
  },
  {
    id: 1006,
    name: "Amazon Echo Dot (5th Gen)",
    brand: "Amazon",
    type: "Alexa Smart Speaker",
    rating: 4.8,
    reviews: "18,420",
    price: 4499,
    originalPrice: 5499,
    discount: "18% off",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=300&q=80"
  },
  {
    id: 1007,
    name: "Xiaomi Smart Band 9",
    brand: "Xiaomi",
    type: "Fitness Tracker",
    rating: 4.7,
    reviews: "6,780",
    price: 2999,
    originalPrice: 3999,
    discount: "25% off",
    badge: "Fitness",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
  },
  {
    id: 1008,
    name: "TP-Link Tapo C210 Smart Security Camera",
    brand: "TP-Link",
    type: "360° Wi-Fi Camera",
    rating: 4.8,
    reviews: "7,340",
    price: 2599,
    originalPrice: 3299,
    discount: "21% off",
    badge: "Security",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80"
  },
  {
    id: 1009,
    name: "Philips Hue Smart LED Starter Kit",
    brand: "Philips",
    type: "RGB Smart Bulbs",
    rating: 4.9,
    reviews: "2,140",
    price: 8999,
    originalPrice: 9999,
    discount: "10% off",
    badge: "Smart Lighting",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80"
  },
  {
    id: 1010,
    name: "Apple AirTag (4 Pack)",
    brand: "Apple",
    type: "Bluetooth Item Tracker",
    rating: 4.9,
    reviews: "10,860",
    price: 9999,
    originalPrice: 10999,
    discount: "9% off",
    badge: "Recommended",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80"
  }
],
ssd: [
  {
    id: 701,
    name: "Samsung 990 PRO NVMe SSD",
    brand: "Samsung",
    type: "1TB PCIe Gen4 M.2",
    rating: 4.9,
    reviews: "2,340",
    price: 10999,
    originalPrice: 12999,
    discount: "15% off",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 702,
    name: "WD Black SN850X NVMe SSD",
    brand: "Western Digital",
    type: "1TB PCIe Gen4 M.2",
    rating: 4.8,
    reviews: "1,850",
    price: 9999,
    originalPrice: 11999,
    discount: "17% off",
    badge: "Gaming",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 703,
    name: "Crucial P3 Plus NVMe SSD",
    brand: "Crucial",
    type: "1TB PCIe Gen4 M.2",
    rating: 4.7,
    reviews: "1,420",
    price: 6499,
    originalPrice: 7999,
    discount: "19% off",
    badge: "Value",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 704,
    name: "Kingston NV2 NVMe SSD",
    brand: "Kingston",
    type: "500GB PCIe Gen4 M.2",
    rating: 4.6,
    reviews: "1,130",
    price: 3499,
    originalPrice: 4499,
    discount: "22% off",
    badge: "Budget",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 705,
    name: "Seagate FireCuda 530 SSD",
    brand: "Seagate",
    type: "1TB PCIe Gen4 M.2",
    rating: 4.8,
    reviews: "975",
    price: 11499,
    originalPrice: 13499,
    discount: "15% off",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 706,
    name: "Samsung 870 EVO SATA SSD",
    brand: "Samsung",
    type: "1TB SATA 2.5-inch",
    rating: 4.8,
    reviews: "2,890",
    price: 7299,
    originalPrice: 8499,
    discount: "14% off",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 707,
    name: "WD Blue SA510 SATA SSD",
    brand: "Western Digital",
    type: "500GB SATA 2.5-inch",
    rating: 4.6,
    reviews: "1,540",
    price: 3899,
    originalPrice: 4999,
    discount: "22% off",
    badge: "Discount",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 708,
    name: "Crucial MX500 SATA SSD",
    brand: "Crucial",
    type: "1TB SATA 2.5-inch",
    rating: 4.7,
    reviews: "1,980",
    price: 6799,
    originalPrice: 7999,
    discount: "15% off",
    badge: "Reliable",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 709,
    name: "Kingston KC3000 NVMe SSD",
    brand: "Kingston",
    type: "2TB PCIe Gen4 M.2",
    rating: 4.8,
    reviews: "820",
    price: 17999,
    originalPrice: 20999,
    discount: "14% off",
    badge: "High Capacity",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 710,
    name: "ADATA XPG GAMMIX S70 Blade",
    brand: "ADATA",
    type: "1TB PCIe Gen4 M.2",
    rating: 4.7,
    reviews: "690",
    price: 8799,
    originalPrice: 9999,
    discount: "12% off",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 711,
    name: "Lexar NM790 NVMe SSD",
    brand: "Lexar",
    type: "2TB PCIe Gen4 M.2",
    rating: 4.8,
    reviews: "510",
    price: 14999,
    originalPrice: 16999,
    discount: "12% off",
    badge: "Latest",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  },
  {
    id: 712,
    name: "TeamGroup MP44 NVMe SSD",
    brand: "TeamGroup",
    type: "1TB PCIe Gen4 M.2",
    rating: 4.7,
    reviews: "430",
    price: 7999,
    originalPrice: 9499,
    discount: "16% off",
    badge: "New",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80"
  }
]
};

const categories = [
  { icon: Cpu, label: "Processors", route: "/processor" },
  { icon: CircuitBoard, label: "Graphics Cards", route: "/graphicscard" },
  { icon: Laptop, label: "Laptops", route: "/laptop" },
  { icon: CircuitBoard, label: "Motherboards", route: "/motherboard" },
  { icon: MemoryStick, label: "RAM Memory", route: "/ram" },
  { icon: HardDrive, label: "SSD Storage", route: "/ssd" },
  { icon: Monitor, label: "Monitors", route: "/monitors" },
  { icon: Gamepad2, label: "Gaming Accessories", route: "/gamingaccessories" },
  { icon: Wifi, label: "Networking", route: "/networking" },
  { icon: Watch, label: "Smart Devices", route: "/smartdevices" },
];



function Products() {

  const { category } = useParams();

  const productsData = Allproducts[category] || [];

  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  // Filter + sort state for the reusable FilterSidebar.
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('popularity');

  // Reset filters/sort whenever the category changes so stale
  // filters from one category don't leak into another.
  useEffect(() => {
    setFilters({});
    setSortBy('popularity');
  }, [category]);

  const visibleProducts = applySort(applyFilters(productsData, filters), sortBy);

  const handleAddToCart = (productName) => {
    console.log(`Added ${productName} to cart.`);
  };

  return (
    <div className="techforage-site">
      <div className="wrap">
        <Navbar />

        <div className="content-layout">
          <Sidebar categories={categories} />

          {productsData.length > 0 && (
            <FilterSidebar
              category={category}
              products={productsData}
              filters={filters}
              onFilterChange={setFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          )}

          <main className="main-content">
            {productsData.length === 0 ? (
              <div style={{ padding: "60px 0", textAlign: "center", color: "var(--ink-dim, #8f98a8)" }}>
                <h2 style={{ color: "var(--ink, #e9edf3)" }}>No products found</h2>
                <p>We don't have any products listed for "{category}" yet.</p>
              </div>
            ) : visibleProducts.length === 0 ? (
              <div style={{ padding: "60px 0", textAlign: "center", color: "var(--ink-dim, #8f98a8)" }}>
                <h2 style={{ color: "var(--ink, #e9edf3)" }}>No products match your filters</h2>
                <p>Try clearing some filters to see more results.</p>
              </div>
            ) : (
              <div className="products-grid">
                {visibleProducts.map((product) => {
                  const saved = isInWatchlist(product.id);
                  return (
                    <div key={product.id} className="product-card">
                      <div className="card-header">
                        <span className={`badge ${product.badge.toLowerCase()}`}>
                          {product.badge}
                        </span>
                        <button
                          className="wishlist-btn"
                          onClick={() => toggleWatchlist(product)}
                          aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
                        >
                          <Heart
                            size={16}
                            fill={saved ? "#ff4081" : "none"}
                            color={saved ? "#ff4081" : "currentColor"}
                          />
                        </button>
                      </div>
                      <div className="product-img-wrapper">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="product-info">
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-variant">{product.type}</p>

                        <div className="rating-row">
                          <span className="rating-tag">★ {product.rating}</span>
                          <span className="review-count">({product.reviews})</span>
                          <span className="assured-tag">✓ Assured</span>
                        </div>

                        <div className="price-row">
                          <span className="current-price">₹{product.price}</span>
                          <span className="original-price">₹{product.originalPrice}</span>
                          <span className="discount-pct">{product.discount}</span>
                        </div>

                        <button
                          className="add-to-cart-btn"
                          onClick={() => handleAddToCart(product.name)}
                        >
                          🛒 Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Products;