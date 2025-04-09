// store/userForgetStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ForgetPasswordFormData {
    email: string;
    username: string;
    phone: string;
}

interface ForgetPasswordStore extends ForgetPasswordFormData {
    currentStep: number;
    setFormData: (data: Partial<ForgetPasswordFormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
}

export const userForgetStore = create<ForgetPasswordStore>()(
    persist(
        (set) => ({
            email: '',
            username: '',
            phone: '',
            currentStep: 1,
            setFormData: (data) => set((state) => ({ ...state, ...data })),
            nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
            prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
            reset: () => set({
                email: '',
                username: '',
                phone: '',
                currentStep: 1,
            }),
        }),
        {
            name: 'forget-password-storage',
            storage: createJSONStorage(() => localStorage),
            // Only persist the email field
            // partialize: (state) => ({
            //     email: state.email,
            // }) as Pick<ForgetPasswordStore, 'email'>,
        }
    )
);
