import { create } from "zustand";
import { AuthStore } from "../constants/types";

// npm install react@latest
export const useAuthStore = create<AuthStore>((set) => ({
  auth: {
    username: "",
    active: false,
  },
  setUsername: (name: string) =>
    set((state) => ({ auth: { ...state.auth, username: name } })),
}));

// import create, { State } from 'zustand'

// interface AuthState extends State {
//   username: string
//   active: boolean
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   username: '',
//   active: false,
//   setUsername: (name: string) => set((state) => ({ ...state, username: name })),
//   setActive: (isActive: boolean) => set((state) => ({ ...state, active: isActive })),
// }))
