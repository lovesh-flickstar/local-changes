import { create } from 'zustand';

interface AuthState {
  user: null | User;
  isLoading: boolean;
  error: string | null;
  loginUser: (credentials: LoginForm) => Promise<boolean>;
  logoutUser: () => void;
}

interface User {
  id: string;
  email: string;
  // Add other user properties
}

interface LoginForm {
  email: string;
  password: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  
  loginUser: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      // Replace with actual API call
      const response = await mockAPICall(credentials);
      set({ user: response.user, isLoading: false });
      return true;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An unknown error occurred', isLoading: false });
      return false;
    }
  },

  logoutUser: () => set({ user: null }),
}));

// Mock API function
const mockAPICall = (credentials: LoginForm): Promise<{ user: User }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email && credentials.password) {
        resolve({
          user: {
            id: '1',
            email: credentials.email,
          }
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1500);
  });
};