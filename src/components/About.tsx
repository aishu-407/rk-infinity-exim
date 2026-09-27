import { motion } from 'motion/react';
import { Award, Briefcase, Calendar, CheckCircle2, User, Warehouse, Landmark } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';
import logoImg from '../assets/images/rk_infinity_exim_logo_1783371814699.jpg';
import ScratchBackground from './ScratchBackground';

export default function About() {
  const pillars = [
    {
      title: "Quality First Sourcing",
      description: "Every shipment of agricultural spices, dehydrated foods, and finished leather hides undergoes comprehensive multi-stage laboratory testing to verify purity levels, moisture content, tensile durability, and absence of restricted substances.",
      icon: Award,
      color: "text-amber-600 bg-amber-50"
    },
    {
      title: "State-of-the-Art Storage",
      description: "Our modern storage facilities in Western India are equipped with specialized ventilation systems, pest barriers, and ambient humidity control to maintain freshness and nutritional integrity.",
      icon: Warehouse,
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      title: "Compliant Exporting",
      description: "We orchestrate end-to-end export compliance, standard shipping documentation, laboratory health reports, and customs clearances matching destination laws across Europe, North America, and the Middle East.",
      icon: CheckCircle2,
      color: "text-sky-600 bg-sky-50"
    }
  ];

  return (
    <section id="about" className="relative py-20 bg-slate-100/70 font-sans scroll-mt-28 overflow-hidden">
      <ScratchBackground idPrefix="about" stencilCode="EXIM-HQ // WHO-WE-ARE-01" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-brand-gold font-mono font-bold uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-4 tracking-tight">
            Connecting India's Agricultural Richness with Global Demands
          </h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 mt-4 text-base leading-relaxed">
            RK Infinity Exim has emerged as an authoritative figure in the international import-export ecosystem, driving robust supply chains from our headquarters in Pune, Maharashtra.
          </p>
        </div>

        {/* Leadership & Main Description Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-16">
          
          {/* Left Panel: Company Mission & Profile */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                A Message from Our Leadership
              </h3>
              
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="bg-brand-slate text-brand-gold p-3 rounded-full">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-display font-bold text-slate-900 text-lg">Rupesh Kupatkar</div>
                  <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">Founder & Proprietor</div>
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic">
                "Our business is built on trust, consistency, and a profound commitment to food security and engineering quality. We do not just trade goods; we build long-standing bilateral trade networks that support Indian farmers and optimize raw material costs for global manufacturers."
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-brand-gold shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400 font-mono uppercase tracking-widest">Quality Assurance</div>
                    <div className="text-sm font-semibold text-slate-900">100% Export Grade</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-brand-gold shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400 font-mono uppercase tracking-widest">Business Type</div>
                    <div className="text-sm font-semibold text-slate-900">Merchant Import & Export</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:col-span-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Landmark className="w-5 h-5 text-brand-gold shrink-0" />
                  <div>
                    <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">Trade Authorization</div>
                    <div className="text-sm font-bold text-slate-900 font-sans tracking-wide">Government Recognized Merchant Exporter</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 mt-8">
              <div className="text-xs text-slate-400 font-mono tracking-wider uppercase mb-3">Our Core Promise:</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                  Guaranteed Phytosanitary Cleanliness
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                  Verified Moisture-Proof Packing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                  Fully Transparent Freight Costs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                  Strict Anti-Caking & Anti-Mold Curing
                </li>
              </ul>
            </div>
          </div>

          {/* Right Panel: Operations Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {pillars.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex gap-4 hover:shadow-md transition-shadow"
                >
                  <div className={`p-3 rounded-xl h-fit shrink-0 ${pillar.color}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-slate-900 text-base">
                      {pillar.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Corporate Brand Identity Showcase */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-slate-100 bg-white p-2.5 shadow-md hover:scale-105 transition-transform duration-300">
              <img
                src={logoImg}
                alt="RK Infinity Exim Corporate Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="md:col-span-8 space-y-4">
            <span className="text-[10px] text-brand-gold font-mono font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-md">
              Official Seal of Trust
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
              RK Infinity Exim Pvt Ltd
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our official company emblem represents our unwavering dedication to global commerce. Featuring the dual elements of marine shipping and aerospace logistics, our emblem reflects our capabilities in orchestrating flawless multimodal freight operations across ocean channels and international trade routes.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700">
                <span className="text-slate-400 block font-normal text-[10px] uppercase font-mono tracking-wider font-semibold">Tagline</span>
                Connecting Markets, Delivering Trust
              </div>
              <div className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700">
                <span className="text-slate-400 block font-normal text-[10px] uppercase font-mono tracking-wider font-semibold">Color Palette</span>
                Navy Blue & Gold Accent
              </div>
              <div className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700">
                <span className="text-slate-400 block font-normal text-[10px] uppercase font-mono tracking-wider font-semibold">Trade Entity</span>
                Registered Merchant Exporter
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
