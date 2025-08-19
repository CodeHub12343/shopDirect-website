import React from 'react';
import styled from 'styled-components';
import SignupForm from '../components/common/SignupForm';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

const SignUpPage = () => (
  <PageContainer>
    <SignupForm />
  </PageContainer>
);

export default SignUpPage; 