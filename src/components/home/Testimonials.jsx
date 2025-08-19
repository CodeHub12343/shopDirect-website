import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaChevronLeft, FaChevronRight, FaStar, FaQuoteLeft } from 'react-icons/fa'

const TestimonialsSection = styled.section`
  padding: ${({ theme }) => theme.spacing[16]} 0;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
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
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({ translateX }) => translateX}px);
  gap: ${({ theme }) => theme.spacing[6]};
`

const TestimonialCard = styled.div`
  min-width: 350px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: relative;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

const QuoteIcon = styled(FaQuoteLeft)`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  left: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  opacity: 0.3;
`

const TestimonialContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`

const TestimonialText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  font-style: italic;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`

const CustomerAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ imageUrl }) => 
    imageUrl 
      ? `url(${imageUrl})`
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-shrink: 0;
`

const CustomerDetails = styled.div`
  flex: 1;
`

const CustomerName = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`

const CustomerLocation = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textTertiary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`

const Rating = styled.div`
  display: flex;
  gap: 2px;
`

const Star = styled(FaStar)`
  color: ${({ filled, theme }) => 
    filled ? theme.colors.secondary : theme.colors.gray300
  };
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 40px;
  height: 40px;
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
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ direction }) => direction === 'left' ? 'left: -20px;' : 'right: -20px;'}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
`

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  background: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.gray300
  };
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: scale(1.2);
  }
`

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-top: ${({ theme }) => theme.spacing[8]};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing[4]};
  }
`

const TrustBadge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textSecondary};
`

const BadgeIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.colors.primary};
`

const BadgeText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
`

const testimonials = [
  {
    id: 1,
    text: "Amazing shopping experience! The products are high quality and the delivery was super fast. I love how easy it is to find what I'm looking for.",
    customerName: "Sarah Johnson",
    location: "New York, NY",
    rating: 5,
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
  },
  {
    id: 2,
    text: "Best prices I've found online! The customer service is exceptional and they really care about their customers. Highly recommended!",
    customerName: "Michael Chen",
    location: "Los Angeles, CA",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
  },
  {
    id: 3,
    text: "I've been shopping here for months and never been disappointed. The return policy is fair and the product quality is consistently excellent.",
    customerName: "Emily Rodriguez",
    location: "Chicago, IL",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
  },
  {
    id: 4,
    text: "Fast shipping and great deals! I found exactly what I was looking for at a fraction of the price I would have paid elsewhere.",
    customerName: "David Thompson",
    location: "Houston, TX",
    rating: 5,
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
  },
  {
    id: 5,
    text: "The product selection is incredible and the prices are unbeatable. I've saved hundreds of dollars shopping here!",
    customerName: "Lisa Wang",
    location: "San Francisco, CA",
    rating: 5,
    avatar: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
  },
  {
    id: 6,
    text: "Outstanding customer service! When I had an issue with my order, they resolved it immediately and went above and beyond.",
    customerName: "James Wilson",
    location: "Miami, FL",
    rating: 5,
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
  }
]

const trustBadges = [
  { icon: "⭐", text: "4.9/5 Rating" },
  { icon: "🚚", text: "Free Shipping" },
  { icon: "🔒", text: "Secure Payment" },
  { icon: "🔄", text: "Easy Returns" },
  { icon: "💬", text: "24/7 Support" }
]

const renderStars = (rating) => {
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star key={i} filled={i < rating} />
    )
  }
  return stars
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardWidth = 350 + 24 // card width + gap
  const maxIndex = Math.max(0, testimonials.length - 3) // Show 3 cards at a time

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [maxIndex])

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <TestimonialsSection>
      <Container>
        <SectionHeader>
          <SectionTitle>What Our Customers Say</SectionTitle>
          <SectionSubtitle>
            Don't just take our word for it. Here's what our satisfied customers have to say about their shopping experience.
          </SectionSubtitle>
        </SectionHeader>

        <CarouselContainer>
          <CarouselTrack translateX={-currentIndex * cardWidth}>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id}>
                <QuoteIcon />
                <TestimonialContent>
                  <TestimonialText>"{testimonial.text}"</TestimonialText>
                </TestimonialContent>
                
                <CustomerInfo>
                  <CustomerAvatar imageUrl={testimonial.avatar} />
                  <CustomerDetails>
                    <CustomerName>{testimonial.customerName}</CustomerName>
                    <CustomerLocation>{testimonial.location}</CustomerLocation>
                    <Rating>
                      {renderStars(testimonial.rating)}
                    </Rating>
                  </CustomerDetails>
                </CustomerInfo>
              </TestimonialCard>
            ))}
          </CarouselTrack>

          <NavigationButton 
            direction="left" 
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <FaChevronLeft />
          </NavigationButton>

          <NavigationButton 
            direction="right" 
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
          >
            <FaChevronRight />
          </NavigationButton>
        </CarouselContainer>

        <DotsContainer>
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <Dot
              key={index}
              active={index === currentIndex}
              onClick={() => goToSlide(index)}
            />
          ))}
        </DotsContainer>

        <TrustBadges>
          {trustBadges.map((badge, index) => (
            <TrustBadge key={index}>
              <BadgeIcon>{badge.icon}</BadgeIcon>
              <BadgeText>{badge.text}</BadgeText>
            </TrustBadge>
          ))}
        </TrustBadges>
      </Container>
    </TestimonialsSection>
  )
}

export default Testimonials 