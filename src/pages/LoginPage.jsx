import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/common/LoginForm';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

const LoginPage = () => (
  <PageContainer>
    <LoginForm />
  </PageContainer>
);

export default LoginPage; 