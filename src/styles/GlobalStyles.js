import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize["5xl"]};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  }

  h5 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }

  h6 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
    }
  }

  /* Lists */
  ul, ol {
    list-style: none;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Buttons */
  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
  }

  /* Form elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: 1px solid ${({ theme }) => theme.colors.border.main};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) =>
  theme.spacing[4]};
    transition: border-color ${({ theme }) => theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
    }
  }

  /* Container */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing[4]};

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0 ${({ theme }) => theme.spacing[6]};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: 0 ${({ theme }) => theme.spacing[8]};
    }
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .mb-0 { margin-bottom: 0; }
  .mb-1 { margin-bottom: ${({ theme }) => theme.spacing[1]}; }
  .mb-2 { margin-bottom: ${({ theme }) => theme.spacing[2]}; }
  .mb-3 { margin-bottom: ${({ theme }) => theme.spacing[3]}; }
  .mb-4 { margin-bottom: ${({ theme }) => theme.spacing[4]}; }
  .mb-5 { margin-bottom: ${({ theme }) => theme.spacing[5]}; }
  .mb-6 { margin-bottom: ${({ theme }) => theme.spacing[6]}; }
  .mb-8 { margin-bottom: ${({ theme }) => theme.spacing[8]}; }

  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: ${({ theme }) => theme.spacing[1]}; }
  .mt-2 { margin-top: ${({ theme }) => theme.spacing[2]}; }
  .mt-3 { margin-top: ${({ theme }) => theme.spacing[3]}; }
  .mt-4 { margin-top: ${({ theme }) => theme.spacing[4]}; }
  .mt-5 { margin-top: ${({ theme }) => theme.spacing[5]}; }
  .mt-6 { margin-top: ${({ theme }) => theme.spacing[6]}; }
  .mt-8 { margin-top: ${({ theme }) => theme.spacing[8]}; }

  .p-0 { padding: 0; }
  .p-1 { padding: ${({ theme }) => theme.spacing[1]}; }
  .p-2 { padding: ${({ theme }) => theme.spacing[2]}; }
  .p-3 { padding: ${({ theme }) => theme.spacing[3]}; }
  .p-4 { padding: ${({ theme }) => theme.spacing[4]}; }
  .p-5 { padding: ${({ theme }) => theme.spacing[5]}; }
  .p-6 { padding: ${({ theme }) => theme.spacing[6]}; }
  .p-8 { padding: ${({ theme }) => theme.spacing[8]}; }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray100};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray300};
    border-radius: ${({ theme }) => theme.borderRadius.full};

    &:hover {
      background: ${({ theme }) => theme.colors.gray400};
    }
  }

  /* Focus styles for accessibility */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }

  /* Animation classes */
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .slide-in-left {
    animation: slideInLeft 0.5s ease-out;
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .slide-in-right {
    animation: slideInRight 0.5s ease-out;
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export default GlobalStyles;
