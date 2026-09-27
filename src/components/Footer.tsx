import { Ship, Mail, Phone, MapPin, ExternalLink, Anchor, FileCheck, Landmark } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';
import logoImg from '../assets/images/rk_infinity_exim_logo_1783371814699.jpg';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Create WhatsApp pre-filled chat link
  const whatsappMessage = encodeURIComponent(`Hello, I visited your RK Infinity Exim website and would like to request an export quote.`);
  const whatsappUrl = `https://wa.me/918999924346?text=${whatsappMessage}`;

  return (
    <footer className="bg-brand-slate text-slate-300 font-sans border-t border-slate-800">
      
      {/* Upper Footer Segment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Column 1: Brand & Address */}
          <div className="md:col-span-4 space-y-6">
            <button
              onClick={() => onNavigate('hero')}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
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
                <h3 className="font-display font-bold text-base sm:text-lg text-white tracking-tight leading-none">
                  RK Infinity Exim
                </h3>
                <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block mt-0.5">
                  Connecting Markets
                </span>
              </div>
            </button>

            <p className="text-xs text-slate-400 leading-relaxed">
              We operate standard bilateral commodity trading channels out of Pune, India, backed by verified warehouses and tier-1 port clearances.
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-normal">{COMPANY_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phone}`} className="hover:text-brand-gold transition-colors">
                  {COMPANY_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-brand-gold transition-colors">
                  {COMPANY_DETAILS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="font-display font-bold text-white text-xs sm:text-sm uppercase tracking-wider">
              Company Sitemap
            </h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-400">
              <button type="button" onClick={() => onNavigate('hero')} className="text-left hover:text-brand-gold transition-colors cursor-pointer">
                Home
              </button>
              <button type="button" onClick={() => onNavigate('catalog')} className="text-left hover:text-brand-gold transition-colors cursor-pointer">
                Product Catalog
              </button>
              <button type="button" onClick={() => onNavigate('finance')} className="text-left hover:text-brand-gold transition-colors cursor-pointer">
                Payment Protocols
              </button>
              <button type="button" onClick={() => onNavigate('about')} className="text-left hover:text-brand-gold transition-colors cursor-pointer">
                About Us (Corporate Profile)
              </button>
            </div>
          </div>

          {/* Column 3: Contact & Instant WhatsApp Support */}
          <div className="md:col-span-5 space-y-6">
            <h4 className="font-display font-bold text-white text-xs sm:text-sm uppercase tracking-wider">
              Instant Chat Support
            </h4>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Have an urgent shipment inquiry? Click below to immediately start a secure business dialogue directly with Rupesh Kupatkar over WhatsApp.
            </p>

            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-3 px-5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md w-full sm:w-fit"
                id="footer-whatsapp-chat-btn"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
                </span>
                <span>Launch WhatsApp Dialogue</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="text-[10px] text-slate-500 italic">
                WhatsApp Hotline: +91 8999924346 • Average reply time under 2 hours
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory/Registration Credentials Row */}
        <div className="border-t border-slate-800 mt-12 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2.5 bg-slate-900/30 p-3 rounded-lg border border-slate-800/60">
            <FileCheck className="w-5 h-5 text-brand-gold shrink-0" />
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">IEC (Import Export Code)</span>
              <span className="font-semibold text-slate-300">Available for Contract Signing</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-900/30 p-3 rounded-lg border border-slate-800/60">
            <Landmark className="w-5 h-5 text-brand-gold shrink-0" />
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Trade Status</span>
              <span className="font-semibold text-slate-300">Registered Merchant Exporter</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-900/30 p-3 rounded-lg border border-slate-800/60">
            <Anchor className="w-5 h-5 text-brand-gold shrink-0" />
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Port Operations</span>
              <span className="font-semibold text-slate-300">JNPT & Mundra Gateway</span>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="bg-slate-950 py-6 px-4 border-t border-slate-900 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            © {currentYear} {COMPANY_DETAILS.name}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-600">
            <span className="hover:text-slate-400 transition-colors">Merchant Exporter Code Compliant</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors">Port Logistical Standard Clearance Approved</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
