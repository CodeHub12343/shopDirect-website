import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaGift, FaTruck, FaPercent, FaClock } from 'react-icons/fa'

const PromoSection = styled.section`
  padding: ${({ theme }) => theme.spacing[12]} 0;
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

const PromoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[6]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const PromoCard = styled.div`
  background: ${({ gradient }) => gradient};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.textInverse};
  position: relative;
  overflow: hidden;
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s ease-in-out;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`

const PromoIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  opacity: 0.9;
`

const PromoTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  line-height: 1.3;
`

const PromoDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  opacity: 0.9;
  line-height: 1.5;
`

const CountdownContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`

const CountdownIcon = styled(FaClock)`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  opacity: 0.8;
`

const CountdownText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  opacity: 0.9;
`

const PromoButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.textInverse};
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`

const Badge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  right: ${({ theme }) => theme.spacing[4]};
  background: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.textInverse};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
`

const promotionalOffers = [
  {
    id: 1,
    title: "Buy 1 Get 1 Free",
    description: "On selected fashion items. Limited time offer. Terms and conditions apply.",
    icon: FaGift,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    badge: "Limited Time",
    hasCountdown: true,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    buttonText: "Shop Now"
  },
  {
    id: 2,
    title: "Free Shipping",
    description: "On all orders over $50. No minimum purchase required for premium members.",
    icon: FaTruck,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    badge: "Always",
    hasCountdown: false,
    buttonText: "Learn More"
  },
  {
    id: 3,
    title: "Sign Up & Get 10% Off",
    description: "New customers get 10% off their first purchase. Join our community today!",
    icon: FaPercent,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    badge: "New Users",
    hasCountdown: false,
    buttonText: "Sign Up"
  }
]

const formatTime = (time) => {
  const hours = Math.floor(time / (1000 * 60 * 60))
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((time % (1000 * 60)) / 1000)
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const PromotionalBlocks = () => {
  const [countdown, setCountdown] = useState(24 * 60 * 60 * 1000) // 24 hours in milliseconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          return 24 * 60 * 60 * 1000 // Reset to 24 hours
        }
        return prev - 1000
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <PromoSection>
      <Container>
        <PromoGrid>
          {promotionalOffers.map((offer) => (
            <PromoCard key={offer.id} gradient={offer.gradient}>
              <Badge>{offer.badge}</Badge>
              
              <PromoIcon>
                <offer.icon />
              </PromoIcon>
              
              <PromoTitle>{offer.title}</PromoTitle>
              
              <PromoDescription>{offer.description}</PromoDescription>
              
              {offer.hasCountdown && (
                <CountdownContainer>
                  <CountdownIcon />
                  <CountdownText>
                    Ends in: {formatTime(countdown)}
                  </CountdownText>
                </CountdownContainer>
              )}
              
              <PromoButton>
                {offer.buttonText}
              </PromoButton>
            </PromoCard>
          ))}
        </PromoGrid>
      </Container>
    </PromoSection>
  )
}

export default PromotionalBlocks 