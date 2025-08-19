import React from 'react'
import styled from 'styled-components'

const ShowcaseContainer = styled.div`
  padding: 2rem;
  background: #fdfdfd;
  min-height: 100vh;
`

const Section = styled.section`
  margin-bottom: 3rem;
`

const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1c1917;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
    border-radius: 9999px;
  }
`

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const ColorCard = styled.div`
  background: #ffffff;
  border: 1px solid #e7e5e4;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: 200ms ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`

const ColorSwatch = styled.div`
  width: 100%;
  height: 80px;
  background: ${({ color }) => color};
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  border: 1px solid #e7e5e4;
`

const ColorInfo = styled.div`
  h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1c1917;
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.875rem;
    color: #57534e;
    margin-bottom: 0.25rem;
  }
  
  code {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.75rem;
    background: #f5f5f4;
    padding: 0.25rem 0.5rem;
    border-radius: 0.125rem;
    color: #1c1917;
  }
`

const ButtonShowcase = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`

const Button = styled.button`
  padding: 1rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: 200ms ease-in-out;
  cursor: pointer;
  border: none;
  
  &.primary {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #fdfdfd;
    box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.1);
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
  }
  
  &.secondary {
    background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
    color: #1c1917;
    box-shadow: 0 4px 6px -1px rgba(212, 175, 55, 0.15);
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
  }
  
  &.accent {
    background: linear-gradient(135deg, #ff6b6b 0%, #f28f5f 100%);
    color: #fdfdfd;
    box-shadow: 0 4px 6px -1px rgba(255, 107, 107, 0.15);
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
  }
`

const ThemeShowcase = () => {
  return (
    <ShowcaseContainer>
      <Section>
        <SectionTitle>🎨 New Color Palette</SectionTitle>
        <p style={{ color: '#57534e', marginBottom: '2rem' }}>
          Elegant deep navy, champagne gold, and warm neutrals for a sophisticated design.
        </p>
        
        <h3 style={{ marginBottom: '1rem', color: '#1c1917' }}>Primary Colors</h3>
        <ColorGrid>
          <ColorCard>
            <ColorSwatch color="#0f172a" />
            <ColorInfo>
              <h4>Deep Navy</h4>
              <p>Primary brand color</p>
              <code>theme.colors.primary.main</code>
            </ColorInfo>
          </ColorCard>
          
          <ColorCard>
            <ColorSwatch color="#d4af37" />
            <ColorInfo>
              <h4>Champagne Gold</h4>
              <p>Secondary brand color</p>
              <code>theme.colors.secondary</code>
            </ColorInfo>
          </ColorCard>
          
          <ColorCard>
            <ColorSwatch color="#ff6b6b" />
            <ColorInfo>
              <h4>Vibrant Coral</h4>
              <p>Accent color</p>
              <code>theme.colors.accent.coral</code>
            </ColorInfo>
          </ColorCard>
          
          <ColorCard>
            <ColorSwatch color="#20c997" />
            <ColorInfo>
              <h4>Fresh Teal</h4>
              <p>Success color</p>
              <code>theme.colors.accent.teal</code>
            </ColorInfo>
          </ColorCard>
        </ColorGrid>
      </Section>
      
      <Section>
        <SectionTitle>🎯 Button Styles</SectionTitle>
        <p style={{ color: '#57534e', marginBottom: '2rem' }}>
          Beautiful gradient buttons with hover effects.
        </p>
        
        <ButtonShowcase>
          <Button className="primary">Primary Action</Button>
          <Button className="secondary">Secondary Action</Button>
          <Button className="accent">Accent Action</Button>
        </ButtonShowcase>
      </Section>
      
      <Section>
        <SectionTitle>💡 Usage Tips</SectionTitle>
        <div style={{ 
          background: '#f5f5f4', 
          padding: '1.5rem', 
          borderRadius: '8px',
          fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
          fontSize: '0.875rem'
        }}>
          <p style={{ color: '#1c1917', marginBottom: '1rem' }}>
            <strong>For buttons:</strong> Use theme.colors.gradients.primary for main actions
          </p>
          <p style={{ color: '#1c1917', marginBottom: '1rem' }}>
            <strong>For text:</strong> Use theme.colors.text.primary for main text
          </p>
          <p style={{ color: '#1c1917', marginBottom: '1rem' }}>
            <strong>For backgrounds:</strong> Use theme.colors.background for main backgrounds
          </p>
          <p style={{ color: '#1c1917' }}>
            <strong>For shadows:</strong> Use theme.shadows.primary for depth
          </p>
        </div>
      </Section>
    </ShowcaseContainer>
  )
}

export default ThemeShowcase 