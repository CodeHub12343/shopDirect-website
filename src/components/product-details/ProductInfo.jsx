import { useState } from 'react'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { 
  setSelectedVariant, 
  setQuantity, 
  incrementQuantity, 
  decrementQuantity 
} from '../../store/slices/productDetailsSlice'
import { addToCart } from '../../store/slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice'
import { getImageUrl } from '../../services/apiUtils'
import { FiHeart, FiMinus, FiPlus, FiTruck, FiShield, FiStar, FiShare2, FiTag, FiPackage } from 'react-icons/fi'

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  height: fit-content;
  position: sticky;
  top: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: static;
    top: auto;
  }
`

const ProductHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`

const BrandName = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const ProductTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  line-height: 1.2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  }
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`

const Star = styled(FiStar)`
  color: ${({ filled, theme }) => filled ? '#fbbf24' : theme.colors.border.main};
  fill: ${({ filled }) => filled ? '#fbbf24' : 'none'};
`

const ReviewCount = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.backgroundSecondary} 0%, ${({ theme }) => theme.colors.background} 100%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const CurrentPrice = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  }
`

const OriginalPrice = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: line-through;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.base};
  }
`

const DiscountBadge = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.success} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`

const VariantSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const VariantTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`

const VariantOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`

const VariantOption = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme, isSelected }) => 
    isSelected ? theme.colors.primary.main : theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, isSelected }) => 
    isSelected ? theme.colors.primary.main : 'white'};
  color: ${({ theme, isSelected }) => 
    isSelected ? 'white' : theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: fit-content;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .out-of-stock {
    font-size: ${({ theme }) => theme.typography.sizes.xs};
    color: ${({ theme }) => theme.colors.error};
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
`

const VariantImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`

const QuantitySection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const QuantityTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: fit-content;
`

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  border: none;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: 500;
  
  &:focus {
    outline: none;
  }
`

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const AddToCartButton = styled.button`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main} 0%, ${({ theme }) => theme.colors.primary.dark} 100%);
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: relative;
  overflow: hidden;
  width: 100%;
  text-align: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const BuyNowButton = styled.button`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.secondary} 0%, ${({ theme }) => theme.colors.secondaryDark} 100%);
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: relative;
  overflow: hidden;
  width: 100%;
  text-align: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const WishlistButton = styled.button`
  padding: ${({ theme }) => theme.spacing.lg};
  background: white;
  color: ${({ theme, isInWishlist }) => 
    isInWishlist ? theme.colors.error : theme.colors.text.secondary};
  border: 2px solid ${({ theme, isInWishlist }) => 
    isInWishlist ? theme.colors.error : theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  width: 100%;
  
  &:hover {
    border-color: ${({ theme, isInWishlist }) => 
      isInWishlist ? theme.colors.error : theme.colors.primary.main};
    color: ${({ theme, isInWishlist }) => 
      isInWishlist ? theme.colors.error : theme.colors.primary.main};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  &:active {
    transform: translateY(0);
  }
`

const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

const ShippingItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ProductMetaInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 4px solid ${({ theme }) => theme.colors.primary.main};
`

const ProductBadges = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`

const Badge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &.new {
    background: ${({ theme }) => theme.colors.success};
    color: white;
  }
  
  &.best-seller {
    background: ${({ theme }) => theme.colors.warning};
    color: white;
  }
  
  &.featured {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
  }
`

const TagsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`

const TagsTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const TagsList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`

const Tag = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ShareSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.main};
`

const ShareTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ShareButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`

const DetailedShippingInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

const ShippingTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ShippingDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ShippingDetail = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const MetaTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const MetaItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`

const MetaLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
`

const MetaValue = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
`

const ProductInfo = ({ product }) => {
  const dispatch = useAppDispatch()
  const { selectedVariants, quantity } = useAppSelector(state => state.productDetails)
  const { items: wishlistItems } = useAppSelector(state => state.wishlist)
  
  const isInWishlist = wishlistItems.some(item => item._id === product?._id)

  if (!product) return null

  const handleVariantSelect = (type, value) => {
    dispatch(setSelectedVariant({ type, value }))
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1
    dispatch(setQuantity(value))
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      product,
      quantity,
      selectedVariants
    }))
  }

  const handleBuyNow = () => {
    dispatch(addToCart({
      product,
      quantity,
      selectedVariants
    }))
    // Navigate to checkout
  }

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id))
    } else {
      dispatch(addToWishlist(product))
    }
  }

  const handleShare = (platform) => {
    const url = window.location.href
    const title = product.name
    const text = `Check out this amazing product: ${product.name}`
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
        break
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`, '_blank')
        break
      default:
        break
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} filled={i < Math.floor(rating)} />
    ))
  }

  // Get rating and review count from API data structure
  const rating = product.ratingsAverage || product.rating || 0
  const reviewCount = product.ratingsQuantity || product.reviewCount || 0

  return (
    <InfoContainer>
      <ProductHeader>
        <BrandName>{product.brand}</BrandName>
        <ProductTitle>{product.name}</ProductTitle>
        <RatingContainer>
          <Stars>
            {renderStars(rating)}
          </Stars>
          <ReviewCount>({reviewCount} reviews)</ReviewCount>
        </RatingContainer>
      </ProductHeader>

      <PriceContainer>
        <CurrentPrice>${product.price.toFixed(2)}</CurrentPrice>
        {product.originalPrice && product.originalPrice > product.price && (
          <OriginalPrice>${product.originalPrice.toFixed(2)}</OriginalPrice>
        )}
        {product.discountPercentage && (
          <DiscountBadge>{product.discountPercentage}% OFF</DiscountBadge>
        )}
      </PriceContainer>

      {/* Variants */}
      {product.variants && Object.keys(product.variants).length > 0 && (
        Object.entries(product.variants).map(([type, options]) => (
          <VariantSection key={type}>
            <VariantTitle>{type.charAt(0).toUpperCase() + type.slice(1)}</VariantTitle>
            <VariantOptions>
              {options.map((option) => {
                const isSelected = selectedVariants[type] === option.value
                return (
                  <VariantOption
                    key={option.value}
                    isSelected={isSelected}
                    onClick={() => handleVariantSelect(type, option.value)}
                  >
                    {option.image && (
                      <VariantImage src={getImageUrl(option.image)} alt={option.name} />
                    )}
                    <span>{option.name}</span>
                  </VariantOption>
                )
              })}
            </VariantOptions>
          </VariantSection>
        ))
      )}

      {/* Quantity Controls */}
      <QuantitySection>
        <QuantityTitle>Quantity</QuantityTitle>
        <QuantityControls>
          <QuantityButton 
            onClick={() => dispatch(decrementQuantity())}
            disabled={quantity <= 1}
          >
            <FiMinus size={16} />
          </QuantityButton>
          <QuantityInput
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <QuantityButton 
            onClick={() => dispatch(incrementQuantity())}
            disabled={quantity >= 99}
          >
            <FiPlus size={16} />
          </QuantityButton>
        </QuantityControls>
      </QuantitySection>

      {/* Action Buttons */}
      <ActionButtons>
        <AddToCartButton onClick={handleAddToCart}>
          Add to Cart
        </AddToCartButton>
        <BuyNowButton onClick={handleBuyNow}>
          Buy Now
        </BuyNowButton>
        <WishlistButton 
          onClick={handleWishlistToggle}
          isInWishlist={isInWishlist}
        >
          <FiHeart size={20} />
        </WishlistButton>
      </ActionButtons>

      <ShippingInfo>
        <ShippingItem>
          <FiTruck size={16} />
          <span>Free shipping on orders over $50</span>
        </ShippingItem>
        <ShippingItem>
          <FiShield size={16} />
          <span>30-day easy returns</span>
        </ShippingItem>
      </ShippingInfo>

      <ProductMetaInfo>
        <MetaTitle>Product Information</MetaTitle>
        <MetaGrid>
          <MetaItem>
            <MetaLabel>Category:</MetaLabel>
            <MetaValue>{product.category?.name || 'N/A'}</MetaValue>
          </MetaItem>
          <MetaItem>
            <MetaLabel>Brand:</MetaLabel>
            <MetaValue>{product.brand || 'N/A'}</MetaValue>
          </MetaItem>
          <MetaItem>
            <MetaLabel>Rating:</MetaLabel>
            <MetaValue>{rating.toFixed(1)} ({reviewCount} reviews)</MetaValue>
          </MetaItem>
          {product.createdAt && (
            <MetaItem>
              <MetaLabel>Added:</MetaLabel>
              <MetaValue>{new Date(product.createdAt).toLocaleDateString()}</MetaValue>
            </MetaItem>
          )}
          {product.updatedAt && (
            <MetaItem>
              <MetaLabel>Updated:</MetaLabel>
              <MetaValue>{new Date(product.updatedAt).toLocaleDateString()}</MetaValue>
            </MetaItem>
          )}
        </MetaGrid>
      </ProductMetaInfo>

      {/* Product Badges */}
      {(product.isNew || product.isBestSeller || product.isFeatured) && (
        <ProductBadges>
          {product.isNew && <Badge className="new">New</Badge>}
          {product.isBestSeller && <Badge className="best-seller">Best Seller</Badge>}
          {product.isFeatured && <Badge className="featured">Featured</Badge>}
        </ProductBadges>
      )}

      {/* Product Tags */}
      {product.tags && product.tags.length > 0 && (
        <TagsSection>
          <TagsTitle>
            <FiTag size={14} />
            Tags
          </TagsTitle>
          <TagsList>
            {product.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsList>
        </TagsSection>
      )}

      {/* Detailed Shipping Information */}
      {product.shipping && (
        <DetailedShippingInfo>
          <ShippingTitle>
            <FiPackage size={14} />
            Shipping & Returns
          </ShippingTitle>
          <ShippingDetails>
            {product.shipping.free && (
              <ShippingDetail>
                <FiTruck size={14} />
                <span>Free shipping available</span>
              </ShippingDetail>
            )}
            {product.shipping.estimatedDays && (
              <ShippingDetail>
                <FiTruck size={14} />
                <span>Estimated delivery: {product.shipping.estimatedDays}</span>
              </ShippingDetail>
            )}
            {product.shipping.returnPolicy && (
              <ShippingDetail>
                <FiShield size={14} />
                <span>{product.shipping.returnPolicy}</span>
              </ShippingDetail>
            )}
          </ShippingDetails>
        </DetailedShippingInfo>
      )}

      {/* Share Section */}
      <ShareSection>
        <ShareTitle>
          <FiShare2 size={14} />
          Share this product
        </ShareTitle>
        <ShareButtons>
          <ShareButton onClick={() => handleShare('facebook')}>
            <FiShare2 size={14} />
            Facebook
          </ShareButton>
          <ShareButton onClick={() => handleShare('twitter')}>
            <FiShare2 size={14} />
            Twitter
          </ShareButton>
          <ShareButton onClick={() => handleShare('email')}>
            <FiShare2 size={14} />
            Email
          </ShareButton>
        </ShareButtons>
      </ShareSection>
    </InfoContainer>
  )
}

export default ProductInfo 