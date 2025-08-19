import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import api from '../services/apiAuth'
import { getImageUrl } from '../services/apiUtils'
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCreditCard, FaHeart,
  FaShieldAlt, FaCog, FaSignOutAlt, FaEdit, FaPlus, FaTrash, FaEye,
  FaEyeSlash, FaCheck, FaTimes, FaTruck, FaBox, FaClock, FaStar,
  FaGift, FaBell, FaGlobe, FaDollarSign, FaQuestionCircle, FaUndo,
  FaDownload, FaLock, FaUnlock, FaMobile, FaDesktop, FaMapPin,
  FaCalendarAlt, FaShoppingBag, FaArrowRight, FaCrown, FaMedal, FaTrophy
} from 'react-icons/fa'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useAuth } from '../contexts/AuthContext'
import { getUserAvatarUrl } from '../utils/imageUtils'

// Mock data
const DASHBOARD_DATA = {
  user: {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    membershipTier: "Gold",
    loyaltyPoints: 1250,
    pointsToNextTier: 750,
    nextTier: "Platinum",
    joinDate: "2023-01-15"
  },
  recentOrders: [
    {
      id: "ORD-2025-001",
      date: "2025-01-15",
      status: "delivered",
      total: 89.99,
      items: 3,
      tracking: "1Z999AA1234567890",
      products: [
        { id: 1, name: "Wireless Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" }
      ]
    },
    {
      id: "ORD-2025-002",
      date: "2025-01-10",
      status: "in-transit",
      total: 149.99,
      items: 2,
      tracking: "1Z999AA1234567891",
      products: [
        { id: 3, name: "Laptop Backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" }
      ]
    }
  ],
  paymentMethods: [
    {
      id: 1,
      type: "visa",
      last4: "1234",
      expiry: "12/26",
      isDefault: true,
      cardholderName: "John Smith"
    }
  ],
  addresses: [
    {
      id: 1,
      type: "shipping",
      isDefault: true,
      name: "Home",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States"
    }
  ],
  wishlist: [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      inStock: true
    }
  ]
}

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`

const DashboardHeader = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main} 0%, ${({ theme }) => theme.colors.primary.dark} 100%);
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
  }
`

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: url(${props => props.src}) center/cover;
  border: 3px solid white;
  flex-shrink: 0;
`

const WelcomeInfo = styled.div`
  flex: 1;
`

const WelcomeTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const WelcomeSubtitle = styled.p`
  opacity: 0.9;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const MembershipBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: rgba(255, 255, 255, 0.2);
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const DashboardGrid = styled.div`
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
  gap: ${({ theme }) => theme.spacing.lg};
`

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const Card = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const CardAction = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.main};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  &:hover {
    text-decoration: underline;
  }
`

const LoyaltySection = styled.div`
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const LoyaltyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const LoyaltyTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const PointsDisplay = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const PointsNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const PointsLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  opacity: 0.9;
`

const ProgressBar = styled.div`
  background: rgba(255, 255, 255, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  height: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;
`

const ProgressFill = styled.div`
  background: white;
  height: 100%;
  width: ${({ progress }) => progress}%;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 0.3s ease;
`

const ProgressText = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  text-align: center;
`

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const OrderImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: url(${props => props.image}) center/cover;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 48px;
    height: 48px;
  }
`

const OrderInfo = styled.div`
  flex: 1;
`

const OrderTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const OrderMeta = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  flex-wrap: wrap;
  row-gap: ${({ theme }) => theme.spacing.xs};
  column-gap: ${({ theme }) => theme.spacing.md};
`

const StatusBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  
  &.delivered {
    background: ${({ theme }) => theme.colors.success}20;
    color: ${({ theme }) => theme.colors.success};
  }
  
  &.in-transit {
    background: ${({ theme }) => theme.colors.warning}20;
    color: ${({ theme }) => theme.colors.warning};
  }
  
  &.processing {
    background: ${({ theme }) => theme.colors.info}20;
    color: ${({ theme }) => theme.colors.info};
  }
`

const OrderActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.sm};

    & > button {
      flex: 1 1 48%;
      justify-content: center;
    }
  }
`

const ActionButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
  
  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary.main};
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: white;
    }
  }
`

const SettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

const SettingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const SettingLabel = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const SettingDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background: ${({ theme }) => theme.colors.primary.main};
  }
  
  &:checked + span:before {
    transform: translateX(26px);
  }
`

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.gray[300]};
  transition: 0.3s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const QuickLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[50]};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.error};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.error}dd;
  }
`

const AccountDashboardPage = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [recentOrders, setRecentOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(true)

  // Fetch user orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await api.get('/orders/my-orders')
        const userData = res.data?.data?.user || res.data?.data || res.data?.user || res.data
        const orders = userData?.orders || []
        
        // Map orders to UI format and take only the 3 most recent
        const mappedOrders = orders
          .map(order => ({
            id: order._id || order.id,
            date: order.createdAt,
            status: order.isDelivered ? 'delivered' : 'processing',
            total: order.totalPrice,
            items: order.orderItems?.length || 0,
            tracking: order.tracking?.number,
            products: order.orderItems?.slice(0, 1).map(oi => ({
              id: oi._id || oi.id,
              name: oi.product?.name || 'Product',
              image: getImageUrl(oi.product?.imageCover || oi.product?.images?.[0])
            })) || []
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3)
        
        setRecentOrders(mappedOrders)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
        setRecentOrders([])
      } finally {
        setOrdersLoading(false)
      }
    }

    if (user) {
      fetchOrders()
    }
  }, [user])

  // Use user data from auth context
  const userAvatar = getUserAvatarUrl(user?.photo)
  const userName = user?.name || "User"
  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "2023-01-15"

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'delivered'
      case 'in-transit': return 'in-transit'
      case 'processing': return 'processing'
      default: return 'processing'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Delivered'
      case 'in-transit': return 'In Transit'
      case 'processing': return 'Processing'
      default: return 'Processing'
    }
  }

  const formatCurrency = (value) => {
    const num = typeof value === 'number' ? value : Number(value)
    if (Number.isNaN(num)) return '$0.00'
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }

  const formatDate = (dateString) => {
    if (!dateString) return '—'
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return '—'
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleViewAllOrders = () => {
    navigate('/orders')
  }

  const handleTrackOrder = (order) => {
    if (order.tracking) {
      window.open(`https://www.fedex.com/fedextrack/?trknbr=${order.tracking}`, '_blank')
    }
  }

  const handleReorder = (order) => {
    // TODO: Implement reorder functionality
    console.log('Reorder order:', order.id)
  }

  return (
    <PageContainer>
      {/* Welcome Header */}
      <DashboardHeader>
        <Avatar src={userAvatar} />
        <WelcomeInfo>
          <WelcomeTitle>Welcome back, {userName}!</WelcomeTitle>
          <WelcomeSubtitle>
            Member since {joinDate}
          </WelcomeSubtitle>
          <MembershipBadge>
            <FaCrown />
            Gold Member
          </MembershipBadge>
        </WelcomeInfo>
      </DashboardHeader>

      {/* Loyalty Section */}
      <LoyaltySection>
        <LoyaltyHeader>
          <LoyaltyTitle>
            <FaGift />
            Loyalty Rewards
          </LoyaltyTitle>
          <CardAction>Redeem Points</CardAction>
        </LoyaltyHeader>
        <PointsDisplay>
          <PointsNumber>1250</PointsNumber>
          <PointsLabel>Points Available</PointsLabel>
        </PointsDisplay>
        <ProgressBar>
          <ProgressFill progress={62.5} />
        </ProgressBar>
        <ProgressText>
          750 more points to reach Platinum tier
        </ProgressText>
      </LoyaltySection>

      <DashboardGrid>
        <MainContent>
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>
                <FaShoppingBag />
                Recent Orders
              </CardTitle>
              <CardAction onClick={handleViewAllOrders}>View All Orders</CardAction>
            </CardHeader>
            {ordersLoading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <LoadingSpinner variant="dots" size="small" text="Loading orders..." />
              </div>
            ) : recentOrders.length > 0 ? (
              recentOrders.map(order => (
                <OrderItem key={order.id}>
                  <OrderImage image={order.products[0]?.image || ''} />
                  <OrderInfo>
                    <OrderTitle>Order {order.id}</OrderTitle>
                    <OrderMeta>
                      <span>{formatDate(order.date)}</span>
                      <span>{formatCurrency(order.total)}</span>
                      <span>{order.items} items</span>
                      <StatusBadge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </StatusBadge>
                    </OrderMeta>
                  </OrderInfo>
                  <OrderActions>
                    {order.tracking && (
                      <ActionButton onClick={() => handleTrackOrder(order)}>Track Order</ActionButton>
                    )}
                    <ActionButton className="secondary" onClick={() => handleReorder(order)}>Reorder</ActionButton>
                  </OrderActions>
                </OrderItem>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                <FaShoppingBag style={{ fontSize: '2rem', marginBottom: '1rem', opacity: 0.5 }} />
                <p>No orders yet</p>
                <p style={{ fontSize: '0.875rem' }}>Start shopping to see your orders here</p>
              </div>
            )}
          </Card>
        </MainContent>

        <Sidebar>
          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>
                <FaShieldAlt />
                Security
              </CardTitle>
            </CardHeader>
            <SettingsSection>
              <SettingItem>
                <SettingInfo>
                  <div>
                    <SettingLabel>Two-Factor Authentication</SettingLabel>
                    <SettingDescription>Add an extra layer of security</SettingDescription>
                  </div>
                </SettingInfo>
                <Toggle>
                  <ToggleInput 
                    type="checkbox" 
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  />
                  <ToggleSlider />
                </Toggle>
              </SettingItem>
              <SettingItem>
                <SettingInfo>
                  <div>
                    <SettingLabel>Change Password</SettingLabel>
                    <SettingDescription>Update your account password</SettingDescription>
                  </div>
                </SettingInfo>
                <ActionButton className="secondary">Update</ActionButton>
              </SettingItem>
              <SettingItem>
                <SettingInfo>
                  <div>
                    <SettingLabel>Account Settings</SettingLabel>
                    <SettingDescription>Manage profile, security & preferences</SettingDescription>
                  </div>
                </SettingInfo>
                <ActionButton 
                  className="primary" 
                  onClick={() => navigate('/account/settings')}
                >
                  <FaCog style={{ marginRight: '0.5rem' }} />
                  Go to Settings
                </ActionButton>
              </SettingItem>
            </SettingsSection>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>
                <FaCog />
                Preferences
              </CardTitle>
            </CardHeader>
            <SettingsSection>
              <SettingItem>
                <SettingInfo>
                  <div>
                    <SettingLabel>Email Notifications</SettingLabel>
                    <SettingDescription>Order updates and promotions</SettingDescription>
                  </div>
                </SettingInfo>
                <Toggle>
                  <ToggleInput 
                    type="checkbox" 
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                  <ToggleSlider />
                </Toggle>
              </SettingItem>
              <SettingItem>
                <SettingInfo>
                  <div>
                    <SettingLabel>Push Notifications</SettingLabel>
                    <SettingDescription>Real-time order updates</SettingDescription>
                  </div>
                </SettingInfo>
                <Toggle>
                  <ToggleInput 
                    type="checkbox" 
                    checked={pushNotifications}
                    onChange={(e) => setPushNotifications(e.target.checked)}
                  />
                  <ToggleSlider />
                </Toggle>
              </SettingItem>
              <SettingItem>
                <SettingInfo>
                  <div>
                    <SettingLabel>Newsletter</SettingLabel>
                    <SettingDescription>Weekly deals and updates</SettingDescription>
                  </div>
                </SettingInfo>
                <Toggle>
                  <ToggleInput 
                    type="checkbox" 
                    checked={newsletterSubscribed}
                    onChange={(e) => setNewsletterSubscribed(e.target.checked)}
                  />
                  <ToggleSlider />
                </Toggle>
              </SettingItem>
            </SettingsSection>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>
                <FaQuestionCircle />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <QuickLinks>
              <QuickLink to="/account/settings">
                <FaCog />
                <div>
                  <div style={{ fontWeight: '500' }}>Account Settings</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Manage your profile & preferences</div>
                </div>
              </QuickLink>
              <QuickLink to="/returns">
                <FaUndo />
                <div>
                  <div style={{ fontWeight: '500' }}>Returns & Refunds</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Start a return request</div>
                </div>
              </QuickLink>
              <QuickLink to="/support">
                <FaQuestionCircle />
                <div>
                  <div style={{ fontWeight: '500' }}>Customer Support</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Get help with your orders</div>
                </div>
              </QuickLink>
              <QuickLink to="/help">
                <FaQuestionCircle />
                <div>
                  <div style={{ fontWeight: '500' }}>Help Center</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Browse FAQs and guides</div>
                </div>
              </QuickLink>
            </QuickLinks>
          </Card>

          {/* Logout */}
          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt />
            Log Out
          </LogoutButton>
        </Sidebar>
      </DashboardGrid>
    </PageContainer>
  )
}

export default AccountDashboardPage 