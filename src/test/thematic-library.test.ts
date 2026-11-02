import { describe, expect, it } from "vitest";
import { ALL_SURAHS } from "../legacy/data/quranSurahs";
import {
  getQuranThemeLibraryIssues,
  QURAN_PASSAGES,
  QURAN_THEMES,
  QURAN_THEME_CATEGORIES,
} from "../legacy/data/tafsirThemes";

describe("Thematic Quran library", () => {
  it("contains the expanded 24 categories and 159 asymmetric themes", () => {
    expect(QURAN_THEME_CATEGORIES).toHaveLength(24);
    expect(QURAN_THEMES).toHaveLength(159);
    for (const category of QURAN_THEME_CATEGORIES) {
      const categoryThemes = QURAN_THEMES.filter((theme) => theme.categoryId === category.id);
      expect(categoryThemes.length).toBeGreaterThanOrEqual(5);
      expect(categoryThemes.length).toBeLessThanOrEqual(10);
      expect(new Set(categoryThemes.map((theme) => theme.passageIds.length)).size).toBeGreaterThan(
        1,
      );
    }
  });

  it("keeps at least five passage associations per theme with non-uniform counts", () => {
    expect(new Set(QURAN_THEMES.map((theme) => theme.id)).size).toBe(QURAN_THEMES.length);
    const passageCounts = new Set(QURAN_THEMES.map((theme) => theme.passageIds.length));
    expect(passageCounts.size).toBeGreaterThan(1);
    expect(QURAN_THEMES.some((theme) => theme.passageIds.length === 5)).toBe(true);
    expect(QURAN_THEMES.some((theme) => theme.passageIds.length > 5)).toBe(true);
    for (const theme of QURAN_THEMES) {
      expect(theme.passageIds.length).toBeGreaterThanOrEqual(5);
      expect(theme.passageIds.length).toBeLessThanOrEqual(15);
      expect(new Set(theme.passageIds).size).toBe(theme.passageIds.length);
    }
  });

  it("stores canonical passage references once and within surah verse bounds", () => {
    expect(new Set(QURAN_PASSAGES.map((passage) => passage.id)).size).toBe(QURAN_PASSAGES.length);
    for (const passage of QURAN_PASSAGES) {
      const surah = ALL_SURAHS.find((item) => item.number === passage.surahNumber);
      expect(surah).toBeDefined();
      expect(passage.startAyah).toBeGreaterThanOrEqual(1);
      expect(passage.startAyah).toBeLessThanOrEqual(surah!.totalAyahs);
      if (passage.endAyah !== undefined) {
        expect(passage.endAyah).toBeGreaterThanOrEqual(passage.startAyah);
        expect(passage.endAyah).toBeLessThanOrEqual(surah!.totalAyahs);
      }
    }
  });

  it("reports no structural or reference-integrity issues", () => {
    expect(getQuranThemeLibraryIssues()).toEqual([]);
  });
});
