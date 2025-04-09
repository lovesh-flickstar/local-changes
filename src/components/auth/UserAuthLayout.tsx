// components/auth/UserAuthLayout.tsx
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../theme/ThemeToggle';
import PhoneImages from '../media/PhoneImages';
import SocialLogin from './SocialLogin/SocialLogin';

interface UserAuthLayoutProps {
  children: React.ReactNode;
  page: string;
  showFooterLink?: boolean;
  footerLinkText?: string;
  footerLinkPath?: string;
  images?: string[];
  authType: string;
}

export const UserAuthLayout = ({
  children,
  page,
  showFooterLink = true,
  footerLinkText = "Already have an account?",
  footerLinkPath = "/signup",
}: UserAuthLayoutProps) => {
  return (
    <div className="flex w-full min-h-screen">
      {/* Left Section - Phone Images */}
      <div className="hidden login-phone h-screen lg:flex flex-1 flex-col gap- p-4 2xl:p-8 relative w-full">
     
        <PhoneImages />
      </div>

      {/* Right Section - Auth Form */}
      <div className="flex-1 max-h-screen bg-[#05070A] text-white flex flex-col items-center justify-center p-6 2xl:p-8">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <div className="w-full max-w-xl">
          {/* Logo Section */}
          

          {/* Auth Content */}
          <div className=" rounded-xl shadow-lg p-6 space-y-3">
            <div className='flex flex-col gap-5'>
         
            {children}
            </div>

            <div className="relative sm:w-full mt-5">
              <hr className="border-gray-600" />
              <span className="absolute -top-3 text-md inset-x-0 mx-auto w-fit bg-[#111111] px-4 sm:px-6 md:px-4 text-white ">
               or
              </span>
            </div>

            <SocialLogin />

            {showFooterLink && (
              <p className="text-center text-sm text-gray-500 2xl:mt-6">
                {footerLinkText}{' '}
                <Link 
                  to={footerLinkPath}
                  className="text-violet-500 font-medium hover:text-primary-dark"
                >
                  {page.includes('Sign In') ? 'Sign Up' : 'Sign In'}
                </Link>
              </p>
            )}
          </div>

          {/* App Downloads Section */}
          <div className="2xl:mt-26 flex flex-col items-center space-y-4">
            <p className="text-xs text-gray-500">© 2025 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};