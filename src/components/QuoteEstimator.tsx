import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Send, 
  Truck, 
  ClipboardCheck, 
  Phone, 
  Mail, 
  CheckCircle2, 
  MessageCircle, 
  Package, 
  Ship, 
  ShieldCheck,
  Building2,
  User,
  ExternalLink,
  MapPin,
  Clock,
  HelpCircle,
  Copy,
  Check,
  Upload,
  FileUp,
  Paperclip,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sliders,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { PRODUCTS, EXPORT_MARKETS, SHIPPING_PORTS, COMPANY_DETAILS, PAYMENT_TERMS } from '../data';
import { TradeInquiry, Product } from '../types';
import ScratchBackground from './ScratchBackground';

interface QuoteEstimatorProps {
  prefilledProductId?: string;
  prefilledCategory?: 'export' | 'import' | null;
  onClearPrefilled?: () => void;
}

interface UploadedFileState {
  name: string;
  size: string;
  type: string;
  previewUrl?: string;
}

export default function QuoteEstimator({ prefilledProductId, prefilledCategory, onClearPrefilled }: QuoteEstimatorProps) {
  // Stepper State: Step 1 (Product) -> Step 2 (Contact) -> Step 3 (Submit)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // 5 Core Required Fields:
  // 1. Product (category + productId)
  // 2. Destination Country
  // 3. Quantity (weightKg + weightUnit)
  // 4. Name (fullName)
  // 5. WhatsApp or Email (whatsapp / email)
  const [productType, setProductType] = useState<'export' | 'import'>('export');
  const [selectedProductId, setSelectedProductId] = useState<string>('exp_turmeric');
  const [destination, setDestination] = useState<string>('UAE');
  const [weightKg, setWeightKg] = useState<number>(25000); // Default to 25 MT (1 FCL)
  const [weightUnit, setWeightUnit] = useState<'kg' | 'MT'>('MT');
  
  // Contact Fields
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');

  // Upload Requirement (RFQ / Purchase Order / Product Image)
  const [uploadedFile, setUploadedFile] = useState<UploadedFileState | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Advanced Options (Hidden by default under accordion)
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [shippingTerm, setShippingTerm] = useState<'FOB' | 'CIF'>('CIF');
  const [paymentTerm, setPaymentTerm] = useState<string>('Irrevocable Letter of Credit (L/C at Sight)');
  const [customHsCode, setCustomHsCode] = useState<string>('');
  const [packagingInstructions, setPackagingInstructions] = useState<string>('');

  // UI & Validation States
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<TradeInquiry | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Lock body scrolling when success modal opens
  useEffect(() => {
    if (showSuccessModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showSuccessModal]);

  // Handle prefilled products from the Catalog modal
  useEffect(() => {
    if (prefilledCategory) {
      setProductType(prefilledCategory);
    }
    if (prefilledProductId) {
      setSelectedProductId(prefilledProductId);
      if (prefilledCategory === 'import') {
        setDestination('Nhava Sheva Port (JNPT)');
      } else {
        setDestination('UAE');
      }
      // Reset to Step 1 so the user can verify their prefilled product
      setCurrentStep(1);
      
      if (onClearPrefilled) {
        onClearPrefilled();
      }
    } else {
      const available = PRODUCTS.filter(p => p.category === productType);
      if (available.length > 0 && !selectedProductId) {
        setSelectedProductId(available[0].id);
      }
    }
  }, [prefilledProductId, prefilledCategory]);

  // Sync custom HS code when selected product changes
  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  useEffect(() => {
    if (selectedProduct?.hsCode) {
      setCustomHsCode(selectedProduct.hsCode);
    }
  }, [selectedProductId]);

  // Adjust selected product when category changes
  const handleTypeChange = (type: 'export' | 'import') => {
    setProductType(type);
    const available = PRODUCTS.filter(p => p.category === type);
    if (available.length > 0) {
      setSelectedProductId(available[0].id);
    }
    if (type === 'import') {
      setDestination('Nhava Sheva Port (JNPT)');
    } else {
      setDestination('UAE');
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Format size
    const sizeKB = file.size / 1024;
    const sizeFormatted = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${Math.round(sizeKB)} KB`;

    let previewUrl: string | undefined = undefined;
    if (file.type.startsWith('image/')) {
      previewUrl = URL.createObjectURL(file);
    }

    setUploadedFile({
      name: file.name,
      size: sizeFormatted,
      type: file.type || 'document',
      previewUrl
    });
  };

  const handleRemoveFile = () => {
    if (uploadedFile?.previewUrl) {
      URL.revokeObjectURL(uploadedFile.previewUrl);
    }
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const weightMT = weightKg / 1000;

  // Step 1 Validation
  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!selectedProductId) {
      errors.product = 'Please select a commodity.';
    }
    if (!destination.trim()) {
      errors.destination = 'Please enter destination country or port.';
    }
    if (!weightKg || weightKg <= 0) {
      errors.quantity = 'Please enter a valid quantity.';
    }
    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step 2 Validation (Requires Name + WhatsApp or Email)
  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) {
      errors.fullName = 'Please enter your full name or company representative name.';
    }
    const hasContact = whatsapp.trim() || email.trim();
    if (!hasContact) {
      errors.contact = 'Please provide either a WhatsApp number or Email address to receive your quotation.';
    }
    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Navigate to next step
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setStepErrors({});
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setStepErrors({});
        setCurrentStep(3);
      }
    }
  };

  // Submit and Automatically Open WhatsApp with full details
  const handleSubmitAndOpenWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }
    if (!validateStep2()) {
      setCurrentStep(2);
      return;
    }

    const cName = fullName.trim() || 'Prospective Consignee';
    const cPhone = whatsapp.trim() || 'Via WhatsApp';
    const cEmail = email.trim() || 'Inquiry via Portal';
    const cDest = destination.trim() || 'Designated Port';
    const qtyFormatted = weightUnit === 'MT' ? `${weightMT} Metric Tons (MT)` : `${weightKg.toLocaleString()} kg`;
    const hsCodeUsed = customHsCode.trim() || selectedProduct.hsCode || 'Standard EXIM';

    const newInquiry: TradeInquiry = {
      id: 'RKG-' + Math.floor(100000 + Math.random() * 900000),
      fullName: cName,
      companyName: companyName.trim() || 'Private Trade Consignee',
      email: cEmail,
      phone: cPhone,
      whatsapp: whatsapp.trim() || cPhone,
      productType,
      productId: selectedProductId,
      productName: selectedProduct.name,
      quantity: weightKg < 1000 ? weightKg : weightMT,
      unit: weightUnit === 'MT' ? 'Metric Tons (MT)' : 'Kilograms (kg)',
      paymentTerm,
      shippingTerm,
      destinationPort: cDest,
      additionalMessage: packagingInstructions,
      submittedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      uploadedRequirementName: uploadedFile ? `${uploadedFile.name} (${uploadedFile.size})` : undefined,
      uploadedRequirementSize: uploadedFile?.size,
      status: 'Pending',
      estimatedFreightCost: 0
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem('rkg_trade_inquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newInquiry);
      localStorage.setItem('rkg_trade_inquiries', JSON.stringify(list.slice(0, 10)));
    } catch (err) {
      console.error('Failed to save inquiry', err);
    }

    setSubmittedInquiry(newInquiry);
    setShowSuccessModal(true);

    // BUILD ONE-CLICK WHATSAPP DISPATCH MESSAGE
    const waMessageText = 
`📦 *NEW CONSIGNMENT QUOTATION REQUEST*
Reference: *#${newInquiry.id}*
----------------------------------------
🌾 *Commodity:* ${selectedProduct.name}
🏷️ *Operation Gate:* ${productType.toUpperCase()}
📍 *Destination Country / Port:* ${cDest}
⚖️ *Order Volume:* ${qtyFormatted}
----------------------------------------
👤 *Contact Name:* ${cName}
${companyName.trim() ? `🏢 *Company:* ${companyName.trim()}\n` : ''}${whatsapp.trim() ? `💬 *WhatsApp:* ${whatsapp.trim()}\n` : ''}${email.trim() ? `📧 *Email:* ${email.trim()}\n` : ''}----------------------------------------
${uploadedFile ? `📎 *Uploaded Requirement:* ${uploadedFile.name} (${uploadedFile.size})
   *(Sending document/image file in this chat)*\n----------------------------------------\n` : ''}${showAdvanced || shippingTerm !== 'CIF' || packagingInstructions.trim() ? `⚙️ *Commercial Specifications:*
🚢 *Incoterm:* ${shippingTerm}
💳 *Payment:* ${paymentTerm}
🔖 *HS Code:* ${hsCodeUsed}
${packagingInstructions.trim() ? `📦 *Packaging / Port Notes:* ${packagingInstructions.trim()}\n` : ''}----------------------------------------\n` : ''}*RK Infinity Exim* | Commercial Export Desk
Hello Rupesh, please review our requirement and share formal pro-forma pricing & vessel schedule.`;

    const waUrl = `https://wa.me/918999924346?text=${encodeURIComponent(waMessageText)}`;

    // Automatically open WhatsApp with all filled details
    try {
      window.open(waUrl, '_blank');
    } catch {
      window.location.href = waUrl;
    }
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const STEPS = [
    { num: 1, label: 'Product', sub: 'Commodity & Quantity' },
    { num: 2, label: 'Contact', sub: 'Name & WhatsApp/Email' },
    { num: 3, label: 'Submit', sub: '1-Click WhatsApp RFQ' },
  ];

  return (
    <section id="quote" className="relative py-20 bg-slate-100/70 font-sans scroll-mt-28 overflow-hidden">
      <ScratchBackground idPrefix="quote" stencilCode="EXIM-QUOTATION-DESK // DESK-DOC-03" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-gold font-mono font-bold uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5 text-brand-gold" />
                Consignment Quotation Desk
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3 tracking-tight">
              Request a Consignment Quotation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Fill in 5 simple fields to get instant pro-forma pricing. Automatically dispatches your consignment specifications directly to our trade desk on WhatsApp.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSubmitAndOpenWhatsApp()}
            className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl text-xs font-bold shrink-0 shadow-md transition-all cursor-pointer focus:outline-none hover:scale-[1.02]"
            title="1-Click Direct WhatsApp RFQ"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <MessageCircle className="w-4 h-4" />
            <span>⚡ 1-Click WhatsApp RFQ</span>
          </button>
        </div>

        {/* Progress Bar & Stepper */}
        <div className="mb-8 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between relative">
            {/* Background Line */}
            <div className="absolute top-4 sm:top-5 left-8 right-8 h-1 bg-slate-100 rounded-full z-0 -translate-y-1/2" />
            {/* Active Progress Fill */}
            <div 
              className="absolute top-4 sm:top-5 left-8 h-1 bg-brand-gold rounded-full z-0 -translate-y-1/2 transition-all duration-300"
              style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : 'calc(100% - 4rem)' }}
            />

            {STEPS.map((step) => {
              const isDone = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => {
                    if (step.num === 1) setCurrentStep(1);
                    if (step.num === 2 && validateStep1()) setCurrentStep(2);
                    if (step.num === 3 && validateStep1() && validateStep2()) setCurrentStep(3);
                  }}
                  className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 shadow-xs ${
                    isDone 
                      ? 'bg-emerald-600 text-white' 
                      : isCurrent 
                        ? 'bg-brand-gold text-brand-slate ring-4 ring-amber-500/20' 
                        : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}>
                    {isDone ? <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" /> : step.num}
                  </div>
                  <span className={`text-xs font-bold mt-2 tracking-tight ${isCurrent ? 'text-slate-900 font-extrabold' : 'text-slate-500'}`}>
                    Step {step.num}: {step.label}
                  </span>
                  <span className="hidden sm:block text-[10px] text-slate-400 font-medium">
                    {step.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content: Form Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
          {/* Left Column: Form Steps */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <form onSubmit={(e) => { e.preventDefault(); if (currentStep === 3) handleSubmitAndOpenWhatsApp(); else handleNextStep(); }}>
              
              {/* STEP 1: PRODUCT & CARGO */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6"
                >
                  <div className="border-b border-slate-100 pb-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
                        <Package className="w-4 h-4" />
                        Step 1 of 3: Product & Cargo
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Fields 1–3 of 5
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 mt-1">
                      Choose Your Commodity & Volume
                    </h3>
                  </div>

                  {/* Export or Import Toggle */}
                  <div>
                    <label className="text-xs text-slate-500 font-mono uppercase tracking-widest block mb-2">
                      Trade Operation Gateway *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleTypeChange('export')}
                        className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none ${
                          productType === 'export'
                            ? 'bg-amber-500/10 border-brand-gold text-brand-gold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                        id="quote-export-toggle"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Export from India</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => handleTypeChange('import')}
                        className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none ${
                          productType === 'import'
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                        id="quote-import-toggle"
                      >
                        <span className="w-2 h-2 rounded-full bg-sky-500" />
                        <span>Import into India</span>
                      </button>
                    </div>
                  </div>

                  {/* Required Field 1: Product Selection */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label htmlFor="quote-product-select" className="text-xs text-slate-700 font-bold block">
                        1. Product / Commodity <span className="text-rose-500">*</span>
                      </label>
                      {selectedProduct?.hsCode && (
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          HS: {selectedProduct.hsCode}
                        </span>
                      )}
                    </div>
                    <select
                      id="quote-product-select"
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-3.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-all"
                    >
                      {PRODUCTS.filter(p => p.category === productType).map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.name} ({prod.tagline})
                        </option>
                      ))}
                    </select>
                    {stepErrors.product && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {stepErrors.product}
                      </p>
                    )}
                  </div>

                  {/* Required Field 2: Destination Country */}
                  <div>
                    <label htmlFor="quote-destination-input" className="text-xs text-slate-700 font-bold block mb-1.5">
                      2. Destination Country or Port <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="quote-destination-input"
                        type="text"
                        required
                        list="destination-suggestions"
                        value={destination}
                        onChange={(e) => {
                          setDestination(e.target.value);
                          if (stepErrors.destination) {
                            setStepErrors({ ...stepErrors, destination: '' });
                          }
                        }}
                        placeholder={productType === 'export' ? "e.g. UAE, Saudi Arabia, Netherlands, USA..." : "e.g. Nhava Sheva (JNPT), Mundra Port, Chennai..."}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-3.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-all"
                      />
                      <datalist id="destination-suggestions">
                        <option value="Jebel Ali Port, Dubai (UAE)" />
                        <option value="United Arab Emirates (UAE)" />
                        <option value="Hamad Port, Doha (Qatar)" />
                        <option value="King Abdulaziz Port, Dammam (Saudi Arabia)" />
                        <option value="Sohar Port (Oman)" />
                        <option value="Port of Rotterdam (Netherlands)" />
                        <option value="Port of Antwerp-Bruges (Belgium)" />
                        <option value="Port of Hamburg (Germany)" />
                        <option value="Port of Felixstowe (United Kingdom)" />
                        <option value="Port of Singapore" />
                        <option value="Port Klang (Malaysia)" />
                        <option value="Port of New York & New Jersey (USA)" />
                        <option value="Port of Los Angeles (USA)" />
                        <option value="Nhava Sheva Port (JNPT), Mumbai (India)" />
                        <option value="Mundra Port, Gujarat (India)" />
                        <option value="Chennai Port (India)" />
                      </datalist>
                    </div>
                    {stepErrors.destination && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {stepErrors.destination}
                      </p>
                    )}
                  </div>

                  {/* Required Field 3: Quantity */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label htmlFor="quote-qty-input" className="text-xs text-slate-700 font-bold">
                        3. Quantity <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex gap-1 text-[10px] font-mono">
                        <button
                          type="button"
                          onClick={() => setWeightUnit('MT')}
                          className={`px-2.5 py-1 rounded cursor-pointer font-bold ${weightUnit === 'MT' ? 'bg-slate-900 text-white' : 'text-slate-500 bg-slate-100 hover:bg-slate-200'}`}
                        >
                          MT (Metric Tons)
                        </button>
                        <button
                          type="button"
                          onClick={() => setWeightUnit('kg')}
                          className={`px-2.5 py-1 rounded cursor-pointer font-bold ${weightUnit === 'kg' ? 'bg-slate-900 text-white' : 'text-slate-500 bg-slate-100 hover:bg-slate-200'}`}
                        >
                          kg (Kilograms)
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id="quote-qty-input"
                        type="number"
                        min="1"
                        max="500000"
                        value={weightUnit === 'MT' ? weightMT : weightKg}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (weightUnit === 'MT') {
                            setWeightKg(Math.round(val * 1000));
                          } else {
                            setWeightKg(val);
                          }
                          if (stepErrors.quantity) {
                            setStepErrors({ ...stepErrors, quantity: '' });
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-3.5 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold"
                        placeholder="e.g. 25"
                      />
                      <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-3 rounded-lg shrink-0 border border-slate-200">
                        {weightUnit}
                      </span>
                    </div>
                    {stepErrors.quantity && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {stepErrors.quantity}
                      </p>
                    )}
                  </div>

                  {/* Upload Requirement: RFQ / Purchase Order / Product Image */}
                  <div className="bg-slate-50/80 p-4 rounded-xl border border-dashed border-slate-300">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs text-slate-800 font-bold flex items-center gap-1.5">
                        <FileUp className="w-4 h-4 text-brand-gold" />
                        <span>Upload Requirement (RFQ / Purchase Order / Image)</span>
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">Optional</span>
                    </div>

                    {!uploadedFile ? (
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          id="requirement-upload-input"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                          onChange={handleFileUpload}
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-3.5 px-4 bg-white hover:bg-amber-500/5 border border-slate-200 hover:border-brand-gold/60 rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer group"
                        >
                          <Upload className="w-4 h-4 text-slate-400 group-hover:text-brand-gold transition-colors" />
                          <span>Click to browse RFQ, PO, or spec photo (PDF, Word, JPG, PNG - max 15MB)</span>
                        </button>
                        <p className="text-[11px] text-slate-400 mt-1.5 text-center">
                          Upload your buyer inquiry document to pre-attach it to your WhatsApp quotation.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {uploadedFile.previewUrl ? (
                            <img 
                              src={uploadedFile.previewUrl} 
                              alt="Requirement Preview" 
                              className="w-10 h-10 rounded object-cover border border-slate-200 shrink-0" 
                            />
                          ) : (
                            <div className="w-10 h-10 rounded bg-amber-500/10 text-brand-gold flex items-center justify-center shrink-0 border border-amber-500/20">
                              <FileText className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">
                              {uploadedFile.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono">
                              {uploadedFile.size} • Attached to RFQ
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer rounded hover:bg-slate-100 shrink-0"
                          title="Remove file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Advanced Options Accordion (Hidden by default) */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="w-full bg-slate-50 hover:bg-slate-100 p-3.5 text-left flex items-center justify-between text-xs font-bold text-slate-700 cursor-pointer transition-colors focus:outline-none"
                    >
                      <span className="flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Advanced Options (FOB/CIF, Payment Terms, HS Code, Packaging)</span>
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-500 font-normal">
                        {showAdvanced ? 'Hide' : 'Configure'}
                        {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>

                    <AnimatePresence>
                      {showAdvanced && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="p-4 bg-white border-t border-slate-200 space-y-4 text-xs"
                        >
                          {/* Incoterm */}
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                              Shipping Incoterm
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setShippingTerm('CIF')}
                                className={`py-2 px-3 rounded-lg border text-xs font-bold cursor-pointer transition-all ${
                                  shippingTerm === 'CIF'
                                    ? 'bg-slate-900 text-white border-slate-900'
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                CIF (Cost, Insurance & Freight)
                              </button>
                              <button
                                type="button"
                                onClick={() => setShippingTerm('FOB')}
                                className={`py-2 px-3 rounded-lg border text-xs font-bold cursor-pointer transition-all ${
                                  shippingTerm === 'FOB'
                                    ? 'bg-slate-900 text-white border-slate-900'
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                FOB (Free On Board - Port Handover)
                              </button>
                            </div>
                          </div>

                          {/* Payment Terms */}
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                              Preferred Payment Protocol
                            </label>
                            <select
                              value={paymentTerm}
                              onChange={(e) => setPaymentTerm(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-gold"
                            >
                              <option value="Irrevocable Letter of Credit (L/C at Sight)">
                                Irrevocable Letter of Credit (L/C at Sight under ICC UCP 600)
                              </option>
                              <option value="Telegraphic Transfer (T/T - 30% Advance, 70% against B/L)">
                                Telegraphic Transfer (T/T 30% Advance, 70% against BL)
                              </option>
                              <option value="Direct AED/INR Bilateral Settlement (India-UAE CEPA)">
                                Direct AED/INR Bilateral Settlement (India-UAE CEPA LCS)
                              </option>
                              <option value="Documents Against Payment (D/P at Sight)">
                                Documents Against Payment (D/P at Sight via Bank Presentation)
                              </option>
                            </select>
                          </div>

                          {/* HS Code */}
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                              Target HS Code (Customs Tariff)
                            </label>
                            <input
                              type="text"
                              value={customHsCode}
                              onChange={(e) => setCustomHsCode(e.target.value)}
                              placeholder="e.g. 0910.30.20"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-brand-gold"
                            />
                          </div>

                          {/* Packaging Instructions */}
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                              Custom Packaging & Port Instructions
                            </label>
                            <textarea
                              rows={2}
                              value={packagingInstructions}
                              onChange={(e) => setPackagingInstructions(e.target.value)}
                              placeholder="e.g. 25kg Jute bags, wooden pallets, pre-shipment SGS inspection certificate required..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-gold"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Button to Step 2 */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full sm:w-auto bg-brand-slate hover:bg-slate-800 text-white font-bold py-3.5 px-7 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
                      id="quote-step1-next-btn"
                    >
                      <span>Next: Contact Details</span>
                      <ArrowRight className="w-4 h-4 text-brand-gold" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: CONTACT DETAILS */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6"
                >
                  <div className="border-b border-slate-100 pb-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        Step 2 of 3: Contact Details
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Fields 4–5 of 5
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 mt-1">
                      Who should we dispatch the quotation to?
                    </h3>
                  </div>

                  {/* Required Field 4: Full Name */}
                  <div>
                    <label htmlFor="quote-name-input" className="text-xs text-slate-700 font-bold block mb-1.5">
                      4. Your Full Name / Buyer Representative <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="quote-name-input"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (stepErrors.fullName) setStepErrors({ ...stepErrors, fullName: '' });
                        }}
                        placeholder="e.g. Rupesh Kupatkar"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-3.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-all"
                      />
                    </div>
                    {stepErrors.fullName && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {stepErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Required Field 5: WhatsApp or Email */}
                  <div className="space-y-3.5 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-slate-800 font-bold block">
                        5. WhatsApp Number or Business Email <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[10px] text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 font-bold">
                        Provide At Least 1
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label htmlFor="quote-whatsapp-input" className="text-[11px] font-semibold text-slate-600 block mb-1 flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>WhatsApp Number</span>
                        </label>
                        <input
                          id="quote-whatsapp-input"
                          type="tel"
                          value={whatsapp}
                          onChange={(e) => {
                            setWhatsapp(e.target.value);
                            if (stepErrors.contact) setStepErrors({ ...stepErrors, contact: '' });
                          }}
                          placeholder="+91 89999 24346"
                          className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-gold"
                        />
                      </div>

                      <div>
                        <label htmlFor="quote-email-input" className="text-[11px] font-semibold text-slate-600 block mb-1 flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-sky-600" />
                          <span>Business Email</span>
                        </label>
                        <input
                          id="quote-email-input"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (stepErrors.contact) setStepErrors({ ...stepErrors, contact: '' });
                          }}
                          placeholder="buyer@company.com"
                          className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-gold"
                        />
                      </div>
                    </div>

                    {stepErrors.contact && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {stepErrors.contact}
                      </p>
                    )}
                  </div>

                  {/* Optional: Company Name */}
                  <div>
                    <label htmlFor="quote-company-input" className="text-xs text-slate-700 font-bold block mb-1.5 flex items-center justify-between">
                      <span>Company / Trading Firm Name</span>
                      <span className="text-[10px] text-slate-400 font-normal font-mono">Optional</span>
                    </label>
                    <input
                      id="quote-company-input"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Al-Noor Global Trading LLC"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-3.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold"
                    />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="pt-3 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Product</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-brand-slate hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
                      id="quote-step2-next-btn"
                    >
                      <span>Review & Submit</span>
                      <ArrowRight className="w-4 h-4 text-brand-gold" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: REVIEW & SUBMIT (1-CLICK WHATSAPP) */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6"
                >
                  <div className="border-b border-slate-100 pb-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Step 3 of 3: Review & Submit
                      </span>
                      <span className="text-[11px] text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded font-bold">
                        Ready to Dispatch
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 mt-1">
                      Review Your Consignment Details
                    </h3>
                  </div>

                  {/* Summary Checklist of 5 Core Fields */}
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200/80 space-y-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">1. Commodity</span>
                      <span className="font-bold text-slate-900 text-right">
                        {selectedProduct.name} ({productType.toUpperCase()})
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">2. Destination</span>
                      <span className="font-bold text-slate-900 text-right">
                        {destination}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">3. Order Volume</span>
                      <span className="font-mono font-bold text-brand-gold text-right">
                        {weightUnit === 'MT' ? `${weightMT} Metric Tons (MT)` : `${weightKg.toLocaleString()} kg`}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">4. Buyer Name</span>
                      <span className="font-bold text-slate-900 text-right">
                        {fullName} {companyName ? `(${companyName})` : ''}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">5. Contact Info</span>
                      <span className="font-semibold text-slate-800 text-right">
                        {whatsapp || email || 'Not specified'}
                      </span>
                    </div>

                    {uploadedFile && (
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <span className="text-slate-500 font-medium flex items-center gap-1">
                          <Paperclip className="w-3.5 h-3.5 text-brand-gold" />
                          Attached Requirement
                        </span>
                        <span className="font-mono font-semibold text-emerald-700 text-right truncate max-w-[200px]">
                          {uploadedFile.name} ({uploadedFile.size})
                        </span>
                      </div>
                    )}

                    {showAdvanced && (
                      <div className="pt-1 text-[11px] text-slate-500 flex justify-between">
                        <span>Terms & Tariff</span>
                        <span className="font-mono font-medium text-slate-700">
                          {shippingTerm} • {paymentTerm.split('(')[0].trim()} • HS: {customHsCode || selectedProduct.hsCode}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ONE-CLICK WHATSAPP DISPATCH CALLOUT */}
                  <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-4 flex items-start gap-3">
                    <div className="p-2 bg-emerald-500 text-white rounded-lg shrink-0 mt-0.5">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div className="text-xs text-emerald-900">
                      <h4 className="font-bold text-sm text-emerald-950">
                        Automatic One-Click WhatsApp Submission
                      </h4>
                      <p className="mt-0.5 text-emerald-800 leading-relaxed">
                        Clicking the button below automatically opens WhatsApp directly with all your filled consignment specifications pre-loaded to RK Infinity Exim (+91 89999 24346). No account or login required!
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-3 pt-1">
                    <button
                      type="button"
                      onClick={() => handleSubmitAndOpenWhatsApp()}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2.5 cursor-pointer text-sm sm:text-base group focus:outline-none hover:scale-[1.01]"
                      id="submit-rfq-whatsapp-btn"
                    >
                      <MessageCircle className="w-5 h-5 text-white" />
                      <span>Submit & Open WhatsApp (Instant Dispatch)</span>
                    </button>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Edit Contact Information</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer transition-colors"
                      >
                        Edit Product & Quantity
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

            </form>
          </div>

          {/* Right Column: Dynamic Live Consignment Summary & Institutional Assurance */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dynamic Live Consignment Summary Card */}
            <div className="bg-brand-slate text-white rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3.5">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-gold" />
                  <h3 className="font-display font-extrabold text-sm sm:text-base tracking-tight uppercase text-slate-200">
                    Live Consignment Summary
                  </h3>
                </div>
                <span className="text-[10px] bg-amber-500/10 text-brand-gold border border-brand-gold/30 font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                  {productType === 'export' ? 'EXPORT GATE' : 'IMPORT GATE'}
                </span>
              </div>

              {/* Selected Commodity Display */}
              <div className="flex items-center gap-4 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <img 
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold font-bold block">
                    {selectedProduct.origin || 'Maharashtra, India'}
                  </span>
                  <h4 className="font-display font-bold text-sm text-white truncate">
                    {selectedProduct.name}
                  </h4>
                  {selectedProduct.hsCode && (
                    <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                      HS Code: {customHsCode || selectedProduct.hsCode}
                    </span>
                  )}
                </div>
              </div>

              {/* 5 Field Real-Time Overview */}
              <div className="space-y-2 text-xs font-sans">
                <div className="flex justify-between py-1.5 border-b border-slate-800/80 text-slate-300">
                  <span className="text-slate-400">1. Target Commodity</span>
                  <span className="font-semibold text-white truncate max-w-[190px] text-right">
                    {selectedProduct.name}
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-800/80 text-slate-300">
                  <span className="text-slate-400">2. Destination</span>
                  <span className="font-semibold text-white text-right">
                    {destination || 'Select port / country'}
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-800/80 text-slate-300">
                  <span className="text-slate-400">3. Cargo Quantity</span>
                  <span className="font-mono font-bold text-brand-gold text-right">
                    {weightUnit === 'MT' ? `${weightMT} Metric Tons` : `${weightKg.toLocaleString()} kg`}
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-800/80 text-slate-300">
                  <span className="text-slate-400">4. Applicant Name</span>
                  <span className="font-semibold text-white text-right">
                    {fullName || 'Enter in Step 2'}
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-800/80 text-slate-300">
                  <span className="text-slate-400">5. Direct Contact</span>
                  <span className="text-slate-300 text-right truncate max-w-[190px]">
                    {whatsapp || email || 'Enter in Step 2'}
                  </span>
                </div>

                {uploadedFile && (
                  <div className="flex justify-between py-1.5 border-b border-slate-800/80 text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Paperclip className="w-3 h-3" />
                      Requirement Attached
                    </span>
                    <span className="font-mono font-semibold truncate max-w-[180px]">
                      {uploadedFile.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Direct WhatsApp Quick Share */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleSubmitAndOpenWhatsApp()}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md focus:outline-none"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant 1-Click WhatsApp (+91 89999 24346)</span>
                </button>
              </div>
            </div>

            {/* Trade Assurance & Regulatory Compliance Box */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-display font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Institutional Export Assurance</span>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>APEDA & DGFT Verified:</strong> Registered IEC exporter compliant with Indian Ministry of Commerce guidelines.</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Pre-Shipment Inspection:</strong> Verified certificates of quality, moisture, and phytosanitary parameters (SGS / Geo-Chem nominated).</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Full Export Documentation:</strong> Original Ocean Bill of Lading, Certificate of Origin, Commercial Invoice, and Packing List.</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-400">
                Official Trade Inquiries: <a href="mailto:info@rkinfinityexim.com" className="text-brand-gold font-semibold hover:underline">info@rkinfinityexim.com</a>
              </div>
            </div>

          </div>

        </div>

      {/* Modal: Submission Success Confirmation with WhatsApp Launch Backup */}
      <AnimatePresence>
        {showSuccessModal && submittedInquiry && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ position: 'fixed', inset: 0 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="fixed inset-0 bg-brand-slate/85 backdrop-blur-xs"
              style={{ position: 'fixed', inset: 0 }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 p-6 sm:p-8 text-center space-y-5"
            >
              <div className="bg-emerald-50 text-emerald-500 p-4 rounded-full w-fit mx-auto border border-emerald-100">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold font-mono px-3 py-1 rounded-full uppercase">
                  Quotation Dispatched
                </span>
                <h3 className="text-xl font-display font-extrabold text-slate-900">
                  Consignment Request Received!
                </h3>
                <p className="text-xs text-slate-500">
                  WhatsApp was automatically launched with your consignment details for <strong>{submittedInquiry.productName}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs font-mono space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Reference:</span>
                  <span className="font-bold text-slate-800">#{submittedInquiry.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Destination:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[180px]">{submittedInquiry.destinationPort}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Quantity:</span>
                  <span className="font-bold text-brand-gold">{submittedInquiry.quantity} {submittedInquiry.unit}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    const waMessageText = 
`📦 *CONSIGNMENT QUOTATION REQUEST*
Reference: *#${submittedInquiry.id}*
----------------------------------------
🌾 *Commodity:* ${submittedInquiry.productName}
📍 *Destination:* ${submittedInquiry.destinationPort}
⚖️ *Volume:* ${submittedInquiry.quantity} ${submittedInquiry.unit}
👤 *Client:* ${submittedInquiry.fullName}
----------------------------------------
*RK Infinity Exim* | Export Commercial Desk
Hello Rupesh, please review and share pro-forma invoice.`;
                    window.open(`https://wa.me/918999924346?text=${encodeURIComponent(waMessageText)}`, '_blank');
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md focus:outline-none"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Reopen WhatsApp Chat</span>
                </button>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer focus:outline-none"
                >
                  Close & Continue Browsing
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
