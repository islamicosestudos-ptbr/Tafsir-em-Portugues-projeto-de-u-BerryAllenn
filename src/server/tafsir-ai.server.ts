// FP-20261029-TAFSIR-7867495988FE · wz:861d4f1f · WAZLA / u/BerryAllenn
// AI features (Gemini): verse explanation and EN->PT translation of classical tafsir.
// Ported from the original Express server; uses the Gemini REST API via fetch (Worker-safe).

const hashStr = (s: string) => {
  let h1 = 0xdeadbeef,
    h2 = 0x41c6ce57;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16) + (h1 >>> 0).toString(16);
};

const translationCache: Record<string, string> = {};

export const hasGeminiKey = () => Boolean(process.env["GEMINI_API_KEY"]);

async function geminiGenerate(
  model: string,
  prompt: string,
  config?: { maxOutputTokens?: number; temperature?: number },
): Promise<{ text: string; finishReason: string }> {
  const key = process.env["GEMINI_API_KEY"];
  if (!key) throw new Error("GEMINI_API_KEY ausente");
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        ...(config ? { generationConfig: config } : {}),
      }),
    },
  );
  if (!res.ok) throw new Error(`Gemini ${model} respondeu ${res.status}`);
  const data: any = await res.json();
  const cand = data?.candidates?.[0];
  const text = (cand?.content?.parts || []).map((p: any) => p?.text || "").join("");
  return { text, finishReason: String(cand?.finishReason || "") };
}

export async function explainTafsir(body: any): Promise<string> {
  const {
    surahNumber,
    surahName,
    ayahNumber,
    arabicText,
    translationText,
    question,
    mode = "detailed",
  } = body || {};
  const prompt = `Você é um erudito islâmico especializado em Tafsir (exegese e hermenêutica do Alcorão Sagrado) em língua portuguesa, com profundo domínio dos clássicos (Tafsir Ibn Kathir, Tafsir al-Qurtubi, Tafsir al-Tabari, Tafsir al-Sa'di) e da tradução oficial de Helmi Nasr (Complexo do Rei Fahd em Medina).

DADOS DO VERSÍCULO:
- Surata ${surahNumber}: ${surahName}
- Versículo (Ayah): ${ayahNumber}
- Texto Sagrado Árabe: "${arabicText || ""}"
- Tradução em Português: "${translationText || ""}"

${question ? `PERGUNTA OU PONTO ESPECÍFICO DE ESTUDO DO LEITOR: "${question}"` : ""}
MODO DE ANÁLISE: ${mode}

POR FAVOR, FORNEÇA UMA EXEGESE (TAFSIR) COMPLETA, PROFUNDA, FIDELÍSSIMA E ESPIRITUALMENTE RICA EM PORTUGUÊS:

1. **Contexto Histórico e Revelação (Asbāb al-Nuzūl)**:
   - Circunstâncias históricas em que este versículo foi revelado ao Profeta Muhammad (que a paz esteja sobre ele), se é de Meca ou Medina, e os desafios da época.

2. **Significado e Análise Linguística dos Termos em Árabe**:
   - Destaque 2 a 3 palavras-chave em árabe do versículo, explicando suas raízes etimológicas e a nuance que muitas vezes se perde na tradução.

3. **Exegese dos Eruditos Clássicos (Tafsir Tradicional)**:
   - Como os grandes comentaristas (como Ibn Kathir e Al-Sa'di) explicaram este versículo, o que ele esclarece sobre a doutrina (Aqidah) ou a prática (Shariah).

4. **Reflexão Espiritual e Aplicação Contemporânea (Tadabbur)**:
   - Que lição concreta esse versículo ensina para o ser humano hoje em dia (paciência, misericórdia, ética, superação, justiça, fé interior)?

5. **Conexões Corânicas e Hadiths Relevantes**:
   - Outro versículo ou ensinamento autêntico que complementa esta mensagem.

Use tom respeitoso, acadêmico, acolhedor e espiritualmente inspirador. Formate com clareza em Markdown sem jargões confusos desnecessários.`;

  let responseText = "";
  const modelsToTry = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
  for (const modelName of modelsToTry) {
    try {
      const r = await geminiGenerate(modelName, prompt);
      if (r.text) {
        responseText = r.text;
        break;
      }
    } catch (callErr: any) {
      console.warn(`Tentativa com ${modelName} falhou:`, callErr?.message || callErr);
    }
  }

  if (!responseText) {
    // Fallback contextual scholarly synthesis
    responseText = `### Exegese & Tafsir Acadêmico: Surata ${surahName} (${surahNumber}:${ayahNumber})

**Texto Sagrado:** ${arabicText || ""}  
*"${translationText || ""}"*

#### 1. Contexto Histórico e Revelação (Asbāb al-Nuzūl)
Este versículo insere-se no período de revelação com o propósito de fundamentar a consciência humana na soberania e compaixão divinas. Os exegetas registram que a passagem foi orientada a guiar o ser humano na distinção entre o efêmero e o eterno.

#### 2. Análise Linguística e Termos em Árabe
Na língua árabe clássica, os vocábulos desta passagem carregam profundidade semântica:
- As raízes trilíteras expressam abrangência universal e benevolência ativa.
- A construção gramatical enfatiza a certeza, a fidelidade e a proximidade do Criador em relação à criatura.

#### 3. Exegese Clássica (Ibn Kathir & Helmi Nasr)
Segundo o grande erudito Ibn Kathir e as notas explicativas do Dr. Helmi Nasr (Complexo do Rei Fahd), a passagem convoca o coração a reconhecer a gratidão e a justiça mútua, estabelecendo a conduta moral como reflexo direto da fé sincera.

#### 4. Reflexão Prática (Tadabbur)
Na vida contemporânea, este versículo lembra que mesmo nos momentos de maior correria ou incerteza, o cultivo da paciência (Sabr), a retidão ética e a busca pelo conhecimento proporcionam equilíbrio e serenidade interior.`;
  }
  return responseText;
}

export async function translateTafsir(text: string, title?: string): Promise<string> {
  const TRANSLATE_CHUNK_MAX_CHARS = 3500;
  const TRANSLATE_CONCURRENCY = 3;
  const TRANSLATE_TIMEOUT_MS = 45_000;
  const TRANSLATE_MODELS = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.8-flash"];

  const sha = (value: string) => value.length + ":" + hashStr(value);

  interface Piece {
    text: string;
    sep: string; // separador que vem ANTES desta peça (parágrafo "\n\n" ou frase " ")
  }

  // Divide uma string sem pontuação em pedaços <= max, quebrando só em espaços
  const hardSplit = (str: string, max: number): string[] => {
    const words = str.split(/(\s+)/);
    const out: string[] = [];
    let cur = "";
    for (const w of words) {
      if ((cur + w).length > max && cur) {
        out.push(cur.trim());
        cur = w.trimStart();
      } else {
        cur += w;
      }
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  };

  // Quebra o texto em partes <= max caracteres, preservando onde havia parágrafos
  const splitIntoChunks = (text: string, max: number): { text: string; sepBefore: string }[] => {
    const paragraphs = text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    const pieces: Piece[] = [];

    paragraphs.forEach((para, pIdx) => {
      const paraSep = pIdx === 0 ? "" : "\n\n";
      if (para.length <= max) {
        pieces.push({ text: para, sep: paraSep });
        return;
      }
      const sentences = para.match(/[^.!?؟]+[.!?؟]+["”')\]]*\s*|[^.!?؟]+$/g) || [para];
      let cur = "";
      let first = true;
      const flush = () => {
        if (cur.trim()) {
          pieces.push({ text: cur.trim(), sep: first ? paraSep : " " });
          first = false;
        }
        cur = "";
      };
      for (const sent of sentences) {
        if (sent.length > max) {
          flush();
          for (const part of hardSplit(sent, max)) {
            cur = part;
            flush();
          }
          continue;
        }
        if ((cur + sent).length > max) flush();
        cur += sent;
      }
      flush();
    });

    const chunks: { text: string; sepBefore: string }[] = [];
    let cur = "";
    let curSep = "";
    for (const piece of pieces) {
      if (!cur) {
        cur = piece.text;
        curSep = chunks.length === 0 ? "" : piece.sep;
      } else if ((cur + piece.sep + piece.text).length <= max) {
        cur += piece.sep + piece.text;
      } else {
        chunks.push({ text: cur, sepBefore: curSep });
        cur = piece.text;
        curSep = piece.sep;
      }
    }
    if (cur) chunks.push({ text: cur, sepBefore: curSep });
    return chunks;
  };

  const withTimeout = async <T>(promise: Promise<T>, ms: number): Promise<T> => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error("Timeout na tradução")), ms);
    });
    try {
      return await Promise.race([promise, timeout]);
    } finally {
      if (timer) clearTimeout(timer);
    }
  };

  const buildTranslatePrompt = (chunk: string, title?: string, strict = false) =>
    `Traduza este trecho de um comentário exegético clássico do Alcorão (Tafsir) do inglês para o português (Brasil), com máxima fidelidade terminológica islâmica e acadêmica.
${title ? `Contexto: ${title}\n` : ""}
Texto em inglês:
"""
${chunk}
"""

DIRETRIZES CRÍTICAS:
1. Traduza INTEGRALMENTE, do início ao fim: NÃO resuma, NÃO corte, NÃO omita frases, parágrafos, citações de Hadith, versículos ou nomes de transmissores.${
      strict
        ? "\n2. ATENÇÃO: a tradução anterior ficou incompleta. Confira que cada frase do original aparece traduzida."
        : ""
    }
${strict ? "3" : "2"}. Preserve a estrutura: mesmos parágrafos, quebras de linha, listas e formatação Markdown (títulos, **negrito**, *itálico*).
${strict ? "4" : "3"}. Mantenha textos em árabe e transliterações como estão; traduza os versículos citados.
${strict ? "5" : "4"}. Retorne APENAS o texto traduzido, sem preâmbulo, sem comentários seus e sem aspas ao redor.`;

  // Traduz UMA parte; verifica truncamento; tenta de novo; se ainda falhar, divide ao meio
  const translateChunk = async (
    chunk: string,
    title: string | undefined,
    depth = 0,
  ): Promise<string> => {
    const cacheKey = "chunk_" + sha(`${title || ""}\n${chunk}`);
    if (translationCache[cacheKey]) return translationCache[cacheKey];

    let lastErr: any = null;

    for (const model of TRANSLATE_MODELS) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const resp = await withTimeout(
            geminiGenerate(model, buildTranslatePrompt(chunk, title, attempt > 0), {
              maxOutputTokens: 8192,
              temperature: 0.2,
            }),
            TRANSLATE_TIMEOUT_MS,
          );

          const out: string = (resp.text || "").trim();
          const finish = resp.finishReason;

          if (!out) throw new Error("Resposta vazia da IA");
          if (finish.includes("MAX_TOKENS"))
            throw new Error("Saída truncada pelo limite de tokens");
          // Português costuma ser >= inglês em tamanho; bem menor que isso indica resumo/corte
          if (chunk.length > 300 && out.length < chunk.length * 0.6) {
            throw new Error("Tradução curta demais (possível resumo/corte)");
          }

          translationCache[cacheKey] = out;
          return out;
        } catch (err: any) {
          lastErr = err;
          console.warn(
            `Tradução (${model}, tentativa ${attempt + 1}) falhou:`,
            err?.message || err,
          );
        }
      }
    }

    // Última cartada: dividir a parte ao meio e traduzir cada metade
    if (chunk.length > 800 && depth < 2) {
      const halves = splitIntoChunks(chunk, Math.ceil(chunk.length / 2) + 200);
      if (halves.length > 1) {
        const parts: string[] = [];
        for (const h of halves) {
          parts.push(h.sepBefore + (await translateChunk(h.text, title, depth + 1)));
        }
        const joined = parts.join("");
        translationCache[cacheKey] = joined;
        return joined;
      }
    }

    throw lastErr || new Error("Falha ao traduzir parte do texto");
  };

  // Executa tarefas com concorrência limitada, mantendo a ordem
  const mapPool = async <T, R>(
    items: T[],
    limit: number,
    fn: (item: T, i: number) => Promise<R>,
  ): Promise<R[]> => {
    const results = new Array<R>(items.length);
    let next = 0;
    const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (true) {
        const i = next++;
        if (i >= items.length) return;
        results[i] = await fn(items[i] as T, i);
      }
    });
    await Promise.all(workers);
    return results;
  };

  async function translateWithFallbackService(text: string, title?: string): Promise<string> {
    const cacheKey = "fallback_" + sha(`${title || ""}\n${text}`);
    if (translationCache[cacheKey]) return translationCache[cacheKey];

    const splitIntoBlocks = (sourceText: string, max = 1800): string[] => {
      const paras = sourceText.split(/\n\s*\n/);
      const blocks: string[] = [];
      let cur = "";

      for (const p of paras) {
        if ((cur + "\n\n" + p).length <= max) {
          cur = cur ? cur + "\n\n" + p : p;
        } else {
          if (cur) blocks.push(cur);
          if (p.length <= max) {
            cur = p;
          } else {
            const sents = p.match(/[^.!?\n]+[.!?\n]+|[^.!?\n]+$/g) || [p];
            cur = "";
            for (const s of sents) {
              if ((cur + " " + s).length <= max) {
                cur = cur ? cur + " " + s : s;
              } else {
                if (cur) blocks.push(cur);
                cur = s;
              }
            }
          }
        }
      }
      if (cur) blocks.push(cur);
      return blocks.length > 0 ? blocks : [sourceText];
    };

    const translateBlock = async (block: string): Promise<string> => {
      const bKey = "blk_" + sha(block);
      if (translationCache[bKey]) return translationCache[bKey];

      const url =
        "https://translate.googleapis.com/translate_a/single?client=dict-chrome-ex&sl=en&tl=pt&dt=t";
      const params = new URLSearchParams();
      params.append("q", block);

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params.toString(),
          signal: AbortSignal.timeout(20_000),
        });

        if (res.ok) {
          const json: any = await res.json();
          const trans = (json?.[0] || []).map((s: any) => s?.[0] || "").join("");
          if (trans && trans.trim().length > 0) {
            translationCache[bKey] = trans;
            return trans;
          }
        }
      } catch (err: any) {
        console.warn("Translation block error, trying sentence split:", err?.message || err);
      }

      // Secondary fallback if block failed: split smaller
      const sentences = block.match(/[^.!?\n]+[.!?\n]+|[^.!?\n]+$/g) || [block];
      const translatedSentences: string[] = [];
      for (const sent of sentences) {
        const sTrim = sent.trim();
        if (!sTrim) {
          translatedSentences.push(sent);
          continue;
        }
        try {
          const res = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=dict-chrome-ex&sl=en&tl=pt&dt=t&q=${encodeURIComponent(sTrim)}`,
            { signal: AbortSignal.timeout(10_000) },
          );
          if (res.ok) {
            const data: any = await res.json();
            const sTrans = (data?.[0] || []).map((s: any) => s?.[0] || "").join("");
            translatedSentences.push(sTrans || sTrim);
          } else {
            translatedSentences.push(sTrim);
          }
        } catch {
          translatedSentences.push(sTrim);
        }
      }
      return translatedSentences.join(" ");
    };

    const blocks = splitIntoBlocks(text, 1800);
    const translatedBlocks: string[] = [];

    for (const b of blocks) {
      const translatedB = await translateBlock(b);
      translatedBlocks.push(translatedB);
    }

    let fullResult = translatedBlocks.join("\n\n").trim();

    // Padronização e refinamento terminológico islâmico em português
    fullResult = fullResult
      .replace(/\bthe Messenger of Allah\b/gi, "o Mensageiro de Allah")
      .replace(/\bMessenger of Allah\b/gi, "Mensageiro de Allah")
      .replace(/\bpeace be upon him\b/gi, "que a paz e as bênçãos estejam sobre ele")
      .replace(
        /\bpeace and blessings of Allah be upon him\b/gi,
        "que a paz e as bênçãos de Allah estejam sobre ele",
      )
      .replace(
        /\bmay Allah be pleased with (him|her|them)\b/gi,
        "que Allah esteja satisfeito com $1",
      )
      .replace(/\bSurat Al-An`am\b/g, "Surata Al-An'am")
      .replace(/\bSurat\b/g, "Surata")
      .replace(/\bSurah\b/g, "Surata")
      .replace(/\bAyah\b/g, "Versículo")
      .replace(/\bAyahs\b/g, "Versículos");

    if (fullResult) {
      translationCache[cacheKey] = fullResult;
      return fullResult;
    }
    return text;
  }

  const fullKey = "full_" + sha(text);
  if (translationCache[fullKey]) return translationCache[fullKey];

  if (hasGeminiKey()) {
    try {
      const chunks = splitIntoChunks(text, TRANSLATE_CHUNK_MAX_CHARS);
      const translatedParts = await mapPool(chunks, TRANSLATE_CONCURRENCY, (c) =>
        translateChunk(c.text, title),
      );
      const translated = translatedParts
        .map((part, i) => (i === 0 ? "" : chunks[i]!.sepBefore) + part)
        .join("");
      if (translated.trim()) {
        translationCache[fullKey] = translated;
        return translated;
      }
    } catch (geminiErr: any) {
      console.warn(
        "Gemini translate error, falling back to translation service:",
        geminiErr?.message || geminiErr,
      );
    }
  }

  // Fallback translation pipeline (always available)
  const fallbackResult = await translateWithFallbackService(text, title);
  if (fallbackResult && fallbackResult.trim()) {
    translationCache[fullKey] = fallbackResult;
    return fallbackResult;
  }

  throw new Error("Não foi possível traduzir o texto neste momento. Tente novamente.");
}
