import { useState } from 'react'
import styled from 'styled-components'
import LoadingSpinner, { ButtonLoadingSpinner } from '../components/common/LoadingSpinner'

const ShowcaseContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`

const ShowcaseHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  h1 {
    font-size: ${({ theme }) => theme.typography.sizes['4xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.primary.dark});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    color: ${({ theme }) => theme.colors.text.secondary};
    max-width: 600px;
    margin: 0 auto;
  }
`

const SpinnerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const SpinnerCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

const SpinnerTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const SpinnerDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const SpinnerDemo = styled.div`
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const SizeSelector = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const SizeButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ active, theme }) => active ? theme.colors.primary.main : 'white'};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.primary.dark : theme.colors.gray[50]};
  }
`

const ButtonShowcase = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const DemoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`

const FullPageDemo = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`

const FullPageButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.primary.dark});
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

const LoadingSpinnerShowcase = () => {
  const [selectedSizes, setSelectedSizes] = useState({
    cube: 'medium',
    pulse: 'medium',
    bounce: 'medium',
    wave: 'medium',
    ripple: 'medium',
    orbit: 'medium',
    morph: 'medium'
  })
  
  const [loadingButtons, setLoadingButtons] = useState({
    button1: false,
    button2: false,
    button3: false
  })
  
  const [showFullPage, setShowFullPage] = useState(false)

  const spinnerVariants = [
    {
      name: 'Cube',
      variant: 'cube',
      description: '3D rotating cube with gradient faces and shadow effects'
    },
    {
      name: 'Pulse',
      variant: 'pulse',
      description: '3D pulsing sphere with rotation and glow effects'
    },
    {
      name: 'Bounce',
      variant: 'bounce',
      description: '3D bouncing sphere with depth and shadow effects'
    },
    {
      name: 'Wave',
      variant: 'wave',
      description: 'Animated wave bars with staggered timing'
    },
    {
      name: 'Ripple',
      variant: 'ripple',
      description: 'Expanding ripple circles with fade effects'
    },
    {
      name: 'Orbit',
      variant: 'orbit',
      description: 'Orbiting particle with smooth circular motion'
    },
    {
      name: 'Morph',
      variant: 'morph',
      description: 'Morphing shape with rotation and scaling'
    }
  ]

  const handleSizeChange = (variant, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [variant]: size
    }))
  }

  const handleButtonClick = (buttonId) => {
    setLoadingButtons(prev => ({ ...prev, [buttonId]: true }))
    setTimeout(() => {
      setLoadingButtons(prev => ({ ...prev, [buttonId]: false }))
    }, 3000)
  }

  const handleFullPageDemo = () => {
    setShowFullPage(true)
    setTimeout(() => {
      setShowFullPage(false)
    }, 3000)
  }

  if (showFullPage) {
    return (
      <LoadingSpinner 
        variant="cube" 
        size="large" 
        text="Loading full page demo..." 
        fullPage={true}
      />
    )
  }

  return (
    <ShowcaseContainer>
      <ShowcaseHeader>
        <h1>Loading Spinner Showcase</h1>
        <p>
          Explore our collection of beautiful 3D loading spinners with modern effects. 
          Each spinner is optimized for different use cases and includes smooth animations.
        </p>
      </ShowcaseHeader>

      <SpinnerGrid>
        {spinnerVariants.map(({ name, variant, description }) => (
          <SpinnerCard key={variant}>
            <SpinnerTitle>{name} Spinner</SpinnerTitle>
            <SpinnerDescription>{description}</SpinnerDescription>
            
            <SpinnerDemo>
              <LoadingSpinner 
                variant={variant} 
                size={selectedSizes[variant]}
                text=""
              />
            </SpinnerDemo>
            
            <SizeSelector>
              {['small', 'medium', 'large'].map(size => (
                <SizeButton
                  key={size}
                  active={selectedSizes[variant] === size}
                  onClick={() => handleSizeChange(variant, size)}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </SizeButton>
              ))}
            </SizeSelector>
          </SpinnerCard>
        ))}
      </SpinnerGrid>

      <ButtonShowcase>
        <SpinnerTitle>Button Loading Spinners</SpinnerTitle>
        <SpinnerDescription>
          Compact spinners designed specifically for buttons and small UI elements
        </SpinnerDescription>
        
        <ButtonGrid>
          <DemoButton
            onClick={() => handleButtonClick('button1')}
            disabled={loadingButtons.button1}
          >
            {loadingButtons.button1 && <ButtonLoadingSpinner />}
            {loadingButtons.button1 ? 'Processing...' : 'Save Changes'}
          </DemoButton>
          
          <DemoButton
            onClick={() => handleButtonClick('button2')}
            disabled={loadingButtons.button2}
          >
            {loadingButtons.button2 && <ButtonLoadingSpinner />}
            {loadingButtons.button2 ? 'Uploading...' : 'Upload File'}
          </DemoButton>
          
          <DemoButton
            onClick={() => handleButtonClick('button3')}
            disabled={loadingButtons.button3}
          >
            {loadingButtons.button3 && <ButtonLoadingSpinner />}
            {loadingButtons.button3 ? 'Sending...' : 'Send Message'}
          </DemoButton>
        </ButtonGrid>
      </ButtonShowcase>

      <FullPageDemo>
        <SpinnerTitle>Full Page Loading Demo</SpinnerTitle>
        <SpinnerDescription>
          Experience a full-page loading overlay with backdrop blur effect
        </SpinnerDescription>
        
        <FullPageButton onClick={handleFullPageDemo}>
          Try Full Page Loading
        </FullPageButton>
      </FullPageDemo>
    </ShowcaseContainer>
  )
}

export default LoadingSpinnerShowcase 