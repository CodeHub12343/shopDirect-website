import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { 
  FaSearch, 
  FaTimes, 
  FaChevronDown, 
  FaChevronUp,
  FaTruck,
  FaCreditCard,
  FaBox,
  FaUser,
  FaGift,
  FaShieldAlt,
  FaQuestionCircle,
  FaPhone,
  FaEnvelope,
  FaComments,
  FaThumbsUp,
  FaThumbsDown,
  FaExternalLinkAlt,
  FaArrowRight,
  FaShippingFast,
  FaUndo,
  FaLock,
  FaGlobe,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaHeadset,
  FaRobot
} from 'react-icons/fa'

// Mock data for the Help Center
const HELP_DATA = {
  hero: {
    title: "How can we help you?",
    subtitle: "Find answers to common questions or search for specific topics"
  },
  categories: [
    {
      id: 'orders',
      title: 'Orders & Tracking',
      icon: FaBox,
      color: '#3b82f6',
      faqs: [
        {
          id: 'track-order',
          question: 'How do I track my order?',
          answer: 'You can track your order by logging into your account and visiting the "My Orders" section, or by using the tracking number sent to your email.',
          related: ['cancel-order', 'modify-order']
        },
        {
          id: 'cancel-order',
          question: 'Can I cancel or modify my order?',
          answer: 'Orders can be cancelled or modified within 1 hour of placement, as long as they haven\'t been shipped yet.',
          related: ['track-order', 'return-policy']
        }
      ]
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      icon: FaTruck,
      color: '#10b981',
      faqs: [
        {
          id: 'shipping-options',
          question: 'What are your shipping options and costs?',
          answer: 'We offer Standard Shipping (3-5 business days, $5.99), Express Shipping (1-2 business days, $12.99), and Free Shipping on orders over $50.',
          related: ['delivery-time', 'international-shipping']
        }
      ]
    }
  ],
  quickLinks: [
    {
      title: 'Return & Refund Policy',
      link: '/policies/returns',
      icon: FaUndo,
      description: 'Complete return policy details'
    },
    {
      title: 'Shipping Information',
      link: '/policies/shipping',
      icon: FaTruck,
      description: 'Shipping costs and delivery times'
    }
  ],
  popularTopics: [
    'How do I track my order?',
    'What is your return policy?',
    'How do I apply a discount code?',
    'What payment methods do you accept?'
  ]
}

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  }
`

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const SearchSection = styled.div`
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  position: relative;
`

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border: 2px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
`

const ClearButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.lg};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 50%;
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

const SearchSuggestions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
`

const SuggestionItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[50]};
  }
  
  &:last-child {
    border-bottom: none;
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

const FAQSection = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`

const CategoryHeader = styled.div`
  background: ${({ color }) => color}10;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.main};
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ color }) => color}20;
  }
`

const CategoryTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const CategoryIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ color }) => color};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const FAQList = styled.div`
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
`

const FAQItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  
  &:last-child {
    border-bottom: none;
  }
`

const FAQQuestion = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[50]};
  }
`

const QuestionText = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
`

const FAQAnswer = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
`

const AnswerSteps = styled.ol`
  margin: ${({ theme }) => theme.spacing.md} 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`

const RelatedFAQs = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`

const RelatedTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const RelatedLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.main};
  cursor: pointer;
  text-decoration: underline;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  margin-right: ${({ theme }) => theme.spacing.md};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`

const FeedbackSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`

const FeedbackText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const FeedbackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
  }
`

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const QuickLinksSection = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`

const QuickLinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const QuickLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
    transform: translateY(-1px);
  }
`

const QuickLinkIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const QuickLinkContent = styled.div`
  flex: 1;
`

const QuickLinkTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const QuickLinkDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ContactSection = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`

const ContactTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`

const ContactText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const ContactButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ContactButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: white;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[50]};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  
  &.primary {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary.main};
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`

const VirtualAssistant = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`

const AssistantIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  font-size: 1.5rem;
`

const AssistantTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`

const AssistantText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`

const AssistantButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0 auto;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`

const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const NoResultsIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.gray[400]};
`

const HelpCenterPage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [openCategories, setOpenCategories] = useState(new Set(['orders', 'shipping', 'returns']))
  const [openFAQs, setOpenFAQs] = useState(new Set())
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [feedback, setFeedback] = useState({})

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null
    
    const query = searchQuery.toLowerCase()
    const results = []
    
    HELP_DATA.categories.forEach(category => {
      category.faqs.forEach(faq => {
        if (faq.question.toLowerCase().includes(query) || 
            faq.answer.toLowerCase().includes(query)) {
          results.push({
            ...faq,
            category: category.title,
            categoryId: category.id
          })
        }
      })
    })
    
    return results
  }, [searchQuery])

  // Get suggestions based on search query
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return HELP_DATA.popularTopics
    
    const query = searchQuery.toLowerCase()
    return HELP_DATA.popularTopics.filter(topic => 
      topic.toLowerCase().includes(query)
    ).slice(0, 5)
  }, [searchQuery])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setShowSuggestions(true)
  }

  const handleSearchClear = () => {
    setSearchQuery('')
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
  }

  const handleCategoryToggle = (categoryId) => {
    const newOpenCategories = new Set(openCategories)
    if (newOpenCategories.has(categoryId)) {
      newOpenCategories.delete(categoryId)
    } else {
      newOpenCategories.add(categoryId)
    }
    setOpenCategories(newOpenCategories)
  }

  const handleFAQToggle = (faqId) => {
    const newOpenFAQs = new Set(openFAQs)
    if (newOpenFAQs.has(faqId)) {
      newOpenFAQs.delete(faqId)
    } else {
      newOpenFAQs.add(faqId)
    }
    setOpenFAQs(newOpenFAQs)
  }

  const handleRelatedClick = (faqId) => {
    setOpenFAQs(new Set([faqId]))
    // Scroll to the FAQ
    setTimeout(() => {
      document.getElementById(faqId)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleFeedback = (faqId, isHelpful) => {
    setFeedback(prev => ({
      ...prev,
      [faqId]: isHelpful
    }))
    // In a real app, this would send feedback to the server
    console.log(`FAQ ${faqId} feedback: ${isHelpful ? 'helpful' : 'not helpful'}`)
  }

  const handleContactClick = (type) => {
    switch (type) {
      case 'contact':
        navigate('/contact')
        break
      case 'chat':
        // In a real app, this would open live chat
        alert('Live chat feature coming soon!')
        break
      case 'assistant':
        // In a real app, this would open AI assistant
        alert('AI Assistant feature coming soon!')
        break
      default:
        break
    }
  }

  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroTitle>{HELP_DATA.hero.title}</HeroTitle>
        <HeroSubtitle>{HELP_DATA.hero.subtitle}</HeroSubtitle>
      </HeroSection>

      {/* Search Section */}
      <SearchSection>
        <SearchContainer>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
          />
          {searchQuery && (
            <ClearButton onClick={handleSearchClear}>
              <FaTimes />
            </ClearButton>
          )}
        </SearchContainer>
        
        {showSuggestions && suggestions.length > 0 && (
          <SearchSuggestions>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem 
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <FaSearch style={{ marginRight: '8px', color: '#6b7280' }} />
                {suggestion}
              </SuggestionItem>
            ))}
          </SearchSuggestions>
        )}
      </SearchSection>

      {/* Main Content */}
      <MainContent>
        {/* FAQ Section */}
        <FAQSection>
          {searchResults ? (
            // Search Results
            <>
              <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                <h3>Search Results for "{searchQuery}"</h3>
                <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <FAQItem key={index} id={result.id}>
                    <FAQQuestion onClick={() => handleFAQToggle(result.id)}>
                      <QuestionText>{result.question}</QuestionText>
                      {openFAQs.has(result.id) ? <FaChevronUp /> : <FaChevronDown />}
                    </FAQQuestion>
                    <FAQAnswer isOpen={openFAQs.has(result.id)}>
                      <div>{result.answer}</div>
                      {result.steps && (
                        <AnswerSteps>
                          {result.steps.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </AnswerSteps>
                      )}
                      <FeedbackSection>
                        <FeedbackText>Was this helpful?</FeedbackText>
                        <FeedbackButton 
                          onClick={() => handleFeedback(result.id, true)}
                          style={{ color: feedback[result.id] === true ? '#10b981' : '#6b7280' }}
                        >
                          <FaThumbsUp />
                        </FeedbackButton>
                        <FeedbackButton 
                          onClick={() => handleFeedback(result.id, false)}
                          style={{ color: feedback[result.id] === false ? '#ef4444' : '#6b7280' }}
                        >
                          <FaThumbsDown />
                        </FeedbackButton>
                      </FeedbackSection>
                    </FAQAnswer>
                  </FAQItem>
                ))
              ) : (
                <NoResults>
                  <NoResultsIcon>
                    <FaQuestionCircle />
                  </NoResultsIcon>
                  <h3>No results found</h3>
                  <p>Try searching with different keywords or browse our categories below.</p>
                </NoResults>
              )}
            </>
          ) : (
            // Regular FAQ Categories
            HELP_DATA.categories.map((category) => (
              <div key={category.id}>
                <CategoryHeader 
                  color={category.color}
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  <CategoryTitle>
                    <CategoryIcon color={category.color}>
                      <category.icon />
                    </CategoryIcon>
                    {category.title}
                  </CategoryTitle>
                  {openCategories.has(category.id) ? <FaChevronUp /> : <FaChevronDown />}
                </CategoryHeader>
                
                <FAQList isOpen={openCategories.has(category.id)}>
                  {category.faqs.map((faq) => (
                    <FAQItem key={faq.id} id={faq.id}>
                      <FAQQuestion onClick={() => handleFAQToggle(faq.id)}>
                        <QuestionText>{faq.question}</QuestionText>
                        {openFAQs.has(faq.id) ? <FaChevronUp /> : <FaChevronDown />}
                      </FAQQuestion>
                      <FAQAnswer isOpen={openFAQs.has(faq.id)}>
                        <div>{faq.answer}</div>
                        {faq.steps && (
                          <AnswerSteps>
                            {faq.steps.map((step, stepIndex) => (
                              <li key={stepIndex}>{step}</li>
                            ))}
                          </AnswerSteps>
                        )}
                        
                        {faq.related && (
                          <RelatedFAQs>
                            <RelatedTitle>Related articles:</RelatedTitle>
                            {faq.related.map((relatedId) => {
                              const relatedFAQ = category.faqs.find(f => f.id === relatedId)
                              return relatedFAQ ? (
                                <RelatedLink 
                                  key={relatedId}
                                  onClick={() => handleRelatedClick(relatedId)}
                                >
                                  {relatedFAQ.question}
                                </RelatedLink>
                              ) : null
                            })}
                          </RelatedFAQs>
                        )}
                        
                        <FeedbackSection>
                          <FeedbackText>Was this helpful?</FeedbackText>
                          <FeedbackButton 
                            onClick={() => handleFeedback(faq.id, true)}
                            style={{ color: feedback[faq.id] === true ? '#10b981' : '#6b7280' }}
                          >
                            <FaThumbsUp />
                          </FeedbackButton>
                          <FeedbackButton 
                            onClick={() => handleFeedback(faq.id, false)}
                            style={{ color: feedback[faq.id] === false ? '#ef4444' : '#6b7280' }}
                          >
                            <FaThumbsDown />
                          </FeedbackButton>
                        </FeedbackSection>
                      </FAQAnswer>
                    </FAQItem>
                  ))}
                </FAQList>
              </div>
            ))
          )}
        </FAQSection>

        {/* Sidebar */}
        <Sidebar>
          {/* Quick Links */}
          <QuickLinksSection>
            <SectionTitle>Quick Links</SectionTitle>
            <QuickLinksList>
              {HELP_DATA.quickLinks.map((link, index) => (
                <QuickLink key={index} href={link.link}>
                  <QuickLinkIcon>
                    <link.icon />
                  </QuickLinkIcon>
                  <QuickLinkContent>
                    <QuickLinkTitle>{link.title}</QuickLinkTitle>
                    <QuickLinkDescription>{link.description}</QuickLinkDescription>
                  </QuickLinkContent>
                  <FaExternalLinkAlt style={{ color: '#6b7280', fontSize: '0.875rem' }} />
                </QuickLink>
              ))}
            </QuickLinksList>
          </QuickLinksSection>

          {/* Virtual Assistant */}
          <VirtualAssistant>
            <AssistantIcon>
              <FaRobot />
            </AssistantIcon>
            <AssistantTitle>AI Assistant</AssistantTitle>
            <AssistantText>
              Get instant answers to your questions with our AI-powered virtual assistant.
            </AssistantText>
            <AssistantButton onClick={() => handleContactClick('assistant')}>
              <FaRobot />
              Start Chat
            </AssistantButton>
          </VirtualAssistant>

          {/* Contact Section */}
          <ContactSection>
            <ContactTitle>Still need help?</ContactTitle>
            <ContactText>
              Can't find what you're looking for? Our support team is here to help.
            </ContactText>
            <ContactButtons>
              <ContactButton 
                className="primary"
                onClick={() => handleContactClick('contact')}
              >
                <FaEnvelope />
                Contact Support
              </ContactButton>
              <ContactButton onClick={() => handleContactClick('chat')}>
                <FaComments />
                Live Chat
              </ContactButton>
              <ContactButton>
                <FaPhone />
                Call Us
              </ContactButton>
            </ContactButtons>
          </ContactSection>
        </Sidebar>
      </MainContent>
    </PageContainer>
  )
}

export default HelpCenterPage 