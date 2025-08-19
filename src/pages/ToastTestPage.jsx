import React from 'react';
import styled from 'styled-components';
import { useToast } from '../contexts/ToastContext';

const TestContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const TestButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &.success {
    background: ${({ theme }) => theme.colors.success};
    color: white;
    
    &:hover {
      background: ${({ theme }) => theme.colors.successLight};
    }
  }
  
  &.error {
    background: ${({ theme }) => theme.colors.error};
    color: white;
    
    &:hover {
      background: ${({ theme }) => theme.colors.errorLight};
    }
  }
  
  &.warning {
    background: ${({ theme }) => theme.colors.warning};
    color: white;
    
    &:hover {
      background: ${({ theme }) => theme.colors.warningLight};
    }
  }
  
  &.info {
    background: ${({ theme }) => theme.colors.info};
    color: white;
    
    &:hover {
      background: ${({ theme }) => theme.colors.infoLight};
    }
  }
  
  &.primary {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;

const ToastTestPage = () => {
  const { success, error, warning, info } = useToast();

  const handleSuccessToast = () => {
    success('Operation completed successfully!', {
      title: 'Success',
      action: {
        label: 'View Details',
        onClick: () => console.log('View details clicked')
      }
    });
  };

  const handleErrorToast = () => {
    error('Something went wrong. Please try again.', {
      title: 'Error',
      duration: 8000
    });
  };

  const handleWarningToast = () => {
    warning('Please review your input before proceeding.', {
      title: 'Warning'
    });
  };

  const handleInfoToast = () => {
    info('This is an informational message.', {
      title: 'Information'
    });
  };

  const handleLongToast = () => {
    success('This is a very long toast message that demonstrates how the toast handles longer text content. It should wrap properly and still look good.', {
      title: 'Long Message Test',
      duration: 10000
    });
  };

  const handlePersistentToast = () => {
    success('This toast will stay until you close it manually.', {
      title: 'Persistent Toast',
      duration: Infinity
    });
  };

  const handleAuthSuccess = () => {
    success('Welcome back, John Doe!', {
      title: 'Login Successful'
    });
  };

  const handleAuthError = () => {
    error('Invalid email or password. Please try again.', {
      title: 'Login Failed'
    });
  };

  const handleCartAdd = () => {
    success('Wireless Headphones added to cart!', {
      title: 'Added to Cart',
      action: {
        label: 'View Cart',
        onClick: () => console.log('Navigate to cart')
      }
    });
  };

  const handleWishlistAdd = () => {
    success('Smart Watch added to wishlist!', {
      title: 'Added to Wishlist',
      action: {
        label: 'View Wishlist',
        onClick: () => console.log('Navigate to wishlist')
      }
    });
  };

  const handleCouponSuccess = () => {
    success('Coupon SAVE20 applied! 20% off', {
      title: 'Coupon Applied'
    });
  };

  const handleCouponError = () => {
    warning('Invalid or expired coupon code', {
      title: 'Invalid Coupon'
    });
  };

  const handleOrderSuccess = () => {
    success('Order #12345 placed successfully! You will receive a confirmation email shortly.', {
      title: 'Order Placed',
      action: {
        label: 'Track Order',
        onClick: () => console.log('Navigate to order tracking')
      }
    });
  };

  const handleNetworkError = () => {
    error('Network connection lost. Please check your internet connection and try again.', {
      title: 'Connection Error',
      duration: 10000
    });
  };

  return (
    <TestContainer>
      <h1>Toast Notification Test Page</h1>
      <p>Click the buttons below to test different types of toast notifications.</p>

      <Section>
        <SectionTitle>Basic Toast Types</SectionTitle>
        <ButtonGrid>
          <TestButton className="success" onClick={handleSuccessToast}>
            Success Toast
          </TestButton>
          <TestButton className="error" onClick={handleErrorToast}>
            Error Toast
          </TestButton>
          <TestButton className="warning" onClick={handleWarningToast}>
            Warning Toast
          </TestButton>
          <TestButton className="info" onClick={handleInfoToast}>
            Info Toast
          </TestButton>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>Special Toast Features</SectionTitle>
        <ButtonGrid>
          <TestButton className="primary" onClick={handleLongToast}>
            Long Message Toast
          </TestButton>
          <TestButton className="primary" onClick={handlePersistentToast}>
            Persistent Toast
          </TestButton>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>Authentication Toasts</SectionTitle>
        <ButtonGrid>
          <TestButton className="success" onClick={handleAuthSuccess}>
            Login Success
          </TestButton>
          <TestButton className="error" onClick={handleAuthError}>
            Login Error
          </TestButton>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>E-commerce Toasts</SectionTitle>
        <ButtonGrid>
          <TestButton className="success" onClick={handleCartAdd}>
            Add to Cart
          </TestButton>
          <TestButton className="success" onClick={handleWishlistAdd}>
            Add to Wishlist
          </TestButton>
          <TestButton className="success" onClick={handleCouponSuccess}>
            Coupon Applied
          </TestButton>
          <TestButton className="warning" onClick={handleCouponError}>
            Invalid Coupon
          </TestButton>
          <TestButton className="success" onClick={handleOrderSuccess}>
            Order Placed
          </TestButton>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>System Toasts</SectionTitle>
        <ButtonGrid>
          <TestButton className="error" onClick={handleNetworkError}>
            Network Error
          </TestButton>
        </ButtonGrid>
      </Section>
    </TestContainer>
  );
};

export default ToastTestPage; 