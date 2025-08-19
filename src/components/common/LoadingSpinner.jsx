import styled, { keyframes } from 'styled-components'

// 3D Animation Keyframes
const spin3D = keyframes`
  0% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
  }
`

const pulse3D = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.1) rotate(180deg);
    opacity: 0.7;
  }
`

const bounce3D = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 20px) scale(1.1);
  }
  70% {
    transform: translate3d(0, -15px, 10px) scale(1.05);
  }
  90% {
    transform: translate3d(0, -4px, 2px) scale(1.02);
  }
`

const wave = keyframes`
  0%, 60%, 100% {
    transform: translateY(0) scaleY(1);
  }
  30% {
    transform: translateY(-20px) scaleY(1.1);
  }
`

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`

const orbit = keyframes`
  0% {
    transform: rotate(0deg) translateX(20px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(20px) rotate(-360deg);
  }
`

const morph = keyframes`
  0%, 100% {
    border-radius: 50%;
    transform: rotate(0deg) scale(1);
  }
  25% {
    border-radius: 25%;
    transform: rotate(90deg) scale(1.1);
  }
  50% {
    border-radius: 50%;
    transform: rotate(180deg) scale(0.9);
  }
  75% {
    border-radius: 25%;
    transform: rotate(270deg) scale(1.05);
  }
`

// Container for all spinners
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ height }) => height || '100px'};
  perspective: 1000px;
`

// 3D Cube Spinner
const CubeSpinner = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  transform-style: preserve-3d;
  animation: ${spin3D} 2s linear infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.primary.dark});
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }

  &::before {
    transform: rotateX(90deg) translateZ(20px);
  }

  &::after {
    transform: rotateY(90deg) translateZ(20px);
  }
`

const CubeFace = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.primary.dark});
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  transform: ${({ transform }) => transform};
`

// 3D Pulse Spinner
const PulseSpinner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.primary.dark});
  animation: ${pulse3D} 1.5s ease-in-out infinite;
  box-shadow: 
    0 0 30px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
`

// 3D Bounce Spinner
const BounceSpinner = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.primary.dark});
  animation: ${bounce3D} 1.5s ease-in-out infinite;
  box-shadow: 
    0 0 25px rgba(0, 0, 0, 0.3),
    inset 0 0 15px rgba(255, 255, 255, 0.1);
`

// Wave Spinner
const WaveSpinner = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  height: 40px;

  & > div {
    width: 6px;
    height: 100%;
    background: linear-gradient(to top, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.primary.dark});
    border-radius: 3px;
    animation: ${wave} 1.2s ease-in-out infinite;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  & > div:nth-child(1) { animation-delay: 0s; }
  & > div:nth-child(2) { animation-delay: 0.1s; }
  & > div:nth-child(3) { animation-delay: 0.2s; }
  & > div:nth-child(4) { animation-delay: 0.3s; }
  & > div:nth-child(5) { animation-delay: 0.4s; }
`

// Ripple Spinner
const RippleSpinner = styled.div`
  position: relative;
  width: 60px;
  height: 60px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.main};
    transform: translate(-50%, -50%);
    animation: ${ripple} 1.5s linear infinite;
  }

  &::after {
    animation-delay: 0.5s;
  }
`

// Orbit Spinner
const OrbitSpinner = styled.div`
  position: relative;
  width: 60px;
  height: 60px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.main};
    transform: translate(-50%, -50%);
    animation: ${orbit} 1.5s linear infinite;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
`

// Morph Spinner
const MorphSpinner = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.primary.dark});
  animation: ${morph} 2s ease-in-out infinite;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
`

// Loading Text
const LoadingText = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

// Full Page Loading Overlay
const FullPageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
`

// Section Loading Container
const SectionLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: ${({ minHeight }) => minHeight || '200px'};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`

// Button Loading Spinner
const ButtonSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ${spin3D} 1s linear infinite;
  margin-right: ${({ theme }) => theme.spacing.sm};
`

const LoadingSpinner = ({ 
  variant = 'cube', 
  size = 'medium', 
  text = '', 
  fullPage = false,
  minHeight = '200px'
}) => {
  const sizeMap = {
    small: { container: '60px', spinner: '20px' },
    medium: { container: '100px', spinner: '40px' },
    large: { container: '150px', spinner: '60px' }
  }

  // Handle both string sizes (like "16px") and predefined sizes
  let currentSize;
  if (typeof size === 'string' && size.includes('px')) {
    // If size is a pixel value, use it directly
    currentSize = { container: size, spinner: size };
  } else {
    // Use predefined size map
    currentSize = sizeMap[size] || sizeMap.medium;
  }

  const renderSpinner = () => {
    switch (variant) {
      case 'cube':
        return (
          <CubeSpinner>
            <CubeFace transform="translateZ(20px)" />
            <CubeFace transform="rotateY(180deg) translateZ(20px)" />
            <CubeFace transform="rotateY(90deg) translateZ(20px)" />
            <CubeFace transform="rotateY(-90deg) translateZ(20px)" />
            <CubeFace transform="rotateX(90deg) translateZ(20px)" />
            <CubeFace transform="rotateX(-90deg) translateZ(20px)" />
          </CubeSpinner>
        )
      case 'pulse':
        return <PulseSpinner />
      case 'bounce':
        return <BounceSpinner />
      case 'wave':
        return (
          <WaveSpinner>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </WaveSpinner>
        )
      case 'ripple':
        return <RippleSpinner />
      case 'orbit':
        return <OrbitSpinner />
      case 'morph':
        return <MorphSpinner />
      default:
        return <CubeSpinner />
    }
  }

  if (fullPage) {
    return (
      <FullPageOverlay>
        {renderSpinner()}
        {text && <LoadingText>{text}</LoadingText>}
      </FullPageOverlay>
    )
  }

  return (
    <SectionLoadingContainer minHeight={minHeight}>
      <SpinnerContainer height={currentSize.container}>
        {renderSpinner()}
      </SpinnerContainer>
      {text && <LoadingText>{text}</LoadingText>}
    </SectionLoadingContainer>
  )
}

// Export button spinner separately for use in buttons
export const ButtonLoadingSpinner = () => <ButtonSpinner />

export default LoadingSpinner 