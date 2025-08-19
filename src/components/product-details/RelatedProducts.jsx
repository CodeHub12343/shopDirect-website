import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useAppSelector } from '../../store/hooks'
import { getImageUrl } from '../../services/apiUtils'
import { getRelatedProducts } from '../../services/apiProducts'
import { FiStar, FiHeart } from 'react-icons/fi'
import LoadingSpinner from '../common/LoadingSpinner'

const RelatedContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const ProductCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`

const ProductImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 160px;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.base};
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`

const WishlistButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  color: ${({ theme, isInWishlist }) => 
    isInWishlist ? theme.colors.error : theme.colors.text.secondary};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
  }
`

const ProductInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const CurrentPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`

const OriginalPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: line-through;
`

const DiscountBadge = styled.span`
  background: ${({ theme }) => theme.colors.success};
  color: white;
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: 600;
`

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Stars = styled.div`
  display: flex;
  gap: 1px;
`

const Star = styled(FiStar)`
  color: ${({ filled }) => filled ? '#fbbf24' : '#e5e7eb'};
  fill: ${({ filled }) => filled ? '#fbbf24' : 'none'};
  font-size: 14px;
`

const ReviewCount = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const NoProducts = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
`



const RelatedProducts = ({ product }) => {
  const { items: wishlistItems } = useAppSelector(state => state.wishlist)

  // Fetch related products using live API
  const { 
    data: relatedProducts = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['relatedProducts', product?._id],
    queryFn: () => getRelatedProducts(product?._id, 4),
    enabled: !!product?._id,
    retry: 1,
  })

  if (!product) return null

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} filled={i < Math.floor(rating)} />
    ))
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item._id === productId)
  }

  const renderProductCard = (product) => {
    // Get rating and review count from API data structure
    const rating = product.ratingsAverage || product.rating || 0
    const reviewCount = product.ratingsQuantity || product.reviewCount || 0
    const discount = product.discountPercentage || product.discount || 0
    const image = product.imageCover || product.image || ''

    return (
      <ProductCard key={product._id} to={`/product/${product._id}`}>
        <ProductImage>
          <Image src={getImageUrl(image)} alt={product.name} />
          <WishlistButton isInWishlist={isInWishlist(product._id)}>
            <FiHeart size={16} fill={isInWishlist(product._id) ? 'currentColor' : 'none'} />
          </WishlistButton>
        </ProductImage>
        
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          
          <ProductPrice>
            <CurrentPrice>${product.price.toFixed(2)}</CurrentPrice>
            {product.originalPrice && product.originalPrice > product.price && (
              <OriginalPrice>${product.originalPrice.toFixed(2)}</OriginalPrice>
            )}
            {discount > 0 && (
              <DiscountBadge>{discount}% OFF</DiscountBadge>
            )}
          </ProductPrice>
          
          <ProductRating>
            <Stars>
              {renderStars(rating)}
            </Stars>
            <ReviewCount>({reviewCount})</ReviewCount>
          </ProductRating>
        </ProductInfo>
      </ProductCard>
    )
  }

  return (
    <RelatedContainer>
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <LoadingSpinner variant="pulse" size="medium" text="Loading related products..." />
        </div>
      ) : error ? (
        <NoProducts>
          <p>Unable to load related products. Please try again later.</p>
        </NoProducts>
      ) : relatedProducts.length > 0 ? (
        <ProductsGrid>
          {relatedProducts.map(renderProductCard)}
        </ProductsGrid>
      ) : (
        <NoProducts>
          <p>No related products found.</p>
        </NoProducts>
      )}
    </RelatedContainer>
  )
}

export default RelatedProducts 