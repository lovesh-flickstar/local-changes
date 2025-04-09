import { Dispatch, SetStateAction } from "react";

type DeleteSection = 
| 'overview'
| 'deleteAccount'
| 'deactivateAccount'

interface ManageAccountProps {
  onNavigate: Dispatch<SetStateAction<DeleteSection>>;
}

export const ManageAccount: React.FC<ManageAccountProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-start justify-start gap-8">
      <button className="text-xl font" onClick={() => onNavigate('deactivateAccount')}>Deactivate Account</button>
      <div className="border-b-1 border-gray-700 w-full"></div>
      <button className="text-xl text-red-500" onClick={() => onNavigate('deleteAccount')}>Delete my Account</button>
    </div>
  );
};
