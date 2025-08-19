import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FiChevronRight, FiHome } from 'react-icons/fi'

const BreadcrumbContainer = styled.nav`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
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

const Breadcrumb = ({ product }) => {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: product?.category?.name || 'Category', path: `/products?category=${product?.category?.name || ''}` },
    { name: product?.name || 'Product', path: '#' }
  ]

  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem key={index}>
            {index === breadcrumbs.length - 1 ? (
              <BreadcrumbCurrent>{crumb.name}</BreadcrumbCurrent>
            ) : (
              <BreadcrumbLink to={crumb.path}>
                {crumb.name === 'Home' && <FiHome size={16} />}
                {crumb.name}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbContainer>
  )
}

export default Breadcrumb 