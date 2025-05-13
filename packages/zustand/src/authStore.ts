import { create } from "zustand";

interface authStore {
  user: string | null;
  loader: boolean;
  login: (username: string) => void;
  logout: () => void;
  setLoader: (loader: boolean) => void;
}

export const useAuth = create<authStore>((set) => ({
  user: null,
  loader: false,

  login: (username) => set({ user: username }),
  logout: () => set({ user: null }),
  setLoader: (loader) => set({ loader }),
}));
