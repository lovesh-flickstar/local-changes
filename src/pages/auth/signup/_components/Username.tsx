import { z } from "zod";
import { userStore } from "../../../../store/userStore";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { constant } from "../../../../constants/constant";
import { FaArrowLeft } from "react-icons/fa";

const UserNameSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers and underscores",
    }),
});

type UserNameData = z.infer<typeof UserNameSchema>;

export const UsernameStep = () => {
  const { username, setFormData, nextStep, prevStep } = userStore();
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm<UserNameData>({
    resolver: zodResolver(UserNameSchema),
    defaultValues: { username },
    mode: "onChange",
  });

  const usernameValue = useWatch({ control, name: "username" });

  useEffect(() => {
    setUsernameAvailable(null);
    setApiError(null);
  }, [usernameValue]);

  const checkUsernameAvailability = async () => {
    try {
      setIsChecking(true);
      setApiError(null);
      const response = await axios.post(
        `${constant.BASE_URL}/check-username`,
        { username: usernameValue },
      );
      console.log("Response from API:", response.data);
      const isAvailable = response.data.success;
      setUsernameAvailable(isAvailable);
      if (!isAvailable) {
        setApiError("Username is already taken");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setApiError(error.response?.data?.message || "An error occurred while checking username availability");
      } else {
        setApiError("An unexpected error occurred");
      }
      setUsernameAvailable(null);
    } finally {
      setIsChecking(false);
    }
  };

  const onSubmit: SubmitHandler<UserNameData> = (data) => {
    if (usernameAvailable !== true) return;
    setFormData({ username: data.username });
    nextStep();
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
    <div className='flex flex-col gap-1 flex-wrap'>
        <h1 className="text-2xl font-secondary">Hey John Doe!</h1>
        <h2 className="text-2xl font-secondary">Ready to Join Flickstar 🌟</h2>
    </div>
    <div className='flex flex-col gap-1 flex-wrap'>
        <h3 className='text-white/70'>Create a username that’s totally you. it’ll be your name across the A FlickStar universe..
       </h3>
        <h4 className='text-white'>  Claim Your FlickStar Identity </h4>
    </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex flex-col space-y-1 md:space-y-2">
          <div className="relative">
          <label className="text-sm text-white/80">Username</label>
            <input
              id="username"
              type="text"
              {...register("username")}
              className="w-full h-11 px-5 py-2.5 flex items-center bg-transparent border border-[#BBBBBE] rounded-lg text-gray-light placeholder-gray-light focus:border-gray-light focus:bg-transparent focus:text-gray-light focus:outline-none focus:ring-0"
              placeholder="john_doe23"
              autoComplete="off"
            />
            {isValid && usernameAvailable !== true && (
              <button
                type="button"
                onClick={checkUsernameAvailability}
                disabled={isChecking}
                className="absolute top-1/2 right-3 transform text-sm text-blue-500 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {isChecking ? "Checking..." : "Check"}
              </button>
            )}
          </div>
          
          {errors.username && (
            <span className="text-red-500 text-xs md:text-sm">
              {errors.username.message}
            </span>
          )}
          
          {apiError && (
            <span className="text-red-500 text-xs md:text-sm">{apiError}</span>
          )}
          
          {usernameAvailable === true && (
            <span className="text-green-500 text-xs md:text-sm">
              Username is available!
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
            disabled={!usernameAvailable || isSubmitting || !isValid}
            className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white w-full ${
              usernameAvailable
                ? "bg-blue-600 hover:bg-violet-500"
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