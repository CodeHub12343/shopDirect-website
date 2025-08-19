# ShopHub - E-Commerce Home Page

A modern, responsive e-commerce home page built with React, styled-components, and React Query. This project showcases a complete landing page with all the essential sections for a successful online store.

## 🚀 Features

### 🎯 Core Sections

- **Hero Banner**: Auto-playing slider with navigation controls and promotional content
- **Featured Categories**: Grid layout showcasing product categories with hover effects
- **Promotional Blocks**: Highlighted offers with countdown timers and call-to-action buttons
- **Featured Products**: Horizontal carousel with product cards and quick actions
- **New Arrivals**: Grid display of recently added products with "Just In" badges
- **Best Sellers**: Top-rated products with ranking system and social proof
- **Flash Deals**: Limited-time offers with countdown timers and stock indicators
- **Testimonials**: Customer reviews carousel with trust badges
- **Newsletter Signup**: Lead capture form with incentive offers

### 🎨 Design Features

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Interactive Elements**: Hover effects, micro-interactions, and smooth transitions
- **Accessibility**: ARIA labels, keyboard navigation, and focus management
- **Performance**: Optimized images, lazy loading, and efficient state management

### 🔧 Technical Features

- **React Query**: Global state management for API data
- **Styled Components**: CSS-in-JS with theme system
- **React Router**: Client-side routing
- **React Icons**: Comprehensive icon library
- **Axios**: HTTP client for API communication
- **Framer Motion**: Advanced animations (ready for implementation)

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Styled Components
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Backend Integration**: RESTful API with Node.js/Express

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-ecmmerce-client-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install additional dependencies** (if not already installed)

   ```bash
   npm install @tanstack/react-query styled-components react-router-dom react-icons framer-motion axios
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔗 Backend Integration

This frontend is designed to work with the provided Node.js e-commerce backend. The backend should be running on `http://localhost:5000` with the following API endpoints:

- `GET /api/v4/products` - Fetch products
- `GET /api/v4/categories` - Fetch categories
- `GET /api/v4/products/top-rated-products` - Fetch top-rated products
- `POST /api/v4/users/sign-up` - User registration
- `POST /api/v4/users/login` - User authentication

## 📁 Project Structure

```
src/
├── components/
│   ├── home/
│   │   ├── HeroBanner.jsx
│   │   ├── FeaturedCategories.jsx
│   │   ├── PromotionalBlocks.jsx
│   │   ├── FeaturedProducts.jsx
│   │   ├── NewArrivals.jsx
│   │   ├── BestSellers.jsx
│   │   ├── FlashDeals.jsx
│   │   ├── Testimonials.jsx
│   │   └── NewsletterSignup.jsx
│   └── layout/
│       ├── Header.jsx
│       └── Footer.jsx
├── pages/
│   └── HomePage.jsx
├── services/
│   └── api.js
├── styles/
│   ├── GlobalStyles.js
│   └── theme.js
├── App.jsx
└── main.jsx
```

## 🎨 Theme System

The project uses a comprehensive theme system with:

- **Colors**: Primary, secondary, success, error, and neutral color palettes
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale
- **Breakpoints**: Responsive design breakpoints
- **Shadows**: Elevation and depth system
- **Transitions**: Animation timing functions

## 🔄 State Management

React Query is used for:

- **Server State**: API data fetching and caching
- **Loading States**: Automatic loading indicators
- **Error Handling**: Global error management
- **Optimistic Updates**: Immediate UI updates
- **Background Refetching**: Keeping data fresh

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Image Optimization**: Responsive images with proper sizing
- **Lazy Loading**: Components loaded on demand
- **Caching**: React Query caching for API responses
- **Bundle Optimization**: Tree shaking and dead code elimination

## 🧪 Testing

To run tests (when implemented):

```bash
npm test
```

## 📦 Building for Production

```bash
npm run build
```

## 🌟 Key Features Explained

### Hero Banner

- Auto-playing slider with 5-second intervals
- Manual navigation with arrows and dots
- Play/pause functionality
- Responsive design with mobile optimization

### Product Carousels

- Smooth horizontal scrolling
- Navigation arrows and dot indicators
- Touch/swipe support for mobile
- Infinite loop functionality

### Flash Deals

- Real-time countdown timers
- Stock level indicators
- Progress bars showing deal popularity
- Urgency-driven design elements

### Newsletter Signup

- Email validation
- Success/error messaging
- Incentive-based conversion
- Privacy compliance

## 🔧 Customization

### Adding New Sections

1. Create a new component in `src/components/home/`
2. Import and add to `HomePage.jsx`
3. Style using the theme system

### Modifying the Theme

Edit `src/styles/theme.js` to customize:

- Colors
- Typography
- Spacing
- Breakpoints

### API Integration

Update `src/services/api.js` to connect to your backend endpoints.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🎯 Roadmap

- [ ] Product detail pages
- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Checkout process
- [ ] Admin dashboard
- [ ] Advanced filtering
- [ ] Wishlist functionality
- [ ] Product reviews
- [ ] Search functionality
- [ ] Multi-language support

---

**Built with ❤️ using React and modern web technologies**
