// FP-20261029-TAFSIR-7867495988FE · wz:5f8b50a0 · WAZLA / u/BerryAllenn
import React, { useState, useMemo } from "react";
import { ALL_SURAHS } from "../data/quranSurahs";
import { SurahMeta, AppTheme } from "../types/quran";
import { BookOpen, Volume2, ArrowUpDown, Filter } from "lucide-react";
import { matchesSurah } from "@/lib/searchUtils";

interface SurahCatalogProps {
  searchQuery: string;
  onSelectSurah: (surahNumber: number) => void;
  onPlaySurah: (surahNumber: number) => void;
  activeSurahNumber: number;
  theme?: AppTheme;
}

export const SurahCatalog: React.FC<SurahCatalogProps> = ({
  searchQuery,
  onSelectSurah,
  onPlaySurah,
  activeSurahNumber,
  theme = "paper",
}) => {
  const [filterType, setFilterType] = useState<"all" | "Meca" | "Medina">("all");
  const [sortBy, setSortBy] = useState<"quran" | "revelation">("quran");
  const [selectedJuz, setSelectedJuz] = useState<number | "all">("all");

  const isDark = theme === "dark";
  const isHighContrast = theme === "highContrast";

  const filteredSurahs = useMemo(() => {
    let result = [...ALL_SURAHS];

    // Filter by search (hyphen-free, space-normalized, accent-insensitive)
    if (searchQuery.trim()) {
      result = result.filter((s) => matchesSurah(s, searchQuery));
    }

    // Filter by Revelation Type
    if (filterType !== "all") {
      result = result.filter((s) => s.revelationType === filterType);
    }

    // Filter by Juz
    if (selectedJuz !== "all") {
      result = result.filter((s) => s.juzStart === selectedJuz);
    }

    // Sorting
    if (sortBy === "revelation") {
      result.sort((a, b) => a.revelationOrder - b.revelationOrder);
    } else {
      result.sort((a, b) => a.number - b.number);
    }

    return result;
  }, [searchQuery, filterType, selectedJuz, sortBy]);

  return (
    <div id="surah-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-20">
      {/* Filters and Controls Strip */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b transition-colors ${
          isHighContrast ? "border-yellow-400" : isDark ? "border-slate-800" : "border-stone-200"
        }`}
      >
        <div>
          <h2 className="text-xl font-display font-semibold">Catálogo Completo das 114 Suratas</h2>
          <div className="flex items-center gap-2 text-xs opacity-75 mt-1">
            <span>{filteredSurahs.length} suratas encontradas</span>
            <span aria-hidden="true">·</span>
            <span>Texto Uthmani original</span>
            <span aria-hidden="true">·</span>
            <span>Tafsir versículo a versículo</span>
          </div>
        </div>

        {/* Functional segmented controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Segmented Filter */}
          <div
            className={`flex items-center p-1 rounded-lg text-xs font-medium ${
              isHighContrast
                ? "bg-stone-900 border border-yellow-400 text-yellow-300"
                : isDark
                  ? "bg-[#182332] text-slate-300"
                  : "bg-stone-200/70 text-stone-700"
            }`}
          >
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                filterType === "all"
                  ? isHighContrast
                    ? "bg-yellow-400 text-black font-bold shadow-xs"
                    : isDark
                      ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                      : "bg-white text-stone-900 shadow-xs font-semibold"
                  : "hover:opacity-100 opacity-75"
              }`}
            >
              Todas (114)
            </button>
            <button
              onClick={() => setFilterType("Meca")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                filterType === "Meca"
                  ? isHighContrast
                    ? "bg-yellow-400 text-black font-bold shadow-xs"
                    : isDark
                      ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                      : "bg-white text-stone-900 shadow-xs font-semibold"
                  : "hover:opacity-100 opacity-75"
              }`}
            >
              Meca (86)
            </button>
            <button
              onClick={() => setFilterType("Medina")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                filterType === "Medina"
                  ? isHighContrast
                    ? "bg-yellow-400 text-black font-bold shadow-xs"
                    : isDark
                      ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                      : "bg-white text-stone-900 shadow-xs font-semibold"
                  : "hover:opacity-100 opacity-75"
              }`}
            >
              Medina (28)
            </button>
          </div>

          {/* Sort Control */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border transition-all active:scale-[0.98] ${
              isHighContrast
                ? "bg-black border-yellow-400 text-yellow-300"
                : isDark
                  ? "bg-[#151e2b] border-slate-700 text-slate-300"
                  : "bg-stone-100 border-stone-300/80 text-stone-700"
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="quran" className={isDark ? "bg-slate-900 text-slate-100" : ""}>
                Ordem do Alcorão (1 a 114)
              </option>
              <option value="revelation" className={isDark ? "bg-slate-900 text-slate-100" : ""}>
                Ordem Cronológica de Revelação
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Surah Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 mt-6">
        {filteredSurahs.map((surah) => {
          const isActive = surah.number === activeSurahNumber;
          return (
            <div
              key={surah.number}
              onClick={() => onSelectSurah(surah.number)}
              className={`group relative p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between active:scale-[0.985] ${
                isHighContrast
                  ? isActive
                    ? "border-2 border-yellow-400 bg-black text-white ring-2 ring-yellow-400"
                    : "border-2 border-yellow-400/70 bg-black text-white hover:border-yellow-300"
                  : isDark
                    ? isActive
                      ? "border-amber-400/80 bg-[#162130] text-slate-100 ring-1 ring-amber-400/30 shadow-md"
                      : "border-slate-800 bg-[#121924] text-slate-200 hover:border-slate-700 hover:bg-[#151e2c]"
                    : isActive
                      ? "border-amber-800/80 ring-1 ring-amber-800/20 shadow-sm bg-amber-50/20 text-stone-900"
                      : "border-stone-200/90 bg-white text-stone-900 hover:border-amber-700/50 hover:shadow-sm"
              }`}
            >
              <div>
                {/* Header row: Number + Arabic Calligraphy */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-sm font-semibold transition-colors ${
                        isHighContrast
                          ? "bg-yellow-400 text-black font-bold"
                          : isDark
                            ? "bg-slate-800 text-amber-300 group-hover:bg-amber-400 group-hover:text-slate-950"
                            : "bg-stone-100 text-stone-700 group-hover:bg-amber-900 group-hover:text-amber-100"
                      }`}
                    >
                      {surah.number}
                    </span>
                    <div>
                      <h3
                        className={`font-display font-semibold text-base transition-colors ${
                          isHighContrast
                            ? "text-yellow-400"
                            : isDark
                              ? "text-slate-100 group-hover:text-amber-300"
                              : "text-stone-900 group-hover:text-amber-950"
                        }`}
                      >
                        {surah.transliteration}
                      </h3>
                      <p className="text-xs opacity-60 font-editorial">{surah.portugueseName}</p>
                    </div>
                  </div>

                  <span
                    className={`font-arabic text-2xl transition-colors font-arabic-amiriQuran`}
                    style={{ color: isHighContrast ? "#fde047" : isDark ? "#fef3c7" : "#1c1917" }}
                  >
                    {surah.name}
                  </span>
                </div>

                {/* Metadata row: clean unboxed text with typographic separators */}
                <div className="mt-3.5 flex items-center gap-2 text-xs opacity-60">
                  <span>{surah.revelationType}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{surah.totalAyahs} Versículos</span>
                  <span aria-hidden="true">·</span>
                  <span>Juz {surah.juzStart}</span>
                  <span aria-hidden="true">·</span>
                  <span>#{surah.revelationOrder}</span>
                </div>

                {/* Thematic Summary */}
                <p className="mt-2.5 text-xs opacity-80 line-clamp-2 leading-relaxed">
                  {surah.summary}
                </p>
              </div>

              {/* Action Ribbon */}
              <div
                className={`mt-4 pt-3 border-t flex items-center justify-between ${
                  isHighContrast
                    ? "border-yellow-400/40"
                    : isDark
                      ? "border-slate-800"
                      : "border-stone-100"
                }`}
              >
                <span
                  className={`text-xs font-semibold group-hover:underline flex items-center gap-1 ${
                    isHighContrast
                      ? "text-yellow-400"
                      : isDark
                        ? "text-amber-300"
                        : "text-amber-900"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Abrir Surata & Tafsir
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlaySurah(surah.number);
                  }}
                  title="Ouvir Recitação Completa"
                  className="p-1.5 opacity-60 hover:opacity-100 hover:bg-current/10 rounded-md transition-all active:scale-75 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSurahs.length === 0 && (
        <div
          className={`text-center py-16 px-6 rounded-2xl border mt-6 transition-colors ${
            isHighContrast
              ? "bg-black border-2 border-yellow-400 text-white"
              : isDark
                ? "bg-[#121924] border-slate-800 text-slate-100"
                : "bg-white border-stone-200 text-stone-900 shadow-xs"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
              isHighContrast
                ? "bg-yellow-400/20 text-yellow-300"
                : isDark
                  ? "bg-amber-400/15 text-amber-300"
                  : "bg-amber-50 text-amber-800"
            }`}
          >
            <BookOpen className="w-6 h-6" />
          </div>
          <p
            className={`text-base font-editorial font-semibold ${
              isHighContrast ? "text-yellow-400" : isDark ? "text-slate-100" : "text-stone-900"
            }`}
          >
            Nenhuma surata encontrada para "{searchQuery}".
          </p>
          <p
            className={`text-xs mt-1.5 max-w-md mx-auto ${
              isHighContrast ? "text-stone-300" : isDark ? "text-slate-400" : "text-stone-600"
            }`}
          >
            Tente buscar pelo nome em árabe, português ou número (ex.: 1, Al-Fatihah, Abertura,
            Moisés).
          </p>
          <button
            onClick={() => onSelectSurah(1)}
            className={`mt-4 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all active:scale-95 ${
              isHighContrast
                ? "bg-yellow-400 text-black font-bold hover:bg-yellow-300"
                : isDark
                  ? "bg-amber-400 text-slate-950 font-bold hover:bg-amber-300"
                  : "bg-stone-900 text-white hover:bg-stone-800"
            }`}
          >
            Ir para Surata 1 (Al-Fatihah)
          </button>
        </div>
      )}
    </div>
  );
};
