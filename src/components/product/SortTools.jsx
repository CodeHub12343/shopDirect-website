import { useState } from 'react'
import styled from 'styled-components'
import { FiGrid, FiList, FiChevronDown } from 'react-icons/fi'

const SortToolsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    align-items: stretch;
  }
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: space-between;
  }
`

const ResultsCount = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }
`

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const SortLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
`

const SortSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: white;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right ${({ theme }) => theme.spacing.sm} center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: ${({ theme }) => theme.spacing.xl};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.xs};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  }
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ViewToggleContainer = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
`

const ViewToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary.main : 'white'};
  color: ${({ theme, isActive }) => 
    isActive ? 'white' : theme.colors.text.secondary};
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme, isActive }) => 
      isActive ? theme.colors.primary.dark : theme.colors.background.light};
  }
  
  &:first-child {
    border-right: 1px solid ${({ theme }) => theme.colors.border.light};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 36px;
    height: 36px;
  }
`

const SortTools = ({ sort, totalProducts, onSortChange, viewMode = 'grid', onViewChange }) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'discount', label: 'Discount %' },
  ]

  return (
    <SortToolsContainer>
      <LeftSection>
        <ResultsCount>
          Showing {totalProducts} {totalProducts === 1 ? 'product' : 'products'}
        </ResultsCount>
        
        <SortContainer>
          <SortLabel htmlFor="sort-select">Sort by:</SortLabel>
          <SortSelect
            id="sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SortSelect>
        </SortContainer>
      </LeftSection>
      
      <RightSection>
        <ViewToggleContainer>
          <ViewToggleButton
            isActive={viewMode === 'grid'}
            onClick={() => onViewChange('grid')}
            title="Grid View"
          >
            <FiGrid size={18} />
          </ViewToggleButton>
          <ViewToggleButton
            isActive={viewMode === 'list'}
            onClick={() => onViewChange('list')}
            title="List View"
          >
            <FiList size={18} />
          </ViewToggleButton>
        </ViewToggleContainer>
      </RightSection>
    </SortToolsContainer>
  )
}

export default SortTools 