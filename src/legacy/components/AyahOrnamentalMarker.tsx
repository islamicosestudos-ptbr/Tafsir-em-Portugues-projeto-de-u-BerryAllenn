// FP-20261029-TAFSIR-7867495988FE · wz:4671a623 · WAZLA / u/BerryAllenn
import React from "react";

export const ARABIC_INDIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"] as const;

/**
 * Converte um numeral arábico ocidental (0-9) para os numerais árabes orientais tradicionais (٠١٢٣٤٥٦٧٨٩).
 */
export const toArabicIndic = (num: number | string): string => {
  return String(num).replace(/[0-9]/g, (d) => ARABIC_INDIC_DIGITS[parseInt(d, 10)]);
};

export interface AyahOrnamentalMarkerProps {
  ayahNumber: number;
  isDark?: boolean;
  isHighContrast?: boolean;
  className?: string;
  color?: string;
}

/**
 * Marcador ornamental de numeração de versículos (Ayah Marker).
 * Renderiza um único <span> com dir="ltr" e lang="ar", contendo o caractere
 * ۝ (U+06DD) imediatamente seguido dos dígitos árabes orientais, herdando
 * a fonte do versículo, com font-size entre 1em e 1.2em e apenas a cor definida no style.
 */
export const AyahOrnamentalMarker: React.FC<AyahOrnamentalMarkerProps> = ({
  ayahNumber,
  isDark = false,
  isHighContrast = false,
  className = "",
  color: colorProp,
}) => {
  const arabicNumber = toArabicIndic(ayahNumber);
  const color = colorProp || (isHighContrast ? "#fde047" : isDark ? "#fbbf24" : "#b45309");

  return (
    <span
      dir="ltr"
      lang="ar"
      className={className || undefined}
      style={{
        fontSize: "1.1em",
        color,
      }}
      aria-label={`Versículo ${ayahNumber}`}
    >
      {`\u06DD${arabicNumber}`}
    </span>
  );
};

export default AyahOrnamentalMarker;
