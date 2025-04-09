import { RiDeleteBin5Line } from "react-icons/ri";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { constant } from "../../constants/constant";
import { toast } from "sonner";
import { countries, Country } from "../../constants/Country";

const PersonalSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(1, { message: "Username is required" }),
  dob: z.string().date(),
  gender: z.string(),
  photo: z.any().optional(),
  phone: z.string().min(1, { message: "Phone number is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

type PersonalData = z.infer<typeof PersonalSchema>;

const PersonalDetails = () => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting },
    watch
  } = useForm<PersonalData>({
    resolver: zodResolver(PersonalSchema),
  });
  let watchPhoto = watch("photo");
  // console.log("watchPhoto", watchPhoto);
  React.useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const response = await axios.get(
          `${constant.BASE_URL}/v1/personal-detail`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const apiData = response.data.data;
        // console.log("===> apiData1", apiData);
        const formData = {
          ...apiData.profileDetails, 
          dob: apiData.profileDetails.dob.split('T')[0],
          phone: apiData.profileDetails.phone
        };
        // console.log("===> apiData", formData);
        reset(formData); 
        setPreviewUrl(formData.photo); 
      } catch (error) {
        console.error("Failed to fetch personal details:", error);
        toast.error("Failed to load personal details.");
      }
    };

    fetchPersonalDetails();
  }, [reset]);

  React.useEffect(() => {
    let objectUrl: string | null = null;
  
    if (watchPhoto?.[0] instanceof File) { 
      objectUrl = URL.createObjectURL(watchPhoto[0]);
      setPreviewUrl(objectUrl);
    } else if (typeof watchPhoto === "string") { 
      setPreviewUrl(watchPhoto);
    } else {
      setPreviewUrl(null);
    }
  
    // Cleanup function
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl); 
      }
    };
  }, [watchPhoto]);


  const onSubmit: SubmitHandler<PersonalData> = async (
    formData: PersonalData
  ) => {
    // console.log("====>formData" , formData);
    try{
      const signedString = await getPresignedUrl()
      // console.log("Signed URL:", signedString);
      const {data :   {profileSignedURL}} = signedString;
      // console.log("===> profileSignedURL", profileSignedURL);
      const publicBase = "https://pub-301c1efdf41d428f9ab043c4d4ecbac9.r2.dev"; // known public base
      const objectPath = new URL(profileSignedURL).pathname; // gives /user/abc/profile-image
      const publicUrl = `${publicBase}${objectPath}`; // construct the public URL
      // console.log(publicUrl)
       await fetch(profileSignedURL, {
        method: "PUT",
        headers: {
          "Content-Type": watchPhoto[0].type,
        },
        body: watchPhoto[0],
      });
      // console.log("===> uploadResponse", uploadResponse);
  const response = await axios.put(
    `${constant.BASE_URL}/v1/personal-detail`,
    {  ...formData , photo: publicUrl },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    }
  );
    console.log("Response from API:", response.data);
    const { success, data } = response.data;
    if (success) {
      toast.success("Personal details updated successfully!");
    } else {
      console.error("Login failed", data);
    }}
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
      }
      toast.error("Failed to update personal details. Please try again.");
    }
  };

  const getPresignedUrl = async () => {
    console.log('i am here for presignedurl =>', watchPhoto[0].type)
    const response = await axios.post(
      `${constant.BASE_URL}/v1/profile-picture`,
      { fileType: watchPhoto?.[0]?.type },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };

  return (
    <form className="flex flex-col gap-10 pb-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-start gap-5">
        <div className="w-1/5 min-w-[150px]">
          <h2 className="text-lg font-semibold text-white">Profile</h2>
          <p className="text-sm text-gray-400">Set your account Details</p>
        </div>

        <div className="flex-1 flex items-start gap-8">
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="flex flex-col space-y-1 md:space-y-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none"
              />
              {errors.name && (
                <span className="text-red-500 text-xs  md:text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex col-span-2 flex-col space-y-1 md:space-y-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your Email"
                {...register("email")}
                className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none"
              />
              {errors.email && (
                <span className="text-red-500 text-xs md:text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
  <div className="relative inline-block">
    <img
      src={previewUrl || "https://via.placeholder.com/150"}
      alt="Profile"
      className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
    />
    {isLoading && watchPhoto && (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
        <ClipLoader
          color="#00c3ff"
          loading={true}
          size={70}
          aria-label="Loading Spinner"
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>
    )}
  </div>
  <div className="flex gap-2">
    <label
      className="px-4 py-2 text-sm text-white border border-gray-700 rounded-lg hover:border-gray-500 hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
    >
      Edit Photo
      <input
        type="file"
        accept="image/*"
        {...register("photo")}
        className="hidden"
        disabled={isLoading}
      />
    </label>
    <button
      className="p-2 border border-gray-700 rounded-full text-red-400 hover:border-gray-500 disabled:opacity-50"
      onClick={() => watchPhoto = null}
      disabled={!watchPhoto || isLoading}
    >
      <RiDeleteBin5Line className="text-base" />
    </button>
  </div>
</div>
        </div>
      </div>

      <hr className="border-t border-gray-700" />
      <div className="flex justify-between items-start gap-5">
        <div className="w-1/5 min-w-[150px]">
          <h2 className="text-lg font-semibold text-white">User Name</h2>
          <p className="text-sm text-gray-400">Set your Username</p>
        </div>
        <div className="flex-1 flex-col space-y-1 md:space-y-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your Username"
            {...register("username")}
            className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none"
          />
           {errors.username && (
                <span className="text-red-500 text-xs  md:text-sm">
                  {errors.username.message}
                </span>
              )}
          <p className="text-xs text-gray-500 mt-1">
            ℹ️ Set a username that uniquely identifies you. You can change this
            at any time.
          </p>
        </div>
      </div>

      <hr className="border-t border-gray-700" />

      <div className="flex justify-between items-start gap-5">
        <div className="w-1/5 min-w-[150px]">
          <h2 className="text-lg font-semibold text-white">Personal Details</h2>
          <p className="text-sm text-gray-400">Fill your Personal details</p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1 md:space-y-2 w-full">
  <label className="block text-sm font-medium text-gray-300 mb-1">
    Date of Birth
  </label>
  <div className="relative w-full">
    <input
      type="date"
      placeholder="DD/MM/YYYY"
      {...register("dob")}
      className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none
                appearance-none  
                min-w-[200px]    
                h-[40px]         
                [&::-webkit-calendar-picker-indicator]:absolute 
                [&::-webkit-calendar-picker-indicator]:left-0
                [&::-webkit-calendar-picker-indicator]:w-full
                [&::-webkit-calendar-picker-indicator]:h-full
                [&::-webkit-calendar-picker-indicator]:opacity-0"
    />
  </div>
  {errors.dob && (
    <span className="text-red-500 text-xs md:text-sm min-h-[20px]">
      {errors.dob.message}
    </span>
  )}
</div>
          <div className="flex flex-col space-y-1 md:space-y-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Gender
            </label>
            <input
              type="text"
              placeholder="eg. Male"
              {...register("gender")}
              className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none"
            />
             {errors.gender && (
                <span className="text-red-500 text-xs  md:text-sm">
                  {errors.gender.message}
                </span>) }
          </div>

          <div className="flex flex-col space-y-1 md:space-y-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number
            </label>
            <div className="flex gap-2">
              <select className="bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-slate-400 max-w-[90px]">
                {countries.map((country :Country, index) => (
                <option key={index}>{country.phoneCodes}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="(158) 008-9987"
                {...register("phone")}
                className="flex-1 bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none"
              />
            </div>
            {errors.phone && (
                <span className="text-red-500 text-xs  md:text-sm">
                  {errors.phone.message}
                </span>) }
          </div>

          <div className="flex flex-col space-y-1 md:space-y-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Country
            </label>
            <select className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-slate-500"     {...register("country")}>
               {countries.map((country :Country, index) => (
                        <option key={index} value={country.code}>
                          {country.name}
                        </option>
                      ))}
            </select>
            {errors.country && (
                <span className="text-red-500 text-xs  md:text-sm">
                  {errors.country.message}
                </span>) }
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 text-sm text-gray-300 border border-gray-700 rounded-lg hover:border-gray-500 hover:bg-gray-800">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700" type="submit">
          {isSubmitting ? (
            <ClipLoader
              color="#00c3ff"
              loading={true}
              size={20}
              aria-label="Loading Spinner"
              cssOverride={{
                display: "block",
                margin: "0 auto",
              }}
            />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
};

export default PersonalDetails;
