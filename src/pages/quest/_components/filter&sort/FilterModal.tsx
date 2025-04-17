import { useForm } from "react-hook-form";


export const FilterModal= ({ 
    
        onSuccess,
      }: { 
        onSuccess: () => void;
        onCancel: () => void;
      }) => {
        const { handleSubmit } = useForm();

         const submitForm = async () => {
            try {
              await fetch('/api/quests', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                
              });
              onSuccess();
            } catch (error) {
              console.error('Submission failed:', error);
            }
          };
        
  return (
    <form className="flex fontClass flex-col items-start gap-5 w-full text-white"
      onSubmit={handleSubmit(submitForm)}
    >
      {/* Amount */}
      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-md font-medium">Amount</h2>
        <div className="flex gap-3">
          <div className="flex px-1.5 py-1 justify-between w-full border border-[#A8A8AC] rounded-lg">
            <input
              type="number"
              placeholder="Min"
              className="w-24 h-7 my-auto outline-none px-2 placeholder:font-medium placeholder:text-[#BBBBBE] appearance-none"
            />
            <div className="flex flex-col gap-2">
               
                <svg width="14" height="14" viewBox="0 0 14 14" fill="" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2655_13445)">
                    <path d="M7.0026 12.834C10.2226 12.834 12.8359 10.2207 12.8359 7.00065C12.8359 3.78065 10.2226 1.16732 7.0026 1.16732C3.7826 1.16732 1.16927 3.78065 1.16927 7.00065C1.16927 10.2207 3.7826 12.834 7.0026 12.834ZM7.0026 5.83398L9.33594 8.16732H4.66927L7.0026 5.83398Z" fill="#BBBBBE"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_2655_13445">
                    <rect width="14" height="14" fill="white" transform="matrix(-1 0 0 -1 14 14)"/>
                    </clipPath>
                    </defs>
                    </svg>
                
                
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2655_13448)">
                    <path d="M6.9974 1.16602C3.7774 1.16602 1.16406 3.77935 1.16406 6.99935C1.16406 10.2193 3.7774 12.8327 6.9974 12.8327C10.2174 12.8327 12.8307 10.2193 12.8307 6.99935C12.8307 3.77935 10.2174 1.16602 6.9974 1.16602ZM6.9974 8.16602L4.66406 5.83268H9.33073L6.9974 8.16602Z" fill="#BBBBBE"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_2655_13448">
                    <rect width="14" height="14" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>

                
            </div>
          </div>
          <div className="flex px-1.5 py-1 justify-between w-full border border-[#A8A8AC] rounded-lg">
            <input
              type="number"
              placeholder="Min"
              className="w-24 h-7 my-auto outline-none px-2 placeholder:font-medium placeholder:text-[#BBBBBE]"
            />
            <div className="flex flex-col gap-2">
               
                <svg width="14" height="14" viewBox="0 0 14 14" fill="" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2655_13445)">
                    <path d="M7.0026 12.834C10.2226 12.834 12.8359 10.2207 12.8359 7.00065C12.8359 3.78065 10.2226 1.16732 7.0026 1.16732C3.7826 1.16732 1.16927 3.78065 1.16927 7.00065C1.16927 10.2207 3.7826 12.834 7.0026 12.834ZM7.0026 5.83398L9.33594 8.16732H4.66927L7.0026 5.83398Z" fill="#BBBBBE"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_2655_13445">
                    <rect width="14" height="14" fill="white" transform="matrix(-1 0 0 -1 14 14)"/>
                    </clipPath>
                    </defs>
                    </svg>
                
                
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2655_13448)">
                    <path d="M6.9974 1.16602C3.7774 1.16602 1.16406 3.77935 1.16406 6.99935C1.16406 10.2193 3.7774 12.8327 6.9974 12.8327C10.2174 12.8327 12.8307 10.2193 12.8307 6.99935C12.8307 3.77935 10.2174 1.16602 6.9974 1.16602ZM6.9974 8.16602L4.66406 5.83268H9.33073L6.9974 8.16602Z" fill="#BBBBBE"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_2655_13448">
                    <rect width="14" height="14" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>

                
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col items-start w-full ]">
        <h2 className="text-md font-medium">Location</h2>
        <input
          type="text"
          placeholder="Search Location"
          className="w-full px-3 py-2 rounded-lg outline-none placeholder:font-medium placeholder:text-[#BBBBBE] border border-[#A8A8AC]"
        />
      </div>

      {/* Type */}
      <div className="flex flex-col items-start w-full">
        <h2 className="text-md font-medium">Type</h2>
        <div className="space-y-2 text-sm font-medium text-[#BBBBBE]">
          <label className="flex items-center gap-2">
            <input className="w-4 h-4" type="radio" name="type" value="all" defaultChecked />
            All
          </label>
          <label className="flex items-center gap-2">
            <input className="w-4 h-4" type="radio" name="type" value="goflick" />
            GoFlick
          </label>
          <label className="flex items-center gap-2">
            <input className="w-4 h-4" type="radio" name="type" value="onflick" />
            OnFlick
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4 w-full font-medium">
        <button className="px-10 py-2 bg-[#68686B] text-[#EFEFF0] rounded-md hover:bg-gray-500">
          Cancel
        </button>
        <button className="px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
          Apply
        </button>
      </div>
    </form>
  );
};
