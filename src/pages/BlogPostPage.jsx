import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { 
  useBlogArticle, 
  useRelatedArticles, 
  useArticleComments,
  useToggleArticleLike,
  useToggleArticleBookmark,
  useAddComment,
  useIncrementViews
} from '../hooks/useBlog'
import { 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaUser, 
  FaClock, 
  FaEye, 
  FaHeart, 
  FaShare, 
  FaComment, 
  FaBookmark,
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaPinterest,
  FaEnvelope,
  FaTag,
  FaThumbsUp,
  FaReply,
  FaUserCircle,
  FaStar,
  FaFire
} from 'react-icons/fa'

// Mock data for blog posts
const BLOG_POSTS = {
  'featured-1': {
    id: 'featured-1',
    title: "The Ultimate Guide to Sustainable Fashion in 2025",
    excerpt: "Discover how to build an eco-friendly wardrobe that's both stylish and environmentally conscious.",
    content: `
      <h2>Introduction</h2>
      <p>Sustainable fashion is no longer just a trend—it's a necessity. As we move into 2025, consumers are becoming increasingly aware of the environmental impact of their clothing choices. This comprehensive guide will help you navigate the world of sustainable fashion and make informed decisions about your wardrobe.</p>
      
      <h2>What is Sustainable Fashion?</h2>
      <p>Sustainable fashion refers to clothing that is designed, manufactured, distributed, and used in ways that are environmentally friendly and socially responsible. This includes using eco-friendly materials, ethical manufacturing processes, and promoting longevity in clothing use.</p>
      
      <h2>Key Principles of Sustainable Fashion</h2>
      <ul>
        <li><strong>Quality over Quantity:</strong> Invest in well-made pieces that last longer</li>
        <li><strong>Eco-friendly Materials:</strong> Choose organic cotton, hemp, bamboo, and recycled fabrics</li>
        <li><strong>Ethical Production:</strong> Support brands that treat workers fairly</li>
        <li><strong>Circular Fashion:</strong> Buy second-hand, repair, and recycle clothing</li>
        <li><strong>Local Production:</strong> Reduce carbon footprint by supporting local artisans</li>
      </ul>
      
      <h2>Building Your Sustainable Wardrobe</h2>
      <p>Start by assessing your current wardrobe and identifying what you actually wear. Donate or sell items you no longer need, and focus on building a capsule wardrobe with versatile, high-quality pieces.</p>
      
      <h3>Essential Sustainable Pieces</h3>
      <ul>
        <li>Organic cotton t-shirts and blouses</li>
        <li>Hemp or linen pants and skirts</li>
        <li>Recycled denim jeans</li>
        <li>Wool or cashmere sweaters (ethically sourced)</li>
        <li>Timeless outerwear pieces</li>
      </ul>
      
      <h2>Sustainable Fashion Brands to Know</h2>
      <p>Research brands that align with your values. Look for certifications like Fair Trade, GOTS (Global Organic Textile Standard), and B Corp. Some notable sustainable fashion brands include Patagonia, Eileen Fisher, Reformation, and Stella McCartney.</p>
      
      <h2>Caring for Your Sustainable Clothing</h2>
      <p>Proper care extends the life of your clothing. Wash items less frequently, use cold water, and air dry when possible. Repair small damages instead of discarding items, and consider learning basic sewing skills.</p>
      
      <h2>Conclusion</h2>
      <p>Sustainable fashion is about making conscious choices that benefit both you and the planet. By following these guidelines, you can build a wardrobe that reflects your values while looking great and feeling confident.</p>
    `,
    image: "https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    author: "Sarah Johnson",
    authorAvatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    date: "2025-01-15",
    readTime: "8 min read",
    views: 12450,
    likes: 892,
    comments: 156,
    category: "guides",
    tags: ["Sustainable Fashion", "Eco-Friendly", "Fashion Tips"],
    featured: true,
    relatedArticles: ['article-1', 'featured-2']
  },
  'featured-2': {
    id: 'featured-2',
    title: "Top 10 Must-Have Accessories for Spring 2025",
    excerpt: "From statement jewelry to practical bags, here are the accessories that will elevate your spring wardrobe.",
    content: `
      <h2>Spring 2025 Accessory Trends</h2>
      <p>Spring is the perfect time to refresh your accessory game. This season brings exciting new trends that combine style with functionality. Here are the top 10 accessories you need to know about.</p>
      
      <h2>1. Statement Jewelry</h2>
      <p>Bold, colorful jewelry is making a comeback. Think chunky necklaces, oversized earrings, and stackable bracelets. Look for pieces with natural stones and sustainable materials.</p>
      
      <h2>2. Crossbody Bags</h2>
      <p>Practical yet stylish, crossbody bags are perfect for spring activities. Choose from leather, canvas, or woven options in bright spring colors.</p>
      
      <h2>3. Wide-Brim Hats</h2>
      <p>Protect yourself from the sun while looking chic. Straw hats, fedoras, and bucket hats are all trending this season.</p>
      
      <h2>4. Silk Scarves</h2>
      <p>Versatile and elegant, silk scarves can be worn around your neck, in your hair, or tied to your bag. Look for vintage-inspired prints and bright colors.</p>
      
      <h2>5. Chunky Sneakers</h2>
      <p>Comfort meets style with chunky sneakers. White, pastel, or metallic options work well with spring outfits.</p>
      
      <h2>6. Layered Necklaces</h2>
      <p>Create visual interest by layering different lengths and styles of necklaces. Mix metals and textures for a modern look.</p>
      
      <h2>7. Oversized Sunglasses</h2>
      <p>Shield your eyes in style with oversized frames. Cat-eye, round, and square shapes are all popular this season.</p>
      
      <h2>8. Woven Bags</h2>
      <p>Natural materials like straw, rattan, and wicker are perfect for spring. These bags add texture and warmth to any outfit.</p>
      
      <h2>9. Hair Accessories</h2>
      <p>From scrunchies to hair clips, hair accessories are back in a big way. Choose velvet, silk, or embellished options.</p>
      
      <h2>10. Ankle Boots</h2>
      <p>Transition your winter boots to spring with lighter colors and materials. Suede and leather options work well for cooler spring days.</p>
      
      <h2>Styling Tips</h2>
      <p>When styling accessories, remember that less is often more. Choose one statement piece and keep the rest minimal. Consider your outfit's color palette and choose accessories that complement rather than compete.</p>
    `,
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    author: "Michael Chen",
    authorAvatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    date: "2025-01-12",
    readTime: "6 min read",
    views: 9876,
    likes: 654,
    comments: 89,
    category: "trends",
    tags: ["Accessories", "Spring Trends", "Style Guide"],
    featured: true,
    relatedArticles: ['featured-1', 'article-2']
  }
}

// Styled Components
const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.main};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.base};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`

const ArticleHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const ArticleTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.3;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  }
`

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  flex-wrap: wrap;
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ArticleImage = styled.div`
  width: 100%;
  height: 400px;
  background: url(${props => props.image}) center/cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const ArticleContent = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  h2 {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.md} 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    margin: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.sm} 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  ul {
    margin: ${({ theme }) => theme.spacing.md} 0;
    padding-left: ${({ theme }) => theme.spacing.lg};
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  
  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`

const ArticleActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.main};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.main};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`

const SocialActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  
  &.liked {
    background: ${({ theme }) => theme.colors.error};
    color: white;
    border-color: ${({ theme }) => theme.colors.error};
  }
`

const TagsSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Tag = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary.main}10;
  color: ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const AuthorAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`

const AuthorInfo = styled.div`
  flex: 1;
`

const AuthorName = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
`

const AuthorBio = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.6;
`

const CommentsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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

const CommentForm = styled.form`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  resize: vertical;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`

const CommentButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const Comment = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: white;
`

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const CommentAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const CommentMeta = styled.div`
  display: flex;
  flex-direction: column;
`

const CommentAuthorName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`

const CommentDate = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const CommentContent = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const CommentActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`

const CommentAction = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`

const RelatedArticles = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

const RelatedCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

const RelatedImage = styled.div`
  height: 200px;
  background: url(${props => props.image}) center/cover;
`

const RelatedContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`

const RelatedTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.4;
`

const RelatedMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const BlogPostPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  // API hooks
  const { data: post, isLoading } = useBlogArticle(id)
  const { data: relatedData } = useRelatedArticles(id)
  const { data: commentsData } = useArticleComments(id)
  
  const toggleLikeMutation = useToggleArticleLike()
  const toggleBookmarkMutation = useToggleArticleBookmark()
  const addCommentMutation = useAddComment()
  const incrementViewsMutation = useIncrementViews()

  // Increment views when article loads
  useEffect(() => {
    if (id) {
      incrementViewsMutation.mutate(id)
    }
  }, [id])

  const relatedArticles = relatedData?.articles || []
  const comments = commentsData?.comments || []

  const handleLike = () => {
    if (post?.id) {
      toggleLikeMutation.mutate(post.id)
    }
  }

  const handleBookmark = () => {
    if (post?.id) {
      toggleBookmarkMutation.mutate(post.id)
    }
  }

  const handleShare = (platform) => {
    const url = window.location.href
    const text = `Check out this article: ${post.title}`
    
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
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(text + ' ' + url)}`
        break
      default:
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (comment.trim() && post?.id) {
      addCommentMutation.mutate({
        articleId: post.id,
        commentData: { content: comment }
      }, {
        onSuccess: () => {
          setComment('')
        }
      })
    }
  }

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingSpinner 
          variant="ripple" 
          size="large" 
          text="Loading article..." 
          minHeight="60vh"
        />
      </PageContainer>
    )
  }

  if (!post) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Article not found</h2>
          <p>The article you're looking for doesn't exist.</p>
          <BackButton onClick={() => navigate('/blog')}>
            <FaArrowLeft />
            Back to Blog
          </BackButton>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <BackButton onClick={() => navigate('/blog')}>
        <FaArrowLeft />
        Back to Blog
      </BackButton>

      <ArticleHeader>
        <ArticleTitle>{post.title}</ArticleTitle>
        <ArticleMeta>
          <MetaItem>
            <FaUser />
            {post.author}
          </MetaItem>
          <MetaItem>
            <FaCalendarAlt />
            {new Date(post.date).toLocaleDateString()}
          </MetaItem>
          <MetaItem>
            <FaClock />
            {post.readTime}
          </MetaItem>
          <MetaItem>
            <FaEye />
            {post.views.toLocaleString()} views
          </MetaItem>
        </ArticleMeta>
      </ArticleHeader>

      <ArticleImage image={post.image} />

      <ArticleContent dangerouslySetInnerHTML={{ __html: post.content }} />

      <TagsSection>
        {Array.isArray(post.tags) && post.tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagsSection>

      <ArticleActions>
        <SocialActions>
          <ActionButton 
            className={post?.isLiked ? 'liked' : ''}
            onClick={handleLike}
          >
            <FaHeart />
            {post?.likes || 0}
          </ActionButton>
          <ActionButton>
            <FaComment />
            {post?.comments || 0}
          </ActionButton>
          <ActionButton onClick={handleBookmark}>
            <FaBookmark />
            {post?.isBookmarked ? 'Saved' : 'Save'}
          </ActionButton>
        </SocialActions>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <ActionButton onClick={() => handleShare('facebook')}>
            <FaFacebook />
          </ActionButton>
          <ActionButton onClick={() => handleShare('twitter')}>
            <FaTwitter />
          </ActionButton>
          <ActionButton onClick={() => handleShare('linkedin')}>
            <FaLinkedin />
          </ActionButton>
          <ActionButton onClick={() => handleShare('pinterest')}>
            <FaPinterest />
          </ActionButton>
          <ActionButton onClick={() => handleShare('email')}>
            <FaEnvelope />
          </ActionButton>
        </div>
      </ArticleActions>

      <AuthorSection>
        <AuthorAvatar src={post.authorAvatar} alt={post.author} />
        <AuthorInfo>
          <AuthorName>{post.author}</AuthorName>
          <AuthorBio>
            Fashion enthusiast and sustainability advocate. Passionate about helping others make conscious fashion choices that benefit both people and the planet.
          </AuthorBio>
        </AuthorInfo>
      </AuthorSection>

      <CommentsSection>
        <SectionTitle>
          <FaComment />
          Comments ({comments.length})
        </SectionTitle>
        
        <CommentForm onSubmit={handleCommentSubmit}>
          <CommentTextarea
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <CommentButton type="submit" disabled={!comment.trim()}>
            Post Comment
          </CommentButton>
        </CommentForm>

        <CommentsList>
          {comments.map(comment => (
            <Comment key={comment.id}>
              <CommentHeader>
                <CommentAuthor>
                  <CommentAvatar>
                    {comment.author.charAt(0)}
                  </CommentAvatar>
                  <CommentMeta>
                    <CommentAuthorName>{comment.author}</CommentAuthorName>
                    <CommentDate>{comment.date}</CommentDate>
                  </CommentMeta>
                </CommentAuthor>
              </CommentHeader>
              <CommentContent>{comment.content}</CommentContent>
              <CommentActions>
                <CommentAction>
                  <FaThumbsUp />
                  {comment.likes}
                </CommentAction>
                <CommentAction>
                  <FaReply />
                  Reply
                </CommentAction>
              </CommentActions>
            </Comment>
          ))}
        </CommentsList>
      </CommentsSection>

      <RelatedArticles>
        <SectionTitle>
          <FaFire />
          Related Articles
        </SectionTitle>
        <RelatedGrid>
          {relatedArticles.map(relatedPost => (
            <RelatedCard key={relatedPost.id} onClick={() => navigate(`/blog/${relatedPost.id}`)}>
              <RelatedImage image={relatedPost.image} />
              <RelatedContent>
                <RelatedTitle>{relatedPost.title}</RelatedTitle>
                <RelatedMeta>
                  <span>{relatedPost.author}</span>
                  <span>{relatedPost.readTime}</span>
                </RelatedMeta>
              </RelatedContent>
            </RelatedCard>
          ))}
        </RelatedGrid>
      </RelatedArticles>
    </PageContainer>
  )
}

export default BlogPostPage 