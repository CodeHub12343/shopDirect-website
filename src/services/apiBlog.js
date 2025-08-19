// Dev.to API base URL
const DEV_TO_API_BASE = 'https://dev.to/api'

// Transform dev.to article to our format
const transformArticle = (devArticle) => {
  // Ensure tags is always an array
  let tags = []
  if (devArticle.tag_list) {
    if (Array.isArray(devArticle.tag_list)) {
      tags = devArticle.tag_list
    } else if (typeof devArticle.tag_list === 'string') {
      // If it's a string, split by commas or spaces
      tags = devArticle.tag_list.split(/[,\s]+/).filter(tag => tag.trim())
    }
  }

  return {
    id: devArticle.id.toString(),
    title: devArticle.title,
    excerpt: devArticle.description,
    content: devArticle.description, // Dev.to doesn't provide full content in list view
    image: devArticle.cover_image || devArticle.social_image,
    author: devArticle.user?.name || 'Anonymous',
    date: devArticle.published_at,
    readTime: `${devArticle.reading_time_minutes} min read`,
    views: devArticle.public_reactions_count || 0,
    likes: devArticle.positive_reactions_count || 0,
    comments: devArticle.comments_count || 0,
    category: 'technology', // Dev.to doesn't have categories in the same way
    tags: tags,
    featured: false, // We'll determine this based on reactions
    url: devArticle.url,
    slug: devArticle.slug,
    isLiked: false, // These will be managed locally
    isBookmarked: false
  }
}

// Get all blog articles with optional filters
export const getBlogArticles = async (params = {}) => {
  try {
    const { page = 1, limit = 10, search, category, tags } = params
    
    // Build query parameters for dev.to API
    const queryParams = new URLSearchParams()
    queryParams.append('page', page)
    queryParams.append('per_page', limit)
    
    if (search) {
      queryParams.append('q', search)
    }
    
    if (tags && tags.length > 0) {
      queryParams.append('tag', tags[0]) // Dev.to only supports one tag at a time
    }
    
    const response = await fetch(`${DEV_TO_API_BASE}/articles?${queryParams}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const articles = await response.json()
    
    // Transform articles to our format
    const transformedArticles = articles.map(transformArticle)
    
    // Filter by category if specified (since dev.to doesn't have categories)
    let filteredArticles = transformedArticles
    if (category && category !== 'all') {
      // For now, we'll skip category filtering since dev.to doesn't support it
      // In a real app, you might want to maintain a mapping of categories to tags
    }
    
    return {
      articles: filteredArticles,
      totalPages: Math.ceil(articles.length / limit),
      currentPage: page,
      totalArticles: articles.length
    }
  } catch (error) {
    console.error('Error fetching articles from dev.to:', error)
    throw new Error('Failed to fetch blog articles')
  }
}

// Get a single blog article by ID
export const getBlogArticle = async (id) => {
  try {
    const response = await fetch(`${DEV_TO_API_BASE}/articles/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const article = await response.json()
    return transformArticle(article)
  } catch (error) {
    console.error('Error fetching article from dev.to:', error)
    throw new Error('Failed to fetch blog article')
  }
}

// Get blog categories (dev.to doesn't have categories, so we'll create some)
export const getBlogCategories = async () => {
  try {
    // Since dev.to doesn't have categories, we'll return some common tech categories
    // Note: These are just placeholder categories since dev.to doesn't have categories
    const categories = [
      { id: 'all', name: 'All Articles', count: 0 },
      { id: 'webdev', name: 'Web Development', count: 0 },
      { id: 'javascript', name: 'JavaScript', count: 0 },
      { id: 'react', name: 'React', count: 0 },
      { id: 'python', name: 'Python', count: 0 },
      { id: 'ai', name: 'AI & Machine Learning', count: 0 }
    ]
    
    return { categories }
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw new Error('Failed to fetch blog categories')
  }
}

// Get blog tags from dev.to
export const getBlogTags = async () => {
  try {
    const response = await fetch(`${DEV_TO_API_BASE}/tags`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const tags = await response.json()
    
    // Return popular tags (first 20)
    return { 
      tags: tags.slice(0, 20).map(tag => tag.name)
    }
  } catch (error) {
    console.error('Error fetching tags from dev.to:', error)
    // Return some default tags if API fails
    return {
      tags: ['javascript', 'react', 'python', 'webdev', 'ai', 'programming']
    }
  }
}

// Get featured articles (articles with high reactions)
export const getFeaturedArticles = async () => {
  try {
    const response = await fetch(`${DEV_TO_API_BASE}/articles?per_page=5`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const articles = await response.json()
    
    // Transform and mark top articles as featured
    const transformedArticles = articles.map((article, index) => ({
      ...transformArticle(article),
      featured: index < 2 // Mark first 2 as featured
    }))
    
    return { articles: transformedArticles }
  } catch (error) {
    console.error('Error fetching featured articles from dev.to:', error)
    throw new Error('Failed to fetch featured articles')
  }
}

// Get related articles (for now, just get more articles)
export const getRelatedArticles = async (articleId) => {
  try {
    const response = await fetch(`${DEV_TO_API_BASE}/articles?per_page=3`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const articles = await response.json()
    
    // Filter out the current article and transform
    const transformedArticles = articles
      .filter(article => article.id.toString() !== articleId)
      .map(transformArticle)
    
    return { articles: transformedArticles }
  } catch (error) {
    console.error('Error fetching related articles from dev.to:', error)
    throw new Error('Failed to fetch related articles')
  }
}

// Like/unlike an article (local state management)
export const toggleArticleLike = async () => {
  try {
    // Since dev.to doesn't allow external likes, we'll simulate it
    // In a real app, you'd store this in your backend
    const isLiked = Math.random() > 0.5 // Simulate random like state
    
    return {
      likes: Math.floor(Math.random() * 100) + 10,
      isLiked
    }
  } catch (error) {
    console.error('Error toggling article like:', error)
    throw new Error('Failed to toggle article like')
  }
}

// Bookmark/unbookmark an article (local state management)
export const toggleArticleBookmark = async () => {
  try {
    // Simulate bookmark toggle
    const isBookmarked = Math.random() > 0.5
    
    return {
      isBookmarked
    }
  } catch (error) {
    console.error('Error toggling article bookmark:', error)
    throw new Error('Failed to toggle article bookmark')
  }
}

// Add a comment to an article (simulated)
export const addArticleComment = async (commentData) => {
  try {
    // Simulate adding a comment
    const newComment = {
      id: Date.now(),
      author: 'You',
      content: commentData.content,
      date: new Date().toISOString(),
      likes: 0,
      replies: 0
    }
    
    return { comment: newComment }
  } catch (error) {
    console.error('Error adding comment:', error)
    throw new Error('Failed to add comment')
  }
}

// Get article comments (simulated)
export const getArticleComments = async () => {
  try {
    // Simulate comments
    const comments = [
      {
        id: 1,
        author: 'John Doe',
        content: 'Great article! Very informative.',
        date: '2025-01-15',
        likes: 5,
        replies: 2
      },
      {
        id: 2,
        author: 'Jane Smith',
        content: 'Thanks for sharing this knowledge.',
        date: '2025-01-14',
        likes: 3,
        replies: 1
      }
    ]
    
    return { comments }
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw new Error('Failed to fetch comments')
  }
}

// Subscribe to newsletter (simulated)
export const subscribeToNewsletter = async (email) => {
  try {
    // Simulate newsletter subscription
    console.log('Newsletter subscription for:', email)
    
    return { success: true, message: 'Successfully subscribed to newsletter!' }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    throw new Error('Failed to subscribe to newsletter')
  }
}

// Increment article view count (simulated)
export const incrementArticleViews = async () => {
  try {
    // Simulate view increment
    console.log('Incrementing views for article')
    
    return { views: Math.floor(Math.random() * 1000) + 100 }
  } catch (error) {
    // Don't throw error for view increment as it's not critical
    console.warn('Failed to increment article views:', error)
  }
} 