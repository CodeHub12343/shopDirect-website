/* import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import useSignup from './useSignup';
import Spinner from './LoadingSpinner';

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.background.default || '#f9fafb'};
  padding: ${({ theme }) => theme.spacing.md};
`;

const SignupCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 8px 32px rgba(0,0,0,0.10), 0 1.5px 6px rgba(0,0,0,0.04);
  border: 1.5px solid ${({ theme }) => theme.colors.border.main || '#e5e7eb'};
  width: 200%;
  max-width: 1080px;
  min-width: 450px;
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: box-shadow 0.2s, transform 0.2s;
  
  @media (min-width: 1200px) {
    max-width: 1050px;
    padding: 4rem 3.5rem;
    font-size: 1.1rem;
  }
  
  @media (min-width: 1400px) {
    max-width: 700px;
    padding: 4.5rem 4rem;
    font-size: 1.15rem;
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
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 0.5rem;
  
  @media (min-width: 1200px) {
    font-size: 3.5rem;
  }
  
  @media (min-width: 1400px) {
    font-size: 4rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  
  @media (min-width: 1200px) {
    font-size: 2.2rem;
  }
  
  @media (min-width: 1400px) {
    font-size: 2.4rem;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.1rem;
  margin-bottom: 0rem;
  
  @media (min-width: 1200px) {
    font-size: 1.15rem;
  }
  
  @media (min-width: 1400px) {
    font-size: 1.2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
  padding: 0.75rem 1rem;
  position: relative;
  
  @media (min-width: 1200px) {
    padding: 0.9rem 1.2rem;
  }
  
  @media (min-width: 1400px) {
    padding: 1rem 1.4rem;
  }
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
  font-size: 1.1rem;
  padding: 1rem;
  
  
  @media (min-width: 1200px) {
    font-size: 1.15rem;
    padding: 1rem 0;
  }
  
  @media (min-width: 1400px) {
    font-size: 1.2rem;
    padding: 1.1rem 0;
  }
  
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
  padding: 1.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  
  @media (min-width: 1200px) {
    padding: 1.4rem;
    font-size: 1.15rem;
  }
  
  @media (min-width: 1400px) {
    padding: 1.6rem;
    font-size: 1.2rem;
  }
  
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

const LoginLink = styled.div`
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

const TermsText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-top: 1.5rem;
  line-height: 1.5;
  
  @media (min-width: 1200px) {
    font-size: 1rem;
  }
`;

function SignupForm() {
  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  const { signupUser, isLoading } = useSignup();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const password = watch("password");

  function onSubmit(data) {
    signupUser(data);
  }

  return (
    <SignupContainer>
      <SignupCard>
        <BackLink to="/login">
          <ArrowLeft size={20} />
          Back to Login
        </BackLink>
        
        <Header>
          <Logo>SD</Logo>
          <Title>Create your account</Title>
          <Subtitle>Join us and start your journey</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <Label htmlFor="name">Full name</Label>
            <InputWrapper>
              <InputIcon>
                <User size={24} />
              </InputIcon>
              <StyledInput
                type="text"
                id="name"
                placeholder="Enter your full name"
                disabled={isLoading}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  }
                })}
              />
            </InputWrapper>
            {errors?.name && <ErrorText>{errors.name.message}</ErrorText>}
          </FormRow>

          <FormRow>
            <Label htmlFor="email">Email address</Label>
            <InputWrapper>
              <InputIcon>
                <Mail size={24} />
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
                <Lock size={24} />
              </InputIcon>
              <StyledInput
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create a strong password"
                disabled={isLoading}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                  }
                })}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </PasswordToggle>
            </InputWrapper>
            {errors?.password && <ErrorText>{errors.password.message}</ErrorText>}
          </FormRow>

          <FormRow>
            <Label htmlFor="passwordConfirm">Confirm password</Label>
            <InputWrapper>
              <InputIcon>
                <Lock size={24} />
              </InputIcon>
              <StyledInput
                type={showConfirmPassword ? "text" : "password"}
                id="passwordConfirm"
                placeholder="Confirm your password"
                disabled={isLoading}
                {...register("passwordConfirm", {
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </PasswordToggle>
            </InputWrapper>
            {errors?.passwordConfirm && <ErrorText>{errors.passwordConfirm.message}</ErrorText>}
          </FormRow>

          <FormRow>
            <Button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="20px" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </FormRow>
        </Form>

        <TermsText>
          By creating an account, you agree to our{" "}
          <StyledLink to="/terms">Terms of Service</StyledLink>{" "}
          and{" "}
          <StyledLink to="/privacy">Privacy Policy</StyledLink>
        </TermsText>

        <LoginLink>
          Already have an account?{" "}
          <StyledLink to="/login">Sign in</StyledLink>
        </LoginLink>
      </SignupCard>
    </SignupContainer>
  );
}

export default SignupForm; */

import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import useSignup from './useSignup';
import Spinner from './LoadingSpinner';

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.background.default || '#f9fafb'};
`;

const SignupCard = styled.div`
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
  gap: 1rem;
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
  margin-bottom: 0.1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 0.75rem;
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
`;

const StyledInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  font-size: 1rem;
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const PasswordToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  margin-left: 0.75rem;
  display: flex;
  align-items: center;
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
  margin-top: 0.1rem;
`;

const TermsText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
`;

function SignupForm() {
  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  const { signupUser, isLoading } = useSignup();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const password = watch("password");

  function onSubmit(data) {
    signupUser(data);
  }

  return (
    <SignupContainer>
      <SignupCard>
        <BackLink to="/login">
          <ArrowLeft size={16} />
          Back to Login
        </BackLink>
        <Header>
          <Logo>SD</Logo>
          <Title>Create your account</Title>
          <Subtitle>Join thousands of users managing their e-commerce business</Subtitle>
        </Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <label htmlFor="name">Full name</label>
            <InputWrapper>
              <InputIcon>
                <User size={20} />
              </InputIcon>
              <StyledInput
                type="text"
                id="name"
                placeholder="Enter your full name"
                disabled={isLoading}
                {...register("name", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Name must be less than 50 characters",
                  },
                })}
              />
            </InputWrapper>
            {errors?.name && <ErrorText>{errors.name.message}</ErrorText>}
          </FormRow>
          <FormRow>
            <label htmlFor="email">Email address</label>
            <InputWrapper>
              <InputIcon>
                <Mail size={20} />
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
            <label htmlFor="password">Password</label>
            <InputWrapper>
              <InputIcon>
                <Lock size={20} />
              </InputIcon>
              <StyledInput
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create a strong password"
                disabled={isLoading}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </InputWrapper>
            {errors?.password && <ErrorText>{errors.password.message}</ErrorText>}
          </FormRow>
          <FormRow>
            <label htmlFor="passwordConfirm">Confirm password</label>
            <InputWrapper>
              <InputIcon>
                <Lock size={20} />
              </InputIcon>
              <StyledInput
                type={showConfirmPassword ? "text" : "password"}
                id="passwordConfirm"
                placeholder="Confirm your password"
                disabled={isLoading}
                {...register("passwordConfirm", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </InputWrapper>
            {errors?.passwordConfirm && <ErrorText>{errors.passwordConfirm.message}</ErrorText>}
          </FormRow>
          <FormRow>
            <Button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="16px" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </FormRow>
        </Form>
        <TermsText>
          By creating an account, you agree to our{' '}
          <StyledLink to="/terms">Terms of Service</StyledLink> and{' '}
          <StyledLink to="/privacy">Privacy Policy</StyledLink>
        </TermsText>
        <LoginLink>
          Already have an account?{' '}
          <StyledLink to="/login">Sign in</StyledLink>
        </LoginLink>
      </SignupCard>
    </SignupContainer>
  );
}

export default SignupForm;