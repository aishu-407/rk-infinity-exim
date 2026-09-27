import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Eye, X, HelpCircle, FileSpreadsheet, Truck, ShieldAlert } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import ScratchBackground from './ScratchBackground';

interface CatalogProps {
  selectedCategory: 'all' | 'export' | 'import';
  onSelectCategory: (category: 'all' | 'export' | 'import') => void;
  onSelectProductForQuote: (productId: string, category: 'export' | 'import') => void;
}

export default function Catalog({ selectedCategory, onSelectCategory, onSelectProductForQuote }: CatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [headerBottom, setHeaderBottom] = useState(80);

  // Measure exact header bottom position when modal opens (without scroll listeners to avoid shaking)
  useEffect(() => {
    if (selectedProduct) {
      const measureHeader = () => {
        const header = document.querySelector('header');
        if (header) {
          const rect = header.getBoundingClientRect();
          setHeaderBottom(Math.round(rect.bottom));
        }
      };
      measureHeader();
      window.addEventListener('resize', measureHeader);
      return () => window.removeEventListener('resize', measureHeader);
    }
  }, [selectedProduct]);

  // Reset search on tab change
  useEffect(() => {
    setSearchQuery('');
  }, [selectedCategory]);

  // Lock body scrolling when modal opens using body.modal-open { overflow: hidden; }
  // Restore body scrolling when the modal closes
  useEffect(() => {
    if (selectedProduct) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [selectedProduct]);

  // Keyboard shortcut (Escape) to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProduct) {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery ||
                          product.name.toLowerCase().includes(searchLower) ||
                          product.tagline.toLowerCase().includes(searchLower) ||
                          product.description.toLowerCase().includes(searchLower) ||
                          (product.hsCode && product.hsCode.toLowerCase().includes(searchLower)) ||
                          product.features.some(f => f.toLowerCase().includes(searchLower)) ||
                          Object.entries(product.specifications).some(([k, v]) => 
                            k.toLowerCase().includes(searchLower) || v.toLowerCase().includes(searchLower)
                          );
    return matchesCategory && matchesSearch;
  });

  const handleInquiryRequest = (product: Product) => {
    setSelectedProduct(null);
    onSelectProductForQuote(product.id, product.category);
  };

  return (
    <section id="catalog" className="relative py-20 bg-slate-100/70 font-sans scroll-mt-28 overflow-hidden">
      <ScratchBackground idPrefix="catalog" stencilCode="EXIM-PORT-CRATE // SPEC-SEC-02" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs text-brand-gold font-mono font-bold uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full">
              Trade Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-4 tracking-tight">
              Premium Import & Export Catalog
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl text-sm sm:text-base">
              Browse our diverse, fully compliant product lines. Click on any item to view export quality specs, technical compliance data, and standard container MOQs.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by product, HS code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
              id="product-search-input"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Toggle Category Buttons */}
        <div className="flex flex-wrap gap-2.5 border-b border-slate-100 pb-6 mb-10">
          <button
            onClick={() => { onSelectCategory('all'); setSearchQuery(''); }}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none flex items-center gap-1.5 ${
              selectedCategory === 'all' && !searchQuery
                ? 'bg-brand-slate text-white shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/50'
            }`}
            id="filter-all-btn"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Show All Operations</span>
          </button>
          
          <button
            onClick={() => { onSelectCategory('export'); setSearchQuery(''); }}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none flex items-center gap-1.5 ${
              selectedCategory === 'export'
                ? 'bg-brand-gold text-brand-slate shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/50'
            }`}
            id="filter-export-btn"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>Export Portfolio (Agro & Finished Leather)</span>
          </button>

          <button
            onClick={() => { onSelectCategory('import'); setSearchQuery(''); }}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none flex items-center gap-1.5 ${
              selectedCategory === 'import'
                ? 'bg-brand-indigo text-slate-100 shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/50'
            }`}
            id="filter-import-btn"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
            <span>Import Industrial (World → India)</span>
          </button>
        </div>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl py-16 px-6 text-center max-w-md mx-auto">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h4 className="font-display font-bold text-slate-700 text-lg">No products found</h4>
            <p className="text-slate-500 text-xs mt-1.5">We could not find any products matching "{searchQuery}". Please try adjusting your search filters.</p>
            <button
              onClick={() => { setSearchQuery(''); onSelectCategory('all'); }}
              className="mt-4 text-xs font-semibold text-brand-gold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProduct(product);
                  }
                }}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-brand-gold/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
                id={`product-card-${product.id}`}
              >
                {/* Product Image Panel (Natural Widescreen Landscape - Not 1:1 Square) */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4">
                    {product.category === 'export' ? (
                      <span className="bg-amber-500 text-slate-900 text-[10px] font-bold font-mono uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm border border-amber-400">
                        Export Gate
                      </span>
                    ) : (
                      <span className="bg-indigo-600 text-white text-[10px] font-bold font-mono uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm border border-indigo-500">
                        Import Gate
                      </span>
                    )}
                  </div>

                  {product.hsCode && (
                    <div className="absolute bottom-3 right-3 bg-brand-slate/85 backdrop-blur-sm rounded px-2 py-0.5 text-[10px] text-slate-300 font-mono">
                      HS Code: {product.hsCode}
                    </div>
                  )}
                </div>

                {/* Product Card Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight group-hover:text-brand-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-brand-gold text-xs font-semibold mt-1 font-sans">
                      {product.tagline}
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm mt-3 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Quick features summary */}
                  <div className="mt-4 pt-4 border-t border-slate-50 space-y-1">
                    {product.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-500">
                        <span className="text-brand-gold mt-0.5">•</span>
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Button footer: View Specifications */}
                <div className="px-6 pb-6 pt-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="w-full bg-slate-50 group-hover:bg-brand-slate group-hover:text-white border border-slate-200/60 group-hover:border-brand-slate text-slate-700 text-xs font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                    id={`view-details-${product.id}`}
                    title="View Full Specifications & MOQ"
                  >
                    <Eye className="w-4 h-4 text-brand-gold" />
                    <span>View Specifications & MOQ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Detailed Specifications View - Positioned accurately below the header */}
        <AnimatePresence>
          {selectedProduct && (
            <div
              className="fixed inset-x-0 bottom-0 z-40 flex items-start justify-center p-3 sm:p-5 overflow-hidden"
              style={{
                position: 'fixed',
                top: `${headerBottom}px`,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              {/* Blurry frosted glass backdrop overlay (covers area below header) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-brand-slate/60 backdrop-blur-md transition-opacity"
                style={{
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              />

              {/* Modal Container: Horizontal widescreen pop-up positioned below header */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -6 }}
                transition={{ duration: 0.15 }}
                className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 relative z-10 flex flex-col w-full my-2 sm:my-3"
                style={{
                  width: 'min(94vw, 860px)',
                  maxWidth: '860px',
                  maxHeight: `calc(100vh - ${headerBottom + 28}px)`
                }}
              >
                {/* Header Row: Product Identity & Close Button */}
                <div className="p-4 sm:p-5 pb-3 sm:pb-4 border-b border-slate-100 flex justify-between items-start shrink-0 bg-white">
                  <div className="pr-6">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold font-mono tracking-widest uppercase px-2 py-0.5 rounded ${
                        selectedProduct.category === 'export' ? 'bg-amber-500 text-slate-900' : 'bg-sky-500 text-slate-900'
                      }`}>
                        {selectedProduct.category === 'export' ? 'EXPORT GATE' : 'IMPORT GATE'}
                      </span>
                      {selectedProduct.hsCode && (
                        <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">
                          HS Code: {selectedProduct.hsCode}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-brand-gold text-xs font-semibold mt-0.5">{selectedProduct.tagline}</p>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs focus:outline-none cursor-pointer shrink-0"
                    id="close-spec-modal"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Scrollable Horizontal 2-Column Content */}
                <div
                  className="overflow-y-auto p-4 sm:p-6 flex-grow overscroll-contain"
                  style={{ overflowY: 'auto' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                    
                    {/* Left Column: Commercial Overview, Origin, MOQ & Compliance */}
                    <div className="space-y-4">
                      {/* Description & Overview */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                        <h4 className="text-xs text-slate-400 font-mono uppercase tracking-widest flex items-center gap-1.5 mb-2">
                          <Truck className="w-3.5 h-3.5 text-brand-gold" />
                          Commodity & Trade Overview
                        </h4>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                          {selectedProduct.description}
                        </p>
                      </div>

                      {/* Commercial Details Grid */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-xs">
                          <span className="text-[10px] text-slate-400 font-mono uppercase block">Grade</span>
                          <span className="font-semibold text-slate-800">Export Certified</span>
                        </div>
                        {selectedProduct.origin && (
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-xs">
                            <span className="text-[10px] text-slate-400 font-mono uppercase block">Origin</span>
                            <span className="font-semibold text-slate-800 line-clamp-1">{selectedProduct.origin.split('/')[0]}</span>
                          </div>
                        )}
                        {selectedProduct.packaging && (
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-xs">
                            <span className="text-[10px] text-slate-400 font-mono uppercase block">Packaging</span>
                            <span className="font-semibold text-slate-800 line-clamp-1">{selectedProduct.packaging}</span>
                          </div>
                        )}
                        {selectedProduct.minOrderQuantity && (
                          <div className={`bg-amber-500/10 p-3 rounded-lg border border-amber-500/20 text-xs ${selectedProduct.packaging ? '' : 'col-span-2'}`}>
                            <span className="text-[10px] text-amber-900 font-mono uppercase block font-bold">MOQ</span>
                            <span className="font-bold text-amber-900">{selectedProduct.minOrderQuantity}</span>
                          </div>
                        )}
                      </div>

                      {/* Compliance Warranty */}
                      <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3.5 flex items-start gap-2.5">
                        <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <h6 className="text-xs font-bold text-slate-800">Compliance & Clearance Warranty</h6>
                          <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
                            {selectedProduct.id.includes('leather')
                              ? 'REACH, LWG, and CLE compliant with laboratory test reports prior to container stuffing.'
                              : 'Phytosanitary inspection, Fumigation, and SGS/Spice Board test certificates provided upon dispatch.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Technical & Quality Metrics & Features */}
                    <div className="space-y-4">
                      {/* Technical & Quality Metrics */}
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70">
                        <h5 className="font-display font-bold text-slate-900 text-xs sm:text-sm mb-2.5 flex items-center gap-1.5">
                          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                          Technical & Quality Metrics
                        </h5>
                        <div className="space-y-1.5 text-xs">
                          {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-1 border-b border-slate-200/50 last:border-0">
                              <span className="text-slate-500 font-medium">{key}</span>
                              <span className="text-slate-800 font-mono font-semibold text-right">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Purity & Processing Standards */}
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70">
                        <h5 className="font-display font-bold text-slate-900 text-xs sm:text-sm mb-2.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-3 bg-brand-gold rounded-full" />
                          Purity & Processing Standards
                        </h5>
                        <ul className="space-y-1.5">
                          {selectedProduct.features.map((feat, idx) => (
                            <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                              <span className="text-brand-gold font-bold">•</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Action Buttons: Close & Quotation Desk */}
                <div className="bg-slate-50 p-4 border-t border-slate-100 flex gap-2.5 justify-end items-center shrink-0">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer focus:outline-none"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleInquiryRequest(selectedProduct)}
                    className="bg-brand-gold hover:bg-amber-400 text-brand-slate text-xs font-bold py-2 px-4 rounded-lg transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer focus:outline-none"
                    id="spec-modal-quote-cta"
                  >
                    <span>Quotation Desk</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
