import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import { useLogin } from './useLogin';
import Spinner from './LoadingSpinner';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.background.default || '#f9fafb'};
  padding: ${({ theme }) => theme.spacing.md};
`;

const LoginCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 8px 32px rgba(0,0,0,0.10), 0 1.5px 6px rgba(0,0,0,0.04);
  border: 1.5px solid ${({ theme }) => theme.colors.border.main || '#e5e7eb'};
  width: 100%;
  max-width: 560px;
  min-width: 0;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: box-shadow 0.2s, transform 0.2s;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 640px;
    padding: 2.5rem 2rem;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 720px;
    padding: 3rem 2.5rem;
  }
  
  &:hover {
    box-shadow: 0 12px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06);
    transform: translateY(-2px) scale(1.01);
  }
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  
  @media (min-width: 1200px) {
    font-size: 1.05rem;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
  margin-bottom: 0rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;

`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.gray[50] || '#f3f4f6'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  padding: 0.625rem 0.875rem;
  position: relative;
`;

const InputIcon = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-right: 0.75rem;
  
  @media (min-width: 1200px) {
    margin-right: 1rem;
  }
`;

const StyledInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  font-size: 1rem;
  padding: 0.5rem 0;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const PasswordToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  margin-left: 0.75rem;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  
  @media (min-width: 1200px) {
    margin-left: 1rem;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.gray[300]};
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.95rem;
  margin-top: 0.25rem;
  
  @media (min-width: 1200px) {
    font-size: 1rem;
  }
`;

const ForgotPasswordLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  font-size: 0.95rem;
  margin-top: 0.75rem;
  
  @media (min-width: 1200px) {
    font-size: 1rem;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.05rem;
  
  @media (min-width: 1200px) {
    font-size: 1.1rem;
  }
  
  @media (min-width: 1400px) {
    font-size: 1.15rem;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: underline;
  font-weight: 500;
  
  &:hover {
    text-decoration: none;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  
  @media (min-width: 1200px) {
    font-size: 1.05rem;
  }
  
  @media (min-width: 1400px) {
    font-size: 1.1rem;
  }
`;

function LoginForm() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { loginUser, isLoading } = useLogin();
  const [showPassword, setShowPassword] = React.useState(false);

  function onSubmit(data) {
    loginUser(data);
  }

  return (
    <LoginContainer>
      <LoginCard>
        <BackLink to="/signup">
          <ArrowLeft size={18} />
          Back to Signup
        </BackLink>
        
        <Header>
          <Logo>SD</Logo>
          <Title>Welcome back</Title>
          <Subtitle>Sign in to your account to continue</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <Label htmlFor="email">Email address</Label>
            <InputWrapper>
              <InputIcon>
                <Mail size={22} />
              </InputIcon>
              <StyledInput
                type="email"
                id="email"
                placeholder="Enter your email address"
                disabled={isLoading}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </InputWrapper>
            {errors?.email && <ErrorText>{errors.email.message}</ErrorText>}
          </FormRow>

          <FormRow>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
              <InputIcon>
                <Lock size={22} />
              </InputIcon>
              <StyledInput
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                disabled={isLoading}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </PasswordToggle>
            </InputWrapper>
            {errors?.password && <ErrorText>{errors.password.message}</ErrorText>}
            <ForgotPasswordLink to="/forgot-password">
              Forgot your password?
            </ForgotPasswordLink>
          </FormRow>

          <FormRow>
            <Button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="18px" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </FormRow>
        </Form>

        <SignupLink>
          Don't have an account?{" "}
          <StyledLink to="/signup">Sign up</StyledLink>
        </SignupLink>
      </LoginCard>
    </LoginContainer>
  );
}

export default LoginForm; 