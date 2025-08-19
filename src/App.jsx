import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { store } from './store'
import theme from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import PublicRoute from './components/common/PublicRoute'

// Pages
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage'
import CheckoutWrapper from './components/checkout/CheckoutWrapper'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import FlashDealsPage from './pages/FlashDealsPage'
import AboutUsPage from './pages/AboutUsPage'
import ContactUsPage from './pages/ContactUsPage'
import HelpCenterPage from './pages/HelpCenterPage'
import LoadingSpinnerShowcase from './pages/LoadingSpinnerShowcase'
import ThemeShowcase from './components/theme/ThemeShowcase'
import FontShowcase from './components/theme/FontShowcase'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ToastTestPage from './pages/ToastTestPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import AccountDashboardPage from './pages/AccountDashboardPage'
import AccountSettingsPage from './pages/AccountSettingsPage'
import OrderHistoryPage from './pages/OrderHistoryPage'
import WishlistPage from './pages/WishlistPage'
import OrderDetailsPage from './pages/OrderDetailsPage'

// Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <ToastProvider>
            <AuthProvider>
              <Router>
                <div className="App">
                  <Header />
                  <main>
                    <Routes>
                      {/* Public Routes - No Auth Required */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductPage />} />
                      <Route path="/product/:id" element={<ProductDetailsPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutWrapper />} />
                      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                      <Route path="/order-history" element={<OrderHistoryPage />} />
                      <Route path="/flash-deals" element={<FlashDealsPage />} />
                      <Route path="/about" element={<AboutUsPage />} />
                      <Route path="/contact" element={<ContactUsPage />} />
                      <Route path="/help" element={<HelpCenterPage />} />
                                          <Route path="/spinner" element={<LoadingSpinnerShowcase />} />
                    <Route path="/theme-showcase" element={<ThemeShowcase />} />
                    <Route path="/font-showcase" element={<FontShowcase />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:id" element={<BlogPostPage />} />
                    <Route path="/loading-showcase" element={<LoadingSpinnerShowcase />} />
                    <Route path="/toast-test" element={<ToastTestPage />} />
                      
                      {/* Auth Routes - Redirect if already logged in */}
                      <Route path="/login" element={
                        <PublicRoute>
                          <LoginPage />
                        </PublicRoute>
                      } />
                      <Route path="/signup" element={
                        <PublicRoute>
                          <SignUpPage />
                        </PublicRoute>
                      } />
                      
                      {/* Protected Routes - Require Authentication */}
                      <Route path="/account" element={
                        <ProtectedRoute>
                          <AccountDashboardPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/account/settings" element={
                        <ProtectedRoute>
                          <AccountSettingsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/orders" element={
                        <ProtectedRoute>
                          <OrderHistoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/orders/:id" element={
                        <ProtectedRoute>
                          <OrderDetailsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/wishlist" element={
                        <ProtectedRoute>
                          <WishlistPage />
                        </ProtectedRoute>
                      } />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Router>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
