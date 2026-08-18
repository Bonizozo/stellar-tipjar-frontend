import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Navbar } from "../Navbar";
import { WalletConnector } from "../WalletConnector";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) =>
    ({ brandName: "Stellar Tip Jar" })[key] ?? key,
}));

vi.mock("../WalletConnector", () => ({
  WalletConnector: vi.fn(() => (
    <div data-testid="wallet-connector">Wallet Connector</div>
  )),
}));

vi.mock("@/components/NotificationBadge", () => ({
  NotificationBadge: () => <button>Notifications</button>,
}));
vi.mock("@/components/NotificationCenter", () => ({
  NotificationCenter: () => <div data-testid="notification-center" />,
}));
vi.mock("@/components/ThemeToggle", () => ({
  ThemeToggle: () => <button>Theme</button>,
}));
vi.mock("@/components/LanguageSwitcher", () => ({
  LanguageSwitcher: () => <button>Language</button>,
}));
vi.mock("@/components/CurrencySwitcher", () => ({
  CurrencySwitcher: () => <button>Currency</button>,
}));
vi.mock("@/components/SearchBar", () => ({
  SearchBar: ({ placeholder }: { placeholder: string }) => (
    <input aria-label={placeholder} />
  ),
}));
vi.mock("@/components/MegaMenu", () => ({
  NavItem: ({ label, href }: { label: string; href?: string }) => (
    <a href={href ?? "/explore"}>{label}</a>
  ),
  MegaMenuLink: () => null,
}));
vi.mock("@/components/MobileMenu", () => ({
  MobileMenu: ({ isOpen }: { isOpen: boolean }) => (
    <div data-testid="mobile-menu" data-open={String(isOpen)} />
  ),
}));
vi.mock("@/components/BottomDock", () => ({
  BottomDock: () => <div data-testid="bottom-dock" />,
}));

const mockWalletConnector = vi.mocked(WalletConnector);

describe("Navbar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockWalletConnector.mockImplementation(() => (
      <div data-testid="wallet-connector">Wallet Connector</div>
    ));
  });

  it("renders the brand link", () => {
    render(<Navbar />);

    const brandLink = screen.getByRole("link", {
      name: "Stellar Tip Jar — home",
    });
    expect(brandLink).toHaveTextContent("Stellar Tip Jar");
    expect(brandLink).toHaveAttribute("href", "/");
  });

  it("renders all desktop navigation links", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Explore" })).toHaveAttribute(
      "href",
      "/explore",
    );
    expect(screen.getByRole("link", { name: "Tips" })).toHaveAttribute(
      "href",
      "/tips",
    );
    expect(screen.getByRole("link", { name: "Widgets" })).toHaveAttribute(
      "href",
      "/widgets",
    );
    expect(screen.getByRole("link", { name: "Help" })).toHaveAttribute(
      "href",
      "/help",
    );
  });

  it("renders the wallet connector and utility controls", () => {
    render(<Navbar />);

    expect(screen.getByTestId("wallet-connector")).toBeInTheDocument();
    expect(mockWalletConnector).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Theme" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Language" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Notifications" })).toBeInTheDocument();
  });

  it("uses semantic header and navigation landmarks", () => {
    render(<Navbar />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
  });

  it("applies the default sticky header styling", () => {
    render(<Navbar />);

    expect(screen.getByRole("banner")).toHaveClass(
      "sticky",
      "top-0",
      "z-20",
      "border-transparent",
      "backdrop-blur-md",
    );
  });

  it("applies responsive navigation layout classes", () => {
    render(<Navbar />);

    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav).toHaveClass(
      "mx-auto",
      "flex",
      "h-16",
      "w-full",
      "max-w-7xl",
      "px-4",
      "sm:px-6",
      "lg:px-8",
    );
    expect(screen.getByRole("list")).toHaveClass("hidden", "md:flex");
  });

  it("renders the desktop search input", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("textbox", { name: "Search creators..." }),
    ).toBeInTheDocument();
  });

  it("opens the mobile menu from the hamburger button", () => {
    render(<Navbar />);

    const menuButton = screen.getByRole("button", { name: "Open mobile menu" });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("mobile-menu")).toHaveAttribute("data-open", "false");

    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("mobile-menu")).toHaveAttribute("data-open", "true");
  });

  it("adds the elevated style after the page scrolls", () => {
    render(<Navbar />);

    Object.defineProperty(window, "scrollY", { configurable: true, value: 12 });
    fireEvent.scroll(window);

    expect(screen.getByRole("banner")).toHaveClass("border-gray-200/80", "shadow-sm");
  });

  it("handles an empty wallet connector", () => {
    mockWalletConnector.mockImplementation(() => <div>Empty</div>);

    expect(() => render(<Navbar />)).not.toThrow();
    expect(screen.getByText("Empty")).toBeInTheDocument();
  });
});
