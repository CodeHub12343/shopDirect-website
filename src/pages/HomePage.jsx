import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import HeroBanner from '../components/home/HeroBanner'
import FeaturedCategories from '../components/home/FeaturedCategories'
import PromotionalBlocks from '../components/home/PromotionalBlocks'
import FeaturedProducts from '../components/home/FeaturedProducts'
import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
import FlashDeals from '../components/home/FlashDeals'
import Testimonials from '../components/home/Testimonials'
import NewsletterSignup from '../components/home/NewsletterSignup'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { getProducts } from '../services/apiProducts'
import { getCategories } from '../services/apiCategories'

const HomePageContainer = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gradients.warm};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 80%, ${({ theme }) => theme.colors.secondary}10 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${({ theme }) => theme.colors.accent.coral}08 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, ${({ theme }) => theme.colors.accent.teal}05 0%, transparent 50%);
    pointer-events: none;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  
  h2 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  button {
    background: ${({ theme }) => theme.colors.gradients.primary};
    color: ${({ theme }) => theme.colors.text.inverse};
    border: none;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.base};
    box-shadow: ${({ theme }) => theme.shadows.primary};
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: ${({ theme }) => theme.shadows.lg};
    }
  }
`

const DebugSection = styled.div`
  background: ${({ theme }) => theme.colors.gray[100]};
  padding: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.primary};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`

const HomePage = () => {
  // Fetch products for different sections
  const { data: productsResponse, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })

  // Handle loading state
  if (productsLoading || categoriesLoading) {
    return (
      <HomePageContainer>
        <LoadingContainer>
          <LoadingSpinner 
            variant="ripple" 
            size="large" 
            text="Loading amazing products..." 
            minHeight="50vh"
          />
        </LoadingContainer>
      </HomePageContainer>
    )
  }

  // Handle error state
  if (productsError || categoriesError) {
    return (
      <HomePageContainer>
        <ErrorContainer>
          <h2>Error loading products</h2>
          <p>We're having trouble loading our amazing products. Please try again later.</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </ErrorContainer>
      </HomePageContainer>
    )
  }

  // Extract different product sets for different sections
  const productsArray = productsResponse?.products || []
  const categoriesArray = Array.isArray(categories) ? categories : []

  // Ensure we have enough products for all sections
  const allProducts = productsArray.length > 0 ? productsArray : []

  const featuredProducts = allProducts.slice(0, 8)

  // New Arrivals: sort by createdAt desc
  const newArrivals = [...allProducts]
    .sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0))
    .slice(0, 6)

  // Best Sellers: sort by ratingsQuantity desc
  const bestSellers = [...allProducts]
    .sort((a, b) => (b?.ratingsQuantity || 0) - (a?.ratingsQuantity || 0))
    .slice(0, 6)

  console.log('HomePage - Products Response:', productsResponse)
  console.log('HomePage - Products Array:', productsArray)
  console.log('HomePage - Categories:', categories)
  console.log('HomePage - Featured Products:', featuredProducts)
  console.log('HomePage - New Arrivals:', newArrivals)
  console.log('HomePage - Best Sellers:', bestSellers)

  return (
    <HomePageContainer>
      <HeroBanner />
      <FeaturedCategories categories={categoriesArray} />
      <PromotionalBlocks />
      <FeaturedProducts products={featuredProducts} />
      <NewArrivals products={newArrivals} />
      <BestSellers products={bestSellers} />
      <FlashDeals />
      <Testimonials />
      <NewsletterSignup />
    </HomePageContainer> 
  )
}

export default HomePage  