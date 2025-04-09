// store/useAuthStore.ts
import { create } from 'zustand';

interface LoginAuthData {
  identifier: string; // Can be email/phone/username
  password: string;
  otp: string;
  newPassword: string;
}

interface LoginAuthStore {
  currentFlow: 'login' | 'signup' | 'forgot-password';
  step: number;
  data: LoginAuthData;
  error: string | null;
  
  setAuthData: (data: Partial<LoginAuthData>) => void;
  switchFlow: (flow: 'login' | 'signup' | 'forgot-password') => void;
  nextStep: () => void;
  resetAuth: () => void;
}

export const useLoginAuthStore = create<LoginAuthStore>((set) => ({
  currentFlow: 'login',
  step: 1,
  data: {
    identifier: '',
    password: '',
    otp: '',
    newPassword: ''
  },
  error: null,

  setAuthData: (data) => set(state => ({ 
    data: { ...state.data, ...data } 
  })),
  
  switchFlow: (flow) => set({ 
    currentFlow: flow,
    step: 1,
    data: { identifier: '', password: '', otp: '', newPassword: '' }
  }),
  
  nextStep: () => set(state => ({ step: state.step + 1 })),
  resetAuth: () => set({
    currentFlow: 'login',
    step: 1,
    data: { identifier: '', password: '', otp: '', newPassword: '' }
  })
}));