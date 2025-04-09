// components/signup/EmailStep.tsx
import { z } from "zod";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { constant } from "../../../../constants/constant";
import { determineIdentifierType } from "../../../../utils/utils";
import { userForgetStore } from "../../../../store/userForgetStore";
import { FaArrowLeft } from "react-icons/fa";

const IdentifierSchema = z.object({
  identifier: z.string()
    .min(3, "Must be at least 3 characters")
    .refine(value => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) return true;

      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (phoneRegex.test(value)) return true;
      
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      return usernameRegex.test(value);
    }, "Invalid email, phone, or username")
});

type IdentifierData = z.infer<typeof IdentifierSchema>;

export const EmailStep = () => {
  const { setFormData, nextStep, prevStep } = userForgetStore();
  const [isChecking, setIsChecking] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<IdentifierData>({
    resolver: zodResolver(IdentifierSchema),
    mode: "onChange",
  });

  const identifierValue = useWatch({ control, name: "identifier" });

  useEffect(() => {
    setApiError(null);
  }, [identifierValue]);

  const sendOtpRequest = async () => {
    try {
      setIsChecking(true);
      setApiError(null);
      
      const identifierType = determineIdentifierType(identifierValue);
      const payload = { [identifierType]: identifierValue };
      const response = await axios.post(
        `${constant.BASE_URL}/forget-password`,
        payload
      );
      if (response.data.success) {
        setFormData({ [identifierType]: identifierValue });
        nextStep();
      } else {
        setApiError(response.data.message || "Failed to send OTP");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setApiError(error.response?.data?.message || "An error occurred");
      } else {
        setApiError("An unexpected error occurred");
      }
    } finally {
      setIsChecking(false);
    }
  };

  const onSubmit: SubmitHandler<IdentifierData> = async () => {
    await sendOtpRequest();
  };

  return (
    <div>
       <div className="flex flex-col gap-6">
      <div className='flex flex-col gap-1 flex-wrap'>
        <h1 className="text-2xl font-secondary">Hey John Doe!</h1>
        <h2 className="text-2xl font-secondary">Let’s Get You Back In 💫</h2>
    </div>
    <div className='flex flex-col gap-1 flex-wrap'>
        <h3 className='text-white/70'>Enter your username, email, or phone number.
We’ll send a code to help you recover your account securely.

       </h3>
        <h4 className='text-white'> Hang tight, we’re auto-detecting it for you.</h4>
    </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex flex-col space-y-1 md:space-y-2">
          <div className="relative">
            <label className="text-xs">Username, email or phone number</label>
            <input
              type="text"
              className="w-full h-11 px-5 py-2.5 flex items-center bg-transparent border border-[#BBBBBE] rounded-lg text-gray-light placeholder-gray-light focus:border-gray-light focus:bg-transparent focus:text-gray-light focus:outline-none focus:ring-0"
              {...register("identifier")}
              placeholder="Email, phone, or username"
              autoComplete="off"
            />
          </div>

          {errors.identifier && (
            <span className="text-red-500 text-xs md:text-sm">
              {errors.identifier.message}
            </span>
          )}
          
          {apiError && (
            <span className="text-red-500 text-xs md:text-sm">{apiError}</span>
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
            disabled={!isValid || isChecking}
            className={`px-6 w-full cursor-pointer py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isValid ? "bg-violet-600 hover:bg-violet-700" : "bg-violet-500 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        
      </form>
      </div>
    </div>
  );
};