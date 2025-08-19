import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause, FaArrowRight, FaStar, FaShoppingCart } from 'react-icons/fa'

// 3D Animation Keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate3d(0, 1, 0, 0deg); }
  50% { transform: translateY(-20px) rotate3d(0, 1, 0, 5deg); }
`

// Removed unused slideInLeft and slideInRight animations

const fadeInUp = keyframes`
  from { transform: translateY(30px) scale(0.9); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
`

// Removed unused pulse animation

const rotate3D = keyframes`
  from { transform: rotate3d(1, 1, 0, 0deg); }
  to { transform: rotate3d(1, 1, 0, 360deg); }
`

const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  min-height: 700px;
  overflow: hidden;
  background: linear-gradient(135deg,rgb(33, 34, 41) 0%,rgb(40, 37, 43) 50%,rgb(44, 37, 45) 100%);
  perspective: 1000px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(33, 33, 39, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(32, 27, 30, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(50, 55, 57, 0.2) 0%, transparent 50%);
    animation: ${rotate3D} 20s linear infinite;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 80vh;
    min-height: 600px;
  }
`

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`

const FloatingShape = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  
  &:nth-child(1) {
    width: 80px;
    height: 80px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    width: 120px;
    height: 120px;
    top: 60%;
    right: 15%;
    animation-delay: 2s;
  }
  
  &:nth-child(3) {
    width: 60px;
    height: 60px;
    bottom: 30%;
    left: 20%;
    animation-delay: 4s;
  }
`

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
`

const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
    background: ${({ backgroundImage }) => 
        backgroundImage 
        ? `linear-gradient(135deg, rgba(53, 55, 62, 0.8) 0%, rgba(37, 34, 40, 0.8) 50%, rgba(45, 39, 46, 0.8) 100%), url(${backgroundImage})`
        : 'linear-gradient(135deg,rgb(33, 34, 38) 0%,rgb(36, 33, 38) 50%,rgb(48, 44, 48) 100%)'
    };
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform: ${({ active }) => active ? 'scale(1)' : 'scale(1.1)'};
`

const SlideContent = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textInverse};
  max-width: 800px;
  padding: ${({ theme }) => theme.spacing.xl};
  z-index: 3;
  
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const SlideTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0, #fff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
`

const SlideSubtitle = styled.p`
  font-size: 16px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  opacity: 0.95;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  color: ${({ theme }) => (theme.colors?.gray?.[200] || '#e5e7eb')};
`

const SlideButton = styled.button`
   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: ${({ theme }) => theme.colors.textInverse};
  border: none;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(100, 100, 100, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.sizes.base};
  }
`

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15);
  color: ${({ theme }) => theme.colors.textInverse};
  border: none;
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 4;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  ${({ direction }) => direction === 'left' ? 'left: 30px;' : 'right: 30px;'}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 50px;
    height: 50px;
    font-size: ${({ theme }) => theme.typography.sizes.base};
    ${({ direction }) => direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
  }
`

const DotsContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  z-index: 4;
`

const Dot = styled.button`
  width: 16px;
  height: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: ${({ active }) => 
    active ? 'rgba(255, 255, 255, 0.9)' : 'transparent'
  };
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transition: all 0.3s ease;
    transform: translate(-50%, -50%);
  }

  &:hover {
    transform: scale(1.2);
    border-color: rgba(255, 255, 255, 0.8);
    
    &::before {
      width: 100%;
      height: 100%;
    }
  }
`

const PlayPauseButton = styled.button`
  position: absolute;
  top: 40px;
  right: 40px;
  background: rgba(255, 255, 255, 0.15);
  color: ${({ theme }) => theme.colors.textInverse};
  border: none;
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 4;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    top: 30px;
    right: 30px;
    width: 45px;
    height: 45px;
  }
`

const StatsContainer = styled.div`
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  z-index: 4;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const StatItem = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textInverse};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeInUp} 1s ease-out 0.5s both;
`

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  opacity: 0.9;
`

const slides = [
  {
    id: 1,
    title: "Discover Amazing Products",
    subtitle: "Explore our curated collection of premium products with cutting-edge technology and innovative design",
    buttonText: "Shop Now",
    /* backgroundImage: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=2070&h=800&fit=crop"
  }, */
  backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"},
  {
    id: 2,
    title: "Flash Deals - Up to 70% Off",
    subtitle: "Limited time offers on trending products. Don't miss out on incredible savings!",
    buttonText: "View Deals",
   /*  backgroundImage: "https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?auto=compress&cs=tinysrgb&w=2070&h=800&fit=crop" */
   backgroundImage: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"

  },
  {
    id: 3,
    title: "Free Shipping Across the Globe",
    subtitle: "Shop with confidence knowing your order will be delivered fast and free to your doorstep",
    buttonText: "Start Shopping",
    /* backgroundImage: "https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?auto=compress&cs=tinysrgb&w=2070&h=800&fit=crop" */
     backgroundImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
]

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 6000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <HeroContainer>
      <FloatingElements>
        <FloatingShape />
        <FloatingShape />
        <FloatingShape />
      </FloatingElements>
      
      <SlideContainer>
        {slides.map((slide, index) => (
          <Slide
            key={slide.id}
            active={index === currentSlide}
            backgroundImage={slide.backgroundImage}
          >
            <SlideContent>
              <SlideTitle>{slide.title}</SlideTitle>
              <SlideSubtitle>{slide.subtitle}</SlideSubtitle>
              <SlideButton>
                {slide.buttonText}
                <FaArrowRight style={{ marginLeft: '8px' }} />
              </SlideButton>
            </SlideContent>
          </Slide>
        ))}
      </SlideContainer>

      <NavigationButton direction="left" onClick={prevSlide}>
        <FaChevronLeft />
      </NavigationButton>

      <NavigationButton direction="right" onClick={nextSlide}>
        <FaChevronRight />
      </NavigationButton>

      <PlayPauseButton onClick={togglePlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </PlayPauseButton>
{/* 
      <StatsContainer>
        <StatItem>
          <StatNumber>50K+</StatNumber>
          <StatLabel>Happy Customers</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>1000+</StatNumber>
          <StatLabel>Products</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>24/7</StatNumber>
          <StatLabel>Support</StatLabel>
        </StatItem>
      </StatsContainer> */}

      <DotsContainer>
        {slides.map((_, index) => (
          <Dot
            key={index}
            active={index === currentSlide}
            onClick={() => goToSlide(index)}
          />
        ))}
      </DotsContainer>
    </HeroContainer>
  )
}

export default HeroBanner 