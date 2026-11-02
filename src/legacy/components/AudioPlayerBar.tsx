// FP-20261029-TAFSIR-7867495988FE · wz:3592ee0f · WAZLA / u/BerryAllenn
import React, { useRef, useEffect, useState } from "react";
import { Ayah, SurahMeta } from "../types/quran";
import { RECITERS } from "../data/quranSurahs";
import { Play, Pause, SkipBack, SkipForward, Repeat, Volume2, X, User, Gauge } from "lucide-react";

interface AudioPlayerBarProps {
  isVisible: boolean;
  isPlaying: boolean;
  activeAyah: Ayah | null;
  surah: SurahMeta;
  reciterId: string;
  isLoopingAyah: boolean;
  playbackSpeed: number;
  playbackRepeatCount: number;
  onTogglePlay: () => void;
  onNextAyah: () => void;
  onPrevAyah: () => void;
  onToggleLoop: () => void;
  onChangeSpeed: (speed: number) => void;
  onChangeRepeatCount: (count: number) => void;
  onChangeReciter: (id: string) => void;
  onClose: () => void;
  audioUrl: string | null;
  onAudioEnded: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  isVisible,
  isPlaying,
  activeAyah,
  surah,
  reciterId,
  isLoopingAyah,
  playbackSpeed = 1.0,
  playbackRepeatCount = 1,
  onTogglePlay,
  onNextAyah,
  onPrevAyah,
  onToggleLoop,
  onChangeSpeed,
  onChangeRepeatCount,
  onChangeReciter,
  onClose,
  audioUrl,
  onAudioEnded,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentPlayIteration, setCurrentPlayIteration] = useState<number>(1);
  const [dynamicBottomInset, setDynamicBottomInset] = useState<number>(0);

  // Detecta insets do sistema (barra inferior do Android / gesture navigation)
  useEffect(() => {
    const updateInsets = () => {
      if (typeof window === "undefined") return;
      let inset = 0;
      if (window.visualViewport) {
        const vv = window.visualViewport;
        const diff = window.innerHeight - (vv.height + vv.offsetTop);
        if (diff > 0 && diff < 120) {
          inset = Math.max(inset, Math.round(diff));
        }
      }
      setDynamicBottomInset(inset);
    };

    updateInsets();
    window.addEventListener("resize", updateInsets);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateInsets);
    }
    return () => {
      window.removeEventListener("resize", updateInsets);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateInsets);
      }
    };
  }, []);

  // Reset repeat counter when active ayah changes
  useEffect(() => {
    setCurrentPlayIteration(1);
  }, [activeAyah?.number]);

  // Garante sincronização estrita da velocidade do áudio em qualquer transição de versículo
  const applyPlaybackRate = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.defaultPlaybackRate = playbackSpeed;
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEffect(() => {
    applyPlaybackRate();
  }, [applyPlaybackRate, audioUrl]);

  // Reprodução e controle de áudio
  useEffect(() => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        applyPlaybackRate();
        const playPromise = audioRef.current.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch((err) => {
            console.warn("Audio play thwarted by browser autoplay policy:", err);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [audioUrl, isPlaying, applyPlaybackRate]);

  // Suporte à reprodução em segundo plano com MediaSession API do Android / navegadores
  useEffect(() => {
    if (typeof window === "undefined" || !("mediaSession" in navigator)) return;

    if (activeAyah) {
      const reciter = RECITERS.find((r) => r.id === reciterId);
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `Surata ${surah.transliteration} (${surah.number}:${activeAyah.numberInSurah})`,
        artist: reciter ? `${reciter.name} (${reciter.style})` : "Recitação do Alcorão",
        album: "Alcorão Sagrado & Tafsir em Português",
        artwork: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      });
    }

    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";

    try {
      navigator.mediaSession.setActionHandler("play", () => onTogglePlay());
      navigator.mediaSession.setActionHandler("pause", () => onTogglePlay());
      navigator.mediaSession.setActionHandler("previoustrack", () => onPrevAyah());
      navigator.mediaSession.setActionHandler("nexttrack", () => onNextAyah());
      navigator.mediaSession.setActionHandler("stop", () => handleClose());
    } catch {
      // Ignora casos onde certas ações não são suportadas
    }
  }, [activeAyah, surah, reciterId, isPlaying]);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onClose();
  };

  if (!isVisible || (!activeAyah && !audioUrl)) return null;

  const handleCustomAudioEnded = () => {
    if (isLoopingAyah || playbackRepeatCount > 1) {
      if (playbackRepeatCount === 999 || currentPlayIteration < playbackRepeatCount) {
        setCurrentPlayIteration((prev) => prev + 1);
        if (audioRef.current) {
          applyPlaybackRate();
          audioRef.current.currentTime = 0;
          const retryPlay = audioRef.current.play();
          if (retryPlay && typeof retryPlay.catch === "function") {
            retryPlay.catch(() => {});
          }
        }
        return;
      }
    }
    // Completed repetitions, proceed to next ayah
    setCurrentPlayIteration(1);
    onAudioEnded();
  };

  const speedOptions = [0.75, 1.0, 1.25, 1.5];
  const repeatOptions = [
    { count: 1, label: "1x (Sem repetição)" },
    { count: 2, label: "2x por versículo" },
    { count: 3, label: "3x (Memorização)" },
    { count: 5, label: "5x (Hifz intensivo)" },
    { count: 999, label: "Repetir continuamente (∞)" },
  ];

  return (
    <aside
      aria-label="Controle de Áudio da Recitação"
      className="fixed bottom-0 inset-x-0 z-40 bg-stone-900/95 backdrop-blur-md text-stone-100 border-t border-stone-800 px-4 pt-3 shadow-2xl transition-all"
      style={{
        paddingBottom: `max(14px, calc(12px + max(env(safe-area-inset-bottom, 0px), ${dynamicBottomInset}px)))`,
      }}
    >
      <audio
        ref={audioRef}
        src={audioUrl || undefined}
        onEnded={handleCustomAudioEnded}
        onLoadedMetadata={applyPlaybackRate}
        onPlay={applyPlaybackRate}
        onCanPlay={applyPlaybackRate}
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
        {/* Linha Superior: Informação do versículo ativo e controles de transporte */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left: Current Ayah Info */}
          <div className="flex items-center gap-3 w-full md:w-auto truncate">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-300">
              <Volume2 className="w-4 h-4 animate-pulse" />
            </div>

            <div className="truncate">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span className="font-semibold text-stone-200">{surah.transliteration}</span>
                <span>·</span>
                <span>
                  Versículo {activeAyah?.numberInSurah || 1} de {surah.totalAyahs}
                </span>
                {playbackRepeatCount > 1 && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300 font-mono text-[10px]">
                    Repetição {currentPlayIteration}/
                    {playbackRepeatCount === 999 ? "∞" : playbackRepeatCount}
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-200/90 truncate font-editorial max-w-xs sm:max-w-md">
                {(activeAyah?.translation && activeAyah.translation.replace(/\s?\[\d+\]/g, "")) ||
                  "Recitação do Nobre Alcorão"}
              </p>
            </div>
          </div>

          {/* Center/Right: Playback Controls & Repetição */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onPrevAyah}
              title="Versículo Anterior"
              className="p-2 text-stone-400 hover:text-stone-100 transition-all active:scale-80 cursor-pointer"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={onTogglePlay}
              title={isPlaying ? "Pausar" : "Reproduzir"}
              className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center font-bold shadow-md transition-all active:scale-90 cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={onNextAyah}
              title="Próximo Versículo"
              className="p-2 text-stone-400 hover:text-stone-100 transition-all active:scale-80 cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Repeat Interval Selector for Hifz */}
            <div className="flex items-center gap-1 bg-stone-800 border border-stone-700 rounded-lg px-2 py-1 text-xs text-stone-300 transition-all active:scale-[0.98]">
              <Repeat className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={playbackRepeatCount}
                onChange={(e) => onChangeRepeatCount(Number(e.target.value))}
                className="bg-transparent text-stone-200 focus:outline-none cursor-pointer text-[11px]"
                title="Quantas vezes repetir cada versículo (ideal para memorização Hifz)"
              >
                {repeatOptions.map((opt) => (
                  <option key={opt.count} value={opt.count} className="bg-stone-900 text-stone-100">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Linha Inferior: Botão de velocidade na ESQUERDA, Escolher Recitador no MEIO, Botão de fechar na DIREITA */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-800/80 w-full">
          {/* Esquerda: Controle de Velocidade */}
          <div className="flex items-center gap-1.5 bg-stone-800 border border-stone-700 rounded-lg px-2.5 py-1 text-xs text-stone-200 shrink-0 transition-all active:scale-[0.98]">
            <Gauge className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[11px] text-stone-400 hidden xs:inline">Velocidade:</span>
            <select
              value={playbackSpeed}
              onChange={(e) => onChangeSpeed(Number(e.target.value))}
              className="bg-transparent text-stone-200 focus:outline-none cursor-pointer text-xs"
              title="Velocidade de reprodução"
            >
              {speedOptions.map((s) => (
                <option key={s} value={s} className="bg-stone-900 text-stone-100">
                  {s}x
                </option>
              ))}
            </select>
          </div>

          {/* Meio: Escolher Recitador */}
          <div className="flex items-center gap-1.5 bg-stone-800 border border-stone-700 rounded-lg px-2.5 py-1 text-xs text-stone-200 min-w-0 max-w-[210px] sm:max-w-xs transition-all active:scale-[0.98]">
            <User className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <select
              value={reciterId}
              onChange={(e) => onChangeReciter(e.target.value)}
              className="bg-transparent text-stone-200 focus:outline-none cursor-pointer text-xs truncate w-full"
              title="Escolher recitador"
            >
              {RECITERS.map((r) => (
                <option key={r.id} value={r.id} className="bg-stone-900 text-stone-100">
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Direita: Botão de Fechar */}
          <button
            onClick={handleClose}
            title="Fechar player de áudio"
            className="flex items-center gap-1 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg px-3 py-1 text-xs text-stone-300 hover:text-white transition-all active:scale-90 cursor-pointer shrink-0"
            aria-label="Fechar player de áudio"
          >
            <X className="w-4 h-4 text-stone-400 hover:text-white" />
            <span className="text-[11px] font-medium hidden sm:inline">Fechar</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
