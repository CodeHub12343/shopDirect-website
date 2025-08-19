import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { 
  FaFire, 
  FaClock, 
  FaShoppingCart, 
  FaHeart, 
  FaStar, 
  FaCopy,
  FaBell,
  FaGift,
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
  FaArrowRight,
  FaArrowLeft,
  FaTimes,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa'
import { useAppDispatch } from '../store/hooks'
import { addToCart } from '../store/slices/cartSlice'
import { formatPrice } from '../services/apiUtils'
import LoadingSpinner from '../components/common/LoadingSpinner'

// Mock data for flash deals
const FLASH_DEALS = {
  currentSale: {
    title: "MEGA FLASH SALE",
    subtitle: "Up to 70% Off - Limited Time Only!",
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    totalItems: 150,
    soldItems: 89
  },
  categories: [
    {
      id: 'electronics',
      name: 'Electronics',
      icon: '🔌',
      deals: [
        {
          id: 1,
          name: 'Wireless Noise-Canceling Headphones',
          originalPrice: 299.99,
          flashPrice: 149.99,
          discount: 50,
          image: 'https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          rating: 4.8,
          reviews: 1247,
          stock: 15,
          sold: 85,
          endTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes
          category: 'electronics'
        },
        {
          id: 2,
          name: '4K Smart TV 55"',
          originalPrice: 899.99,
          flashPrice: 449.99,
          discount: 50,
          image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          rating: 4.6,
          reviews: 892,
          stock: 8,
          sold: 92,
          endTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
          category: 'electronics'
        }
      ]
    },
    {
      id: 'fashion',
      name: 'Fashion',
      icon: '👕',
      deals: [
        {
          id: 3,
          name: 'Premium Denim Jacket',
          originalPrice: 89.99,
          flashPrice: 44.99,
          discount: 50,
          image: 'https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          rating: 4.7,
          reviews: 634,
          stock: 23,
          sold: 77,
          endTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
          category: 'fashion'
        },
        {
          id: 4,
          name: 'Designer Sneakers',
          originalPrice: 129.99,
          flashPrice: 64.99,
          discount: 50,
          image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          rating: 4.9,
          reviews: 1156,
          stock: 12,
          sold: 88,
          endTime: new Date(Date.now() + 20 * 60 * 1000), // 20 minutes
          category: 'fashion'
        }
      ]
    },
    {
      id: 'home',
      name: 'Home & Kitchen',
      icon: '🏠',
      deals: [
        {
          id: 5,
          name: 'Smart Coffee Maker',
          originalPrice: 199.99,
          flashPrice: 99.99,
          discount: 50,
          image: 'https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          rating: 4.5,
          reviews: 445,
          stock: 18,
          sold: 82,
          endTime: new Date(Date.now() + 90 * 60 * 1000), // 1.5 hours
          category: 'home'
        }
      ]
    }
  ],
  upcomingDeals: [
    {
      id: 6,
      name: 'Gaming Laptop Deal',
      startTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours
      originalPrice: 1299.99,
      flashPrice: 649.99,
      discount: 50,
      image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      category: 'electronics'
    },
    {
      id: 7,
      name: 'Kitchen Bundle Sale',
      startTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
      originalPrice: 399.99,
      flashPrice: 199.99,
      discount: 50,
      image: 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      category: 'home'
    }
  ],
  promoCodes: [
    { code: 'FLASH20', discount: 20, description: 'Extra 20% off flash deals' },
    { code: 'FREESHIP', discount: 0, description: 'Free shipping on orders over $50' },
    { code: 'FIRST10', discount: 10, description: '10% off for first-time buyers' }
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

const HeroBanner = styled.div`
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 50%, #ff6b6b 100%);
  color: white;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="fire" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="2" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23fire)"/></svg>');
    opacity: 0.3;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
`

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  }
`

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0.9;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.base};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }
`

const CountdownTimer = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  backdrop-filter: blur(10px);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const TimerTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const TimerDisplay = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const TimeUnit = styled.div`
  background: rgba(255, 255, 255, 0.3);
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  min-width: 80px;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-width: 64px;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`

const TimeValue = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }
`

const TimeLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  opacity: 0.8;
`

const ProgressBar = styled.div`
  background: rgba(255, 255, 255, 0.3);
  height: 8px;
  border-radius: 4px;
  margin: ${({ theme }) => theme.spacing.md} 0;
  overflow: hidden;
`

const ProgressFill = styled.div`
  height: 100%;
  background: #fff;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${({ progress }) => progress}%;
`

const CTAButton = styled.button`
  background: white;
  color: #ff6b6b;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`

const CategoryTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const CategoryTab = styled.button`
  background: ${({ active, theme }) => active ? theme.colors.primary.main : theme.colors.gray[100]};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.text.primary};
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  white-space: nowrap;
  
  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.primary.dark : theme.colors.gray[200]};
  }
`

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const ProductCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.base};
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 160px;
  }
`

const DiscountBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  background: #ff4757;
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`

const StockBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: ${({ low }) => low ? '#ff4757' : '#2ed573'};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`

const ProductInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`

const FlashPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #ff4757;
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const StockProgress = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const StockText = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const StockBar = styled.div`
  background: ${({ theme }) => theme.colors.gray[200]};
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
`

const StockFill = styled.div`
  height: 100%;
  background: ${({ low }) => low ? '#ff4757' : '#2ed573'};
  border-radius: 3px;
  transition: width 0.3s ease;
  width: ${({ percentage }) => percentage}%;
`

const ProductActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    & > button { width: 100%; }
  }
`

const ActionButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
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
`

const PromoCodesSection = styled.div`
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

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
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const PromoCodesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`

const PromoCodeCard = styled.div`
  background: white;
  border: 2px dashed ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  position: relative;
`

const PromoCode = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const PromoDescription = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const CopyButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`

const UpcomingDealsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const UpcomingDealsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

const UpcomingDealCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const UpcomingDealImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 64px;
    height: 64px;
  }
`

const UpcomingDealInfo = styled.div`
  flex: 1;
`

const UpcomingDealName = styled.h4`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const UpcomingDealPrice = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const RemindButton = styled.button`
  background: ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[200]};
  }
`

const TrustSection = styled.div`
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const FlashDealsPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeCategory, setActiveCategory] = useState('all')
  const [copiedCode, setCopiedCode] = useState('')
  const [reminders, setReminders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading flash deals
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Update current time every second for countdown timers
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Calculate time remaining for main sale
  const getTimeRemaining = (endTime) => {
    const total = endTime - currentTime
    const hours = Math.floor(total / (1000 * 60 * 60))
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((total % (1000 * 60)) / 1000)
    return { hours, minutes, seconds, total }
  }

  // Format time with leading zeros
  const formatTime = (time) => time.toString().padStart(2, '0')

  const mainSaleTime = getTimeRemaining(FLASH_DEALS.currentSale.endTime)
  const progressPercentage = ((FLASH_DEALS.currentSale.soldItems / FLASH_DEALS.currentSale.totalItems) * 100).toFixed(1)

  // Get all products for current category
  const getCurrentProducts = () => {
    if (activeCategory === 'all') {
      return FLASH_DEALS.categories.flatMap(cat => cat.deals)
    }
    return FLASH_DEALS.categories.find(cat => cat.id === activeCategory)?.deals || []
  }

  // Handle add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart({
      product: {
        id: product.id,
        name: product.name,
        price: product.flashPrice,
        images: [product.image]
      },
      quantity: 1,
      selectedVariants: {}
    }))
  }

  // Handle copy promo code
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  // Handle set reminder
  const handleSetReminder = (dealId) => {
    if (!reminders.includes(dealId)) {
      setReminders([...reminders, dealId])
      // In a real app, this would set up a notification
      alert('Reminder set! You\'ll be notified when this deal starts.')
    }
  }

  // Scroll to deals
  const scrollToDeals = () => {
    document.getElementById('flash-deals-grid').scrollIntoView({ behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingSpinner 
          variant="morph" 
          size="large" 
          text="Loading amazing deals..." 
          minHeight="60vh"
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      {/* Hero Banner with Countdown Timer */}
      <HeroBanner>
        <HeroContent>
          <HeroTitle>
            <FaFire />
            {FLASH_DEALS.currentSale.title}
          </HeroTitle>
          <HeroSubtitle>{FLASH_DEALS.currentSale.subtitle}</HeroSubtitle>
          
          <CountdownTimer>
            <TimerTitle>
              <FaClock style={{ marginRight: '8px' }} />
              Sale Ends In:
            </TimerTitle>
            <TimerDisplay>
              <TimeUnit>
                <TimeValue>{formatTime(mainSaleTime.hours)}</TimeValue>
                <TimeLabel>Hours</TimeLabel>
              </TimeUnit>
              <TimeUnit>
                <TimeValue>{formatTime(mainSaleTime.minutes)}</TimeValue>
                <TimeLabel>Minutes</TimeLabel>
              </TimeUnit>
              <TimeUnit>
                <TimeValue>{formatTime(mainSaleTime.seconds)}</TimeValue>
                <TimeLabel>Seconds</TimeLabel>
              </TimeUnit>
            </TimerDisplay>
            
            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Items Sold: {FLASH_DEALS.currentSale.soldItems}/{FLASH_DEALS.currentSale.totalItems}</span>
                <span>{progressPercentage}% Sold</span>
              </div>
              <ProgressBar>
                <ProgressFill progress={progressPercentage} />
              </ProgressBar>
            </div>
          </CountdownTimer>
          
          <CTAButton onClick={scrollToDeals}>
            Shop Flash Deals Now
            <FaArrowRight />
          </CTAButton>
        </HeroContent>
      </HeroBanner>

      {/* Category Tabs */}
      <CategoryTabs>
        <CategoryTab 
          active={activeCategory === 'all'} 
          onClick={() => setActiveCategory('all')}
        >
          🔥 All Deals
        </CategoryTab>
        {FLASH_DEALS.categories.map(category => (
          <CategoryTab 
            key={category.id}
            active={activeCategory === category.id} 
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon} {category.name}
          </CategoryTab>
        ))}
      </CategoryTabs>

      {/* Live Flash Sale Product Grid */}
      <div id="flash-deals-grid">
        <ProductGrid>
          {getCurrentProducts().map(product => {
            const productTime = getTimeRemaining(product.endTime)
            const stockPercentage = ((product.stock / (product.stock + product.sold)) * 100).toFixed(1)
            const isLowStock = product.stock <= 5

            return (
              <ProductCard key={product.id}>
                <ProductImage src={product.image} alt={product.name} />
                <DiscountBadge>-{product.discount}% OFF</DiscountBadge>
                <StockBadge low={isLowStock}>
                  {isLowStock ? `Only ${product.stock} Left!` : 'In Stock'}
                </StockBadge>
                
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  
                  <PriceContainer>
                    <OriginalPrice>{formatPrice(product.originalPrice)}</OriginalPrice>
                    <FlashPrice>{formatPrice(product.flashPrice)}</FlashPrice>
                  </PriceContainer>
                  
                  <RatingContainer>
                    <FaStar style={{ color: '#ffa502' }} />
                    <span>{product.rating}</span>
                    <span style={{ color: '#6b7280' }}>({product.reviews})</span>
                  </RatingContainer>
                  
                  <StockProgress>
                    <StockText>
                      {product.stock} left • {product.sold} sold
                    </StockText>
                    <StockBar>
                      <StockFill percentage={stockPercentage} low={isLowStock} />
                    </StockBar>
                  </StockProgress>
                  
                  <div style={{ 
                    background: '#fff3cd', 
                    padding: '0.5rem', 
                    borderRadius: '4px', 
                    marginBottom: '1rem',
                    fontSize: '0.875rem',
                    color: '#856404'
                  }}>
                    <FaClock style={{ marginRight: '4px' }} />
                    Ends in {formatTime(productTime.hours)}:{formatTime(productTime.minutes)}:{formatTime(productTime.seconds)}
                  </div>
                  
                  <ProductActions>
                    <ActionButton 
                      className="primary" 
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </ActionButton>
                    <ActionButton className="secondary">
                      <FaHeart />
                      Wishlist
                    </ActionButton>
                  </ProductActions>
                </ProductInfo>
              </ProductCard>
            )
          })}
        </ProductGrid>
      </div>

      {/* Exclusive Promo Codes */}
      <PromoCodesSection>
        <SectionTitle>
          <FaGift />
          Exclusive Promo Codes
        </SectionTitle>
        <PromoCodesGrid>
          {FLASH_DEALS.promoCodes.map(promo => (
            <PromoCodeCard key={promo.code}>
              <PromoCode>{promo.code}</PromoCode>
              <PromoDescription>{promo.description}</PromoDescription>
              <CopyButton 
                onClick={() => handleCopyCode(promo.code)}
                style={{ 
                  background: copiedCode === promo.code ? '#10b981' : undefined 
                }}
              >
                {copiedCode === promo.code ? (
                  <>
                    <FaCheck />
                    Copied!
                  </>
                ) : (
                  <>
                    <FaCopy />
                    Copy Code
                  </>
                )}
              </CopyButton>
            </PromoCodeCard>
          ))}
        </PromoCodesGrid>
      </PromoCodesSection>

      {/* Upcoming Deals */}
      <UpcomingDealsSection>
        <SectionTitle>
          <FaBell />
          Upcoming Deals
        </SectionTitle>
        <UpcomingDealsGrid>
          {FLASH_DEALS.upcomingDeals.map(deal => {
            const timeUntilStart = getTimeRemaining(deal.startTime)
            
            return (
              <UpcomingDealCard key={deal.id}>
                <UpcomingDealImage src={deal.image} alt={deal.name} />
                <UpcomingDealInfo>
                  <UpcomingDealName>{deal.name}</UpcomingDealName>
                  <UpcomingDealPrice>
                    <OriginalPrice>{formatPrice(deal.originalPrice)}</OriginalPrice>
                    <FlashPrice>{formatPrice(deal.flashPrice)}</FlashPrice>
                  </UpcomingDealPrice>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Starts in {formatTime(timeUntilStart.hours)}:{formatTime(timeUntilStart.minutes)}:{formatTime(timeUntilStart.seconds)}
                  </div>
                  <RemindButton 
                    onClick={() => handleSetReminder(deal.id)}
                    disabled={reminders.includes(deal.id)}
                  >
                    <FaBell />
                    {reminders.includes(deal.id) ? 'Reminder Set' : 'Set Reminder'}
                  </RemindButton>
                </UpcomingDealInfo>
              </UpcomingDealCard>
            )
          })}
        </UpcomingDealsGrid>
      </UpcomingDealsSection>

      {/* Trust Elements */}
      <TrustSection>
        <SectionTitle>
          <FaShieldAlt />
          Shop with Confidence
        </SectionTitle>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          Free shipping on flash deals over $50 • Secure checkout • 30-day returns
        </p>
        <TrustBadges>
          <TrustBadge>
            <FaTruck />
            Free Shipping
          </TrustBadge>
          <TrustBadge>
            <FaShieldAlt />
            SSL Secure
          </TrustBadge>
          <TrustBadge>
            <FaCreditCard />
            Secure Payment
          </TrustBadge>
        </TrustBadges>
      </TrustSection>
    </PageContainer>
  )
}

export default FlashDealsPage 