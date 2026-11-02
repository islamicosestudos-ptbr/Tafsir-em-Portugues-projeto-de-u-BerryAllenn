import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { SplashScreen } from "@/legacy/components/SplashScreen";
import { PROJECT_INFO } from "@/legacy/data/projectInfo";

describe("SplashScreen Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with pure white #FFFFFF background and proper accessibility role", () => {
    const onFinish = vi.fn();
    const { container } = render(<SplashScreen onFinish={onFinish} />);
    const splash = screen.getByTestId("splash-screen");

    expect(splash).toBeInTheDocument();
    expect(splash).toHaveStyle({ backgroundColor: "#FFFFFF" });
  });

  it("displays app icon, Wazla logo, developer name, and u/BerryAllenn handle", () => {
    const onFinish = vi.fn();
    render(<SplashScreen onFinish={onFinish} />);

    // App title and branding
    expect(screen.getByText("ALCORÃO SAGRADO")).toBeInTheDocument();
    expect(screen.getByText("& Tafsir em Português")).toBeInTheDocument();

    // Wazla and Reddit credits
    expect(screen.getByText(PROJECT_INFO.initiativeName)).toBeInTheDocument();
    expect(screen.getByText(PROJECT_INFO.developerHandle)).toBeInTheDocument();

    // Images
    const appIcon = screen.getByAltText("Ícone Alcorão Sagrado");
    expect(appIcon).toHaveAttribute("src", PROJECT_INFO.appIconUrl);

    const wazlaLogo = screen.getByAltText("Logo Wazla");
    expect(wazlaLogo).toHaveAttribute("src", PROJECT_INFO.initiativeLogoUrl);
  });

  it("completes animation and triggers onFinish automatically after the specified duration", () => {
    const onFinish = vi.fn();
    render(<SplashScreen onFinish={onFinish} durationMs={1200} />);

    expect(onFinish).not.toHaveBeenCalled();

    // Advance timers through mount and duration + fade transition
    act(() => {
      vi.advanceTimersByTime(1200 + 300);
    });

    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it("allows immediate skipping when tapped or clicked", () => {
    const onFinish = vi.fn();
    render(<SplashScreen onFinish={onFinish} durationMs={1200} />);

    const splash = screen.getByTestId("splash-screen");
    fireEvent.click(splash);

    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(onFinish).toHaveBeenCalledTimes(1);
  });
});
