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

interface Analytics {
  departmentPercentage: Record<string, string>;
  degreePercentage: Record<string, string>;
  jobTitlePercentage: Record<string, string>;
  locationPercentage: Record<string, string>;
  experiencePercentage: Record<string, string>;
}

type AllAlumniDataStore = {
  allAlumniData: Array<any>;
  analytics: Analytics;
  setAllAlumniData: (data: Array<any>) => void;
  setAnalytics: (data: Analytics) => void;
};

const defaultAnalytics: Analytics = {
  departmentPercentage: {},
  degreePercentage: {},
  jobTitlePercentage: {},
  locationPercentage: {},
  experiencePercentage: {},
};

export const useData = create<AllAlumniDataStore>((set) => ({
  allAlumniData: [],
  analytics: defaultAnalytics,
  setAllAlumniData: (data) => set({ allAlumniData: data }),
  setAnalytics: (data) => set({ analytics: data }),
}));
