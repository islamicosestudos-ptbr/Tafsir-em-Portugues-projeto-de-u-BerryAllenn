// FP-20261029-TAFSIR-7867495988FE · wz:2352305e · WAZLA / u/BerryAllenn
import React, { useState, useEffect } from "react";
import { PROJECT_INFO } from "../data/projectInfo";

interface SplashScreenProps {
  onFinish: () => void;
  durationMs?: number; // Padrão: 1250ms (entre 1.1s e 1.4s conforme especificação)
}

/**
 * SplashScreen de alta qualidade para o aplicativo de Alcorão Sagrado & Tafsir.
 *
 * Características:
 * - Fundo branco puro (#FFFFFF);
 * - Ícone centralizado com escala sutil de 0.92 para 1.0 (curva easeOutBack);
 * - Fade-in suave + slide up para a marca da desenvolvedora (Wazla) e o usuário (u/BerryAllenn);
 * - Duração ágil, elegante e não obstrutiva (~1.2s);
 * - Transição suave (fade transition) ao concluir;
 * - Suporte a todas as densidades e dimensões de tela.
 */
export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, durationMs = 1250 }) => {
  const [mounted, setMounted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Inicia a animação imediatamente após montagem
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 40);

    // Inicia a transição de saída (fade out)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, durationMs);

    // Finaliza a tela de splash e transiciona para a aplicação principal
    const finishTimer = setTimeout(() => {
      onFinish();
    }, durationMs + 260);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [durationMs, onFinish]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onFinish();
    }, 120);
  };

  return (
    <div
      role="region"
      aria-label="Tela de carregamento"
      data-testid="splash-screen"
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#FFFFFF] text-stone-900 select-none cursor-pointer transition-opacity duration-300 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Top balance spacer */}
      <div className="w-full h-12 sm:h-16" aria-hidden="true" />

      {/* Centro: Ícone do aplicativo com escala sutil 0.92 -> 1.0 (easeOutBack) */}
      <div className="flex flex-col items-center justify-center px-4 max-w-sm w-full text-center">
        <div
          className="relative transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform"
          style={{
            transform: mounted ? "scale(1.0)" : "scale(0.92)",
            opacity: mounted ? 1 : 0,
          }}
        >
          <img
            src={PROJECT_INFO.appIconUrl}
            alt="Ícone Alcorão Sagrado"
            className="w-28 h-28 sm:w-32 sm:h-32 object-contain drop-shadow-md mx-auto"
          />
        </div>

        {/* Título e subtítulo do aplicativo com fade suave */}
        <div
          className="mt-6 transition-all duration-700 delay-100 ease-out will-change-transform"
          style={{
            transform: mounted ? "translateY(0)" : "translateY(8px)",
            opacity: mounted ? 1 : 0,
          }}
        >
          <h1 className="text-xl sm:text-2xl font-display font-bold tracking-wide text-stone-900">
            ALCORÃO SAGRADO
          </h1>
          <p className="text-xs uppercase tracking-widest text-amber-700 font-medium mt-1">
            & Tafsir em Português
          </p>
        </div>
      </div>

      {/* Rodapé: Desenvolvedora (Wazla) + Reddit user (u/BerryAllenn) com fade-in e leve slide up */}
      <div
        className="pb-10 sm:pb-12 px-6 flex flex-col items-center gap-2 transition-all duration-700 delay-200 ease-out will-change-transform"
        style={{
          transform: mounted ? "translateY(0)" : "translateY(12px)",
          opacity: mounted ? 1 : 0,
        }}
      >
        <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-400">
          Desenvolvido por
        </span>

        <div className="inline-flex items-center gap-2.5 sm:gap-3 py-1 px-3.5 rounded-full bg-stone-50 border border-stone-200/60 shadow-2xs">
          {/* Logo da iniciativa Wazla (que já traz a tipografia oficial WAZLA) */}
          <img
            src={PROJECT_INFO.initiativeLogoUrl}
            alt="Logo Wazla"
            className="h-5 sm:h-6 w-auto object-contain"
          />
          <span className="sr-only">{PROJECT_INFO.initiativeName}</span>

          {/* Separador sutil */}
          <span className="text-stone-300 font-light" aria-hidden="true">
            ·
          </span>

          {/* Usuário do Reddit */}
          <span className="text-xs sm:text-sm font-medium font-mono text-stone-600">
            {PROJECT_INFO.developerHandle}
          </span>
        </div>
      </div>
    </div>
  );
};
