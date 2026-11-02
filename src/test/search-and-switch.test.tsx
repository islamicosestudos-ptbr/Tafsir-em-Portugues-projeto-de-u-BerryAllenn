// FP-20261029-TAFSIR-7867495988FE · wz:01de33c3 · WAZLA / u/BerryAllenn
import { describe, expect, it } from "vitest";
import { ALL_SURAHS } from "@/legacy/data/quranSurahs";
import {
  normalizeSearchText,
  stripSearchDelimiters,
  matchesSurah,
  getSearchSuggestions,
  renderHighlightedSuggestion,
} from "@/lib/searchUtils";

describe("Search normalization and hyphen-free matching", () => {
  it("normalizes text by stripping accents, hyphens, and collapsing spaces", () => {
    expect(normalizeSearchText("Al-Baqarah")).toBe("al baqarah");
    expect(normalizeSearchText("Moisés")).toBe("moises");
    expect(normalizeSearchText("  Paciência—Constância  ")).toBe("paciencia constancia");
    expect(stripSearchDelimiters("Al-Baqarah")).toBe("albaqarah");
  });

  it("finds surahs with hyphen when searched without hyphen", () => {
    const baqarah = ALL_SURAHS.find((s) => s.number === 2)!;
    expect(baqarah).toBeDefined();

    // Com hífen
    expect(matchesSurah(baqarah, "Al-Baqarah")).toBe(true);
    // Sem hífen (com espaço)
    expect(matchesSurah(baqarah, "al baqarah")).toBe(true);
    // Sem hífen e sem espaço
    expect(matchesSurah(baqarah, "albaqarah")).toBe(true);
    // Somente o sufixo
    expect(matchesSurah(baqarah, "baqarah")).toBe(true);
  });

  it("finds surahs without accents or special characters", () => {
    const imran = ALL_SURAHS.find((s) => s.number === 3)!; // Ali 'Imran
    expect(matchesSurah(imran, "ali imran")).toBe(true);
    expect(matchesSurah(imran, "al imran")).toBe(true);

    const fatihah = ALL_SURAHS.find((s) => s.number === 1)!; // Al-Fatihah
    expect(matchesSurah(fatihah, "fatihah")).toBe(true);
    expect(matchesSurah(fatihah, "al fatihah")).toBe(true);

    const yasin = ALL_SURAHS.find((s) => s.number === 36)!; // Ya-Sin
    expect(matchesSurah(yasin, "ya sin")).toBe(true);
    expect(matchesSurah(yasin, "yasin")).toBe(true);

    const nas = ALL_SURAHS.find((s) => s.number === 114)!; // An-Nas
    expect(matchesSurah(nas, "an nas")).toBe(true);
    expect(matchesSurah(nas, "annas")).toBe(true);
  });

  it("finds surahs by Portuguese name or thematic summary without accent", () => {
    const baqarah = ALL_SURAHS.find((s) => s.number === 2)!;
    expect(matchesSurah(baqarah, "a vaca")).toBe(true);
    expect(matchesSurah(baqarah, "vaca")).toBe(true);
    expect(matchesSurah(baqarah, "comercio")).toBe(true); // citada no resumo com acento "comércio"

    const taha = ALL_SURAHS.find((s) => s.number === 20)!;
    expect(matchesSurah(taha, "moises")).toBe(true); // citada no resumo com acento "Moisés"
  });

  it("finds surahs by exact number, prefixed query, or composite title", () => {
    const fatihah = ALL_SURAHS.find((s) => s.number === 1)!;
    expect(matchesSurah(fatihah, "1")).toBe(true);
    expect(matchesSurah(fatihah, "Surata 1")).toBe(true);
    expect(matchesSurah(fatihah, "1. Al-Fatihah")).toBe(true);
    expect(matchesSurah(fatihah, "A Abertura (Al-Fatihah)")).toBe(true);

    const baqarah = ALL_SURAHS.find((s) => s.number === 2)!;
    expect(matchesSurah(baqarah, "2")).toBe(true);
    expect(matchesSurah(baqarah, "Surata 2")).toBe(true);
    expect(matchesSurah(baqarah, "Surata Al-Baqarah")).toBe(true);
    expect(matchesSurah(baqarah, "A Vaca (Al-Baqarah)")).toBe(true);
    expect(matchesSurah(baqarah, "Ayat al-Kursi")).toBe(true);
  });
});

describe("Real-time Autocomplete suggestions", () => {
  it("returns relevant suggestions matching user input", () => {
    const suggestions = getSearchSuggestions("baq", 5);
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions.some((s) => s.text === "Al-Baqarah")).toBe(true);
  });

  it("returns suggestions without hyphen requirement", () => {
    const suggestions = getSearchSuggestions("al baq", 5);
    expect(suggestions.some((s) => s.text === "Al-Baqarah")).toBe(true);
  });

  it("returns thematic suggestions for keywords like Moisés", () => {
    const suggestions = getSearchSuggestions("moises", 5);
    expect(suggestions.some((s) => s.text.includes("Moisés"))).toBe(true);
  });

  it("returns empty array for empty query", () => {
    expect(getSearchSuggestions("   ")).toEqual([]);
  });

  it("renders highlighted suggestion with match", () => {
    const el = renderHighlightedSuggestion("Al-Baqarah", "baq");
    expect(el).toBeDefined();
  });
});
    
