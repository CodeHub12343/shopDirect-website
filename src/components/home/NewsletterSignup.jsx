import { useState } from 'react'
import styled from 'styled-components'
import { FaEnvelope, FaGift, FaArrowRight } from 'react-icons/fa'

const NewsletterSection = styled.section`
  padding: ${({ theme }) => theme.spacing[16]} 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: ${({ theme }) => theme.colors.textInverse};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing[8]};
  }
`

const NewsletterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[8]};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing[12]};
  }
`

const NewsletterInfo = styled.div`
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    text-align: left;
  }
`

const NewsletterTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  line-height: 1.2;
`

const NewsletterSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  opacity: 0.9;
  line-height: 1.6;
`

const IncentiveCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[4]};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`

const GiftIcon = styled(FaGift)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.secondary};
  flex-shrink: 0;
`

const IncentiveText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const NewsletterForm = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[6]};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const FormTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`

const InputGroup = styled.div`
  position: relative;
`

const EmailInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[4]};
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  transition: all ${({ theme }) => theme.transitions.fast};
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    background: rgba(255, 255, 255, 0.15);
  }

  &:invalid {
    border-color: ${({ theme }) => theme.colors.error};
  }
`

const EmailIcon = styled(FaEnvelope)`
  position: absolute;
  left: ${({ theme }) => theme.spacing[4]};
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`

const SubscribeButton = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textInverse};
  border: none;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: ${({ theme }) => theme.colors.secondaryDark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const ArrowIcon = styled(FaArrowRight)`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: transform ${({ theme }) => theme.transitions.fast};

  ${SubscribeButton}:hover & {
    transform: translateX(4px);
  }
`

const PrivacyNote = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  opacity: 0.7;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing[3]};
  line-height: 1.4;
`

const SuccessMessage = styled.div`
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing[4]};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing[4]};
  backdrop-filter: blur(10px);
`

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing[4]};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing[4]};
  backdrop-filter: blur(10px);
`

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email address' })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' })
      return
    }

    setIsSubmitting(true)
    setMessage({ type: '', text: '' })

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setMessage({ 
        type: 'success', 
        text: 'Thank you for subscribing! Check your email for your 10% discount code.' 
      })
      setEmail('')
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Something went wrong. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <NewsletterSection>
      <Container>
        <NewsletterContent>
          <NewsletterInfo>
            <NewsletterTitle>
              Stay Updated & Save Big!
            </NewsletterTitle>
            <NewsletterSubtitle>
              Subscribe to our newsletter and be the first to know about exclusive deals, 
              new arrivals, and special offers. Join thousands of satisfied customers 
              who never miss out on the best deals.
            </NewsletterSubtitle>
            
            <IncentiveCard>
              <GiftIcon />
              <IncentiveText>
                <strong>Get 10% Off Your First Purchase!</strong><br />
                Plus, receive early access to sales and exclusive member-only offers.
              </IncentiveText>
            </IncentiveCard>
          </NewsletterInfo>

          <NewsletterForm>
            <FormTitle>Subscribe Now</FormTitle>
            
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <EmailIcon />
                <EmailInput
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>

              <SubscribeButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                {!isSubmitting && <ArrowIcon />}
              </SubscribeButton>

              {message.type === 'success' && (
                <SuccessMessage>
                  {message.text}
                </SuccessMessage>
              )}

              {message.type === 'error' && (
                <ErrorMessage>
                  {message.text}
                </ErrorMessage>
              )}
            </Form>

            <PrivacyNote>
              By subscribing, you agree to receive marketing emails from us. 
              You can unsubscribe at any time. We respect your privacy and will 
              never share your email with third parties.
            </PrivacyNote>
          </NewsletterForm>
        </NewsletterContent>
      </Container>
    </NewsletterSection>
  )
}

export default NewsletterSignup 