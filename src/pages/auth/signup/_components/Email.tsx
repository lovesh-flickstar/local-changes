// components/signup/EmailStep.tsx
import { z } from "zod";
import { userStore } from "../../../../store/userStore";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import axios from "axios";
import {FaArrowLeft } from "react-icons/fa";
import { constant } from "../../../../constants/constant";

const EmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type EmailData = z.infer<typeof EmailSchema>;

export const EmailStep = () => {
  const { email, setFormData, nextStep, prevStep } = userStore();
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm<EmailData>({
    resolver: zodResolver(EmailSchema),
    defaultValues: { email },
    mode: "onChange",
  });

  const emailValue = useWatch({ control, name: "email" });

  useEffect(() => {
    setEmailAvailable(null);
    setApiError(null);
  }, [emailValue]);

  const checkEmailAvailability = async () => {
    try {
      setIsChecking(true);
      setApiError(null);
      const response = await axios.post(
        `${constant.BASE_URL}/check-email`,
        { email: emailValue },
      );
      
      const isAvailable = response.data.success;
      setEmailAvailable(isAvailable);
      if (!isAvailable) {
        setApiError("Email is already registered");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setApiError(error.response?.data?.message || "An error occurred while checking email availability");
      } else {
        setApiError("An unexpected error occurred");
      }
      setEmailAvailable(null);
    } finally {
      setIsChecking(false);
    }
  };

  const onSubmit: SubmitHandler<EmailData> = (data) => {
    if (emailAvailable !== true) return;
    setFormData({ email: data.email });
    nextStep();
  };
  return (
    <div>
      <div className="flex flex-col gap-6">
          <div className='flex flex-col gap-1 flex-wrap'>
              <h1  className="text-xl 2xl:text-2xl font-secondary">  Hey FlickStar 🌟</h1>
              <h2 className="text-xl 2xl:text-2xl font-secondary"> Welcome Back  👋</h2>
          </div>
          <div className='flex flex-col gap-1 flex-wrap'>
              <h3 className='text-white/70 text-sm 2xl:text-lg'>New day. New vibes. New chances to grow, earn, and shine</h3>
              <h4 className='text-white text-sm 2xl:text-lg'>Let’s get started. Sign in to take control.</h4>
          </div>
          
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex flex-col space-y-1 md:space-y-2">
          <div className="relative">
            <div className="flex flex-col gap-1"> 
            <label className="text-sm text-white/80">Email</label>
            <input
              type="email"
              className="w-full h-11 px-5 py-2.5 flex items-center bg-transparent border border-[#BBBBBE] rounded-lg text-gray-light placeholder-gray-light focus:border-gray-light focus:bg-transparent focus:text-gray-light focus:outline-none focus:ring-0"
              {...register("email")}
              placeholder="example@email.com"
              autoComplete="off"
            /></div>
           
            {isValid && emailAvailable !== true && (
              <button
                type="button"
                onClick={checkEmailAvailability}
                disabled={isChecking}
                className="absolute top-1/2 right-3 transform text-sm text-blue-500 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {isChecking ? "Checking..." : "Check"}
              </button>
            )}
          </div>
          
          {errors.email && (
            <span className="text-red-500 text-xs md:text-sm">
              {errors.email.message}
            </span>
          )}
          
          {apiError && (
            <span className="text-red-500 text-xs md:text-sm">{apiError}</span>
          )}
          
          {emailAvailable === true && (
            <span className="text-green-500 text-xs md:text-sm">
              Email is available!
            </span>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={prevStep}
            className="absolute top-12 2xl:top-36 right-5/11 2xl:right-3/7 cursor-pointer"
          >
            <FaArrowLeft  size={24}/>
          </button>
          <button
            type="submit"
            disabled={!emailAvailable || isSubmitting || !isValid}
            className={`px-6 w-full py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              emailAvailable
                ? "bg-violet-500 hover:bg-violet-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};