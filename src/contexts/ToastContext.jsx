import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext();

const initialState = {
  toasts: [],
};

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  CLEAR_TOASTS: 'CLEAR_TOASTS',
};

function toastReducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case actionTypes.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload),
      };
    case actionTypes.CLEAR_TOASTS:
      return {
        ...state,
        toasts: [],
      };
    default:
      return state;
  }
}

export function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = useCallback(({ type, message, title, duration = 5000, action }) => {
    const id = Date.now() + Math.random();
    const toast = {
      id,
      type,
      message,
      title,
      duration,
      action,
      createdAt: Date.now(),
    };

    dispatch({ type: actionTypes.ADD_TOAST, payload: toast });

    // Auto remove toast after duration
    if (duration !== Infinity) {
      setTimeout(() => {
        dispatch({ type: actionTypes.REMOVE_TOAST, payload: id });
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: actionTypes.REMOVE_TOAST, payload: id });
  }, []);

  const clearToasts = useCallback(() => {
    dispatch({ type: actionTypes.CLEAR_TOASTS });
  }, []);

  // Convenience methods for different toast types
  const success = useCallback((message, options = {}) => {
    return addToast({ type: 'success', message, ...options });
  }, [addToast]);

  const error = useCallback((message, options = {}) => {
    return addToast({ type: 'error', message, ...options });
  }, [addToast]);

  const warning = useCallback((message, options = {}) => {
    return addToast({ type: 'warning', message, ...options });
  }, [addToast]);

  const info = useCallback((message, options = {}) => {
    return addToast({ type: 'info', message, ...options });
  }, [addToast]);

  const value = {
    toasts: state.toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

// Toast Container Component
function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return createPortal(
    <ToastContainerWrapper>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={() => removeToast(toast.id)}
        />
      ))}
    </ToastContainerWrapper>,
    document.body
  );
}

const ToastContainerWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  width: 100%;
  
  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
`;

const ToastWrapper = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${({ type, theme }) => {
    switch (type) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      case 'info': return theme.colors.info;
      default: return theme.colors.primary.main;
    }
  }};
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  animation: slideIn 0.3s ease-out;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ type, theme }) => {
      switch (type) {
        case 'success': return theme.colors.success;
        case 'error': return theme.colors.error;
        case 'warning': return theme.colors.warning;
        case 'info': return theme.colors.info;
        default: return theme.colors.primary.main;
      }
    }};
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  &.exiting {
    animation: slideOut 0.3s ease-in forwards;
  }
`;

const ToastIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ type, theme }) => {
    switch (type) {
      case 'success': return theme.colors.success + '20';
      case 'error': return theme.colors.error + '20';
      case 'warning': return theme.colors.warning + '20';
      case 'info': return theme.colors.info + '20';
      default: return theme.colors.primary.main + '20';
    }
  }};
  color: ${({ type, theme }) => {
    switch (type) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      case 'info': return theme.colors.info;
      default: return theme.colors.primary.main;
    }
  }};
  flex-shrink: 0;
`;

const ToastContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ToastTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 4px;
`;

const ToastMessage = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.4;
`;

const ToastAction = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-top: 8px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.main + '10'};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${({ type, theme }) => {
    switch (type) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      case 'info': return theme.colors.info;
      default: return theme.colors.primary.main;
    }
  }};
  width: ${({ progress }) => progress}%;
  transition: width linear;
`;

function Toast({ toast, onRemove }) {
  const [isExiting, setIsExiting] = React.useState(false);
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    if (toast.duration === Infinity) return;

    const startTime = Date.now();
    const endTime = startTime + toast.duration;

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / toast.duration) * 100;
      setProgress(newProgress);

      if (remaining > 0) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [toast.duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove();
    }, 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={16} />;
      case 'error':
        return <XCircle size={16} />;
      case 'warning':
        return <AlertTriangle size={16} />;
      case 'info':
        return <Info size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  return (
    <ToastWrapper type={toast.type} className={isExiting ? 'exiting' : ''}>
      <ToastIcon type={toast.type}>
        {getIcon()}
      </ToastIcon>
      
      <ToastContent>
        {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
        <ToastMessage>{toast.message}</ToastMessage>
        {toast.action && (
          <ToastAction onClick={toast.action.onClick}>
            {toast.action.label}
          </ToastAction>
        )}
      </ToastContent>
      
      <CloseButton onClick={handleClose}>
        <X size={16} />
      </CloseButton>
      
      {toast.duration !== Infinity && (
        <ProgressBar type={toast.type} progress={progress} />
      )}
    </ToastWrapper>
  );
}

import styled from 'styled-components';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'react-feather'; 