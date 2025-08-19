import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaChevronLeft, FaChevronRight, FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa'
import { formatPrice, getImageUrl } from '../../services/apiUtils'

const ProductsSection = styled.section`
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

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0 -${({ theme }) => theme.spacing[3]};
  padding: 0 ${({ theme }) => theme.spacing[3]};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0 -${({ theme }) => theme.spacing[4]};
    padding: 0 ${({ theme }) => theme.spacing[4]};
  }
`

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({ translateX }) => translateX}px);
  gap: ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.spacing[6]};
  }
`

const ProductCard = styled.div`
  min-width: 260px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-width: 280px;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`

const ProductImage = styled.div`
  height: 180px;
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
    height: 200px;
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
      font-size: 40px;
    }
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

const OriginalPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-decoration: line-through;
`

const DiscountBadge = styled.span`
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.textInverse};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
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

const CarouselControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing[6]};
  padding: 0 ${({ theme }) => theme.spacing[4]};
`

const ControlButton = styled.button`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  z-index: 2;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 40px;
    height: 40px;
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

const FeaturedProducts = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imageErrors, setImageErrors] = useState({})

  // Responsive card width calculation
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      if (width < 768) return 260 // mobile
      if (width < 1024) return 280 // tablet
      return 280 // desktop
    }
    return 280 // default
  }

  const [cardWidth, setCardWidth] = useState(getCardWidth())
  const cardsPerView = 4 // Number of cards visible at once
  const maxIndex = Math.max(0, products.length - cardsPerView)

  // Update card width on window resize
  useEffect(() => {
    const handleResize = () => {
      setCardWidth(getCardWidth())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    let interval
    if (isAutoPlaying && products.length > cardsPerView) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, maxIndex, products.length])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

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
      <ProductsSection>
        <Container>
          <SectionHeader>
            <SectionTitle>Featured Products</SectionTitle>
            <SectionSubtitle>
              Discover our handpicked selection of premium products. Quality, innovation, and style in every item.
            </SectionSubtitle>
          </SectionHeader>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            <p>No featured products available at the moment.</p>
            <p>Please check back later!</p>
          </div>
        </Container>
      </ProductsSection>
    )
  }

  return (
    <ProductsSection>
      <Container>
        <SectionHeader>
          <SectionTitle>Featured Products</SectionTitle>
          <SectionSubtitle>
            Discover our handpicked selection of premium products. Quality, innovation, and style in every item.
          </SectionSubtitle>
        </SectionHeader>

        <CarouselContainer>
          <CarouselTrack translateX={-currentIndex * cardWidth}>
            {products.map((product) => (
              <ProductCard key={product._id}>
                <ProductImage 
                  imageUrl={getProductImage(product)}
                  hasError={imageErrors[product._id]}
                  onError={() => handleImageError(product._id)}
                >
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
                    {product.originalPrice && (
                      <OriginalPrice>{formatPrice(product.originalPrice)}</OriginalPrice>
                    )}
                    {product.discount && (
                      <DiscountBadge>-{product.discount}%</DiscountBadge>
                    )}
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
          </CarouselTrack>
        </CarouselContainer>

        {products.length > cardsPerView && (
          <CarouselControls>
            <ControlButton onClick={handlePrev} disabled={currentIndex === 0}>
              <FaChevronLeft />
            </ControlButton>
            <ControlButton onClick={handleNext} disabled={currentIndex === maxIndex}>
              <FaChevronRight />
            </ControlButton>
          </CarouselControls>
        )}
      </Container>
    </ProductsSection>
  )
}

export default FeaturedProducts 