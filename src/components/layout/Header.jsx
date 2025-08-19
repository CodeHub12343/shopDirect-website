import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, LogOut, Menu as MenuIcon, X as CloseIcon } from 'react-feather';
import { useAppSelector } from '../../store/hooks';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const HeaderContainer = styled.header`
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: none;
  align-items: center;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const IconButton = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  position: relative;
  transition: color 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  
  &.primary {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary.dark};
    }
  }
  
  &.secondary {
    color: ${({ theme }) => theme.colors.primary.main};
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: white;
    }
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.colors.error};
    color: white;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const MenuToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover { background: ${({ theme }) => theme.colors.surfaceHover}; }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  background: white;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  box-shadow: 0 8px 16px ${({ theme }) => theme.colors.shadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenuInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem 1rem;
  display: grid;
  gap: 0.75rem;
`;

const MobileLink = styled(Link)`
  display: block;
  padding: 0.75rem 0;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;
`;

const MobileSectionTitle = styled.div`
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const MobileActionButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 0;
  background: transparent;
  border: none;
  color: #b91c1c;
  font-weight: 500;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MobileIconButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  position: relative;
  transition: color 0.2s;
  padding: 0.25rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

function Header() {
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { isAuthenticated, user, logout } = useAuth();
  const { success, error: showError } = useToast();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      await logout();
      success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      showError('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const closeMobile = () => setIsMobileOpen(false);

  // Close mobile menu on route change for reliability on mobile navigation
  React.useEffect(() => {
    const handleRouteChange = () => setIsMobileOpen(false);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">ShopDirect</Logo>
        <RightGroup>
          <MobileIconButton to="/cart" aria-label="Cart">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && <Badge>{cartItems.length}</Badge>}
          </MobileIconButton>
          <MenuToggle aria-label={isMobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMobileOpen} onClick={() => setIsMobileOpen((o) => !o)}>
            {isMobileOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </MenuToggle>
        </RightGroup>
        
        <NavLinks>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/flash-deals">Flash Deals</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          
          
          <IconButton to="/cart">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && <Badge>{cartItems.length}</Badge>}
          </IconButton>
          
          <IconButton to="/wishlist">
            <Heart size={20} />
            {wishlistItems.length > 0 && <Badge>{wishlistItems.length}</Badge>}
          </IconButton>
          
          {isAuthenticated ? (
            <UserInfo>
              <UserName>Hi, {user?.name}</UserName>
              <IconButton to="/account">
                <User size={20} />
              </IconButton>
              <LogoutButton onClick={handleLogout} disabled={isLoggingOut}>
                <LogOut size={16} />
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </LogoutButton>
            </UserInfo>
          ) : (
            <AuthButtons>
              <AuthButton to="/login" className="secondary">
                Login
              </AuthButton>
              <AuthButton to="/signup" className="primary">
                Sign Up
              </AuthButton>
            </AuthButtons>
          )}
        </NavLinks>
      </Nav>

      <MobileMenu $open={isMobileOpen}>
        <MobileMenuInner>
          <MobileLink to="/" onClick={closeMobile}>Home</MobileLink>
          <MobileLink to="/blog" onClick={closeMobile}>Blog</MobileLink>
          <MobileLink to="/products" onClick={closeMobile}>Products</MobileLink>
          <MobileLink to="/flash-deals" onClick={closeMobile}>Flash Deals</MobileLink>
          <MobileLink to="/about" onClick={closeMobile}>About</MobileLink>
          <MobileLink to="/contact" onClick={closeMobile}>Contact</MobileLink>

          <MobileSectionTitle>Account</MobileSectionTitle>
          {isAuthenticated ? (
            <>
              <MobileLink to="/account" onClick={closeMobile}>Account</MobileLink>
              <MobileActionButton
                type="button"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMobileOpen(false);
                  await handleLogout();
                }}
                disabled={isLoggingOut}
                aria-busy={isLoggingOut}
              >
                {isLoggingOut ? 'Logging out…' : 'Logout'}
              </MobileActionButton>
            </>
          ) : (
            <>
              <MobileLink to="/login" onClick={closeMobile}>Login</MobileLink>
              <MobileLink to="/signup" onClick={closeMobile}>Sign Up</MobileLink>
            </>
          )}

          <MobileSectionTitle>Shortcuts</MobileSectionTitle>
          <MobileLink to="/cart" onClick={closeMobile}>Cart{cartItems.length > 0 ? ` (${cartItems.length})` : ''}</MobileLink>
          <MobileLink to="/wishlist" onClick={closeMobile}>Wishlist{wishlistItems.length > 0 ? ` (${wishlistItems.length})` : ''}</MobileLink>
        </MobileMenuInner>
      </MobileMenu>
    </HeaderContainer>
  );
}

export default Header; 