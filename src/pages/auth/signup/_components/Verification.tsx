// VerificationStep.tsx
import { userStore } from '../../../../store/userStore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { constant } from '../../../../constants/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const OtpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be 6 digits' })
});



type OtpData= z.infer<typeof OtpSchema>;
export const VerificationStep = () => {
  const navigate = useNavigate();
  const {email, username, name, dob, country, password, prevStep } = userStore();
  const { register, handleSubmit, formState: { errors , isSubmitting } } = useForm({
    resolver: zodResolver(OtpSchema)
  });

  const onSubmit: SubmitHandler<OtpData> = async (data : OtpData) => {
    try {
      const response = await axios.post(`${constant.BASE_URL}/verify-otp`, {
        otp: data.otp,
        fcmToken: 'Abdefg123456',
        email,
        username,
        name,
        dob,
        country,
        password
      });
      
      if (response.data.success) {
        toast.success('Account verified successfully!');
        navigate('/login');
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
              console.error("Error response:", error.response?.data);}
      toast.error('Verification failed. Please try again.');

    }
  };

  return (
    <div className="flex flex-col gap-6">
    <div className='flex flex-col gap-1 flex-wrap'>
        <h1 className="text-2xl font-secondary">Hey John Doe!</h1>
        <h2 className="text-2xl font-secondary">Ready to Join Flickstar 🌟</h2>
    </div>
    <div className='flex flex-col gap-1 flex-wrap'>
        <h3 className='text-white/70'>We’re automatically detecting the SMS sent to your email  johnflickstar@gmail.com
       </h3>
        <h4 className='text-white'>  Hang tight, we’re auto-detecting it for you. </h4>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">


      <div className="relative">
      <label className="text-sm text-white/80">Username</label>
        <input
          {...register('otp')}
          type="text"
          inputMode="numeric"
          className="w-full h-11 px-5 py-2.5 text-sm bg-transparent border border-[#BBBBBE] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
          placeholder="Enter OTP here..."
          maxLength={6}
        />
        {errors.otp && (
          <p className="text-red-500 text-sm mt-2">{errors.otp.message?.toString()}</p>
        )}
      </div>
       <button
                            type="button"
                            onClick={prevStep}
                           className="absolute top-12 2xl:top-36 right-5/11 2xl:right-3/7 cursor-pointer"
                          >
                            <FaArrowLeft  size={24}/>
                          </button>

      <button
        type="submit"
        disabled={isSubmitting }
        className={`w-full h-11 rounded-lg text-white font-medium ${
          isSubmitting ? 'bg-gray-400' : 'bg-violet-600 hover:bg-violet-700'
        }`}
      >
        {isSubmitting ? 'Verifying...' : 'Verify Account'}
      </button>
    </form>
    </div>
  );
};