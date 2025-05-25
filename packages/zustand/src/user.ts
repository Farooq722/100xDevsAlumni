import { create } from "zustand";
import { persist } from "zustand/middleware";
import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
dotenv.config()
 

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  avatarId: string;
  bio: string;
  role: string;
}

interface selfData1 {
  selfData: User | null;
  setSelfData: (user: User) => void;
  clearData: () => void;
}

export const useUserData = create<selfData1>()(
  persist(
    (set) => ({
      selfData: null,
      setSelfData: (user) => set({ selfData: user }),
      clearData: () => set({ selfData: null }),
    }),
    {
      name: "self-data",
      partialize: (state) => ({ selfData: state.selfData }),
      storage: {
        getItem: (name) => {
          const encrypted = localStorage.getItem(name);
          if (!encrypted) return null;
          try {
            // Decrypt the stored string
            const bytes = CryptoJS.AES.decrypt(encrypted, process.env.SECRET_KEY!);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decrypted);
          } catch (e) {
            console.error("Decryption error:", e);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            // Convert value to string
            const stringValue = JSON.stringify(value);
            // Encrypt the string
            const encrypted = CryptoJS.AES.encrypt(
              stringValue,
              process.env.SECRET_KEY!,
            ).toString();
            localStorage.setItem(name, encrypted);
          } catch (e) {
            console.error("Encryption error:", e);
          }
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    },
  ),
);
