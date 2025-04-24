import { useEffect, useState } from "react";
// import { applicants } from '../../../../constants/AllApplicants';
import { removedApplicants } from "../../../../constants/RemovedApplicants";
import { useNavigate, useParams } from "react-router-dom";
import useFetchWithToken from "../../../../hooks/useQuest";
import { constant } from "../../../../constants/constant";
import axios from "axios";


type ApplicantApiResponse = {
  data: {
    quests: Applicant[];
  };
};

export type Applicant = {
  _id: string;
  user: {
    _id: string;
    username: string;
    name: string;
    photo: string;
  };
  quest: string;
  description: {
  text: string;
  }[];
  media: {
    url: string;
    type: string; 
    thumbnail: string;
    _id: string;
  }[];
  status: 'pending' | 'approved' | 'rejected'; 
  partialAllowance: boolean;
  suspended: boolean;
  createdAt: string; 
  updatedAt: string; 
};

export const AllApplicants = () => {
    const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
    const [applicants, setApplicants] = useState<Applicant[]>([]);

    const [view, setView] = useState('applications'); 
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const {data: applicantdata} = useFetchWithToken<Applicant[]>(
      `${constant.BASE_URL}/v1/quest/${id}/applicant`,
      {
        selector: (res) => (res as ApplicantApiResponse).data.quests,
      }
    );

    useEffect(() => {
      if (applicantdata) {
        setApplicants(applicantdata);
      }
    }, [applicantdata]);
    console.log("i am here ",applicantdata);

    const toggleApplicant = (id: string): void => {
      setSelectedApplicants((prev) =>
        prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
      );
    };
    
    
    const selectAll = () => {
      const allIds = applicantdata?.map((a) => a._id); 
      if (selectedApplicants.length === applicantdata?.length) {
        setSelectedApplicants([]);
      } else {
        setSelectedApplicants(allIds || []);
      }
    };

    const updateApplicantStatus = async (applicantId: string, status: "approved" | "rejected") => {
      try {
        const token = localStorage.getItem("accessToken");
        const url = `${constant.BASE_URL}/v1/quest-applicant/${applicantId}?status=${status}`;
        const response = await axios.patch(url,{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to update status for ${applicantId}`, error);
        throw error;
      }
    };
    
    return (
        <div className="flex fontClass text-white w-full justify-between h-full overflow-y-auto py-10 md:py-0">
            <div className="w-full flex flex-col gap-3 overflow-y-auto p-6">
                <div className="flex gap-5 ">
                    <svg onClick={()=> navigate(-1)} className="cursor-pointer" width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 10.5391C0.5 10.2461 0.605469 9.97656 0.828125 9.76562L10.1211 0.671875C10.3203 0.472656 10.5781 0.367188 10.8828 0.367188C11.4922 0.367188 11.9609 0.824219 11.9609 1.43359C11.9609 1.72656 11.832 1.99609 11.6445 2.19531L3.11328 10.5391L11.6445 18.8828C11.832 19.082 11.9609 19.3398 11.9609 19.6445C11.9609 20.2539 11.4922 20.7109 10.8828 20.7109C10.5781 20.7109 10.3203 20.6055 10.1211 20.3945L0.828125 11.3125C0.605469 11.0898 0.5 10.832 0.5 10.5391Z" fill="white"/>
                    </svg>
                    <p className="text-lg font-semibold ">{view === 'applications' ? 'Applications' : 'Removed Applications'}</p>
                </div>
                <div className="flex gap-2 px-3 py-2.5 bg-neutral-400/20 rounded-lg w-full">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.1634 16.8369L14.4533 13.1251C15.5657 11.6755 16.085 9.85701 15.906 8.03853C15.7269 6.22005 14.8629 4.53777 13.4891 3.33294C12.1153 2.12811 10.3346 1.49096 8.50834 1.55073C6.68205 1.6105 4.94687 2.36272 3.65479 3.65479C2.36272 4.94687 1.6105 6.68205 1.55073 8.50834C1.49096 10.3346 2.12811 12.1153 3.33294 13.4891C4.53777 14.8629 6.22005 15.7269 8.03853 15.906C9.85701 16.085 11.6755 15.5657 13.1251 14.4533L16.8384 18.1673C16.9256 18.2545 17.0292 18.3237 17.1431 18.3709C17.257 18.4181 17.3792 18.4424 17.5025 18.4424C17.6258 18.4424 17.7479 18.4181 17.8619 18.3709C17.9758 18.3237 18.0793 18.2545 18.1665 18.1673C18.2537 18.0801 18.3229 17.9766 18.3701 17.8626C18.4173 17.7487 18.4416 17.6266 18.4416 17.5033C18.4416 17.3799 18.4173 17.2578 18.3701 17.1439C18.3229 17.0299 18.2537 16.9264 18.1665 16.8392L18.1634 16.8369ZM3.43764 8.75014C3.43764 7.69942 3.74921 6.67231 4.33295 5.79867C4.9167 4.92503 5.7464 4.24412 6.71713 3.84203C7.68786 3.43994 8.75603 3.33473 9.78656 3.53972C10.8171 3.7447 11.7637 4.25067 12.5066 4.99363C13.2496 5.7366 13.7556 6.6832 13.9606 7.71372C14.1655 8.74424 14.0603 9.81241 13.6582 10.7831C13.2562 11.7539 12.5752 12.5836 11.7016 13.1673C10.828 13.7511 9.80085 14.0626 8.75014 14.0626C7.34162 14.0612 5.9912 13.501 4.99523 12.505C3.99926 11.5091 3.43908 10.1587 3.43764 8.75014Z" fill="#8E8E93"/>
                </svg>

                    <input className="w-full outline-none placeholder:font-medium placeholder:text-neutral-400"
                            placeholder="Search"></input>
                </div>

               
      <div className="flex justify-between items-center p-4 ">
        <div className={`flex items-center gap-2 ${view === 'applications' ? 'block' : 'hidden'}`}>
          <input 
            type="checkbox" 
            className="w-4 h-4 bg-transparent border border-gray-600 rounded"
            checked={view === 'applications' && selectedApplicants.length === applicantdata?.length}
            onChange={selectAll}
          />
          <span className="text-sm text-gray-400">All</span>
        </div>
        {selectedApplicants.length > 0 ? (
            <div className="flex gap-4">
              <span className="text-green-500 cursor-pointer"
              >
                Accept({selectedApplicants.length})
              </span>
              <span className="text-red-500 cursor-pointer">
                Remove({selectedApplicants.length})
              </span>
            </div>
          ) : (
            view === 'applications' && (
              <div 
                className="flex items-center text-blue-500 gap-1 cursor-pointer"
                onClick={() => setView('removed')}
              >
                <span className="text-sm">Removed applicants</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )
          )}
      </div>

      <div className="flex-1 overflow-y-auto fontClass [-ms-overflow-style:none] [scrollbar-width:none]
  [&::-webkit-scrollbar]:hidden">
         {view === 'applications' ? (
            // Regular Applications View
            applicants?.map((applicant:Applicant) => (
              <div key={applicant._id} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    className="w-4 h-4 bg-transparent border border-gray-600 rounded"
                    checked={selectedApplicants.includes(applicant._id)}
                    onChange={() => toggleApplicant(applicant._id)}
                  />
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={applicant.user.photo} alt={applicant.user.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{applicant.user.name}</p>
                    <p className="text-sm text-gray-400">{applicant.description[0].text}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm"
                   onClick={async () => {
                    try {
                      await updateApplicantStatus(applicant._id, "approved");
                      console.log(`Applicant ${applicant._id} approved`);
                      // Optional: update UI or show toast
                    } catch (error) {
                      console.error(`Error approving ${applicant._id}`, error);
                    }
                  }}
                >
                    Accept
                  </button>
                  <button 
                    className="bg-transparent border border-gray-600 text-white px-4 py-1 rounded-md text-sm"
                    onClick={async () => {
                      try {
                        await updateApplicantStatus(applicant._id, "rejected");
                        console.log(`Applicant ${applicant._id} rejected`);
                        // Optional: update UI or show toast
                      } catch (error) {
                        console.error(`Error rejecting ${applicant._id}`, error);
                      }
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            // Removed Applicants View
            removedApplicants.map((applicant) => (
              <div key={applicant.id} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={applicant.avatarSrc} alt={applicant.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{applicant.name}</p>
                    <p className="text-sm text-gray-400">{applicant.message}</p>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm">
                  Accept
                </button>
              </div>
            ))
          )} 
      </div>
    
            </div>
        <div className="hidden lg:flex text-white flex-col fontClass py-3 sticky top-0 h-screen overflow-y-auto lg:w-3/7 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col text-white p-4 w-full h-full">
      <h1 className="text-xl font-semibold leading-5 -tracking-wider mb-4">Quest User Interaction Analayis</h1>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Total Applicants Card */}
        <div className="bg-zinc-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-stone-300 leading-5 text-sm">Total Applicants</span>
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_3710_15473)">
                <mask id="mask0_3710_15473" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="16">
                <rect width="20" height="16" fill="white"/>
                </mask>
                <g mask="url(#mask0_3710_15473)">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.21875 12.5625C5.21875 12.5625 4.03125 13.75 4 15.5C4 15.5 4.0625 16.2812 4.84375 16.3438H15.1562C15.1562 16.3438 15.9375 16.2812 16 15.5C16 15.5 15.9688 13.75 14.7812 12.5625C14.7812 12.5625 13.5938 11.375 11.8438 11.3438H8.15625C8.15625 11.3438 6.40625 11.375 5.21875 12.5625ZM0 9.6875C0.03125 8.25 0.96875 7.3125 0.96875 7.3125C1.90625 6.375 3.34375 6.34375 3.34375 6.34375H4.65625C5.40625 6.34375 6.0625 6.65625 6.0625 6.65625C6 7 6 7.34375 6 7.34375C6.0625 9.1875 7.34375 10.3438 7.34375 10.3438H0.65625C0.0625 10.2812 0 9.6875 0 9.6875ZM6.65625 1.59375C6.65625 1.59375 5.90625 0.375 4.5 0.34375C4.5 0.34375 3.09375 0.375 2.34375 1.59375C2.34375 1.59375 1.65625 2.84375 2.34375 4.09375C2.34375 4.09375 3.09375 5.3125 4.5 5.34375C4.5 5.34375 5.90625 5.3125 6.65625 4.09375C6.65625 4.09375 7.34375 2.84375 6.65625 1.59375ZM18.1562 1.59375C18.1562 1.59375 17.4062 0.375 16 0.34375C16 0.34375 14.5938 0.375 13.8438 1.59375C13.8438 1.59375 13.1562 2.84375 13.8438 4.09375C13.8438 4.09375 14.5938 5.3125 16 5.34375C16 5.34375 17.4062 5.3125 18.1562 4.09375C18.1562 4.09375 18.8438 2.84375 18.1562 1.59375ZM14 7.34375C14 7.34375 13.9375 9.1875 12.6562 10.3438H19.3438C19.3438 10.3438 19.9375 10.2812 20 9.6875C20 9.6875 19.9688 8.25 19.0312 7.3125C19.0312 7.3125 18.0938 6.375 16.6562 6.34375H15.3438C15.3438 6.34375 14.5938 6.34375 13.9375 6.65625C13.9375 6.65625 14 7 14 7.34375ZM7 7.34375C7 6.53125 7.40625 5.84375 7.40625 5.84375C7.8125 5.15625 8.5 4.75 8.5 4.75C9.21875 4.34375 10 4.34375 10 4.34375C10.7812 4.34375 11.5 4.75 11.5 4.75C12.1875 5.15625 12.5938 5.84375 12.5938 5.84375C13 6.53125 13 7.34375 13 7.34375C13 8.15625 12.5938 8.84375 12.5938 8.84375C12.1875 9.53125 11.5 9.9375 11.5 9.9375C10.7812 10.3438 10 10.3438 10 10.3438C9.21875 10.3438 8.5 9.9375 8.5 9.9375C7.8125 9.53125 7.40625 8.84375 7.40625 8.84375C7 8.15625 7 7.34375 7 7.34375Z" fill="white"/>
                </g>
                </g>
                <defs>
                <clipPath id="clip0_3710_15473">
                <rect width="20" height="16" fill="white"/>
                </clipPath>
                </defs>
                </svg>

          </div>
          <h2 className="text-3xl font-bold mb-1">100</h2>
          <div className="flex items-center text-green-500 text-xs">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            12% vs last week
          </div>
        </div>
        
        {/* Total Approved Card */}
        <div className="bg-zinc-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-stone-300 leading-5 text-sm">Total Approved</span>
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3710_15499)">
              <mask id="mask0_3710_15499" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="16">
              <rect width="20" height="16" fill="white"/>
              </mask>
              <g mask="url(#mask0_3710_15499)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 15.4062C0.0625978 13.0625 1.62754 11.4688 1.62754 11.4688C3.22379 9.90625 5.57121 9.84375 5.57121 9.84375H8.45071C10.7981 9.90625 12.3944 11.4688 12.3944 11.4688C13.9593 13.0625 14.0219 15.4062 14.0219 15.4062C14.0219 15.8125 13.7402 16.0625 13.7402 16.0625C13.4898 16.3438 13.0829 16.3438 13.0829 16.3438H0.938967C0.532081 16.3438 0.28169 16.0625 0.28169 16.0625C0 15.8125 0 15.4062 0 15.4062ZM3.0047 4.34375C3.0047 3.25 3.53678 2.34375 3.53678 2.34375C4.06886 1.4375 5.00783 0.875 5.00783 0.875C5.94679 0.34375 7.01096 0.34375 7.01096 0.34375C8.07512 0.34375 9.01409 0.875 9.01409 0.875C9.95305 1.4375 10.4851 2.34375 10.4851 2.34375C11.0172 3.25 11.0172 4.34375 11.0172 4.34375C11.0172 5.4375 10.4851 6.34375 10.4851 6.34375C9.95305 7.25 9.01409 7.8125 9.01409 7.8125C8.07512 8.34375 7.01096 8.34375 7.01096 8.34375C5.94679 8.34375 5.00783 7.8125 5.00783 7.8125C4.06886 7.25 3.53678 6.34375 3.53678 6.34375C3.0047 5.4375 3.0047 4.34375 3.0047 4.34375ZM15.5556 9.875L19.5618 5.875C19.5618 5.875 20 5.34375 19.5618 4.8125C19.5618 4.8125 19.0297 4.375 18.4977 4.8125L15.0235 8.28125L13.5524 6.8125C13.5524 6.8125 13.0203 6.375 12.4883 6.8125C12.4883 6.8125 12.0501 7.34375 12.4883 7.875L14.4914 9.875C14.4914 9.875 15.0235 10.3125 15.5556 9.875Z" fill="white"/>
              </g>
              </g>
              <defs>
              <clipPath id="clip0_3710_15499">
              <rect width="20" height="16" fill="white"/>
              </clipPath>
              </defs>
              </svg>

          </div>
          <h2 className="text-3xl font-bold mb-1">89</h2>
          <div className="flex items-center text-green-500 text-xs">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            12% vs last week
          </div>
        </div>
        
        {/* Total Views Card */}
        <div className="bg-zinc-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-stone-300 leading-5 text-sm">Total Views</span>
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.1875 14C5.00781 14 0.59375 8.9375 0.59375 7.35938C0.59375 5.77344 5.00781 0.71875 11.1875 0.71875C17.4375 0.71875 21.7734 5.77344 21.7734 7.35938C21.7734 8.9375 17.4453 14 11.1875 14ZM11.1875 11.7266C13.5938 11.7266 15.5547 9.76562 15.5547 7.35938C15.5547 4.94531 13.5938 2.99219 11.1875 2.99219C8.77344 2.99219 6.82031 4.94531 6.82031 7.35938C6.82031 9.76562 8.77344 11.7266 11.1875 11.7266ZM11.1875 8.95312C10.3047 8.95312 9.59375 8.24219 9.59375 7.35938C9.59375 6.47656 10.3047 5.76562 11.1875 5.76562C12.0703 5.76562 12.7812 6.47656 12.7812 7.35938C12.7812 8.24219 12.0703 8.95312 11.1875 8.95312Z" fill="white"/>
            </svg>

          </div>
          <h2 className="text-3xl font-bold mb-1">123</h2>
          <div className="flex items-center text-green-500 text-xs">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            12% vs last week
          </div>
        </div>
        
        {/* Completion Rate Card */}
        <div className="bg-zinc-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-stone-300 leading-5 text-sm">Completion Rate</span>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3710_15541)">
              <mask id="mask0_3710_15541"  maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="16">
              <rect width="16.9375" height="16" fill="white"/>
              </mask>
              <g mask="url(#mask0_3710_15541)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.84375C0.0625 5.9375 1.875 3.90625 1.875 3.90625C3.65625 1.84375 6.46875 1.40625 6.46875 1.40625C6.9375 1.40625 7 1.90625 7 1.90625V9.34375L11.9062 14.25C12.2188 14.625 11.8438 14.9688 11.8438 14.9688C9.96875 16.3125 7.5 16.3438 7.5 16.3438C5.40625 16.3125 3.71875 15.3125 3.71875 15.3125C2.03125 14.3125 1.03125 12.625 1.03125 12.625C0.03125 10.9375 0 8.84375 0 8.84375ZM8.5 7.84375V0.875C8.53125 0.40625 9 0.34375 9 0.34375C10.9688 0.375 12.5312 1.3125 12.5312 1.3125C14.125 2.21875 15.0312 3.8125 15.0312 3.8125C15.9688 5.375 16 7.34375 16 7.34375C15.9375 7.8125 15.4688 7.84375 15.4688 7.84375H8.5ZM16.9375 9.875C16.9375 9.875 16.9375 9.40625 16.4375 9.34375H9L13.9688 14.3125C13.9688 14.3125 14.2812 14.5938 14.625 14.3125C14.625 14.3125 16.5312 12.5625 16.9375 9.875Z" fill="white"/>
              </g>
              </g>
              <defs>
              <clipPath id="clip0_3710_15541">
              <rect width="16.9375" height="16" fill="white"/>
              </clipPath>
              </defs>
              </svg>

          </div>
          <h2 className="text-3xl font-bold mb-1">67%</h2>
          <div className="flex items-center text-red-500 text-xs">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            12% vs last week
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-2">User Status Distribution</h2>
      
      {/* We can add the distribution chart/graph here if needed */}
    </div>
        </div>
        </div>
    )
}