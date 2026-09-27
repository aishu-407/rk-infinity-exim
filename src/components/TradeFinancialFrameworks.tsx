import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Landmark, 
  FileCheck, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  Building, 
  Lock, 
  Scale, 
  FileText, 
  Globe2, 
  BadgeCheck, 
  HelpCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { PAYMENT_TERMS } from '../data';

interface TradeFinancialFrameworksProps {
  onNavigateToQuote?: () => void;
}

const SETTLEMENT_CURRENCIES = [
  {
    code: "USD",
    name: "United States Dollar",
    symbol: "$",
    status: "Global Benchmark",
    corridor: "Universal Global Trade",
    description: "Standard international SWIFT settlement accepted across all continents, clearing through Tier-1 correspondent banks."
  },
  {
    code: "AED",
    name: "United Arab Emirates Dirham",
    symbol: "د.إ",
    status: "Bilateral LCS Corridors",
    corridor: "India - UAE CEPA Framework",
    description: "Direct local currency settlement mechanism bypassing third-currency conversions under the India-UAE trade pact."
  },
  {
    code: "INR",
    name: "Indian Rupee (Special Vostro)",
    symbol: "₹",
    status: "RBI Approved Mechanism",
    corridor: "Special Rupee Vostro Accounts (SRVA)",
    description: "Facilitating bilateral trade settlement directly in Indian Rupees through authorized dealer banks with partner nations."
  },
  {
    code: "EUR / GBP",
    name: "Euro & British Pound",
    symbol: "€ / £",
    status: "Direct SEPA & BACS",
    corridor: "European & UK Corridors",
    description: "Expedited single-currency settlement channels for European industrial imports and premium leather exports."
  }
];

const TRADE_ASSURANCE_PILLARS = [
  {
    icon: Landmark,
    title: "ICC UCP 600 Compliance",
    desc: "All documentary letters of credit are strictly governed by the International Chamber of Commerce Uniform Customs & Practice for Documentary Credits."
  },
  {
    icon: ShieldCheck,
    title: "ECGC Sovereign Risk Cover",
    desc: "Export contracts can be backed by Export Credit Guarantee Corporation of India (ECGC), providing comprehensive commercial and political credit risk insurance."
  },
  {
    icon: FileCheck,
    title: "SGS / Independent Inspection",
    desc: "Consignment quality, weight, and moisture parameters are verified by pre-shipment inspection agencies (SGS, Geo-Chem, or buyer-nominated inspectors) prior to document release."
  },
  {
    icon: Scale,
    title: "Marine Cargo All-Risk Insurance",
    desc: "CIF shipments are fully protected under Institute Cargo Clauses (A) door-to-port coverage, securing consignments against ocean perils, piracy, and jettison."
  }
];

const SETTLEMENT_LIFECYCLE_STEPS = [
  {
    step: "01",
    title: "Pro-Forma & Sales Contract",
    description: "Mutual agreement on commodity specifications, Incoterms (FOB/CIF), pricing, and delivery schedule. Signed Pro-Forma Invoice issued.",
    responsible: "Buyer & Exporter"
  },
  {
    step: "02",
    title: "Financial Instrument Establishment",
    description: "Buyer opens an Irrevocable L/C at Sight through their issuing bank or remits the initial 30% T/T deposit via swift wire transfer.",
    responsible: "Buyer's Bank"
  },
  {
    step: "03",
    title: "Quality Inspection & Port Staging",
    description: "Goods staged at bonded CFS (JNPT/Mundra). Third-party SGS quality tests performed, Phytosanitary and customs clearance completed.",
    responsible: "Customs & Inspection"
  },
  {
    step: "04",
    title: "Bill of Lading & Document Presentation",
    description: "Vessel loads containers. Carrier issues Clean on Board Ocean Bill of Lading (B/L). Full document set presented to negotiating bank.",
    responsible: "Shipping Line & Bank"
  },
  {
    step: "05",
    title: "Liquidation & Cargo Title Handover",
    description: "Bank verifies clean document presentation under UCP 600 rules, releases original title documents to buyer, and settles funds.",
    responsible: "Consignee Bank"
  }
];

export default function TradeFinancialFrameworks({ onNavigateToQuote }: TradeFinancialFrameworksProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [activeTab, setActiveTab] = useState<'methods' | 'corridors' | 'lifecycle'>('methods');

  return (
    <section id="finance" className="py-20 bg-slate-900 text-white font-sans overflow-hidden border-t border-slate-800 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-brand-gold/30 text-brand-gold text-xs font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            <Coins className="w-3.5 h-3.5 text-brand-gold" />
            Financial Security & Settlement Protocols
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Bilateral Payment & Trade Financial Frameworks
          </h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 text-xs sm:text-sm leading-relaxed">
            Verified international banking mechanisms, ICC UCP 600 standard trade instruments, and bilateral currency clearing channels engineered to guarantee complete counterparty liquidity, transparency, and documentation integrity.
          </p>

          {/* Navigation Sub-Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('methods')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none ${
                activeTab === 'methods'
                  ? 'bg-brand-gold text-brand-slate shadow-md font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              id="fin-tab-methods"
            >
              Payment Instruments & Terms
            </button>
            <button
              onClick={() => setActiveTab('corridors')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none ${
                activeTab === 'corridors'
                  ? 'bg-brand-gold text-brand-slate shadow-md font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              id="fin-tab-corridors"
            >
              Bilateral Currency Corridors
            </button>
            <button
              onClick={() => setActiveTab('lifecycle')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none ${
                activeTab === 'lifecycle'
                  ? 'bg-brand-gold text-brand-slate shadow-md font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              id="fin-tab-lifecycle"
            >
              Trade Settlement Lifecycle
            </button>
          </div>
        </div>

        {/* Tab 1: Payment Instruments & Terms */}
        {activeTab === 'methods' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PAYMENT_TERMS.map((term, index) => (
                <div
                  key={index}
                  className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 hover:border-brand-gold/40 transition-all flex flex-col justify-between shadow-xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-bl-full pointer-events-none transition-all group-hover:bg-brand-gold/10" />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="bg-amber-500/10 p-2.5 rounded-xl text-brand-gold border border-brand-gold/20">
                        <Landmark className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
                        {term.rating}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-gold transition-colors">
                        {term.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {term.description}
                      </p>
                    </div>

                    <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800/80">
                      <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-semibold">
                        Risk Mitigation:
                      </div>
                      <div className="text-xs text-slate-200 mt-0.5 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{term.protection}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 relative z-10">
                    <span className="font-mono text-[11px] text-slate-400">Standard for Global Trade</span>
                    {onNavigateToQuote && (
                      <button
                        onClick={onNavigateToQuote}
                        className="text-brand-gold hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer focus:outline-none"
                      >
                        <span>Estimate Fee</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Institutional Trade Assurance Pillars */}
            <div className="bg-slate-950/40 rounded-2xl border border-slate-800 p-6 sm:p-8">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                  Institutional Trade Assurance & Risk Governance
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Every export transaction is executed in conformity with global trade conventions and sovereign credit guarantees.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {TRADE_ASSURANCE_PILLARS.map((pillar, i) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={i} className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-brand-gold flex items-center justify-center border border-brand-gold/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-white">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Bilateral Currency Corridors */}
        {activeTab === 'corridors' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Currency Selector Buttons */}
              <div className="lg:col-span-5 space-y-3">
                <div className="text-xs text-slate-400 font-mono uppercase tracking-widest mb-2 font-semibold">
                  Select Bilateral Settlement Channel:
                </div>
                {SETTLEMENT_CURRENCIES.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => setSelectedCurrency(curr.code)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 cursor-pointer focus:outline-none ${
                      selectedCurrency === curr.code
                        ? 'bg-amber-500/10 border-brand-gold text-white shadow-lg'
                        : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-lg font-bold font-mono shrink-0 ${
                      selectedCurrency === curr.code
                        ? 'bg-brand-gold text-brand-slate'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {curr.symbol}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-sm text-white">{curr.name}</span>
                        <span className="text-[10px] font-mono text-brand-gold font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-brand-gold/20">{curr.code}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 font-sans">{curr.corridor}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Column: Detailed Corridor Specs */}
              <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
                {(() => {
                  const curr = SETTLEMENT_CURRENCIES.find(c => c.code === selectedCurrency) || SETTLEMENT_CURRENCIES[0];
                  return (
                    <>
                      <div className="flex justify-between items-start border-b border-slate-800 pb-5">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-mono font-bold text-brand-gold">{curr.symbol}</span>
                            <h3 className="text-xl font-display font-extrabold text-white">{curr.name} ({curr.code})</h3>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{curr.corridor}</p>
                        </div>
                        <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                          {curr.status}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {curr.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">SWIFT / Correspondent Network</div>
                          <div className="text-xs font-semibold text-white">Tier-1 International Clearances</div>
                          <p className="text-[11px] text-slate-400">Direct MT103 wire transfers & MT700 L/C authentication messages.</p>
                        </div>
                        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Foreign Exchange Hedging</div>
                          <div className="text-xs font-semibold text-white">Spot & Forward Rate Locks</div>
                          <p className="text-[11px] text-slate-400">Mitigates cross-currency volatility during ocean transit periods.</p>
                        </div>
                      </div>

                      <div className="bg-amber-500/5 border border-brand-gold/20 rounded-xl p-4 flex items-start gap-3">
                        <BadgeCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                        <div className="text-xs text-slate-300 leading-relaxed">
                          <span className="text-white font-bold block mb-0.5">India-UAE CEPA Bilateral Advantage:</span>
                          Under the bilateral framework, transactions in AED/INR eliminate intermediary exchange spread fees, accelerating settlement confirmation from days to hours.
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Trade Settlement Lifecycle */}
        {activeTab === 'lifecycle' && (
          <div className="bg-slate-950/60 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <h3 className="text-xl font-display font-bold text-white">
                Step-by-Step Documentary Settlement Lifecycle
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                How funds and international shipping documents move securely from purchase order to final port release.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {SETTLEMENT_LIFECYCLE_STEPS.map((step, idx) => (
                <div 
                  key={step.step}
                  className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between relative group hover:border-brand-gold/40 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-display font-black text-brand-gold/40 group-hover:text-brand-gold transition-colors font-mono">
                        {step.step}
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-wider bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        {step.responsible}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-white">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-brand-gold shrink-0" />
                <span className="text-slate-300">
                  Documentation Pack Dispatched: <strong className="text-white">Clean on Board B/L, Commercial Invoice, Packing List, Certificate of Origin & Phytosanitary Certificate.</strong>
                </span>
              </div>
              {onNavigateToQuote && (
                <button
                  onClick={onNavigateToQuote}
                  className="bg-brand-gold hover:bg-amber-400 text-brand-slate font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Request Commercial Quotation
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
