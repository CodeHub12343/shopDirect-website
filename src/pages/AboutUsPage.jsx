import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { 
  FaHeart, 
  FaLeaf, 
  FaUsers, 
  FaAward, 
  FaGlobe, 
  FaLightbulb,
  FaStar,
  FaShoppingBag,
  FaEnvelope,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaPlay,
  FaArrowRight,
  FaCheck,
  FaHandshake,
  FaRecycle,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaRocket
} from 'react-icons/fa'

// Mock data for the About Us page
const ABOUT_DATA = {
  hero: {
    title: "Redefining Everyday Comfort Since 2012",
    subtitle: "We're passionate about creating products that make life better, one innovation at a time.",
    backgroundImage: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop"
  },
  brandStory: {
    title: "Our Story",
    subtitle: "From a small garage to serving millions worldwide",
    story: "It all started in 2012 when our founders, Sarah and Mike, were frustrated with the lack of quality, affordable products in the market. What began as a simple solution to their own problems has grown into a mission to serve customers worldwide with innovative, sustainable products.",
    timeline: [
      {
        year: "2012",
        title: "The Beginning",
        description: "Founded in a garage with a vision to create better products",
        image: "https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
      },
      {
        year: "2015",
        title: "First Product Launch",
        description: "Launched our flagship product, reaching 10,000 customers",
        image: "https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
      },
      {
        year: "2018",
        title: "1M Customers Milestone",
        description: "Reached our first million customers worldwide",
        image: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
      },
      {
        year: "2023",
        title: "Global Expansion",
        description: "Now serving customers in 50+ countries",
        image: "https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
      }
    ]
  },
  mission: {
    mission: "We believe in creating affordable, sustainable products that enhance everyday life while protecting our planet for future generations.",
    vision: "To become the world's most customer-centric company, leading the way in sustainable innovation and ethical business practices.",
    values: [
      {
        icon: FaHeart,
        title: "Customer First",
        description: "Every decision we make starts with our customers' needs"
      },
      {
        icon: FaLeaf,
        title: "Sustainability",
        description: "Committed to environmental responsibility in everything we do"
      },
      {
        icon: FaUsers,
        title: "Community",
        description: "Building strong relationships with our team and customers"
      },
      {
        icon: FaLightbulb,
        title: "Innovation",
        description: "Constantly pushing boundaries to create better solutions"
      }
    ]
  },
  team: [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Former engineer with 15+ years of experience in product development",
      funFact: "Coffee addict ☕ | Dog lover 🐾",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Mike Chen",
      role: "CTO & Co-Founder",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Tech enthusiast passionate about sustainable innovation",
      funFact: "Mountain biker 🚵 | Guitar player 🎸",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Award-winning designer focused on user experience",
      funFact: "Plant parent 🌱 | Yoga instructor 🧘‍♀️",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "David Kim",
      role: "Head of Operations",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Operations expert with a passion for efficiency and sustainability",
      funFact: "Marathon runner 🏃‍♂️ | Foodie 🍜",
      linkedin: "#",
      twitter: "#"
    }
  ],
  culture: {
    title: "Our Culture",
    subtitle: "Where passion meets purpose",
    description: "We believe that great products come from great people. Our team is diverse, creative, and committed to making a positive impact on the world.",
    images: [
      "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      "https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      "https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    ]
  },
  milestones: {
    stats: [
      { number: "2M+", label: "Products Shipped", icon: FaShoppingBag },
      { number: "50+", label: "Countries Served", icon: FaGlobe },
      { number: "5K+", label: "5★ Reviews", icon: FaStar },
      { number: "100+", label: "Team Members", icon: FaUsers }
    ],
    achievements: [
      { title: "Best Startup 2023", source: "TechCrunch" },
      { title: "Eco-Friendly Certified", source: "Green Business Council" },
      { title: "Customer Choice Award", source: "Consumer Reports" },
      { title: "Innovation Excellence", source: "Design Week" }
    ],
    press: [
      "Forbes", "TechCrunch", "Wired", "Fast Company", "Inc.", "Entrepreneur"
    ]
  },
  socialResponsibility: {
    title: "Social Responsibility",
    subtitle: "Making a positive impact",
    initiatives: [
      {
        icon: FaRecycle,
        title: "Eco-Friendly Packaging",
        description: "100% recyclable and biodegradable packaging materials"
      },
      {
        icon: FaHandHoldingHeart,
        title: "1% for the Planet",
        description: "1% of every order goes to environmental causes"
      },
      {
        icon: FaHandshake,
        title: "Ethical Sourcing",
        description: "Partnering with suppliers who share our values"
      },
      {
        icon: FaShieldAlt,
        title: "Fair Labor Practices",
        description: "Ensuring safe and fair working conditions"
      }
    ]
  }
}

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.backgroundSecondary} 100%);
`

const MainContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`

const HeroSection = styled.div`
  position: relative;
  height: 80vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),
              url(${ABOUT_DATA.hero.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 60vh;
    min-height: 500px;
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 50vh;
    min-height: 380px;
  }
`

const HeroContent = styled.div`
  max-width: 900px;
  padding: ${({ theme }) => theme.spacing['2xl']};
  z-index: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['6xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.sizes['5xl']};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  }
`

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  opacity: 0.95;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.base};
  }
`

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} 0;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg} 0;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`

const ContentSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.md};
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.secondary});
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }
`

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 40px;
    bottom: 40px;
    width: 4px;
    background: linear-gradient(180deg, 
      ${({ theme }) => theme.colors.primary.main} 0%, 
      ${({ theme }) => theme.colors.secondary} 50%, 
      ${({ theme }) => theme.colors.primary.main} 100%);
    transform: translateX(-50%);
    border-radius: ${({ theme }) => theme.borderRadius.full};
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      left: 40px;
      transform: none;
    }
  }
`

const TimelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  position: relative;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-direction: row;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
  }
`

const TimelineContent = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  position: relative;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border-style: solid;
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      ${({ isEven }) => isEven ? `
        right: -12px;
        border-width: 12px 0 12px 12px;
        border-color: transparent transparent transparent ${({ theme }) => theme.colors.surface};
      ` : `
        left: -12px;
        border-width: 12px 12px 12px 0;
        border-color: transparent ${({ theme }) => theme.colors.surface} transparent transparent;
      `}
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      left: -12px;
      border-width: 12px 12px 12px 0;
      border-color: transparent ${({ theme }) => theme.colors.surface} transparent transparent;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 80px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-left: 64px;
  }
`

const TimelineYear = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.secondary});
  color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  margin: 0 ${({ theme }) => theme.spacing.xl};
  z-index: 2;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 4px solid white;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: absolute;
    left: -40px;
    margin: 0;
    width: 70px;
    height: 70px;
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }
`

const TimelineImage = styled.img`
  width: 250px;
  height: 180px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: 220px;
    margin-top: ${({ theme }) => theme.spacing.lg};
  }
`

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`

const ValueCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  transition: all ${({ theme }) => theme.transitions.base};
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const ValueIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.secondary});
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  font-size: 2.5rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all ${({ theme }) => theme.transitions.base};
  
  ${ValueCard}:hover & {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`

const TeamCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.base};
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`

const TeamImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 220px;
  }
`

const TeamInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`

const TeamName = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
`

const TeamRole = styled.div`
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const TeamBio = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`

const TeamFunFact = styled.div`
  background: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const TeamSocial = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`

const CultureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`

const CultureImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 200px;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`

const StatCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`

const AchievementCard = styled.div`
  background: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
`

const AchievementTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
`

const AchievementSource = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`

const PressLogos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const PressLogo = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
`

const InitiativesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`

const InitiativeCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`

const InitiativeIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  font-size: 1.5rem;
`

const CTASection = styled.div`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`

const CTAButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    & > button {
      width: 100%;
      justify-content: center;
    }
  }
`

const CTAButton = styled.button`
  background: ${({ variant, theme }) => 
    variant === 'secondary' ? 'transparent' : 'white'};
  color: ${({ variant, theme }) => 
    variant === 'secondary' ? 'white' : theme.colors.primary.main};
  border: 2px solid white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  &:hover {
    background: ${({ variant, theme }) => 
      variant === 'secondary' ? 'white' : theme.colors.gray[100]};
    color: ${({ variant, theme }) => 
      variant === 'secondary' ? theme.colors.primary.main : theme.colors.primary.main};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`

  const AboutUsPage = () => {
  const navigate = useNavigate()

  // Animate stats on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target
          const finalValue = parseInt(target.dataset.value)
          animateValue(target, 0, finalValue, 2000)
        }
      })
    }, { threshold: 0.5 })

    const statElements = document.querySelectorAll('[data-value]')
    statElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const animateValue = (element, start, end, duration) => {
    const startTime = performance.now()
    
    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const current = Math.floor(start + (end - start) * progress)
      element.textContent = current.toLocaleString()
      
      if (progress < 1) {
        requestAnimationFrame(updateValue)
      }
    }
    
    requestAnimationFrame(updateValue)
  }

  return (
    <PageContainer>
      <MainContainer>
        {/* Hero Section */}
        <HeroSection>
          <HeroContent>
            <HeroTitle>{ABOUT_DATA.hero.title}</HeroTitle>
            <HeroSubtitle>{ABOUT_DATA.hero.subtitle}</HeroSubtitle>
          </HeroContent>
        </HeroSection>

        {/* Brand Story */}
        <ContentSection>
          <SectionTitle>{ABOUT_DATA.brandStory.title}</SectionTitle>
          <SectionSubtitle>{ABOUT_DATA.brandStory.subtitle}</SectionSubtitle>
          
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            textAlign: 'center',
            marginBottom: '3rem',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#6b7280',
            padding: '2rem',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: '1rem',
            border: '1px solid #e2e8f0'
          }}>
            {ABOUT_DATA.brandStory.story}
          </div>

          <TimelineContainer>
            {ABOUT_DATA.brandStory.timeline.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineContent isEven={index % 2 === 0}>
                  <TimelineYear>{item.year}</TimelineYear>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '600', 
                      marginBottom: '0.5rem',
                      color: '#1f2937'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{ 
                      color: '#6b7280', 
                      marginBottom: '1rem',
                      lineHeight: '1.6'
                    }}>
                      {item.description}
                    </p>
                    <TimelineImage src={item.image} alt={item.title} />
                  </div>
              </TimelineContent>
            </TimelineItem>
          ))}
                  </TimelineContainer>
        </ContentSection>

        {/* Mission, Vision & Values */}
        <ContentSection>
          <SectionTitle>Our Mission & Vision</SectionTitle>
          
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
              padding: '2rem', 
              borderRadius: '1rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                Mission
              </h3>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.7',
                color: '#6b7280'
              }}>
                {ABOUT_DATA.mission.mission}
              </p>
            </div>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
              padding: '2rem', 
              borderRadius: '1rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                Vision
              </h3>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.7',
                color: '#6b7280'
              }}>
                {ABOUT_DATA.mission.vision}
              </p>
            </div>
          </div>

          <SectionTitle>Our Core Values</SectionTitle>
          <ValuesGrid>
            {ABOUT_DATA.mission.values.map((value, index) => (
              <ValueCard key={index}>
                <ValueIcon>
                  <value.icon />
                </ValueIcon>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '1rem',
                  color: '#1f2937'
                }}>
                  {value.title}
                </h3>
                <p style={{ 
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  {value.description}
                </p>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ContentSection>

        {/* Team Section */}
        <ContentSection>
          <SectionTitle>Meet Our Team</SectionTitle>
          <SectionSubtitle>
            The passionate people behind our success
          </SectionSubtitle>
          
          <TeamGrid>
            {ABOUT_DATA.team.map((member, index) => (
              <TeamCard key={index}>
                <TeamImage src={member.image} alt={member.name} />
                <TeamInfo>
                  <TeamName>{member.name}</TeamName>
                  <TeamRole>{member.role}</TeamRole>
                  <TeamBio>{member.bio}</TeamBio>
                  <TeamFunFact>{member.funFact}</TeamFunFact>
                <TeamSocial>
                  <SocialLink href={member.linkedin}>
                    <FaLinkedin />
                  </SocialLink>
                  <SocialLink href={member.twitter}>
                    <FaTwitter />
                  </SocialLink>
                </TeamSocial>
              </TeamInfo>
            </TeamCard>
          ))}
                  </TeamGrid>
        </ContentSection>

                {/* Company Culture */}
        <ContentSection>
        <SectionTitle>{ABOUT_DATA.culture.title}</SectionTitle>
        <SectionSubtitle>{ABOUT_DATA.culture.subtitle}</SectionSubtitle>
        
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#6b7280'
        }}>
          {ABOUT_DATA.culture.description}
        </div>

        <CultureGrid>
          {ABOUT_DATA.culture.images.map((image, index) => (
            <CultureImage key={index} src={image} alt={`Company culture ${index + 1}`} />
          ))}
        </CultureGrid>
        </ContentSection>

        {/* Milestones & Achievements */}
        <ContentSection>
        <SectionTitle>Our Impact</SectionTitle>
        <SectionSubtitle>
          Numbers that tell our story
        </SectionSubtitle>

        <StatsGrid>
          {ABOUT_DATA.milestones.stats.map((stat, index) => (
            <StatCard key={index}>
              <div style={{ 
                fontSize: '2rem', 
                color: '#2563eb', 
                marginBottom: '0.5rem' 
              }}>
                <stat.icon />
              </div>
              <StatNumber data-value={stat.number.replace(/[^0-9]/g, '')}>
                {stat.number}
              </StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        <SectionTitle>Achievements & Recognition</SectionTitle>
        <AchievementsGrid>
          {ABOUT_DATA.milestones.achievements.map((achievement, index) => (
            <AchievementCard key={index}>
              <AchievementTitle>{achievement.title}</AchievementTitle>
              <AchievementSource>{achievement.source}</AchievementSource>
            </AchievementCard>
          ))}
        </AchievementsGrid>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            color: '#1f2937'
          }}>
            Featured In
          </h3>
          <PressLogos>
            {ABOUT_DATA.milestones.press.map((press, index) => (
              <PressLogo key={index}>{press}</PressLogo>
            ))}
          </PressLogos>
        </div>
        </ContentSection>

        {/* Social Responsibility */}
        <ContentSection>
          <SectionTitle>{ABOUT_DATA.socialResponsibility.title}</SectionTitle>
          <SectionSubtitle>{ABOUT_DATA.socialResponsibility.subtitle}</SectionSubtitle>

          <InitiativesGrid>
            {ABOUT_DATA.socialResponsibility.initiatives.map((initiative, index) => (
              <InitiativeCard key={index}>
                <InitiativeIcon>
                  <initiative.icon />
                </InitiativeIcon>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '1rem',
                  color: '#1f2937'
                }}>
                  {initiative.title}
                </h3>
                <p style={{ 
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  {initiative.description}
                </p>
              </InitiativeCard>
            ))}
          </InitiativesGrid>
        </ContentSection>

        {/* CTA Section */}
        <ContentSection>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            textAlign: 'center',
            color: '#1f2937'
          }}>
            Join Us on Our Journey
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#6b7280',
            marginBottom: '2rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            lineHeight: '1.6'
          }}>
            Ready to experience the difference? Shop our collection or get in touch to learn more about our mission.
          </p>
          
          <CTAButtons>
            <CTAButton onClick={() => navigate('/products')}>
              <FaShoppingBag />
              Shop Our Collection
            </CTAButton>
            <CTAButton variant="secondary" onClick={() => navigate('/contact')}>
              <FaEnvelope />
              Get In Touch
            </CTAButton>
          </CTAButtons>
        </ContentSection>
      </MainContainer>
    </PageContainer>
  )
}

export default AboutUsPage 