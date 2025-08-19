import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import ProductHeader from '../components/product/ProductHeader'
import ProductGrid from '../components/product/ProductGrid'
import SortTools from '../components/product/SortTools'
import Pagination from '../components/product/Pagination'
import QuickViewModal from '../components/product/QuickViewModal'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { getProducts } from '../services/apiProducts'
import { getCategories } from '../services/apiCategories'

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.backgroundSecondary} 100%);
`

const ProductPageContainer = styled.div`
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
  display: flex;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.spacing.xl};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const SidebarWrapper = styled.div`
  width: 320px;
  flex-shrink: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 280px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`

const ContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

const CategorySidebar = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  height: fit-content;
  position: sticky;
  top: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: static;
    top: auto;
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const SidebarTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.sm};
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.secondary});
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const CategoryItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme, isActive }) => 
    isActive 
      ? `linear-gradient(135deg, ${theme.colors.primary.main} 0%, ${theme.colors.primary.dark} 100%)`
      : 'transparent'};
  color: ${({ theme, isActive }) => 
    isActive ? 'white' : theme.colors.text.primary};
  border: 2px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.primary.main : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme, isActive }) => 
    isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme, isActive }) => 
    isActive ? theme.shadows.md : 'none'};
  
  &:hover {
    background: ${({ theme, isActive }) => 
      isActive 
        ? `linear-gradient(135deg, ${theme.colors.primary.dark} 0%, ${theme.colors.primary.main} 100%)`
        : theme.colors.backgroundSecondary};
    border-color: ${({ theme, isActive }) => 
      isActive ? theme.colors.primary.dark : theme.colors.primary.main};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  &:active {
    transform: translateY(-1px);
  }
`

const CategoryName = styled.span`
  flex: 1;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const CategoryCount = styled.span`
  background: ${({ theme, isActive }) => 
    isActive 
      ? 'rgba(255, 255, 255, 0.2)' 
      : `linear-gradient(135deg, ${theme.colors.backgroundSecondary} 0%, ${theme.colors.background} 100%)`};
  color: ${({ theme, isActive }) => 
    isActive ? 'white' : theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  min-width: 28px;
  text-align: center;
  box-shadow: ${({ theme, isActive }) => 
    isActive ? 'none' : theme.shadows.sm};
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  
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

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showQuickView, setShowQuickView] = useState(false)
  const [viewMode, setViewMode] = useState('grid')

  // Get URL parameters
  const categoryId = searchParams.get('category') || 'all'
  const page = parseInt(searchParams.get('page')) || 1
  const sort = searchParams.get('sort') || 'newest'

  // Build query parameters
  const queryParams = {
    page,
    limit: 12,
    sort,
    ...(categoryId !== 'all' && { category: categoryId }),
  }

  // Fetch products with live API
  const { data: productsResponse, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => getProducts(queryParams),
    keepPreviousData: true,
    retry: 1,
  })

  // Fetch categories with live API
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    retry: 1,
  })

  // Handle loading state
  if (productsLoading || categoriesLoading) {
    return (
      <PageContainer>
        <ProductPageContainer>
          <LoadingContainer>
            <LoadingSpinner 
              variant="ripple" 
              size="large" 
              text="Loading products..." 
              minHeight="50vh"
            />
          </LoadingContainer>
        </ProductPageContainer>
      </PageContainer>
    )
  }

  // Handle error state
  if (productsError || categoriesError) {
    return (
      <PageContainer>
        <ProductPageContainer>
          <ErrorContainer>
            <h2>Error loading products</h2>
            <p>Please try again later.</p>
          </ErrorContainer>
        </ProductPageContainer>
      </PageContainer>
    )
  }

  // Extract products and pagination info from backend response
  const productsArray = productsResponse?.products || []
  const categoriesArray = Array.isArray(categories) ? categories : []

  // Fallback categories if API fails
  const fallbackCategories = [
    { _id: "1", name: "Electronics" },
    { _id: "2", name: "Home & Kitchen Appliances" },
    { _id: "3", name: "Books & Reading Devices" },
    { _id: "4", name: "Fashion & Apparel" },
    { _id: "5", name: "TVs & Home Entertainment" }
  ]
  
  const finalCategories = categoriesArray.length > 0 ? categoriesArray : fallbackCategories

  // Find the current category object
  const currentCategoryObj = finalCategories.find(cat => cat._id === categoryId) || null
  const currentCategoryName = currentCategoryObj?.name || 'All Products'

  // For backend pagination, we need to get total count from the response
  // If the backend returns pagination info, use it; otherwise calculate from products length
  const totalProducts = productsResponse?.total || productsArray.length
  const totalPages = Math.ceil(totalProducts / 12)

  // Calculate category counts for display
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return totalProducts
    return productsArray.filter(product => 
      product.category?._id === categoryId || product.category?.id === categoryId
    ).length
  }

  // Update URL parameters
  const updateFilters = (newFilters) => {
    const params = new URLSearchParams(searchParams)
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        params.delete(key)
      } else {
        params.set(key, value.toString())
      }
    })
    
    // Reset to page 1 when filters change
    if (newFilters.page === undefined) {
      params.set('page', '1')
    }
    
    setSearchParams(params)
  }

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    const newCategory = categoryId === 'all' ? 'all' : categoryId
    updateFilters({ category: newCategory })
  }

  // Handle quick view
  const handleQuickView = (product) => {
    setSelectedProduct(product)
    setShowQuickView(true)
  }

  return (
    <PageContainer>
      <ProductPageContainer>
        <ProductHeader 
          category={currentCategoryName}
          totalProducts={totalProducts}
          categories={finalCategories}
        />
        
        <MainContent>
          <SidebarWrapper>
            <CategorySidebar>
              <SidebarTitle>Categories</SidebarTitle>
              <CategoryList>
                <CategoryItem
                  isActive={categoryId === 'all'}
                  onClick={() => handleCategorySelect('all')}
                >
                  <CategoryName>All Products</CategoryName>
                  <CategoryCount isActive={categoryId === 'all'}>
                    {totalProducts}
                  </CategoryCount>
                </CategoryItem>
                
                {finalCategories.map((cat) => (
                  <CategoryItem
                    key={cat._id}
                    isActive={categoryId === cat._id}
                    onClick={() => handleCategorySelect(cat._id)}
                  >
                    <CategoryName>{cat.name}</CategoryName>
                    <CategoryCount isActive={categoryId === cat._id}>
                      {getCategoryCount(cat._id)}
                    </CategoryCount>
                  </CategoryItem>
                ))}
              </CategoryList>
            </CategorySidebar>
          </SidebarWrapper>
          
          <ContentWrapper>
            <SortTools
              sort={sort}
              totalProducts={totalProducts}
              onSortChange={(newSort) => updateFilters({ sort: newSort })}
              viewMode={viewMode}
              onViewChange={setViewMode}
            />
            
            <ProductGrid
              products={productsArray}
              isLoading={productsLoading}
              onQuickView={handleQuickView}
              viewMode={viewMode}
            />
            
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => updateFilters({ page: newPage })}
              totalProducts={totalProducts}
            />
          </ContentWrapper>
        </MainContent>
        
        {showQuickView && selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            onClose={() => {
              setShowQuickView(false)
              setSelectedProduct(null)
            }}
          />
        )}
      </ProductPageContainer>
    </PageContainer>
  )
}

export default ProductPage 