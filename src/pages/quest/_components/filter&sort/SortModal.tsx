import { useForm } from "react-hook-form";


export const SortModal= ({ 
    
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
    <form className="flex p-3 fontClass flex-col items-start gap-5 w-full text-white"
      onSubmit={handleSubmit(submitForm)}
    >   
    {/* Date */}
    <div className="flex flex-col gap-2 items-start w-full ]">
        <h2 className="text-md font-medium">Date</h2>
        <select className="w-52 h-9 px-3 py-2 rounded-lg outline-none placeholder:font-medium placeholder:text-[#BBBBBE] border border-[#A8A8AC]">
            <option value="location1">None</option>
        </select>
      </div>

        {/* Amount */}
        <div className="flex flex-col gap-2 items-start w-full ]">
        <h2 className="text-md font-medium">Amount</h2>
        <select className="w-52 h-9 px-3 py-2 rounded-lg outline-none placeholder:font-medium placeholder:text-[#BBBBBE] border border-[#A8A8AC]">
            <option value="location1">None</option>
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
  );
};
