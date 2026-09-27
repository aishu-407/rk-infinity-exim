export interface Product {
  id: string;
  name: string;
  category: 'export' | 'import';
  tagline: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  origin?: string;
  hsCode?: string;
  packaging?: string;
  minOrderQuantity?: string;
  imageUrl: string;
}

export interface ShippingPort {
  name: string;
  location: string;
  type: string;
  highlight: string;
}

export interface ExportMarket {
  country: string;
  region: string;
  flag: string;
  transitTime: string;
}

export interface TradeInquiry {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  whatsapp: string;
  productType: 'export' | 'import';
  productId: string;
  productName: string;
  quantity: number; // in Metric Tons or Units
  unit: string;
  paymentTerm: string;
  shippingTerm: string; // FOB, CIF, CNF
  destinationPort: string;
  additionalMessage: string;
  submittedAt: string;
  uploadedRequirementName?: string;
  uploadedRequirementSize?: string;
  status: 'Pending' | 'Port Assessment' | 'Customs Review' | 'L/C Verified' | 'Quote Dispatched';
  estimatedFreightCost: number;
}
