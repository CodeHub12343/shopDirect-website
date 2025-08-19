import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi'
import { useCart, useWishlist } from '../../store/hooks'
import { formatPrice, getImageUrl } from '../../services/apiUtils'
import LoadingSpinner from '../common/LoadingSpinner'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  &.list-view {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};
    
    &.list-view {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const ProductCard = styled(Link)`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.default};
  position: relative;
  text-decoration: none;
  color: inherit;
  display: block;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-2px);
  }
  
  &.list-view {
    display: flex;
    height: 200px;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-direction: column;
      height: auto;
    }
  }
`

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  
  &.list-view {
    width: 200px;
    flex-shrink: 0;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 100%;
    }
  }
`

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.default};
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`

const BadgeContainer = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Badge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  
  &.new {
    background-color: ${({ theme }) => theme.colors.success.main};
    color: white;
  }
  
  &.sale {
    background-color: ${({ theme }) => theme.colors.error.main};
    color: white;
  }
  
  &.bestseller {
    background-color: ${({ theme }) => theme.colors.warning.main};
    color: white;
  }
  
  &.limited {
    background-color: ${({ theme }) => theme.colors.info.main};
    color: white;
  }
`

const QuickActions = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  opacity: 0;
  transform: translateX(10px);
  transition: all ${({ theme }) => theme.transitions.default};
  
  ${ProductCard}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: white;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: white;
    transform: scale(1.1);
  }
`

const ContentContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &.list-view {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const ProductInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  line-height: 1.4;
  
  &.list-view {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`

const ProductDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  &.list-view {
    font-size: ${({ theme }) => theme.typography.sizes.base};
    -webkit-line-clamp: 3;
  }
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`

const Star = styled(FiStar)`
  color: ${({ theme, filled }) => 
    filled ? theme.colors.warning.main : theme.colors.border.light};
  fill: ${({ theme, filled }) => 
    filled ? theme.colors.warning.main : 'none'};
`

const RatingText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const CurrentPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  
  &.list-view {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }
`

const OriginalPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: line-through;
  
  &.list-view {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }
`

const DiscountBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.error.main};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: 600;
`

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`

const AddToCartButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.border.light};
    color: ${({ theme }) => theme.colors.text.secondary};
    cursor: not-allowed;
  }
`

const WishlistButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.error.main};
    color: white;
    border-color: ${({ theme }) => theme.colors.error.main};
  }
`



const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ProductGrid = ({ products, isLoading, onQuickView, viewMode = 'grid' }) => {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, items: wishlistItems } = useWishlist()
  const [imageErrors, setImageErrors] = useState(new Set())

  const toggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some(item => item._id === product._id)
    if (isInWishlist) {
      removeFromWishlist(product._id)
    } else {
      // Always include an 'image' property for wishlist compatibility
      const image = product.imageCover || (product.images && product.images[0]) || product.image || null
      addToWishlist({ ...product, image })
    }
  }

  const handleImageError = (productId) => {
    setImageErrors(prev => new Set(prev).add(productId))
  }

  const handleAddToCart = (e, product) => {
    e.preventDefault() // Prevent navigation to product page
    e.stopPropagation()
    
    addToCart(product, 1, {})
  }

  const getProductImage = (product) => {
    // Prioritize imageCover, then first image from images array
    return product.imageCover || (product.images && product.images[0]) || null
  }

  const getBadges = (product) => {
    const badges = []
    
    if (product.isNew) badges.push({ type: 'new', text: 'New' })
    if (product.discountPercentage > 0) badges.push({ type: 'sale', text: `${product.discountPercentage}% OFF` })
    if (product.isBestSeller) badges.push({ type: 'bestseller', text: 'Best Seller' })
    if (product.stockQuantity < 10) badges.push({ type: 'limited', text: 'Limited Stock' })
    
    return badges
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= rating} size={14} />
      )
    }
    return stars
  }

  if (isLoading) {
    return (
      <LoadingSpinner 
        variant="wave" 
        size="medium" 
        text="Loading products..." 
        minHeight="400px"
      />
    )
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search criteria.</p>
      </EmptyState>
    )
  }

  return (
    <GridContainer className={viewMode === 'list' ? 'list-view' : ''}>
      {products.map((product) => {
        const badges = getBadges(product)
        const isInWishlist = wishlistItems.some(item => item._id === product._id)
        const hasDiscount = product.discountPercentage > 0
        const discountedPrice = hasDiscount 
          ? product.price * (1 - product.discountPercentage / 100)
          : product.price
        const productImage = getProductImage(product)
        const hasImageError = imageErrors.has(product._id)

        return (
          <ProductCard key={product._id} to={`/product/${product._id}`} className={viewMode === 'list' ? 'list-view' : ''}>
            <ImageContainer className={viewMode === 'list' ? 'list-view' : ''}>
              <ProductImage 
                src={hasImageError ? "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" : getImageUrl(productImage)} 
                alt={product.name}
                loading="lazy"
                onError={() => handleImageError(product._id)}
              />
              
              <BadgeContainer>
                {badges.map((badge, index) => (
                  <Badge key={index} className={badge.type}>
                    {badge.text}
                  </Badge>
                ))}
              </BadgeContainer>
              
              <QuickActions>
                <ActionButton
                  onClick={() => onQuickView(product)}
                  title="Quick View"
                >
                  <FiEye size={16} />
                </ActionButton>
                <ActionButton
                  onClick={() => toggleWishlist(product)}
                  title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <FiHeart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
                </ActionButton>
              </QuickActions>
            </ImageContainer>
            
            <ContentContainer className={viewMode === 'list' ? 'list-view' : ''}>
              <ProductInfo>
                <ProductName className={viewMode === 'list' ? 'list-view' : ''}>
                  {product.name}
                </ProductName>
                
                {viewMode === 'list' && (
                  <ProductDescription className="list-view">
                    {product.description}
                  </ProductDescription>
                )}
                
                <RatingContainer>
                  <Stars>
                    {renderStars(product.ratingsAverage || product.rating || 0)}
                  </Stars>
                  <RatingText>
                    ({product.ratingsQuantity || product.reviewCount || 0})
                  </RatingText>
                </RatingContainer>
                
                <PriceContainer>
                  <CurrentPrice className={viewMode === 'list' ? 'list-view' : ''}>
                    {formatPrice(discountedPrice)}
                  </CurrentPrice>
                  {hasDiscount && (
                    <>
                      <OriginalPrice className={viewMode === 'list' ? 'list-view' : ''}>
                        {formatPrice(product.price)}
                      </OriginalPrice>
                      <DiscountBadge>
                        -{product.discountPercentage}%
                      </DiscountBadge>
                    </>
                  )}
                </PriceContainer>
              </ProductInfo>
              
              <ActionButtons>
                <AddToCartButton 
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={product.stockQuantity === 0}
                >
                  {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </AddToCartButton>
                <WishlistButton
                  onClick={() => toggleWishlist(product)}
                  title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <FiHeart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
                </WishlistButton>
              </ActionButtons>
            </ContentContainer>
          </ProductCard>
        )
      })}
    </GridContainer>
  )
}

export default ProductGrid 