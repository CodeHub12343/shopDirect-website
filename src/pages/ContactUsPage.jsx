import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock, 
  FaQuestionCircle,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaUser,
  FaFileAlt,
  FaShieldAlt,
  FaHeadset,
  FaGlobe,
  FaArrowRight
} from 'react-icons/fa'

// Mock data for the Contact Us page
const CONTACT_DATA = {
  hero: {
    title: "Get in Touch with Us",
    subtitle: "We're here to help! Reach out to us via the form below or contact us directly using the details provided.",
    responseTime: "Our support team replies within 24 hours (Mon–Fri)."
  },
  contactInfo: {
    email: "support@shophub.com",
    phone: "+1 (800) 123-4567",
    whatsapp: "+1 (800) 123-4567",
    address: "123 Commerce Street, Tech City, TC 12345, United States",
    coordinates: { lat: 40.7128, lng: -74.0060 }, // New York coordinates
    businessHours: {
      weekdays: "Monday - Friday: 9:00 AM - 6:00 PM (EST)",
      weekend: "Saturday: 10:00 AM - 4:00 PM (EST)",
      sunday: "Sunday: Closed",
      holidays: "Closed on major holidays"
    }
  },
  subjects: [
    "Order Inquiry",
    "Returns & Refunds",
    "Technical Support",
    "Product Information",
    "Shipping & Delivery",
    "Account Issues",
    "Partnership Opportunities",
    "Other"
  ],
  faqLinks: [
    { title: "Track Your Order", link: "/help/track-order" },
    { title: "Return & Refund Policy", link: "/help/returns" },
    { title: "Shipping Information", link: "/help/shipping" },
    { title: "Payment Methods", link: "/help/payment" },
    { title: "Account Management", link: "/help/account" },
    { title: "Product Warranty", link: "/help/warranty" }
  ],
  socialMedia: {
    facebook: "https://facebook.com/shopHub",
    twitter: "https://twitter.com/shopHub",
    instagram: "https://instagram.com/shopHub",
    linkedin: "https://linkedin.com/company/shopHub"
  },
  trustElements: [
    "24/7 Customer Support",
    "Verified Help Desk",
    "SSL Secure",
    "GDPR Compliant"
  ]
}

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  }
`

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const ResponseTime = styled.div`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: inline-block;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const ContactFormSection = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`

const FormTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
`

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }
  
  &.error {
    border-color: ${({ theme }) => theme.colors.error};
  }
`

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  background: white;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }
`

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: ${({ theme }) => theme.transitions.base};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }
`

const FileInput = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`

const FileInputButton = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px dashed ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.gray[50]};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    background: ${({ theme }) => theme.colors.primary.main}10;
  }
`

const HiddenFileInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.gray[400]};
    cursor: not-allowed;
    transform: none;
  }
`

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const SuccessMessage = styled.div`
  background: ${({ theme }) => theme.colors.success}20;
  color: ${({ theme }) => theme.colors.success};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.success};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ContactInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const ContactCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`

const ContactCardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
  }
`

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const ContactDetails = styled.div`
  flex: 1;
`

const ContactLabel = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const ContactValue = styled.a`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  &:hover {
    text-decoration: underline;
  }
`

const MapContainer = styled.div`
  height: 300px;
  background: ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const MapPlaceholder = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const GetDirectionsButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`

const BusinessHours = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const HoursItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  
  &:last-child {
    border-bottom: none;
  }
`

const HoursDay = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`

const HoursTime = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const FAQSection = styled.div`
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const FAQTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
`

const FAQLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`

const FAQLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`

const HelpCenterButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing.lg} auto 0;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-1px);
  }
`

const TrustSection = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`

const TrustTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-2px);
  }
`

const ContactUsPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    attachment: null
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileName, setFileName] = useState('')

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        attachment: file
      }))
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate ticket ID
      const ticketId = 'TKT-' + Date.now().toString().slice(-6)
      
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        attachment: null
      })
      setFileName('')
      
      // Show success message with ticket ID
      alert(`Thank you for your message! Your ticket ID is: ${ticketId}. We'll get back to you within 24 hours.`)
      
    } catch (error) {
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGetDirections = () => {
    const { lat, lng } = CONTACT_DATA.contactInfo.coordinates
    const address = encodeURIComponent(CONTACT_DATA.contactInfo.address)
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${address}`, '_blank')
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi! I need help with my order.")
    window.open(`https://wa.me/${CONTACT_DATA.contactInfo.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank')
  }

  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroTitle>{CONTACT_DATA.hero.title}</HeroTitle>
        <HeroSubtitle>{CONTACT_DATA.hero.subtitle}</HeroSubtitle>
        <ResponseTime>{CONTACT_DATA.hero.responseTime}</ResponseTime>
      </HeroSection>

      {/* Main Content */}
      <MainContent>
        {/* Contact Form */}
        <ContactFormSection>
          <FormTitle>Send us a Message</FormTitle>
          
          {isSubmitted && (
            <SuccessMessage>
              <FaCheck />
              Your message has been sent successfully! We'll get back to you soon.
            </SuccessMessage>
          )}
          
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <ErrorMessage>
                    <FaTimes />
                    {errors.name}
                  </ErrorMessage>
                )}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <ErrorMessage>
                    <FaTimes />
                    {errors.email}
                  </ErrorMessage>
                )}
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="subject">Subject *</Label>
                <Select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={errors.subject ? 'error' : ''}
                >
                  <option value="">Select a subject</option>
                  {CONTACT_DATA.subjects.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
                </Select>
                {errors.subject && (
                  <ErrorMessage>
                    <FaTimes />
                    {errors.subject}
                  </ErrorMessage>
                )}
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <Label htmlFor="message">Message *</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={errors.message ? 'error' : ''}
                placeholder="Tell us how we can help you..."
              />
              {errors.message && (
                <ErrorMessage>
                  <FaTimes />
                  {errors.message}
                </ErrorMessage>
              )}
            </FormGroup>
            
            <FormGroup>
              <Label>Attachment (Optional)</Label>
              <FileInput>
                <FileInputButton>
                  <FaFileAlt />
                  {fileName || 'Choose file (PDF, JPG, PNG up to 5MB)'}
                </FileInputButton>
                <HiddenFileInput
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
              </FileInput>
            </FormGroup>
            
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div style={{ width: '16px', height: '16px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </SubmitButton>
          </Form>
        </ContactFormSection>

        {/* Contact Information */}
        <ContactInfoSection>
          {/* Direct Contact */}
          <ContactCard>
            <ContactCardTitle>
              <FaHeadset />
              Get in Touch
            </ContactCardTitle>
            
            <ContactItem>
              <ContactIcon>
                <FaEnvelope />
              </ContactIcon>
              <ContactDetails>
                <ContactLabel>Email</ContactLabel>
                <ContactValue href={`mailto:${CONTACT_DATA.contactInfo.email}`}>
                  {CONTACT_DATA.contactInfo.email}
                </ContactValue>
              </ContactDetails>
            </ContactItem>
            
            <ContactItem>
              <ContactIcon>
                <FaPhone />
              </ContactIcon>
              <ContactDetails>
                <ContactLabel>Phone</ContactLabel>
                <ContactValue href={`tel:${CONTACT_DATA.contactInfo.phone}`}>
                  {CONTACT_DATA.contactInfo.phone}
                </ContactValue>
              </ContactDetails>
            </ContactItem>
            
            <ContactItem>
              <ContactIcon>
                <FaWhatsapp />
              </ContactIcon>
              <ContactDetails>
                <ContactLabel>WhatsApp</ContactLabel>
                <ContactValue onClick={handleWhatsApp} style={{ cursor: 'pointer' }}>
                  {CONTACT_DATA.contactInfo.whatsapp}
                </ContactValue>
              </ContactDetails>
            </ContactItem>
          </ContactCard>

          {/* Location */}
          <ContactCard>
            <ContactCardTitle>
              <FaMapMarkerAlt />
              Our Location
            </ContactCardTitle>
            
            <MapContainer>
              <MapPlaceholder>
                <FaMapMarkerAlt style={{ fontSize: '3rem', marginBottom: '1rem', color: '#6b7280' }} />
                <div>Interactive Map</div>
                <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  {CONTACT_DATA.contactInfo.address}
                </div>
              </MapPlaceholder>
            </MapContainer>
            
            <GetDirectionsButton onClick={handleGetDirections}>
              <FaMapMarkerAlt />
              Get Directions
            </GetDirectionsButton>
          </ContactCard>

          {/* Business Hours */}
          <ContactCard>
            <ContactCardTitle>
              <FaClock />
              Business Hours
            </ContactCardTitle>
            
            <BusinessHours>
              <HoursItem>
                <HoursDay>Monday - Friday</HoursDay>
                <HoursTime>9:00 AM - 6:00 PM (EST)</HoursTime>
              </HoursItem>
              <HoursItem>
                <HoursDay>Saturday</HoursDay>
                <HoursTime>10:00 AM - 4:00 PM (EST)</HoursTime>
              </HoursItem>
              <HoursItem>
                <HoursDay>Sunday</HoursDay>
                <HoursTime>Closed</HoursTime>
              </HoursItem>
              <HoursItem>
                <HoursDay>Holidays</HoursDay>
                <HoursTime>Closed</HoursTime>
              </HoursItem>
            </BusinessHours>
          </ContactCard>
        </ContactInfoSection>
      </MainContent>

      {/* FAQ Section */}
      <FAQSection>
        <FAQTitle>Quick Help</FAQTitle>
        <FAQLinks>
          {CONTACT_DATA.faqLinks.map((faq, index) => (
            <FAQLink key={index} href={faq.link}>
              <FaQuestionCircle />
              {faq.title}
            </FAQLink>
          ))}
        </FAQLinks>
        
        <HelpCenterButton onClick={() => navigate('/help')}>
          <FaQuestionCircle />
          Visit Help Center
          <FaArrowRight />
        </HelpCenterButton>
      </FAQSection>

      {/* Trust Section */}
      <TrustSection>
        <TrustTitle>Why Choose Our Support?</TrustTitle>
        
        <TrustBadges>
          {CONTACT_DATA.trustElements.map((element, index) => (
            <TrustBadge key={index}>
              <FaShieldAlt />
              {element}
            </TrustBadge>
          ))}
        </TrustBadges>
        
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Follow us on social media for updates and support
          </p>
          <SocialLinks>
            <SocialLink href={CONTACT_DATA.socialMedia.facebook} target="_blank">
              <FaFacebook />
            </SocialLink>
            <SocialLink href={CONTACT_DATA.socialMedia.twitter} target="_blank">
              <FaTwitter />
            </SocialLink>
            <SocialLink href={CONTACT_DATA.socialMedia.instagram} target="_blank">
              <FaInstagram />
            </SocialLink>
            <SocialLink href={CONTACT_DATA.socialMedia.linkedin} target="_blank">
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
        </div>
      </TrustSection>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </PageContainer>
  )
}

export default ContactUsPage 