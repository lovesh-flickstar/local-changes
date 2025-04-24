import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { constant } from "../../../../constants/constant";
import { useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Quest } from "../../../../types/quest";

const QuestSchema = z.object({
  title: z.string().min(4, "Title is required"),
  description: z.string().min(4, "Description is required"),
  mode: z.enum(["GoFlick", "OnFlick"]),
  maxApplicants: z.coerce.number().int().min(1, "Max Applicants is required"),
  totalAmount: z.coerce.number().int().min(1, "Total Amount is required"),
  location: z.string().min(4, "Location is required"),
  lat: z.coerce
    .number()
    .min(-90, "Invalid latitude")
    .max(90, "Invalid latitude"),
  long: z.coerce
    .number()
    .min(-180, "Invalid longitude")
    .max(180, "Invalid longitude"),
  media: z.instanceof(FileList)
});
type QuestData = z.infer<typeof QuestSchema>;
export const EditQuestForm = ({
      quest,
      onSuccess,
    }: {
      quest: Quest;
      onSuccess: () => void;
    }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<QuestData>({
    resolver: zodResolver(QuestSchema),
    defaultValues: {
      lat: 26.8770276,
      long: 75.7255187,
    },
  });
  console.log("-======>", errors)
  const [, setMediaPreviews] = useState<
    Array<{ url: string; type: string }>
  >([]);
  const mediaFileList = watch("media");
     // Generate previews for selected media files
      useEffect(() => {
          if (mediaFileList?.length > 0) {
              const files = Array.from(mediaFileList);
              const newPreviews = files.map(file => ({
                  url: URL.createObjectURL(file),
                  type: file.type
              }));
              setMediaPreviews(newPreviews);
              return () => {
                  newPreviews.forEach(preview => URL.revokeObjectURL(preview.url));
              };
          } else {
              setMediaPreviews([]);
          }
      }, [mediaFileList]);
  useEffect(() => {
    if (mediaFileList?.length > 0) {
      const files = Array.from(mediaFileList);
      const newPreviews = files.map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type,
      }));
      setMediaPreviews(newPreviews);
      return () => {
        newPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
      };
    } else {
      setMediaPreviews([]);
    }
  }, [mediaFileList]);
  // const handleSetLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setCoords({
  //           lat: position.coords.latitude,
  //           long: position.coords.longitude
  //         });
  //       },
  //       (error) => {
  //         console.error('Error getting location:', error);
  //       }
  //     );
  //   }
  // };

  // const submitForm = async (values: CreateQuest) => {
  //   try {
  //     const accessToken = localStorage.getItem('accessToken');
  //     if (!accessToken) throw new Error('No access token found');

  //     // Step 1: Get presigned URLs
  //     const mediaFiles = Array.from((values.media as unknown) as FileList);
  //     const presignedPayload = {
  //       media: mediaFiles.map(file => ({
  //         fileName: file.name,
  //         fileType: file.type
  //       }))
  //     };
  //     console.log('Presigned Payload:', presignedPayload);
  //     const presignedResponse = await axios.post(
  //       `${constant.BASE_URL}/v1/quest`,
  //       presignedPayload,
  //       { headers: { Authorization: `Bearer ${accessToken}` } }
  //     );

  //     const { questId, mediaSignedURL, thumbnailSignedURL } = presignedResponse.data.data;
  //     console.log('Presigned URLs:', presignedResponse);
  //     // Step 2: Upload files to presigned URLs
  //     const uploadPromises = mediaFiles.map((file, index) =>
  //       axios.put(mediaSignedURL[index], file, {
  //         headers: { 'Content-Type': file.type }
  //       })
  //     );

  //     await Promise.all(uploadPromises);

  //     // Step 3: Construct public URLs
  //     const mediaUrls: string[] = mediaSignedURL.map((url: string) => url.split('?')[0]);
  //     const thumbnailUrls: string[] = thumbnailSignedURL.map((url: string): string => url.split('?')[0]);

  //     // Step 4: Create quest with uploaded media
  //     await axios.put(
  //       `${constant.BASE_URL}/v1/quest/${questId}`,
  //       {
  //         ...values,
  //         coords,
  //         media: mediaUrls.map((url, index) => ({
  //           type: mediaFiles[index].type.startsWith('video/') ? 'video' : 'photo',
  //           duration: 60, // You might want to calculate this from actual files
  //           thumbnailURL: thumbnailUrls[index],
  //           url: url
  //         })),
  //         country: "IN", // Default value
  //         type: "Exclusive" // Default value
  //       },
  //       { headers: { Authorization: `Bearer ${accessToken}` } }
  //     );

  //     onSuccess();
  //   } catch (error) {
  //     console.error('Submission failed:', error);
  //     alert('Submission failed. Check console for details.');
  //   }
  // };
 

  const onSubmit: SubmitHandler<QuestData> = async (formData) => {
    if (isSubmitting) return;
    console.log(formData)
    try {
      const { media, lat, long, ...rest } = formData;
      const mediaArray = Array.from(media);
  
      // 1. Get presigned URLs for media files
      const accessToken = localStorage.getItem('accessToken');
      const presignedResponse = await axios.post(
        `${constant.BASE_URL}/v1/quest`,
        {
          media: mediaArray.map((file: File) => ({
            fileName: file.name,
            fileType: file.type,
          })),
        },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      const { questId, mediaSignedURL, thumbnailSignedURL } = presignedResponse.data.data;
      console.log("Presigned URLs:", presignedResponse.data.data);
      // 2. Upload each media file to its presigned URL
      const uploadPromises = mediaArray .map((file: File, index: number) => {
        return Promise.all([
          axios.put(mediaSignedURL[index], file, {
            headers: { "Content-Type": file.type },
          }),
          axios.put(thumbnailSignedURL[index], file, {
            headers: { "Content-Type": file.type },
          }),
        ]);
      });
      
    const check  =   await Promise.all(uploadPromises);
    console.log("i am here",check)
  
      // 3. Construct public URLs for media and thumbnails
      const publicBase = "https://pub-301c1efdf41d428f9ab043c4d4ecbac9.r2.dev";
  const mediaUrls = mediaSignedURL.map((url: string) => {
    const pathname = new URL(url).pathname;
    return `${publicBase}${pathname}`;
  });
  const thumbnailUrls = thumbnailSignedURL.map((url: string) => {
    const pathname = new URL(url).pathname;
    return `${publicBase}${pathname}`;
  });
      // 4. Submit quest data with media URLs
      console.log("ID", questId)
      
      await axios.put(
        `${constant.BASE_URL}/v1/quest/${quest._id}`,
        {
          ...rest,
          coords: {
            lat,
            long
          },
          media: Array.from(media).map((file: File, index: number) => ({
            type: file.type.startsWith("video/") ? "video" : "photo",
            alt:["ac", "ab"],
            duration: 60, // Replace with actual duration extraction if needed
            thumbnailURL: thumbnailUrls[index],
            url: mediaUrls[index],
          })),
          country: "IN", // Hardcoded as per requirements
          type: "Exclusive", // Hardcoded as per requirements
        },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      toast.success("Quest Updated successfully");
      onSuccess();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Quest creation error:", error.response?.data?.message);
        toast.error(error.response?.data?.message || "Failed to create quest");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
      console.error("Quest creation error:", error);
      // toast.error(error.response?.data?.message || "Failed to create quest");
    }
  };

  return (
    <form    
      onSubmit={handleSubmit(onSubmit)}
      className="w-full fontClass flex flex-col gap-2 p-3 lg:px-20 text-white 
      overflow-y-auto h-full [-ms-overflow-style:none] [scrollbar-width:none]
  [&::-webkit-scrollbar]:hidden"
    >
      <div className='flex flex-col gap-1'>
        <p className='text-xl lg:text-3xl font-semibold'>Create New Quest</p>
        <p className='font-medium text-md text-[#BBBBBE]'>Fill in the details below to create your quest.</p>
      </div>
      <div className='lg:px-20'>
      <div className='w-full bg-[#2C2C2E] rounded-2xl p-6 flex flex-col gap-6 overflow-y-auto'>
            <div className='flex flex-col gap-3 w-full'>
                <label className='font-semibold text-lg'>Title</label>
                <input
                  type='text'
                  defaultValue={quest.title || ""}
                  className='p-3 outline-none w-full border placeholder:text-[#E2E2E3] border-[#A8A8AC] rounded-lg'
                  placeholder='Enter the Title here'
                  {...register("title")}
                  />
            </div>
            <div className='flex flex-col gap-3 w-full'>
              <label className='font-semibold text-lg'>Description</label>
              <textarea
                defaultValue={quest.description || ""}
                className='p-3 h-44 outline-none w-full border placeholder:text-[#E2E2E3] border-[#A8A8AC] rounded-lg'
                placeholder='Provide brief information about your quest.'
                {...register("description")}
              />
            </div>
            <div className='flex flex-col gap-3 w-full'>
              <label className='font-semibold text-lg'>Upload Media</label>
              <div className='relative'>
                <input
                type='file'
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                accept="image/,video/"
                multiple
                {...register("media")}
                />
                <div className='p-3 h-44 outline-none w-full border-2 border-dashed placeholder:text-[#E2E2E3] border-[#A8A8AC] rounded-lg flex items-center flex-col justify-center'>
                <svg width="73" height="59" viewBox="0 0 73 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 33.0544C0.5 39.9242 6.00374 45.4725 15.2613 45.4725H57.5977C66.2625 45.4725 71.4558 40.5846 71.4558 34.1905C71.4558 28.8534 68.0405 24.4672 62.5367 22.3799C62.5934 10.5958 53.5333 2.08789 41.9897 2.08789C34.3409 2.08789 28.8936 5.91907 25.5067 10.5429C19.0998 8.93116 10.9994 13.5814 10.8583 21.006C4.47961 21.9307 0.5 26.8188 0.5 33.0544ZM36.1189 59.0006C34.9054 59.0006 33.8611 58.0758 33.8611 56.9662V31.2313L34.0305 27.2944L32.4499 28.8534L28.0751 33.2129C27.68 33.6355 27.0872 33.8471 26.5228 33.8471C25.3373 33.8471 24.4906 33.0544 24.4906 31.9976C24.4906 31.4161 24.7446 30.9935 25.168 30.5971L34.4819 22.1949C35.0464 21.6665 35.5262 21.508 36.1189 21.508C36.6834 21.508 37.1632 21.6665 37.7279 22.1949L47.0417 30.5971C47.4651 30.9935 47.7192 31.4161 47.7192 31.9976C47.7192 33.0544 46.816 33.8471 45.6588 33.8471C45.0943 33.8471 44.5299 33.6355 44.1065 33.2129L39.76 28.8534L38.1793 27.2944L38.3487 31.2313V56.9662C38.3487 58.0758 37.3325 59.0006 36.1189 59.0006Z" fill="#007AFF"/>
                </svg>
                <p className='font-semibold text-lg'>Upload Files<span className='text-[#BBBBBE] text-md font-medium'>or drag and drop</span></p>
                <p className='font-medium text-sm text-[#BBBBBE]'>PNG,JPG up to 100MB</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3 w-full'>
            <label className='font-semibold text-lg'>Choose Mode</label>
                <div className='flex gap-7'>
                  <div className='flex gap-2'>
                    <input type='radio'  value='GoFlick' id='GoFlick' className='w-5' {...register("mode")} defaultValue={quest.mode}/>
                    <label htmlFor='GoFlick' className='font-medium text-lg'>GoFlick</label>
                  </div>
                  <div className='flex gap-2'>
                    <input type='radio'  value='OnFlick' id='OnFlick' className='w-5'  {...register("mode")} defaultValue={quest.mode}/>
                    <label htmlFor='OnFlick' className='font-medium text-lg'>OnFlick</label>
                  </div>
                </div>
            </div>
            <div className='flex flex-col gap-3 w-full'>
                <label className='font-semibold text-lg'>Enter Location</label>
                <input
                  defaultValue={quest.location || ""}
                  type='text'
                  className='p-3 outline-none w-full border placeholder:text-[#E2E2E3] border-[#A8A8AC] rounded-lg'
                  placeholder='Enter location here'
                  {...register("location")}
                  />
                  <div className='flex items-end gap-2 justify-end'>
                    <svg width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2652_10347)">
                    <path d="M18.6387 18.7787C18.6387 21.2982 14.8008 23.056 9.38086 23.056C3.95117 23.056 0.09375 21.2982 0.09375 18.7787C0.09375 16.6822 2.78532 15.1105 6.8418 14.654V15.4193C6.8418 15.702 6.84922 15.9721 6.86652 16.2252C4.04174 16.5945 2.08594 17.5846 2.08594 18.7787C2.08594 20.3217 5.26953 21.5131 9.37109 21.5131C13.4531 21.5131 16.6562 20.3021 16.6562 18.7787C16.6562 17.5907 14.6832 16.5952 11.8567 16.2247C11.8737 15.9718 11.8808 15.7019 11.8808 15.4193V14.6504C15.9459 15.1018 18.6387 16.6765 18.6387 18.7787Z" fill="#007AFF"/>
                    <path d="M13.0372 5.29297C13.0372 7.01172 11.8653 8.45703 10.2735 8.84766V15.0293C10.2735 17.9199 9.76562 19.4824 9.37499 19.4824C8.9746 19.4824 8.46679 17.9102 8.46679 15.0293V8.84766C6.87499 8.44727 5.70312 7.01172 5.70312 5.29297C5.70312 3.27148 7.33398 1.61133 9.37499 1.61133C11.4063 1.61133 13.0372 3.27148 13.0372 5.29297ZM7.07031 4.22852C7.07031 4.91211 7.65624 5.49805 8.32031 5.49805C9.01367 5.49805 9.58007 4.91211 9.58007 4.22852C9.58007 3.55469 9.01367 2.97852 8.32031 2.97852C7.65624 2.97852 7.07031 3.55469 7.07031 4.22852Z" fill="#007AFF"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_2652_10347">
                    <rect width="18.9062" height="24.6777" fill="white" transform="translate(0.09375)"/>
                    </clipPath>
                    </defs>
                    </svg>

                    <p className='text-blue-600 font-medium text-sm'>Set Current location</p>
                  </div>
            </div>
            <div className='flex p-1 h-24 outline-none border placeholder:text-[#E2E2E3] border-[#A8A8AC] rounded-lg flex-col gap-5 w-full'>
              <div className='flex justify-between w-full items-center'>
                  <div className='p-1 rounded-full border-[#A8A8AC] border'>
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_2652_10305)">
                      <path d="M0.00881195 5.21728C0.00131226 4.84778 0.100812 3.98528 1.22531 3.68528L12.5133 1.42578C13.3408 1.42578 14.0133 2.09828 14.0133 2.92578V4.93678L14.5133 4.93578C15.3378 4.93928 16.0078 5.60978 16.0078 6.43528V14.4323C16.0078 15.2593 15.3353 15.9323 14.5078 15.9323H1.50081C0.673813 15.9323 0.000812531 15.2593 0.000812531 14.4323L0.00881195 5.21728ZM13.0128 2.92528C13.0128 2.66428 12.8118 2.44928 12.5563 2.42728L1.52481 4.65978C1.52081 4.66178 1.60681 4.93978 2.00731 4.93478H13.0128V2.92528ZM0.999312 14.4318C0.999312 14.7078 1.22331 14.9318 1.49931 14.9318H14.5068C14.7828 14.9318 15.0068 14.7078 15.0068 14.4318V6.43428C15.0068 6.15828 14.7828 5.93428 14.5068 5.93428H2.00581C1.51481 5.93428 0.999812 5.76678 0.999812 5.43628L0.999312 14.4318ZM13.0058 9.43628C13.5578 9.43628 14.0058 9.88378 14.0058 10.4363C14.0058 10.9888 13.5578 11.4363 13.0058 11.4363C12.4538 11.4363 12.0058 10.9888 12.0058 10.4363C12.0058 9.88378 12.4538 9.43628 13.0058 9.43628Z" fill="#A9A7A7"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_2652_10305">
                      <rect width="16" height="16" fill="white" transform="matrix(-1 0 0 1 16 0.677734)"/>
                      </clipPath>
                      </defs>
                      </svg>
                  </div>
                    <p className='font-normal text-lg leading-3 tracking-widest'>Wallet balance</p>
                  <div className='p-1 rounded-full border-[#A8A8AC] border'>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.677734" width="17.1" height="17" fill="url(#pattern0_2652_10309)"/>
                    <defs>
                    <pattern id="pattern0_2652_10309" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use href="#image0_2652_10309" transform="matrix(0.0110461 0 0 0.0111111 0.00292399 0)"/>
                    </pattern>
                    <image id="image0_2652_10309" width="90" height="90" preserveAspectRatio="none" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGyUlEQVR4nO1cXYhVVRTe9p9pWpa+RNE/ZmW/YFDRnyFhWD0UEfWmRYHYD9ivY73kQwQ9+KBBVvSQ557vO3ufmYYsnHHUIsNRE1GRyh6KrBwzLSepvLHOnMQcHeecu849Z5z9wYbLnbl37fXdddZea+21tzEeHh4eHh4eHh4eHh4eHh4eHh4eHh5VQhAEp8fAjZacacmFjvzUkpss+bMjdzuyno7d8p78Lf2fhclnarUbOpcsOa1sPSqHlpaWE2LyJksucMBGC/x1CJm5hnyHJb9ywOsOmCIyzHCFDcNbHfm2BXY0SuwxiSd/dMDimLzZDAe0t7efaoHHLLmhaHKPOoD1LopmxXE80hxvsNaOdsB8B+wsjeD+hO+0ZEsQBKPMUMeiRYtOFuux8uiWTezR/fkvDpgrT5sZioij6D4LfFs2kW7wFv51FEX3mqEC59wES75fOnHMPQIA402VEYfho47sqQBZ9Qate6cFHjFVgywojvxAU1kL/OnIDge8Im6I5MS2trazxO8HQXCKvLbWXpG4KHKeAzrTz2iS/t6yZcvOMFWAq9WutuQWRWtaKxleEARjss4liqKx6eLbrTifza5Wm2TKhCMfduQ+FQsmu2PybrW5AdOSmFnn6frDkQ+aZqNer4+w5MsWOKCgyD4LzA6C4ETteXZ2dp7kgDmW7FUg+4ADXjTNgvhHC7yr9FhujaLoqqLn3ApMtuQ2JeteIhw0I4W2Sq7iy/YgONc0CUEQnO2Az5TIbpcqY5FpdKeSJX9RRuqbREfAGiVDWa6uQ3t7+5lCjpa7IDnOlIQ4js/RciPyhIgBak1spAVWKFlBbxRF15iSIeuCYrS0uuFYO/HJ5Ccqvz4T3zbbVAQWeFpLL0d+nLsoJSGcZrZnye4iQri8kLloxdmpES0VzjJPJKkf6/3idc1kRAtRGN6jqaOUCzJnfErJyH8TWNsIIQ6YKttespBa4PdkSNoPLLZheFfe702f2nWKVn0gCsOHBiU83ShtOJM6zG3MzEMEycsc2TUIBVe0huGleWREwOOqVi2LLDBlQKEAztPeLJWKWpCjQCSbtxbYlUHOriiKbskqR6qAjtyvrPMO4XKgusBK5V9XRkceS85C8iGjxzl3SVZ5WuHrYaPriIu/JV8rQFj2BcIka0RXA/I6y174D5nLq/8nOQxvd+Q/hQgjZ+RY+BqSGUfRnVlkWuD+gnT/O4qi2/qEWDvakt8VJKguOyMmC9ESXTQo0wKLMsms1SYVpb8DtidpuiXfKExIH9HjMikNbG2YaHJL1vpHkRwIxyZtHixMSNbarSP3Ksjdm0WmpM9FcuDIn0zR3UOZiQb2NCwX2FMloqVJRyzorePNdThgc5Vch3AsScp4C/xWINETh/li+OvBnSQLPFXgrzkji9JSu1BQ7o6KhHf1GHjyoCBp1NbaT+tnXeS8LEorZGodVUlYLLCqXxO8tfZy7WJSbsWduzDp8mxSCl5E6UFqPNJJdUSBMfBcEQKjKBqbVXkpEGXs4+vJU1RKdseVi0qJ3uQzx6rPOnWrjqJZJgek9DnInfeOPJYssOQTBRiXPeZuS1I2BLYr/7rdpgFI7UIiiaQPri+h2Suv0/cyLXz9DEtxOyvV9ZtBP8HJ8TPtzkxgmqkYHDm9ADd5faZJqId8wHqpeZuKIK2/b6yCi9TPGoE5piIoYOF/M/dkJAa0ANQeLbLX1mrXmgr0dGs10KQjaPjQqDTzqfXcMSF7m9QWTEmQdFgOBinqs1ztSLS0PKkG9cCaspocpYtV0ZK71I9epN2kemk6sKaZli2WrEmy9NwVZiyJZZMfabqRVmCyKRiyLqi6i77+6FGFh0XS9a5Idq80HBYR+iUhXBg+q1zDeadpYWqaUc3XbBuz5AbphcvVKHik+Ukyohgni65ydlxjfpkhyuRsdKkPMNZJm5aUAvIUiJLahXZa3afjdFMm2sLwIm3FXN+QilqXWFFSmK/VJsm2mOxBypDXrcCVjnwgvTlhZUFVuG4p25oqQOJIuUFG4/YYV5GR3mKzoJLXBqXHzPROrbKkAWyUwpqp/B0d5AtFbvi64oZciPW86GCGCtKFaUFB22N15bE/qW07N8EMVbSF4QVpC4FmEUezaXxxHATnm+MFQRCMSW8e2FQ2wck5Q2Bumecdm5XsTBVLcsAPTST3e3EPsi1WStJRJur1+ogYuE56PyzwuRwCUiO270DRaku+JLWOYUfuQJDiOcmLJUFJyV8qTShpP16PtFcdQubu9D05qbXKkR/K6QL5rHzHsL690cPDw8PDw8PDw8PDw8PDw8PDw8PDVA7/AtMcriJ3VIc1AAAAAElFTkSuQmCC"/>
                    </defs>
                    </svg>
                  </div>
              </div>
                <p className='text-center leading-3 tracking-widest text-3xl font-semibold' >$19,200.89</p>
            </div> 
            <div className='flex flex-col gap-3 w-full'>
                <label className='font-semibold text-lg'>Applicants Limit</label>
                <p className='text-sm font-normal text-[#8E8E93]'>Please specify the number of applicants eligible to participate in this quest.</p>
                <input
                  defaultValue={quest.maxApplicants || ""}
                  type='textarea'
                  className='p-3 outline-none w-full border placeholder:text-[#E2E2E3] border-[#A8A8AC] rounded-lg'
                  placeholder='Enter the Applicant limit '
                  {...register('maxApplicants')}
                  />
                  <p className='text-center text-sm font-normal text-[#8E8E93]'>Eg. 100 maximum applicants can apply</p>
            </div>
            <div className='flex flex-col gap-3 w-full'>
               <label className='font-semibold text-lg'>Total Amount</label>
                <p className='text-sm font-normal text-[#8E8E93]'>Please enter the amount to be divided equally among the applicants.</p>
                <div className='flex'>
                  <div className='p-2 items-center w-20  flex gap-1 border border-[#A8A8AC] rounded-l-xl'>USD $</div>
                  <input
                  defaultValue={quest.totalAmount || ""}
                  type='text'
                  className='p-3 outline-none w-full border placeholder:text-[#E2E2E3] border-[#A8A8AC] rounded-r-lg'
                  placeholder='Enter the total amount'
                  {...register('totalAmount')}
                  />
                </div>
               
            </div>
      </div>
      <div className='flex gap-5 items-end justify-end mt-4'>
        <button className='px-6 cursor-pointer py-2 border border-[#A8A8AC] rounded-lg text-[#68686B] font-semibold text-md'>Save Draft</button>
        <button className='px-6 cursor-pointer py-2 bg-blue-600 rounded-lg font-semibold text-md text-white'>Start Quest</button>
      </div>
      </div>
    </form>
  );
};