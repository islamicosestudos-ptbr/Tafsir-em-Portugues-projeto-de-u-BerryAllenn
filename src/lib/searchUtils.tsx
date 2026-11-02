// FP-20261029-TAFSIR-7867495988FE · wz:90c5216b · WAZLA / u/BerryAllenn
import React from "react";
import { ALL_SURAHS } from "@/legacy/data/quranSurahs";
import type { SurahMeta } from "@/legacy/types/quran";

/**
 * Normaliza uma string para comparação de busca:
 * - Remove acentos e diacríticos (á -> a, ã -> a)
 * - Converte para minúsculas
 * - Remove hífens e traços (substituindo por espaço)
 * - Remove apóstrofos e aspas
 * - Colapsa espaços repetidos e faz trim
 */
export function normalizeSearchText(value: string): string {
  if (!value) return "";
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f\u064b-\u065f\u0670\u06d6-\u06ed]/g, "")
    .toLowerCase()
    .replace(/['’`ʼ]/g, "")
    .replace(/[()[\]{}.,;:!?"'«»‹›\-_–—/\\|#*&~^%$@+=]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Remove todos os delimitadores e espaços da string normalizada.
 * Permite buscar "albaqarah" e achar "Al-Baqarah", ou "al fatihah" e achar "Al-Fatihah".
 */
export function stripSearchDelimiters(value: string): string {
  return normalizeSearchText(value).replace(/\s+/g, "");
}

/**
 * Verifica se um texto candidato corresponde à consulta de busca,
 * tolerando ausência de hífens, acentos e variações de espaçamento.
 */
export function matchesSearchText(candidate: string, query: string): boolean {
  if (!query.trim()) return true;
  if (!candidate) return false;

  const normQuery = normalizeSearchText(query);
  const stripQuery = stripSearchDelimiters(query);
  const normCandidate = normalizeSearchText(candidate);
  const stripCandidate = stripSearchDelimiters(candidate);

  if (normCandidate.includes(normQuery) || stripCandidate.includes(stripQuery)) {
    return true;
  }

  // Verifica se cada palavra da consulta aparece no candidato
  const queryWords = normQuery.split(" ").filter(Boolean);
  if (queryWords.length > 1) {
    return queryWords.every(
      (word) => normCandidate.includes(word) || stripCandidate.includes(word),
    );
  }

  return false;
}

/**
 * Verifica se uma surata atende à pesquisa por nome transliterado,
 * tradução em português, número, nome árabe ou resumo temático.
 */
export function matchesSurah(surah: SurahMeta, query: string): boolean {
  const trimmed = query.trim();
  if (!trimmed) return true;

  // 1. Extração de número direto ou prefixado ("1", "Surata 1", "Sura 2", "1. Al-Fatihah")
  const numMatch = trimmed.match(/(?:surata|sura|surah|\.)?\s*(\d+)/i);
  if (numMatch && numMatch[1]) {
    const extractedNum = parseInt(numMatch[1], 10);
    if (!isNaN(extractedNum) && surah.number === extractedNum) {
      return true;
    }
  }

  // 2. Consulta holística combinada (número + transliteração + português + resumo)
  // Isso permite buscas que combinam português e transliteração como "A Vaca (Al-Baqarah)"
  // ou termos do resumo como "Ayat al-Kursi" e "Moisés"
  const combined = `${surah.number} ${surah.transliteration} ${surah.portugueseName} ${surah.summary}`;
  if (matchesSearchText(combined, trimmed)) {
    return true;
  }

  // 3. Remove termos genéricos corânicos ("surata", "sura", "surah") da consulta
  const queryWithoutPrefix = trimmed
    .replace(/\b(surata|sura|surah|capitulo|capítulo)\b/gi, "")
    .trim();
  if (queryWithoutPrefix && matchesSearchText(combined, queryWithoutPrefix)) {
    return true;
  }

  // 4. Texto em árabe (com e sem diacríticos tashkeel)
  if (surah.name.includes(trimmed)) {
    return true;
  }
  const cleanArabicName = surah.name.replace(/[\u064b-\u065f\u0670\u06d6-\u06ed]/g, "");
  const cleanArabicQuery = trimmed.replace(/[\u064b-\u065f\u0670\u06d6-\u06ed]/g, "");
  if (cleanArabicQuery && cleanArabicName.includes(cleanArabicQuery)) {
    return true;
  }

  return false;
}

export interface SearchSuggestionItem {
  id: string;
  text: string;
  subtitle: string;
  category: "surah" | "passage" | "theme";
  surahNumber?: number;
  ayahNumber?: number;
}

const POPULAR_THEMATIC_SUGGESTIONS: Omit<SearchSuggestionItem, "id">[] = [
  {
    text: "Ayat al-Kursi",
    subtitle: "Surata Al-Baqarah (2:255) · Versículo do Trono",
    category: "passage",
    surahNumber: 2,
    ayahNumber: 255,
  },
  {
    text: "Moisés (Musa)",
    subtitle: "Profeta mais citado no Alcorão · Al-Baqarah, Ta-Ha, Al-Qasas",
    category: "theme",
    surahNumber: 20,
  },
  {
    text: "Abraão (Ibrahim)",
    subtitle: "O Amigo de Deus (Khalilullah) · Surata Ibrahim (14)",
    category: "theme",
    surahNumber: 14,
  },
  {
    text: "Jesus ('Isa ibn Maryam)",
    subtitle: "Messias e Profeta honrado · Ali 'Imran (3) e Maryam (19)",
    category: "theme",
    surahNumber: 19,
  },
  {
    text: "Maria (Maryam)",
    subtitle: "A mãe de Jesus · Surata Maryam (19) e Ali 'Imran",
    category: "theme",
    surahNumber: 19,
  },
  {
    text: "Misericórdia (Rahmah)",
    subtitle: "A compaixão e clemência divinas em todas as suratas",
    category: "theme",
  },
  {
    text: "Paciência e Constância (Sabr)",
    subtitle: "Virtude sublime na provação e na firmeza de fé",
    category: "theme",
  },
  {
    text: "Paraíso (Jannah)",
    subtitle: "A recompensa dos justos descrita no Além",
    category: "theme",
  },
  {
    text: "Oração (Salah)",
    subtitle: "Pilar fundamental da comunhão diária com o Criador",
    category: "theme",
  },
  {
    text: "Caridade (Zakat & Sadaqah)",
    subtitle: "Solidariedade e purificação dos bens no Alcorão",
    category: "theme",
  },
  {
    text: "Perdão e Arrependimento (Tawbah)",
    subtitle: "O retorno sincero a Deus e Sua acolhida amorosa",
    category: "theme",
  },
];

/**
 * Gera sugestões de busca em tempo real com base na consulta digitada.
 */
export function getSearchSuggestions(query: string, maxItems = 7): SearchSuggestionItem[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const normQuery = normalizeSearchText(trimmed);
  const stripQuery = stripSearchDelimiters(trimmed);
  const results: SearchSuggestionItem[] = [];

  // 1. Suratas correspondentes
  for (const surah of ALL_SURAHS) {
    const isTranslitMatch = matchesSearchText(surah.transliteration, trimmed);
    const isPtNameMatch = matchesSearchText(surah.portugueseName, trimmed);
    const isNumberMatch =
      surah.number.toString() === trimmed ||
      surah.number.toString().startsWith(trimmed) ||
      normQuery.startsWith(`surata ${surah.number}`);

    if (isTranslitMatch || isPtNameMatch || isNumberMatch) {
      // Prioridade: se o nome transliterado começa com o termo, prioriza
      const normTrans = normalizeSearchText(surah.transliteration);
      const stripTrans = stripSearchDelimiters(surah.transliteration);
      const startsWithTerm =
        normTrans.startsWith(normQuery) ||
        stripTrans.startsWith(stripQuery) ||
        surah.number.toString() === trimmed;

      results.push({
        id: `surah-${surah.number}`,
        text: surah.transliteration,
        subtitle: `Surata ${surah.number} · ${surah.portugueseName} · ${surah.revelationType} (${surah.totalAyahs} versículos)`,
        category: "surah",
        surahNumber: surah.number,
      });

      // Se a tradução em português também foi o termo forte buscado
      if (isPtNameMatch && !isTranslitMatch) {
        results.push({
          id: `surah-pt-${surah.number}`,
          text: `${surah.portugueseName} (${surah.transliteration})`,
          subtitle: `Surata ${surah.number} · Tradução em português`,
          category: "surah",
          surahNumber: surah.number,
        });
      }

      if (results.length >= maxItems * 2) break;
    }
  }

  // 2. Passagens e temas célebres
  for (const theme of POPULAR_THEMATIC_SUGGESTIONS) {
    if (matchesSearchText(theme.text, trimmed) || matchesSearchText(theme.subtitle, trimmed)) {
      results.push({
        id: `theme-${theme.text}`,
        ...theme,
      });
      if (results.length >= maxItems * 2) break;
    }
  }

  // Ordenação inteligente:
  // - Itens cujo texto começa com a query vêm primeiro
  // - Suratas antes de temas
  results.sort((a, b) => {
    const aNorm = normalizeSearchText(a.text);
    const bNorm = normalizeSearchText(b.text);
    const aStrip = stripSearchDelimiters(a.text);
    const bStrip = stripSearchDelimiters(b.text);

    const aStarts = aNorm.startsWith(normQuery) || aStrip.startsWith(stripQuery);
    const bStarts = bNorm.startsWith(normQuery) || bStrip.startsWith(stripQuery);

    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;

    if (a.category === "surah" && b.category !== "surah") return -1;
    if (a.category !== "surah" && b.category === "surah") return 1;

    return 0;
  });

  return results.slice(0, maxItems);
}

/**
 * Renderiza o texto com a parte digitada em negrito (destacada) e o restante em cor secundária.
 * Funciona mesmo quando a busca não contém hífens e o texto contém, ou vice-versa.
 */
export function renderHighlightedSuggestion(text: string, query: string): React.ReactElement {
  const trimmed = query.trim();
  if (!trimmed) {
    return <span className="text-stone-300">{text}</span>;
  }

  // 1. Tentativa direta case-insensitive
  const lowerText = text.toLowerCase();
  const lowerQuery = trimmed.toLowerCase();
  const directIdx = lowerText.indexOf(lowerQuery);
  if (directIdx !== -1) {
    const before = text.slice(0, directIdx);
    const match = text.slice(directIdx, directIdx + lowerQuery.length);
    const after = text.slice(directIdx + lowerQuery.length);
    return (
      <span className="truncate">
        {before && <span className="text-stone-400 font-normal">{before}</span>}
        <span className="font-bold text-amber-300">{match}</span>
        {after && <span className="text-stone-400 font-normal">{after}</span>}
      </span>
    );
  }

  // 2. Tentativa por correspondência ignorando hífens, acentos e espaços extras
  const stripQ = stripSearchDelimiters(trimmed);
  if (!stripQ) {
    return <span className="text-stone-300">{text}</span>;
  }

  const stripT = stripSearchDelimiters(text);
  const stripIdx = stripT.indexOf(stripQ);

  if (stripIdx !== -1) {
    // Mapeia de volta para os índices de caracteres no texto original
    let currentStripped = 0;
    let matchStart = -1;
    let matchEnd = -1;

    for (let i = 0; i < text.length; i++) {
      const char = text[i]!;
      const normChar = normalizeSearchText(char);
      // Se for caractere alfanumérico não-vazio
      if (normChar && normChar !== " ") {
        if (currentStripped === stripIdx && matchStart === -1) {
          matchStart = i;
        }
        currentStripped++;
        if (currentStripped === stripIdx + stripQ.length) {
          matchEnd = i + 1;
          break;
        }
      }
    }

    if (matchStart !== -1 && matchEnd !== -1) {
      const before = text.slice(0, matchStart);
      const match = text.slice(matchStart, matchEnd);
      const after = text.slice(matchEnd);

      return (
        <span className="truncate">
          {before && <span className="text-stone-400 font-normal">{before}</span>}
          <span className="font-bold text-amber-300">{match}</span>
          {after && <span className="text-stone-400 font-normal">{after}</span>}
        </span>
      );
    }
  }

  // 3. Fallback: destaca a primeira palavra coincidente
  const words = normalizeSearchText(trimmed).split(" ").filter(Boolean);
  for (const word of words) {
    const wIdx = lowerText.indexOf(word);
    if (wIdx !== -1) {
      const before = text.slice(0, wIdx);
      const match = text.slice(wIdx, wIdx + word.length);
      const after = text.slice(wIdx + word.length);
      return (
        <span className="truncate">
          {before && <span className="text-stone-400 font-normal">{before}</span>}
          <span className="font-bold text-amber-300">{match}</span>
          {after && <span className="text-stone-400 font-normal">{after}</span>}
        </span>
      );
    }
  }

  return <span className="text-stone-300 font-normal">{text}</span>;
    }
          
