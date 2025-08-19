import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { FiShoppingBag, FiArrowLeft, FiTruck, FiShield, FiCreditCard } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { 
  removeFromCart, 
  updateQuantity, 
  applyCoupon, 
  removeCoupon, 
  updateShippingMethod,
  moveToWishlist 
} from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import { formatPrice, getImageUrl } from '../services/apiUtils';
import { getRelatedProducts } from '../services/apiProducts';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CartPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  h1 {
    font-size: ${({ theme }) => theme.typography.sizes['3xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const CartItemsSection = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`;

const EmptyCartContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']};
  
  svg {
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.gray[400]};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  h2 {
    font-size: ${({ theme }) => theme.typography.sizes['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const ContinueShoppingButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-1px);
  }
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto auto;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 80px 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 80px;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ItemTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ItemVariant = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ItemPrice = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.primary.main};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1 / -1;
    justify-content: center;
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[50]};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  height: 32px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: center;
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[50]};
  }
  
  &.remove {
    color: ${({ theme }) => theme.colors.error};
    border-color: ${({ theme }) => theme.colors.error};
    
    &:hover {
      background: ${({ theme }) => theme.colors.error};
      color: white;
    }
  }
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  height: fit-content;
  position: sticky;
  top: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: static;
    order: -1;
  }
`;

const SummaryTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  
  &.total {
    border-top: 2px solid ${({ theme }) => theme.colors.border.main};
    margin-top: ${({ theme }) => theme.spacing.md};
    padding-top: ${({ theme }) => theme.spacing.md};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }
  
  &.discount {
    color: ${({ theme }) => theme.colors.success};
  }
`;

const CouponSection = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const CouponInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondaryDark};
  }
`;

const AppliedCoupon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.success};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const RemoveCouponButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  
  &:hover {
    text-decoration: underline;
  }
`;

const ShippingSection = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const ShippingMethod = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &.selected {
    border-color: ${({ theme }) => theme.colors.primary.main};
    background: ${({ theme }) => theme.colors.primary.main}10;
  }
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ShippingName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ShippingDays = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ShippingCost = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.primary.main};
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const TrustBadges = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  
  svg {
    color: ${({ theme }) => theme.colors.gray[500]};
    font-size: 1.5rem;
  }
`;

const CrossSellingSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CrossSellingTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CrossSellingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CrossSellingItem = styled(Link)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  text-decoration: none;
  color: inherit;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  h4 {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  // Get the first cart item to fetch related products
  const firstCartItem = cart.items[0];
  
  // Fetch related products based on the first cart item
  const { 
    data: relatedProducts = [], 
    isLoading: relatedProductsLoading, 
    error: relatedProductsError 
  } = useQuery({
    queryKey: ['cartRelatedProducts', firstCartItem?.product?._id],
    queryFn: () => firstCartItem?.product?._id ? getRelatedProducts(firstCartItem.product._id, 4) : Promise.resolve([]),
    enabled: !!firstCartItem?.product?._id,
    retry: 1,
  });

  const handleQuantityChange = (itemId, newQuantity) => {
    dispatch(updateQuantity({ itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleMoveToWishlist = (item) => {
    dispatch(addToWishlist(item.product));
    dispatch(moveToWishlist(item.id));
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    const result = dispatch(applyCoupon(couponCode));
    if (result?.success) {
      setCouponMessage(result.message);
      setCouponCode('');
    } else {
      setCouponMessage(result?.message || 'Invalid coupon code');
    }
    
    setTimeout(() => setCouponMessage(''), 3000);
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
  };

  const handleShippingMethodChange = (method) => {
    dispatch(updateShippingMethod(method));
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  const shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', cost: 5.99, days: '3-5 business days' },
    { id: 'express', name: 'Express Shipping', cost: 12.99, days: '1-2 business days' },
    { id: 'overnight', name: 'Overnight Shipping', cost: 24.99, days: 'Next business day' }
  ];

  if (cart.items.length === 0) {
    return (
      <CartPageContainer>
        <CartHeader>
          <FiShoppingBag />
          <h1>Shopping Cart</h1>
        </CartHeader>
        
        <EmptyCartContainer>
          <FiShoppingBag />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <ContinueShoppingButton to="/products">
            <FiArrowLeft />
            Start Shopping
          </ContinueShoppingButton>
        </EmptyCartContainer>
      </CartPageContainer>
    );
  }

  return (
    <CartPageContainer>
      <CartHeader>
        <FiShoppingBag />
        <h1>Shopping Cart ({cart.totalQuantity} items)</h1>
      </CartHeader>

      <CartContent>
        <CartItemsSection>
          {cart.items.map((item) => (
            <CartItem key={item.id}>
              <ItemImage 
                src={getImageUrl(item.product.imageCover || item.product.images?.[0] || item.product.image)} 
                alt={item.product.name}
              />
              
              <ItemDetails>
                <ItemTitle>{item.product.name}</ItemTitle>
                {Object.keys(item.selectedVariants).length > 0 && (
                  <ItemVariant>
                    {Object.entries(item.selectedVariants)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(', ')}
                  </ItemVariant>
                )}
                <ItemPrice>{formatPrice(item.product.price)}</ItemPrice>
              </ItemDetails>

              <QuantityControls>
                <QuantityButton
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </QuantityButton>
                <QuantityInput
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                  min="1"
                  max="99"
                />
                <QuantityButton
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  disabled={item.quantity >= 99}
                >
                  +
                </QuantityButton>
              </QuantityControls>

              <ItemActions>
                <ActionButton onClick={() => handleMoveToWishlist(item)}>
                  Save for Later
                </ActionButton>
                <ActionButton 
                  className="remove"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </ActionButton>
              </ItemActions>
            </CartItem>
          ))}
        </CartItemsSection>

        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          <SummaryRow>
            <span>Subtotal ({cart.totalQuantity} items)</span>
            <span>{formatPrice(cart.subtotal)}</span>
          </SummaryRow>
          
          {cart.discountAmount > 0 && (
            <SummaryRow className="discount">
              <span>Discount</span>
              <span>-{formatPrice(cart.discountAmount)}</span>
            </SummaryRow>
          )}
          
          <SummaryRow>
            <span>Shipping</span>
            <span>{cart.shippingCost === 0 ? 'Free' : formatPrice(cart.shippingCost)}</span>
          </SummaryRow>
          
          <SummaryRow>
            <span>Tax</span>
            <span>{formatPrice(cart.taxAmount)}</span>
          </SummaryRow>
          
          <SummaryRow className="total">
            <span>Total</span>
            <span>{formatPrice(cart.totalAmount)}</span>
          </SummaryRow>

          <CouponSection>
            <h4>Have a coupon?</h4>
            {cart.appliedCoupon ? (
              <AppliedCoupon>
                <span>✅ {cart.appliedCoupon.code} applied</span>
                <RemoveCouponButton onClick={handleRemoveCoupon}>
                  Remove
                </RemoveCouponButton>
              </AppliedCoupon>
            ) : (
              <>
                <CouponInput
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                />
                <ApplyButton onClick={handleApplyCoupon}>
                  Apply Coupon
                </ApplyButton>
                {couponMessage && (
                  <p style={{ 
                    color: couponMessage.includes('applied') ? 'green' : 'red',
                    fontSize: '0.875rem',
                    marginTop: '0.5rem'
                  }}>
                    {couponMessage}
                  </p>
                )}
              </>
            )}
          </CouponSection>

          <ShippingSection>
            <h4>Shipping Method</h4>
            {shippingMethods.map((method) => (
              <ShippingMethod
                key={method.id}
                className={cart.shippingMethod === method.id ? 'selected' : ''}
                onClick={() => handleShippingMethodChange(method.id)}
              >
                <ShippingInfo>
                  <ShippingName>{method.name}</ShippingName>
                  <ShippingDays>{method.days}</ShippingDays>
                </ShippingInfo>
                <ShippingCost>
                  {method.id === cart.shippingMethod && cart.shippingCost === 0 
                    ? 'Free' 
                    : formatPrice(method.cost)
                  }
                </ShippingCost>
              </ShippingMethod>
            ))}
            
            {cart.estimatedDelivery && (
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                marginTop: '0.5rem' 
              }}>
                Estimated delivery: {cart.estimatedDelivery}
              </p>
            )}
          </ShippingSection>

          <CheckoutButton 
            onClick={handleCheckout}
            disabled={cart.items.length === 0}
          >
            Proceed to Checkout
          </CheckoutButton>

          <TrustBadges>
            <FiShield title="Secure Checkout" />
            <FiCreditCard title="Multiple Payment Options" />
            <FiTruck title="Fast Shipping" />
          </TrustBadges>
        </OrderSummary>
      </CartContent>

      <CrossSellingSection>
        <CrossSellingTitle>You May Also Like</CrossSellingTitle>
        {relatedProductsLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <LoadingSpinner variant="pulse" size="medium" text="Loading recommendations..." />
          </div>
        ) : relatedProductsError ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
            <p>Unable to load recommendations. Please try again later.</p>
          </div>
        ) : relatedProducts.length > 0 ? (
          <CrossSellingGrid>
            {relatedProducts.map((product) => (
              <CrossSellingItem key={product._id} to={`/product/${product._id}`}>
                <img src={getImageUrl(product.imageCover)} alt={product.name} />
                <h4>{product.name}</h4>
                <p>{formatPrice(product.price)}</p>
              </CrossSellingItem>
            ))}
          </CrossSellingGrid>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
            <p>No recommendations available at the moment.</p>
          </div>
        )}
      </CrossSellingSection>
    </CartPageContainer>
  );
};

export default CartPage;