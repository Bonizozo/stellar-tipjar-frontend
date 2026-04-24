import { TipButton } from "@/components/widgets/TipButton";
import { TipCard } from "@/components/widgets/TipCard";

interface EmbedPageProps {
  searchParams: {
    username?: string;
    type?: string;
    accentColor?: string;
    label?: string;
    size?: string;
    showMessage?: string;
    compact?: string;
    defaultAsset?: string;
    displayName?: string;
    bio?: string;
  };
}

export default function EmbedPage({ searchParams }: EmbedPageProps) {
  const {
    username = "creator",
    type = "card",
    accentColor = "#0f6c7b",
    label = "Send a Tip ⭐",
    size = "md",
    showMessage = "true",
    compact = "false",
    defaultAsset = "XLM",
    displayName,
    bio,
  } = searchParams;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "8px",
        background: "transparent",
        minHeight: "100vh",
      }}
    >
      {type === "button" ? (
        <TipButton
          username={username}
          label={label}
          color={accentColor}
          size={size as "sm" | "md" | "lg"}
        />
      ) : (
        <TipCard
          username={username}
          displayName={displayName}
          bio={bio}
          accentColor={accentColor}
          showMessage={showMessage === "true"}
          compact={compact === "true"}
          defaultAsset={defaultAsset}
        />
      )}
    </div>
  );
}
