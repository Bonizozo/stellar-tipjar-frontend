/**
 * Editable creator profile details used by profile settings and dashboard nudges.
 *
 * This local-first store mirrors fields that will be backed by the profile API.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CreatorProfileDetails {
  displayName: string;
  username: string;
  bio: string;
  tags: string[];
  website: string;
  twitter: string;
  github: string;
  avatarUrl?: string;
}

interface ProfileDetailsState {
  profile: CreatorProfileDetails;
  updateProfile: (patch: Partial<CreatorProfileDetails>) => void;
  setAvatarUrl: (avatarUrl?: string) => void;
}

const emptyProfile: CreatorProfileDetails = {
  displayName: "",
  username: "",
  bio: "",
  tags: [],
  website: "",
  twitter: "",
  github: "",
  avatarUrl: undefined,
};

export const useProfileDetailsStore = create<ProfileDetailsState>()(
  persist(
    (set) => ({
      profile: emptyProfile,
      updateProfile: (patch) =>
        set((state) => ({ profile: { ...state.profile, ...patch } })),
      setAvatarUrl: (avatarUrl) =>
        set((state) => ({ profile: { ...state.profile, avatarUrl } })),
    }),
    {
      name: "creator-profile-details-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useCreatorProfileDetails = () =>
  useProfileDetailsStore((state) => state.profile);
