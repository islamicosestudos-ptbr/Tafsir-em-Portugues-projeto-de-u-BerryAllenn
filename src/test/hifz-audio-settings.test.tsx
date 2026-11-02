import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QuranReader } from "@/legacy/components/QuranReader";
import { TafsirDrawer } from "@/legacy/components/TafsirDrawer";
import { SettingsModal } from "@/legacy/components/SettingsModal";
import { AudioPlayerBar } from "@/legacy/components/AudioPlayerBar";
import { SurahMeta, Ayah, ReaderSettings } from "@/legacy/types/quran";

const mockSurah: SurahMeta = {
  number: 1,
  name: "الفاتحة",
  transliteration: "Al-Fatihah",
  portugueseName: "A Abertura",
  totalAyahs: 2,
  revelationType: "Meca",
  revelationOrder: 5,
  juzStart: 1,
  summary: "A Abertura do Alcorão Sagrado.",
};

const mockAyahs: Ayah[] = [
  {
    number: 1,
    numberInSurah: 1,
    arabicText: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    transliteration: "Bismillaahir Rahmaanir Raheem",
    translation: "Em nome de Deus, o Clemente, o Misericordioso.",
  },
  {
    number: 2,
    numberInSurah: 2,
    arabicText: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
    transliteration: "Alhamdu lillaahi Rabbil 'aalameen",
    translation: "Louvado seja Deus, Senhor do Universo.",
  },
];

const baseSettings: ReaderSettings = {
  translationId: "pt.nasr",
  verseReferenceStyle: "surahName",
  arabicFontSize: 32,
  transliterationFontSize: 15,
  translationFontSize: 17,
  arabicLineHeight: 2.4,
  translationLineHeight: 1.8,
  verseSpacing: "normal",
  arabicFont: "amiriQuran",
  portugueseFont: "serif",
  showTransliteration: true,
  theme: "paper",
  viewMode: "verse",
  reciterId: "ar.alafasy",
  sideBySideTranslation: false,
  readingRuler: false,
  hifzMode: false,
  hifzRevealedAyahs: [],
  playbackSpeed: 1.0,
  playbackRepeatCount: 1,
  inlineTafsirSources: ["ibnKathir", "asbabNuzul", "helmiNasr", "practical"],
};

describe("Item 1 & 5: AudioPlayerBar controls & layout", () => {
  it("does not render when isVisible is false", () => {
    const { container } = render(
      <AudioPlayerBar
        isVisible={false}
        isPlaying={false}
        activeAyah={mockAyahs[0]}
        surah={mockSurah}
        reciterId="ar.alafasy"
        isLoopingAyah={false}
        playbackSpeed={1.0}
        playbackRepeatCount={1}
        onTogglePlay={() => {}}
        onNextAyah={() => {}}
        onPrevAyah={() => {}}
        onToggleLoop={() => {}}
        onChangeSpeed={() => {}}
        onChangeRepeatCount={() => {}}
        onChangeReciter={() => {}}
        onClose={() => {}}
        audioUrl="https://example.com/audio.mp3"
        onAudioEnded={() => {}}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders side-by-side controls with close button calling onClose", () => {
    let closed = false;
    render(
      <AudioPlayerBar
        isVisible={true}
        isPlaying={true}
        activeAyah={mockAyahs[0]}
        surah={mockSurah}
        reciterId="ar.alafasy"
        isLoopingAyah={false}
        playbackSpeed={1.25}
        playbackRepeatCount={1}
        onTogglePlay={() => {}}
        onNextAyah={() => {}}
        onPrevAyah={() => {}}
        onToggleLoop={() => {}}
        onChangeSpeed={() => {}}
        onChangeRepeatCount={() => {}}
        onChangeReciter={() => {}}
        onClose={() => {
          closed = true;
        }}
        audioUrl="https://example.com/audio.mp3"
        onAudioEnded={() => {}}
      />,
    );

    const closeBtn = screen.getByTitle("Fechar player de áudio");
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(closed).toBe(true);

    const speedSelect = screen.getByTitle("Velocidade de reprodução") as HTMLSelectElement;
    expect(speedSelect.value).toBe("1.25");
  });
});

describe("Item 2: TafsirDrawer without Consulta Aberta", () => {
  it("does not render Consulta Aberta (IA Auxiliar) tab", () => {
    render(
      <TafsirDrawer
        isOpen={true}
        onClose={() => {}}
        surah={mockSurah}
        ayah={mockAyahs[0]}
        theme="paper"
      />,
    );

    expect(screen.queryByText(/Consulta Aberta/i)).not.toBeInTheDocument();
    expect(screen.getByText("Tafsir Ibn Kathir")).toBeInTheDocument();
    expect(screen.getByText(/Notas Helmi Nasr/i)).toBeInTheDocument();
    expect(screen.getByText(/Asbāb al-Nuzūl/i)).toBeInTheDocument();
  });
});

describe("Item 3: Modo Hifz hides transliteration alongside Arabic", () => {
  it("hides transliteration and Arabic when Hifz mode is active and unrevealed", () => {
    render(
      <QuranReader
        surah={mockSurah}
        ayahs={mockAyahs}
        isLoading={false}
        activeAyahNumber={null}
        isPlayingAudio={false}
        settings={{ ...baseSettings, hifzMode: true }}
        onSelectAyahForTafsir={() => {}}
        onPlayAyah={() => {}}
        onTogglePlaySurah={() => {}}
        onSaveBookmark={() => {}}
        isAyahBookmarked={() => false}
        onNavigateSurah={() => {}}
        onChangeTranslation={() => {}}
      />,
    );

    // Transliteration text should NOT be visible
    expect(screen.queryByText("Bismillaahir Rahmaanir Raheem")).not.toBeInTheDocument();
    // Portuguese translation MUST be visible
    expect(screen.getByText(/Em nome de Deus, o Clemente, o Misericordioso/i)).toBeInTheDocument();
  });

  it("reveals transliteration when user clicks reveal in Hifz mode", () => {
    render(
      <QuranReader
        surah={mockSurah}
        ayahs={mockAyahs}
        isLoading={false}
        activeAyahNumber={null}
        isPlayingAudio={false}
        settings={{ ...baseSettings, hifzMode: true }}
        onSelectAyahForTafsir={() => {}}
        onPlayAyah={() => {}}
        onTogglePlaySurah={() => {}}
        onSaveBookmark={() => {}}
        isAyahBookmarked={() => false}
        onNavigateSurah={() => {}}
        onChangeTranslation={() => {}}
      />,
    );

    const revealButtons = screen.getAllByText(/Revelar Árabe & Conferir Recitação/i);
    fireEvent.click(revealButtons[0]!);

    // Now transliteration is revealed
    expect(screen.getByText("Bismillaahir Rahmaanir Raheem")).toBeInTheDocument();
  });
});

describe("Item 6: SettingsModal restores default settings", () => {
  it("renders 'Restaurar configurações padrão' button and calls onResetSettings", () => {
    let resetCalled = false;
    render(
      <SettingsModal
        isOpen={true}
        onClose={() => {}}
        settings={baseSettings}
        onUpdateSettings={() => {}}
        onResetSettings={() => {
          resetCalled = true;
        }}
      />,
    );

    const resetBtn = screen.getByText("Restaurar configurações padrão");
    expect(resetBtn).toBeInTheDocument();
    fireEvent.click(resetBtn);
    expect(resetCalled).toBe(true);
  });
});
