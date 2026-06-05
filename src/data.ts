import { Package, Order, AppConfig, Testimonial, FAQItem } from './types';

export const INITIAL_PACKAGES: Package[] = [
  {
    id: 'lite',
    name: 'Lite',
    subtitle: 'Cocok untuk server kecil dan komunitas',
    price: 6500, // Rp 6.500 / GB
    processor: 'Intel Xeon E5-2680 V4',
    ram: '1GB DDR4 ECC RAM / GB',
    storage: 'SSD NVMe Ultra',
    icon: 'Cpu',
    stockStatus: 'In Stock',
    stockAmount: 25,
    features: ['SSD NVMe', 'DDoS Protection', 'Uptime Tinggi', 'Support Cepat', 'Cocok untuk server kecil dan komunitas'],
    active: true
  },
  {
    id: 'standar',
    name: 'Standar',
    subtitle: 'Cocok untuk server menengah',
    price: 10000, // Rp 10.000 / GB
    processor: 'AMD EPYC 7543',
    ram: '1GB DDR4 ECC RAM / GB',
    storage: 'SSD NVMe Enterprise',
    icon: 'Server',
    badge: 'Paling Populer',
    stockStatus: 'In Stock',
    stockAmount: 14,
    features: ['SSD NVMe', 'DDoS Protection', 'Performa Lebih Tinggi', 'Prioritas Support', 'Cocok untuk server menengah'],
    active: true
  },
  {
    id: 'medium',
    name: 'Medium',
    subtitle: 'Cocok untuk server besar dan performa tinggi',
    price: 20000, // Rp 20.000 / GB
    processor: 'AMD Ryzen 9 7950X',
    ram: '1GB DDR5 Extreme RAM / GB',
    storage: 'Gen4 NVMe M.2 SSD',
    icon: 'Zap',
    stockStatus: 'In Stock',
    stockAmount: 5,
    features: ['SSD NVMe', 'CPU Prioritas', 'DDoS Protection', 'Prioritas Tertinggi', 'Cocok untuk server besar dan kebutuhan performa tinggi'],
    active: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: '#GAV-9021-X',
    package: 'Medium',
    customer: 'Fahri Nugraha',
    customerInitial: 'FN',
    status: 'Selesai',
    amount: 160000,
    date: 'Jun 03',
    game: 'Minecraft',
    version: '1.20.4',
    egg: 'Purpur',
    gmail: 'fahri.nugraha@gmail.com',
    username: 'fahri_mc'
  },
  {
    id: '#GAV-9022-P',
    package: 'Standar',
    customer: 'Rizwan Hakim',
    customerInitial: 'RH',
    status: 'Diproses',
    amount: 40000,
    date: 'Jun 04',
    game: 'GTA V',
    version: 'Build terbaru',
    egg: 'FiveM',
    gmail: 'rizwan.hakim@yahoo.com',
    username: 'riz5m'
  },
  {
    id: '#GAV-9023-F',
    package: 'Lite',
    customer: 'Andi Saputra',
    customerInitial: 'AS',
    status: 'Pending',
    amount: 13000,
    date: 'Jun 04',
    game: 'Terraria',
    version: 'Versi terbaru',
    egg: 'tModLoader',
    gmail: 'andi.saputra@gmail.com',
    username: 'anditera'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    stars: 5,
    content: 'Server sangat lancar dan admin cepat merespon.',
    author: 'Andi',
    game: 'Minecraft'
  },
  {
    id: 'testi-2',
    stars: 5,
    content: 'Harga terjangkau dengan kualitas premium.',
    author: 'Rizky',
    game: 'GTA V'
  },
  {
    id: 'testi-3',
    stars: 5,
    content: 'Hosting terbaik yang pernah saya gunakan.',
    author: 'Fajar',
    game: 'Rust'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Apakah server online 24 jam?',
    answer: 'Ya, seluruh infrastruktur server fisik kami ditempatkan di data center premium dan dijamin online bersuplay daya cadangan selama 24 jam terus-menerus.'
  },
  {
    id: 'faq-2',
    question: 'Apakah tersedia backup?',
    answer: 'Ya, sistem kami secara otomatis mencadangkan data server Anda ke penyimpanan awan terisolasi setiap hari untuk menghindari risiko hilangnya data.'
  },
  {
    id: 'faq-3',
    question: 'Apakah support cepat?',
    answer: 'Tentu saja, agen dukungan teknis kami siap membalas pesan dan menangani keluhan Anda kapan saja melalui live chat atau pesan WhatsApp resmi kami.'
  },
  {
    id: 'faq-4',
    question: 'Apakah bisa upgrade paket?',
    answer: 'Ya, Anda dapat memulai dari paket terkecil dahulu dan dengan mudah menaikkan spesifikasi (Upgrade RAM/CPU) langsung melalui menu panel kustom.'
  },
  {
    id: 'faq-5',
    question: 'Berapa lama proses aktivasi?',
    answer: 'Instalasi server game dilakukan instan secara otomatis oleh sistem kami dalam waktu kurang dari 30 detik setelah konfirmasi transfer Anda.'
  }
];

export const INITIAL_CONFIG: AppConfig = {
  brandName: 'Gaven Store',
  whatsappContact: '+62 877-4593-5987',
  primaryThemeHex: '#6366f1', // Indigo custom accent instead of cyan
  danaNumber: '085179514462',
  gopayNumber: '085179514462',
  globalLiveFeed: true,
  buyerNameMasking: 'Andi, Rizky, Fajar, Dimas, Reza',
  displayInterval: 10,
  logoUrl: '',
  qrisUrl: '',
  
  heroTitle: 'Hosting Game Cepat, Stabil, dan Terjangkau',
  heroSubtitle: 'Jalankan server Minecraft, Terraria, GTA V, Rust, CS2, dan game lainnya dengan performa tinggi, uptime maksimal, dan dukungan cepat.',
  
  testimonials: INITIAL_TESTIMONIALS,
  faqs: INITIAL_FAQS,
  
  notificationNames: ['Andi', 'Rizky', 'Fajar', 'Dimas', 'Reza', 'Giri', 'Yudi', 'Kevin', 'Irfan', 'Taufik'],
  notificationProducts: [
    'Hosting Minecraft Lite 1GB',
    'Hosting Terraria Lite 2GB',
    'Paket Medium 8GB',
    'Paket Lite 2GB',
    'Paket Standar 4GB',
    'Hosting Palworld Standar 4GB',
    'Hosting Rust Medium 8GB'
  ],
  
  tiktokUrl: '#',
  instagramUrl: '#',
  discordUrl: '#',
  
  adminUsername: 'admin',
  adminPassword: 'gavenstoreadmin123'
};

export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value) as T;
    }
  } catch (e) {
    console.error(`Error loading key: ${key}`, e);
  }
  return defaultValue;
}

export function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error setting key: ${key}`, e);
  }
}
