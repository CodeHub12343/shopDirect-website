// Mock product data for fallback
const getMockProducts = () => {
  return [
    {
      _id: "1",
      name: "Premium Wireless Headphones",
      brand: "AudioTech Pro",
      price: 299.99,
      originalPrice: 399.99,
      discountPercentage: 25,
      ratingsAverage: 4.7,
      ratingsQuantity: 1247,
      stockQuantity: 15,
      imageCover: "headPhones-images-1.jpg",
      images: [
        "headPhones-images-1.jpg",
        "headPhones-images-2.jpg",
        "headPhones-images-3.jpg",
        "headPhones-images-4.jpg",
      ],
      category: { _id: "688cb3de55658900de661304", name: "Electronics" },
      colors: ["black", "white", "blue"],
      sizes: ["M", "L"],
      isNew: true,
      isBestSeller: true,
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      _id: "2",
      name: "Smart Fitness Watch",
      brand: "FitTech",
      price: 199.99,
      originalPrice: 249.99,
      discountPercentage: 20,
      ratingsAverage: 4.5,
      ratingsQuantity: 892,
      stockQuantity: 8,
      imageCover: "wrist-watche-1.webp",
      images: [
        "wrist-watche-1.webp",
        "wrist-watche-2.jpg",
        "wrist-watche-3.jpg",
        "wrist-watche-4.jpg",
      ],
      category: { _id: "688cb3de55658900de661304", name: "Electronics" },
      colors: ["black", "silver"],
      sizes: ["S", "M", "L"],
      isNew: false,
      isBestSeller: true,
      createdAt: "2024-01-10T10:00:00Z",
    },
    {
      _id: "3",
      name: "Wireless Bluetooth Speaker",
      brand: "Sony",
      price: 89.99,
      originalPrice: 89.99,
      discountPercentage: 0,
      ratingsAverage: 4.3,
      ratingsQuantity: 567,
      stockQuantity: 25,
      imageCover: "speaker-1.jpg",
      images: ["speaker-1.jpg", "speaker-2.jpg"],
      category: { _id: "688cb3de55658900de661304", name: "Electronics" },
      colors: ["black", "white"],
      sizes: ["M"],
      isNew: false,
      isBestSeller: false,
      createdAt: "2024-01-05T10:00:00Z",
    },
    {
      _id: "4",
      name: "Gaming Laptop",
      brand: "Dell",
      price: 1299.99,
      originalPrice: 1599.99,
      discountPercentage: 19,
      ratingsAverage: 4.8,
      ratingsQuantity: 2341,
      stockQuantity: 5,
      imageCover: "laptop-1.jpg",
      images: ["laptop-1.jpg", "laptop-2.jpg"],
      category: { _id: "688cb3de55658900de661304", name: "Electronics" },
      colors: ["black"],
      sizes: ["L"],
      isNew: true,
      isBestSeller: true,
      createdAt: "2024-01-20T10:00:00Z",
    },
    {
      _id: "5",
      name: "Smartphone Pro",
      brand: "Apple",
      price: 999.99,
      originalPrice: 999.99,
      discountPercentage: 0,
      ratingsAverage: 4.9,
      ratingsQuantity: 3456,
      stockQuantity: 12,
      imageCover: "phone-1.jpg",
      images: ["phone-1.jpg", "phone-2.jpg"],
      category: { _id: "688cb3de55658900de661304", name: "Electronics" },
      colors: ["black", "white", "blue"],
      sizes: ["M"],
      isNew: false,
      isBestSeller: true,
      createdAt: "2024-01-01T10:00:00Z",
    },
    {
      _id: "6",
      name: "Wireless Earbuds",
      brand: "Samsung",
      price: 149.99,
      originalPrice: 199.99,
      discountPercentage: 25,
      ratingsAverage: 4.4,
      ratingsQuantity: 789,
      stockQuantity: 18,
      imageCover: "earbuds-1.jpg",
      images: ["earbuds-1.jpg", "earbuds-2.jpg"],
      category: { _id: "688cb3de55658900de661304", name: "Electronics" },
      colors: ["black", "white"],
      sizes: ["S", "M"],
      isNew: false,
      isBestSeller: false,
      createdAt: "2024-01-12T10:00:00Z",
    },
    {
      _id: "7",
      name: "Instant Pot Pressure Cooker",
      brand: "Instant Pot",
      price: 89.99,
      originalPrice: 119.99,
      discountPercentage: 25,
      ratingsAverage: 4.6,
      ratingsQuantity: 1234,
      stockQuantity: 20,
      imageCover: "pressure-cooker-1.jpg",
      images: ["pressure-cooker-1.jpg", "pressure-cooker-2.jpg"],
      category: {
        _id: "688cb3de55658900de661307",
        name: "Home & Kitchen Appliances",
      },
      colors: ["black", "silver"],
      sizes: ["6L", "8L"],
      isNew: false,
      isBestSeller: true,
      createdAt: "2024-01-08T10:00:00Z",
    },
    {
      _id: "8",
      name: "KitchenAid Stand Mixer",
      brand: "KitchenAid",
      price: 299.99,
      originalPrice: 399.99,
      discountPercentage: 25,
      ratingsAverage: 4.8,
      ratingsQuantity: 567,
      stockQuantity: 10,
      imageCover: "mixer-1.jpg",
      images: ["mixer-1.jpg", "mixer-2.jpg"],
      category: {
        _id: "688cb3de55658900de661307",
        name: "Home & Kitchen Appliances",
      },
      colors: ["red", "black", "silver"],
      sizes: ["5QT"],
      isNew: false,
      isBestSeller: true,
      createdAt: "2024-01-03T10:00:00Z",
    },
    {
      _id: "9",
      name: "Kindle Paperwhite",
      brand: "Amazon",
      price: 139.99,
      originalPrice: 159.99,
      discountPercentage: 12,
      ratingsAverage: 4.7,
      ratingsQuantity: 2345,
      stockQuantity: 15,
      imageCover: "kindle-1.jpg",
      images: ["kindle-1.jpg", "kindle-2.jpg"],
      category: {
        _id: "688cb3de55658900de661308",
        name: "Books & Reading Devices",
      },
      colors: ["black"],
      sizes: ["8GB", "32GB"],
      isNew: false,
      isBestSeller: true,
      createdAt: "2024-01-18T10:00:00Z",
    },
    {
      _id: "10",
      name: "Nike Running Shoes",
      brand: "Nike",
      price: 129.99,
      originalPrice: 149.99,
      discountPercentage: 13,
      ratingsAverage: 4.5,
      ratingsQuantity: 890,
      stockQuantity: 25,
      imageCover: "nike-shoes-1.jpg",
      images: ["nike-shoes-1.jpg", "nike-shoes-2.jpg"],
      category: { _id: "688cb3de55658900de661305", name: "Fashion & Apparel" },
      colors: ["black", "white", "red"],
      sizes: ["7", "8", "9", "10"],
      isNew: false,
      isBestSeller: true,
      createdAt: "2024-01-14T10:00:00Z",
    },
    {
      _id: "11",
      name: "Samsung QLED TV",
      brand: "Samsung",
      price: 1299.99,
      originalPrice: 1799.99,
      discountPercentage: 28,
      ratingsAverage: 4.9,
      ratingsQuantity: 456,
      stockQuantity: 8,
      imageCover: "samsung-tv-1.jpg",
      images: ["samsung-tv-1.jpg", "samsung-tv-2.jpg"],
      category: {
        _id: "688cb3de55658900de661306",
        name: "TVs & Home Entertainment",
      },
      colors: ["black"],
      sizes: ["65 inch"],
      isNew: true,
      isBestSeller: true,
      createdAt: "2024-01-22T10:00:00Z",
    },
  ];
};

const getMockProduct = (productId) => {
  const mockProducts = {
    1: {
      _id: "1",
      name: "Premium Wireless Headphones",
      brand: "AudioTech Pro",
      price: 299.99,
      originalPrice: 399.99,
      discountPercentage: 25,
      ratingsAverage: 4.7,
      ratingsQuantity: 1247,
      stockQuantity: 15,
      description:
        "Experience crystal-clear sound with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and premium comfort.",
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Bluetooth 5.0",
        "Premium comfort design",
        "Built-in microphone",
        "Touch controls",
      ],
      specifications: {
        "Battery Life": "30 hours",
        Connectivity: "Bluetooth 5.0",
        Weight: "250g",
        "Driver Size": "40mm",
        "Frequency Response": "20Hz-20kHz",
        Impedance: "32Ω",
      },
      images: [
        "headPhones-images-1.jpg",
        "headPhones-images-2.jpg",
        "headPhones-images-3.jpg",
        "headPhones-images-4.jpg",
      ],
      imageCover: "headPhones-images-1.jpg",
      variants: {
        color: [
          {
            name: "Black",
            value: "black",
            stock: 8,
            image: "headPhones-images-1.jpg",
          },
          {
            name: "White",
            value: "white",
            stock: 5,
            image: "headPhones-images-2.jpg",
          },
          {
            name: "Blue",
            value: "blue",
            stock: 2,
            image: "headPhones-images-3.jpg",
          },
        ],
      },
      category: { _id: "688cb3de55658900de661304", name: "Electronics" },
      colors: ["black", "white", "blue"],
      sizes: ["M", "L"],
      isNew: true,
      isBestSeller: true,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      reviews: [
        {
          _id: "review1",
          review:
            "Excellent sound quality and very comfortable for long listening sessions. The noise cancellation is impressive!",
          rating: 5,
          user: {
            _id: "user1",
            name: "John Smith",
            id: "user1",
          },
          product: {
            _id: "1",
            name: "Premium Wireless Headphones",
            category: { _id: "688cb3de55658900de661304", name: "Electronics" },
            id: "1",
          },
          createdAt: "2024-01-20T10:00:00Z",
          updatedAt: "2024-01-20T10:00:00Z",
          id: "review1",
        },
        {
          _id: "review2",
          review:
            "Great headphones but the battery life could be better. Sound quality is top-notch though.",
          rating: 4,
          user: {
            _id: "user2",
            name: "Sarah Johnson",
            id: "user2",
          },
          product: {
            _id: "1",
            name: "Premium Wireless Headphones",
            category: { _id: "688cb3de55658900de661304", name: "Electronics" },
            id: "1",
          },
          createdAt: "2024-01-18T10:00:00Z",
          updatedAt: "2024-01-18T10:00:00Z",
          id: "review2",
        },
      ],
      tags: ["wireless", "headphones", "audio", "bluetooth"],
      shipping: {
        free: true,
        estimatedDays: "2-3 business days",
        returnPolicy: "30-day easy returns",
      },
    },
    2: {
      _id: "2",
      name: "Smart Fitness Watch",
      brand: "FitTech",
      price: 199.99,
      originalPrice: 249.99,
      discountPercentage: 20,
      ratingsAverage: 4.5,
      ratingsQuantity: 892,
      stockQuantity: 8,
      description:
        "Track your fitness goals with our advanced smart watch. Monitor heart rate, sleep, and activity levels with precision.",
      features: [
        "Heart rate monitoring",
        "Sleep tracking",
        "GPS navigation",
        "Water resistant",
        "7-day battery life",
        "Smart notifications",
      ],
      specifications: {
        Display: '1.4" AMOLED',
        "Battery Life": "7 days",
        "Water Resistance": "5ATM",
        Weight: "45g",
        Compatibility: "iOS/Android",
        Sensors: "Heart rate, GPS, Accelerometer",
      },
      images: [
        "wrist-watche-1.webp",
        "wrist-watche-2.jpg",
        "wrist-watche-3.jpg",
        "wrist-watche-4.jpg",
      ],
      imageCover: "wrist-watche-1.webp",
      variants: {
        color: [
          {
            name: "Black",
            value: "black",
            stock: 5,
            image: "wrist-watche-1.webp",
          },
          {
            name: "Silver",
            value: "silver",
            stock: 3,
            image: "wrist-watche-2.jpg",
          },
        ],
      },
      category: { _id: "688cb3de55658900de661304", name: "Electronics" },
      colors: ["black", "silver"],
      sizes: ["S", "M", "L"],
      isNew: false,
      isBestSeller: true,
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
      reviews: [
        {
          _id: "review3",
          review:
            "Perfect for tracking my workouts and daily activities. The heart rate monitor is very accurate.",
          rating: 5,
          user: {
            _id: "user3",
            name: "Mike Wilson",
            id: "user3",
          },
          product: {
            _id: "2",
            name: "Smart Fitness Watch",
            category: { _id: "688cb3de55658900de661304", name: "Electronics" },
            id: "2",
          },
          createdAt: "2024-01-12T10:00:00Z",
          updatedAt: "2024-01-12T10:00:00Z",
          id: "review3",
        },
      ],
      tags: ["fitness", "smartwatch", "health", "tracking"],
      shipping: {
        free: true,
        estimatedDays: "1-2 business days",
        returnPolicy: "30-day easy returns",
      },
    },
    // Add more mock products with reviews...
  };

  return (
    mockProducts[productId] || {
      _id: productId,
      name: "Product Not Found",
      brand: "Unknown",
      price: 0,
      ratingsAverage: 0,
      ratingsQuantity: 0,
      stockQuantity: 0,
      description: "This product could not be found.",
      images: [],
      imageCover: "",
      category: { _id: "", name: "Unknown" },
      reviews: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );
};

// Client-side filtering and sorting functions
const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];

  switch (sortBy) {
    case "newest":
      return sortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

    case "price-low":
      return sortedProducts.sort((a, b) => a.price - b.price);

    case "price-high":
      return sortedProducts.sort((a, b) => b.price - a.price);

    case "popularity":
      return sortedProducts.sort(
        (a, b) => b.ratingsQuantity - a.ratingsQuantity
      );

    case "rating":
      return sortedProducts.sort((a, b) => b.ratingsAverage - a.ratingsAverage);

    case "discount":
      return sortedProducts.sort(
        (a, b) => b.discountPercentage - a.discountPercentage
      );

    default:
      return sortedProducts;
  }
};

export const getProducts = async (filters = {}) => {
  try {
    // Build query string from filters to match backend ApiFeatures expectations
    const queryParams = new URLSearchParams();

    // Pagination parameters
    if (filters.page) queryParams.append("page", filters.page);
    if (filters.limit) queryParams.append("limit", filters.limit);

    // Sorting parameter
    if (filters.sort) {
      // Map frontend sort values to backend sort fields
      const sortMapping = {
        newest: "-createdAt",
        "price-low": "price",
        "price-high": "-price",
        popularity: "-ratingsQuantity",
        rating: "-ratingsAverage",
        discount: "-discountPercentage",
      };
      queryParams.append("sort", sortMapping[filters.sort] || "-createdAt");
    }

    // Category filter - send category ID to backend
    if (filters.category && filters.category !== "all") {
      queryParams.append("category", filters.category);
    }

    const url = `http://127.0.0.1:5000/api/v4/products${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Return the full backend response structure
    return {
      products: data.data?.products || getMockProducts(),
      total: data.total || 0,
      results: data.results || 0,
    };
  } catch (error) {
    console.warn("Error fetching products, using mock data:", error.message);
    let products = getMockProducts();

    // Apply client-side filtering and sorting to mock data as fallback
    if (Object.keys(filters).length > 0) {
      // Only apply category filter and sorting for mock data
      if (filters.category && filters.category !== "all") {
        // For mock data, we'll filter by category ID
        products = products.filter(
          (product) =>
            product.category?._id === filters.category ||
            product.category?.id === filters.category
        );
      }
      if (filters.sort) {
        products = sortProducts(products, filters.sort);
      }
    }

    return {
      products: products,
      total: products.length,
      results: products.length,
    };
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v4/products/${productId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data?.product || getMockProduct(productId);
  } catch (error) {
    console.warn("Error fetching product, using mock data:", error.message);
    return getMockProduct(productId);
  }
};

export const getRelatedProducts = async (productId, limit = 4) => {
  try {
    // First get the current product to find its category
    const currentProduct = await getProduct(productId);
    
    if (!currentProduct || !currentProduct.category) {
      // Fallback to mock data if product not found
      return getMockProducts().slice(0, limit);
    }

    // Build query to get products from the same category, excluding current product
    const queryParams = new URLSearchParams();
    queryParams.append("category", currentProduct.category._id || currentProduct.category.id);
    queryParams.append("limit", limit + 1); // Get one extra to account for current product
    
    const url = `http://127.0.0.1:5000/api/v4/products?${queryParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    let products = data.data?.products || [];

    // Filter out the current product and limit results
    products = products
      .filter(product => product._id !== productId)
      .slice(0, limit);

    return products;
  } catch (error) {
    console.warn("Error fetching related products, using mock data:", error.message);
    
    // Fallback to mock data - get products from same category
    const currentProduct = getMockProduct(productId);
    if (!currentProduct || !currentProduct.category) {
      return getMockProducts().slice(0, limit);
    }

    const mockProducts = getMockProducts();
    const relatedProducts = mockProducts
      .filter(product => 
        product._id !== productId && 
        product.category?._id === currentProduct.category?._id
      )
      .slice(0, limit);

    // If not enough products in same category, add some from other categories
    if (relatedProducts.length < limit) {
      const otherProducts = mockProducts
        .filter(product => 
          product._id !== productId && 
          product.category?._id !== currentProduct.category?._id
        )
        .slice(0, limit - relatedProducts.length);
      
      return [...relatedProducts, ...otherProducts];
    }

    return relatedProducts;
  }
};
