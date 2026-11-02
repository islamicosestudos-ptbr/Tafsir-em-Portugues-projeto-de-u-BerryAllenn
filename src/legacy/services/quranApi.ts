// FP-20261029-TAFSIR-7867495988FE · wz:a07295a0 · WAZLA / u/BerryAllenn
import { Ayah, SurahDetail } from "../types/quran";
import { ALL_SURAHS } from "../data/quranSurahs";
import { BUNDLED_SURAHS } from "../data/bundledTafsir";

const API_BASE_URL = "https://portugues-app-1.vercel.app"; // backend na Vercel (usado só como reserva)

const cache: Record<string, Ayah[]> = {};

async function fetchWithTimeout(url: string, ms = 15000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// Busca direto nas fontes públicas (não depende do backend da Vercel)
async function fetchSurahDirect(surahNumber: number): Promise<{ ayahs: any[] }> {
  const [quranRes, nasrRes] = await Promise.all([
    fetchWithTimeout(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,pt.elhayek,en.transliteration`,
    ),
    fetchWithTimeout(`https://quranenc.com/api/v1/translation/sura/portuguese_nasr/${surahNumber}`),
  ]);

  if (!quranRes.ok || !nasrRes.ok) {
    throw new Error(`Fontes indisponíveis (${quranRes.status}/${nasrRes.status}).`);
  }

  const [quranJson, nasrJson] = await Promise.all([quranRes.json(), nasrRes.json()]);
  const editions: any[] = Array.isArray(quranJson?.data) ? quranJson.data : [];
  const pick = (id: string) => editions.find((e: any) => e?.edition?.identifier === id)?.ayahs;

  const arabicAyahs = pick("quran-uthmani");
  const elhayekAyahs = pick("pt.elhayek");
  const translitAyahs = pick("en.transliteration");
  const nasrAyahs: any[] = Array.isArray(nasrJson?.result) ? nasrJson.result : [];

  if (!Array.isArray(arabicAyahs) || !Array.isArray(elhayekAyahs) || nasrAyahs.length === 0) {
    throw new Error("As fontes não retornaram as edições esperadas.");
  }

  const nasrBy = new Map<number, any>(nasrAyahs.map((a: any) => [Number(a.aya), a]));
  const elhayekBy = new Map<number, any>(
    elhayekAyahs.map((a: any) => [Number(a.numberInSurah), a]),
  );
  const translitBy = new Map<number, any>(
    (Array.isArray(translitAyahs) ? translitAyahs : []).map((a: any) => [
      Number(a.numberInSurah),
      a,
    ]),
  );

  const ayahs = arabicAyahs.map((arabic: any) => {
    const n = Number(arabic.numberInSurah);
    const nasr = nasrBy.get(n)?.translation?.trim() || "";
    const footnotes = nasrBy.get(n)?.footnotes?.trim() || "";
    const elhayek = elhayekBy.get(n)?.text?.trim() || "";
    const transliteration = translitBy.get(n)?.text?.trim() || "";
    if (!arabic.text?.trim() || !nasr || !elhayek) {
      throw new Error(`A tradução do versículo ${n} está incompleta.`);
    }
    return {
      number: arabic.number,
      numberInSurah: n,
      arabicText: arabic.text,
      ...(transliteration ? { transliteration } : {}),
      translations: { "pt.nasr": nasr, "pt.elhayek": elhayek },
      ...(footnotes ? { footnotes: { "pt.nasr": footnotes } } : {}),
      juz: arabic.juz,
      page: arabic.page,
      sajda: Boolean(arabic.sajda),
    };
  });

  return { ayahs };
}

// Tenta direto nas fontes; se falhar, tenta o backend da Vercel como reserva
async function loadSurahJson(surahNumber: number): Promise<{ ayahs: any[] }> {
  try {
    return await fetchSurahDirect(surahNumber);
  } catch (directError) {
    console.warn("Busca direta falhou, tentando backend:", directError);
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/quran/surah/${surahNumber}`);
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !Array.isArray(json?.ayahs)) {
      throw new Error(json?.error || `Falha ao carregar a surata (${res.status}).`);
    }
    return json;
  }
}

export async function fetchSurahAyahs(
  surahNumber: number,
  primaryTranslation: "pt.nasr" | "pt.elhayek" = "pt.nasr",
): Promise<Ayah[]> {
  // v3 separates results containing verified, verse-specific transliterations
  // from older entries that used the same generic Bismillah fallback.
  const cacheKey = `v4_${surahNumber}_dual_${primaryTranslation}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  // Check localStorage cache
  try {
    const stored = localStorage.getItem(`quran_cache_${cacheKey}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      const expectedCount = ALL_SURAHS.find((surah) => surah.number === surahNumber)?.totalAyahs;
      if (
        Array.isArray(parsed) &&
        parsed.length === expectedCount &&
        parsed.every(
          (ayah) =>
            typeof ayah.arabicText === "string" &&
            Boolean(ayah.arabicText.trim()) &&
            typeof ayah.translation === "string" &&
            Boolean(ayah.translation.trim()) &&
            typeof ayah.secondaryTranslation === "string" &&
            Boolean(ayah.secondaryTranslation.trim()),
        )
      ) {
        cache[cacheKey] = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.warn("LocalStorage read error:", e);
  }

  const bundled = BUNDLED_SURAHS[surahNumber];

  try {
    const json = await loadSurahJson(surahNumber);

    const formatted: Ayah[] = json.ayahs.map((ayah: any) => {
      const nasr = ayah?.translations?.["pt.nasr"];
      const elhayek = ayah?.translations?.["pt.elhayek"];
      if (!nasr?.trim() || !elhayek?.trim()) {
        throw new Error(`A tradução do versículo ${ayah?.numberInSurah || ""} está incompleta.`);
      }
      const primaryText = primaryTranslation === "pt.nasr" ? nasr : elhayek;
      const secondaryText = primaryTranslation === "pt.nasr" ? elhayek : nasr;
      const bundledAyah = bundled?.ayahs?.find((item) => item.numberInSurah === ayah.numberInSurah);
      const remoteTransliteration =
        typeof ayah.transliteration === "string" ? ayah.transliteration.trim() : "";
      const bundledTransliteration =
        typeof bundledAyah?.transliteration === "string" ? bundledAyah.transliteration.trim() : "";

      return {
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        arabicText: ayah.arabicText,
        ...(remoteTransliteration || bundledTransliteration
          ? { transliteration: remoteTransliteration || bundledTransliteration }
          : {}),
        translation: primaryText,
        secondaryTranslation: secondaryText,
        ...(typeof ayah?.footnotes?.["pt.nasr"] === "string" && ayah.footnotes["pt.nasr"].trim()
          ? { nasrFootnotes: ayah.footnotes["pt.nasr"].trim() }
          : {}),
        juz: ayah.juz,
        page: ayah.page,
        sajda: Boolean(ayah.sajda),
        tafsirSummary: bundledAyah?.tafsirSummary,
        sourceProvenance: {
          quranText: "alqurancloud:quran-uthmani",
          translations: ["quranenc:portuguese_nasr", "alqurancloud:pt.elhayek"],
          ...(remoteTransliteration
            ? { transliteration: "alqurancloud:en.transliteration" as const }
            : bundledTransliteration
              ? { transliteration: "local:bundled" as const }
              : {}),
        },
      };
    });

    const expectedCount = ALL_SURAHS.find((surah) => surah.number === surahNumber)?.totalAyahs;
    if (!expectedCount || formatted.length !== expectedCount) {
      throw new Error("A fonte retornou uma quantidade incompleta de versículos.");
    }

    cache[cacheKey] = formatted;
    try {
      localStorage.setItem(`quran_cache_${cacheKey}`, JSON.stringify(formatted));
    } catch {
      // Storage may be unavailable or full; the in-memory result is still usable.
    }
    return formatted;
  } catch (error) {
    console.error(`Falha ao carregar a Surata ${surahNumber}:`, error);
    if (bundled?.ayahs?.length && primaryTranslation === "pt.nasr") {
      const bundledAyahs = bundled.ayahs.map((ayah) => ({
        ...ayah,
        secondaryTranslation: ayah.secondaryTranslation || ayah.translation,
        sourceProvenance: {
          quranText: "local:bundled" as const,
          translations: ["local:bundled" as const],
          ...(ayah.transliteration?.trim() ? { transliteration: "local:bundled" as const } : {}),
        },
      }));
      cache[cacheKey] = bundledAyahs;
      return bundledAyahs;
    }
    throw error instanceof Error
      ? error
      : new Error(
          "Não foi possível carregar as traduções desta surata. Verifique sua conexão e tente novamente.",
        );
  }
}

export function getAudioUrl(globalAyahNumber: number, reciterId: string = "ar.alafasy"): string {
  return `https://cdn.islamic.network/quran/audio/128/${reciterId}/${globalAyahNumber}.mp3`;
}

export async function askGeminiTafsir(params: {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  arabicText: string;
  translationText: string;
  question?: string;
  mode?: string;
}): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/api/tafsir/explain`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.error || errorData.details || "Falha ao consultar Tafsir do Erudito.",
    );
  }

  const data = await res.json();
  return data.tafsir;
}
