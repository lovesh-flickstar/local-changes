// CreateQuestForm.tsx
import { useForm } from 'react-hook-form';
import { CreateQuest } from '../../../../types/quest';

export const CreateQuestForm = ({ 
  onSuccess,
}: { 
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const { handleSubmit } = useForm<CreateQuest>();

  const submitForm = async (values: CreateQuest) => {
    try {
      await fetch('/api/quests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      onSuccess();
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(submitForm)}
      className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg"
    >
      {/* Form fields remain same as before */}
    </form>
  );
};