import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Save, 
  Eye, 
  EyeOff,
  Camera,
  Trash2,
  Download,
  Globe,
  Moon,
  Sun
} from 'react-feather';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useUpdateUser } from '../components/common/useUpdateUser';
import { useUpdatePassword } from '../components/common/useUpdatePassword';
import { getUserAvatarUrl } from '../utils/imageUtils';

const SettingsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main} 0%, ${({ theme }) => theme.colors.primary.dark} 100%);
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const HeaderSubtitle = styled.p`
  opacity: 0.9;
  font-size: 1.1rem;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  height: fit-content;
  position: sticky;
  top: 2rem;
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 0.5rem;
`;

const NavButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ active, theme }) => active ? theme.colors.primary.main : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s;
  text-align: left;
  
  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.primary.dark : theme.colors.gray[100]};
  }
`;

const Content = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SectionDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2rem;
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 600;
  position: relative;
  cursor: pointer;
  
  &:hover .avatar-overlay {
    opacity: 1;
  }
`;

const AvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const AvatarInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AvatarName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const AvatarEmail = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const AvatarRole = styled.span`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
`;

const AvatarPreview = styled.div`
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &.primary {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
    
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary.dark};
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  
  &.secondary {
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.text.primary};
    
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.gray[200]};
    }
  }
`;

const PasswordInputGroup = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const AccountSettingsPage = () => {
  const { user } = useAuth();
  const { success, warning } = useToast();
  const { updateUser, isUpdating } = useUpdateUser();
  const { changePassword, isLoading: isUpdatingPassword } = useUpdatePassword();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('profile');
  // Profile update state
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  
  // Security update state
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    orderUpdates: true,
    priceAlerts: true,
    newProducts: false,
    securityAlerts: true,
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    currency: 'USD',
    language: 'en',
    timezone: 'UTC',
    emailFrequency: 'daily',
  });

  // Initialize form values when user data loads
  React.useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setFullName(user.name || '');
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!fullName && !email && !avatar) return;

    updateUser(
      { email, fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          setShowAvatarUpload(false);
        },
      }
    );
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordCurrent || !password || !passwordConfirm) return;
    if (password !== passwordConfirm) return;

    changePassword(
      { passwordCurrent, password, passwordConfirm },
      {
        onSuccess: () => {
          setPasswordCurrent('');
          setPassword('');
          setPasswordConfirm('');
          setShowPasswordForm(false);
        },
      }
    );
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      warning('Account deletion is not implemented in this demo');
    }
  };

  const handleExportData = () => {
    success('Data export started. You will receive an email when it\'s ready.');
  };

  const renderProfileSection = () => {
    console.log("Rendering profile section with:", { user, email, fullName, avatar });
    
    return (
      <Section>
        <SectionTitle>
          <User size={20} />
          Profile Information
        </SectionTitle>
        <SectionDescription>
          Update your personal information and profile details.
        </SectionDescription>
      
        <AvatarSection>
          <Avatar onClick={handleAvatarClick}>
            {user?.photo ? (
              <AvatarImage 
                src={getUserAvatarUrl(user.photo)} 
                alt={user.name} 
              />
            ) : (
              user?.name?.charAt(0)?.toUpperCase() || 'U'
            )}
            <AvatarOverlay className="avatar-overlay">
              <Camera size={20} />
            </AvatarOverlay>
          </Avatar>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
          <AvatarInfo>
            <AvatarName>{user?.name}</AvatarName>
            <AvatarEmail>{user?.email}</AvatarEmail>
            <AvatarRole>{user?.role === 'user' ? 'Customer' : user?.role}</AvatarRole>
            {avatar && (
              <AvatarPreview>New avatar selected: {avatar.name}</AvatarPreview>
            )}
          </AvatarInfo>
        </AvatarSection>

        <Form onSubmit={handleProfileSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isUpdating}
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isUpdating}
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="avatar">Avatar Image</Label>
            {showAvatarUpload && (
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={isUpdating}
              />
            )}
          </FormGroup>

          <ButtonGroup>
            <Button type="submit" className="primary" disabled={isUpdating}>
              {isUpdating ? <LoadingSpinner size="16px" /> : <Save size={16} />}
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </ButtonGroup>
        </Form>
      </Section>
    );
  };

  const renderSecuritySection = () => (
    <Section>
      <SectionTitle>
        <Shield size={20} />
        Security Settings
      </SectionTitle>
      <SectionDescription>
        Manage your password and security preferences.
      </SectionDescription>

      {/* Password Change Section */}
      <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: '0 0 4px 0' }}>
              Change Password
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
              Update your password to keep your account secure
            </p>
          </div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            style={{
              background: showPasswordForm ? '#ef4444' : '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {showPasswordForm ? 'Cancel' : 'Change Password'}
          </button>
        </div>
        
        {showPasswordForm && (
          <form onSubmit={handlePasswordSubmit}>
            <FormGroup>
              <Label>Current Password</Label>
              <Input 
                type="password" 
                placeholder="Enter current password"
                value={passwordCurrent}
                onChange={(e) => setPasswordCurrent(e.target.value)}
                disabled={isUpdatingPassword}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>New Password</Label>
              <Input 
                type="password" 
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isUpdatingPassword}
                required
                minLength={8}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Confirm New Password</Label>
              <Input 
                type="password" 
                placeholder="Confirm new password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                disabled={isUpdatingPassword}
                required
                minLength={8}
              />
            </FormGroup>
            
            {password && passwordConfirm && password !== passwordConfirm && (
              <div style={{ 
                color: '#ef4444', 
                fontSize: '14px', 
                marginTop: '8px',
                padding: '8px 12px',
                backgroundColor: '#fef2f2',
                borderRadius: '6px',
                border: '1px solid #fecaca'
              }}>
                Passwords do not match
              </div>
            )}
            
            <ButtonGroup>
              <Button type="button" onClick={() => setShowPasswordForm(false)} disabled={isUpdatingPassword}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="primary"
                disabled={isUpdatingPassword || !passwordCurrent || !password || !passwordConfirm || password !== passwordConfirm}
              >
                {isUpdatingPassword ? (
                  <>
                    <LoadingSpinner size="16px" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    <Shield size={16} />
                    Update Password
                  </>
                )}
              </Button>
            </ButtonGroup>
          </form>
        )}
      </div>
    </Section>
  );

  const renderNotificationsSection = () => (
    <Section>
      <SectionTitle>
        <Bell size={20} />
        Notification Preferences
      </SectionTitle>
      <SectionDescription>
        Choose how you want to receive notifications.
      </SectionDescription>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: '500' }}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
                Receive notifications about {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
              </p>
            </div>
            <button
              onClick={() => handleNotificationToggle(key)}
              style={{
                width: '48px',
                height: '24px',
                borderRadius: '12px',
                border: 'none',
                background: value ? '#3b82f6' : '#e2e8f0',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'white',
                position: 'absolute',
                top: '2px',
                left: value ? '26px' : '2px',
                transition: 'left 0.2s'
              }} />
            </button>
          </div>
        ))}
      </div>
    </Section>
  );

  const renderPreferencesSection = () => (
    <Section>
      <SectionTitle>
        <Globe size={20} />
        Preferences
      </SectionTitle>
      <SectionDescription>
        Customize your account preferences.
      </SectionDescription>

      <Form>
        <FormRow>
          <FormGroup>
            <Label htmlFor="theme">Theme</Label>
            <select
              id="theme"
              value={preferences.theme}
              onChange={(e) => handlePreferenceChange('theme', e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                width: '100%'
              }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="currency">Currency</Label>
            <select
              id="currency"
              value={preferences.currency}
              onChange={(e) => handlePreferenceChange('currency', e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                width: '100%'
              }}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              value={preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                width: '100%'
              }}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="timezone">Timezone</Label>
            <select
              id="timezone"
              value={preferences.timezone}
              onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                width: '100%'
              }}
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
            </select>
          </FormGroup>
        </FormRow>
      </Form>
    </Section>
  );

  const renderDangerZone = () => (
    <Section>
      <SectionTitle>
        <Trash2 size={20} />
        Danger Zone
      </SectionTitle>
      <SectionDescription>
        Irreversible and destructive actions.
      </SectionDescription>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #ef4444', borderRadius: '8px', background: '#fef2f2' }}>
          <div>
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: '500', color: '#ef4444' }}>
              Export Data
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
              Download a copy of your data
            </p>
          </div>
          <Button onClick={handleExportData} className="secondary">
            <Download size={16} />
            Export
          </Button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #ef4444', borderRadius: '8px', background: '#fef2f2' }}>
          <div>
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: '500', color: '#ef4444' }}>
              Delete Account
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
              Permanently delete your account and all data
            </p>
          </div>
          <Button onClick={handleDeleteAccount} className="secondary">
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </Section>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSection();
      case 'security':
        return renderSecuritySection();
      case 'notifications':
        return renderNotificationsSection();
      case 'preferences':
        return renderPreferencesSection();
      default:
        return renderProfileSection();
    }
  };

  if (!user) {
    return (
      <SettingsContainer>
        <LoadingSpinner size="40px" text="Loading settings..." />
      </SettingsContainer>
    );
  }

  return (
    <SettingsContainer>
      <Header>
        <HeaderTitle>
          <User size={32} />
          Account Settings
        </HeaderTitle>
        <HeaderSubtitle>
          Manage your account preferences and security settings
        </HeaderSubtitle>
      </Header>

      <SettingsGrid>
        <Sidebar>
          <SidebarTitle>Settings</SidebarTitle>
          <NavList>
            <NavItem>
              <NavButton
                active={activeTab === 'profile'}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </NavButton>
            </NavItem>
            <NavItem>
              <NavButton
                active={activeTab === 'security'}
                onClick={() => setActiveTab('security')}
              >
                Security
              </NavButton>
            </NavItem>
            <NavItem>
              <NavButton
                active={activeTab === 'notifications'}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </NavButton>
            </NavItem>
            <NavItem>
              <NavButton
                active={activeTab === 'preferences'}
                onClick={() => setActiveTab('preferences')}
              >
                Preferences
              </NavButton>
            </NavItem>
          </NavList>
        </Sidebar>

        <Content>
          {renderContent()}
          {activeTab === 'profile' && renderDangerZone()}
        </Content>
      </SettingsGrid>
    </SettingsContainer>
  );
};

export default AccountSettingsPage; 