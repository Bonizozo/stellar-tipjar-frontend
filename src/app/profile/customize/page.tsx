"use client";

import { ProfileCustomization } from "@/components/profile/ProfileCustomization";
import { ProfileCustomizationValues } from "@/schemas/profileCustomization";

async function saveProfileCustomization(values: ProfileCustomizationValues): Promise<void> {
  await new Promise((r) => setTimeout(r, 600));
  console.log("Profile customization saved", values);
}

export default function ProfileCustomizePage() {
  return (
    <ProfileCustomization
      initialValues={{
        theme: "default",
        accentColor: "#8b5cf6",
        secondaryColor: "#0ea5e9",
        backgroundColor: "#ffffff",
        layout: "centered",
      }}
      onSave={saveProfileCustomization}
    />
  );
}