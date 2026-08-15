import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageSwitcher, getLocalizedPath } from "../LanguageSwitcher";

const mockReplace = vi.fn();
let mockPathname = "/";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => mockPathname,
}));

vi.mock("next-intl", () => ({
  useLocale: () => "en",
}));

describe("LanguageSwitcher & getLocalizedPath", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname = "/";
  });

  describe("getLocalizedPath utility", () => {
    it("preserves nested paths when switching to non-default locales", () => {
      expect(getLocalizedPath("/creator/alice", "es")).toBe("/es/creator/alice");
      expect(getLocalizedPath("/creator/alice/settings", "fr")).toBe("/fr/creator/alice/settings");
      expect(getLocalizedPath("/explore", "zh")).toBe("/zh/explore");
    });

    it("strips locale prefix when switching back to default English", () => {
      expect(getLocalizedPath("/es/creator/alice", "en")).toBe("/creator/alice");
      expect(getLocalizedPath("/fr/explore", "en")).toBe("/explore");
      expect(getLocalizedPath("/zh", "en")).toBe("/");
    });

    it("swaps existing locale prefix when switching between non-default locales", () => {
      expect(getLocalizedPath("/es/creator/alice", "fr")).toBe("/fr/creator/alice");
      expect(getLocalizedPath("/zh/tips", "ar")).toBe("/ar/tips");
    });

    it("handles root path correctly without trailing slash bugs", () => {
      expect(getLocalizedPath("/", "es")).toBe("/es");
      expect(getLocalizedPath("/", "en")).toBe("/");
    });
  });

  describe("LanguageSwitcher component", () => {
    it("renders language select dropdown with accessibility label", () => {
      render(<LanguageSwitcher />);
      const select = screen.getByRole("combobox", { name: /select language/i });
      expect(select).toBeInTheDocument();
      expect(select).toHaveValue("en");
    });

    it("calls router.replace with preserved deep path on selection", () => {
      mockPathname = "/creators/bob";
      render(<LanguageSwitcher />);

      const select = screen.getByRole("combobox", { name: /select language/i });
      fireEvent.change(select, { target: { value: "es" } });

      expect(mockReplace).toHaveBeenCalledWith("/es/creators/bob");
    });
  });
});
