// pages/SignupPage.tsx
import { UserAuthLayout } from '../../../components/auth/UserAuthLayout';
import { userStore } from '../../../store/userStore';
import { EmailStep } from './_components/Email';
import { UsernameStep } from './_components/Username';
import { PasswordStep } from './_components/Password';
import { VerificationStep } from './_components/Verification';
import { PersonalDetailsStep } from './_components/Name';
import auth1 from '../../../assets/compressed/auth1.webp';
import auth2 from '../../../assets/compressed/auth2.webp';
import auth3 from '../../../assets/compressed/auth3.webp';
import { useEffect } from 'react';

export const Signup = () => {
  const { currentStep, reset } = userStore();

  useEffect(() => {
    return () => reset();
  }, [reset]);

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <EmailStep />;
      case 2: return <PersonalDetailsStep />;
      case 3: return <UsernameStep />;
      case 4: return <PasswordStep />;
      case 5: return <VerificationStep />;
      default: return <EmailStep />;
    }
  };

  return (
    <UserAuthLayout authType='signup'
      page="Sign In"
      images={[auth1, auth2, auth3]}
      footerLinkText="Already have an account?"
      footerLinkPath="/login"
    >
      <div className="w-full mx-auto p-6">
        {renderStep()}
      </div>
    </UserAuthLayout>
  );
};