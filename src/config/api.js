// API Configuration
export const API_BASE_URL = 'http://localhost:5000/api/v4';

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/users/login',
  SIGNUP: '/users/signup',
  UPDATE_PROFILE: '/users/updateMe',
  UPDATE_PASSWORD: '/users/updateMyPassword',
  
  // Products
  PRODUCTS: '/products',
  PRODUCT: (id) => `/products/${id}`,
  
  // Categories
  CATEGORIES: '/categories',
  
  // Orders
  ORDERS: '/orders',
  ORDER: (id) => `/orders/${id}`,
  CREATE_PAYMENT_INTENT: '/orders/create-payment-intent',
  
  // Blog (external API)
  BLOG_ARTICLES: 'https://dev.to/api/articles',
  BLOG_ARTICLE: (id) => `https://dev.to/api/articles/${id}`,
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  if (endpoint.startsWith('http')) {
    return endpoint; // External API
  }
  return `${API_BASE_URL}${endpoint}`;
}; 