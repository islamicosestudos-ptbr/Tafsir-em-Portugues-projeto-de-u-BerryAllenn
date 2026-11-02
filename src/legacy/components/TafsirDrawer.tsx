// FP-20261029-TAFSIR-7867495988FE · wz:b661c54c · WAZLA / u/BerryAllenn
import React, { useState, useEffect } from "react";
import { Ayah, SurahMeta, AppTheme } from "../types/quran";
import {
  fetchRealHelmiNasr,
  fetchRealIbnKathir,
  fetchRealAsbab,
  HelmiNasrResult,
  IbnKathirResult,
  AsbabResult,
} from "../services/realTafsirApi";
import { TafsirTextRenderer } from "./TafsirTextRenderer";
import { TranslatableTafsir } from "./TranslatableTafsir";
import { X, BookOpen, Copy, Check, History, BookMarked, Loader2, ExternalLink } from "lucide-react";

interface TafsirDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  surah: SurahMeta;
  ayah: Ayah | null;
  theme?: AppTheme;
}

export const TafsirDrawer: React.FC<TafsirDrawerProps> = ({
  isOpen,
  onClose,
  surah,
  ayah,
  theme = "paper",
}) => {
  const [selectedTab, setSelectedTab] = useState<"ibnKathir" | "helmiNasr" | "asbabNuzul">(
    "ibnKathir",
  );

  const isHighContrast = theme === "highContrast";
  const isDark = theme === "dark";

  // Real data state
  const [loadingReal, setLoadingReal] = useState<boolean>(false);
  const [helmiData, setHelmiData] = useState<HelmiNasrResult | null>(null);
  const [ibnKathirData, setIbnKathirData] = useState<IbnKathirResult | null>(null);
  const [asbabData, setAsbabData] = useState<AsbabResult | null>(null);

  // Texto atualmente visível em cada aba (original ou tradução) — usado pelo botão "Copiar"
  const [ibnKathirShown, setIbnKathirShown] = useState<string>("");
  const [asbabShown, setAsbabShown] = useState<string>("");

  const [copied, setCopied] = useState<boolean>(false);

  // Fetch real verified Tafsir data whenever ayah or surah changes
  useEffect(() => {
    if (!isOpen || !ayah) return;

    let isMounted = true;
    async function loadAllRealTafsir() {
      setLoadingReal(true);

      try {
        const [h, i, a] = await Promise.all([
          fetchRealHelmiNasr(surah.number, ayah!.numberInSurah),
          fetchRealIbnKathir(surah.number, ayah!.numberInSurah),
          fetchRealAsbab(surah.number, ayah!.numberInSurah),
        ]);

        if (isMounted) {
          setHelmiData(h);
          setIbnKathirData(i);
          setAsbabData(a);
        }
      } catch (err) {
        console.error("Erro ao buscar dados reais de Tafsir:", err);
      } finally {
        if (isMounted) setLoadingReal(false);
      }
    }

    loadAllRealTafsir();
    return () => {
      isMounted = false;
    };
  }, [isOpen, surah.number, ayah?.numberInSurah]);

  if (!isOpen || !ayah) return null;

  const handleCopyCurrentTafsir = () => {
    let textToCopy = "";
    let sourceName = "";

    if (selectedTab === "ibnKathir" && ibnKathirData) {
      sourceName = ibnKathirData.work || "Tafsir Ibn Kathir";
      textToCopy = ibnKathirShown || ibnKathirData.text;
    } else if (selectedTab === "helmiNasr" && helmiData) {
      sourceName = "Notas da Tradução de Helmi Nasr";
      textToCopy = helmiData.footnotes || helmiData.translation;
    } else if (selectedTab === "asbabNuzul" && asbabData) {
      sourceName = "Asbab al-Nuzul (Al-Wahidi)";
      textToCopy = asbabShown || asbabData.text;
    }

    const citation = `[Fonte: ${sourceName} — Surata ${surah.transliteration} (${surah.number}:${ayah.numberInSurah})]\n\n${textToCopy}\n\n— Alcorão Sagrado & Tafsir em Português`;

    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl lg:max-w-3xl h-[100dvh] max-h-[100dvh] shadow-2xl flex flex-col border-l overflow-hidden ${
          isHighContrast
            ? "bg-black text-white border-yellow-400 border-l-2"
            : isDark
              ? "bg-[#101722] text-slate-100 border-slate-800"
              : "bg-[#FBF9F5] text-stone-900 border-stone-200"
        }`}
      >
        {/* Header */}
        <div
          className={`p-5 sm:p-6 border-b flex items-center justify-between gap-4 shrink-0 shadow-2xs ${
            isHighContrast
              ? "bg-black border-yellow-400 text-white"
              : isDark
                ? "bg-[#162130] border-slate-800"
                : "bg-white border-stone-200"
          }`}
        >
          <div>
            <div
              className={`flex items-center gap-2 text-xs ${
                isHighContrast
                  ? "text-yellow-400 font-semibold"
                  : isDark
                    ? "text-slate-300"
                    : "text-stone-600"
              }`}
            >
              <span
                className={`font-semibold ${
                  isHighContrast ? "text-yellow-400" : isDark ? "text-amber-300" : "text-amber-950"
                }`}
              >
                Surata {surah.number}: {surah.transliteration}
              </span>
              <span
                aria-hidden="true"
                className={isHighContrast ? "text-yellow-400" : "text-stone-400"}
              >
                ·
              </span>
              <span>
                Versículo {ayah.numberInSurah} de {surah.totalAyahs}
              </span>
              <span
                aria-hidden="true"
                className={isHighContrast ? "text-yellow-400" : "text-stone-400"}
              >
                ·
              </span>
              <span>{surah.revelationType}</span>
            </div>
            <h2
              className={`text-xl sm:text-2xl font-display font-bold mt-1 ${
                isHighContrast ? "text-white" : isDark ? "text-slate-100" : "text-stone-900"
              }`}
            >
              Tafsir e fontes de referência
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCurrentTafsir}
              title="Copiar texto com citação da fonte"
              className={`p-2.5 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 text-xs font-medium border ${
                isHighContrast
                  ? "border-yellow-400 text-yellow-300 hover:bg-yellow-400/20"
                  : isDark
                    ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                    : "border-stone-200 text-stone-600 hover:bg-stone-100"
              }`}
            >
              {copied ? (
                <>
                  <Check
                    className={`w-4 h-4 ${isHighContrast ? "text-yellow-400" : "text-emerald-500"}`}
                  />
                  <span
                    className={`font-semibold hidden sm:inline ${
                      isHighContrast ? "text-yellow-400" : "text-emerald-500"
                    }`}
                  >
                    Copiado!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Copiar</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className={`p-2.5 rounded-xl transition-all active:scale-85 cursor-pointer ${
                isHighContrast
                  ? "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/20"
                  : isDark
                    ? "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                    : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
              }`}
              aria-label="Fechar painel de Tafsir"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs with explicit sources */}
        <div
          className={`border-b px-4 sm:px-6 pt-3 flex items-center gap-2 overflow-x-auto shrink-0 no-scrollbar ${
            isHighContrast
              ? "bg-black border-yellow-400 text-white"
              : isDark
                ? "bg-[#162130] border-slate-800"
                : "bg-white border-stone-200"
          }`}
        >
          {/* Tab 1: Ibn Kathir */}
          <button
            onClick={() => setSelectedTab("ibnKathir")}
            className={`pb-3.5 px-3.5 text-xs font-semibold whitespace-nowrap transition-all active:scale-95 border-b-2 cursor-pointer flex items-center gap-1.5 ${
              selectedTab === "ibnKathir"
                ? isHighContrast
                  ? "border-yellow-400 text-yellow-400 font-bold bg-yellow-400/10"
                  : isDark
                    ? "border-amber-400 text-amber-300 font-bold"
                    : "border-amber-700 text-amber-950 font-bold"
                : isHighContrast
                  ? "border-transparent text-stone-300 hover:text-yellow-300"
                  : isDark
                    ? "border-transparent text-slate-400 hover:text-slate-200"
                    : "border-transparent text-stone-600 hover:text-stone-950"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tafsir Ibn Kathir</span>
          </button>

          {/* Tab 2: Notas Helmi Nasr */}
          <button
            onClick={() => setSelectedTab("helmiNasr")}
            className={`pb-3.5 px-3.5 text-xs font-semibold whitespace-nowrap transition-all active:scale-95 border-b-2 cursor-pointer flex items-center gap-1.5 ${
              selectedTab === "helmiNasr"
                ? isHighContrast
                  ? "border-yellow-400 text-yellow-400 font-bold bg-yellow-400/10"
                  : isDark
                    ? "border-amber-400 text-amber-300 font-bold"
                    : "border-amber-700 text-amber-950 font-bold"
                : isHighContrast
                  ? "border-transparent text-stone-300 hover:text-yellow-300"
                  : isDark
                    ? "border-transparent text-slate-400 hover:text-slate-200"
                    : "border-transparent text-stone-600 hover:text-stone-950"
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Notas Helmi Nasr (QuranEnc)</span>
          </button>

          {/* Tab 3: Asbāb al-Nuzūl */}
          <button
            onClick={() => setSelectedTab("asbabNuzul")}
            className={`pb-3.5 px-3.5 text-xs font-semibold whitespace-nowrap transition-all active:scale-95 border-b-2 cursor-pointer flex items-center gap-1.5 ${
              selectedTab === "asbabNuzul"
                ? isHighContrast
                  ? "border-yellow-400 text-yellow-400 font-bold bg-yellow-400/10"
                  : isDark
                    ? "border-amber-400 text-amber-300 font-bold"
                    : "border-amber-700 text-amber-950 font-bold"
                : isHighContrast
                  ? "border-transparent text-stone-300 hover:text-yellow-300"
                  : isDark
                    ? "border-transparent text-slate-400 hover:text-slate-200"
                    : "border-transparent text-stone-600 hover:text-stone-950"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Asbāb al-Nuzūl (Al-Wāḥidī)</span>
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="tafsir-scroll flex-1 min-h-0 overflow-y-auto p-4 sm:p-7 pb-[max(2rem,env(safe-area-inset-bottom))] space-y-6">
          {/* Versículo selecionado */}
          <div
            className={`p-5 sm:p-6 rounded-2xl border ${
              isHighContrast
                ? "bg-black border-2 border-yellow-400 text-white"
                : isDark
                  ? "bg-[#131c2a] border-slate-800"
                  : "bg-stone-50 border-stone-200"
            }`}
          >
            <div
              className={`font-arabic text-2xl sm:text-3xl text-right leading-loose mb-3 ${
                isHighContrast
                  ? "text-yellow-300 font-bold"
                  : isDark
                    ? "text-amber-200"
                    : "text-stone-950"
              }`}
              dir="rtl"
            >
              {ayah.arabicText}
            </div>
            <p
              className={`font-editorial text-[17px] leading-[1.8] italic ${
                isHighContrast ? "text-white" : isDark ? "text-slate-100" : "text-stone-900"
              }`}
            >
              "{ayah.translation}"
            </p>
          </div>

          {loadingReal && (
            <div
              className={`p-12 text-center space-y-3 rounded-2xl border ${
                isHighContrast
                  ? "bg-black border-2 border-yellow-400 text-white"
                  : isDark
                    ? "bg-[#162130] border-slate-800 text-slate-300"
                    : "bg-white border-stone-200 text-stone-700"
              }`}
            >
              <Loader2
                className={`w-8 h-8 animate-spin mx-auto ${
                  isHighContrast ? "text-yellow-400" : "text-amber-600"
                }`}
              />
              <p
                className={`text-sm font-medium ${
                  isHighContrast ? "text-yellow-300" : isDark ? "text-slate-300" : "text-stone-700"
                }`}
              >
                Carregando comentários exegéticos deste versículo...
              </p>
            </div>
          )}

          {/* TAB 1: IBN KATHIR */}
          {!loadingReal && selectedTab === "ibnKathir" && ibnKathirData && (
            <article
              className={`rounded-2xl p-5 sm:p-8 border shadow-sm space-y-6 ${
                isHighContrast
                  ? "bg-black border-2 border-yellow-400/80 text-white"
                  : isDark
                    ? "bg-[#162130] border-slate-800 text-slate-100"
                    : "bg-white border-stone-200 text-stone-900"
              }`}
            >
              <div
                className={`pb-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isHighContrast
                    ? "border-yellow-400/40"
                    : isDark
                      ? "border-slate-800"
                      : "border-stone-200/80"
                }`}
              >
                <div>
                  <h3
                    className={`font-display font-bold text-lg sm:text-xl flex items-center gap-2 ${
                      isHighContrast
                        ? "text-yellow-400"
                        : isDark
                          ? "text-slate-100"
                          : "text-stone-900"
                    }`}
                  >
                    <BookOpen
                      className={`w-5 h-5 shrink-0 ${
                        isHighContrast
                          ? "text-yellow-400"
                          : isDark
                            ? "text-amber-400"
                            : "text-amber-700"
                      }`}
                    />
                    {ibnKathirData.work || "Tafsir Ibn Kathir"}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                        isHighContrast
                          ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/50"
                          : isDark
                            ? "bg-blue-500/10 text-blue-300 border-blue-500/20"
                            : "bg-blue-500/10 text-blue-700 border-blue-500/20"
                      }`}
                    >
                      Exegese · {ibnKathirData.source || "fonte não identificada"}
                    </span>
                    {ibnKathirData.author && (
                      <span
                        className={`text-xs ${
                          isHighContrast
                            ? "text-stone-300"
                            : isDark
                              ? "text-slate-400"
                              : "text-stone-500"
                        }`}
                      >
                        {ibnKathirData.author}
                      </span>
                    )}
                    {ibnKathirData.editionVersion && (
                      <span
                        className={`text-xs ${
                          isHighContrast
                            ? "text-stone-300"
                            : isDark
                              ? "text-slate-400"
                              : "text-stone-500"
                        }`}
                      >
                        {ibnKathirData.editionVersion}
                      </span>
                    )}
                    {ibnKathirData.sourceUrl && (
                      <a
                        href={ibnKathirData.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs hover:underline ${
                          isHighContrast
                            ? "text-yellow-400 font-bold"
                            : isDark
                              ? "text-amber-400"
                              : "text-amber-700"
                        }`}
                      >
                        Ver registro consultado
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {ibnKathirData.hasText ? (
                <TranslatableTafsir
                  text={ibnKathirData.text}
                  title={`${ibnKathirData.work || "Tafsir Ibn Kathir"}: Surata ${surah.transliteration} (${surah.number}:${ayah.numberInSurah})`}
                  originalNotice={`Texto consultado em ${ibnKathirData.language || "idioma não informado"}; fonte: ${ibnKathirData.source || "não identificada"}.`}
                  onDisplayedTextChange={setIbnKathirShown}
                />
              ) : (
                <p
                  className={`rounded-xl border p-4 text-sm ${
                    isHighContrast
                      ? "bg-black border-yellow-400 text-yellow-200"
                      : isDark
                        ? "border-slate-700 bg-slate-900/50 text-slate-300"
                        : "border-stone-200 bg-stone-50 text-stone-700"
                  }`}
                >
                  Não foi retornado texto de Tafsir Ibn Kathir para esta referência nas fontes
                  consultadas.
                </p>
              )}
            </article>
          )}

          {/* TAB 2: NOTAS DA TRADUÇÃO DE HELMI NASR */}
          {!loadingReal && selectedTab === "helmiNasr" && helmiData && (
            <article
              className={`rounded-2xl p-5 sm:p-8 border shadow-sm space-y-6 ${
                isHighContrast
                  ? "bg-black border-2 border-yellow-400/80 text-white"
                  : isDark
                    ? "bg-[#162130] border-slate-800 text-slate-100"
                    : "bg-white border-stone-200 text-stone-900"
              }`}
            >
              <div
                className={`pb-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isHighContrast
                    ? "border-yellow-400/40"
                    : isDark
                      ? "border-slate-800"
                      : "border-stone-200/80"
                }`}
              >
                <div>
                  <h3
                    className={`font-display font-bold text-lg sm:text-xl flex items-center gap-2 ${
                      isHighContrast
                        ? "text-yellow-400"
                        : isDark
                          ? "text-slate-100"
                          : "text-stone-900"
                    }`}
                  >
                    <BookMarked
                      className={`w-5 h-5 shrink-0 ${
                        isHighContrast
                          ? "text-yellow-400"
                          : isDark
                            ? "text-amber-400"
                            : "text-amber-700"
                      }`}
                    />
                    Notas da tradução de Helmi Nasr
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                        isHighContrast
                          ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/50"
                          : isDark
                            ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                            : "bg-amber-500/10 text-amber-800 border-amber-500/20"
                      }`}
                    >
                      Notas Helmi Nasr – fonte: QuranEnc
                    </span>
                    <a
                      href={helmiData.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs hover:underline flex items-center gap-1 font-medium ${
                        isHighContrast
                          ? "text-yellow-400 font-bold"
                          : isDark
                            ? "text-amber-400"
                            : "text-amber-700"
                      }`}
                    >
                      <span>Ver registro de origem</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {helmiData.hasFootnotes ? (
                <div className="space-y-4">
                  <div
                    className={`p-5 sm:p-6 rounded-2xl border ${
                      isHighContrast
                        ? "bg-black border border-yellow-400/70 text-white"
                        : isDark
                          ? "bg-slate-900/70 border-slate-800"
                          : "bg-amber-50/50 border-amber-200/60"
                    }`}
                  >
                    <TafsirTextRenderer content={helmiData.footnotes} />
                  </div>
                </div>
              ) : (
                <div
                  className={`p-6 rounded-2xl border space-y-3 ${
                    isHighContrast
                      ? "bg-black border border-yellow-400/70 text-white"
                      : isDark
                        ? "bg-slate-900/60 border-slate-800"
                        : "bg-stone-50 border-stone-200"
                  }`}
                >
                  <p
                    className={`font-semibold text-sm ${
                      isHighContrast
                        ? "text-yellow-400"
                        : isDark
                          ? "text-slate-100"
                          : "text-stone-900"
                    }`}
                  >
                    Sem notas de rodapé suplementares neste versículo.
                  </p>
                  <p
                    className={`text-xs ${
                      isHighContrast
                        ? "text-stone-300"
                        : isDark
                          ? "text-slate-400"
                          : "text-stone-600"
                    }`}
                  >
                    A tradução retornada pela QuranEnc para esta referência:
                  </p>
                  <blockquote
                    className={`p-4 rounded-xl border-l-4 font-editorial text-base italic leading-[1.8] ${
                      isHighContrast
                        ? "bg-black border-yellow-400 text-white"
                        : isDark
                          ? "bg-[#162130] border-amber-500 text-slate-100"
                          : "bg-white border-amber-600 text-stone-900"
                    }`}
                  >
                    "{helmiData.translation || ayah.translation}"
                  </blockquote>
                </div>
              )}

              <div
                className={`p-4 rounded-xl border text-xs font-editorial leading-relaxed ${
                  isHighContrast
                    ? "bg-black border-yellow-400/50 text-stone-300"
                    : isDark
                      ? "bg-slate-900/50 border-slate-800 text-slate-300"
                      : "bg-stone-50 border-stone-200/80 text-stone-700"
                }`}
              >
                <span
                  className={`font-bold block mb-1 ${
                    isHighContrast
                      ? "text-yellow-400"
                      : isDark
                        ? "text-slate-100"
                        : "text-stone-900"
                  }`}
                >
                  Fonte consultada:
                </span>
                <em>QuranEnc</em>. A página consultada identifica a tradução como Helmi Nasr.
              </div>
            </article>
          )}

          {/* TAB 3: ASBAB AL-NUZUL */}
          {!loadingReal && selectedTab === "asbabNuzul" && asbabData && (
            <article
              className={`rounded-2xl p-5 sm:p-8 border shadow-sm space-y-6 ${
                isHighContrast
                  ? "bg-black border-2 border-yellow-400/80 text-white"
                  : isDark
                    ? "bg-[#162130] border-slate-800 text-slate-100"
                    : "bg-white border-stone-200 text-stone-900"
              }`}
            >
              <div
                className={`pb-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isHighContrast
                    ? "border-yellow-400/40"
                    : isDark
                      ? "border-slate-800"
                      : "border-stone-200/80"
                }`}
              >
                <div>
                  <h3
                    className={`font-display font-bold text-lg sm:text-xl flex items-center gap-2 ${
                      isHighContrast
                        ? "text-yellow-400"
                        : isDark
                          ? "text-slate-100"
                          : "text-stone-900"
                    }`}
                  >
                    <History
                      className={`w-5 h-5 shrink-0 ${
                        isHighContrast
                          ? "text-yellow-400"
                          : isDark
                            ? "text-amber-400"
                            : "text-amber-700"
                      }`}
                    />
                    Asbāb al-Nuzūl — Circunstâncias Históricas da Revelação
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                        isHighContrast
                          ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/50"
                          : isDark
                            ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                            : "bg-purple-500/10 text-purple-700 border-purple-500/20"
                      }`}
                    >
                      Circunstâncias da revelação · {asbabData.source}
                    </span>
                    {asbabData.author && (
                      <span
                        className={`text-xs ${
                          isHighContrast
                            ? "text-stone-300"
                            : isDark
                              ? "text-slate-400"
                              : "text-stone-500"
                        }`}
                      >
                        {asbabData.author}
                      </span>
                    )}
                    {asbabData.sourceUrl && (
                      <a
                        href={asbabData.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs hover:underline ${
                          isHighContrast
                            ? "text-yellow-400 font-bold"
                            : isDark
                              ? "text-amber-400"
                              : "text-amber-700"
                        }`}
                      >
                        Ver coleção consultada
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {asbabData.hasContext ? (
                <TranslatableTafsir
                  text={asbabData.text}
                  title={`Asbab al-Nuzul: Surata ${surah.transliteration} (${surah.number}:${ayah.numberInSurah})`}
                  originalNotice={`Texto consultado em ${asbabData.language || "idioma não informado"}; fonte: ${asbabData.source || "não identificada"}.`}
                  onDisplayedTextChange={setAsbabShown}
                />
              ) : (
                <p
                  className={`rounded-xl border p-4 text-sm ${
                    isHighContrast
                      ? "bg-black border-yellow-400 text-yellow-200"
                      : isDark
                        ? "border-slate-700 bg-slate-900/50 text-slate-300"
                        : "border-stone-200 bg-stone-50 text-stone-700"
                  }`}
                >
                  {asbabData.availability === "not-found"
                    ? "A coleção consultada não retornou uma entrada para este versículo. Isso não comprova ausência de circunstâncias de revelação em outras obras."
                    : "Não foi possível confirmar se a coleção consultada possui uma entrada para este versículo."}
                </p>
              )}
            </article>
          )}
        </div>
      </div>
    </div>
  );
};
