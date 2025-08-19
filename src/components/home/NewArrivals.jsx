import styled from 'styled-components'
import { useState } from 'react'
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa'
import { formatPrice, getImageUrl } from '../../services/apiUtils'

const NewArrivalsSection = styled.section`
  padding: ${({ theme }) => theme.spacing[16]} 0;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing[6]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const ProductCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`

const ProductImage = styled.div`
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

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 250px;
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
    font-size: 40px;
    opacity: 0.3;
    display: ${({ hasError }) => hasError ? 'block' : 'none'};

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 48px;
    }
  }
`

const NewBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  left: ${({ theme }) => theme.spacing[2]};
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.textInverse};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    top: ${({ theme }) => theme.spacing[3]};
    left: ${({ theme }) => theme.spacing[3]};
    padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  }
`

const ProductActions = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  right: ${({ theme }) => theme.spacing[2]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  opacity: 0;
  transform: translateX(20px);
  transition: all ${({ theme }) => theme.transitions.fast};
  z-index: 2;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    top: ${({ theme }) => theme.spacing[3]};
    right: ${({ theme }) => theme.spacing[3]};
    gap: ${({ theme }) => theme.spacing[2]};
  }

  ${ProductCard}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 35px;
    height: 35px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
    transform: scale(1.1);
  }
`

const ProductContent = styled.div`
  padding: ${({ theme }) => theme.spacing[3]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }
`

const CurrentPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
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
`

const AddToCartButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  border: none;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
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

const NewArrivals = ({ products }) => {
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
      <NewArrivalsSection>
        <Container>
          <SectionHeader>
            <SectionTitle>New Arrivals</SectionTitle>
            <SectionSubtitle>
              Be the first to discover our latest products. Fresh arrivals with cutting-edge features and modern designs.
            </SectionSubtitle>
          </SectionHeader>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            <p>No new arrivals available at the moment.</p>
            <p>Please check back later!</p>
          </div>
        </Container>
      </NewArrivalsSection>
    )
  }

  return (
    <NewArrivalsSection>
      <Container>
        <SectionHeader>
          <SectionTitle>New Arrivals</SectionTitle>
          <SectionSubtitle>
            Be the first to discover our latest products. Fresh arrivals with cutting-edge features and modern designs.
          </SectionSubtitle>
        </SectionHeader>

        <ProductsGrid>
          {products.map((product) => (
            <ProductCard key={product._id}>
              <ProductImage 
                imageUrl={getProductImage(product)}
                hasError={imageErrors[product._id]}
                onError={() => handleImageError(product._id)}
              >
                <NewBadge>Just In</NewBadge>
                <ProductActions>
                  <ActionButton onClick={() => handleAddToWishlist(product)}>
                    <FaHeart />
                  </ActionButton>
                  <ActionButton onClick={() => handleQuickView(product)}>
                    <FaEye />
                  </ActionButton>
                </ProductActions>
              </ProductImage>

              <ProductContent>
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

                <AddToCartButton onClick={() => handleAddToCart(product)}>
                  <FaShoppingCart />
                  Add to Cart
                </AddToCartButton>
              </ProductContent>
            </ProductCard>
          ))}
        </ProductsGrid>
      </Container>
    </NewArrivalsSection>
  )
}

export default NewArrivals 