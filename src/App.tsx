/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Catalog from './components/Catalog';
import LogisticsMap from './components/LogisticsMap';
import QuoteEstimator from './components/QuoteEstimator';
import TradeFinancialFrameworks from './components/TradeFinancialFrameworks';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'export' | 'import'>('all');
  
  // States to prefill the Quote Calculator when requesting from Catalog Specs
  const [prefilledProductId, setPrefilledProductId] = useState<string>('');
  const [prefilledCategory, setPrefilledCategory] = useState<'export' | 'import' | null>(null);

  // Scroll Tracking to update Navigation Highlights dynamically
  useEffect(() => {
    const handleScroll = () => {
      // If at bottom of page, highlight 'about'
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('about');
        return;
      }

      const sections = ['hero', 'catalog', 'quote', 'finance', 'logistics', 'about'];
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 70;
      const topBanner = document.querySelector('.bg-brand-slate.text-slate-300');
      const bannerHeight = topBanner ? topBanner.getBoundingClientRect().height : 32;
      const scrollPos = window.scrollY + headerHeight + bannerHeight + 20;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Precise Navigation Trigger - Stops at exact section header without overshooting or getting hidden behind header
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = (sectionId === 'network') ? 'logistics' : sectionId;
    const element = document.getElementById(targetId);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 70;
      const topBanner = document.querySelector('.bg-brand-slate.text-slate-300');
      const bannerHeight = topBanner ? topBanner.getBoundingClientRect().height : 32;
      const totalOffset = headerHeight + bannerHeight;

      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const targetScroll = Math.max(0, elementTop - totalOffset);

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // Pre-fill trade quote calculator and scroll there
  const handleSelectProductForQuote = (productId: string, category: 'export' | 'import') => {
    setPrefilledProductId(productId);
    setPrefilledCategory(category);
    handleNavigate('quote');
  };

  const handleClearPrefilled = () => {
    setPrefilledProductId('');
    setPrefilledCategory(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-brand-gold/30 selection:text-brand-slate">
      {/* Dynamic Header */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Sections Layout */}
      <main className="flex-grow">
        {/* Hero Area */}
        <Hero 
          onNavigate={handleNavigate} 
          onSelectCategory={(cat) => setSelectedCategory(cat)} 
        />

        {/* Interactive Trade Catalog */}
        <Catalog 
          selectedCategory={selectedCategory} 
          onSelectCategory={(cat) => setSelectedCategory(cat)} 
          onSelectProductForQuote={handleSelectProductForQuote}
        />

        {/* Interactive Trading Desk: Freight Quote Calculator & Inquiry Form */}
        <QuoteEstimator 
          prefilledProductId={prefilledProductId}
          prefilledCategory={prefilledCategory}
          onClearPrefilled={handleClearPrefilled}
        />

        {/* Financial Security & Settlement Protocols (Bilateral Payment Frameworks) */}
        <TradeFinancialFrameworks onNavigateToQuote={() => handleNavigate('quote')} />

        {/* Ocean Route Logistics & Shipping Gateway */}
        <LogisticsMap />

        {/* Company Profile (About Us) */}
        <About />
      </main>

      {/* Regulatory compliant Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
