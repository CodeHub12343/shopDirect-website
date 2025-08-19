import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube,
  FaCreditCard,
  FaShieldAlt,
  FaTruck,
  FaHeadset,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa'

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.gray900};
  color: ${({ theme }) => theme.colors.textInverse};
  padding: ${({ theme }) => theme.spacing[16]} 0 ${({ theme }) => theme.spacing[8]};
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing[8]};
  }
`

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[8]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const FooterSection = styled.div``

const FooterTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.textInverse};
`

const FooterList = styled.ul`
  list-style: none;
`

const FooterListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray400};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.textInverse};
  }
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`

const ContactIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`

const NewsletterSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing[6]};
  padding-top: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray700};
`

const NewsletterTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  text-align: center;
`

const NewsletterText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray400};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`

const NewsletterForm = styled.form`
  display: flex;
  max-width: 400px;
  margin: 0 auto;
  gap: ${({ theme }) => theme.spacing[2]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`

const NewsletterInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.gray600};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.gray800};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const NewsletterButton = styled.button`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`

const SocialSection = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[6]};
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.gray800};
  color: ${({ theme }) => theme.colors.gray400};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
    transform: translateY(-2px);
  }
`

const BottomFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing[8]};
  padding-top: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray700};
  text-align: center;
`

const BottomFooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`

const PaymentMethods = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`

const PaymentIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`

const TrustBadges = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup')
  }

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <FooterTitle>ShopHub</FooterTitle>
            <p style={{ color: '#9ca3af', marginBottom: '1rem', fontSize: '0.875rem' }}>
              Your one-stop destination for quality products. We offer the best deals, 
              fastest shipping, and exceptional customer service.
            </p>
            <ContactItem>
              <ContactIcon>
                <FaMapMarkerAlt />
              </ContactIcon>
              <span>123 Commerce St, Business City, BC 12345</span>
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FaPhone />
              </ContactIcon>
              <span>+1 (555) 123-4567</span>
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FaEnvelope />
              </ContactIcon>
              <span>support@shophub.com</span>
            </ContactItem>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink to="/">Home</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/products">Products</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/categories">Categories</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/deals">Deals</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/about">About Us</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/contact">Contact</FooterLink>
              </FooterListItem>
            </FooterList>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Customer Service</FooterTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink to="/help">Help Center</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/shipping">Shipping Info</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/returns">Returns & Exchanges</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/size-guide">Size Guide</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/track-order">Track Order</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/faq">FAQ</FooterLink>
              </FooterListItem>
            </FooterList>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Legal</FooterTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/terms">Terms of Service</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/refund">Refund Policy</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/shipping-policy">Shipping Policy</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/cookies">Cookie Policy</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/accessibility">Accessibility</FooterLink>
              </FooterListItem>
            </FooterList>
          </FooterSection>
        </FooterGrid>

        <NewsletterSection>
          <NewsletterTitle>Stay Updated</NewsletterTitle>
          <NewsletterText>
            Subscribe to our newsletter for exclusive deals, new arrivals, and updates.
          </NewsletterText>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <NewsletterInput
              type="email"
              placeholder="Enter your email address"
              required
            />
            <NewsletterButton type="submit">Subscribe</NewsletterButton>
          </NewsletterForm>
        </NewsletterSection>

        <SocialSection>
          <SocialLink href="#" aria-label="Facebook">
            <FaFacebook />
          </SocialLink>
          <SocialLink href="#" aria-label="Twitter">
            <FaTwitter />
          </SocialLink>
          <SocialLink href="#" aria-label="Instagram">
            <FaInstagram />
          </SocialLink>
          <SocialLink href="#" aria-label="LinkedIn">
            <FaLinkedin />
          </SocialLink>
          <SocialLink href="#" aria-label="YouTube">
            <FaYoutube />
          </SocialLink>
        </SocialSection>

        <BottomFooter>
          <BottomFooterContent>
            <Copyright>
              © 2024 ShopHub. All rights reserved.
            </Copyright>
            <PaymentMethods>
              <span>We Accept:</span>
              <PaymentIcon>
                <FaCreditCard />
              </PaymentIcon>
            </PaymentMethods>
            <TrustBadges>
              <TrustBadge>
                <FaShieldAlt />
                <span>SSL Secure</span>
              </TrustBadge>
              <TrustBadge>
                <FaTruck />
                <span>Fast Shipping</span>
              </TrustBadge>
              <TrustBadge>
                <FaHeadset />
                <span>24/7 Support</span>
              </TrustBadge>
            </TrustBadges>
          </BottomFooterContent>
        </BottomFooter>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer 