import { useState } from 'react'
import styled from 'styled-components'
import { FiCheck, FiInfo, FiPackage, FiCalendar, FiTag, FiStar } from 'react-icons/fi'

const DescriptionContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const TabContainer = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.border.light};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const TabList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-wrap: wrap;
  }
`

const TabButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: none;
  border: none;
  border-bottom: 3px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.primary.main : 'transparent'};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary.main : theme.colors.text.secondary};
  font-weight: ${({ isActive }) => isActive ? '600' : '500'};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`

const TabContent = styled.div`
  min-height: 300px;
`

const Description = styled.div`
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.base};
`

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  }
`

const FeatureIcon = styled(FiCheck)`
  color: ${({ theme }) => theme.colors.success};
  flex-shrink: 0;
`

const SpecificationsTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const SpecRow = styled.div`
  display: contents;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.sm} 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  }
`

const SpecLabel = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    background: none;
    padding: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  }
`

const SpecValue = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0;
  }
`

const BrandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const BrandIcon = styled(FiInfo)`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 24px;
`

const BrandText = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`

const NoDataMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
`

const AdditionalInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

const InfoSection = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`

const InfoSectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  
  &:last-child {
    border-bottom: none;
  }
`

const InfoLabel = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`

const InfoValue = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: right;
`

const BadgeContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

const Badge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &.new {
    background: ${({ theme }) => theme.colors.success};
    color: white;
  }
  
  &.best-seller {
    background: ${({ theme }) => theme.colors.warning};
    color: white;
  }
  
  &.featured {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
  }
`

const ProductDescription = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description')

  if (!product) return null

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'features', label: 'Features' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'additional', label: 'Additional Info' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <Description>
            {product.description || 'No description available for this product.'}
          </Description>
        )
      
      case 'features':
        return product.features && product.features.length > 0 ? (
          <FeaturesList>
            {product.features.map((feature, index) => (
              <FeatureItem key={index}>
                <FeatureIcon size={16} />
                {feature}
              </FeatureItem>
            ))}
          </FeaturesList>
        ) : (
          <NoDataMessage>
            <p>No features information available for this product.</p>
          </NoDataMessage>
        )
      
      case 'specifications':
        return product.specifications && Object.keys(product.specifications).length > 0 ? (
          <SpecificationsTable>
            {Object.entries(product.specifications).map(([key, value]) => (
              <SpecRow key={key}>
                <SpecLabel>{key}</SpecLabel>
                <SpecValue>{value}</SpecValue>
              </SpecRow>
            ))}
          </SpecificationsTable>
        ) : (
          <NoDataMessage>
            <p>No specifications available for this product.</p>
          </NoDataMessage>
        )
      
      case 'additional':
        return (
          <AdditionalInfoGrid>
            {/* Product Details */}
            <InfoSection>
              <InfoSectionTitle>
                <FiPackage size={18} />
                Product Details
              </InfoSectionTitle>
              <InfoList>
                <InfoItem>
                  <InfoLabel>Product ID</InfoLabel>
                  <InfoValue>{product._id}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Brand</InfoLabel>
                  <InfoValue>{product.brand || 'N/A'}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Category</InfoLabel>
                  <InfoValue>{product.category?.name || 'N/A'}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Stock Quantity</InfoLabel>
                  <InfoValue>{product.stockQuantity || product.stock || 0} units</InfoValue>
                </InfoItem>
                {product.colors && product.colors.length > 0 && (
                  <InfoItem>
                    <InfoLabel>Available Colors</InfoLabel>
                    <InfoValue>{product.colors.join(', ')}</InfoValue>
                  </InfoItem>
                )}
                {product.sizes && product.sizes.length > 0 && (
                  <InfoItem>
                    <InfoLabel>Available Sizes</InfoLabel>
                    <InfoValue>{product.sizes.join(', ')}</InfoValue>
                  </InfoItem>
                )}
              </InfoList>
            </InfoSection>

            {/* Ratings & Reviews */}
            <InfoSection>
              <InfoSectionTitle>
                <FiStar size={18} />
                Ratings & Reviews
              </InfoSectionTitle>
              <InfoList>
                <InfoItem>
                  <InfoLabel>Average Rating</InfoLabel>
                  <InfoValue>{(product.ratingsAverage || product.rating || 0).toFixed(1)}/5</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Total Reviews</InfoLabel>
                  <InfoValue>{product.ratingsQuantity || product.reviewCount || 0}</InfoValue>
                </InfoItem>
                {product.reviews && (
                  <InfoItem>
                    <InfoLabel>Review Count</InfoLabel>
                    <InfoValue>{product.reviews.length}</InfoValue>
                  </InfoItem>
                )}
              </InfoList>
            </InfoSection>

            {/* Product Status */}
            <InfoSection>
              <InfoSectionTitle>
                <FiTag size={18} />
                Product Status
              </InfoSectionTitle>
              <InfoList>
                {(product.isNew || product.isBestSeller || product.isFeatured) && (
                  <InfoItem>
                    <InfoLabel>Badges</InfoLabel>
                    <InfoValue>
                      <BadgeContainer>
                        {product.isNew && <Badge className="new">New</Badge>}
                        {product.isBestSeller && <Badge className="best-seller">Best Seller</Badge>}
                        {product.isFeatured && <Badge className="featured">Featured</Badge>}
                      </BadgeContainer>
                    </InfoValue>
                  </InfoItem>
                )}
                {product.tags && product.tags.length > 0 && (
                  <InfoItem>
                    <InfoLabel>Tags</InfoLabel>
                    <InfoValue>{product.tags.join(', ')}</InfoValue>
                  </InfoItem>
                )}
                {product.discountPercentage && (
                  <InfoItem>
                    <InfoLabel>Discount</InfoLabel>
                    <InfoValue>{product.discountPercentage}% OFF</InfoValue>
                  </InfoItem>
                )}
              </InfoList>
            </InfoSection>

            {/* Timestamps */}
            <InfoSection>
              <InfoSectionTitle>
                <FiCalendar size={18} />
                Timestamps
              </InfoSectionTitle>
              <InfoList>
                {product.createdAt && (
                  <InfoItem>
                    <InfoLabel>Created</InfoLabel>
                    <InfoValue>{new Date(product.createdAt).toLocaleDateString()}</InfoValue>
                  </InfoItem>
                )}
                {product.updatedAt && (
                  <InfoItem>
                    <InfoLabel>Last Updated</InfoLabel>
                    <InfoValue>{new Date(product.updatedAt).toLocaleDateString()}</InfoValue>
                  </InfoItem>
                )}
              </InfoList>
            </InfoSection>
          </AdditionalInfoGrid>
        )
      
      default:
        return null
    }
  }

  return (
    <DescriptionContainer>
      <TabContainer>
        <TabList>
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabList>
      </TabContainer>

      <TabContent>
        {renderTabContent()}
      </TabContent>

      {product.brand && (
        <BrandInfo>
          <BrandIcon />
          <BrandText>
            <strong>{product.brand}</strong> - Premium quality products designed for your lifestyle.
          </BrandText>
        </BrandInfo>
      )}
    </DescriptionContainer>
  )
}

export default ProductDescription 