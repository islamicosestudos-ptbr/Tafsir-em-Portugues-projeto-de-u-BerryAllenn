import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { AyahOrnamentalMarker, toArabicIndic } from "@/legacy/components/AyahOrnamentalMarker";

describe("Verse Reference Formatting", () => {
  const surah = {
    number: 16,
    transliteration: "An-Nahl",
    portugueseName: "As Abelhas",
  };

  const getReference = (style: "surahName" | "generic" | "compact", ayahNumber: number) => {
    switch (style) {
      case "generic":
        return `Versículo ${surah.number}:${ayahNumber}`;
      case "compact":
        return `${surah.number}:${ayahNumber}`;
      case "surahName":
      default:
        return `${surah.transliteration} · ${surah.number}:${ayahNumber}`;
    }
  };

  it("formats verse reference in editorial style by default", () => {
    expect(getReference("surahName", 7)).toBe("An-Nahl · 16:7");
  });

  it("formats verse reference in classic generic style when requested", () => {
    expect(getReference("generic", 7)).toBe("Versículo 16:7");
  });

  it("formats verse reference in compact style when requested", () => {
    expect(getReference("compact", 7)).toBe("16:7");
  });
});

describe("toArabicIndic conversion", () => {
  it("converts 1, 10, 45, and 286 to Eastern Arabic numerals", () => {
    expect(toArabicIndic(1)).toBe("١");
    expect(toArabicIndic(10)).toBe("١٠");
    expect(toArabicIndic(45)).toBe("٤٥");
    expect(toArabicIndic(286)).toBe("٢٨٦");
  });
});

describe("AyahOrnamentalMarker Component", () => {
  it("renders a single span with dir='ltr', lang='ar', and text ۝ followed by the Arabic number", () => {
    const { container } = render(<AyahOrnamentalMarker ayahNumber={1} />);
    const span = container.querySelector("span");

    expect(span).toBeInTheDocument();
    expect(span?.getAttribute("dir")).toBe("ltr");
    expect(span?.getAttribute("lang")).toBe("ar");
    expect(span?.textContent).toBe("۝١");
    expect(span?.children.length).toBe(0); // single span, no nested layers
  });

  it("renders correctly for multi-digit ayahs 10, 45, and 286", () => {
    const { container: c10 } = render(<AyahOrnamentalMarker ayahNumber={10} />);
    expect(c10.querySelector("span")?.textContent).toBe("۝١٠");
    expect(c10.querySelector("span")?.getAttribute("dir")).toBe("ltr");

    const { container: c45 } = render(<AyahOrnamentalMarker ayahNumber={45} />);
    expect(c45.querySelector("span")?.textContent).toBe("۝٤٥");
    expect(c45.querySelector("span")?.getAttribute("dir")).toBe("ltr");

    const { container: c286 } = render(<AyahOrnamentalMarker ayahNumber={286} />);
    expect(c286.querySelector("span")?.textContent).toBe("۝٢٨٦");
    expect(c286.querySelector("span")?.getAttribute("dir")).toBe("ltr");
  });

  it("sets font-size between 1em and 1.2em and does not use grid, position, transform, width, or height", () => {
    const { container } = render(<AyahOrnamentalMarker ayahNumber={7} />);
    const span = container.querySelector("span");
    expect(span).not.toBeNull();

    const inlineStyle = span?.style;
    expect(inlineStyle?.fontSize).toBe("1.1em");
    // Ensure fontSize is within [1em, 1.2em]
    const numericSize = parseFloat(inlineStyle?.fontSize || "0");
    expect(numericSize).toBeGreaterThanOrEqual(1.0);
    expect(numericSize).toBeLessThanOrEqual(1.2);

    // No grid, position, transform, width, or height
    expect(inlineStyle?.display).not.toBe("grid");
    expect(inlineStyle?.display).not.toBe("inline-grid");
    expect(inlineStyle?.position).toBe("");
    expect(inlineStyle?.transform).toBe("");
    expect(inlineStyle?.width).toBe("");
    expect(inlineStyle?.height).toBe("");
  });
});
