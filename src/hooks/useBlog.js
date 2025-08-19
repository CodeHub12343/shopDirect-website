import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getBlogArticles, 
  getBlogArticle, 
  getBlogCategories, 
  getBlogTags, 
  getFeaturedArticles,
  getRelatedArticles,
  toggleArticleLike,
  toggleArticleBookmark,
  addArticleComment,
  getArticleComments,
  subscribeToNewsletter,
  incrementArticleViews
} from '../services/apiBlog'

// Hook to get all blog articles with filters
export const useBlogArticles = (filters = {}) => {
  return useQuery({
    queryKey: ['blog-articles', filters],
    queryFn: () => getBlogArticles(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Hook to get a single blog article
export const useBlogArticle = (id) => {
  return useQuery({
    queryKey: ['blog-article', id],
    queryFn: () => getBlogArticle(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })
}

// Hook to get blog categories
export const useBlogCategories = () => {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: getBlogCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  })
}

// Hook to get blog tags
export const useBlogTags = () => {
  return useQuery({
    queryKey: ['blog-tags'],
    queryFn: getBlogTags,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  })
}

// Hook to get featured articles
export const useFeaturedArticles = () => {
  return useQuery({
    queryKey: ['blog-featured'],
    queryFn: getFeaturedArticles,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })
}

// Hook to get related articles
export const useRelatedArticles = (articleId) => {
  return useQuery({
    queryKey: ['blog-related', articleId],
    queryFn: () => getRelatedArticles(articleId),
    enabled: !!articleId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
  })
}

// Hook to get article comments
export const useArticleComments = (articleId) => {
  return useQuery({
    queryKey: ['blog-comments', articleId],
    queryFn: () => getArticleComments(articleId),
    enabled: !!articleId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to like/unlike an article
export const useToggleArticleLike = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: toggleArticleLike,
    onSuccess: (data, articleId) => {
      // Update the article in cache
      queryClient.setQueryData(['blog-article', articleId], (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          likes: data.likes,
          isLiked: data.isLiked
        }
      })
      
      // Update in articles list
      queryClient.setQueriesData(['blog-articles'], (oldData) => {
        if (!oldData?.articles) return oldData
        return {
          ...oldData,
          articles: oldData.articles.map(article => 
            article.id === articleId 
              ? { ...article, likes: data.likes, isLiked: data.isLiked }
              : article
          )
        }
      })
      
      // Update featured articles
      queryClient.setQueriesData(['blog-featured'], (oldData) => {
        if (!oldData?.articles) return oldData
        return {
          ...oldData,
          articles: oldData.articles.map(article => 
            article.id === articleId 
              ? { ...article, likes: data.likes, isLiked: data.isLiked }
              : article
          )
        }
      })
    }
  })
}

// Hook to bookmark/unbookmark an article
export const useToggleArticleBookmark = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: toggleArticleBookmark,
    onSuccess: (data, articleId) => {
      // Update the article in cache
      queryClient.setQueryData(['blog-article', articleId], (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          isBookmarked: data.isBookmarked
        }
      })
      
      // Update in articles list
      queryClient.setQueriesData(['blog-articles'], (oldData) => {
        if (!oldData?.articles) return oldData
        return {
          ...oldData,
          articles: oldData.articles.map(article => 
            article.id === articleId 
              ? { ...article, isBookmarked: data.isBookmarked }
              : article
          )
        }
      })
    }
  })
}

// Hook to add a comment
export const useAddComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ articleId, commentData }) => addArticleComment(articleId, commentData),
    onSuccess: (data, { articleId }) => {
      // Add the new comment to the comments list
      queryClient.setQueryData(['blog-comments', articleId], (oldData) => {
        if (!oldData?.comments) return oldData
        return {
          ...oldData,
          comments: [data.comment, ...oldData.comments]
        }
      })
      
      // Update article comment count
      queryClient.setQueryData(['blog-article', articleId], (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          comments: oldData.comments + 1
        }
      })
    }
  })
}

// Hook to subscribe to newsletter
export const useNewsletterSubscription = () => {
  return useMutation({
    mutationFn: subscribeToNewsletter,
  })
}

// Hook to increment article views
export const useIncrementViews = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: incrementArticleViews,
    onSuccess: (data, articleId) => {
      // Update view count in cache
      queryClient.setQueryData(['blog-article', articleId], (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          views: data.views
        }
      })
    }
  })
} 