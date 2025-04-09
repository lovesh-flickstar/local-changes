// store/userStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SignupFormData {
  email: string;
  name: string;
  dob: string;
  country: string;
  username: string;
  password: string;
  verifyOtp: string;
  phone: string;
  otp: string;
}

interface SignupStore extends SignupFormData {
  currentStep: number;
  setFormData: (data: Partial<SignupFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void; // New reset function
}

export const userStore = create<SignupStore>()(
  persist(
    (set) => ({
      email: '',
      name: '',
      phone : "",
      dob: '',
      country: '',
      username: '',
      password: '',
      verifyOtp: '',
      otp: '',
      currentStep: 1,
      setFormData: (data) => set((state) => ({ ...state, ...data })),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
      reset: () => set({
        email: '',
        phone : "",
        name: '',
        dob: '',
        country: '',
        username: '',
        password: '',
        verifyOtp: '',
        otp: '',
        currentStep: 1,
      }),
    }),
    {
      name: 'signup-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist the email field, not currentStep
      partialize: (state) => ({
        email: state.email
      }) as Pick<SignupStore, 'email'>
    }
  )
);