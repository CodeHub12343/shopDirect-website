/* // Mock data for blog system - fallback when API is not available
export const mockBlogData = {
  // Mock articles response
  articles: {
    articles: [
      {
        id: 'article-1',
        title: "How to Build a Capsule Wardrobe: A Complete Guide",
        excerpt: "Learn the art of creating a versatile, minimalist wardrobe that works for every occasion.",
        image: "https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        author: "Emma Davis",
        date: "2025-01-10",
        readTime: "10 min read",
        views: 5678,
        likes: 234,
        comments: 45,
        category: "guides",
        tags: ["Capsule Wardrobe", "Minimalism", "Style Guide"],
        isLiked: false,
        isBookmarked: false
      },
      {
        id: 'article-2',
        title: "The Rise of Athleisure: Comfort Meets Style",
        excerpt: "Explore how athletic wear has evolved into everyday fashion and how to style it perfectly.",
        image: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        author: "Alex Rodriguez",
        date: "2025-01-08",
        readTime: "7 min read",
        views: 4321,
        likes: 189,
        comments: 32,
        category: "trends",
        tags: ["Athleisure", "Activewear", "Fashion Trends"],
        isLiked: false,
        isBookmarked: false
      }
    ],
    totalPages: 1,
    currentPage: 1,
    totalArticles: 2
  },

  // Mock featured articles
  featured: {
    articles: [
      {
        id: 'featured-1',
        title: "The Ultimate Guide to Sustainable Fashion in 2025",
        excerpt: "Discover how to build an eco-friendly wardrobe that's both stylish and environmentally conscious.",
        image: "https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        author: "Sarah Johnson",
        date: "2025-01-15",
        readTime: "8 min read",
        views: 12450,
        likes: 892,
        comments: 156,
        category: "guides",
        tags: ["Sustainable Fashion", "Eco-Friendly", "Fashion Tips"],
        featured: true,
        isLiked: false,
        isBookmarked: false
      },
      {
        id: 'featured-2',
        title: "Top 10 Must-Have Accessories for Spring 2025",
        excerpt: "From statement jewelry to practical bags, here are the accessories that will elevate your spring wardrobe.",
        image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        author: "Michael Chen",
        date: "2025-01-12",
        readTime: "6 min read",
        views: 9876,
        likes: 654,
        comments: 89,
        category: "trends",
        tags: ["Accessories", "Spring Trends", "Style Guide"],
        featured: true,
        isLiked: false,
        isBookmarked: false
      }
    ]
  },

  // Mock categories
  categories: {
    categories: [
      { id: 'all', name: 'All Articles', icon: 'FaNewspaper', count: 4 },
      { id: 'guides', name: 'Buying Guides', icon: 'FaGraduationCap', count: 2 },
      { id: 'trends', name: 'Trends & Fashion', icon: 'FaChartLine', count: 2 },
      { id: 'tips', name: 'Tips & Tricks', icon: 'FaLightbulb', count: 0 },
      { id: 'reviews', name: 'Product Reviews', icon: 'FaStar', count: 0 }
    ]
  },

  // Mock tags
  tags: {
    tags: [
      'Summer Trends 2025', 'Eco-Friendly', 'New Arrivals', 'Fashion Tips', 
      'Product Care', 'Style Guide', 'Sustainable Fashion', 'Accessories',
      'Footwear', 'Outerwear', 'Activewear', 'Formal Wear'
    ]
  },

  // Mock individual article
  article: {
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
    isLiked: false,
    isBookmarked: false
  },

  // Mock related articles
  related: {
    articles: [
      {
        id: 'featured-2',
        title: "Top 10 Must-Have Accessories for Spring 2025",
        excerpt: "From statement jewelry to practical bags, here are the accessories that will elevate your spring wardrobe.",
        image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        author: "Michael Chen",
        date: "2025-01-12",
        readTime: "6 min read",
        views: 9876,
        likes: 654,
        comments: 89,
        category: "trends",
        tags: ["Accessories", "Spring Trends", "Style Guide"]
      }
    ]
  },

  // Mock comments
  comments: {
    comments: [
      {
        id: 1,
        author: 'Emma Davis',
        content: 'This article is incredibly helpful! I\'ve been looking for ways to make my wardrobe more sustainable.',
        date: '2025-01-16',
        likes: 12,
        replies: 3
      },
      {
        id: 2,
        author: 'Alex Rodriguez',
        content: 'Great tips on sustainable fashion. I especially liked the section about caring for clothing.',
        date: '2025-01-15',
        likes: 8,
        replies: 1
      }
    ]
  }
}  */