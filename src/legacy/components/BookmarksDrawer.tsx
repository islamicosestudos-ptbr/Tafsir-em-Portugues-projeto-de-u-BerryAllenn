// FP-20261029-TAFSIR-7867495988FE · wz:8c8ea80e · WAZLA / u/BerryAllenn
import React, { useState } from "react";
import { Bookmark, AppTheme } from "../types/quran";
import {
  Bookmark as BookmarkIcon,
  Trash2,
  ArrowRight,
  Edit3,
  Check,
  X,
  Download,
} from "lucide-react";

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onRemoveBookmark: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
  onJumpToVerse: (surahNumber: number, ayahNumber: number) => void;
  theme?: AppTheme;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onUpdateNote,
  onJumpToVerse,
  theme = "paper",
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>("");

  const isHighContrast = theme === "highContrast";
  const isDark = theme === "dark";

  if (!isOpen) return null;

  const handleStartEdit = (b: Bookmark) => {
    setEditingId(b.id);
    setNoteDraft(b.note || "");
  };

  const handleSaveNote = (id: string) => {
    onUpdateNote(id, noteDraft);
    setEditingId(null);
  };

  // Export Tadabbur Notebook to Markdown file
  const handleExportMarkdown = () => {
    let md = `# Caderno de Estudos e Reflexões do Alcorão Sagrado (Tadabbur)\n\n`;
    md += `*Exportado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}*\n`;
    md += `*Total de passagens salvas: ${bookmarks.length}*\n\n---\n\n`;

    bookmarks.forEach((b, idx) => {
      md += `### ${idx + 1}. Surata ${b.surahName} (${b.surahNumber}:${b.ayahNumber})\n\n`;
      md += `**Texto Árabe:**\n> ${b.arabicText}\n\n`;
      md += `**Tradução:**\n> "${b.translationText}"\n\n`;
      md += `**Reflexão Pessoal (Tadabbur):**\n${b.note ? b.note : "*Nenhuma nota inserida.*"}\n\n`;
      md += `*Data em que foi salvo: ${new Date(b.savedAt).toLocaleDateString("pt-BR")}*\n\n---\n\n`;
    });

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Alcorão_Tadabbur_Reflexoes_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity">
      <div
        className={`w-full max-w-xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200 ${
          isHighContrast
            ? "bg-black text-white border-l-2 border-yellow-400"
            : isDark
              ? "bg-[#121924] text-slate-100 border-l border-slate-800"
              : "bg-[#FBF9F5] text-stone-900 border-l border-stone-200"
        }`}
      >
        {/* Header */}
        <div
          className={`p-5 sm:p-6 border-b flex items-center justify-between gap-4 shrink-0 ${
            isHighContrast
              ? "bg-black border-yellow-400 text-white"
              : isDark
                ? "bg-[#162130] border-slate-800 text-slate-100"
                : "bg-white border-stone-200 text-stone-900"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <BookmarkIcon
              className={`w-5 h-5 ${
                isHighContrast ? "text-yellow-400" : isDark ? "text-amber-400" : "text-amber-900"
              }`}
            />
            <div>
              <h2
                className={`text-xl font-display font-semibold ${
                  isHighContrast ? "text-yellow-400" : ""
                }`}
              >
                Versículos Salvos & Reflexões
              </h2>
              <p
                className={`text-xs font-editorial ${
                  isHighContrast ? "text-stone-300" : isDark ? "text-slate-400" : "text-stone-500"
                }`}
              >
                {bookmarks.length} passagens guardadas para reflexão (Tadabbur)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {bookmarks.length > 0 && (
              <button
                onClick={handleExportMarkdown}
                title="Exportar Caderno de Reflexões em Markdown (.md)"
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
                  isHighContrast
                    ? "border-yellow-400 bg-black text-yellow-300 hover:bg-yellow-400/20"
                    : isDark
                      ? "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                      : "border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100"
                }`}
              >
                <Download
                  className={`w-3.5 h-3.5 ${isHighContrast ? "text-yellow-400" : "text-amber-600"}`}
                />
                <span className="hidden sm:inline">Exportar (.md)</span>
              </button>
            )}

            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-all active:scale-85 cursor-pointer ${
                isHighContrast
                  ? "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                  : isDark
                    ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    : "text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              }`}
              aria-label="Fechar gaveta de versículos salvos"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of bookmarks */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {bookmarks.length === 0 ? (
            <div
              className={`text-center py-16 rounded-xl border p-8 ${
                isHighContrast
                  ? "bg-black border-2 border-yellow-400 text-white"
                  : isDark
                    ? "bg-[#162130] border-slate-800 text-slate-200"
                    : "bg-white border-stone-200 text-stone-700"
              }`}
            >
              <BookmarkIcon
                className={`w-8 h-8 mx-auto mb-3 ${
                  isHighContrast ? "text-yellow-400" : isDark ? "text-slate-600" : "text-stone-300"
                }`}
              />
              <p
                className={`text-base font-editorial ${
                  isHighContrast ? "text-yellow-400 font-bold" : ""
                }`}
              >
                Nenhum versículo salvo ainda.
              </p>
              <p
                className={`text-xs mt-1 max-w-xs mx-auto ${
                  isHighContrast ? "text-stone-300" : isDark ? "text-slate-400" : "text-stone-500"
                }`}
              >
                Durante a leitura, toque no ícone de marcador para salvar versículos com suas
                anotações pessoais de estudo.
              </p>
            </div>
          ) : (
            bookmarks.map((b) => (
              <div
                key={b.id}
                className={`rounded-xl p-5 border shadow-xs space-y-3 ${
                  isHighContrast
                    ? "bg-black border-2 border-yellow-400/80 text-white"
                    : isDark
                      ? "bg-[#162130] border-slate-800 text-slate-200"
                      : "bg-white border-stone-200 text-stone-900"
                }`}
              >
                <div
                  className={`flex items-center justify-between pb-2 border-b ${
                    isHighContrast
                      ? "border-yellow-400/40"
                      : isDark
                        ? "border-slate-800"
                        : "border-stone-100"
                  }`}
                >
                  <span
                    className={`text-xs font-semibold ${
                      isHighContrast
                        ? "text-yellow-400 font-bold"
                        : isDark
                          ? "text-slate-200"
                          : "text-stone-800"
                    }`}
                  >
                    Surata {b.surahName} ({b.surahNumber}:{b.ayahNumber})
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onJumpToVerse(b.surahNumber, b.ayahNumber);
                        onClose();
                      }}
                      className={`text-xs font-medium flex items-center gap-1 cursor-pointer hover:underline transition-all active:scale-95 ${
                        isHighContrast
                          ? "text-yellow-400 font-bold hover:text-yellow-300"
                          : isDark
                            ? "text-amber-400"
                            : "text-amber-900"
                      }`}
                    >
                      <span>Abrir</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(b.id)}
                      title="Excluir marcador"
                      className={`p-1 cursor-pointer transition-all active:scale-80 ${
                        isHighContrast
                          ? "text-yellow-400 hover:text-red-400"
                          : "text-stone-400 hover:text-red-700"
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div
                  className={`font-arabic text-xl text-right leading-loose ${
                    isHighContrast
                      ? "text-yellow-300 font-bold"
                      : isDark
                        ? "text-amber-200"
                        : "text-stone-900"
                  }`}
                >
                  {b.arabicText}
                </div>

                <p
                  className={`font-editorial text-xs sm:text-sm italic leading-relaxed ${
                    isHighContrast ? "text-white" : isDark ? "text-slate-300" : "text-stone-700"
                  }`}
                >
                  "{b.translationText}"
                </p>

                {/* Personal Tadabbur reflection note */}
                <div className="pt-2">
                  {editingId === b.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Escreva sua reflexão pessoal sobre este versículo..."
                        rows={2}
                        className={`w-full text-xs p-2.5 rounded-lg focus:outline-none ${
                          isHighContrast
                            ? "bg-black border-2 border-yellow-400 text-white placeholder-stone-400 focus:ring-1 focus:ring-yellow-400"
                            : isDark
                              ? "bg-slate-900 border border-slate-700 text-slate-100 focus:ring-1 focus:ring-amber-500"
                              : "bg-stone-50 border border-stone-300 text-stone-800 focus:ring-1 focus:ring-amber-500"
                        }`}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className={`px-2.5 py-1 text-xs cursor-pointer transition-all active:scale-95 ${
                            isHighContrast
                              ? "text-yellow-400 hover:underline"
                              : isDark
                                ? "text-slate-400 hover:text-slate-200"
                                : "text-stone-500 hover:text-stone-700"
                          }`}
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleSaveNote(b.id)}
                          className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer flex items-center gap-1 transition-all active:scale-95 ${
                            isHighContrast
                              ? "bg-yellow-400 text-black font-bold hover:bg-yellow-300"
                              : isDark
                                ? "bg-amber-500 text-black hover:bg-amber-400"
                                : "bg-stone-900 text-white hover:bg-stone-800"
                          }`}
                        >
                          <Check className="w-3 h-3" />
                          <span>Salvar Nota</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`flex items-start justify-between gap-2 p-2.5 rounded-lg border text-xs ${
                        isHighContrast
                          ? "bg-black border border-yellow-400/60 text-stone-200"
                          : isDark
                            ? "bg-slate-900 border-slate-800 text-slate-300"
                            : "bg-stone-50 border-stone-200/60 text-stone-600"
                      }`}
                    >
                      <p className="italic">{b.note || "Nenhuma reflexão anotada ainda."}</p>
                      <button
                        onClick={() => handleStartEdit(b)}
                        className={`shrink-0 p-1 cursor-pointer transition-all active:scale-80 ${
                          isHighContrast
                            ? "text-yellow-400 hover:text-yellow-300"
                            : isDark
                              ? "text-slate-400 hover:text-amber-400"
                              : "text-stone-400 hover:text-amber-900"
                        }`}
                        title="Editar anotação de reflexão"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div
                  className={`text-[10px] text-right ${
                    isHighContrast ? "text-stone-400" : isDark ? "text-slate-400" : "text-stone-400"
                  }`}
                >
                  Salvo em: {new Date(b.savedAt).toLocaleDateString("pt-BR")}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className={`p-4 border-t flex justify-end shrink-0 ${
            isHighContrast
              ? "bg-black border-yellow-400 text-white"
              : isDark
                ? "bg-[#162130] border-slate-800"
                : "bg-stone-100/90 border-stone-200"
          }`}
        >
          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              isHighContrast
                ? "bg-yellow-400 text-black font-bold hover:bg-yellow-300"
                : isDark
                  ? "bg-amber-500 text-black hover:bg-amber-400"
                  : "bg-stone-900 text-white hover:bg-stone-800"
            }`}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
