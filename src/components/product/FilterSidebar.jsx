import { useState } from 'react'
import styled from 'styled-components'
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi'

const SidebarContainer = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  height: fit-content;
  position: sticky;
  top: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ isVisible }) => isVisible ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    border-radius: 0;
    overflow-y: auto;
  }
`

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: sticky;
    top: 0;
    background-color: white;
    padding-bottom: ${({ theme }) => theme.spacing.md};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  }
`

const SidebarTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

const FilterSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  user-select: none;
`

const FilterTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const FilterContent = styled.div`
  display: ${({ isExpanded }) => isExpanded ? 'block' : 'none'};
`

// Price Range Filter
const PriceRangeContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const PriceInputs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const PriceInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`

const PriceSlider = styled.input`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.border.light};
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.main};
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.main};
    cursor: pointer;
    border: none;
  }
`

// Checkbox Filter
const CheckboxContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
`

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.primary.main};
`

const CheckboxCount = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
`

// Color Filter
const ColorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ColorOption = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid ${({ theme, isSelected }) => 
    isSelected ? theme.colors.primary.main : theme.colors.border.light};
  background-color: ${({ color }) => color};
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: scale(1.1);
  }
  
  ${({ isSelected }) => isSelected && `
    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      font-weight: bold;
      text-shadow: 0 0 2px rgba(0,0,0,0.5);
    }
  `}
`

// Clear All Button
const ClearAllButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.border.light};
  }
`

const FilterSidebar = ({ filters, onFilterChange, isVisible, onClose, products = [] }) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
    rating: true,
    color: true,
    size: true,
    availability: true,
    discount: true,
  })

  // Generate filter options from actual products
  const getFilterOptions = () => {
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))]
    const colors = [...new Set(products.flatMap(p => p.colors || []).filter(Boolean))]
    const sizes = [...new Set(products.flatMap(p => p.sizes || []).filter(Boolean))]
    const ratings = [4, 3, 2, 1]
    const discounts = [10, 20, 30, 50]

    // Get price range
    const prices = products.map(p => p.price).filter(Boolean)
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000

    return {
      brands,
      colors: colors.map(color => ({
        name: color.charAt(0).toUpperCase() + color.slice(1),
        value: color,
        color: getColorHex(color)
      })),
      sizes,
      ratings,
      discounts,
      minPrice,
      maxPrice
    }
  }

  const getColorHex = (colorName) => {
    const colorMap = {
      black: '#000000',
      white: '#ffffff',
      red: '#ff0000',
      blue: '#0000ff',
      green: '#00ff00',
      yellow: '#ffff00',
      silver: '#c0c0c0',
      gold: '#ffd700',
      purple: '#800080',
      pink: '#ffc0cb',
      orange: '#ffa500',
      brown: '#a52a2a',
      gray: '#808080',
      navy: '#000080',
      maroon: '#800000',
      teal: '#008080',
      lime: '#00ff00',
      olive: '#808000',
      cyan: '#00ffff',
      magenta: '#ff00ff'
    }
    return colorMap[colorName.toLowerCase()] || '#cccccc'
  }

  const filterOptions = getFilterOptions()

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handlePriceChange = (type, value) => {
    onFilterChange({
      [type]: value,
    })
  }

  const handleCheckboxChange = (type, value, checked) => {
    const currentValues = filters[type] ? filters[type].split(',') : []
    
    if (checked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value)
      }
    } else {
      const index = currentValues.indexOf(value)
      if (index > -1) {
        currentValues.splice(index, 1)
      }
    }
    
    onFilterChange({
      [type]: currentValues.join(',')
    })
  }

  const handleColorChange = (colorValue) => {
    const currentColors = filters.colors ? filters.colors.split(',') : []
    const index = currentColors.indexOf(colorValue)
    
    if (index > -1) {
      currentColors.splice(index, 1)
    } else {
      currentColors.push(colorValue)
    }
    
    onFilterChange({
      colors: currentColors.join(',')
    })
  }

  const handleToggleFilter = (type) => {
    onFilterChange({
      [type]: !filters[type]
    })
  }

  const clearAllFilters = () => {
    onFilterChange({
      priceMin: '',
      priceMax: '',
      brands: '',
      ratings: '',
      colors: '',
      sizes: '',
      inStock: false,
      discount: '',
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    value && value !== '' && value !== false
  )

  return (
    <SidebarContainer isVisible={isVisible}>
      <SidebarHeader>
        <SidebarTitle>Filters</SidebarTitle>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>
      </SidebarHeader>

      {/* Price Range Filter */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('price')}>
          <FilterTitle>Price Range</FilterTitle>
          {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
        </FilterHeader>
        <FilterContent isExpanded={expandedSections.price}>
          <PriceRangeContainer>
            <PriceInputs>
              <PriceInput
                type="number"
                placeholder="Min"
                value={filters.priceMin}
                onChange={(e) => handlePriceChange('priceMin', e.target.value)}
              />
              <PriceInput
                type="number"
                placeholder="Max"
                value={filters.priceMax}
                onChange={(e) => handlePriceChange('priceMax', e.target.value)}
              />
            </PriceInputs>
            <PriceSlider
              type="range"
              min={filterOptions.minPrice}
              max={filterOptions.maxPrice}
              value={filters.priceMax || filterOptions.maxPrice}
              onChange={(e) => handlePriceChange('priceMax', e.target.value)}
            />
          </PriceRangeContainer>
        </FilterContent>
      </FilterSection>

      {/* Brand Filter */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('brand')}>
          <FilterTitle>Brand</FilterTitle>
          {expandedSections.brand ? <FiChevronUp /> : <FiChevronDown />}
        </FilterHeader>
        <FilterContent isExpanded={expandedSections.brand}>
          {filterOptions.brands.map(brand => {
            const isSelected = filters.brands?.includes(brand)
            const brandCount = products.filter(p => p.brand === brand).length
            return (
              <CheckboxContainer key={brand}>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => handleCheckboxChange('brands', brand, e.target.checked)}
                  />
                  {brand}
                  <CheckboxCount>({brandCount})</CheckboxCount>
                </CheckboxLabel>
              </CheckboxContainer>
            )
          })}
        </FilterContent>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('rating')}>
          <FilterTitle>Rating</FilterTitle>
          {expandedSections.rating ? <FiChevronUp /> : <FiChevronDown />}
        </FilterHeader>
        <FilterContent isExpanded={expandedSections.rating}>
          {filterOptions.ratings.map(rating => {
            const isSelected = filters.ratings?.includes(rating.toString())
            const ratingCount = products.filter(p => (p.ratingsAverage || p.rating || 0) >= rating).length
            return (
              <CheckboxContainer key={rating}>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => handleCheckboxChange('ratings', rating.toString(), e.target.checked)}
                  />
                  {rating}★ & up
                  <CheckboxCount>({ratingCount})</CheckboxCount>
                </CheckboxLabel>
              </CheckboxContainer>
            )
          })}
        </FilterContent>
      </FilterSection>

      {/* Color Filter */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('color')}>
          <FilterTitle>Color</FilterTitle>
          {expandedSections.color ? <FiChevronUp /> : <FiChevronDown />}
        </FilterHeader>
        <FilterContent isExpanded={expandedSections.color}>
          <ColorContainer>
            {filterOptions.colors.map(color => {
              const isSelected = filters.colors?.includes(color.value)
              return (
                <ColorOption
                  key={color.value}
                  color={color.color}
                  isSelected={isSelected}
                  onClick={() => handleColorChange(color.value)}
                  title={color.name}
                />
              )
            })}
          </ColorContainer>
        </FilterContent>
      </FilterSection>

      {/* Size Filter */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('size')}>
          <FilterTitle>Size</FilterTitle>
          {expandedSections.size ? <FiChevronUp /> : <FiChevronDown />}
        </FilterHeader>
        <FilterContent isExpanded={expandedSections.size}>
          {filterOptions.sizes.map(size => {
            const isSelected = filters.sizes?.includes(size)
            const sizeCount = products.filter(p => p.sizes && p.sizes.includes(size)).length
            return (
              <CheckboxContainer key={size}>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => handleCheckboxChange('sizes', size, e.target.checked)}
                  />
                  {size}
                  <CheckboxCount>({sizeCount})</CheckboxCount>
                </CheckboxLabel>
              </CheckboxContainer>
            )
          })}
        </FilterContent>
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('availability')}>
          <FilterTitle>Availability</FilterTitle>
          {expandedSections.availability ? <FiChevronUp /> : <FiChevronDown />}
        </FilterHeader>
        <FilterContent isExpanded={expandedSections.availability}>
          <CheckboxContainer>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleToggleFilter('inStock')}
              />
              In Stock Only
            </CheckboxLabel>
          </CheckboxContainer>
        </FilterContent>
      </FilterSection>

      {/* Discount Filter */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('discount')}>
          <FilterTitle>Discount</FilterTitle>
          {expandedSections.discount ? <FiChevronUp /> : <FiChevronDown />}
        </FilterHeader>
        <FilterContent isExpanded={expandedSections.discount}>
          {filterOptions.discounts.map(discount => {
            const isSelected = filters.discount?.includes(discount.toString())
            const discountCount = products.filter(p => (p.discountPercentage || 0) >= discount).length
            return (
              <CheckboxContainer key={discount}>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => handleCheckboxChange('discount', discount.toString(), e.target.checked)}
                  />
                  {discount}% off or more
                  <CheckboxCount>({discountCount})</CheckboxCount>
                </CheckboxLabel>
              </CheckboxContainer>
            )
          })}
        </FilterContent>
      </FilterSection>

      {hasActiveFilters && (
        <ClearAllButton onClick={clearAllFilters}>
          Clear All Filters
        </ClearAllButton>
      )}
    </SidebarContainer>
  )
}

export default FilterSidebar 