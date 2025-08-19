import styled from 'styled-components'
import { useState } from 'react'
import { FaShoppingCart, FaHeart, FaEye, FaCrown } from 'react-icons/fa'
import { formatPrice, getImageUrl } from '../../services/apiUtils'

const BestSellersSection = styled.section`
  padding: ${({ theme }) => theme.spacing[16]} 0;
  background: ${({ theme }) => theme.colors.background};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing[8]};
  }
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: ${({ theme }) => theme.spacing[6]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ProductCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${({ imageUrl }) => 
    imageUrl 
      ? `url(${imageUrl})`
      : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
  };
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 150px;
    height: 150px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.fast};
  }

  ${ProductCard}:hover &::before {
    opacity: 1;
  }

  /* Add fallback for failed images */
  &::after {
    content: '📷';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
    opacity: 0.3;
    display: ${({ hasError }) => hasError ? 'block' : 'none'};

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 28px;
    }
  }
`

const RankingBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  left: ${({ theme }) => theme.spacing[2]};
  width: 28px;
  height: 28px;
  background: ${({ rank, theme }) => {
    if (rank === 1) return theme.colors.secondary;
    if (rank === 2) return theme.colors.gray500;
    if (rank === 3) return '#cd7f32'; // Bronze
    return theme.colors.primary;
  }};
  color: ${({ theme }) => theme.colors.textInverse};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  z-index: 2;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 30px;
    height: 30px;
  }
`

const CrownIcon = styled(FaCrown)`
  position: absolute;
  top: -3px;
  right: -3px;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  z-index: 3;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    top: -5px;
    right: -5px;
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`

const ProductContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ProductInfo = styled.div``

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`

const CurrentPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`

const Stars = styled.div`
  display: flex;
  gap: 1px;
`

const Star = styled.span`
  color: ${({ filled, theme }) => 
    filled ? theme.colors.secondary : theme.colors.gray300
  };
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`

const RatingText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const RatingScore = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textInverse};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

const ProductActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-wrap: wrap;
`

const ActionButton = styled.button`
  flex: 1;
  min-width: 80px;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[1]};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ primary }) => primary && `
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
    border-color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
    }
  `}
`

const AddToCartButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  border-color: ${({ theme }) => theme.colors.primary};
  flex: 2;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`

const renderStars = (rating) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} filled>★</Star>)
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<Star key={i} filled>★</Star>)
    } else {
      stars.push(<Star key={i}>☆</Star>)
    }
  }

  return stars
}

const BestSellers = ({ products }) => {
  const [imageErrors, setImageErrors] = useState({})

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product.name)
    // Add to cart functionality
  }

  const handleAddToWishlist = (product) => {
    console.log('Adding to wishlist:', product.name)
    // Add to wishlist functionality
  }

  const handleQuickView = (product) => {
    console.log('Quick view:', product.name)
    // Quick view functionality
  }

  const handleImageError = (productId) => {
    console.log('Image failed to load for product:', productId)
    setImageErrors(prev => ({ ...prev, [productId]: true }))
  }

  // Helper function to get the correct image URL
  const getProductImage = (product) => {
    // Try imageCover first, then images[0], then fallback
    const imagePath = product.imageCover || (product.images && product.images[0]) || null
    return getImageUrl(imagePath)
  }

  if (!products || products.length === 0) {
    return (
      <BestSellersSection>
        <Container>
          <SectionHeader>
            <SectionTitle>Best Sellers</SectionTitle>
            <SectionSubtitle>
              Our most popular products loved by customers worldwide. Top-rated items with excellent reviews and proven quality.
            </SectionSubtitle>
          </SectionHeader>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            <p>No best sellers available at the moment.</p>
            <p>Please check back later!</p>
          </div>
        </Container>
      </BestSellersSection>
    )
  }

  return (
    <BestSellersSection>
      <Container>
        <SectionHeader>
          <SectionTitle>Best Sellers</SectionTitle>
          <SectionSubtitle>
            Our most popular products loved by customers worldwide. Top-rated items with excellent reviews and proven quality.
          </SectionSubtitle>
        </SectionHeader>

        <ProductsGrid>
          {products.map((product, index) => (
            <ProductCard key={product._id}>
              <ProductImage 
                imageUrl={getProductImage(product)}
                hasError={imageErrors[product._id]}
                onError={() => handleImageError(product._id)}
              >
                <RankingBadge rank={index + 1}>
                  {index + 1}
                </RankingBadge>
                {index === 0 && <CrownIcon />}
              </ProductImage>

              <ProductContent>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  
                  <ProductPrice>
                    <CurrentPrice>{formatPrice(product.price)}</CurrentPrice>
                  </ProductPrice>

                  <ProductRating>
                    <Stars>
                      {renderStars(product.ratingsAverage || product.rating || 0)}
                    </Stars>
                    <RatingText>
                      ({product.ratingsQuantity || product.reviewCount || 0} reviews)
                    </RatingText>
                  </ProductRating>
                </ProductInfo>

                <ProductActions>
                  <ActionButton onClick={() => handleAddToWishlist(product)}>
                    <FaHeart />
                  </ActionButton>
                  <ActionButton onClick={() => handleQuickView(product)}>
                    <FaEye />
                  </ActionButton>
                  <AddToCartButton onClick={() => handleAddToCart(product)}>
                    <FaShoppingCart />
                    Add to Cart
                  </AddToCartButton>
                </ProductActions>
              </ProductContent>
            </ProductCard>
          ))}
        </ProductsGrid>
      </Container>
    </BestSellersSection>
  )
}

export default BestSellers 