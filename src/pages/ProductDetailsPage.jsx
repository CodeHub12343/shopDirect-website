import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import ProductImageGallery from '../components/product-details/ProductImageGallery'
import ProductInfo from '../components/product-details/ProductInfo'
import ProductDescription from '../components/product-details/ProductDescription'
import ProductReviews from '../components/product-details/ProductReviews'
import RelatedProducts from '../components/product-details/RelatedProducts'
import Breadcrumb from '../components/product-details/Breadcrumb'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { getProduct } from '../services/apiProducts'

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.backgroundSecondary} 100%);
`

const ProductDetailsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing['2xl']} 0;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
    padding: ${({ theme }) => theme.spacing.lg};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.lg};
    margin: ${({ theme }) => theme.spacing.lg} 0;
  }
`

const ContentSection = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.sm};
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.secondary});
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  
  h2 {
    font-size: ${({ theme }) => theme.typography.sizes['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
`

const ProductDetailsPage = () => {
  const { id } = useParams()

  // Fetch product details with live API
  const { 
    data: product, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
    retry: 1,
  })

  // Handle loading state
  if (isLoading) {
    return (
      <PageContainer>
        <ProductDetailsContainer>
          <LoadingContainer>
            <LoadingSpinner 
              variant="pulse" 
              size="large" 
              text="Loading product details..." 
              minHeight="60vh"
            />
          </LoadingContainer>
        </ProductDetailsContainer>
      </PageContainer>
    )
  }

  // Handle error state
  if (error) {
    return (
      <PageContainer>
        <ProductDetailsContainer>
          <ErrorContainer>
            <h2>Error loading product</h2>
            <p>Please try again later.</p>
          </ErrorContainer>
        </ProductDetailsContainer>
      </PageContainer>
    )
  }

  // Handle product not found
  if (!product) {
    return (
      <PageContainer>
        <ProductDetailsContainer>
          <ErrorContainer>
            <h2>Product not found</h2>
            <p>The product you're looking for doesn't exist.</p>
          </ErrorContainer>
        </ProductDetailsContainer>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <ProductDetailsContainer>
        <Breadcrumb product={product} />
        
        <MainContent>
          <ProductImageGallery product={product} />
          <ProductInfo product={product} />
        </MainContent>
        
        <ContentSection>
          <SectionTitle>Product Description</SectionTitle>
          <ProductDescription product={product} />
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>Customer Reviews</SectionTitle>
          <ProductReviews product={product} />
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>You May Also Like</SectionTitle>
          <RelatedProducts product={product} />
        </ContentSection>
      </ProductDetailsContainer>
    </PageContainer>
  )
}

export default ProductDetailsPage 