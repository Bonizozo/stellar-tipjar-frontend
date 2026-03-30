import {
  GlobeAltIcon,
  SparklesIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

const socialPlatforms = [
  {
    name: "Twitter",
    href: "https://twitter.com/stellar",
    icon: GlobeAltIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com/stellar",
    icon: SparklesIcon,
  },
  {
    name: "Discord",
    href: "https://discord.com/invite/stellar",
    icon: ChatBubbleOvalLeftEllipsisIcon,
  },
];

export function SocialLinks() {
  return (
    <div className="flex flex-col gap-2">
      {socialPlatforms.map((platform) => {
        const Icon = platform.icon;
        return (
          <a
            key={platform.name}
            href={platform.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-300 transition hover:bg-gray-800 hover:text-white dark:hover:bg-gray-700"
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span>{platform.name}</span>
          </a>
        );
      })}
    </div>
  );
}
