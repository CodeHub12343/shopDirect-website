import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { 
  useBlogArticles, 
  useBlogCategories, 
  useBlogTags, 
  useFeaturedArticles,
  useToggleArticleLike,
  useToggleArticleBookmark,
  useNewsletterSubscription
} from '../hooks/useBlog'
import { 
  FaSearch, 
  FaTimes, 
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaEye,
  FaHeart,
  FaShare,
  FaComment,
  FaFilter,
  FaTh,
  FaList,
  FaArrowRight,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaPinterest,
  FaEnvelope,
  FaBookmark,
  FaTag,
  FaFire,
  FaStar,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaImage,
  FaNewspaper,
  FaLightbulb,
  FaGraduationCap,
  FaChartLine
} from 'react-icons/fa'

// Blog page component using dev.to API

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`

const HeroSection = styled.div`
  position: relative;
  height: 400px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%);
    z-index: 1;
  }
`

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(${props => props.image}) center/cover;
  filter: blur(2px);
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 600px;
  padding: ${({ theme }) => theme.spacing.xl};
`

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  }
`

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  opacity: 0.9;
  line-height: 1.6;
`

const ControlsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const SearchAndFilters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.secondary};
`

const FilterButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

const FilterButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ active, theme }) => active ? theme.colors.primary.main : 'white'};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  
  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.primary.dark : theme.colors.gray[50]};
  }
`

const ViewToggle = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ViewButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  background: ${({ active, theme }) => active ? theme.colors.primary.main : 'white'};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  
  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.primary.dark : theme.colors.gray[50]};
  }
`

const TagsSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  align-items: center;
`

const TagChip = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ active, theme }) => active ? theme.colors.primary.main : 'white'};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  
  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.primary.dark : theme.colors.gray[50]};
  }
`

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

const FeaturedSection = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

const FeaturedCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

const FeaturedImage = styled.div`
  height: 200px;
  background: url(${props => props.image}) center/cover;
  position: relative;
`

const FeaturedBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const FeaturedContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`

const FeaturedTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.4;
`

const FeaturedExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
`

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ReadMoreButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ viewMode }) => viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr'};
  gap: ${({ theme }) => theme.spacing.lg};
`

const ArticleCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.base};
  display: ${({ viewMode }) => viewMode === 'list' ? 'flex' : 'block'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`

const ArticleImage = styled.div`
  height: ${({ viewMode }) => viewMode === 'list' ? '200px' : '180px'};
  background: url(${props => props.image}) center/cover;
  flex-shrink: 0;
  width: ${({ viewMode }) => viewMode === 'list' ? '300px' : '100%'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`

const ArticleContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
`

const ArticleTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.4;
`

const ArticleExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
`

const ArticleActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.md};
`

const SocialActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const SidebarSection = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`

const SidebarTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
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
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  background: none;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: ${({ theme }) => theme.transitions.base};
  color: ${({ theme }) => theme.colors.text.primary};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[50]};
  }
  
  &.active {
    background: ${({ theme }) => theme.colors.primary.main}10;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`

const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const CategoryIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.main};
`

const CategoryCount = styled.span`
  background: ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const TrendingTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`

const TrendingTag = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: white;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`

const NewsletterSection = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main} 0%, ${({ theme }) => theme.colors.primary.dark} 100%);
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`

const NewsletterTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const NewsletterSubtitle = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0.9;
`

const NewsletterForm = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`

const NewsletterInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255,255,255,0.2);
  }
`

const NewsletterButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: white;
  color: ${({ theme }) => theme.colors.primary.main};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
  }
`

const NewsletterIncentive = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  opacity: 0.9;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const BlogPage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTags, setSelectedTags] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [articlesPerPage] = useState(6)

  // API hooks
  const { data: articlesData, isLoading: articlesLoading } = useBlogArticles({
    page: currentPage,
    limit: articlesPerPage,
    search: searchQuery,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    tags: selectedTags.length > 0 ? selectedTags : undefined
  })

  const { data: categoriesData, isLoading: categoriesLoading } = useBlogCategories()
  const { data: tagsData, isLoading: tagsLoading } = useBlogTags()
  const { data: featuredData, isLoading: featuredLoading } = useFeaturedArticles()
  
  const toggleLikeMutation = useToggleArticleLike()
  const toggleBookmarkMutation = useToggleArticleBookmark()
  const newsletterMutation = useNewsletterSubscription()

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedTags])

  // Extract data from API responses
  const articles = articlesData?.articles || []
  const totalPages = articlesData?.totalPages || 1
  const categories = categoriesData?.categories || []
  const tags = tagsData?.tags || []
  const featuredArticles = featuredData?.articles || []

  // Check if any data is loading
  const isLoading = articlesLoading || categoriesLoading || tagsLoading || featuredLoading

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleLikeClick = (articleId) => {
    toggleLikeMutation.mutate(articleId)
  }

  const handleBookmarkClick = (articleId) => {
    toggleBookmarkMutation.mutate(articleId)
  }

  const handleShareClick = (platform, article) => {
    const url = window.location.href
    const text = `Check out this article: ${article.title}`
    
    let shareUrl = ''
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`
        break
      default:
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    
    newsletterMutation.mutate(email, {
      onSuccess: () => {
        e.target.reset()
      }
    })
  }

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingSpinner 
          variant="ripple" 
          size="large" 
          text="Loading blog articles..." 
          minHeight="60vh"
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroBackground image="https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop" />
        <HeroContent>
          <HeroTitle>Insights, Guides & Trends</HeroTitle>
          <HeroSubtitle>Explore our latest articles to stay updated on trends, tips, and product recommendations.</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      {/* Controls Section */}
      <ControlsSection>
        <SearchAndFilters>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>
          
          <FilterButtons>
            <FilterButton
              active={selectedCategory === 'all'}
              onClick={() => handleCategoryClick('all')}
            >
              All
            </FilterButton>
            {categories.filter(cat => cat.id !== 'all').map(category => (
              <FilterButton
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </FilterButton>
            ))}
          </FilterButtons>
          
          <ViewToggle>
            <ViewButton
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
            >
              <FaTh />
            </ViewButton>
            <ViewButton
              active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
            >
              <FaList />
            </ViewButton>
          </ViewToggle>
        </SearchAndFilters>
        
        <TagsSection>
          <span style={{ fontWeight: '500', color: '#6b7280' }}>Popular tags:</span>
          {tags.slice(0, 6).map(tag => (
            <TagChip
              key={tag}
              active={selectedTags.includes(tag)}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </TagChip>
          ))}
        </TagsSection>
      </ControlsSection>

      {/* Main Content */}
      <MainContent>
        <ContentSection>
          {/* Featured Articles */}
          <FeaturedSection>
            <SectionTitle>
              <FaFire style={{ color: '#f59e0b' }} />
              Featured Articles
            </SectionTitle>
            <FeaturedGrid>
              {featuredArticles.map(article => (
                <FeaturedCard key={article.id}>
                  <FeaturedImage image={article.image}>
                    <FeaturedBadge>Featured</FeaturedBadge>
                  </FeaturedImage>
                  <FeaturedContent>
                    <FeaturedTitle>{article.title}</FeaturedTitle>
                    <FeaturedExcerpt>{article.excerpt}</FeaturedExcerpt>
                    <ArticleMeta>
                      <MetaItem>
                        <FaUser />
                        {article.author}
                      </MetaItem>
                      <MetaItem>
                        <FaCalendarAlt />
                        {new Date(article.date).toLocaleDateString()}
                      </MetaItem>
                      <MetaItem>
                        <FaClock />
                        {article.readTime}
                      </MetaItem>
                    </ArticleMeta>
                    <ReadMoreButton onClick={() => navigate(`/blog/${article.id}`)}>
                      Read More
                      <FaArrowRight />
                    </ReadMoreButton>
                  </FeaturedContent>
                </FeaturedCard>
              ))}
            </FeaturedGrid>
          </FeaturedSection>

          {/* Articles Grid */}
          <div>
            <SectionTitle>
              <FaNewspaper />
              Latest Articles
              {articles.length > 0 && (
                <span style={{ fontSize: '1rem', color: '#6b7280', fontWeight: 'normal' }}>
                  ({articles.length} articles)
                </span>
              )}
            </SectionTitle>
            
            {articles.length > 0 ? (
              <>
                <ArticlesGrid viewMode={viewMode}>
                  {articles.map(article => (
                    <ArticleCard key={article.id} viewMode={viewMode}>
                      <ArticleImage image={article.image} viewMode={viewMode} />
                      <ArticleContent>
                        <ArticleTitle>{article.title}</ArticleTitle>
                        <ArticleExcerpt>{article.excerpt}</ArticleExcerpt>
                        <ArticleMeta>
                          <MetaItem>
                            <FaUser />
                            {article.author}
                          </MetaItem>
                          <MetaItem>
                            <FaCalendarAlt />
                            {new Date(article.date).toLocaleDateString()}
                          </MetaItem>
                          <MetaItem>
                            <FaClock />
                            {article.readTime}
                          </MetaItem>
                          <MetaItem>
                            <FaEye />
                            {article.views.toLocaleString()}
                          </MetaItem>
                        </ArticleMeta>
                        <ArticleActions>
                          <SocialActions>
                                                      <ActionButton onClick={() => handleLikeClick(article.id)}>
                            <FaHeart style={{ color: article.isLiked ? '#ef4444' : undefined }} />
                            {article.likes}
                          </ActionButton>
                          <ActionButton>
                            <FaComment />
                            {article.comments}
                          </ActionButton>
                          <ActionButton onClick={() => handleBookmarkClick(article.id)}>
                            <FaBookmark style={{ color: article.isBookmarked ? '#f59e0b' : undefined }} />
                            {article.isBookmarked ? 'Saved' : 'Save'}
                          </ActionButton>
                            <ActionButton onClick={() => handleShareClick('facebook', article)}>
                              <FaFacebook />
                            </ActionButton>
                            <ActionButton onClick={() => handleShareClick('twitter', article)}>
                              <FaTwitter />
                            </ActionButton>
                          </SocialActions>
                          <ReadMoreButton onClick={() => navigate(`/blog/${article.id}`)}>
                            Read More
                          </ReadMoreButton>
                        </ArticleActions>
                      </ArticleContent>
                    </ArticleCard>
                  ))}
                </ArticlesGrid>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '8px', 
                    marginTop: '2rem' 
                  }}>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        background: currentPage === 1 ? '#f3f4f6' : 'white',
                        color: currentPage === 1 ? '#9ca3af' : '#374151',
                        borderRadius: '6px',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      <FaChevronLeft />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        style={{
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          background: currentPage === page ? '#3b82f6' : 'white',
                          color: currentPage === page ? 'white' : '#374151',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: currentPage === page ? '600' : '400'
                        }}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        background: currentPage === totalPages ? '#f3f4f6' : 'white',
                        color: currentPage === totalPages ? '#9ca3af' : '#374151',
                        borderRadius: '6px',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                <FaNewspaper style={{ fontSize: '3rem', marginBottom: '1rem' }} />
                <h3>No articles found</h3>
                <p>Try adjusting your search or filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </ContentSection>

        {/* Sidebar */}
        <Sidebar>
          {/* Categories */}
          <SidebarSection>
            <SidebarTitle>
              <FaFilter />
              Categories
            </SidebarTitle>
            <CategoryList>
              {categories.map(category => (
                <CategoryItem
                  key={category.id}
                  className={selectedCategory === category.id ? 'active' : ''}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <CategoryInfo>
                    <CategoryIcon>
                      <FaNewspaper />
                    </CategoryIcon>
                    {category.name}
                  </CategoryInfo>
                  <CategoryCount>{category.count}</CategoryCount>
                </CategoryItem>
              ))}
            </CategoryList>
          </SidebarSection>

          {/* Trending Tags */}
          <SidebarSection>
            <SidebarTitle>
              <FaTag />
              Trending Tags
            </SidebarTitle>
            <TrendingTags>
              {tags.map(tag => (
                <TrendingTag
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </TrendingTag>
              ))}
            </TrendingTags>
          </SidebarSection>

          {/* Newsletter Signup */}
          <NewsletterSection>
            <NewsletterTitle>Stay Updated with Our Latest Insights</NewsletterTitle>
            <NewsletterSubtitle>Get weekly fashion tips, trend updates, and exclusive offers delivered to your inbox.</NewsletterSubtitle>
            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <NewsletterInput
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <NewsletterButton type="submit">
                Subscribe Now
              </NewsletterButton>
            </NewsletterForm>
            <NewsletterIncentive>
              Get 10% off your first purchase!
            </NewsletterIncentive>
          </NewsletterSection>
        </Sidebar>
      </MainContent>
    </PageContainer>
  )
}

export default BlogPage 