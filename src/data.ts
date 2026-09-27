import { Product, ShippingPort, ExportMarket } from './types';
import turmericImg from './assets/images/turmeric_powder_spices_1786221699447.jpg';
import peanutsImg from './assets/images/peanuts_groundnuts_export_1786221714341.jpg';
import onionPowderImg from './assets/images/dehydrated_onion_powder_1786221729260.jpg';
import moringaPowderImg from './assets/images/dehydrated_moringa_powder_1786221742474.jpg';
import garlicPowderImg from './assets/images/dehydrated_garlic_powder_1786221758319.jpg';
import carImportImg from './assets/images/sports_luxury_cars_import_1786223063234.jpg';
import finishedLeatherImg from './assets/images/finished_leather_export_1788862813825.jpg';
import leatherGoodsImg from './assets/images/leather_goods_export_1788862835109.jpg';
import fastenersImg from './assets/images/nuts_bolts_fasteners_1790336838521.jpg';

export const COMPANY_DETAILS = {
  name: "RK Infinity Exim",
  tagline: "Connecting Global Markets with Quality Products",
  businessType: "Import & Export",
  owner: "Rupesh Kupatkar",
  email: "info@rkinfinityexim.com",
  phone: "+91 8999924346",
  whatsapp: "+91 8999924346",
  website: "www.rkinfinityexim.com",
  address: "Office 31, Erandwane Patwardhan Gaugh, Pune, Maharashtra, India",
};

export const EXPORT_PRODUCTS: Product[] = [
  {
    id: "exp_turmeric",
    name: "Premium Turmeric Powder",
    category: "export",
    tagline: "High Curcumin, Intense Aroma & Golden Hue",
    description: "Sourced directly from the fertile agricultural fields of Sangli and surrounding regions, our turmeric is carefully dried and finely ground to preserve its high curcumin content, medicinal benefits, and rich golden-yellow color.",
    features: [
      "Curcumin content: 3.5% to 5.0% Min",
      "100% pure and organic grade",
      "No artificial colors, preservatives, or lead chromate",
      "Finely ground with double-layered protective packaging"
    ],
    specifications: {
      "Moisture": "9% Max",
      "Total Ash": "7% Max",
      "Acid Insoluble Ash": "1.5% Max",
      "Particle Size": "100% passing through 60 mesh"
    },
    origin: "Maharashtra / Andhra Pradesh, India",
    hsCode: "0910.30.20",
    packaging: "25kg / 50kg PP Bags or Custom Craft Paper Bags",
    minOrderQuantity: "15 Metric Tons (1x20 Ft Container)",
    imageUrl: turmericImg
  },
  {
    id: "exp_onion_powder",
    name: "Dehydrated Onion Powder",
    category: "export",
    tagline: "100% Pure, Pungent & Moisture-Controlled",
    description: "Manufactured from selected fresh white and red onions through advanced air-dehydration technology. Retains natural flavor, pungent aroma, and long shelf life for food processing, instant soups, and seasoning blends.",
    features: [
      "100% natural with zero added colors or anti-caking agents",
      "Mesh sizes available: 80-100 mesh fine powder, granules, or flakes",
      "Low moisture content (< 5%) for extended shelf stability",
      "Strict microbial and heavy metal quality testing"
    ],
    specifications: {
      "Moisture": "5% Max",
      "Total Ash": "4.5% Max",
      "Acid Insoluble Ash": "0.5% Max",
      "Bulk Density": "0.45 - 0.55 g/ml"
    },
    origin: "Mahuva / Nashik (Maharashtra), India",
    hsCode: "0712.20.00",
    packaging: "25kg Craft Paper Bags with inner PE liner",
    minOrderQuantity: "14 Metric Tons (1x20 Ft Container)",
    imageUrl: onionPowderImg
  },
  {
    id: "exp_moringa_powder",
    name: "Dehydrated Moringa Leaf Powder",
    category: "export",
    tagline: "Superfood Grade, Deep Green & Nutrient-Rich",
    description: "Processed from shade-dried organic Moringa Oleifera leaves. Packed with vitamins, minerals, and antioxidants, our moringa powder is finely ground and shadow-cured to preserve its rich chlorophyll green color and nutritional potency.",
    features: [
      "100% organic grade Moringa Oleifera",
      "Rich in chlorophyll, Vitamin A, Vitamin C, Calcium, and Iron",
      "Shade-dried below 40°C to protect delicate phytonutrients",
      "Ultra-fine mesh particle size for smooth mixing"
    ],
    specifications: {
      "Moisture": "6% Max",
      "Protein Content": "25% - 28% Min",
      "Mesh Size": "80 - 100 mesh",
      "Color": "Vibrant natural leaf green"
    },
    origin: "Tamil Nadu / Maharashtra, India",
    hsCode: "1211.90.29",
    packaging: "25kg Vacuum Sealed Bags / Fiber Drums",
    minOrderQuantity: "10 Metric Tons",
    imageUrl: moringaPowderImg
  },
  {
    id: "exp_garlic_powder",
    name: "Dehydrated Garlic Powder",
    category: "export",
    tagline: "Strong Allicin Aroma & Premium Food Grade",
    description: "Produced from premium Indian garlic cloves, gently dehydrated and pulverized to deliver a concentrated garlic flavor and pungent aroma. Essential for industrial food seasoning, dry rubs, and canned foods.",
    features: [
      "High allicin potency and rich savory aroma",
      "Free-flowing free of lumps and extraneous matter",
      "Strictly tested for pesticides and Salmonella/E.Coli compliance",
      "Hygienically processed under FSSAI registered units"
    ],
    specifications: {
      "Moisture": "5.5% Max",
      "Total Ash": "4.0% Max",
      "Acid Insoluble Ash": "0.4% Max",
      "Particle Size": "80 to 100 Mesh"
    },
    origin: "Madhya Pradesh / Gujarat, India",
    hsCode: "0712.90.20",
    packaging: "25kg Multi-wall Paper Bags with PE liner",
    minOrderQuantity: "12 Metric Tons",
    imageUrl: garlicPowderImg
  },
  {
    id: "exp_chilli",
    name: "Red Chilli Powder",
    category: "export",
    tagline: "Rich Red Color & Customizable Heat Levels",
    description: "Our Red Chilli Powder is processed from premium dry red chillies (including Teja, Byadgi, and Guntur varieties) known for their brilliant natural red color and pungent taste. Perfect for food processing and global culinary use.",
    features: [
      "Customizable pungency (high, medium, or mild heat)",
      "Vibrant natural red color (ASTA value up to 120+)",
      "Strictly tested for aflatoxin, pesticide residues, and Sudan dye",
      "Hygienically ground and packed"
    ],
    specifications: {
      "Heat Value (Pungency)": "15,000 to 80,000 SHU",
      "Moisture": "10% Max",
      "Total Ash": "8% Max",
      "Acid Insoluble Ash": "1.25% Max"
    },
    origin: "Guntur (Andhra Pradesh) / Karnataka, India",
    hsCode: "0904.22.11",
    packaging: "25kg Jute Bags, PP Bags, or custom retail packs",
    minOrderQuantity: "14 Metric Tons (1x20 Ft Container)",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "exp_fasteners",
    name: "Nut, Bolt & Fasteners",
    category: "export",
    tagline: "High-Tensile Grade 8.8 / 10.9 / 12.9, Stainless Steel & Industrial Fasteners",
    description: "Precision-engineered industrial fasteners manufactured from premium stainless steel, high-tensile carbon steel, and alloy steel. We supply heavy hex bolts, nuts, socket cap screws, studs, washers, and specialized anchor fasteners engineered for global automotive, structural engineering, infrastructure, solar/wind power, and heavy industrial applications.",
    features: [
      "Broad Spectrum: Hex Bolts, Heavy Hex Nuts, Allen Socket Screws, Studs, Plain/Spring Washers & Anchors",
      "Strength & Material Grades: 4.6, 8.8, 10.9, 12.9 High-Tensile, Stainless Steel (SS304, SS316), Brass & B7/2H",
      "Global Compliance Standards: DIN (933, 931, 934, 912), ISO 4014/4017, ASTM A193/A194, ASME B18.2.1, BS, IS",
      "Protective Surface Finishes: Hot-Dip Galvanized (HDG), Yellow/White Zinc Electroplating, Black Oxide, Dacromet & Geomet",
      "100% thread gauge verified with Mill Test Certificates (EN 10204 3.1) and complete batch traceability"
    ],
    specifications: {
      "Material Grades": "Carbon Steel / High Tensile Alloy Steel / Stainless Steel (SS304, SS316, SS316L)",
      "Strength Class": "Grade 4.8 / 8.8 / 10.9 / 12.9 & A2-70 / A4-80 (SS)",
      "Standard Compliance": "DIN 933, DIN 931, DIN 934, DIN 912, ASTM A193 B7 / A194 2H, ISO 4014/4017",
      "Diameter Range": "M4 to M64 (Metric) | 1/4\" to 2-1/2\" (Imperial) | Custom lengths up to 1000mm",
      "Surface Treatment": "Hot-Dip Galvanized (HDG), Electro-Zinc Plating, Black Oxide, Dacromet, PTFE",
      "Quality Testing": "EN 10204 3.1 MTC, 1000h Salt Spray Tested, Proof Load & Tensile Tested"
    },
    origin: "Maharashtra / Gujarat / Punjab, India",
    hsCode: "7318.15.00",
    packaging: "25kg Heavy-Duty Export Cartons on Fumigated Wooden Pallets with Stretch Wrap, or Custom Gunny Bags",
    minOrderQuantity: "1 Metric Ton (Air/LCL) / 10 Metric Tons (1x20 Ft FCL Container)",
    imageUrl: fastenersImg
  },
  {
    id: "exp_groundnuts",
    name: "Premium Groundnuts / Peanuts",
    category: "export",
    tagline: "High Oil Content, Bold Kernels & Sweet Taste",
    description: "Top-grade raw peanut kernels sourced from premium peanut-producing belts in India. We supply Bold, Java, and TJ varieties, perfect for snacking, peanut butter manufacturing, and oil extraction.",
    features: [
      "Count per Ounce: 38/42, 40/50, 50/60, 60/70, 70/80, 80/90",
      "Strictly processed to keep Aflatoxin within international limits (B1 < 2ppb)",
      "High oil content (48% - 50% average)",
      "Thoroughly sortex-cleaned and hand-picked selected (HPS) grades"
    ],
    specifications: {
      "Moisture": "7% to 8% Max",
      "Admixture": "1% Max",
      "Damaged/Split Kernels": "2% Max",
      "Aflatoxin": "Negative / < 4ppb Max"
    },
    origin: "Gujarat / Rajasthan, India",
    hsCode: "1202.42.00",
    packaging: "25kg / 50kg Jute Bags, Vacuum Packed Bags, or PP Bags",
    minOrderQuantity: "19 Metric Tons (1x20 Ft Container)",
    imageUrl: peanutsImg
  },
  {
    id: "exp_finished_leather",
    name: "Finished & Crust Leather Hides",
    category: "export",
    tagline: "Full Grain, Nappa & Suede Hides for Global Footwear & Luxury Goods",
    description: "Export-grade genuine finished and semi-finished leather hides sourced from premium Indian bovine (cow, buffalo) and ovine (goat, sheep) skins. Tanned in state-of-the-art facilities compliant with international eco-friendly norms (REACH and LWG). Delivers flawless grain consistency, superior tensile resilience, and customized finishes for global luxury goods, footwear, and upholstery manufacturers.",
    features: [
      "Available in Full Grain, Top Grain, Buffed Nubuck, Milled Nappa, Suede & Crust finishes",
      "Strictly compliant with EU REACH, LWG (Leather Working Group) & CLE export protocols",
      "Eco-friendly vegetable-tanned and chromium-free tanning options available",
      "High tensile and tear strength tested under ISO physical standards",
      "Precision color matching via Pantone / RAL shades with water-repellent finishing"
    ],
    specifications: {
      "Animal Origin": "Buffalo / Cow / Goat / Sheep",
      "Substance / Thickness": "0.9 - 1.1 mm / 1.2 - 1.4 mm / 1.4 - 1.6 mm / Custom",
      "Average Size per Hide": "14 - 24 sq. ft. (Bovine) / 5 - 8 sq. ft. (Goat/Sheep)",
      "Tanning Method": "Chrome Tanned / Semi-Chrome / 100% Vegetable Tanned",
      "Tear Strength": "> 20 N/mm (ISO 3377-2 standard)",
      "Color Fastness": "Dry 500 cycles / Wet 150 cycles (Grade 4+)",
      "Chemical Safety": "Azo-Dye Free, Chromium VI Free, RoHS / REACH Certified"
    },
    origin: "Maharashtra / Tamil Nadu / Uttar Pradesh, India",
    hsCode: "4107.92.00",
    packaging: "Roll-wrapped in protective greaseproof paper, PE moisture barrier & palletized wooden crates with silica pouches",
    minOrderQuantity: "1,500 sq. ft. (Air Cargo Sample) / 10,000 sq. ft. (1x20 Ft FCL)",
    imageUrl: finishedLeatherImg
  },
  {
    id: "exp_leather_goods",
    name: "Handcrafted Leather Goods & Accessories",
    category: "export",
    tagline: "Export-Quality Travel Bags, RFID Wallets, Belts & Industrial Gloves",
    description: "Precision-manufactured export leather accessories and lifestyle merchandise. Crafted from 100% genuine full-grain and top-grain leather with precision reinforced bonded stitching, heavy-duty anti-corrosion brass hardware, and custom private-label OEM/ODM debossing for international department stores, boutique brands, and industrial safety distributors.",
    features: [
      "Comprehensive range: Duffle weekender bags, messenger bags, RFID wallets, belts & safety work gloves",
      "100% genuine top-grain leather with hand-painted burnished edges",
      "Heavy-duty YKK metal zippers & solid brass/antique nickel buckles",
      "Full OEM / ODM service: Custom brand debossing, laser engraving, and custom lining",
      "Individual velvet dust bag packaging with export-compliant barcoded master cartons"
    ],
    specifications: {
      "Product Assortment": "Travel Bags / Laptop Messengers / RFID Wallets / Dress Belts / Safety Gloves",
      "Leather Selection": "100% Genuine Full Grain & Top Grain Vegetable-Tanned Cow/Buffalo",
      "Hardware Grade": "Solid Brass & Anti-Rust Zinc Alloy (Lead & Nickel Free)",
      "Inner Lining": "High-density 100% Cotton Twill / Spill-resistant Jacquard",
      "RFID Shielding": "Military-grade 13.56 MHz RFID blocking layer inside all wallets",
      "Quality Testing": "Drop tested, strap pull load test (25 kg), and 48h salt-spray anti-corrosion tested"
    },
    origin: "Pune / Chennai / Kanpur, India",
    hsCode: "4202.21.00",
    packaging: "Individual Non-Woven Dust Bags, poly-wrapped in 5-ply export corrugated master cartons",
    minOrderQuantity: "100 Pieces (Trial Air Batch) / 500 Pieces (Sea FCL Consignment)",
    imageUrl: leatherGoodsImg
  }
];

export const IMPORT_PRODUCTS: Product[] = [
  {
    id: "imp_cars",
    name: "Sports, Luxury & All Automobiles Import",
    category: "import",
    tagline: "Global Freight & Customs Clearance for Sports Cars, Luxury Sedans, SUVs & EVs",
    description: "End-to-end international automotive import logistics for high-performance sports cars, supercars, luxury sedans, SUVs, electric vehicles (EVs), and specialized passenger automobiles. We manage direct procurement, RoRo shipping, containerized enclosed carrier transport, duty handling, and ARAI/CMVR homologation compliance.",
    features: [
      "Specialized import for Sports Cars, Supercars, Luxury SUVs & Sedans",
      "Comprehensive CBU (Completely Built Unit) and SKD/CKD customs clearance",
      "Ultra-secure Enclosed Car Carrier & 40ft High Cube Container shipping",
      "Complete marine insurance, pre-shipment inspection & ATA Carnet support",
      "Direct procurement handling from Europe, Japan, UK, USA & UAE hubs"
    ],
    specifications: {
      "Vehicle Categories": "Sports Cars / Supercars / Luxury Sedans / SUVs / EVs / All Passenger Cars",
      "Transport Mode": "Enclosed Air-Suspension Carrier / RoRo / 40ft Container",
      "Regulatory Compliance": "Indian CMVR / ARAI Homologation & Customs EPCG Clearance"
    },
    imageUrl: carImportImg
  },
  {
    id: "imp_machinery",
    name: "Precision Machinery Parts",
    category: "import",
    tagline: "Industrial Components and Spares for Automated Lines",
    description: "Importing heavy-duty mechanical elements, CNC spares, hydraulic fittings, and electronic controller modules designed to minimize downtime in high-speed bottling, packaging, and textile plants across India.",
    features: [
      "High alloy steel with wear-resistant coating",
      "OEM standard specifications with micro-millimeter precision",
      "Direct procurement from Europe, Japan, and Taiwan",
      "Ready stock availability for critical breakdown spares"
    ],
    specifications: {
      "Material Grades": "High strength Tungsten Carbide / Stainless 316",
      "Tolerance Limit": "Up to +/- 0.005mm",
      "Hardness Range": "HRC 55 - 62"
    },
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "imp_packaging",
    name: "High-Barrier Packaging Materials",
    category: "import",
    tagline: "Aseptic, Multi-layer Films and Advanced Foils",
    description: "Imported state-of-the-art multi-layer polymers, high barrier EVOH films, aluminum foils, and eco-friendly food grade packaging substrates designed to extend shelf life in demanding export-oriented food industries.",
    features: [
      "Outstanding moisture, oxygen, and UV barrier performance",
      "Food contact compliant with global FDA and EC certifications",
      "Ultra-high puncture and tear resistance",
      "Suitable for high-speed automated flow-wrap machines"
    ],
    specifications: {
      "Structure": "PET / AL / LLDPE or EVOH co-extruded (3 to 9 layers)",
      "Thickness Range": "25 to 150 microns",
      "Oxygen Permeability": "< 0.5 cc/m²/day"
    },
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600"
  }
];

export const PRODUCTS: Product[] = [...EXPORT_PRODUCTS, ...IMPORT_PRODUCTS];

export const SHIPPING_PORTS: ShippingPort[] = [
  {
    name: "Mumbai Port",
    location: "Maharashtra, India",
    type: "Sea Customs Port",
    highlight: "One of India's oldest and premier deep-water gateways, handling bulk agricultural items and heavy machinery imports."
  },
  {
    name: "Mundra Port",
    location: "Gujarat, India",
    type: "Mega Container Port",
    highlight: "India's largest private commercial port, equipped with state-of-the-art automated cranes and dry bulk terminals."
  },
  {
    name: "Nhava Sheva Port (JNPT)",
    location: "Mumbai, Maharashtra",
    type: "Major Container Hub",
    highlight: "Key logistic node for exports out of Pune and Western India, handling over 55% of the nation's containerized cargo."
  },
  {
    name: "Chennai Port",
    location: "Tamil Nadu, India",
    type: "Eastern Hub Port",
    highlight: "Third oldest port in India, offering direct shipping lanes to Singapore, Malaysia, and Far East markets."
  }
];

export const EXPORT_MARKETS: ExportMarket[] = [
  { country: "UAE", region: "Middle East", flag: "🇦🇪", transitTime: "5 - 7 Days" },
  { country: "Saudi Arabia", region: "Middle East", flag: "🇸🇦", transitTime: "8 - 12 Days" },
  { country: "Oman", region: "Middle East", flag: "🇴🇲", transitTime: "6 - 9 Days" },
  { country: "Qatar", region: "Middle East", flag: "🇶🇦", transitTime: "7 - 10 Days" },
  { country: "Singapore", region: "Southeast Asia", flag: "🇸🇬", transitTime: "10 - 14 Days" },
  { country: "Malaysia", region: "Southeast Asia", flag: "🇲🇾", transitTime: "12 - 16 Days" },
  { country: "United Kingdom", region: "Europe", flag: "🇬🇧", transitTime: "22 - 28 Days" },
  { country: "Canada", region: "North America", flag: "🇨🇦", transitTime: "30 - 38 Days" }
];

export const PAYMENT_TERMS = [
  {
    name: "T/T (Telegraphic Transfer)",
    description: "Standard wire transfer protocol. Typically structured as 30% advance deposit upon contract signing, and 70% balance against scanning of the original Bill of Lading (B/L) and shipping documents.",
    rating: "Highly Secure & Quick",
    protection: "Balance protected by verified cargo manifests."
  },
  {
    name: "L/C (Letter of Credit)",
    description: "100% Irrevocable Letter of Credit at Sight, issued by a Prime International Bank. Highly recommended for first-time buyers and bulk agricultural shipments.",
    rating: "Ultimate Bank-Guaranteed Safety",
    protection: "Zero counter-party payment default risk."
  },
  {
    name: "Advance Payment",
    description: "Direct bank transfer before production or dispatch. Perfect for custom packaged spices, industrial fasteners, or air-freighted fast-transit consignments under urgent schedules.",
    rating: "Optimized Processing Speed",
    protection: "Saves administrative bank fee overheads."
  }
];

