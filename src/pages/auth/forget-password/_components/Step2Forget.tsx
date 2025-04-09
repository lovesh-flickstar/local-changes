import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { constant } from '../../../../constants/constant';
import { toast } from 'sonner';
import { userForgetStore } from '../../../../store/userForgetStore';
import { FaArrowLeft } from 'react-icons/fa';

const OtpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be 6 digits' })
});

type OtpData = z.infer<typeof OtpSchema>;


export const VerificationStep = () => {
  const {email , phone , username, nextStep, prevStep } = userForgetStore();
  const [isVerifying, setIsVerifying] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<OtpData>({
    resolver: zodResolver(OtpSchema)
  });

  const onSubmit: SubmitHandler<OtpData> = async (data: OtpData) => {
    setIsVerifying(true);
    const identifier = email || phone || username;
    const identifierType = email ? 'email' : phone ? 'phone' : 'username';
    try {
      const response = await axios.post(`${constant.BASE_URL}/forget-password-otp`, {
        [identifierType]: identifier,
        otp: data.otp,
      });

      if (response.data.success) {
        toast.success('OTP verified successfully!');
        nextStep(); // Proceed to the next step
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
        toast.error(error.response?.data?.message || 'Verification failed');
      } else {
        toast.error('Verification failed. Please try again.');
      }
    } finally {
      setIsVerifying(false);
    }
  };
 
  return (
    <div className="flex flex-col gap-6">
      <div className='flex flex-col gap-1 flex-wrap'>
        <h1 className="text-2xl font-secondary">Hey {username}!</h1>
        <h2 className="text-2xl font-secondary"> Ready to Join Flickstar  🌟</h2>
    </div>
    <div className='flex flex-col gap-1 flex-wrap'>
        <h3 className='text-white/70'>We’re automatically detecting the SMS sent to your email  {email}
        Hang tight, we’re auto-detecting it for you.
        Hang tight, we’re auto-detecting it for you.
       </h3>
        <h4 className='text-white'> Hang tight, we’re auto-detecting it for you.</h4>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      <div className="relative">
        <input
          {...register('otp')}
          type="text"
          inputMode="numeric"
          className="w-full mt-3 h-11 px-5 py-2.5 text-center text-xl bg-transparent border border-[#BBBBBE] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••"
          maxLength={6}
        />
        {errors.otp && (
          <p className="text-red-500 text-sm mt-2">{errors.otp.message}</p>
        )}
      </div>
         <button
                            type="button"
                            onClick={prevStep}
                            className="absolute top-36 right-3/7 cursor-pointer"
                          >
                            <FaArrowLeft  size={24}/>
                          </button>
      <button
        type="submit"
        disabled={isVerifying}
        className={`w-full h-11 rounded-lg text-white font-medium ${
          isVerifying ? 'bg-violet-400' : 'bg-violet-500 hover:bg-violet-700'
        }`}
      >
        {isVerifying ? 'Verifying...' : 'Verify Account'}
      </button>
    </form>
    </div>
  );
};