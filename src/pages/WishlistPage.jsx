import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart, useWishlist } from '../store/hooks'
import styled from 'styled-components'
import { 
  FaHeart, FaShoppingCart, FaTrash, FaEye, FaRegHeart,
  FaArrowRight, FaStar
} from 'react-icons/fa'

// Mock wishlist data
const WISHLIST_DATA = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "Premium sound quality with noise cancellation",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    savedDate: "2025-01-10T10:30:00Z"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your health and fitness goals",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    inStock: false,
    rating: 4.8,
    reviewCount: 256,
    savedDate: "2025-01-08T14:20:00Z"
  },
  {
    id: 3,
    name: "Premium Phone Case",
    description: "Protective case with wireless charging",
    price: 45.99,
    originalPrice: 45.99,
    image: "https://images.unsplash.com/photo-1603313011962-716c3a3e5b8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    inStock: true,
    rating: 4.2,
    reviewCount: 89,
    savedDate: "2025-01-12T09:15:00Z"
  }
]

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`

const Header = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main} 0%, ${({ theme }) => theme.colors.primary.dark} 100%);
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`

const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const HeaderSubtitle = styled.p`
  opacity: 0.9;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ItemCount = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  opacity: 0.9;
`

const ControlsSection = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: white;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[50]};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  
  &.primary {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary.main};
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary.dark};
    }
  }
  
  &.danger {
    background: ${({ theme }) => theme.colors.error}20;
    color: ${({ theme }) => theme.colors.error};
    border-color: ${({ theme }) => theme.colors.error};
    
    &:hover {
      background: ${({ theme }) => theme.colors.error};
      color: white;
    }
  }
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const ProductCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-2px);
  }
`

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  background: url(${props => props.image}) center/cover;
  position: relative;
`

const StockBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  
  ${({ inStock, theme }) => inStock 
    ? `background: ${theme.colors.success}20; color: ${theme.colors.success};`
    : `background: ${theme.colors.error}20; color: ${theme.colors.error};`
  }
`

const ProductContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const ProductDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const Stars = styled.div`
  display: flex;
  gap: 2px;
`

const Star = styled.span`
  color: ${({ filled, theme }) => filled ? '#fbbf24' : theme.colors.gray[300]};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`

const ReviewCount = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
`

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const CurrentPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
`

const OriginalPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: line-through;
`

const DiscountBadge = styled.span`
  background: ${({ theme }) => theme.colors.error}20;
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const ProductActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

const ProductActionButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: white;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[50]};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  
  &.primary {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary.main};
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary.dark};
    }
  }
  
  &.danger {
    background: ${({ theme }) => theme.colors.error}20;
    color: ${({ theme }) => theme.colors.error};
    border-color: ${({ theme }) => theme.colors.error};
    
    &:hover {
      background: ${({ theme }) => theme.colors.error};
      color: white;
    }
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.gray[400]};
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }
`

const SavedDate = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.sm};
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
`

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.gray[300]};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`

const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const WishlistPage = () => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { removeFromWishlist, clearWishlist, items: wishlistItems } = useWishlist()
  const [showUndo, setShowUndo] = useState(false)
  const [removedItem, setRemovedItem] = useState(null)

  const itemCount = wishlistItems.length

  const handleAddToCart = (product) => {
    addToCart({
      _id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }, 1, {})
  }

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId)
    // Optionally, implement undo with a temporary state if needed
  }

  const handleUndoRemove = () => {
    if (removedItem) {
      // Note: This would need to be updated if we want to support undo functionality
      // For now, we'll just clear the state
      setRemovedItem(null)
      setShowUndo(false)
    }
  }

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist? This action cannot be undone.')) {
      clearWishlist()
    }
  }

  const handleAddAllToCart = () => {
    const itemsToAdd = wishlistItems.filter(item => item.inStock)
    
    itemsToAdd.forEach(item => {
      addToCart(item, 1, {})
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Saved today'
    if (diffDays < 7) return `Saved ${diffDays} days ago`
    if (diffDays < 30) return `Saved ${Math.floor(diffDays / 7)} weeks ago`
    return `Saved ${Math.floor(diffDays / 30)} months ago`
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= rating}>
          ★
        </Star>
      )
    }
    return stars
  }

  return (
    <PageContainer>
      <Header>
        <HeaderTitle>
          <FaHeart />
          Your Wishlist
        </HeaderTitle>
        <HeaderSubtitle>Easily access and purchase your favorite products</HeaderSubtitle>
        <ItemCount>You have {itemCount} saved {itemCount === 1 ? 'item' : 'items'}</ItemCount>
      </Header>

      {itemCount > 0 && (
        <ControlsSection>
          <ActionButton className="primary" onClick={handleAddAllToCart}>
            <FaShoppingCart />
            Add All to Cart
          </ActionButton>
          <ActionButton className="danger" onClick={handleClearWishlist}>
            <FaTrash />
            Clear Wishlist
          </ActionButton>
        </ControlsSection>
      )}

      {itemCount === 0 ? (
        <EmptyState>
          <EmptyIcon>
            <FaRegHeart />
          </EmptyIcon>
          <EmptyTitle>Your wishlist is empty</EmptyTitle>
          <EmptyMessage>Start adding items you love to your wishlist!</EmptyMessage>
          <ActionButton 
            className="primary"
            onClick={() => navigate('/products')}
          >
            <FaArrowRight />
            Browse Products
          </ActionButton>
        </EmptyState>
      ) : (
        <ProductsGrid>
          {wishlistItems.map(product => (
            <ProductCard key={product.id}>
              <ProductImage image={product.image}>
                <StockBadge inStock={product.inStock}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </StockBadge>
              </ProductImage>
              
              <ProductContent>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
                
                <ProductRating>
                  <Stars>
                    {renderStars(product.rating)}
                  </Stars>
                  <ReviewCount>({product.reviewCount})</ReviewCount>
                </ProductRating>
                
                <PriceSection>
                  <CurrentPrice>${product.price.toFixed(2)}</CurrentPrice>
                  {product.originalPrice > product.price && (
                    <>
                      <OriginalPrice>${product.originalPrice.toFixed(2)}</OriginalPrice>
                      <DiscountBadge>
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </DiscountBadge>
                    </>
                  )}
                </PriceSection>
                
                <ProductActions>
                  <ProductActionButton
                    className="primary"
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </ProductActionButton>
                  <ProductActionButton onClick={() => navigate(`/product/${product.id}`)}>
                    <FaEye />
                    View Details
                  </ProductActionButton>
                  <ProductActionButton 
                    className="danger"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  >
                    <FaTrash />
                    Remove
                  </ProductActionButton>
                </ProductActions>
                
                <SavedDate>
                  {formatDate(product.savedDate)}
                </SavedDate>
              </ProductContent>
            </ProductCard>
          ))}
        </ProductsGrid>
      )}

      {/* Undo Toast */}
      {showUndo && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#10b981',
          color: 'white',
          padding: '1rem',
          borderRadius: '0.5rem',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <FaStar />
          Item removed from wishlist
          <button 
            onClick={handleUndoRemove}
            style={{
              background: 'none',
              border: '1px solid white',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              marginLeft: '0.5rem'
            }}
          >
            Undo
          </button>
        </div>
      )}
    </PageContainer>
  )
}

export default WishlistPage 