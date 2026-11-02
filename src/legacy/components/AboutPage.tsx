// FP-20261029-TAFSIR-7867495988FE · wz:5ab45ca3 · WAZLA / u/BerryAllenn
import React from "react";
import { ArrowLeft, ExternalLink, Heart } from "lucide-react";
import { PROJECT_INFO } from "../data/projectInfo";
import { AppTheme } from "../types/quran";

interface AboutPageProps {
  theme?: AppTheme;
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ theme = "paper", onBack }) => {
  const isDark = theme === "dark";
  const isHighContrast = theme === "highContrast";

  const cardClass = isHighContrast
    ? "bg-black border-2 border-yellow-400 text-white"
    : isDark
      ? "bg-[#121924] border border-slate-800 text-slate-200"
      : "bg-white border border-stone-200/90 text-stone-800";

  const mutedClass = isHighContrast
    ? "text-stone-200"
    : isDark
      ? "text-slate-400"
      : "text-stone-600";

  const linkCardClass = isHighContrast
    ? "border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black"
    : isDark
      ? "border border-slate-700 hover:border-amber-400/70 hover:bg-[#162130]"
      : "border border-stone-200 hover:border-amber-700/50 hover:bg-amber-50/40";

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        type="button"
        onClick={onBack}
        className={`inline-flex items-center gap-1.5 text-sm font-medium mb-6 cursor-pointer hover:underline underline-offset-4 ${
          isHighContrast ? "text-yellow-400" : isDark ? "text-amber-300" : "text-amber-900"
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao Índice de Suratas
      </button>

      <div className={`rounded-2xl p-6 sm:p-10 text-center shadow-sm ${cardClass}`}>
        {/* A logo da iniciativa tem fundo claro: mantém um painel claro em qualquer tema */}
        <div className="mx-auto max-w-sm rounded-xl bg-white p-4 shadow-xs">
          <img
            src={PROJECT_INFO.initiativeLogoUrl}
            alt={`Logo da iniciativa ${PROJECT_INFO.initiativeName}`}
            className="w-full h-auto object-contain"
          />
        </div>

        <h1 className="mt-8 text-2xl sm:text-3xl font-display font-semibold tracking-wide">
          {PROJECT_INFO.initiativeName}
        </h1>
        <p className={`mt-1 text-sm ${mutedClass}`}>Projeto sem fins lucrativos</p>

        <p className="mt-6 text-base sm:text-lg font-editorial leading-relaxed text-left sm:text-center">
          Este aplicativo é um projeto sem fins lucrativos, desenvolvido para a{" "}
          {PROJECT_INFO.audience}, com o propósito de aproximar o Nobre Alcorão e o Tafsir da língua
          portuguesa.
        </p>

        {/* Aplicativo */}
        <div
          className={`mt-8 flex items-center gap-4 rounded-xl p-4 text-left ${
            isHighContrast
              ? "border border-yellow-400/60"
              : isDark
                ? "bg-[#0f1722] border border-slate-800"
                : "bg-stone-50 border border-stone-200"
          }`}
        >
          <img
            src={PROJECT_INFO.appIconUrl}
            alt="Ícone do aplicativo"
            className="w-14 h-14 rounded-xl object-contain shrink-0"
          />
          <div>
            <h2 className="font-display font-semibold text-base">{PROJECT_INFO.appName}</h2>
            <p className={`text-xs mt-0.5 ${mutedClass}`}>
              Texto árabe Uthmani, traduções em português, Tafsir versículo a versículo, recitação
              em áudio e estudos temáticos.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <a
            href={PROJECT_INFO.developerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-colors ${linkCardClass}`}
          >
            <span>
              <span
                className={`block text-[11px] uppercase tracking-widest ${mutedClass} group-hover:opacity-100`}
              >
                Perfil no Reddit
              </span>
              <span className="block font-semibold">{PROJECT_INFO.developerHandle}</span>
            </span>
            <ExternalLink className="w-4 h-4 shrink-0 opacity-70" aria-hidden="true" />
          </a>

          <a
            href={PROJECT_INFO.subredditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-colors ${linkCardClass}`}
          >
            <span>
              <span
                className={`block text-[11px] uppercase tracking-widest ${mutedClass} group-hover:opacity-100`}
              >
                Comunidade
              </span>
              <span className="block font-semibold">{PROJECT_INFO.subredditHandle}</span>
            </span>
            <ExternalLink className="w-4 h-4 shrink-0 opacity-70" aria-hidden="true" />
          </a>
        </div>

        <p className={`mt-8 inline-flex items-center gap-1.5 text-xs ${mutedClass}`}>
          <Heart className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
          Desenvolvido por {PROJECT_INFO.developerHandle} para a {PROJECT_INFO.audience}
        </p>
      </div>
    </section>
  );
};
