import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../contexts/ToastContext';

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

// Custom hook for cart actions with toast notifications
export const useCart = () => {
  const dispatch = useAppDispatch();
  const { success, info, warning } = useToast();
  const cart = useAppSelector((state) => state.cart);

  const addToCart = (product, quantity = 1, selectedVariants = {}) => {
    dispatch({
      type: 'cart/addToCart',
      payload: { product, quantity, selectedVariants }
    });
    
    success(`${product.name} added to cart!`, {
      title: 'Added to Cart',
      action: {
        label: 'View Cart',
        onClick: () => {
          // You can add navigation logic here
          console.log('Navigate to cart');
        }
      }
    });
  };

  const removeFromCart = (itemId) => {
    const item = cart.items.find(item => item.id === itemId);
    dispatch({
      type: 'cart/removeFromCart',
      payload: itemId
    });
    
    if (item) {
      info(`${item.product.name} removed from cart`);
    }
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({
      type: 'cart/updateQuantity',
      payload: { itemId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'cart/clearCart' });
    warning('Cart cleared');
  };

  const applyCoupon = (couponCode) => {
    const result = dispatch({
      type: 'cart/applyCoupon',
      payload: couponCode
    });
    
    if (result.success) {
      success(result.message, { title: 'Coupon Applied' });
    } else {
      warning(result.message, { title: 'Invalid Coupon' });
    }
  };

  const removeCoupon = () => {
    dispatch({ type: 'cart/removeCoupon' });
    info('Coupon removed');
  };

  const updateShippingMethod = (method) => {
    dispatch({
      type: 'cart/updateShippingMethod',
      payload: method
    });
  };

  const toggleCart = () => {
    dispatch({ type: 'cart/toggleCart' });
  };

  const openCart = () => {
    dispatch({ type: 'cart/openCart' });
  };

  const closeCart = () => {
    dispatch({ type: 'cart/closeCart' });
  };

  const moveToWishlist = (itemId) => {
    const item = cart.items.find(item => item.id === itemId);
    dispatch({
      type: 'cart/moveToWishlist',
      payload: itemId
    });
    
    if (item) {
      info(`${item.product.name} moved to wishlist`);
    }
  };

  return {
    ...cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    updateShippingMethod,
    toggleCart,
    openCart,
    closeCart,
    moveToWishlist,
  };
};

// Custom hook for wishlist actions with toast notifications
export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { success, info, warning } = useToast();
  const wishlist = useAppSelector((state) => state.wishlist);

  const addToWishlist = (product) => {
    const existingItem = wishlist.items.find((item) => item._id === product._id);
    
    if (!existingItem) {
      dispatch({
        type: 'wishlist/addToWishlist',
        payload: product
      });
      
      success(`${product.name} added to wishlist!`, {
        title: 'Added to Wishlist',
        action: {
          label: 'View Wishlist',
          onClick: () => {
            console.log('Navigate to wishlist');
          }
        }
      });
    } else {
      info(`${product.name} is already in your wishlist`);
    }
  };

  const removeFromWishlist = (productId) => {
    const item = wishlist.items.find(item => item._id === productId);
    dispatch({
      type: 'wishlist/removeFromWishlist',
      payload: productId
    });
    
    if (item) {
      info(`${item.name} removed from wishlist`);
    }
  };

  const clearWishlist = () => {
    dispatch({ type: 'wishlist/clearWishlist' });
    warning('Wishlist cleared');
  };

  const toggleWishlist = () => {
    dispatch({ type: 'wishlist/toggleWishlist' });
  };

  const openWishlist = () => {
    dispatch({ type: 'wishlist/openWishlist' });
  };

  const closeWishlist = () => {
    dispatch({ type: 'wishlist/closeWishlist' });
  };

  return {
    ...wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    toggleWishlist,
    openWishlist,
    closeWishlist,
  };
};
