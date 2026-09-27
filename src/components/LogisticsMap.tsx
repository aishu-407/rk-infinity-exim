import { useState } from 'react';
import { 
  Anchor, 
  Compass, 
  Globe2, 
  Ship 
} from 'lucide-react';
import { SHIPPING_PORTS, EXPORT_MARKETS } from '../data';

export default function LogisticsMap() {
  const [selectedPort, setSelectedPort] = useState<string>(SHIPPING_PORTS[2].name); // Nhava Sheva as default
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <section id="logistics" className="py-20 bg-brand-slate text-white font-sans overflow-hidden relative scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-brand-gold font-mono font-bold uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-brand-gold/20">
            Logistics & Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-4 tracking-tight">
            Seamless Gateway from Indian Ports to World Capitals
          </h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            RK Infinity Exim leverages strategic relationships with premium shipping lines and customs clearing houses across four core maritime terminals in India.
          </p>
        </div>

        {/* 1. UPPER SECTION: Indian Embarkation Ports */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Anchor className="w-5 h-5 text-brand-gold" />
                Indian Embarkation Ports
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Strategic maritime exit terminals and specialized logistics container facilities across India:
              </p>
            </div>
            <span className="text-[11px] font-mono text-brand-gold">
              Active Terminal Selected: <strong className="text-white">{selectedPort}</strong>
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SHIPPING_PORTS.map((port) => {
              const isSelected = selectedPort === port.name;
              return (
                <button
                  key={port.name}
                  onClick={() => setSelectedPort(port.name)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col justify-between cursor-pointer focus:outline-none ${
                    isSelected
                      ? 'bg-amber-500/15 border-brand-gold text-white shadow-lg shadow-brand-gold/10 -translate-y-1'
                      : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                  id={`port-select-${port.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-brand-gold text-brand-slate' : 'bg-slate-800 text-slate-400'}`}>
                      <Ship className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-brand-gold uppercase tracking-wider bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/25">
                      {port.location}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{port.name}</h4>
                    <p className="text-xs text-slate-400 leading-normal mt-1.5 line-clamp-2">{port.highlight}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. CENTER SECTION: LOGISTICS SCHEMATIC MAP */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center relative min-h-[440px] shadow-2xl mb-12">
          <div className="w-full flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3 flex-wrap gap-2">
            <div className="bg-slate-900/90 border border-slate-800 rounded px-3 py-1 text-[10px] text-slate-300 font-mono flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-brand-gold animate-spin" style={{ animationDuration: '8s' }} />
              <span className="font-bold tracking-wider">LOGISTICS SCHEMATIC MAP</span>
              <span className="text-slate-500">|</span>
              <span className="text-brand-gold">{selectedPort} Gateway</span>
            </div>

            <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
              <span>SECURE GPS TRACKING ACTIVE</span>
            </div>
          </div>

          {/* Custom Interactive SVG */}
          <svg viewBox="0 0 800 400" className="w-full h-auto max-w-[750px] relative z-0 text-slate-600 my-2">
            {/* stylized background ocean contour rings */}
            <circle cx="380" cy="240" r="120" stroke="rgba(217, 119, 6, 0.03)" fill="none" strokeWidth="1" />
            <circle cx="380" cy="240" r="180" stroke="rgba(217, 119, 6, 0.02)" fill="none" strokeWidth="1" />
            
            {/* World outline connectors (abstract grid style) */}
            <g stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="5,5">
              <line x1="100" y1="0" x2="100" y2="400" />
              <line x1="240" y1="0" x2="240" y2="400" />
              <line x1="380" y1="0" x2="380" y2="400" />
              <line x1="520" y1="0" x2="520" y2="400" />
              <line x1="660" y1="0" x2="660" y2="400" />
              <line x1="0" y1="100" x2="800" y2="100" />
              <line x1="0" y1="240" x2="800" y2="240" />
            </g>

            {/* India Central Node */}
            <g className="cursor-pointer">
              {/* Pulse Glow */}
              <circle cx="380" cy="240" r="14" fill="rgba(217,119,6,0.15)" className="animate-pulse" />
              <circle cx="380" cy="240" r="6" fill="#d97706" />
              <text x="380" y="270" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">
                INDIA GATEWAY
              </text>
              <text x="380" y="285" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                ({selectedPort})
              </text>
            </g>

            {/* Shipping Lanes (Lines radiating from India) */}
            {/* Lane 1: Gulf / Middle East (UAE, Oman, Qatar, Saudi Arabia) */}
            <path
              d="M 380 240 Q 280 210 210 190"
              fill="none"
              stroke={hoveredCountry === "UAE" || hoveredCountry === "Saudi Arabia" || hoveredCountry === "Oman" || hoveredCountry === "Qatar" ? "#d97706" : "rgba(217,119,6,0.25)"}
              strokeWidth={hoveredCountry === "UAE" || hoveredCountry === "Saudi Arabia" || hoveredCountry === "Oman" || hoveredCountry === "Qatar" ? "2.5" : "1.5"}
              strokeDasharray="6,4"
            />
            <circle cx="210" cy="190" r="4" fill={hoveredCountry === "UAE" || hoveredCountry === "Saudi Arabia" || hoveredCountry === "Oman" || hoveredCountry === "Qatar" ? "#f59e0b" : "#64748b"} />
            <text x="195" y="175" textAnchor="middle" fill={hoveredCountry === "UAE" || hoveredCountry === "Saudi Arabia" || hoveredCountry === "Oman" || hoveredCountry === "Qatar" ? "#f59e0b" : "#94a3b8"} fontSize="10" fontFamily="sans-serif" fontWeight="bold">
              MIDDLE EAST
            </text>

            {/* Lane 2: Southeast Asia (Singapore, Malaysia) */}
            <path
              d="M 380 240 Q 480 280 570 300"
              fill="none"
              stroke={hoveredCountry === "Singapore" || hoveredCountry === "Malaysia" ? "#d97706" : "rgba(217,119,6,0.25)"}
              strokeWidth={hoveredCountry === "Singapore" || hoveredCountry === "Malaysia" ? "2.5" : "1.5"}
              strokeDasharray="6,4"
            />
            <circle cx="570" cy="300" r="4" fill={hoveredCountry === "Singapore" || hoveredCountry === "Malaysia" ? "#f59e0b" : "#64748b"} />
            <text x="590" y="320" textAnchor="middle" fill={hoveredCountry === "Singapore" || hoveredCountry === "Malaysia" ? "#f59e0b" : "#94a3b8"} fontSize="10" fontFamily="sans-serif" fontWeight="bold">
              SOUTHEAST ASIA
            </text>

            {/* Lane 3: United Kingdom (Europe) */}
            <path
              d="M 380 240 C 260 160 180 120 140 80"
              fill="none"
              stroke={hoveredCountry === "United Kingdom" ? "#d97706" : "rgba(217,119,6,0.25)"}
              strokeWidth={hoveredCountry === "United Kingdom" ? "2.5" : "1.5"}
              strokeDasharray="6,4"
            />
            <circle cx="140" cy="80" r="4" fill={hoveredCountry === "United Kingdom" ? "#f59e0b" : "#64748b"} />
            <text x="140" y="65" textAnchor="middle" fill={hoveredCountry === "United Kingdom" ? "#f59e0b" : "#94a3b8"} fontSize="10" fontFamily="sans-serif" fontWeight="bold">
              EUROPE (UK)
            </text>

            {/* Lane 4: Canada (North America) */}
            <path
              d="M 380 240 C 280 120 160 80 80 140"
              fill="none"
              stroke={hoveredCountry === "Canada" ? "#d97706" : "rgba(217,119,6,0.25)"}
              strokeWidth={hoveredCountry === "Canada" ? "2.5" : "1.5"}
              strokeDasharray="6,4"
            />
            <circle cx="80" cy="140" r="4" fill={hoveredCountry === "Canada" ? "#f59e0b" : "#64748b"} />
            <text x="80" y="125" textAnchor="middle" fill={hoveredCountry === "Canada" ? "#f59e0b" : "#94a3b8"} fontSize="10" fontFamily="sans-serif" fontWeight="bold">
              NORTH AMERICA
            </text>
          </svg>

          <div className="mt-4 p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-center text-xs text-slate-400 max-w-xl">
            <span className="text-white font-semibold">Active Lane Highlight: </span>
            {hoveredCountry ? (
              <span>Express oceanic routing to <span className="text-brand-gold font-bold">{hoveredCountry}</span> has prioritized maritime clearances via <strong className="text-white">{selectedPort}</strong> container berths.</span>
            ) : (
              <span>Hover over any of the export destination markets below to illuminate transit lanes and expected ocean transit durations.</span>
            )}
          </div>
        </div>

        {/* 3. BOTTOM SECTION: Active Bilateral Export Markets */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-brand-gold" />
                Active Bilateral Export Markets
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Select or hover on any destination country below to inspect average oceanic transit windows from India:
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              8 Global Corridors Serviced
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {EXPORT_MARKETS.map((m) => (
              <div
                key={m.country}
                onMouseEnter={() => setHoveredCountry(m.country)}
                onMouseLeave={() => setHoveredCountry(null)}
                className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                  hoveredCountry === m.country
                    ? 'bg-amber-500/15 border-brand-gold scale-105 shadow-lg shadow-brand-gold/10'
                    : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="text-2xl mb-1.5">{m.flag}</div>
                <div className="text-xs font-bold text-white leading-tight line-clamp-1">{m.country}</div>
                <div className="text-[10px] text-brand-gold font-mono font-semibold mt-1.5 uppercase tracking-wider bg-brand-gold/10 py-0.5 rounded border border-brand-gold/20">
                  {m.transitTime}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
