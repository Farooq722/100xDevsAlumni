import { create } from "zustand";

type UserStore = {
  user: boolean;
  loader: boolean;
  setUser: (user: boolean) => void;
  setLoader: (status: boolean) => void;
};

export const useStore = create<UserStore>((set) => ({
  user: false,
  loader: false,

  setUser: (user) => set({ user }),

  setLoader: (status) => {
    set({ loader: status });
  },
}));
