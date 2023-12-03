// Assuming this is a React component file
"use client";
// Importing Recoil
import { atom, RecoilRoot } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: typeof window !== "undefined" ? window.localStorage : null,
});

// Creating a Recoil atom for user state
export const userAtom = atom({
  key: "user",
  default: () => {
    // Use localStorage inside the default value
    const storedToken =
      typeof window !== "undefined"
        ? window.localStorage.getItem("token")
        : null;
    return storedToken ? JSON.parse(storedToken) : null;
  },
  effects_UNSTABLE: [persistAtom],
});

// RecoilRoot wrapper component
export default function UserRecoil({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
