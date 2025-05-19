import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  user: boolean;
  loader: boolean;
  token: string | null;
  setUser: (user: boolean) => void;
  setLoader: (status: boolean) => void;
  setToken: (token: string) => void;
  logout: () => void;
};

export const useStore = create<UserStore>()(
  persist(
    (set) => ({
      user: false,
      loader: false,
      token: null,

      setUser: (user) => set({ user }),
      setLoader: (status) => set({ loader: status }),
      setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ token: null });
      },
    }),
    {
      name: "user-auth", // This is the localStorage key
    },
  ),
);
