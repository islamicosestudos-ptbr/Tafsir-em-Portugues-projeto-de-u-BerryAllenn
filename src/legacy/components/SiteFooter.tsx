// FP-20261029-TAFSIR-7867495988FE · wz:f74d1c2f · WAZLA / u/BerryAllenn
import React from "react";
import { PROJECT_INFO } from "../data/projectInfo";
import { AppTheme } from "../types/quran";

interface SiteFooterProps {
  theme?: AppTheme;
  onOpenAbout?: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ theme = "paper", onOpenAbout }) => {
  const isDark = theme === "dark";
  const isHighContrast = theme === "highContrast";

  const linkClass = isHighContrast
    ? "text-yellow-400 underline underline-offset-4 hover:text-yellow-300"
    : isDark
      ? "text-amber-300 hover:text-amber-200 hover:underline underline-offset-4"
      : "text-amber-900 hover:text-amber-950 hover:underline underline-offset-4";

  return (
    <footer
      className={`mt-12 border-t transition-colors ${
        isHighContrast
          ? "border-yellow-400 bg-black text-white"
          : isDark
            ? "border-slate-800 bg-[#0c1117] text-slate-300"
            : "border-stone-200/80 bg-[#FBF9F5] text-stone-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center gap-3 text-center">
        <img
          src={PROJECT_INFO.appIconUrl}
          alt=""
          aria-hidden="true"
          className="w-8 h-8 rounded-lg object-contain opacity-90"
        />

        <p className="text-sm font-editorial leading-relaxed">
          Desenvolvido por{" "}
          <a
            href={PROJECT_INFO.developerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-semibold ${linkClass}`}
          >
            {PROJECT_INFO.developerHandle}
          </a>{" "}
          para a {PROJECT_INFO.audience}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
          <a
            href={PROJECT_INFO.subredditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium ${linkClass}`}
          >
            {PROJECT_INFO.subredditHandle}
          </a>
          {onOpenAbout && (
            <>
              <span aria-hidden="true" className="opacity-50">
                ·
              </span>
              <button
                type="button"
                onClick={onOpenAbout}
                className={`font-medium cursor-pointer ${linkClass}`}
              >
                Sobre o projeto
              </button>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};
