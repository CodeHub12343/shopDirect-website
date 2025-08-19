import { useState } from 'react'
import styled from 'styled-components'
import { FiX, FiStar, FiHeart, FiShoppingCart, FiTruck, FiShield } from 'react-icons/fi'
import { formatPrice, getImageUrl } from '../../services/apiUtils'
import { useWishlist } from '../../store/hooks'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.md};
`

const ModalContainer = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalSlideIn 0.3s ease-out;
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    margin: ${({ theme }) => theme.spacing.sm};
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.light};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const ImageSection = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 300px;
  }
`

const ThumbnailContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;
`

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  border: 2px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.primary.main : 'transparent'};
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`

const DetailsSection = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const ProductTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: 1.3;
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
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
  gap: ${({ theme }) => theme.spacing.md};
`

const CurrentPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`

const OriginalPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: line-through;
`

const DiscountBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.error.main};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 600;
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`

const StockInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  
  &.in-stock {
    color: ${({ theme }) => theme.colors.success.main};
  }
  
  &.low-stock {
    color: ${({ theme }) => theme.colors.warning.main};
  }
  
  &.out-of-stock {
    color: ${({ theme }) => theme.colors.error.main};
  }
`

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`

const AddToCartButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.border.light};
    color: ${({ theme }) => theme.colors.text.secondary};
    cursor: not-allowed;
  }
`

const WishlistButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.error.main};
    color: white;
    border-color: ${({ theme }) => theme.colors.error.main};
  }
`

const QuickViewModal = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToWishlist, removeFromWishlist, items: wishlistItems } = useWishlist()
  const isInWishlist = wishlistItems.some(item => item._id === product._id)

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= rating} size={16} />
      )
    }
    return stars
  }

  const getStockStatus = () => {
    if (product.stockQuantity === 0) {
      return { status: 'out-of-stock', text: 'Out of Stock' }
    } else if (product.stockQuantity < 10) {
      return { status: 'low-stock', text: `Only ${product.stockQuantity} left` }
    } else {
      return { status: 'in-stock', text: 'In Stock' }
    }
  }

  const hasDiscount = product.discountPercentage > 0
  const discountedPrice = hasDiscount 
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price

  const stockInfo = getStockStatus()

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>
        
        <ModalContent>
          <ImageSection>
            <MainImage 
              src={getImageUrl(product.images[selectedImage])} 
              alt={product.name}
            />
            <ThumbnailContainer>
              {product.images.map((image, index) => (
                <Thumbnail
                  key={index}
                  src={getImageUrl(image)}
                  alt={`${product.name} ${index + 1}`}
                  isActive={index === selectedImage}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </ThumbnailContainer>
          </ImageSection>
          
          <DetailsSection>
            <ProductTitle>{product.name}</ProductTitle>
            
            <RatingContainer>
              <Stars>
                {renderStars(product.ratingsAverage)}
              </Stars>
              <RatingText>
                {product.ratingsAverage.toFixed(1)} ({product.ratingsQuantity} reviews)
              </RatingText>
            </RatingContainer>
            
            <PriceContainer>
              <CurrentPrice>{formatPrice(discountedPrice)}</CurrentPrice>
              {hasDiscount && (
                <>
                  <OriginalPrice>{formatPrice(product.price)}</OriginalPrice>
                  <DiscountBadge>-{product.discountPercentage}%</DiscountBadge>
                </>
              )}
            </PriceContainer>
            
            <Description>{product.description}</Description>
            
            <StockInfo className={stockInfo.status}>
              {stockInfo.text}
            </StockInfo>
            
            <FeaturesList>
              <FeatureItem>
                <FiTruck size={16} />
                Free shipping on orders over $50
              </FeatureItem>
              <FeatureItem>
                <FiShield size={16} />
                30-day return policy
              </FeatureItem>
            </FeaturesList>
            
            <ActionButtons>
              <AddToCartButton disabled={product.stockQuantity === 0}>
                {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </AddToCartButton>
              <WishlistButton
                onClick={() => {
                  if (isInWishlist) {
                    removeFromWishlist(product._id)
                  } else {
                    addToWishlist(product)
                  }
                }}
                title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <FiHeart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
              </WishlistButton>
            </ActionButtons>
          </DetailsSection>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  )
}

export default QuickViewModal 