import { EmailStep } from './_components/Step1Forget';
import { VerificationStep } from './_components/Step2Forget';
import { PasswordStep } from './_components/Step3Forget';
import auth1 from '../../../assets/compressed/auth1.webp';
import auth2 from '../../../assets/compressed/auth2.webp';
import auth3 from '../../../assets/compressed/auth3.webp';
import { useEffect } from 'react';
import { UserAuthLayout } from '../../../components/auth/UserAuthLayout';
import { userForgetStore } from '../../../store/userForgetStore';

export const ForgotPasswordPage = () => {
  const { currentStep, reset } = userForgetStore();

  useEffect(() => {
    return () => reset();
  }, [reset]);

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <EmailStep />;
      case 2: return <VerificationStep />;
      case 3: return <PasswordStep />;
      default: return <EmailStep />;
    }
  };

  return (
    <UserAuthLayout
      authType='forgot-password'
      page='forgot-password'
      images={[auth1, auth2, auth3]}
      footerLinkText="Remember your password?"
      footerLinkPath="/login"
    >
      <div className="max-w-md mx-auto p-6">
        {renderStep()}
      </div>
    </UserAuthLayout>
  );
};