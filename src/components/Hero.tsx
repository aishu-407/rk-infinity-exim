import { motion } from 'motion/react';
import { Ship, ArrowUpRight, Landmark, Anchor, FileText } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';
import portImg from '../assets/images/international_cargo_port_1786224525379.jpg';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onSelectCategory: (cat: 'all' | 'export' | 'import') => void;
}

export default function Hero({ onNavigate, onSelectCategory }: HeroProps) {
  const handleCatalogClick = (cat: 'all' | 'export' | 'import') => {
    onSelectCategory(cat);
    onNavigate('catalog');
  };

  return (
    <section id="hero" className="relative bg-brand-slate text-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image with Deep Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=1600"
          alt="Ocean Cargo Container Vessel"
          className="w-full h-full object-cover object-center opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-indigo via-brand-slate to-brand-slate/85" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0b0f19] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-brand-gold/15 border border-brand-gold/30 text-brand-gold px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-sans"
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Registered Indian Merchant Exporter & Import Facilitator</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
                Connecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-amber-300">Global Markets</span> with Quality Products
              </h2>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl font-sans leading-relaxed">
                RK Infinity Exim is a premier global trade operator based in Pune, India. We excel in exporting high-grade agricultural commodities, dehydrated foods, and finished leather goods while importing critical vehicles, precision machinery components, and industrial raw materials.
              </p>
            </motion.div>

            {/* Credentials Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <span className="text-xs text-slate-400 font-mono uppercase tracking-widest block mr-2">Credentials:</span>
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1.5 bg-slate-800/80 border border-brand-gold/40 rounded-md px-3 py-1 text-xs font-semibold text-brand-gold shadow-sm font-sans">
                  <Landmark className="w-3.5 h-3.5 text-brand-gold" />
                  Government Recognized Merchant Exporter
                </span>
              </div>
            </motion.div>

            {/* Combined Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => onNavigate('quote')}
                className="bg-brand-gold hover:bg-amber-400 text-brand-slate font-sans font-bold py-3.5 px-6 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                id="hero-freight-quote-combined-btn"
              >
                <FileText className="w-4 h-4 text-brand-slate" />
                <span>Request Consignment Quote</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              
              <button
                onClick={() => handleCatalogClick('all')}
                className="bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white font-sans font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                id="hero-explore-catalog-btn"
              >
                <span>Explore Trade Catalog</span>
              </button>
            </motion.div>
          </div>

          {/* Hero Right: International Port Image Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="absolute inset-0 bg-brand-gold/15 rounded-3xl blur-2xl z-0" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/90 shadow-2xl group"
            >
              <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 overflow-hidden">
                <img
                  src={portImg}
                  alt="International Shipping & Maritime Cargo Terminal Port"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-90" />
                
                {/* Overlay Badge Header */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <span className="bg-slate-950/80 backdrop-blur-md text-brand-gold text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-brand-gold/30 flex items-center gap-2 shadow-lg">
                    <Anchor className="w-4 h-4 text-brand-gold" />
                    Global Port & Terminal Operations
                  </span>
                </div>

                {/* Overlay Footer Content */}
                <div className="absolute bottom-4 left-4 right-4 space-y-2 bg-slate-950/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 text-brand-gold font-mono text-[11px] font-bold uppercase tracking-widest">
                    <Ship className="w-3.5 h-3.5" />
                    Maritime & Container Logistics
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-white leading-snug">
                    International Shipping Hubs & Customs Operations
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Connecting global trade routes with seamless vessel loading, ocean freight facilitation, and container terminal clearance.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
