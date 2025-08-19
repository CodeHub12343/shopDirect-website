 import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaClock, FaFire, FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa'
import { formatPrice, getImageUrl } from '../../services/apiUtils'

const FlashDealsSection = styled.section`
  padding: ${({ theme }) => theme.spacing[16]} 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: ${({ theme }) => theme.colors.textInverse};
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
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[3]};
`

const FireIcon = styled(FaFire)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
`

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`

const DealsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${({ theme }) => theme.spacing[6]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const DealCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;

  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.15);
  }
`

const DealImage = styled.div`
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
    background: rgba(0, 0, 0, 0.3);
  }
`

const FlashBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  left: ${({ theme }) => theme.spacing[2]};
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.textInverse};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
  animation: pulse 2s infinite;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    top: ${({ theme }) => theme.spacing[3]};
    left: ${({ theme }) => theme.spacing[3]};
    padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  }
`

const DiscountBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[3]};
  right: ${({ theme }) => theme.spacing[3]};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textInverse};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  z-index: 2;
` 

const DealContent = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
`

const DealTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const DealPrice = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`

const CurrentPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.secondary};
`

const OriginalPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  opacity: 0.7;
  text-decoration: line-through;
`

const CountdownContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`

const CountdownTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const ClockIcon = styled(FaClock)`
  color: ${({ theme }) => theme.colors.secondary};
`

const CountdownTimer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  justify-content: center;
`

const TimeUnit = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing[2]};
  min-width: 50px;
`

const TimeValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.secondary};
`

const TimeLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  opacity: 0.8;
  margin-top: ${({ theme }) => theme.spacing[1]};
`

const DealActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`

const ActionButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.textInverse};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[1]};
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }

  ${({ primary }) => primary && `
    background: ${({ theme }) => theme.colors.secondary};
    border-color: ${({ theme }) => theme.colors.secondary};

    &:hover {
      background: ${({ theme }) => theme.colors.secondaryDark};
    }
  `}
`

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  overflow: hidden;
`

const ProgressFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease;
`

const StockInfo = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  opacity: 0.8;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[3]}; 
`



// Mock flash deals data
const flashDeals = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    originalPrice: 199.99,
    currentPrice: 89.99,
    discount: 55,
    imageUrl: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    stockLeft: 15,
    totalStock: 50
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    originalPrice: 299.99,
    currentPrice: 149.99,
    discount: 50,
    imageUrl: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    stockLeft: 8,
    totalStock: 25
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    originalPrice: 129.99,
    currentPrice: 59.99,
    discount: 54,
    imageUrl: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    stockLeft: 22,
    totalStock: 40
  }
]

const formatTime = (time) => {
  const hours = Math.floor(time / (1000 * 60 * 60))
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((time % (1000 * 60)) / 1000)
  
  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  }
}

const FlashDeals = () => {
  const [countdown, setCountdown] = useState(2 * 60 * 60 * 1000) // 2 hours in milliseconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          return 2 * 60 * 60 * 1000 // Reset to 2 hours
        }
        return prev - 1000
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAddToCart = (deal) => {
    console.log('Adding to cart:', deal.name)
    // Add to cart functionality
  }

  const handleAddToWishlist = (deal) => {
    console.log('Adding to wishlist:', deal.name)
    // Add to wishlist functionality
  }

  const handleQuickView = (deal) => {
    console.log('Quick view:', deal.name)
    // Quick view functionality
  }

  const timeLeft = formatTime(countdown)

  return (
    <FlashDealsSection>
      <Container>
        <SectionHeader>
          <SectionTitle>
            <FireIcon />
            Flash Deals
          </SectionTitle>
          <SectionSubtitle>
            Limited time offers with massive discounts. Don't miss out on these incredible deals!
          </SectionSubtitle>
        </SectionHeader>

        <DealsGrid>
          {flashDeals.map((deal) => {
            const progress = ((deal.totalStock - deal.stockLeft) / deal.totalStock) * 100
            
            return (
              <DealCard key={deal.id}>
                <DealImage imageUrl={deal.imageUrl}>
                  <FlashBadge>Flash Sale</FlashBadge>
                  <DiscountBadge>-{deal.discount}%</DiscountBadge>
                </DealImage>

                <DealContent>
                  <DealTitle>{deal.name}</DealTitle>
                  
                  <DealPrice>
                    <CurrentPrice>{formatPrice(deal.currentPrice)}</CurrentPrice>
                    <OriginalPrice>{formatPrice(deal.originalPrice)}</OriginalPrice>
                  </DealPrice>

                  <CountdownContainer>
                    <CountdownTitle>
                      <ClockIcon />
                      Ends in:
                    </CountdownTitle>
                    <CountdownTimer>
                      <TimeUnit>
                        <TimeValue>{timeLeft.hours}</TimeValue>
                        <TimeLabel>Hours</TimeLabel>
                      </TimeUnit>
                      <TimeUnit>
                        <TimeValue>{timeLeft.minutes}</TimeValue>
                        <TimeLabel>Minutes</TimeLabel>
                      </TimeUnit>
                      <TimeUnit>
                        <TimeValue>{timeLeft.seconds}</TimeValue>
                        <TimeLabel>Seconds</TimeLabel>
                      </TimeUnit>
                    </CountdownTimer>
                  </CountdownContainer>

                  <ProgressBar>
                    <ProgressFill progress={progress} />
                  </ProgressBar>

                  <StockInfo>
                    Hurry! Only {deal.stockLeft} left in stock
                  </StockInfo>

                  <DealActions>
                    <ActionButton onClick={() => handleAddToWishlist(deal)}>
                      <FaHeart />
                      Wishlist
                    </ActionButton>
                    <ActionButton onClick={() => handleQuickView(deal)}>
                      <FaEye />
                      Quick View
                    </ActionButton>
                    <ActionButton primary onClick={() => handleAddToCart(deal)}>
                      <FaShoppingCart />
                      Buy Now
                    </ActionButton>
                  </DealActions>
                </DealContent>
              </DealCard>
            )
          })}
        </DealsGrid>
      </Container>

      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </FlashDealsSection>
  )
}

export default FlashDeals 