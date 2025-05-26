import { create } from "zustand";
import { persist } from "zustand/middleware";
import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_SECRET_KEY;

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  avatarId: string;
  bio: string;
  role: string;
  socialMedia: SocialMedia;
}

interface SocialMedia {
  id: string;
  userId: string;
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  youtube: string;
  portfolio: string;
}

interface selfData1 {
  selfData: User | null;
  setSelfData: (user: User) => void;
  setSocialMedia: (socialMedia: SocialMedia) => void;
  setAvatar: (avatar: string, avatarId: string) => void;
  clearData: () => void;
}

export const useUserData = create<selfData1>()(
  persist(
    (set, get) => ({
      selfData: null,
      setSelfData: (user) => set({ selfData: user }),
      setSocialMedia: (socialMedia) => {
        const currentData = get().selfData;
        if (!currentData) return;
        set({
          selfData: {
            ...currentData,
            socialMedia,
          },
        });
      },
      setAvatar: (avatar, avatarId) => {
        const currentData = get().selfData;
        if (!currentData) return;
        set({
          selfData: {
            ...currentData,
            avatar,
            avatarId,
          },
        });
      },
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
            const bytes = CryptoJS.AES.decrypt(encrypted, secretKey!);
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
              secretKey!,
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
