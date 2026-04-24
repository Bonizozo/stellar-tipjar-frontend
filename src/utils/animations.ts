import type { Variants } from "framer-motion";

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: "easeIn" } },
};

export const slideInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15, ease: "easeIn" } },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } },
};

export const pageTransitionVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
};

export const cardHoverVariants = {
  rest: { y: 0, boxShadow: "var(--shadow-card)" },
  hover: { y: -4, boxShadow: "var(--shadow-card-hover)", transition: { duration: 0.2, ease: "easeOut" } },
};

export const buttonTapVariants = {
  tap: { scale: 0.96 },
};

/** Returns instant/no-op variants when reduced motion is preferred */
export function reducedVariants<T extends Variants>(variants: T): T {
  return Object.fromEntries(
    Object.entries(variants).map(([key, value]) => [
      key,
      typeof value === "object" ? { ...value, transition: { duration: 0 } } : value,
    ])
  ) as T;
}
