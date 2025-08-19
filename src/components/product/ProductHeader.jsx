import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FiChevronRight, FiHome } from 'react-icons/fi'

const HeaderContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`

const HeaderContent = styled.div`
  width: 100%;
`

const BreadcrumbContainer = styled.nav`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  
  &:not(:last-child)::after {
    content: '';
    margin: 0 ${({ theme }) => theme.spacing.sm};
    width: 6px;
    height: 6px;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main} 0%, ${({ theme }) => theme.colors.secondary} 100%);
    border-radius: 50%;
    opacity: 0.6;
  }
`

const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  transition: all ${({ theme }) => theme.transitions.base};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    transform: translateY(-1px);
  }
  
  svg {
    transition: transform ${({ theme }) => theme.transitions.base};
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
`

const BreadcrumbCurrent = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const TitleContainer = styled.div`
  flex: 1;
`

const CategoryTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.sm};
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.secondary});
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  }
`

const ItemCount = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.backgroundSecondary} 0%, ${({ theme }) => theme.colors.background} 100%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.base};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  }
`

const CategoryDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  max-width: 600px;
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.backgroundSecondary} 0%, ${({ theme }) => theme.colors.background} 100%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.base};
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const ProductHeader = ({ category, totalProducts, categories }) => {
  // Ensure categories is an array before using find
  const categoriesArray = Array.isArray(categories) ? categories : []
  
  // Find current category by name (since we're filtering by category name in ProductPage)
  const currentCategory = categoriesArray.find(cat => cat.name === category)
  
  // Build breadcrumb path
  const getBreadcrumbPath = () => {
    const breadcrumbs = [
      { name: 'Home', path: '/' }
    ]
    
    if (category && category !== 'all' && currentCategory) {
      breadcrumbs.push({
        name: currentCategory.name,
        path: `/products?category=${category}`
      })
    }
    
    return breadcrumbs
  }
  
  const breadcrumbs = getBreadcrumbPath()
  const categoryName = currentCategory?.name || 'All Products'
  const categoryDescription = currentCategory?.description || ''

  return (
    <HeaderContainer>
      <HeaderContent>
       
        
        <TitleSection>
          <TitleContainer>
            <CategoryTitle>{categoryName}</CategoryTitle>
            <ItemCount>
              Showing {totalProducts} {totalProducts === 1 ? 'product' : 'products'}
            </ItemCount>
          </TitleContainer>
        </TitleSection>
        
        {categoryDescription && (
          <CategoryDescription>
            {categoryDescription}
          </CategoryDescription>
        )}
      </HeaderContent>
    </HeaderContainer>
  )
}

export default ProductHeader 