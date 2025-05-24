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

// type UserStore = {
//   user: boolean;
//   loader: boolean;
//   token: string | null;
//   setUser: (user: boolean) => void;
//   setLoader: (status: boolean) => void;
//   setToken: (token: string) => void;
//   logout: () => void;
// };

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  avatarId: string;
  bio: string;
  role: string;
}

type selfData1 = {
  selfData: User | null;
  allAlumniData: Array<any>;
  setSelfData: (user: User) => void;
  setAllAlumniData: (allAlumniData: Array<any>) => void;
};

// export const useStore = create<UserStore>()(
//   persist(
//     (set) => ({
//       user: false,
//       loader: false,
//       token: null,

//       setUser: (user) => set({ user }),
//       setLoader: (status) => set({ loader: status }),
//       setToken: (token) => {
//         localStorage.setItem("token", token);
//         set({ token });
//       },
//       logout: () => {
//         localStorage.removeItem("token");
//         set({ token: null });
//       },
//     }),
//     {
//       name: "user-auth", // This is the localStorage key
//     },
//   ),
// );

export const useData = create<selfData1>()((set) => ({
  selfData: null,
  allAlumniData: [],
  setSelfData: (data) => set({ selfData: data }),
  setAllAlumniData: (allAlumniData) => set({ allAlumniData }),
}));
