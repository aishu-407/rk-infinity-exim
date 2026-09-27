import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ship, Menu, X, Globe, Phone, Mail, Clock } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';
import logoImg from '../assets/images/rk_infinity_exim_logo_1783371814699.jpg';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeIndia, setTimeIndia] = useState('');
  const [timeGulf, setTimeGulf] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const updateClocks = () => {
      const now = new Date();
      
      // Indian Standard Time (IST - UTC+5.5)
      const istOptions = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } as const;
      setTimeIndia(now.toLocaleTimeString('en-US', istOptions));

      // Gulf Standard Time (GST - UAE - UTC+4)
      const gstOptions = { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', hour12: false } as const;
      setTimeGulf(now.toLocaleTimeString('en-US', gstOptions));
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'finance', label: 'Payment Protocols' },
    { id: 'about', label: 'About' },
  ];

  const isItemActive = (id: string) => {
    if (id === 'finance') {
      return activeSection === 'finance' || activeSection === 'logistics';
    }
    return activeSection === id;
  };

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Top Banner with Quick Contacts & Timezones */}
      <div className="bg-brand-slate text-slate-300 text-xs py-2 px-4 border-b border-slate-800 flex flex-wrap justify-between items-center gap-2 font-sans relative z-50">
        <div className="flex items-center gap-4 flex-wrap">
          <a href={`tel:${COMPANY_DETAILS.phone}`} className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
            <Phone className="w-3 h-3 text-brand-gold" />
            <span>{COMPANY_DETAILS.phone}</span>
          </a>
          <a href={`mailto:${COMPANY_DETAILS.email}`} className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
            <Mail className="w-3.5 h-3.5 text-brand-gold" />
            <span>{COMPANY_DETAILS.email}</span>
          </a>
        </div>
        
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400" />
            <span>IST (IN): <span className="font-mono text-slate-200">{timeIndia || 'Loading...'}</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <Globe className="w-3 h-3 text-sky-400" />
            <span>GST (UAE): <span className="font-mono text-slate-200">{timeGulf || 'Loading...'}</span></span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-slate/95 backdrop-blur-md shadow-lg border-b border-slate-800 py-3'
            : 'bg-brand-slate py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            id="header-logo-btn"
          >
            <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-slate-700/60 bg-white p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <img
                src={logoImg}
                alt="RK Infinity Exim Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-white tracking-tight leading-none">
                RK Infinity Exim
              </h1>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block mt-0.5">
                Connecting Markets
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-6">
            {navItems.map((item) => {
              const active = isItemActive(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.id)}
                  className={`font-sans text-xs lg:text-sm font-medium transition-all relative py-1 cursor-pointer focus:outline-none whitespace-nowrap ${
                    active
                      ? 'text-brand-gold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
            
            <button
              type="button"
              onClick={() => handleLinkClick('quote')}
              className="bg-brand-gold text-brand-slate font-sans font-bold text-xs py-2 px-3.5 rounded-md hover:bg-amber-400 transition-all shadow-md focus:outline-none hover:-translate-y-0.5 cursor-pointer whitespace-nowrap ml-1"
              id="header-quote-cta"
            >
              Request Free Quote
            </button>
          </nav>

          {/* Hamburger Menu Toggle */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle menu"
              id="mobile-menu-toggle-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-brand-slate border-b border-slate-800 overflow-hidden sticky top-[52px] z-30"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => {
                const active = isItemActive(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleLinkClick(item.id)}
                    className={`w-full text-left py-2.5 px-3 rounded-md text-sm font-medium transition-colors block cursor-pointer focus:outline-none ${
                      active
                        ? 'bg-amber-500/10 text-brand-gold font-semibold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    id={`mobile-nav-link-${item.id}`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 px-3 border-t border-slate-800">
                <button
                  onClick={() => handleLinkClick('quote')}
                  className="w-full bg-brand-gold hover:bg-amber-400 text-brand-slate text-center font-bold text-sm py-2.5 rounded-md transition-colors shadow-md block cursor-pointer focus:outline-none"
                  id="mobile-header-quote-cta"
                >
                  Request Free Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
