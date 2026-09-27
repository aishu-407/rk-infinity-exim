import React from 'react';

interface ScratchBackgroundProps {
  idPrefix: string;
  stencilCode?: string;
  showCornerMarks?: boolean;
}

export const ScratchBackground: React.FC<ScratchBackgroundProps> = ({
  idPrefix,
  stencilCode = 'EXIM-LOGISTICS // GRADE-A-VERIFIED',
  showCornerMarks = true,
}) => {
  const patternId1 = `${idPrefix}-scratches-pattern`;
  const patternId2 = `${idPrefix}-distress-scratches`;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft atmospheric gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-100/90 via-slate-50/70 to-stone-100/90" />

      {/* High-density Scratch & Etching SVG Patterns */}
      <svg className="absolute inset-0 w-full h-full opacity-60 mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Primary Scratch Pattern: Fine directional scratch marks, cross-etches, grazes */}
          <pattern id={patternId1} width="220" height="220" patternUnits="userSpaceOnUse">
            {/* Scratch Cluster 1 - Sharp diagonal slashes */}
            <path d="M 12 28 L 56 46 M 15 32 L 62 48 M 18 26 L 45 37" stroke="#475569" strokeWidth="0.85" strokeLinecap="round" opacity="0.45" />
            <path d="M 148 12 L 195 48 M 152 10 L 188 38 M 158 18 L 192 44" stroke="#334155" strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
            
            {/* Scratch Cluster 2 - Fine micro-scratches, scuffs and scrapes */}
            <path d="M 90 22 L 122 36 M 94 20 L 118 31 M 98 26 L 126 40" stroke="#64748b" strokeWidth="0.55" strokeLinecap="round" opacity="0.38" />
            <path d="M 8 120 L 58 142 M 12 125 L 50 140 M 15 118 L 65 145" stroke="#475569" strokeWidth="0.75" strokeLinecap="round" opacity="0.4" />

            {/* Scratch Cluster 3 - Cross-hatched scratch incisions */}
            <path d="M 35 80 L 85 98 M 40 98 L 80 84" stroke="#475569" strokeWidth="0.8" strokeLinecap="round" opacity="0.42" />
            <path d="M 125 150 L 175 174 M 130 170 L 170 154" stroke="#64748b" strokeWidth="0.75" strokeLinecap="round" opacity="0.38" />

            {/* Scratch Cluster 4 - Steep vertical scrapes and gouges */}
            <path d="M 135 70 L 152 118 M 138 74 L 156 114 M 142 80 L 158 122" stroke="#334155" strokeWidth="0.65" strokeLinecap="round" opacity="0.36" />
            <path d="M 68 145 L 82 185 M 72 148 L 86 182" stroke="#64748b" strokeWidth="0.7" strokeLinecap="round" opacity="0.35" />

            {/* Cargo grit and stipple specks */}
            <circle cx="28" cy="55" r="0.85" fill="#334155" opacity="0.45" />
            <circle cx="78" cy="38" r="0.65" fill="#475569" opacity="0.4" />
            <circle cx="168" cy="102" r="0.9" fill="#334155" opacity="0.42" />
            <circle cx="112" cy="125" r="0.7" fill="#64748b" opacity="0.38" />
            <circle cx="50" cy="168" r="0.8" fill="#475569" opacity="0.4" />
            <circle cx="140" cy="22" r="0.6" fill="#334155" opacity="0.45" />
            <circle cx="195" cy="190" r="0.75" fill="#475569" opacity="0.35" />

            {/* Subtle tick hash marks */}
            <path d="M 55 18 L 59 23 M 60 20 L 63 24 M 175 80 L 179 86 M 178 84 L 182 89" stroke="#64748b" strokeWidth="0.6" opacity="0.35" />
          </pattern>

          {/* Secondary Pattern: Weathered long-stroke drag scratches & distress lines */}
          <pattern id={patternId2} width="380" height="380" patternUnits="userSpaceOnUse">
            {/* Long weathered drag scratches with dashes simulating broken scratches */}
            <path d="M 25 90 Q 110 135 200 160 T 360 210" fill="none" stroke="#475569" strokeWidth="0.85" strokeDasharray="22 5 8 4 36 7 14 6" opacity="0.35" />
            <path d="M 28 94 Q 112 138 202 163 T 362 213" fill="none" stroke="#64748b" strokeWidth="0.5" strokeDasharray="14 7 28 9 12 5" opacity="0.28" />
            
            <path d="M 350 45 Q 260 115 160 190 T 35 320" fill="none" stroke="#334155" strokeWidth="0.8" strokeDasharray="28 7 16 5 45 9" opacity="0.32" />
            
            {/* Broad diagonal scratch sweep */}
            <path d="M 90 280 L 250 350 M 96 285 L 240 348" stroke="#475569" strokeWidth="0.9" strokeLinecap="round" strokeDasharray="35 9 20 6 50 12" opacity="0.35" />

            {/* Heavy abrasion scrape group */}
            <path d="M 250 25 L 310 65 M 255 27 L 314 67 M 260 32 L 298 59 M 262 28 L 318 69" stroke="#334155" strokeWidth="0.9" opacity="0.38" />
            <path d="M 60 25 L 110 45 M 64 28 L 105 44 M 66 23 L 115 47" stroke="#475569" strokeWidth="0.85" opacity="0.38" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patternId1})`} />
        <rect width="100%" height="100%" fill={`url(#${patternId2})`} />
      </svg>

      {/* Large Decorative Corner Scratches, Slash Cuts & Stencils */}
      {/* Top-Right Decorative Slash Cuts */}
      <div className="absolute -top-10 -right-10 w-[420px] h-[420px] opacity-45 pointer-events-none">
        <svg viewBox="0 0 320 320" className="w-full h-full stroke-slate-600">
          <path d="M 20 60 L 300 230" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="70 14 35 9 90 16" />
          <path d="M 45 52 L 310 215" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="45 16 80 12 55 14" />
          <path d="M 18 85 L 280 255" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="100 22 45 12" />
          <path d="M 100 35 L 290 165" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="35 9 60 14" />
          <path d="M 130 200 L 295 90" strokeWidth="1.4" strokeDasharray="30 12 50 10" />
          <path d="M 155 220 L 285 110" strokeWidth="0.9" strokeDasharray="40 14 25 8" />
        </svg>
      </div>

      {/* Bottom-Left Decorative Heavy Abrasion & Cross Scratches */}
      <div className="absolute -bottom-14 -left-14 w-[460px] h-[460px] opacity-40 pointer-events-none">
        <svg viewBox="0 0 320 320" className="w-full h-full stroke-slate-700">
          <path d="M 30 280 L 290 100" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="90 16 50 11 70 14" />
          <path d="M 16 260 L 275 80" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="55 14 80 9" />
          <path d="M 55 300 L 300 120" strokeWidth="1.9" strokeLinecap="round" strokeDasharray="110 28 40 16" />
          <path d="M 70 120 L 245 295" strokeWidth="1.3" strokeDasharray="45 12 55 16" />
          <path d="M 45 145 L 220 315" strokeWidth="1.0" strokeDasharray="35 9 65 14" />
        </svg>
      </div>

      {showCornerMarks && (
        <>
          {/* Subtle Maritime Cargo Crate Stencil Corner Marks */}
          <div className="absolute top-6 left-6 border-t-2 border-l-2 border-slate-500/35 w-14 h-14 pointer-events-none" />
          <div className="absolute top-6 right-6 border-t-2 border-r-2 border-slate-500/35 w-14 h-14 pointer-events-none" />
          <div className="absolute bottom-6 left-6 border-b-2 border-l-2 border-slate-500/35 w-14 h-14 pointer-events-none" />
          <div className="absolute bottom-6 right-6 border-b-2 border-r-2 border-slate-500/35 w-14 h-14 pointer-events-none" />
        </>
      )}
      
      {/* Subtle Cargo ID Stencil Watermark */}
      {stencilCode && (
        <div className="absolute top-8 left-24 text-[10px] font-mono tracking-widest text-slate-400/40 uppercase pointer-events-none hidden sm:block">
          {stencilCode}
        </div>
      )}
    </div>
  );
};
export default ScratchBackground;
