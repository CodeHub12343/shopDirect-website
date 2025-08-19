// Utility functions for API and data formatting

/**
 * Format price to currency string
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = "USD") => {
  if (typeof price !== "number" || isNaN(price)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Check if an image URL is accessible
 * @param {string} url - The image URL to check
 * @returns {Promise<boolean>} - Whether the image is accessible
 */
export const checkImageExists = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.log("Image check failed:", error.message);
    return false;
  }
};

/**
 * Get full image URL from image path
 * @param {string} imagePath - The image path or filename
 * @returns {string} Full image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop";
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If it's a relative path starting with /, return as is
  if (imagePath.startsWith("/")) {
    return imagePath;
  }

  // Check if the filename is invalid (like "download" without extension)
  if (
    imagePath === "download" ||
    imagePath === "undefined" ||
    imagePath === "null"
  ) {
    return "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop";
  }

  // Check if the filename has a proper extension
  const hasExtension = /\.[a-zA-Z0-9]+$/.test(imagePath);
  if (!hasExtension) {
    return "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop";
  }

  // Use the format: https://shopdirect-api.onrender.com/img/products/${imagePath}
  return `https://shopdirect-api.onrender.com/img/products/${imagePath}`;
};

/**
 * Calculate discounted price
 * @param {number} originalPrice - Original price
 * @param {number} discountPercentage - Discount percentage (0-100)
 * @returns {number} Discounted price
 */
export const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
  if (!originalPrice || !discountPercentage) {
    return originalPrice;
  }

  const discount = (originalPrice * discountPercentage) / 100;
  return originalPrice - discount;
};

/**
 * Format rating to display
 * @param {number} rating - Rating value (0-5)
 * @returns {string} Formatted rating string
 */
export const formatRating = (rating) => {
  if (!rating || isNaN(rating)) {
    return "0.0";
  }

  return rating.toFixed(1);
};

/**
 * Format review count
 * @param {number} count - Number of reviews
 * @returns {string} Formatted review count
 */
export const formatReviewCount = (count) => {
  if (!count || count === 0) {
    return "No reviews";
  }

  if (count === 1) {
    return "1 review";
  }

  if (count < 1000) {
    return `${count} reviews`;
  }

  if (count < 1000000) {
    return `${(count / 1000).toFixed(1)}k reviews`;
  }

  return `${(count / 1000000).toFixed(1)}M reviews`;
};
