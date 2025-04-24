import { useMemo, useState } from "react";
import { AllQuestCard } from "../_components/questCard/AllQuestCard";
// import { FilterModal } from "../_components/filter&sort/FilterModal";
// import { SortModal } from "../_components/filter&sort/SortModal";
import { Quest } from "../../../types/quest";
import { constant } from "../../../constants/constant";
import useFetchWithToken from "../../../hooks/useQuest";
import { useForm } from "react-hook-form";

export type QuestsApiResponse = {
  data: {
    quests: Quest[];
  };
};

type FilterData = {
  minNumber?: number;
  maxNumber?: number;
  location?: string;
  type?: string;
};

type SortData = {
  date?: string;
  amount?: string;
  location?: string;
};

export const QuestList = ({ onCreateQuest }: { onCreateQuest: () => void }) => {
  const [queryParams, setQueryParams] = useState<URLSearchParams | null>(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const {
    register: registerFilters,
    handleSubmit: handleFiltersSubmit,
    getValues: getFilterValues,
  } = useForm<FilterData>();

  const {
    register: registerSort,
    watch: watchSort
  } = useForm<SortData>();

  const onSubmit = () => {
    const filterData = getFilterValues(); // still okay here
    const sortData = {
      date: watchSort("date"),
      amount: watchSort("amount"),
    };
  
    const combinedData = { ...filterData, ...sortData };
  
    const params = new URLSearchParams();
    if (combinedData.type) params.append("mode", combinedData.type);
    if (combinedData.minNumber) params.append("low", String(combinedData.minNumber));
    if (combinedData.maxNumber) params.append("high", String(combinedData.maxNumber));
    if (combinedData.location) params.append("country", combinedData.location);
    if (sortData.date) params.append("sort", sortData.date);
    else if (sortData.amount) params.append("sort", sortData.amount);
  
    console.log("params", params.toString());
  
    setQueryParams(params.toString() ? params : null);
  };
  

  const url = useMemo(() => {
    return queryParams
      ? `${constant.BASE_URL}/v1/quest?${queryParams.toString()}`
      : `${constant.BASE_URL}/v1/quest`;
  }, [queryParams]);

  const {
    data: quests = [],
    isError,
    isLoading,
  } = useFetchWithToken<Quest[]>(url, {
    enabled: !!url,
    selector: (res) => (res as QuestsApiResponse).data.quests,
  });

  if (isError) return <p>Failed to load quests</p>;
  if (isLoading) return <LoadingSkeleton />

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between md:items-center w-full">
        <div className="flex gap-6">
          <button className="flex gap-2 bg-white/10 rounded-lg px-3 py-2 text-[#8E8E93] relative" onClick={() => setOpenFilter(!openFilter)}>
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2651_9613)">
                <path
                  d="M4.06997 5.3769C6.00581 7.85898 9.58039 12.459 9.58039 12.459V18.209C9.58039 18.7361 10.0116 19.1673 10.5387 19.1673H12.4554C12.9825 19.1673 13.4137 18.7361 13.4137 18.209V12.459C13.4137 12.459 16.9787 7.85898 18.9146 5.3769C19.4033 4.7444 18.9529 3.83398 18.1575 3.83398H4.82706C4.03164 3.83398 3.58122 4.7444 4.06997 5.3769Z"
                  fill="#8E8E93"
                />
              </g>
              <defs>
                <clipPath id="clip0_2651_9613">
                  <rect width="23" height="23" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="fontClass text-sm font-medium my-auto">Filter</p>
            
          </button>
          {openFilter && 
          <div className="absolute top-35 p-3 bg-[#323234] rounded-lg z-10">
                  <form className="flex fontClass flex-col items-start gap-5 w-full text-white"
                    onSubmit={handleFiltersSubmit(onSubmit)}>
      {/* Amount */}
      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-md font-medium">Amount</h2>
        <div className="flex gap-3">
          <div className="flex px-1.5 py-1 justify-between w-full border border-[#A8A8AC] rounded-lg">
            <input
              type="number"
              placeholder="Min"
              className="w-24 h-7 my-auto outline-none px-2 placeholder:font-medium placeholder:text-[#BBBBBE] appearance-none"
              {...registerFilters("minNumber")}/>
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
              placeholder="Max"
              className="w-24 h-7 my-auto outline-none px-2 placeholder:font-medium placeholder:text-[#BBBBBE]"
              {...registerFilters("maxNumber")}/>
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
            {...registerFilters("location")}/>
      </div>

      {/* Type */}
      <div className="flex flex-col items-start w-full">
        <h2 className="text-md font-medium">Type</h2>
        <div className="space-y-2 text-sm font-medium text-[#BBBBBE]">
          <label className="flex items-center gap-2">
            <input className="w-4 h-4" type="radio" defaultChecked {...registerFilters("type")}/>
            All
          </label>
          <label className="flex items-center gap-2">
            <input className="w-4 h-4" type="radio"  value="go" {...registerFilters("type")}/>
            GoFlick
          </label>
          <label className="flex items-center gap-2">
            <input className="w-4 h-4" type="radio"  value="on" {...registerFilters("type")}/>
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
          </div>
          }

          {/* sort button */}
          <button className="flex gap-2 bg-white/10 rounded-lg px-3 py-2 text-[#8E8E93] relative" onClick={() => setOpenSort(!openSort)}>
          <svg width="15" className="my-auto" height="15" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.16667 11.5H0.833333C0.597222 11.5 0.399445 11.412 0.24 11.236C0.0800001 11.0606 0 10.8431 0 10.5833C0 10.3236 0.0800001 10.1061 0.24 9.93067C0.399445 9.75467 0.597222 9.66667 0.833333 9.66667H4.16667C4.40278 9.66667 4.60083 9.75467 4.76083 9.93067C4.92028 10.1061 5 10.3236 5 10.5833C5 10.8431 4.92028 11.0606 4.76083 11.236C4.60083 11.412 4.40278 11.5 4.16667 11.5ZM14.1667 2.33333H0.833333C0.597222 2.33333 0.399445 2.24564 0.24 2.07025C0.0800001 1.89425 0 1.67639 0 1.41667C0 1.15694 0.0800001 0.939084 0.24 0.763084C0.399445 0.587695 0.597222 0.5 0.833333 0.5H14.1667C14.4028 0.5 14.6006 0.587695 14.76 0.763084C14.92 0.939084 15 1.15694 15 1.41667C15 1.67639 14.92 1.89425 14.76 2.07025C14.6006 2.24564 14.4028 2.33333 14.1667 2.33333ZM9.16667 6.91667H0.833333C0.597222 6.91667 0.399445 6.82867 0.24 6.65267C0.0800001 6.47728 0 6.25972 0 6C0 5.74028 0.0800001 5.52242 0.24 5.34642C0.399445 5.17103 0.597222 5.08333 0.833333 5.08333H9.16667C9.40278 5.08333 9.60083 5.17103 9.76083 5.34642C9.92028 5.52242 10 5.74028 10 6C10 6.25972 9.92028 6.47728 9.76083 6.65267C9.60083 6.82867 9.40278 6.91667 9.16667 6.91667Z" fill="white"/>
          </svg>

            <p className="fontClass text-sm font-medium my-auto">Sort</p>
            
          </button>
          {openSort && 
          <div className="absolute top-35 p-3 bg-[#323234] rounded-lg z-10">
              <form className="flex p-3 fontClass flex-col items-start gap-5 w-full text-white"
      
    >   
    {/* Date */}
    <div className="flex flex-col gap-2 items-start w-full ]">
        <h2 className="text-md font-medium">Date</h2>
        <select className="w-52 h-9 px-3 py-2 rounded-lg outline-none placeholder:font-medium placeholder:text-[#BBBBBE] border border-[#A8A8AC]" {...registerSort("date")} 
         onChange={(e) => {
          // manually set the value in the form
          registerSort("date").onChange(e);
          onSubmit(); // immediately call onSubmit
        }}>
            <option className="text-black hover:text-white" value="">None</option>
            <option className="text-black hover:text-white" value="date-desc">Highest to Lowest</option>
            <option className="text-black hover:text-white" value="date-asc">Lowest to Highest</option>
        </select>
      </div>

        {/* Amount */}
        <div className="flex flex-col gap-2 items-start w-full ]">
        <h2 className="text-md font-medium">Amount</h2>
        <select className="w-52 h-9 px-3 py-2 rounded-lg outline-none placeholder:font-medium placeholder:text-[#BBBBBE] border border-[#A8A8AC]" {...registerSort("amount")} 
         onChange={(e) => {
          // manually set the value in the form
          registerSort("amount").onChange(e);
          onSubmit(); // immediately call onSubmit
        }}>
            <option  className="text-black hover:text-white">None</option>
            <option className="text-black hover:text-white" value="amount-desc">Highest to Lowest</option>
            <option className="text-black hover:text-white" value="amount-asc">Lowest to Highest</option>
        </select>
      </div>


      {/* Location */}
      <div className="flex flex-col gap-2 items-start w-full ]">
        <h2 className="text-md font-medium">Location</h2>
        <select className="w-52 h-9 px-3 py-2 rounded-lg outline-none placeholder:font-medium placeholder:text-[#BBBBBE] border border-[#A8A8AC]">
            <option value="location1">None</option>
        </select>
      </div>
    </form>
          </div>
          }

          <div className="fontClass rounded-lg flex items-center gap-2 md:gap-4 px-2 md:px-4 2xl:pr-20 bg-white/10 text-[#8E8E93] ">
          <svg  width="23" height="23" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.1634 16.8369L14.4533 13.1251C15.5657 11.6755 16.085 9.85701 15.906 8.03853C15.7269 6.22005 14.8629 4.53777 13.4891 3.33294C12.1153 2.12811 10.3346 1.49096 8.50834 1.55073C6.68205 1.6105 4.94687 2.36272 3.65479 3.65479C2.36272 4.94687 1.6105 6.68205 1.55073 8.50834C1.49096 10.3346 2.12811 12.1153 3.33294 13.4891C4.53777 14.8629 6.22005 15.7269 8.03853 15.906C9.85701 16.085 11.6755 15.5657 13.1251 14.4533L16.8384 18.1673C16.9256 18.2545 17.0292 18.3237 17.1431 18.3709C17.257 18.4181 17.3792 18.4424 17.5025 18.4424C17.6258 18.4424 17.7479 18.4181 17.8619 18.3709C17.9758 18.3237 18.0793 18.2545 18.1665 18.1673C18.2537 18.0801 18.3229 17.9766 18.3701 17.8626C18.4173 17.7487 18.4416 17.6266 18.4416 17.5033C18.4416 17.3799 18.4173 17.2578 18.3701 17.1439C18.3229 17.0299 18.2537 16.9264 18.1665 16.8392L18.1634 16.8369ZM3.43764 8.75014C3.43764 7.69942 3.74921 6.67231 4.33295 5.79867C4.9167 4.92503 5.7464 4.24412 6.71713 3.84203C7.68786 3.43994 8.75603 3.33473 9.78656 3.53972C10.8171 3.7447 11.7637 4.25067 12.5066 4.99363C13.2496 5.7366 13.7556 6.6832 13.9606 7.71372C14.1655 8.74424 14.0603 9.81241 13.6582 10.7831C13.2562 11.7539 12.5752 12.5836 11.7016 13.1673C10.828 13.7511 9.80085 14.0626 8.75014 14.0626C7.34162 14.0612 5.9912 13.501 4.99523 12.505C3.99926 11.5091 3.43908 10.1587 3.43764 8.75014Z" fill="#8E8E93"/>
</svg>
<input placeholder="Search" className="w-full placeholder:text-md outline-none placeholder:text-[#8E8E93] font-medium"></input>

          </div>
        </div>
        <button
          onClick={onCreateQuest}
          className=" px-4 py-2 fontClass bg-blue-600 font-semibold text-sm text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          Create a Quest
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 overflow-y-auto max-h-[calc(100vh-200px)]  [-ms-overflow-style:none] [scrollbar-width:none]
  [&::-webkit-scrollbar]:hidden">
        {quests.map((quest: Quest) => (
          <AllQuestCard key={quest._id} quest={quest} />
        ))}
      </div>
    </div>
  );
};

export const LoadingSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="p-4 bg-white rounded-xl animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    ))}
  </div>
);
