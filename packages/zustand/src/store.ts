import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  user: boolean;
  loader: boolean;
  setUser: (user: boolean) => void;
  setLoader: (status: boolean) => void;
  logout: () => void;
};

export const useStore = create<UserStore>()(
  persist(
    (set) => ({
      user: false,
      loader: false,
      setUser: (user) => set({ user }),
      setLoader: (status) => set({ loader: status }),
      logout: () => set({ user: false }),
    }),
    {
      name: "user-auth",
    },
  ),
);

type allAlumniData = {
  allAlumniData: Array<any>;
  setAllAlumniData: (allAlumniData: Array<any>) => void;
};

export const useData = create<allAlumniData>()((set) => ({
  allAlumniData: [],
  setAllAlumniData: (allAlumniData) => set({ allAlumniData }),
}));
