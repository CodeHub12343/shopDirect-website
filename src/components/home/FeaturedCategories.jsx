import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const CategoriesSection = styled.section`
  padding: ${({ theme }) => theme.spacing[16]} 0;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing[8]};
  }
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const CategoryCard = styled(Link)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`

const CategoryImage = styled.div`
  height: 200px;
  background: ${({ imageUrl }) => 
    imageUrl 
      ? `url(${imageUrl})`
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    transition: opacity ${({ theme }) => theme.transitions.fast};
  }

  ${CategoryCard}:hover &::before {
    opacity: 0.7;
  }
`

const CategoryContent = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
`

const CategoryName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`

const CategoryDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  line-height: 1.6;
`

const ShopNowButton = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: gap ${({ theme }) => theme.transitions.fast};

  ${CategoryCard}:hover & {
    gap: ${({ theme }) => theme.spacing[3]};
  }
`

const ArrowIcon = styled(FaArrowRight)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  transition: transform ${({ theme }) => theme.transitions.fast};

  ${CategoryCard}:hover & {
    transform: translateX(4px);
  }
`

// Category images mapping
// Note: The 'Electronics' URL provided is a Pinterest page link, not a direct image URL.
// It may not render as a background image. Consider replacing with a direct image URL
// (e.g., an i.pinimg.com link) if it doesn't display.
const categoryImages = {
  'Electronics': 'https://i.pinimg.com/1200x/65/d5/f4/65d5f41f65e512e712433cb2cc1cb989.jpg',
  'Home & Kitchen Appliances': 'https://i.pinimg.com/736x/f9/f5/a2/f9f5a23aa9828af2d0c1a8fcd1673658.jpg',
  'Books & Reading Devices': 'https://i.pinimg.com/736x/72/d0/84/72d0840fadc2685c737e00f347386f6f.jpg',
  'Fashion & Apparel': 'https://i.pinimg.com/1200x/1c/33/51/1c3351c5401f73b8dd10c260b9b714f8.jpg',
  'TVs & Home Entertainment': 'https://i.pinimg.com/1200x/c9/ff/18/c9ff18e3bcb3f712369a6d5e00fe3642.jpg'
}

const FeaturedCategories = ({ categories }) => {
  // Take first 6 categories or use all if less than 6
  const featuredCategories = categories.slice(0, 6)

  return (
    <CategoriesSection>
      <Container>
        <SectionHeader>
          <SectionTitle>Shop by Category</SectionTitle>
          <SectionSubtitle>
            Discover our curated collections across various categories. 
            Find exactly what you're looking for with our organized shopping experience.
          </SectionSubtitle>
        </SectionHeader>

        <CategoriesGrid>
          {featuredCategories.map((category) => (
            <CategoryCard key={category._id} to={`/products?category=${category._id}`}>
              <CategoryImage 
                imageUrl={categoryImages[category.name] || categoryImages['Electronics']}
              />
              <CategoryContent>
                <CategoryName>{category.name}</CategoryName>
                <CategoryDescription>
                  {category.description || `Explore our amazing ${category.name} collection with the latest trends and best deals.`}
                </CategoryDescription>
                <ShopNowButton>
                  Shop Now
                  <ArrowIcon />
                </ShopNowButton>
              </CategoryContent>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </Container>
    </CategoriesSection>
  )
}

export default FeaturedCategories 