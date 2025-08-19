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
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.25rem;
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

const FontGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`

const FontCard = styled.div`
  background: #ffffff;
  border: 1px solid #e7e5e4;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: 200ms ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`

const FontName = styled.h3`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1c1917;
  margin-bottom: 1rem;
`

const FontDescription = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  color: #57534e;
  margin-bottom: 1rem;
  line-height: 1.5;
`

const FontExample = styled.div`
  margin-bottom: 1rem;
  
  &.display {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.875rem;
    font-weight: 600;
    color: #1c1917;
    line-height: 1.2;
  }
  
  &.body {
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    color: #57534e;
    line-height: 1.6;
  }
  
  &.caption {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    color: #78716c;
    line-height: 1.4;
  }
`

const UsageSection = styled.div`
  background: #f5f5f4;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
`

const CodeBlock = styled.code`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.75rem;
  background: #ffffff;
  padding: 0.5rem;
  border-radius: 0.25rem;
  color: #1c1917;
  display: block;
  margin-top: 0.5rem;
`

const TypographyHierarchy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`

const TypographyLevel = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  
  .label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    color: #78716c;
    min-width: 80px;
  }
  
  .example {
    font-family: ${({ fontFamily }) => fontFamily};
    font-size: ${({ fontSize }) => fontSize};
    font-weight: ${({ fontWeight }) => fontWeight};
    color: #1c1917;
  }
`

const FontShowcase = () => {
  return (
    <ShowcaseContainer>
      <Section>
        <SectionTitle>🎨 Typography System</SectionTitle>
        <p style={{ color: '#57534e', marginBottom: '2rem', fontFamily: 'DM Sans, sans-serif' }}>
          Sophisticated typography combining DM Sans for clean body text and Playfair Display for elegant headings.
        </p>
        
        <FontGrid>
          <FontCard>
            <FontName>DM Sans</FontName>
            <FontDescription>
              Minimal and elegant sans-serif font perfect for body text, UI elements, and clean interfaces.
            </FontDescription>
            <FontExample className="body">
              The quick brown fox jumps over the lazy dog. This elegant typeface provides excellent readability for body text and user interface elements.
            </FontExample>
            <UsageSection>
              <strong>Usage:</strong>
              <CodeBlock>
                font-family: 'DM Sans', sans-serif;
              </CodeBlock>
            </UsageSection>
          </FontCard>
          
          <FontCard>
            <FontName>Playfair Display</FontName>
            <FontDescription>
              Luxury serif font with high-end aesthetic, perfect for headings, product names, and premium branding.
            </FontDescription>
            <FontExample className="display">
              Elegant Luxury Brand
            </FontExample>
            <UsageSection>
              <strong>Usage:</strong>
              <CodeBlock>
                font-family: 'Playfair Display', Georgia, serif;
              </CodeBlock>
            </UsageSection>
          </FontCard>
        </FontGrid>
      </Section>
      
      <Section>
        <SectionTitle>📝 Typography Hierarchy</SectionTitle>
        <p style={{ color: '#57534e', marginBottom: '2rem', fontFamily: 'DM Sans, sans-serif' }}>
          Clear typography scale for consistent, professional communication.
        </p>
        
        <TypographyHierarchy>
          <TypographyLevel>
            <span className="label">H1</span>
            <span className="example" style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '3rem', fontWeight: '700' }}>
              Main Page Heading
            </span>
          </TypographyLevel>
          
          <TypographyLevel>
            <span className="label">H2</span>
            <span className="example" style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2.25rem', fontWeight: '600' }}>
              Section Heading
            </span>
          </TypographyLevel>
          
          <TypographyLevel>
            <span className="label">H3</span>
            <span className="example" style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.875rem', fontWeight: '600' }}>
              Subsection Title
            </span>
          </TypographyLevel>
          
          <TypographyLevel>
            <span className="label">Body</span>
            <span className="example" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', fontWeight: '400' }}>
              Regular body text for content and descriptions
            </span>
          </TypographyLevel>
          
          <TypographyLevel>
            <span className="label">Caption</span>
            <span className="example" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', fontWeight: '400' }}>
              Small text for captions and secondary information
            </span>
          </TypographyLevel>
        </TypographyHierarchy>
      </Section>
      
      <Section>
        <SectionTitle>💡 Implementation Guide</SectionTitle>
        <div style={{ 
          background: '#f5f5f4', 
          padding: '1.5rem', 
          borderRadius: '8px',
          fontFamily: 'DM Sans, sans-serif'
        }}>
          <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', marginBottom: '1rem' }}>
            How to Use the New Typography
          </h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>For Headings:</strong>
            <CodeBlock>
              font-family: theme.typography.fontFamily.display;
            </CodeBlock>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>For Body Text:</strong>
            <CodeBlock>
              font-family: theme.typography.fontFamily.body;
            </CodeBlock>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>For Product Names:</strong>
            <CodeBlock>
              font-family: 'Playfair Display', Georgia, serif;
            </CodeBlock>
          </div>
          
          <div>
            <strong>For UI Elements:</strong>
            <CodeBlock>
              font-family: 'DM Sans', sans-serif;
            </CodeBlock>
          </div>
        </div>
      </Section>
    </ShowcaseContainer>
  )
}

export default FontShowcase 