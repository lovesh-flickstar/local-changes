import { countries, Country } from "../../../../constants/Country";
import { userStore } from "../../../../store/userStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {FaArrowLeft } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";

const UserSchema = z.object(
  {
    name: z
      .string()
      .min(4, { message: "Full name must be at least 2 characters long" })
      .max(30, { message: "Full name must be at most 50 characters long" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Full name can only contain letters and spaces",
      }),
    country: z.string().min(1, { message: "Country is required" }),
    dob: z.string().min(1, { message: "Date of Birth is required" }),
  },
  {
    message: "Please fill out this field",
  }
);

type UserData = z.infer<typeof UserSchema>;

export const PersonalDetailsStep = () => {
  const { setFormData, nextStep, prevStep } =
    userStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(UserSchema),
  })
  const onSubmit: SubmitHandler<UserData> = async (data: UserData) => {
    console.log("data", data);
    setFormData({
      name: data.name,
      country: data.country,
      dob: data.dob,
    });
    nextStep();
  };
  return (
    <div className="flex flex-col gap-6 max-h-screen">
    <div className='flex flex-col gap-1 flex-wrap'>
        <h1 className="text-xl 2xl:text-2xl font-secondary">Hey!</h1>
        <h2 className="text-xl 2xl:text-2xl font-secondary">Ready to Join Flickstar 🌟</h2>
    </div>
    <div className='flex flex-col gap-1 flex-wrap'>
        <h3 className='text-white/70 text-sm 2xl:text-lg'>New platform, new vibes, endless chances to earn, grow, and shine.
       </h3>
        <h4 className='text-white text-sm 2xl:text-lg'> Pop in your Personal details and let’s begin your FlickStar story.</h4>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col 2xl:space-y-2">
        <div className="flex flex-col">
      <div className="flex flex-col gap-1"> 
      <label className="text-sm text-white/80">Full Name</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full h-11 px-5 py-2.5 flex items-center bg-transparent border border-[#BBBBBE] rounded-lg text-[var(--gray-light)] placeholder-[var(--gray-light)] focus:border-[var(--gray-light)] focus:bg-transparent focus:text-[var(--gray-light)] focus:outline-none focus:ring-0 transition-colors duration-200"
          placeholder="Enter your full name"
          required
        />
        </div>
        {errors.name && (
          <span className="text-red-500 text-xs  md:text-sm">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Date of Birth Field */}
      <div className="flex flex-col 2xl:space-y-2"> 
      <div className="space-y-2 relative w-full">
      <div className="flex flex-col gap-1"> 
      <label className="text-sm text-white/80">Date of Birth</label>
        <input
          id="dob"
          type="date"
          {...register("dob")}
          className="w-full h-11 px-5 py-2.5 flex items-center  border  rounded-lg  bg-transparent border-[#BBBBBE] focus:border-gray-light focus:bg-transparent focus:text-gray-light focus:outline-none focus:ring-0"
          required
        />
        </div>
        <span className="absolute top-1/2 right-2.5 transform pointer-events-none text-blue-500 text-base">
          📅
        </span>
      </div>
      {errors.name && (
          <span className="text-red-500 text-xs  md:text-sm">
            {errors.name.message}
          </span>
        )}
        </div>

      {/* Country Select Field */}
      <div className="flex flex-col 2xl:gap-1"> 
      <label className="text-sm text-white/80">Country</label>

      <select
        id="country-select"
        {...register("country")}
        className="w-full  h-11 px-5 py-2.5 flex items-center bg-transparent border border-[#BBBBBE] rounded-lg text-[var(--gray-light)] placeholder-[var(--gray-light)] focus:border-[var(--gray-light)] focus:bg-transparent focus:text-[var(--gray-light)] focus:outline-none focus:ring-0 transition-colors duration-200"
        required
      >
        <option value="" disabled>
          -- Select a Country --
        </option>
        {countries.map((country :Country, index) => (
          <option key={index} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      </div>


      {/* Navigation Buttons */}
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
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-500 hover:bg-violet-700 w-full"
        >
          Next
        </button>
      </div>
      </div>
    </form>
    </div>
  );
};
