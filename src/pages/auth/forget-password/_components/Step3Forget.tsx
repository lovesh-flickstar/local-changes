import { z } from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { constant } from "../../../../constants/constant";
import { toast } from "sonner";
import { userForgetStore } from "../../../../store/userForgetStore";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
// Removed incorrect import of 'watch' from 'fs'

const PasswordSchema = z
  .object({
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters long" }),
  })

type PasswordData = z.infer<typeof PasswordSchema>;

export const PasswordStep = () => {
  const navigate = useNavigate();
  const { email , phone , username, nextStep, prevStep } = userForgetStore();
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const count = [hasMinLength, hasNumber, hasSymbol].filter(Boolean).length;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<PasswordData>({
    resolver: zodResolver(PasswordSchema),
    mode: "onChange",
  });
 const password = watch("password");
 console.log(errors, "errors");
  console.log(errors, "errors");
  useEffect(() => {
    const pwd = password || "";
    setHasMinLength(pwd.length >= 8);
    setHasNumber(/\d/.test(pwd));
    setHasSymbol(/[!@#$%^&*(),.?":{}|<>]/.test(pwd));
  }, [password]);
 

  const onSubmit: SubmitHandler<PasswordData> = async(data) => {
    try {
      const identifier = email || phone || username;
      const identifierType = email ? 'email' : phone ? 'phone' : 'username';
      console.log("identifierType", identifierType);
      console.log("identifier", identifier);
      const response =await axios.put(`${constant.BASE_URL}/forget-password`, {
        [identifierType]: identifier,
        password: data.password,
      });
      if (response.data.success) {
        toast.success('Password updated successfully!');
        navigate('/login'); // Redirect to login page
        nextStep(); // Proceed to the next step
      } else {
        toast.error('Unable to update password. Please try again.');
      }
    }catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
        toast.error(error.response?.data?.message || 'Error updating password');
      } else {
        console.error("Unexpected error:", error);
        toast.error('Error updating password');
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className='flex flex-col gap-1 flex-wrap'>
        <h1 className="text-2xl font-secondary">Hey {username}!</h1>
        <h2 className="text-2xl font-secondary"> Ready to Join Flickstar  🌟</h2>
    </div>
    <div className='flex flex-col gap-1 flex-wrap'>
        <h3 className='text-white/70'>Set New password that keeps your account secure and your progress protected.
       
       </h3>
        <h4 className='text-white'>  Secure Your FlickStar Account 🔒</h4>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-4">
        {/* Password Input */}
        <div className="relative">
        <label className="text-sm text-white/80">Set Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="w-full h-11 px-5 py-2.5 flex items-center bg-transparent border border-[#BBBBBE] rounded-lg text-gray-light placeholder-gray-light focus:border-gray-light focus:bg-transparent focus:text-gray-light focus:outline-none focus:ring-0"
            placeholder="Enter your password"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform text-gray-light hover:text-gray-500"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        <div className="flex h-2 mb-4">
  <div className={`flex-1 rounded-l ${count >= 1 ? (count >= 3 ? 'bg-green-500' : count >= 2 ? 'bg-yellow-500' : 'bg-red-500') : 'bg-gray-500'}`}></div>
  <div className={`flex-1 ${count >= 2 ? (count >= 3 ? 'bg-green-500' : 'bg-yellow-500') : 'bg-gray-500'}`}></div>
  <div className={`flex-1 rounded-r ${count >= 3 ? 'bg-green-500' : 'bg-gray-500'}`}></div>
</div>

 <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FiCheckCircle className={`${hasMinLength ? 'text-green-500' : 'text-gray-500'}`} />
              <span className={`text-sm ${hasMinLength ? 'text-green-500' : 'text-gray-300'}`}>
                8 characters minimum
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiCheckCircle className={`${hasNumber ? 'text-green-500' : 'text-gray-500'}`} />
              <span className={`text-sm ${hasNumber ? 'text-green-500' : 'text-gray-300'}`}>
                At least one number
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiCheckCircle className={`${hasSymbol ? 'text-green-500' : 'text-gray-500'}`} />
              <span className={`text-sm ${hasSymbol ? 'text-green-500' : 'text-gray-300'}`}>
                At least one symbol
              </span>
            </div>
          </div>
        {errors.password && (
          <span className="text-red-500 text-xs md:text-sm block">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
       <button
                   type="button"
                   onClick={prevStep}
                   className="absolute top-36 right-3/7 cursor-pointer"
                 >
                   <FaArrowLeft size={24} />
                 </button>
       
      </div>
      <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 w-full py-2 cursor-pointer border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isSubmitting ? "bgviolet-500 hover:bg-violet-600" : "bg-violet-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
    </form>
    </div>
  );
};