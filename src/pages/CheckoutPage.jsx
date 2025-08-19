import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { clearCart } from '../store/slices/cartSlice'
import { useAuth } from '../contexts/AuthContext'
import { 
  FaCreditCard, 
  FaPaypal, 
  FaApple, 
  FaGoogle, 
  FaLock, 
  FaShieldAlt,
  FaTruck,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaEdit,
  FaCheck,
  FaTimes,
  FaExclamationTriangle
} from 'react-icons/fa'
import { formatPrice, getImageUrl } from '../services/apiUtils'
import LoadingSpinner, { ButtonLoadingSpinner } from '../components/common/LoadingSpinner'
import {
  CheckoutContainer,
  MainContent,
  ProgressBar,
  ProgressStep,
  ProgressDot,
  Section,
  SectionHeader,
  SectionTitle,
  FormGrid,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  Checkbox,
  ShippingMethods,
  ShippingMethod,
  PaymentMethods,
  PaymentMethod,
  PopularBadge,
  ErrorMessage,
  SuccessMessage,
  OrderSummary,
  SummaryTitle,
  CartItems,
  CartItem,
  ItemImage,
  ItemDetails,
  ItemName,
  ItemVariant,
  ItemPrice,
  SummaryRow,
  PromoSection,
  PromoInput,
  PromoButton,
  PlaceOrderButton,
  TrustBadges
} from '../components/checkout/CheckoutStyles'

// Stripe imports
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// API configuration
import { API_ENDPOINTS } from '../config/api';
import api from '../services/apiAuth';

// Mock data for demonstration
const SHIPPING_METHODS = {
  standard: { name: "Standard Shipping", cost: 5.99, days: "3-5 business days", estimated: "Aug 10-12" },
  express: { name: "Express Shipping", cost: 12.99, days: "1-2 business days", estimated: "Aug 8-9" },
  overnight: { name: "Overnight Shipping", cost: 24.99, days: "Next business day", estimated: "Aug 7" },
}

const PAYMENT_METHODS = {
  card: { name: "Credit/Debit Card", icon: FaCreditCard, popular: true },
  paypal: { name: "PayPal", icon: FaPaypal, popular: true },
  applePay: { name: "Apple Pay", icon: FaApple, popular: false },
  googlePay: { name: "Google Pay", icon: FaGoogle, popular: false },
}

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
]

const CheckoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart)
  const { isAuthenticated } = useAuth()
  const stripe = useStripe();
  const elements = useElements();
  
  // Form state
  const [formData, setFormData] = useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    deliveryInstructions: '',
    
    // Billing
    billingSameAsShipping: true,
    billingFirstName: '',
    billingLastName: '',
    billingAddress1: '',
    billingAddress2: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: 'US',
    
    // Payment
    paymentMethod: 'card',
    // Removed manual card fields; using CardElement now
    
    // Other
    promoCode: '',
    termsAccepted: false,
  })
  
  const [errors, setErrors] = useState({})
  const [promoMessage, setPromoMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
     const [currentStep] = useState(1)
  const [paymentError, setPaymentError] = useState(null)
  
  const steps = [
    { id: 1, name: 'Shipping', icon: FaTruck },
    { id: 2, name: 'Payment', icon: FaCreditCard },
    { id: 3, name: 'Review', icon: FaCheck },
  ]
  
  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }
  
  // Handle billing address toggle
  const handleBillingToggle = (checked) => {
    setFormData(prev => ({ 
      ...prev, 
      billingSameAsShipping: checked,
      billingFirstName: checked ? prev.firstName : '',
      billingLastName: checked ? prev.lastName : '',
      billingAddress1: checked ? prev.address1 : '',
      billingAddress2: checked ? prev.address2 : '',
      billingCity: checked ? prev.city : '',
      billingState: checked ? prev.state : '',
      billingZipCode: checked ? prev.zipCode : '',
      billingCountry: checked ? prev.country : 'US',
    }))
  }
  
  // Apply promo code
  const handleApplyPromo = () => {
    const validPromos = {
      'SAVE10': { discount: 10, message: '10% discount applied!' },
      'FREESHIP': { discount: 0, message: 'Free shipping applied!' },
      'WELCOME20': { discount: 20, message: '20% welcome discount applied!' },
    }
    
    const promo = validPromos[formData.promoCode.toUpperCase()]
    if (promo) {
      setPromoMessage(promo.message)
      // In a real app, you'd dispatch an action to apply the discount
    } else {
      setPromoMessage('Invalid promo code')
    }
  }
  
  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    // Required fields validation
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'address1', 'city', 'state', 'zipCode'
    ]
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      }
    })
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
         // Phone validation
     if (formData.phone && !/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
       newErrors.phone = 'Please enter a valid phone number'
     }
    
    // Terms acceptance
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Handle place order
  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return
    }
    
    setIsProcessing(true)
    setPaymentError(null)
    
    try {
      const shippingAddress = {
        address: formData.address1,
        city: formData.city,
        postalCode: formData.zipCode,
        country: formData.country,
      };

      const orderItemsData = cart.items.map(item => ({
        product: item.product._id, // Assume product has _id
        quantity: item.quantity,
        price: item.product.price,
        // Add variants if needed
      }));

             if (formData.paymentMethod === 'card') {
         // Create Payment Intent
         const response = await api.post(API_ENDPOINTS.CREATE_PAYMENT_INTENT, {
           amount: cart.totalAmount
         });
         const { clientSecret } = response.data;

        if (!clientSecret) {
          throw new Error('Failed to create payment intent');
        }

        // Confirm payment
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              address: {
                line1: formData.address1,
                city: formData.city,
                state: formData.state,
                postal_code: formData.zipCode,
                country: formData.country,
              },
            },
          },
        });

        if (stripeError) {
          throw new Error(stripeError.message);
        }

        if (paymentIntent.status === 'succeeded') {
          // Payment succeeded, now create order
          await createOrderOnBackend(orderItemsData, shippingAddress, paymentIntent.id);
        }
      } else {
        // For other methods, directly create order (implement as needed)
        await createOrderOnBackend(orderItemsData, shippingAddress);
      }
    } catch (error) {
      console.error('Payment error:', error);
      if (error.response?.status === 401) {
        setPaymentError('Please log in to continue with payment');
      } else if (error.response?.data?.message) {
        setPaymentError(error.response.data.message);
      } else {
        setPaymentError(error.message || 'Payment failed. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

          // Helper to create order on backend
    const createOrderOnBackend = async (orderItemsData, shippingAddress, stripePaymentIntentId = null) => {
      try {
        const response = await api.post(API_ENDPOINTS.ORDERS, {
          orderItems: orderItemsData,
          shippingAddress,
          paymentMethod: formData.paymentMethod,
          totalPrice: cart.totalAmount,
          stripePaymentIntentId,
        });

        if (response.data.status !== 'success') {
          throw new Error('Failed to create order');
        }

        // Build a lightweight order summary to pass to confirmation page
        const paymentMethodLabels = {
          card: 'Card',
          paypal: 'PayPal',
          applePay: 'Apple Pay',
          googlePay: 'Google Pay',
        };

        const shippingMethodKey = cart.shippingMethod || 'standard';
        const estimatedDaysMap = { standard: 4, express: 2, overnight: 1 };
        const estimatedDays = estimatedDaysMap[shippingMethodKey] ?? 4;
        const now = new Date();
        const estimatedDelivery = new Date(now.getTime() + estimatedDays * 24 * 60 * 60 * 1000);

        const orderSummary = {
          orderId: response?.data?.data?.order?._id || response?.data?.order?._id || response?.data?.data?._id,
          orderNumber: `ORD-${Date.now().toString().slice(-8)}`,
          orderDate: now.toISOString(),
          estimatedDelivery: estimatedDelivery.toISOString(),
          paymentMethod: paymentMethodLabels[formData.paymentMethod] || formData.paymentMethod,
          transactionId: stripePaymentIntentId || null,
          shippingAddress: {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            address: formData.address1,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: COUNTRIES.find(c => c.code === formData.country)?.name || formData.country,
          },
          billingAddress: (formData.billingSameAsShipping)
            ? {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                address: formData.address1,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                country: COUNTRIES.find(c => c.code === formData.country)?.name || formData.country,
              }
            : {
                name: `${formData.billingFirstName} ${formData.billingLastName}`.trim(),
                address: formData.billingAddress1,
                city: formData.billingCity,
                state: formData.billingState,
                zipCode: formData.billingZipCode,
                country: COUNTRIES.find(c => c.code === formData.billingCountry)?.name || formData.billingCountry,
              },
          items: cart.items.map((item) => ({
            id: item.product._id,
            name: item.product.name,
            variant: Object.keys(item.selectedVariants || {}).length > 0
              ? Object.entries(item.selectedVariants).map(([k, v]) => `${k}: ${v}`).join(', ')
              : undefined,
            quantity: item.quantity,
            price: item.product.price,
            image: getImageUrl(item.product.imageCover || item.product.images?.[0] || item.product.image),
          })),
          subtotal: cart.subtotal,
          shipping: cart.shippingCost,
          tax: cart.taxAmount,
          discount: cart.discountAmount,
          total: cart.totalAmount,
          loyaltyPoints: Math.round(cart.totalAmount || 0),
        };

        try {
          localStorage.setItem('lastOrder', JSON.stringify(orderSummary));
        } catch (storageError) {
          // Non-fatal: continue even if persisting to localStorage fails
          console.warn('Failed to persist order to localStorage:', storageError?.message || storageError);
        }

        dispatch(clearCart());
        navigate('/order-confirmation', { state: { order: orderSummary } });
      } catch (error) {
        console.error('Order creation error:', error);
        if (error.response?.status === 401) {
          throw new Error('Please log in to continue');
        } else if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error('Failed to create order. Please try again.');
        }
      }
    };
    
    // Calculate totals
  const subtotal = cart.subtotal
  const shippingCost = cart.shippingCost
  const taxAmount = cart.taxAmount
  const discountAmount = cart.discountAmount
  const total = cart.totalAmount
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Please log in to continue</h2>
        <p>You need to be logged in to complete your purchase.</p>
        <button onClick={() => navigate('/login')}>
          Log In
        </button>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart before proceeding to checkout.</p>
        <button onClick={() => navigate('/products')}>
          Continue Shopping
        </button>
      </div>
    )
  }
  console.log({
    cart,
    formData
  })
  
     return (
     <div>
        {/* Progress Bar */}
                 <ProgressBar>
           {steps.map((step) => (
            <ProgressStep 
              key={step.id}
              active={currentStep === step.id}
              completed={currentStep > step.id}
            >
              <ProgressDot 
                active={currentStep === step.id}
                completed={currentStep > step.id}
              >
                {currentStep > step.id ? <FaCheck /> : step.id}
              </ProgressDot>
              <span>{step.name}</span>
            </ProgressStep>
          ))}
        </ProgressBar>
        
        <CheckoutContainer>
          <MainContent>
            {/* Shipping Information */}
            <Section>
              <SectionHeader>
                <SectionTitle>
                  <FaMapMarkerAlt style={{ marginRight: '8px' }} />
                  Shipping Information
                </SectionTitle>
              </SectionHeader>
              
              <FormGrid>
                <FormGroup>
                  <Label>First Name *</Label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    error={errors.firstName}
                  />
                  {errors.firstName && <ErrorMessage><FaExclamationTriangle /> {errors.firstName}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <Label>Last Name *</Label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    error={errors.lastName}
                  />
                  {errors.lastName && <ErrorMessage><FaExclamationTriangle /> {errors.lastName}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <Label>Email Address *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    error={errors.email}
                  />
                  {errors.email && <ErrorMessage><FaExclamationTriangle /> {errors.email}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <Label>Phone Number *</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    error={errors.phone}
                  />
                  {errors.phone && <ErrorMessage><FaExclamationTriangle /> {errors.phone}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <Label>Address Line 1 *</Label>
                  <Input
                    type="text"
                    value={formData.address1}
                    onChange={(e) => handleInputChange('address1', e.target.value)}
                    placeholder="Street address"
                    error={errors.address1}
                  />
                  {errors.address1 && <ErrorMessage><FaExclamationTriangle /> {errors.address1}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <Label>Address Line 2</Label>
                  <Input
                    type="text"
                    value={formData.address2}
                    onChange={(e) => handleInputChange('address2', e.target.value)}
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>City *</Label>
                  <Input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter city"
                    error={errors.city}
                  />
                  {errors.city && <ErrorMessage><FaExclamationTriangle /> {errors.city}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <Label>State/Province *</Label>
                  <Input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="Enter state"
                    error={errors.state}
                  />
                  {errors.state && <ErrorMessage><FaExclamationTriangle /> {errors.state}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <Label>ZIP/Postal Code *</Label>
                  <Input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="Enter ZIP code"
                    error={errors.zipCode}
                  />
                  {errors.zipCode && <ErrorMessage><FaExclamationTriangle /> {errors.zipCode}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <Label>Country *</Label>
                  <Select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  >
                    {COUNTRIES.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                
                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <Label>Delivery Instructions</Label>
                  <TextArea
                    value={formData.deliveryInstructions}
                    onChange={(e) => handleInputChange('deliveryInstructions', e.target.value)}
                    placeholder="Special instructions for delivery (optional)"
                  />
                </FormGroup>
              </FormGrid>
            </Section>
            
            {/* Shipping Method */}
            <Section>
              <SectionHeader>
                <SectionTitle>
                  <FaTruck style={{ marginRight: '8px' }} />
                  Shipping Method
                </SectionTitle>
              </SectionHeader>
              
              <ShippingMethods>
                {Object.entries(SHIPPING_METHODS).map(([key, method]) => (
                  <ShippingMethod key={key} selected={cart.shippingMethod === key}>
                    <div>
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={key}
                        checked={cart.shippingMethod === key}
                        onChange={() => dispatch({ type: 'cart/updateShippingMethod', payload: key })}
                      />
                      <strong>{method.name}</strong>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '4px' }}>
                        {method.days} • Estimated delivery: {method.estimated}
                      </div>
                    </div>
                    <div style={{ fontWeight: 'bold' }}>
                      {method.cost === 0 ? 'Free' : `$${method.cost.toFixed(2)}`}
                    </div>
                  </ShippingMethod>
                ))}
              </ShippingMethods>
            </Section>
            
            {/* Billing Information */}
            <Section>
              <SectionHeader>
                <SectionTitle>
                  <FaUser style={{ marginRight: '8px' }} />
                  Billing Information
                </SectionTitle>
              </SectionHeader>
              
              <Checkbox>
                <input
                  type="checkbox"
                  checked={formData.billingSameAsShipping}
                  onChange={(e) => handleBillingToggle(e.target.checked)}
                />
                <span>Billing address same as shipping address</span>
              </Checkbox>
              
              {!formData.billingSameAsShipping && (
                <FormGrid style={{ marginTop: '1rem' }}>
                  <FormGroup>
                    <Label>Billing First Name</Label>
                    <Input
                      type="text"
                      value={formData.billingFirstName}
                      onChange={(e) => handleInputChange('billingFirstName', e.target.value)}
                      placeholder="Enter billing first name"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Billing Last Name</Label>
                    <Input
                      type="text"
                      value={formData.billingLastName}
                      onChange={(e) => handleInputChange('billingLastName', e.target.value)}
                      placeholder="Enter billing last name"
                    />
                  </FormGroup>
                  
                  <FormGroup style={{ gridColumn: '1 / -1' }}>
                    <Label>Billing Address</Label>
                    <Input
                      type="text"
                      value={formData.billingAddress1}
                      onChange={(e) => handleInputChange('billingAddress1', e.target.value)}
                      placeholder="Billing street address"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Billing City</Label>
                    <Input
                      type="text"
                      value={formData.billingCity}
                      onChange={(e) => handleInputChange('billingCity', e.target.value)}
                      placeholder="Billing city"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Billing State</Label>
                    <Input
                      type="text"
                      value={formData.billingState}
                      onChange={(e) => handleInputChange('billingState', e.target.value)}
                      placeholder="Billing state"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Billing ZIP Code</Label>
                    <Input
                      type="text"
                      value={formData.billingZipCode}
                      onChange={(e) => handleInputChange('billingZipCode', e.target.value)}
                      placeholder="Billing ZIP code"
                    />
                  </FormGroup>
                </FormGrid>
              )}
            </Section>
            
            {/* Payment Method */}
            <Section>
              <SectionHeader>
                <SectionTitle>
                  <FaCreditCard style={{ marginRight: '8px' }} />
                  Payment Method
                </SectionTitle>
              </SectionHeader>
              
              <PaymentMethods>
                {Object.entries(PAYMENT_METHODS).map(([key, method]) => (
                  <PaymentMethod key={key} selected={formData.paymentMethod === key}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={key}
                      checked={formData.paymentMethod === key}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    />
                    <method.icon />
                    <span>{method.name}</span>
                    {method.popular && <PopularBadge>Popular</PopularBadge>}
                  </PaymentMethod>
                ))}
              </PaymentMethods>
              
              {formData.paymentMethod === 'card' && (
                <FormGrid style={{ marginTop: '1rem' }}>
                  <FormGroup style={{ gridColumn: '1 / -1' }}>
                    <Label>Card Details *</Label>
                    <div style={{ border: '1px solid #d1d5db', padding: '12px', borderRadius: '4px' }}>
                      <CardElement 
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#424770',
                              '::placeholder': {
                                color: '#aab7c4',
                              },
                            },
                            invalid: {
                              color: '#9e2146',
                            },
                          },
                        }}
                      />
                    </div>
                  </FormGroup>
                </FormGrid>
              )}
              {paymentError && <ErrorMessage><FaExclamationTriangle /> {paymentError}</ErrorMessage>}
            </Section>
            
            {/* Terms and Conditions */}
            <Section>
              <Checkbox>
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                />
                <span>
                  I agree to the <a href="#" style={{ color: '#2563eb' }}>Terms and Conditions</a> and{' '}
                  <a href="#" style={{ color: '#2563eb' }}>Privacy Policy</a>
                </span>
              </Checkbox>
              {errors.termsAccepted && <ErrorMessage><FaExclamationTriangle /> {errors.termsAccepted}</ErrorMessage>}
            </Section>
          </MainContent>
          
          {/* Order Summary Sidebar */}
          <OrderSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            
            <CartItems>
              {cart.items.map((item, index) => (
                <CartItem key={index}>
                  <ItemImage 
                    src={getImageUrl(item.product.imageCover || item.product.images?.[0] || item.product.image)} 
                    alt={item.product.name} 
                  />
                  <ItemDetails>
                    <ItemName>{item.product.name}</ItemName>
                    {Object.keys(item.selectedVariants).length > 0 && (
                      <ItemVariant>
                        {Object.entries(item.selectedVariants).map(([key, value]) => 
                          `${key}: ${value}`
                        ).join(', ')}
                      </ItemVariant>
                    )}
                  </ItemDetails>
                  <ItemPrice>
                    {formatPrice(item.product.price)} × {item.quantity}
                  </ItemPrice>
                </CartItem>
              ))}
            </CartItems>
            
            <SummaryRow>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </SummaryRow>
            
            <SummaryRow>
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
            </SummaryRow>
            
            <SummaryRow>
              <span>Tax</span>
              <span>{formatPrice(taxAmount)}</span>
            </SummaryRow>
            
            {discountAmount > 0 && (
              <SummaryRow>
                <span>Discount</span>
                <span style={{ color: '#10b981' }}>-{formatPrice(discountAmount)}</span>
              </SummaryRow>
            )}
            
            <SummaryRow className="total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </SummaryRow>
            
            <PromoSection>
              <Label>Promo Code</Label>
              <PromoInput>
                <Input
                  type="text"
                  value={formData.promoCode}
                  onChange={(e) => handleInputChange('promoCode', e.target.value)}
                  placeholder="Enter promo code"
                />
                <PromoButton onClick={handleApplyPromo}>Apply</PromoButton>
              </PromoInput>
              {promoMessage && (
                <div style={{ 
                  marginTop: '8px', 
                  color: promoMessage.includes('Invalid') ? '#ef4444' : '#10b981' 
                }}>
                  {promoMessage}
                </div>
              )}
            </PromoSection>
            
            <PlaceOrderButton 
              onClick={handlePlaceOrder}
              disabled={isProcessing || cart.items.length === 0 || (formData.paymentMethod === 'card' && (!stripe || !elements))}
            >
              {isProcessing ? (
                <>
                  <ButtonLoadingSpinner />
                  Processing...
                </>
              ) : (
                `Place Order & Pay ${formatPrice(total)}`
              )}
            </PlaceOrderButton>
            
            <TrustBadges>
              <FaLock /> Secure Checkout
              <FaShieldAlt /> SSL Encrypted
              <FaCreditCard /> PCI Compliant
            </TrustBadges>
          </OrderSummary>
        </CheckoutContainer>
      </div>
  )
}

export default CheckoutPage