export interface Testimonial {
  id: string;
  stars: number;
  content: string;
  author: string;
  game: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Package {
  id: string;
  name: string;
  subtitle: string;
  price: number; // price per GB or fixed
  processor: string;
  ram: string;
  storage: string;
  icon: 'Cpu' | 'Server' | 'Zap';
  badge?: string; // e.g., "Paling Populer"
  stockStatus: 'In Stock' | 'Sold Out';
  stockAmount: number;
  features: string[];
  active: boolean;
}

export interface Order {
  id: string;
  package: string;
  customer: string;
  customerInitial: string;
  status: 'Selesai' | 'Diproses' | 'Pending';
  amount: number;
  date: string;
  game?: string;
  version?: string;
  egg?: string;
  gmail?: string;
  username?: string;
}

export interface AppConfig {
  brandName: string;
  whatsappContact: string;
  primaryThemeHex: string;
  danaNumber: string;
  gopayNumber: string;
  globalLiveFeed: boolean;
  buyerNameMasking: string;
  displayInterval: number;
  logoUrl?: string;
  qrisUrl?: string;
  
  // Customizable Hero contents
  heroTitle: string;
  heroSubtitle: string;
  
  // Dynamic lists editable in Admin Panel
  testimonials: Testimonial[];
  faqs: FAQItem[];
  
  // Live purchase popups customization lists
  notificationNames: string[];
  notificationProducts: string[];
  
  // Social links
  tiktokUrl: string;
  instagramUrl: string;
  discordUrl: string;

  // Custom Admin credentials
  adminUsername?: string;
  adminPassword?: string;
}
