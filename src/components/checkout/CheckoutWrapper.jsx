import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../config/stripe';
import CheckoutPage from '../../pages/CheckoutPage';

const CheckoutWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
};

export default CheckoutWrapper; 