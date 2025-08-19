import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { 
  setFilterRating, 
  setSortBy, 
  toggleReviewForm, 
  markReviewHelpful 
} from '../../store/slices/reviewsSlice'
import { submitReview, fetchReviews } from '../../store/slices/reviewsSlice'
import { FiStar, FiThumbsUp, FiFilter, FiMessageSquare } from 'react-icons/fi'
import LoadingSpinner from '../common/LoadingSpinner'
import { useAuth } from '../../contexts/AuthContext'

const ReviewsContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const ReviewsTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const ReviewsControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-wrap: wrap;
  }
`

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: white;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`

const WriteReviewButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`

const ReviewForm = styled.form`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const FormTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const FormLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`

const FormInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`

const ReviewTextarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`

const RatingInput = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ filled, theme }) => filled ? '#fbbf24' : theme.colors.border.main};
  font-size: 24px;
  transition: color ${({ theme }) => theme.transitions.base};
  
  &:hover {
    color: #fbbf24;
  }
`

const FormActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
`

const CancelButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: white;
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 2px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.text.primary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const ReviewCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: white;
`

const ReviewItem = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: white;
`

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ReviewerName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`

const VerifiedBadge = styled.span`
  background: ${({ theme }) => theme.colors.success};
  color: white;
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: 600;
`

const ReviewDate = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ReviewStars = styled.div`
  display: flex;
  gap: 2px;
`

const ReviewStar = styled(FiStar)`
  color: ${({ filled }) => filled ? '#fbbf24' : '#e5e7eb'};
  fill: ${({ filled }) => filled ? '#fbbf24' : 'none'};
`

const FormReviewStar = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ filled }) => filled ? '#fbbf24' : '#e5e7eb'};
  font-size: 24px;
  transition: color ${({ theme }) => theme.transitions.base};
  
  &:hover {
    color: #fbbf24;
  }
`

const ReviewTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`

const ReviewText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`

const ReviewActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HelpfulButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.base};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`

const NoReviews = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ProductReviews = ({ product }) => {
  const dispatch = useAppDispatch()
  const { 
    reviews: storeReviews, 
    isLoading, 
    filterRating, 
    sortBy, 
    showReviewForm 
  } = useAppSelector(state => state.reviews)
  const { user, isAuthenticated } = useAuth()
  
  const [formData, setFormData] = useState({
    title: '',
    rating: 0,
    comment: ''
  })

  useEffect(() => {
    if (product?._id) dispatch(fetchReviews(product._id))
  }, [dispatch, product?._id])

  if (!product) return null

  // Live reviews from store
  const reviews = storeReviews || []

  // Determine if user can review: must be logged in AND must have ordered this product
  const userHasOrdered = useMemo(() => {
    if (!isAuthenticated || !user) return false
    const orders = Array.isArray(user.orders) ? user.orders : []
    for (const order of orders) {
      const items = order.orderItems || order.items || []
      const found = items.some((oi) => {
        const pid = oi.product?.id || oi.product?._id || oi.productId
        return pid === product._id
      })
      if (found) return true
    }
    return false
  }, [isAuthenticated, user, product?._id])

  const handleFilterChange = (e) => {
    dispatch(setFilterRating(e.target.value ? parseInt(e.target.value) : null))
  }

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value))
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (formData.rating === 0) return
    if (!userHasOrdered) return
    
    dispatch(submitReview({
      productId: product._id,
      ...formData
    }))
    
    setFormData({ title: '', rating: 0, comment: '' })
  }

  const handleStarClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <ReviewStar key={i} filled={i < rating} />
    ))
  }

  const filteredReviews = reviews.filter(review => 
    !filterRating || review.rating === filterRating
  )

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
      case 'oldest':
        return new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date)
      case 'rating':
        return b.rating - a.rating
      case 'helpful':
        return (b.helpful || 0) - (a.helpful || 0)
      default:
        return 0
    }
  })

  return (
    <ReviewsContainer>
      <ReviewsHeader>
        <ReviewsTitle>
          Customer Reviews ({reviews.length})
        </ReviewsTitle>
        
        <ReviewsControls>
          <FilterSelect value={filterRating || ''} onChange={handleFilterChange}>
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </FilterSelect>
          
          <FilterSelect value={sortBy} onChange={handleSortChange}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Highest Rated</option>
            <option value="helpful">Most Helpful</option>
          </FilterSelect>
          
          {isAuthenticated && userHasOrdered ? (
            <WriteReviewButton onClick={() => dispatch(toggleReviewForm())}>
              <FiMessageSquare size={16} />
              Write a Review
            </WriteReviewButton>
          ) : (
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {isAuthenticated ? 'You can review only products you have purchased.' : 'Login to write a review.'}
            </div>
          )}
        </ReviewsControls>
      </ReviewsHeader>

      {showReviewForm && isAuthenticated && userHasOrdered && (
        <ReviewForm onSubmit={handleReviewSubmit}>
          <FormTitle>Write Your Review</FormTitle>
          
          <FormGrid>
            <FormField>
              <FormLabel>Rating</FormLabel>
              <RatingInput>
                {[1, 2, 3, 4, 5].map(star => (
                  <FormReviewStar
                    key={star}
                    filled={star <= formData.rating}
                    onClick={() => handleStarClick(star)}
                    type="button"
                  >
                    ★
                  </FormReviewStar>
                ))}
              </RatingInput>
            </FormField>
            
            <FormField>
              <FormLabel>Title</FormLabel>
              <FormInput
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief summary of your experience"
                required
              />
            </FormField>
          </FormGrid>
          
          <FormField>
            <FormLabel>Review</FormLabel>
            <ReviewTextarea
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Share your detailed experience with this product..."
              rows={4}
              required
            />
          </FormField>
          
          <FormActions>
            <SubmitButton type="submit" disabled={formData.rating === 0}>
              Submit Review
            </SubmitButton>
            <CancelButton type="button" onClick={() => dispatch(toggleReviewForm())}>
              Cancel
            </CancelButton>
          </FormActions>
        </ReviewForm>
      )}

      {isLoading ? (
        <LoadingSpinner variant="pulse" size="medium" text="Loading reviews..." />
      ) : sortedReviews.length > 0 ? (
        <ReviewsList>
          {sortedReviews.map((review) => (
            <ReviewItem key={review._id || review.id}>
              <ReviewHeader>
                <ReviewerInfo>
                  <ReviewerName>{review.user?.name || review.reviewerName || 'Anonymous'}</ReviewerName>
                  <ReviewDate>
                    {new Date(review.createdAt || review.date).toLocaleDateString()}
                  </ReviewDate>
                </ReviewerInfo>
                <ReviewRating>
                  {renderStars(review.rating)}
                </ReviewRating>
              </ReviewHeader>
              
              {review.title && (
                <ReviewTitle>{review.title}</ReviewTitle>
              )}
              
              <ReviewText>{review.review || review.comment}</ReviewText>
              
              <ReviewActions>
                <HelpfulButton onClick={() => dispatch(markReviewHelpful(review._id || review.id))}>
                  <FiThumbsUp size={14} />
                  Helpful ({review.helpful || 0})
                </HelpfulButton>
              </ReviewActions>
            </ReviewItem>
          ))}
        </ReviewsList>
      ) : (
        <NoReviews>
          <p>No reviews yet. Be the first to review this product!</p>
        </NoReviews>
      )}
    </ReviewsContainer>
  )
}

export default ProductReviews 