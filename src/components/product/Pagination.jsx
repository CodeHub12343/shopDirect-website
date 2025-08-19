import styled from 'styled-components'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg} 0;
`

const PaginationContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const PageButton = styled.button`
  min-width: 40px;
  height: 40px;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.primary.main : theme.colors.border.light};
  background-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary.main : 'white'};
  color: ${({ theme, isActive }) => 
    isActive ? 'white' : theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ isActive }) => isActive ? '600' : '500'};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme, isActive }) => 
      isActive ? theme.colors.primary.dark : theme.colors.background.light};
    border-color: ${({ theme, isActive }) => 
      isActive ? theme.colors.primary.dark : theme.colors.primary.main};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-width: 36px;
    height: 36px;
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }
`

const NavigationButton = styled(PageButton)`
  color: ${({ theme }) => theme.colors.text.secondary};
  
  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`

const Ellipsis = styled.span`
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }
`

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
`

const LoadMoreButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-1px);
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.border.light};
    color: ${({ theme }) => theme.colors.text.secondary};
    cursor: not-allowed;
    transform: none;
  }
`

const PaginationInfo = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalProducts, 
  productsPerPage = 12,
  showLoadMore = false,
  onLoadMore,
  isLoading = false 
}) => {
  const getVisiblePages = () => {
    const delta = 2 // Number of pages to show on each side of current page
    const range = []
    const rangeWithDots = []
    
    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i)
    }
    
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }
    
    rangeWithDots.push(...range)
    
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }
    
    return rangeWithDots
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  const startItem = (currentPage - 1) * productsPerPage + 1
  const endItem = Math.min(currentPage * productsPerPage, totalProducts)

  if (totalPages <= 1) {
    return null
  }

  if (showLoadMore) {
    return (
      <>
        <LoadMoreContainer>
          <LoadMoreButton
            onClick={onLoadMore}
            disabled={isLoading || currentPage >= totalPages}
          >
            {isLoading ? 'Loading...' : 'Load More Products'}
          </LoadMoreButton>
        </LoadMoreContainer>
        <PaginationInfo>
          Showing {startItem}-{endItem} of {totalProducts} products
        </PaginationInfo>
      </>
    )
  }

  const visiblePages = getVisiblePages()

  return (
    <>
      <PaginationContainer>
        <PaginationContent>
          <NavigationButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title="Previous page"
          >
            <FiChevronLeft size={16} />
          </NavigationButton>
          
          {visiblePages.map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <Ellipsis>...</Ellipsis>
              ) : (
                <PageButton
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PageButton>
              )}
            </div>
          ))}
          
          <NavigationButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Next page"
          >
            <FiChevronRight size={16} />
          </NavigationButton>
        </PaginationContent>
      </PaginationContainer>
      
      <PaginationInfo>
        Showing {startItem}-{endItem} of {totalProducts} products
      </PaginationInfo>
    </>
  )
}

export default Pagination 