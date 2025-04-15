import avatar from '../../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp'
interface FollowRequest {
    id: string;
    avatar?: string;
    username: string;
    fullName: string;
  }
  
  export const FollowRequests = ({ requests }: { requests: FollowRequest[] }) => {
    return (
      <div className="p-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold text-lg">Follow Requests (999)</h3>
        </div>
        
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="flex items-center justify-between">
              <div className="flex-1">
                <div className='flex items-center'>
                    <img
                        src={avatar || request?.avatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className='flex flex-col'><p className="text-white font-medium">{request.fullName}</p>
                    <p className="text-[#8E8E93] text-sm">@{request.username}</p></div>
                </div>
                
                
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-[#007AFF] text-white rounded-lg text-sm hover:bg-[#0066CC] transition-colors">
                  Accept
                </button>
                <button className="px-3 py-1.5 bg-[#3A3A3C] text-white rounded-lg text-sm hover:bg-[#48484A] transition-colors">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };