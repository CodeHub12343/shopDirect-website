import { useState } from 'react'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setSelectedImage } from '../../store/slices/productDetailsSlice'
import { getImageUrl } from '../../services/apiUtils'
import { FiZoomIn, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi'

const GalleryContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`

const MainImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.backgroundSecondary} 0%, ${({ theme }) => theme.colors.background} 100%);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 500px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 400px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 320px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    height: 260px;
  }
`

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all ${({ theme }) => theme.transitions.slow};
  cursor: zoom-in;
  
  &:hover {
    transform: scale(1.02);
  }
`

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.05) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.base};
  pointer-events: none;
  
  ${MainImageContainer}:hover & {
    opacity: 1;
  }
`

const ZoomButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  backdrop-filter: blur(10px);
  box-shadow: ${({ theme }) => theme.shadows.md};
  z-index: 10;
  
  &:hover {
    background: white;
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  svg {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  backdrop-filter: blur(10px);
  box-shadow: ${({ theme }) => theme.shadows.md};
  z-index: 10;
  
  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.05);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: translateY(-50%);
    
    &:hover {
      transform: translateY(-50%);
    }
  }
  
  &.prev {
    left: ${({ theme }) => theme.spacing.md};
  }
  
  &.next {
    right: ${({ theme }) => theme.spacing.md};
  }
  
  svg {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`

const ThumbnailContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.border.main} transparent;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.main};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.border.main};
  }
`

const ThumbnailWrapper = styled.div`
  flex-shrink: 0;
  position: relative;
`

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  border: 3px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.primary.main : 'transparent'};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  
  &:hover {
    transform: scale(1.05);
    border-color: ${({ theme, isActive }) => 
      isActive ? theme.colors.primary.main : theme.colors.border.main};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 50px;
    height: 50px;
  }
`

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.base};
  
  ${Thumbnail}:hover & {
    transform: scale(1.1);
  }
`

const ImageCounter = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  backdrop-filter: blur(10px);
`

const ProductImageGallery = ({ product }) => {
  const dispatch = useAppDispatch()
  const selectedImage = useAppSelector(state => state.productDetails.selectedImage)
  
  const images = product?.images || [product?.imageCover || '']
  const currentImage = images[selectedImage] || images[0]

  const handleImageSelect = (index) => {
    dispatch(setSelectedImage(index))
  }

  const handlePrevious = () => {
    const newIndex = selectedImage > 0 ? selectedImage - 1 : images.length - 1
    dispatch(setSelectedImage(newIndex))
  }

  const handleNext = () => {
    const newIndex = selectedImage < images.length - 1 ? selectedImage + 1 : 0
    dispatch(setSelectedImage(newIndex))
  }

  const handleZoom = () => {
    // TODO: Implement image zoom modal
    console.log('Zoom functionality to be implemented')
  }

  if (!product || !images.length) {
    return (
      <GalleryContainer>
        <MainImageContainer>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: '#9ca3af'
          }}>
            No images available
          </div>
        </MainImageContainer>
      </GalleryContainer>
    )
  }

  return (
    <GalleryContainer>
      <MainImageContainer>
        <MainImage 
          src={getImageUrl(currentImage)} 
          alt={product.name}
        />
        <ImageOverlay />
        
        <ZoomButton onClick={handleZoom}>
          <FiMaximize2 />
        </ZoomButton>
        
        {images.length > 1 && (
          <>
            <NavigationButton 
              className="prev" 
              onClick={handlePrevious}
              disabled={images.length <= 1}
            >
              <FiChevronLeft />
            </NavigationButton>
            
            <NavigationButton 
              className="next" 
              onClick={handleNext}
              disabled={images.length <= 1}
            >
              <FiChevronRight />
            </NavigationButton>
            
            <ImageCounter>
              {selectedImage + 1} / {images.length}
            </ImageCounter>
          </>
        )}
      </MainImageContainer>
      
      {images.length > 1 && (
        <ThumbnailContainer>
          {images.map((image, index) => (
            <ThumbnailWrapper key={index}>
              <Thumbnail 
                isActive={index === selectedImage}
                onClick={() => handleImageSelect(index)}
              >
                <ThumbnailImage 
                  src={getImageUrl(image)} 
                  alt={`${product.name} - Image ${index + 1}`}
                />
              </Thumbnail>
            </ThumbnailWrapper>
          ))}
        </ThumbnailContainer>
      )}
    </GalleryContainer>
  )
}

export default ProductImageGallery 