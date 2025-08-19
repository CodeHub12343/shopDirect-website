import api from './apiAuth'

// GET /products/:productId/reviews
export async function getReviews(productId) {
  const res = await api.get(`/products/${productId}/reviews`)
  // Backend returns { status, result, data: { reviews } }
  return res.data?.data?.reviews || []
}

// POST /products/:productId/reviews
// Body: { rating: Number, review: String }
export async function createReview(productId, payload) {
  const res = await api.post(`/products/${productId}/reviews`, payload)
  // Backend returns { status, data: { reviews } } (singular naming but contains the created review)
  return res.data?.data?.reviews
}

export default { getReviews, createReview }


