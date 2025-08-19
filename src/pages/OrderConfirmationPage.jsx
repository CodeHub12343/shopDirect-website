import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { 
  FaCheckCircle, 
  FaHome, 
  FaShoppingBag, 
  FaDownload, 
  FaTruck, 
  FaCreditCard,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaShare,
  FaStar,
  FaGift,
  FaUsers,
  FaShieldAlt,
  FaLock
} from 'react-icons/fa'
import { formatPrice } from '../services/apiUtils'

// Helper to get order from route state or localStorage
const getConfirmedOrder = (locationState) => {
  if (locationState?.order) return locationState.order
  try {
    const stored = localStorage.getItem('lastOrder')
    if (stored) return JSON.parse(stored)
  } catch (_) {}
  return null
}

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const SuccessBanner = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.success} 0%, ${({ theme }) => theme.colors.primary.main} 100%);
  color: white;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  font-size: 2rem;
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  opacity: 0.9;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const OrderNumber = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  display: inline-block;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const Section = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const OrderItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 64px;
    height: 64px;
  }
`

const ItemDetails = styled.div`
  flex: 1;
`

const ItemName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const ItemVariant = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const ItemPrice = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`

const PriceBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &.total {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    border-top: 1px solid ${({ theme }) => theme.colors.border.light};
    padding-top: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
  
  &.discount {
    color: ${({ theme }) => theme.colors.success};
  }
`

const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const AddressLine = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const TrackingSection = styled.div`
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.md};
`

const TrackingStatus = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const StatusDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active, completed }) => 
    completed ? '#10b981' : active ? '#f59e0b' : '#d1d5db'};
`

const ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    & > button {
      width: 100%;
      justify-content: center;
    }
  }
`

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  &.primary {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary.dark};
    }
  }
  
  &.secondary {
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.text.primary};
    
    &:hover {
      background: ${({ theme }) => theme.colors.gray[200]};
    }
  }
  
  &.outline {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary.main};
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: white;
    }
  }
`

const UpsellSection = styled.div`
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const UpsellTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const UpsellDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const OrderConfirmationPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const order = getConfirmedOrder(location.state)
  
  const copyOrderNumber = () => {
    if (!order?.orderNumber) return
    navigator.clipboard.writeText(order.orderNumber)
    alert('Order number copied to clipboard!')
  }
  
  const downloadInvoice = () => {
    // TODO: hook up to backend invoice endpoint when available
    alert('Invoice download started!')
  }
  
  const shareOrder = () => {
    alert('Share functionality would open here!')
  }
  
  return (
    <PageContainer>
      {/* Success Message & Order ID */}
      <SuccessBanner>
        <SuccessIcon>
          <FaCheckCircle />
        </SuccessIcon>
        <Title>Thank You for Your Order!</Title>
        <Subtitle>
          {order ? "Your order has been successfully placed. We're getting it ready for shipment!" : 'No recent order found.'}
        </Subtitle>
        {order?.orderNumber && (
          <OrderNumber onClick={copyOrderNumber}>
            Order #{order.orderNumber} (Click to copy)
          </OrderNumber>
        )}
      </SuccessBanner>
      
      <ContentGrid>
        <MainContent>
          {/* Order Summary */}
          <Section>
            <SectionTitle>
              <FaShoppingBag />
              Order Summary
            </SectionTitle>
            <OrderItems>
              {(order?.items || []).map((item) => (
                <OrderItem key={item.id}>
                  <ItemImage src={item.image} alt={item.name} />
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    {item.variant && <ItemVariant>{item.variant}</ItemVariant>}
                    <ItemPrice>Qty: {item.quantity}</ItemPrice>
                  </ItemDetails>
                  <ItemPrice>{formatPrice(item.price)}</ItemPrice>
                </OrderItem>
              ))}
            </OrderItems>
          </Section>
          
          {/* Shipping & Billing Info */}
          <Section>
            <SectionTitle>
              <FaMapMarkerAlt />
              Shipping & Billing Information
            </SectionTitle>
              <TwoColumnGrid>
              <div>
                <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>Shipping Address</h4>
                <AddressInfo>
                    <AddressLine>{order?.shippingAddress?.name || '-'}</AddressLine>
                    <AddressLine>{order?.shippingAddress?.address || '-'}</AddressLine>
                  <AddressLine>
                      {order?.shippingAddress?.city || '-'}, {order?.shippingAddress?.state || '-'} {order?.shippingAddress?.zipCode || ''}
                  </AddressLine>
                    <AddressLine>{order?.shippingAddress?.country || '-'}</AddressLine>
                </AddressInfo>
              </div>
              <div>
                <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>Billing Address</h4>
                <AddressInfo>
                    <AddressLine>{order?.billingAddress?.name || '-'}</AddressLine>
                    <AddressLine>{order?.billingAddress?.address || '-'}</AddressLine>
                  <AddressLine>
                      {order?.billingAddress?.city || '-'}, {order?.billingAddress?.state || '-'} {order?.billingAddress?.zipCode || ''}
                  </AddressLine>
                    <AddressLine>{order?.billingAddress?.country || '-'}</AddressLine>
                </AddressInfo>
              </div>
            </TwoColumnGrid>
          </Section>
          
          {/* Tracking & Delivery Estimate */}
          <Section>
            <SectionTitle>
              <FaTruck />
              Tracking & Delivery
            </SectionTitle>
              <TrackingSection>
              <TrackingStatus>
                <StatusDot active={true} />
                <span>Order Confirmed</span>
              </TrackingStatus>
              <TrackingStatus>
                <StatusDot />
                <span>Preparing for Shipment</span>
              </TrackingStatus>
              <TrackingStatus>
                <StatusDot />
                <span>Shipped</span>
              </TrackingStatus>
              <TrackingStatus>
                <StatusDot />
                <span>Delivered</span>
              </TrackingStatus>
              
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '8px' }}>
                <strong>Estimated Delivery:</strong> {order?.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : '-'} 
                <br />
                <small style={{ color: '#6b7280' }}>
                  Standard shipping (3-5 business days)
                </small>
              </div>
            </TrackingSection>
          </Section>
          
          {/* Payment Confirmation */}
          <Section>
            <SectionTitle>
              <FaCreditCard />
              Payment Confirmation
            </SectionTitle>
              <TwoColumnGrid>
              <div>
                  <strong>Payment Method:</strong> {order?.paymentMethod || '-'}
                <br />
                  <strong>Transaction ID:</strong> {order?.transactionId || '-'}
              </div>
              <div>
                  <strong>Order Date:</strong> {order?.orderDate ? new Date(order.orderDate).toLocaleDateString() : '-'}
                <br />
                <strong>Status:</strong> <span style={{ color: '#10b981' }}>Paid</span>
              </div>
            </TwoColumnGrid>
          </Section>
        </MainContent>
        
        <Sidebar>
          {/* Price Breakdown */}
          <Section>
            <SectionTitle>Order Summary</SectionTitle>
              <PriceBreakdown>
              <PriceRow>
                <span>Subtotal</span>
                  <span>{formatPrice(order?.subtotal || 0)}</span>
              </PriceRow>
              <PriceRow>
                <span>Shipping</span>
                  <span>{(order?.shipping || 0) === 0 ? 'Free' : formatPrice(order?.shipping || 0)}</span>
              </PriceRow>
              <PriceRow>
                <span>Tax</span>
                  <span>{formatPrice(order?.tax || 0)}</span>
              </PriceRow>
              <PriceRow className="discount">
                <span>Discount</span>
                  <span>-{formatPrice(order?.discount || 0)}</span>
              </PriceRow>
              <PriceRow className="total">
                <span>Total</span>
                  <span>{formatPrice(order?.total || 0)}</span>
              </PriceRow>
            </PriceBreakdown>
            
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#f0f9ff', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <FaGift style={{ color: '#2563eb', marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: '600', color: '#1e40af' }}>
                You earned {order?.loyaltyPoints ?? 0} points!
              </div>
              <small style={{ color: '#6b7280' }}>
                Redeem on your next purchase
              </small>
            </div>
          </Section>
          
          {/* Next-Step CTAs */}
          <Section>
            <SectionTitle>Next Steps</SectionTitle>
            <ActionButtons>
              <Button className="primary" onClick={() => navigate('/')}>
                <FaHome />
                Continue Shopping
              </Button>
              <Button className="outline" onClick={downloadInvoice}>
                <FaDownload />
                Download Invoice
              </Button>
              <Button className="secondary" onClick={() => navigate('/products')}>
                <FaShoppingBag />
                Browse Products
              </Button>
            </ActionButtons>
          </Section>
          
          {/* Upsells & Engagement */}
          <UpsellSection>
            <UpsellTitle>Share Your Experience</UpsellTitle>
            <UpsellDescription>
              Help others discover great products and earn rewards!
            </UpsellDescription>
            <ActionButtons>
              <Button className="outline" onClick={shareOrder}>
                <FaShare />
                Share Order
              </Button>
              <Button className="secondary">
                <FaUsers />
                Refer Friends
              </Button>
            </ActionButtons>
            
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: 'white', 
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <FaStar style={{ color: '#f59e0b' }} />
                <strong>Leave a Review</strong>
              </div>
              <small style={{ color: '#6b7280' }}>
                Get notified when your order arrives to leave a review
              </small>
            </div>
          </UpsellSection>
        </Sidebar>
      </ContentGrid>
      
      {/* Trust Badges */}
      <TrustBadges>
        <TrustBadge>
          <FaLock />
          Secure Transaction
        </TrustBadge>
        <TrustBadge>
          <FaShieldAlt />
          SSL Encrypted
        </TrustBadge>
        <TrustBadge>
          <FaCreditCard />
          PCI Compliant
        </TrustBadge>
      </TrustBadges>
    </PageContainer>
  )
}

export default OrderConfirmationPage 