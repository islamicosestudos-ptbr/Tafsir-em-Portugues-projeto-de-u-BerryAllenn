// FP-20261029-TAFSIR-7867495988FE · wz:378ef1da · WAZLA / u/BerryAllenn
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, ArrowRight, BookOpen, Sparkles, X } from "lucide-react";
import {
  getSearchSuggestions,
  renderHighlightedSuggestion,
  type SearchSuggestionItem,
} from "@/lib/searchUtils";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectSurah: (surahNumber: number) => void;
  onQuickJump: (surahNumber: number, ayahNumber?: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSelectSurah,
  onQuickJump,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const suggestions = useMemo(() => {
    return getSearchSuggestions(searchQuery, 7);
  }, [searchQuery]);

  // Abre dropdown quando há busca digitada e sugestões disponíveis
  useEffect(() => {
    if (searchQuery.trim().length > 0 && suggestions.length > 0) {
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setIsOpen(false);
    }
  }, [searchQuery, suggestions.length]);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (item: SearchSuggestionItem) => {
    // Preenche o campo e executa a busca
    onSearchChange(item.text);
    setIsOpen(false);
    setSelectedIndex(-1);

    // Se for passagem específica com versículo
    if (item.ayahNumber && item.surahNumber) {
      onQuickJump(item.surahNumber, item.ayahNumber);
      return;
    }

    // Rola suavemente até o catálogo de resultados
    window.requestAnimationFrame(() => {
      document
        .getElementById("surah-catalog")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "Enter") {
        document
          .getElementById("surah-catalog")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelectSuggestion(suggestions[selectedIndex]);
      } else {
        setIsOpen(false);
        document
          .getElementById("surah-catalog")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-stone-200/80 bg-stone-900 text-stone-100">
      {/* Subtle linear scrim for contrast compliance */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/85 to-stone-900/70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-3xl">
          {/* Metadata Discipline: unboxed text with typographic separator and official logo */}
          <div className="flex items-center gap-3.5 mb-4">
            <img
              src="/assets/aistudio/1793293791632-removebg-preview_79f288ad.png"
              alt="Logo Alcorão Sagrado"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-contain drop-shadow-md shrink-0 border border-amber-400/30 bg-emerald-950/40 p-1"
            />
            <div>
              <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-300/85">
                <span>Al-Qur'an Al-Karim</span>
                <span aria-hidden="true">·</span>
                <span>Tradução Oficial & Exegese</span>
                <span aria-hidden="true">·</span>
                <span>114 Suratas</span>
              </div>
              <span className="text-[11px] text-stone-400 font-editorial">
                Complexo do Rei Fahd de Medina & Samir El-Hayek
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-amber-50 tracking-tight leading-tight [text-wrap:balance]">
            O Nobre Alcorão com Tafsir em Língua Portuguesa
          </h1>

          <p className="mt-3 text-base sm:text-lg text-stone-300 font-editorial leading-relaxed max-w-2xl">
            Texto sagrado em caligrafia árabe Uthmani acompanhado da tradução acadêmica do Dr. Helmi
            Nasr e Samir El-Hayek, com exegese versículo a versículo e estudos teológicos
            aprofundados.
          </p>

          {/* Search Box with Real-Time Google-Style Autocomplete */}
          <div className="mt-6 relative max-w-xl" ref={searchContainerRef}>
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-stone-400 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onFocus={() => {
                  if (searchQuery.trim().length > 0 && suggestions.length > 0) {
                    setIsOpen(true);
                  }
                }}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar por surata, versículo ou palavra (ex: Fatihah, misericórdia, Moisés, paciência)..."
                className="w-full pl-12 pr-10 py-3 bg-stone-950/90 border border-stone-700/80 rounded-xl text-stone-100 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-inner"
                role="combobox"
                aria-expanded={isOpen}
                aria-autocomplete="list"
                aria-controls="search-autocomplete-list"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    onSearchChange("");
                    setIsOpen(false);
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 p-1 text-stone-400 hover:text-stone-200 transition-all active:scale-75 cursor-pointer"
                  title="Limpar busca"
                  aria-label="Limpar busca"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isOpen && suggestions.length > 0 && (
              <div
                id="search-autocomplete-list"
                role="listbox"
                className="absolute left-0 right-0 top-full mt-2 z-50 bg-stone-950/95 backdrop-blur-md border border-stone-800 rounded-xl shadow-2xl overflow-hidden py-1 divide-y divide-stone-900"
              >
                {suggestions.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onMouseDown={(e) => {
                        // Previne blur antes de selecionar
                        e.preventDefault();
                        handleSelectSuggestion(item);
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`px-4 py-2.5 flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-[0.99] ${
                        isSelected
                          ? "bg-amber-500/20 text-amber-200"
                          : "hover:bg-stone-900 text-stone-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-7 h-7 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400/90">
                          {item.category === "surah" ? (
                            <BookOpen className="w-3.5 h-3.5" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm tracking-wide">
                            {renderHighlightedSuggestion(item.text, searchQuery)}
                          </div>
                          <div className="text-[11px] text-stone-400 truncate mt-0.5">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <ArrowRight className="w-3.5 h-3.5 text-stone-500 opacity-60 shrink-0" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Access Links */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-stone-400">
            <span className="text-stone-300">Acesso Rápido:</span>
            <button
              onClick={() => onSelectSurah(1)}
              className="text-amber-300 hover:underline cursor-pointer transition-transform active:scale-95"
            >
              1. Al-Fatihah
            </button>
            <span>·</span>
            <button
              onClick={() => onQuickJump(2, 255)}
              className="text-amber-300 hover:underline cursor-pointer transition-transform active:scale-95"
            >
              Ayat al-Kursi (2:255)
            </button>
            <span>·</span>
            <button
              onClick={() => onSelectSurah(18)}
              className="text-amber-300 hover:underline cursor-pointer transition-transform active:scale-95"
            >
              18. Al-Kahf
            </button>
            <span>·</span>
            <button
              onClick={() => onSelectSurah(36)}
              className="text-amber-300 hover:underline cursor-pointer transition-transform active:scale-95"
            >
              36. Ya-Sin
            </button>
            <span>·</span>
            <button
              onClick={() => onSelectSurah(67)}
              className="text-amber-300 hover:underline cursor-pointer transition-transform active:scale-95"
            >
              67. Al-Mulk
            </button>
            <span>·</span>
            <button
              onClick={() => onSelectSurah(112)}
              className="text-amber-300 hover:underline cursor-pointer transition-transform active:scale-95"
            >
              112. Al-Ikhlas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
