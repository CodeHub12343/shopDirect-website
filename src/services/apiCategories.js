import { API_BASE_URL } from '../config/api';

// Mock data for fallback when API is not available
const mockCategories = [
  {
    _id: "688cb3de55658900de661304",
    name: "Electronics",
    description:
      "Devices, gadgets, and digital equipment like phones, laptops, cameras, headphones, and more. Features the latest innovations from Apple, Samsung, Sony, and other leading brands.",
    createdAt: "2025-06-27T05:31:45.827Z",
    updatedAt: "2025-06-27T05:31:45.827Z",
    __v: 0,
    id: "688cb3de55658900de661304",
  },
  {
    _id: "688cb3de55658900de661307",
    name: "Home & Kitchen Appliances",
    description:
      "Essential home and kitchen appliances that make daily life easier and more enjoyable. From Instant Pot pressure cookers to KitchenAid mixers and Vitamix blenders, transform your cooking experience.",
    createdAt: "2025-06-27T05:31:45.827Z",
    updatedAt: "2025-06-27T05:31:45.827Z",
    __v: 0,
    id: "688cb3de55658900de661307",
  },
  {
    _id: "688cb3de55658900de661308",
    name: "Books & Reading Devices",
    description:
      "Digital reading devices and accessories for book lovers. Discover the latest Kindle Paperwhite and other e-readers that provide the perfect reading experience with adjustable lighting and long battery life.",
    createdAt: "2025-06-27T05:31:45.827Z",
    updatedAt: "2025-06-27T05:31:45.827Z",
    __v: 0,
    id: "688cb3de55658900de661308",
  },
  {
    _id: "688cb3de55658900de661305",
    name: "Fashion & Apparel",
    description:
      "Trendy fashion items and premium apparel including athletic wear, casual clothing, footwear, and accessories. From Nike and Adidas to Lululemon and Levi's, find your perfect style.",
    createdAt: "2025-06-27T05:31:45.827Z",
    updatedAt: "2025-06-27T05:31:45.827Z",
    __v: 0,
    id: "688cb3de55658900de661305",
  },
  {
    _id: "688cb3de55658900de661306",
    name: "TVs & Home Entertainment",
    description:
      "Immersive home entertainment systems featuring 4K and 8K televisions, smart TVs, gaming consoles, and audio equipment. Experience cinema-quality viewing with Samsung QLED, LG OLED, and more.",
    createdAt: "2025-06-27T05:31:45.827Z",
    updatedAt: "2025-06-27T05:31:45.827Z",
    __v: 0,
    id: "688cb3de55658900de661306",
  },
];

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);

    if (!response.ok) {
      console.warn("API server not available, using mock data");
      return mockCategories;
    }

    const data = await response.json();
    return data.data.categories;
  } catch (error) {
    console.warn("Error fetching categories, using mock data:", error.message);
    return mockCategories;
  }
};
