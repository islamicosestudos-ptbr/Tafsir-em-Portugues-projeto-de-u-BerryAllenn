// FP-20261029-TAFSIR-7867495988FE · wz:71da7b0a · WAZLA / u/BerryAllenn
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  BookMarked,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Compass,
  Flame,
  Heart,
  Home,
  Handshake,
  Landmark,
  Leaf,
  Lightbulb,
  Moon,
  RefreshCw,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  UserRound,
  Users,
  Wallet,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ALL_SURAHS } from "../data/quranSurahs";
import {
  QURAN_PASSAGES_BY_ID,
  QURAN_THEME_CATEGORIES,
  QURAN_THEME_CATEGORIES_BY_ID,
  QURAN_THEMES,
} from "../data/tafsirThemes";
import type { QuranTheme, AppTheme } from "../types/quran";

interface ThematicExplorerProps {
  onJumpToVerse: (surahNumber: number, ayahNumber: number) => void;
  onOpenTafsirForRef: (surahNumber: number, ayahNumber: number) => void;
  theme?: AppTheme;
}

type SortMode = "featured" | "recent" | "alphabetical" | "saved";
type ThemeProgress = Record<string, { studiedPassageIds: string[]; updatedAt: string }>;
interface ExplorerViewState {
  query: string;
  categoryId: string;
  sortMode: SortMode;
  selectedThemeId: string | null;
  showAllThemes: boolean;
}

const CATEGORY_ACCESS_PREFERENCE_KEY = "quran_thematic_category_access_v1";
const CATEGORY_ACCESS_CHANGE_EVENT = "quran-thematic-category-access-change";

const STORAGE_KEYS = {
  savedThemes: "quran_thematic_saved_themes_v1",
  progress: "quran_thematic_progress_v1",
  view: "quran_thematic_view_v1",
  scroll: "quran_thematic_scroll_v1",
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  House: Home,
  Hourglass: Clock3,
  Sun,
  Heart,
  BookOpen,
  Moon,
  Scale,
  Users,
  Home,
  ShieldCheck,
  RefreshCw,
  Wallet,
  UserRound,
  Leaf,
  Landmark,
  Handshake,
  Clock3,
  Flame,
  Lightbulb,
  Sparkles,
};

const DEFAULT_VIEW_STATE: ExplorerViewState = {
  query: "",
  categoryId: "all",
  sortMode: "featured",
  selectedThemeId: null,
  showAllThemes: false,
};

function safeRead<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable or full; the current session remains usable.
  }
}

function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f\u064b-\u065f\u0670\u06d6-\u06ed]/g, "")
    .replace(/[–—]/g, "-")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function formatPassageReference(reference: string): string {
  return reference.replace(/-/g, "–");
}

function getThemeProgress(theme: QuranTheme, progress: ThemeProgress): number {
  const studied = progress[theme.id]?.studiedPassageIds ?? [];
  if (theme.passageIds.length === 0) return 0;
  return Math.min(
    100,
    Math.round(
      (studied.filter((id) => theme.passageIds.includes(id)).length / theme.passageIds.length) *
        100,
    ),
  );
}

function getThemeStudiedCount(theme: QuranTheme, progress: ThemeProgress): number {
  const studied = progress[theme.id]?.studiedPassageIds ?? [];
  return studied.filter((id) => theme.passageIds.includes(id)).length;
}

function CategoryIcon({
  iconName,
  className = "h-4 w-4",
}: {
  iconName: string;
  className?: string;
}) {
  const Icon = CATEGORY_ICONS[iconName] ?? BookOpen;
  return <Icon aria-hidden="true" className={className} strokeWidth={1.7} />;
}

function ThemeCard({
  theme,
  onOpen,
  onToggleSaved,
  isSaved,
  progress,
  compact = false,
}: {
  theme: QuranTheme;
  onOpen: (themeId: string) => void;
  onToggleSaved: (themeId: string) => void;
  isSaved: boolean;
  progress: ThemeProgress;
  compact?: boolean;
}) {
  const category = QURAN_THEME_CATEGORIES_BY_ID[theme.categoryId];
  const studiedCount = getThemeStudiedCount(theme, progress);
  const progressPercent = getThemeProgress(theme, progress);
  const passageCount = theme.passageIds.filter((id) => Boolean(QURAN_PASSAGES_BY_ID[id])).length;

  return (
    <article className="group flex h-full min-w-0 flex-col rounded-2xl border border-stone-200/90 bg-white/90 p-4 shadow-[0_2px_10px_rgba(51,40,20,0.035)] transition-all hover:-translate-y-0.5 hover:border-amber-700/40 hover:shadow-[0_8px_24px_rgba(51,40,20,0.07)] dark:border-slate-800 dark:bg-[#121924]">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-amber-900 dark:text-amber-300">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-800 dark:bg-amber-400/10 dark:text-amber-300">
            <CategoryIcon iconName={category?.iconName ?? "BookOpen"} className="h-4 w-4" />
          </span>
          <span className="truncate">{category?.title ?? "Estudo temático"}</span>
        </div>
        <button
          type="button"
          onClick={() => onToggleSaved(theme.id)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-stone-500 transition-all duration-150 hover:bg-amber-50 hover:text-amber-900 active:scale-80 active:bg-amber-100 active:rotate-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 dark:text-slate-400 dark:hover:bg-amber-400/10 dark:hover:text-amber-200 dark:active:bg-amber-400/20 cursor-pointer"
          aria-label={isSaved ? `Remover ${theme.title} dos temas salvos` : `Salvar ${theme.title}`}
          title={isSaved ? "Remover dos salvos" : "Salvar tema"}
          aria-pressed={isSaved}
        >
          {isSaved ? <BookmarkCheck className="h-4 w-4 text-amber-700 dark:text-amber-400" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>

      <button
        type="button"
        onClick={() => onOpen(theme.id)}
        className="mt-3 flex flex-1 flex-col text-left transition-all duration-150 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#121924] cursor-pointer"
      >
        <h3 className="font-display text-base font-semibold leading-snug text-stone-900 transition-colors group-hover:text-amber-950 dark:text-slate-100 dark:group-hover:text-amber-200">
          {theme.title}
        </h3>
        <p
          className={`mt-2 font-editorial text-sm leading-relaxed text-stone-600 dark:text-slate-300 ${compact ? "line-clamp-2" : "line-clamp-3"}`}
        >
          {theme.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-stone-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            {passageCount} {passageCount === 1 ? "passagem" : "passagens"}
          </span>
          {studiedCount > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
              {studiedCount}/{passageCount} estudadas
            </span>
          )}
        </div>
        {studiedCount > 0 && (
          <div
            className="mt-2 h-1 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-slate-800"
            aria-label={`${progressPercent}% concluído`}
          >
            <div
              className="h-full rounded-full bg-amber-700 transition-all dark:bg-amber-400"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </button>

      <button
        type="button"
        onClick={() => onOpen(theme.id)}
        className="mt-4 flex min-h-10 items-center justify-between border-t border-stone-100 pt-3 text-xs font-semibold text-amber-950 transition-all duration-150 hover:text-amber-700 active:scale-95 active:text-amber-800 dark:border-slate-800 dark:text-amber-200 dark:hover:text-amber-100 cursor-pointer"
      >
        <span>{studiedCount > 0 ? "Continuar estudo" : "Abrir estudo"}</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-active:translate-x-1.5" />
      </button>
    </article>
  );
}

export const ThematicExplorer = ({
  onJumpToVerse,
  onOpenTafsirForRef,
  theme = "paper",
}: ThematicExplorerProps) => {
  const [viewState, setViewState] = useState<ExplorerViewState>(() => {
    const stored = safeRead<Partial<ExplorerViewState>>(STORAGE_KEYS.view, {});
    const validCategory =
      stored.categoryId === "all" ||
      QURAN_THEME_CATEGORIES.some((item) => item.id === stored.categoryId);
    const validSort =
      stored.sortMode === "featured" ||
      stored.sortMode === "recent" ||
      stored.sortMode === "alphabetical" ||
      stored.sortMode === "saved";
    const validTheme =
      stored.selectedThemeId && QURAN_THEMES.some((theme) => theme.id === stored.selectedThemeId)
        ? stored.selectedThemeId
        : null;
    return {
      ...DEFAULT_VIEW_STATE,
      ...stored,
      categoryId: validCategory ? (stored.categoryId ?? "all") : "all",
      sortMode: validSort ? (stored.sortMode ?? "featured") : "featured",
      selectedThemeId: validTheme,
    };
  });
  const [savedThemeIds, setSavedThemeIds] = useState<string[]>(() =>
    safeRead<string[]>(STORAGE_KEYS.savedThemes, []),
  );
  const [progress, setProgress] = useState<ThemeProgress>(() =>
    safeRead<ThemeProgress>(STORAGE_KEYS.progress, {}),
  );
  const [visibleCount, setVisibleCount] = useState(8);
  const [showCategoryAccess, setShowCategoryAccess] = useState(() =>
    safeRead<boolean>(CATEGORY_ACCESS_PREFERENCE_KEY, false),
  );
  const [copiedPassageId, setCopiedPassageId] = useState<string | null>(null);

  const { query, categoryId, sortMode, selectedThemeId, showAllThemes } = viewState;
  const selectedTheme = QURAN_THEMES.find((theme) => theme.id === selectedThemeId) ?? null;
  const continueThemes = useMemo(
    () =>
      QURAN_THEMES.filter((theme) => getThemeStudiedCount(theme, progress) > 0).sort((a, b) =>
        (progress[b.id]?.updatedAt ?? "").localeCompare(progress[a.id]?.updatedAt ?? ""),
      ),
    [progress],
  );
  const editorialThemes = useMemo(
    () => QURAN_THEMES.filter((theme) => theme.editorialFeatured).slice(0, 8),
    [],
  );

  const filteredThemes = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    const numericQuery = /^(?:surata\s*)?(\d{1,3})(?::(\d{1,3})(?:-(\d{1,3}))?)?$/.exec(
      normalizedQuery,
    );

    let matches = QURAN_THEMES.filter((theme) => {
      if (categoryId !== "all" && theme.categoryId !== categoryId) return false;
      if (sortMode === "saved" && !savedThemeIds.includes(theme.id)) return false;
      if (!normalizedQuery) return true;

      const category = QURAN_THEME_CATEGORIES_BY_ID[theme.categoryId];
      const searchableText = normalizeSearch(
        [
          theme.title,
          theme.description,
          theme.introduction,
          ...theme.keywords,
          category?.title ?? "",
        ].join(" "),
      );
      const textMatch = searchableText.includes(normalizedQuery);
      const passageMatch = theme.passageIds.some((reference) => {
        const passage = QURAN_PASSAGES_BY_ID[reference];
        if (!passage) return false;
        const surah = ALL_SURAHS.find((item) => item.number === passage.surahNumber);
        const surahText = normalizeSearch(
          `${surah?.transliteration ?? ""} ${surah?.portugueseName ?? ""} ${surah?.name ?? ""}`,
        );
        if (numericQuery) {
          const [, surahNumber, ayahNumber, endAyah] = numericQuery;
          if (passage.surahNumber !== Number(surahNumber)) return false;
          if (!ayahNumber) return true;
          const requestedAyah = Number(ayahNumber);
          const requestedEnd = endAyah ? Number(endAyah) : requestedAyah;
          const passageEnd = passage.endAyah ?? passage.startAyah;
          return requestedAyah <= passageEnd && requestedEnd >= passage.startAyah;
        }
        const compactQuery = normalizedQuery.replace(/^surata\s+/, "").replace(/[\s-]/g, "");
        const compactSurahText = surahText.replace(/[\s-]/g, "");
        return reference.includes(normalizedQuery) || compactSurahText.includes(compactQuery);
      });
      return textMatch || passageMatch;
    });

    if (sortMode === "recent") matches = matches.sort((a, b) => b.addedOrder - a.addedOrder);
    else if (sortMode === "alphabetical")
      matches = matches.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    else if (sortMode === "featured")
      matches = matches.sort(
        (a, b) =>
          Number(Boolean(b.editorialFeatured)) - Number(Boolean(a.editorialFeatured)) ||
          a.addedOrder - b.addedOrder,
      );
    else if (sortMode === "saved")
      matches = matches.sort((a, b) => savedThemeIds.indexOf(a.id) - savedThemeIds.indexOf(b.id));

    return matches;
  }, [categoryId, query, savedThemeIds, sortMode]);

  useEffect(() => {
    safeWrite(STORAGE_KEYS.view, viewState);
  }, [viewState]);
  useEffect(() => {
    safeWrite(STORAGE_KEYS.savedThemes, savedThemeIds);
  }, [savedThemeIds]);
  useEffect(() => {
    safeWrite(STORAGE_KEYS.progress, progress);
  }, [progress]);

  useEffect(() => {
    const handleCategoryAccessChange = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      setShowCategoryAccess(Boolean(customEvent.detail));
    };
    window.addEventListener(CATEGORY_ACCESS_CHANGE_EVENT, handleCategoryAccessChange);
    return () =>
      window.removeEventListener(CATEGORY_ACCESS_CHANGE_EVENT, handleCategoryAccessChange);
  }, []);

  useEffect(() => {
    let storedScroll = 0;
    try {
      storedScroll = Number(window.sessionStorage.getItem(STORAGE_KEYS.scroll) ?? 0);
    } catch {
      // Some browser privacy modes disable sessionStorage.
    }
    if (storedScroll > 0) {
      window.requestAnimationFrame(() => window.scrollTo({ top: storedScroll, behavior: "auto" }));
    }
    const saveScroll = () => {
      try {
        window.sessionStorage.setItem(STORAGE_KEYS.scroll, String(window.scrollY));
      } catch {
        // Scroll restoration is an enhancement; it must not block navigation.
      }
    };
    window.addEventListener("scroll", saveScroll, { passive: true });
    return () => window.removeEventListener("scroll", saveScroll);
  }, []);

  useEffect(() => {
    setVisibleCount(showAllThemes ? filteredThemes.length : 8);
  }, [categoryId, query, sortMode, showAllThemes, filteredThemes.length]);

  const updateViewState = (changes: Partial<ExplorerViewState>) => {
    setViewState((current) => ({ ...current, ...changes }));
  };

  const toggleSavedTheme = (themeId: string) => {
    setSavedThemeIds((current) =>
      current.includes(themeId) ? current.filter((id) => id !== themeId) : [themeId, ...current],
    );
  };

  const togglePassageStudied = (theme: QuranTheme, passageId: string) => {
    setProgress((current) => {
      const existing = current[theme.id]?.studiedPassageIds ?? [];
      const studiedPassageIds = existing.includes(passageId)
        ? existing.filter((id) => id !== passageId)
        : [...existing, passageId];
      const next = { ...current };
      if (studiedPassageIds.length === 0) delete next[theme.id];
      else next[theme.id] = { studiedPassageIds, updatedAt: new Date().toISOString() };
      return next;
    });
  };

  const openTheme = (themeId: string) => {
    updateViewState({ selectedThemeId: themeId });
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };
  const openCategory = (id: string) => {
    updateViewState({ categoryId: id, selectedThemeId: null, showAllThemes: true });
    window.requestAnimationFrame(() => {
      document
        .getElementById("thematic-all-themes")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const renderThemeCard = (theme: QuranTheme, compact = false) => (
    <ThemeCard
      key={theme.id}
      theme={theme}
      onOpen={openTheme}
      onToggleSaved={toggleSavedTheme}
      isSaved={savedThemeIds.includes(theme.id)}
      progress={progress}
      compact={compact}
    />
  );

  if (selectedTheme) {
    const category = QURAN_THEME_CATEGORIES_BY_ID[selectedTheme.categoryId];
    const studiedIds = progress[selectedTheme.id]?.studiedPassageIds ?? [];
    const studiedCount = getThemeStudiedCount(selectedTheme, progress);
    const completion = getThemeProgress(selectedTheme, progress);
    const relatedThemes = QURAN_THEMES.filter(
      (theme) => theme.categoryId === selectedTheme.categoryId && theme.id !== selectedTheme.id,
    ).slice(0, 3);

    return (
      <div className="thematic-explorer mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <button
          type="button"
          onClick={() => updateViewState({ selectedThemeId: null })}
          className="mb-5 inline-flex min-h-10 items-center gap-2 rounded-full border border-stone-200 bg-white/75 px-4 text-xs font-semibold text-stone-700 transition-all duration-150 hover:border-amber-700/50 hover:text-amber-950 hover:bg-amber-50/40 active:scale-95 active:bg-amber-100/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 dark:border-slate-800 dark:bg-[#121924] dark:text-slate-200 dark:hover:text-amber-200 dark:active:bg-slate-800 cursor-pointer shadow-2xs hover:shadow-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" /> Voltar à biblioteca
        </button>

        <header className="overflow-hidden rounded-3xl border border-stone-200/90 bg-white/90 shadow-[0_4px_22px_rgba(51,40,20,0.045)] dark:border-slate-800 dark:bg-[#121924]">
          <div className="h-1 bg-gradient-to-r from-amber-900 via-amber-600 to-amber-200 dark:from-amber-700 dark:via-amber-400 dark:to-amber-200" />
          <div className="p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-900 dark:text-amber-300">
              <CategoryIcon iconName={category?.iconName ?? "BookOpen"} />
              <span>{category?.title}</span>
              <span className="text-stone-300 dark:text-slate-600">/</span>
              <span>Estudo temático</span>
            </div>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 max-w-3xl">
                <h1 className="font-display text-2xl font-semibold leading-tight text-stone-900 sm:text-3xl dark:text-slate-100">
                  {selectedTheme.title}
                </h1>
                <p className="mt-3 font-editorial text-base leading-relaxed text-stone-700 dark:text-slate-300">
                  {selectedTheme.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleSavedTheme(selectedTheme.id)}
                className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-amber-800/30 bg-amber-50/70 px-4 text-xs font-semibold text-amber-950 transition-all duration-150 hover:bg-amber-100 active:scale-90 active:bg-amber-200/60 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200 dark:hover:bg-amber-400/15 dark:active:bg-amber-400/25 cursor-pointer shadow-2xs hover:shadow-xs"
                aria-pressed={savedThemeIds.includes(selectedTheme.id)}
              >
                {savedThemeIds.includes(selectedTheme.id) ? (
                  <BookmarkCheck className="h-4 w-4 text-amber-800 dark:text-amber-300" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
                {savedThemeIds.includes(selectedTheme.id) ? "Tema salvo" : "Salvar tema"}
              </button>
            </div>
            <div className="mt-6 rounded-2xl border border-amber-900/10 bg-[#fbf8f1] p-4 sm:p-5 dark:border-slate-700 dark:bg-slate-900/50">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-950 dark:text-amber-200">
                <BookMarked className="h-4 w-4" /> Introdução editorial
              </div>
              <p className="mt-2 font-editorial text-sm leading-[1.85] text-stone-700 dark:text-slate-300">
                {selectedTheme.introduction}
              </p>
            </div>
          </div>
        </header>

        <section
          className="mt-5 rounded-2xl border border-stone-200/90 bg-white/80 p-4 dark:border-slate-800 dark:bg-[#121924]"
          aria-label="Progresso do estudo"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-stone-800 dark:text-slate-100">
                Progresso deste estudo
              </p>
              <p className="mt-1 text-[11px] text-stone-500 dark:text-slate-400">
                {studiedCount} de {selectedTheme.passageIds.length} passagens marcadas como
                estudadas
              </p>
            </div>
            <span className="font-display text-lg font-semibold tabular-nums text-amber-900 dark:text-amber-300">
              {completion}%
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-amber-700 transition-all dark:bg-amber-400"
              style={{ width: `${completion}%` }}
            />
          </div>
        </section>

        <section className="mt-7" aria-labelledby="thematic-passages-heading">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-900 dark:text-amber-300">
                Leitura guiada
              </p>
              <h2
                id="thematic-passages-heading"
                className="mt-1 font-display text-xl font-semibold text-stone-900 dark:text-slate-100"
              >
                Passagens corânicas
              </h2>
            </div>
            <p className="text-xs text-stone-500 dark:text-slate-400">
              {selectedTheme.passageIds.length} referências selecionadas
            </p>
          </div>

          <div className="space-y-3">
            {selectedTheme.passageIds.map((passageId) => {
              const passage = QURAN_PASSAGES_BY_ID[passageId];
              if (!passage) return null;
              const surah = ALL_SURAHS.find((item) => item.number === passage.surahNumber);
              const isStudied = studiedIds.includes(passage.id);
              return (
                <article
                  key={passage.id}
                  className={`rounded-2xl border bg-white/90 p-4 transition-colors dark:bg-[#121924] ${isStudied ? "border-amber-700/40 dark:border-amber-400/30" : "border-stone-200/90 dark:border-slate-800"}`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-amber-50 px-2.5 py-1 font-mono text-xs font-semibold text-amber-950 dark:bg-amber-400/10 dark:text-amber-200">
                          {formatPassageReference(passage.id)}
                        </span>
                        <span className="text-xs font-medium text-stone-700 dark:text-slate-200">
                          {surah?.transliteration ?? `Surata ${passage.surahNumber}`}
                        </span>
                        {surah?.portugueseName && (
                          <span className="text-[11px] text-stone-400 dark:text-slate-500">
                            · {surah.portugueseName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const refText = `Passagem Corânica: Surata ${surah?.transliteration ?? passage.surahNumber} (${passage.id}) — Tema: ${selectedTheme.title}`;
                          navigator.clipboard.writeText(refText);
                          setCopiedPassageId(passage.id);
                          setTimeout(() => setCopiedPassageId(null), 2000);
                        }}
                        title="Copiar referência desta passagem"
                        className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white/70 px-3 text-xs font-semibold text-stone-700 transition-all duration-150 hover:bg-amber-50 hover:text-amber-900 active:scale-90 active:bg-amber-100 dark:border-slate-700 dark:bg-[#121924] dark:text-slate-300 dark:hover:bg-amber-400/10 dark:hover:text-amber-200 cursor-pointer shadow-2xs"
                      >
                        {copiedPassageId === passage.id ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-700 dark:text-emerald-400">Copiada</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="h-3.5 w-3.5 opacity-60" />
                            <span>Copiar ref</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => onJumpToVerse(passage.surahNumber, passage.startAyah)}
                        className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-amber-900 px-3.5 text-xs font-semibold text-amber-50 transition-all duration-150 hover:bg-amber-800 active:scale-95 active:bg-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 dark:bg-amber-700 dark:hover:bg-amber-600 dark:active:bg-amber-800 cursor-pointer shadow-xs"
                      >
                        <BookOpen className="h-3.5 w-3.5" /> Ler na surata
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenTafsirForRef(passage.surahNumber, passage.startAyah)}
                        className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white/80 px-3.5 text-xs font-semibold text-stone-700 transition-all duration-150 hover:border-amber-700/50 hover:text-amber-950 hover:bg-white active:scale-95 active:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 dark:border-slate-700 dark:bg-[#121924] dark:text-slate-200 dark:hover:text-amber-200 dark:active:bg-slate-800 cursor-pointer shadow-2xs"
                      >
                        <BookMarked className="h-3.5 w-3.5" /> Abrir tafsir
                      </button>
                      <button
                        type="button"
                        onClick={() => togglePassageStudied(selectedTheme, passage.id)}
                        className={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 cursor-pointer shadow-xs ${isStudied ? "border-emerald-700 bg-emerald-700 text-white shadow-sm hover:bg-emerald-800 active:bg-emerald-900 dark:border-emerald-500 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500" : "border-transparent bg-stone-100 text-stone-700 hover:bg-stone-200 active:bg-stone-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-900"}`}
                        aria-pressed={isStudied}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />{" "}
                        {isStudied ? "Estudada" : "Marcar estudada"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {selectedTheme.reflectionQuestion && (
          <section className="mt-5 rounded-2xl border border-amber-800/15 bg-amber-50/60 p-4 dark:border-amber-400/15 dark:bg-amber-400/5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-900 dark:text-amber-300">
              Pergunta para reflexão
            </p>
            <p className="mt-2 font-editorial text-sm leading-relaxed text-stone-800 dark:text-slate-200">
              {selectedTheme.reflectionQuestion}
            </p>
          </section>
        )}

        {relatedThemes.length > 0 && (
          <section className="mt-8">
            <div className="mb-4 flex items-end justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-900 dark:text-amber-300">
                  Próximos passos
                </p>
                <h2 className="mt-1 font-display text-lg font-semibold text-stone-900 dark:text-slate-100">
                  Continue nesta categoria
                </h2>
              </div>
              <button
                type="button"
                onClick={() => openCategory(selectedTheme.categoryId)}
                className="text-xs font-semibold text-amber-900 hover:underline dark:text-amber-200"
              >
                Ver categoria
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedThemes.map((theme) => renderThemeCard(theme, true))}
            </div>
          </section>
        )}
      </div>
    );
  }

  const isSearching = query.trim().length > 0;
  const visibleThemes = filteredThemes.slice(0, visibleCount);
  const hasMoreThemes = filteredThemes.length > visibleThemes.length;
  const showSavedEmptyState = sortMode === "saved" && filteredThemes.length === 0;

  return (
    <div className="thematic-explorer mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
      <header className="mb-5 border-b border-stone-200/90 pb-5 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-amber-900 dark:text-amber-300">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-400/10">
            <Compass className="h-4 w-4" />
          </span>
          Biblioteca de estudos
          <span className="text-stone-300 dark:text-slate-600">·</span>
          {QURAN_THEME_CATEGORIES.length} categorias
          <span className="text-stone-300 dark:text-slate-600">·</span>
          {QURAN_THEMES.length} temas
        </div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-3xl">
            <h1 className="font-display text-2xl font-semibold leading-tight text-stone-900 sm:text-3xl dark:text-slate-100">
              Índice Temático &amp; Estudos do Alcorão
            </h1>
            <p className="mt-2 max-w-2xl font-editorial text-sm leading-relaxed text-stone-600 dark:text-slate-300">
              Biblioteca de passagens para estudar o Alcorão com exegese temática e reflexões guiadas.
            </p>
          </div>
          <div className="rounded-xl border border-amber-900/15 bg-amber-50/60 px-3 py-2 text-right dark:border-amber-400/15 dark:bg-amber-400/5 shadow-2xs">
            <p className="font-display text-lg font-semibold tabular-nums text-amber-950 dark:text-amber-200">
              {QURAN_THEMES.length}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-stone-500 dark:text-slate-400">
              temas disponíveis
            </p>
          </div>
        </div>

        <div className="relative mt-5 max-w-3xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-slate-500" />
          <input
            type="text"
            inputMode="search"
            value={query}
            onChange={(event) =>
              updateViewState({ query: event.target.value, showAllThemes: true })
            }
            placeholder="Pesquisar tema, palavra-chave, surata ou referência (ex.: 2:255)"
            aria-label="Pesquisar temas, palavras-chave, suratas ou referências corânicas"
            className="min-h-12 w-full rounded-2xl border border-stone-200 bg-white/90 py-3 pl-11 pr-11 text-sm text-stone-900 shadow-sm outline-none transition-colors placeholder:text-stone-400 focus:border-amber-700/60 focus:ring-2 focus:ring-amber-700/10 dark:border-slate-700 dark:bg-[#121924] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-amber-400/50 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => updateViewState({ query: "" })}
              aria-label="Limpar pesquisa"
              className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-800 active:scale-80 active:bg-amber-100 dark:hover:bg-slate-800 dark:hover:text-white dark:active:bg-slate-700 transition-all duration-150 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      {showCategoryAccess && (
        <nav className="mb-6" aria-label="Acesso por categoria">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-500 dark:text-slate-400">
              Acesso por categoria ({QURAN_THEME_CATEGORIES.length})
            </h2>
            <span className="text-[10px] text-stone-400 dark:text-slate-500">
              Deslize para explorar
            </span>
          </div>
          <div
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            style={{ scrollbarWidth: "thin" }}
          >
            <button
              type="button"
              onClick={() => openCategory("all")}
              aria-pressed={categoryId === "all"}
              className={`min-h-10 shrink-0 rounded-full border px-4 text-xs font-semibold transition-all duration-150 active:scale-95 active:ring-2 active:ring-amber-500/40 cursor-pointer shadow-2xs ${categoryId === "all" ? "border-amber-900 bg-amber-900 text-white dark:border-amber-600 dark:bg-amber-700 shadow-xs" : "border-stone-200 bg-white/80 text-stone-700 hover:border-amber-700/40 hover:bg-white dark:border-slate-700 dark:bg-[#121924] dark:text-slate-200"}`}
            >
              Todos os temas
            </button>
            {QURAN_THEME_CATEGORIES.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => openCategory(category.id)}
                aria-pressed={categoryId === category.id}
                className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition-all duration-150 active:scale-95 active:ring-2 active:ring-amber-500/40 cursor-pointer shadow-2xs ${categoryId === category.id ? "border-amber-900 bg-amber-900 text-white dark:border-amber-600 dark:bg-amber-700 shadow-xs" : "border-stone-200 bg-white/80 text-stone-700 hover:border-amber-700/40 hover:bg-white dark:border-slate-700 dark:bg-[#121924] dark:text-slate-200"}`}
              >
                <CategoryIcon iconName={category.iconName} className="h-3.5 w-3.5" />
                {category.title}
              </button>
            ))}
          </div>
        </nav>
      )}

      {!isSearching && continueThemes.length > 0 && (
        <section className="mb-7" aria-labelledby="continue-studying-heading">
          <div className="mb-3 flex items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-900 dark:text-amber-300">
                Seu percurso
              </p>
              <h2
                id="continue-studying-heading"
                className="mt-1 font-display text-lg font-semibold text-stone-900 dark:text-slate-100"
              >
                Continuar estudando
              </h2>
            </div>
            <span className="text-[10px] text-stone-500 dark:text-slate-400">
              Com base no seu progresso
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {continueThemes.slice(0, 3).map((theme) => renderThemeCard(theme, true))}
          </div>
        </section>
      )}

      {!isSearching && (
        <>
          <section className="mb-7" aria-labelledby="explore-categories-heading">
            <div className="mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-900 dark:text-amber-300">
                Organização do conteúdo
              </p>
              <h2
                id="explore-categories-heading"
                className="mt-1 font-display text-lg font-semibold text-stone-900 dark:text-slate-100"
              >
                Explorar categorias
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {QURAN_THEME_CATEGORIES.map((category) => {
                const count = QURAN_THEMES.filter(
                  (theme) => theme.categoryId === category.id,
                ).length;
                return (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() => openCategory(category.id)}
                    className={`group flex min-h-[108px] min-w-0 flex-col items-start rounded-2xl border p-3.5 text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-amber-700/50 hover:bg-white active:scale-[0.97] active:border-amber-700/70 active:bg-amber-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 dark:hover:bg-[#121924] dark:active:bg-amber-400/10 cursor-pointer shadow-2xs hover:shadow-md ${categoryId === category.id ? "border-amber-700/70 bg-white ring-2 ring-amber-700/20 dark:border-amber-400/50 dark:bg-[#121924] dark:ring-amber-400/20" : "border-stone-200/90 bg-white/65 dark:border-slate-800 dark:bg-[#121924]/60"}`}
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-50 text-amber-900 dark:bg-amber-400/10 dark:text-amber-300 transition-transform duration-200 group-hover:scale-110 group-active:scale-95 shadow-2xs">
                      <CategoryIcon iconName={category.iconName} className="h-4 w-4" />
                    </span>
                    <span className="mt-2 line-clamp-2 text-xs font-semibold leading-snug text-stone-800 transition-colors group-hover:text-amber-950 dark:text-slate-100 dark:group-hover:text-amber-200">
                      {category.title}
                    </span>
                    <span className="mt-auto pt-1 text-[10px] text-stone-500 dark:text-slate-400 font-medium">
                      {count} temas
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mb-7" aria-labelledby="popular-themes-heading">
            <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-900 dark:text-amber-300">
                  Curadoria inicial
                </p>
                <h2
                  id="popular-themes-heading"
                  className="mt-1 font-display text-lg font-semibold text-stone-900 dark:text-slate-100"
                >
                  Temas populares
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {editorialThemes.slice(0, 4).map((theme) => renderThemeCard(theme, true))}
            </div>
          </section>
        </>
      )}

      <section
        id="thematic-all-themes"
        className="scroll-mt-5"
        aria-labelledby="all-themes-heading"
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-900 dark:text-amber-300">
              Tema selecionado
            </p>
            <h2
              id="all-themes-heading"
              className="mt-1 font-display text-xl font-semibold text-stone-900 dark:text-slate-100"
            >
              {isSearching
                ? "Resultados da pesquisa"
                : categoryId === "all"
                  ? "Todos os temas"
                  : QURAN_THEME_CATEGORIES_BY_ID[categoryId]?.title}
            </h2>
            <p className="mt-1 text-xs text-stone-500 dark:text-slate-400">
              {filteredThemes.length}{" "}
              {filteredThemes.length === 1 ? "tema encontrado" : "temas encontrados"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="thematic-sort" className="sr-only">
              Ordenar temas
            </label>
            <select
              id="thematic-sort"
              value={sortMode}
              onChange={(event) =>
                updateViewState({ sortMode: event.target.value as SortMode, showAllThemes: true })
              }
              className="min-h-10 max-w-full rounded-xl border border-stone-200 bg-white px-3 text-xs font-medium text-stone-700 outline-none focus:border-amber-700/60 focus:ring-2 focus:ring-amber-700/10 dark:border-slate-700 dark:bg-[#121924] dark:text-slate-200"
            >
              <option value="featured">Seleção editorial</option>
              <option value="recent">Mais recentes</option>
              <option value="alphabetical">Ordem alfabética</option>
              <option value="saved">Temas salvos</option>
            </select>
            {(categoryId !== "all" || sortMode === "saved" || query) && (
              <button
                type="button"
                onClick={() =>
                  updateViewState({
                    categoryId: "all",
                    sortMode: "featured",
                    query: "",
                    showAllThemes: false,
                  })
                }
                className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 text-xs font-semibold text-stone-600 transition-all duration-150 hover:bg-stone-50 active:scale-95 active:bg-stone-100 dark:border-slate-700 dark:bg-[#121924] dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700 cursor-pointer shadow-2xs"
              >
                <X className="h-3.5 w-3.5" /> Limpar filtros
              </button>
            )}
          </div>
        </div>

        {showSavedEmptyState ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 px-5 py-10 text-center dark:border-slate-700 dark:bg-[#121924]/60">
            <Bookmark className="mx-auto h-6 w-6 text-stone-400 dark:text-slate-500" />
            <p className="mt-3 font-display text-base font-semibold text-stone-800 dark:text-slate-100">
              Nenhum tema salvo ainda
            </p>
            <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-stone-500 dark:text-slate-400">
              Use o marcador nos cartões para guardar temas e encontrá-los aqui.
            </p>
          </div>
        ) : filteredThemes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 px-5 py-10 text-center dark:border-slate-700 dark:bg-[#121924]/60">
            <Search className="mx-auto h-6 w-6 text-stone-400 dark:text-slate-500" />
            <p className="mt-3 font-display text-base font-semibold text-stone-800 dark:text-slate-100">
              Nenhum tema encontrado
            </p>
            <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-stone-500 dark:text-slate-400">
              Tente outra palavra, o nome de uma surata ou uma referência como 2:255.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {visibleThemes.map((theme) => renderThemeCard(theme))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {hasMoreThemes && (
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((count) => Math.min(count + 12, filteredThemes.length))
                  }
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-300 bg-white px-5 text-xs font-semibold text-stone-700 transition-all duration-150 hover:border-amber-700/50 hover:text-amber-950 active:scale-95 active:bg-stone-50 dark:border-slate-700 dark:bg-[#121924] dark:text-slate-200 dark:hover:text-amber-200 dark:active:bg-slate-800 cursor-pointer shadow-xs hover:shadow-sm"
                >
                  Carregar mais temas <ChevronRight className="h-3.5 w-3.5" />
                </button>
              )}
              {!showAllThemes && filteredThemes.length > 8 && (
                <button
                  type="button"
                  onClick={() => {
                    updateViewState({ showAllThemes: true });
                    setVisibleCount(filteredThemes.length);
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-amber-900 px-5 text-xs font-semibold text-white transition-all duration-150 hover:bg-amber-800 active:scale-95 active:bg-amber-950 dark:bg-amber-700 dark:hover:bg-amber-600 dark:active:bg-amber-800 cursor-pointer shadow-xs hover:shadow-sm"
                >
                  Ver todos os temas <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
              {visibleCount >= filteredThemes.length && filteredThemes.length > 12 && (
                <button
                  type="button"
                  onClick={() => {
                    setVisibleCount(8);
                    updateViewState({ showAllThemes: false });
                    document
                      .getElementById("thematic-all-themes")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="min-h-11 rounded-full px-4 text-xs font-semibold text-stone-500 hover:text-stone-900 active:scale-95 transition-all duration-150 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                >
                  Mostrar menos
                </button>
              )}
            </div>
          </>
        )}
      </section>

      <footer className="mt-8 border-t border-stone-200/90 pt-4 text-center dark:border-slate-800">
        <p className="font-editorial text-[11px] leading-relaxed text-stone-500 dark:text-slate-400">
          As referências são organizadas para facilitar o estudo. Consulte o texto integral e o
          tafsir no aplicativo antes de tirar conclusões sobre uma passagem isolada.
        </p>
      </footer>
    </div>
  );
};
