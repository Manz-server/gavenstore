import React, { useEffect, useRef, useState } from 'react';
import { 
  Check,
  CheckCircle2, 
  Cpu, 
  Server, 
  Zap, 
  ShieldCheck, 
  Gauge, 
  Globe, 
  Headphones, 
  HardDrive, 
  Terminal, 
  Network, 
  RotateCw, 
  ArrowRight,
  Database,
  ChevronDown,
  ShoppingBag,
  ExternalLink,
  Lock,
  MessageSquare,
  Star,
  Sparkles,
  User,
  Mail,
  Shield,
  Phone,
  QrCode,
  Menu,
  X
} from 'lucide-react';
import { Package, Order, AppConfig, Testimonial, FAQItem } from '../types';

interface GavenStoreProps {
  config: AppConfig;
  packages: Package[];
  onOrderCompleted: (newOrder: Order) => void;
  onNavigateToDashboard: () => void;
  onNavigateToLogin: () => void;
}

export default function GavenStore({ config, packages, onOrderCompleted, onNavigateToDashboard, onNavigateToLogin }: GavenStoreProps) {
  // UI states
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [checkoutPackage, setCheckoutPackage] = useState<Package | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Checkout Form states
  const [checkoutStep, setCheckoutStep] = useState<number>(1);
  const [selectedRam, setSelectedRam] = useState<number>(4);
  const [selectedGame, setSelectedGame] = useState<string>('Minecraft');
  const [selectedVersion, setSelectedVersion] = useState<string>('1.21.1');
  const [selectedEgg, setSelectedEgg] = useState<string>('Paper');
  
  // Credentials
  const [gmail, setGmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'DANA' | 'GOPAY' | 'QRIS'>('DANA');
  const [senderName, setSenderName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [checkoutTxId, setCheckoutTxId] = useState('');

  // Floating notification states
  const [showNotification, setShowNotification] = useState(false);
  const [notifName, setNotifName] = useState('Andi');
  const [notifProduct, setNotifProduct] = useState('Hosting Minecraft 4GB');

  // Automated Testimonial Slider state
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Game configuration data mappings
  const GAMES = [
    { name: 'Minecraft', desc: 'Server Minecraft Vanilla, Spigot, BungeeCord, any Modpacks.' },
    { name: 'Terraria', desc: 'Server Terraria Vanilla or tModLoader multiplayer.' },
    { name: 'GTA V', desc: 'Server custom multiplayer FiveM or RedM gaming.' },
    { name: 'Rust', desc: 'Server survival Rust Oxide with plugins support.' },
    { name: 'CS2', desc: 'Counter-Strike 2 competitive and practice server nodes.' },
    { name: 'Lainnya', desc: 'Performa tinggi untuk Palworld, Valheim, ARK, any games.' }
  ];

  const VERSIONS_BY_GAME: Record<string, string[]> = {
    'Minecraft': ['1.20.1', '1.20.4', '1.21.1', '1.21.4', 'Versi terbaru'],
    'Terraria': ['Versi terbaru'],
    'GTA V': ['Build terbaru'],
    'Rust': ['Versi terbaru'],
    'CS2': ['Versi terbaru'],
    'Lainnya': ['Versi terbaru']
  };

  const EGGS_BY_GAME: Record<string, string[]> = {
    'Minecraft': ['Paper', 'Purpur', 'Fabric', 'Forge', 'Vanilla', 'Vanilla Bedrock', 'Mohist', 'Velocity', 'Bungeecord', 'Waterfall'],
    'Terraria': ['Terraria Vanilla', 'tModLoader'],
    'GTA V': ['FiveM', 'RedM'],
    'Rust': ['Rust Vanilla', 'Oxide/uMod Rust'],
    'CS2': ['Counter-Strike 2 Dedicated Server'],
    'Lainnya': ['Egg Kustom']
  };

  // Evaluate password strength: 'Lemah' | 'Sedang' | 'Kuat'
  const getPasswordStrength = (pass: string): 'Lemah' | 'Sedang' | 'Kuat' => {
    if (!pass) return 'Lemah';
    if (pass.length < 6) return 'Lemah';
    
    const hasNumbers = /\D/.test(pass) && /\d/.test(pass);
    const hasSymbols = /[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\:\'\"\,\<\.\>\/\?\\\|]/.test(pass);
    
    if (pass.length >= 8 && hasNumbers && hasSymbols) {
      return 'Kuat';
    }
    if (pass.length >= 6 && (hasNumbers || hasSymbols)) {
      return 'Sedang';
    }
    return 'Lemah';
  };

  // Reset default game variables when selectedGame changes
  useEffect(() => {
    const versions = VERSIONS_BY_GAME[selectedGame] || ['Versi terbaru'];
    const eggs = EGGS_BY_GAME[selectedGame] || ['Egg Kustom'];
    setSelectedVersion(versions[0]);
    setSelectedEgg(eggs[0]);
  }, [selectedGame]);

  // Particle Background System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; alpha: number }[] = [];

    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = Math.min(window.innerHeight, 900);
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const maxParticles = 60;
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * (canvas.width || window.innerWidth),
        y: Math.random() * (canvas.height || 600),
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const hexColor = config.primaryThemeHex || '#6366f1';
      
      // Convert hex to rgb
      const rgb = hexToRgb(hexColor) || '99, 102, 241';
      
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.fillStyle = `rgba(${rgb}, ${p.alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connect particles
      ctx.strokeStyle = `rgba(${rgb}, 0.05)`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [config.primaryThemeHex]);

  // Handle auto-switching the testimonial slide
  useEffect(() => {
    const list = config.testimonials || [];
    if (list.length <= 1) return;
    
    const sliderInterval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % list.length);
    }, 5000);
    
    return () => clearInterval(sliderInterval);
  }, [config.testimonials]);

  // Real-time live buyer notifications popup trigger logic
  useEffect(() => {
    if (!config.globalLiveFeed) {
      setShowNotification(false);
      return;
    }

    const triggerPopup = () => {
      const names = config.notificationNames && config.notificationNames.length > 0
        ? config.notificationNames
        : ['Andi', 'Rizky', 'Fajar', 'Dimas', 'Reza'];
      const products = config.notificationProducts && config.notificationProducts.length > 0
        ? config.notificationProducts
        : ['Hosting Minecraft 4GB', 'Hosting Terraria 2GB', 'Paket Medium 8GB'];

      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomProduct = products[Math.floor(Math.random() * products.length)];

      setNotifName(randomName);
      setNotifProduct(randomProduct);
      setShowNotification(true);

      // Hide notification after 4.5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 4500);
    };

    // First trigger after 4 seconds
    const initialDelay = setTimeout(triggerPopup, 4000);

    // Randomize repeat interval between 8 and 18 seconds
    const intervalTime = Math.max(8, config.displayInterval || 10) * 1000;
    const repeatInterval = setInterval(triggerPopup, intervalTime);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(repeatInterval);
    };
  }, [config.globalLiveFeed, config.displayInterval, config.notificationNames, config.notificationProducts]);

  // Utility converts hex color to rgb string
  function hexToRgb(hex: string): string | null {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
  }

  // Toggle dynamic FAQs accordion panel
  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  // Launch checkout wizard for a designated package
  const startCheckout = (pkg: Package) => {
    if (pkg.stockAmount <= 0) return; // Out of stock
    setCheckoutPackage(pkg);
    setCheckoutStep(1);
    setSelectedRam(4);
    setSenderName('');
    setGmail('');
    setUsername('');
    setPassword('');
    setIsSuccess(false);
  };

  // Finalize buying process, register the transaction log
  const handleConfirmCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutPackage) return;

    // Create unique dynamic transaction reference ID
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    const trxId = `#GAV-${Math.floor(1000 + Math.random() * 9000)}-${randomHex}`;
    
    const customerName = senderName.trim() || 'Pelanggan Gaven';
    const initial = customerName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'PL';

    const newOrder: Order = {
      id: trxId,
      package: `${checkoutPackage.name} (${selectedRam}GB)`,
      customer: customerName,
      customerInitial: initial,
      status: 'Pending',
      amount: checkoutPackage.price * selectedRam,
      date: new Date().toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
      game: selectedGame,
      version: selectedVersion,
      egg: selectedEgg,
      gmail: gmail,
      username: username
    };

    onOrderCompleted(newOrder);
    setCheckoutTxId(trxId);
    setIsSuccess(true);
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num).replace('IDR', 'Rp');
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="bg-transparent text-[#e2e2e2] font-sans selection:bg-indigo-500/30 overflow-x-hidden" ref={containerRef}>
      
      {/* Sliding Navigation Drawer overlay */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div className={`fixed right-0 top-0 h-full w-80 bg-[#070b15]/98 border-l border-white/5 p-6 flex flex-col gap-6 shadow-[0_0_50px_rgba(0,0,0,0.9)] transition-transform duration-300 ease-out transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping"></span>
              <span className="font-heading text-xs font-bold text-white uppercase tracking-widest">Gaven Menu</span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 px-2 rounded-lg bg-white/5 text-[#c6c6cc] hover:text-white hover:bg-white/10 transition-colors text-xs font-bold"
              title="Tutup Menu"
            >
              <X className="w-4 h-4 inline-block" />
            </button>
          </div>

          <div className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#c6c6cc] mt-2">
            <a 
              href="#" 
              onClick={(e) => { 
                e.preventDefault();
                setMobileMenuOpen(false); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }}
              className="hover:text-white flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left"
            >
              <span>Home / Beranda</span>
              <span className="text-[10px] text-[#8e8e99] font-mono">⚡</span>
            </a>
            <a 
              href="#packages" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left"
            >
              <span>Paket Hosting</span>
              <span className="text-[10px] text-[#8e8e99] font-mono">#01</span>
            </a>
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left"
            >
              <span>Keunggulan Gaven</span>
              <span className="text-[10px] text-[#8e8e99] font-mono">#02</span>
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left"
            >
              <span>Testimoni</span>
              <span className="text-[10px] text-[#8e8e99] font-mono">#03</span>
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left"
            >
              <span>FAQ Tanya Jawab</span>
              <span className="text-[10px] text-[#8e8e99] font-mono">#04</span>
            </a>
            <a 
              href="#support" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left"
            >
              <span>Hubungi Kontak kami</span>
              <span className="text-[10px] text-[#8e8e99] font-mono">#05</span>
            </a>
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToLogin();
              }}
              className="w-full text-center text-xs font-bold py-3 bg-white/5 hover:bg-indigo-600 hover:text-white rounded-lg border border-white/10 text-white transition-all block"
            >
              Login Admin Control
            </button>
            <a 
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              style={{ backgroundColor: config.primaryThemeHex || '#6366f1' }}
              className="w-full text-center text-white py-3 rounded-lg text-xs font-bold shadow-[0_4px_14px_rgba(99,102,241,0.3)] hover:brightness-110 active:scale-95 transition-all block"
            >
              Pesan Sekarang
            </a>
          </div>
        </div>
      </div>
      
      {/* Top navbar styled exactly with glass border bottom */}
      <header className="fixed top-0 w-full z-50 bg-[#0f172a]/70 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(15,23,42,0.4)]">
        <nav className="flex justify-between items-center h-20 px-6 md:px-10 max-w-7xl mx-auto">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {config.logoUrl ? (
              <img 
                src={config.logoUrl} 
                alt={`${config.brandName || 'Store'} Logo`} 
                className="w-10 h-10 object-contain rounded-xl bg-white/5 border border-white/10 p-1"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <div 
                  className="w-5 h-5 border-t-2 border-r-2 transform rotate-45 translate-y-0.5" 
                  style={{ borderColor: config.primaryThemeHex || '#6366f1' }}
                />
              </div>
            )}
            
            <span className="font-heading text-lg md:text-xl font-extrabold text-white tracking-tight">
              {config.brandName || 'Gaven Store'}
            </span>
          </div>
          
          {/* Main Navigation links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#c6c6cc]">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#packages" className="hover:text-white transition-colors">Paket Hosting</a>
            <a href="#features" className="hover:text-white transition-colors">Keunggulan</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimoni</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#support" className="hover:text-white transition-colors">Kontak</a>
          </div>
          
          {/* Header button triggers and Quick admin log links */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onNavigateToLogin} 
              className="hidden sm:block text-xs font-bold px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white transition-colors duration-200"
            >
              Login Admin
            </button>
            
            <a 
              href="#packages"
              style={{ backgroundColor: config.primaryThemeHex || '#6366f1' }}
              className="hidden lg:block text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-[0_4px_14px_rgba(99,102,241,0.3)] hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              Pesan Sekarang
            </a>

            {/* Hamburger Button (Garis Tiga) */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all active:scale-95"
              title="Menu Navigasi"
              id="hamburger-menu-btn"
            >
              <Menu className="w-5 h-5 text-indigo-400" />
            </button>
          </div>

        </nav>
      </header>
 
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden bg-transparent">
        <canvas className="absolute inset-0 w-full h-full pointer-events-none z-0" ref={canvasRef} id="particleCanvas" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 animate-pulse">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#e2e2e2]">Premium Game Node Available</span>
          </div>
 
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold mb-6 max-w-4xl mx-auto tracking-tight leading-tight text-white">
            {config.heroTitle || 'Hosting Game Cepat, Stabil, dan Terjangkau'}
          </h1>
 
          <p className="text-sm md:text-lg text-[#c6c6cc]/90 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            {config.heroSubtitle || 'Infrastruktur berperforma tinggi untuk Minecraft, FiveM, Valheim, VDS Gaming, dan server multiplayer. Nikmati latency ultra-rendah dengan proteksi DDoS enterprise.'}
          </p>
 
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
            <a 
              href="#packages"
              style={{ backgroundColor: config.primaryThemeHex || '#6366f1' }}
              className="w-full sm:w-auto text-white px-10 py-4 rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:scale-[1.02] hover:brightness-110 active:scale-98 transition-all duration-200 text-center"
            >
              Mulai Sekarang
            </a>
            
            <a 
              href="#features"
              className="w-full sm:w-auto glass-card text-white px-10 py-4 rounded-xl font-bold text-sm hover:bg-white/10 transition-all duration-200 text-center"
            >
              Keunggulan Kami
            </a>
          </div>
        </div>
      </section>
 
      {/* Stats Counter Section with dynamic counter visuals */}
      <section className="py-16 bg-[#0f172a]/40 backdrop-blur-md border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          
          <div className="space-y-1">
            <div 
              style={{ color: config.primaryThemeHex || '#6366f1' }}
              className="font-heading text-3xl md:text-4xl font-extrabold"
            >
              150+
            </div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#c6c6cc]">Pelanggan Aktif</div>
          </div>
          
          <div className="space-y-1">
            <div 
              style={{ color: config.primaryThemeHex || '#6366f1' }}
              className="font-heading text-3xl md:text-4xl font-extrabold"
            >
              100+
            </div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#c6c6cc]">Server Aktif</div>
          </div>
          
          <div className="space-y-1">
            <div 
              style={{ color: config.primaryThemeHex || '#6366f1' }}
              className="font-heading text-3xl md:text-4xl font-extrabold"
            >
              99.9%
            </div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#c6c6cc]">Guaranteed Uptime</div>
          </div>
          
          <div className="space-y-1">
            <div 
              style={{ color: config.primaryThemeHex || '#6366f1' }}
              className="font-heading text-3xl md:text-4xl font-extrabold"
            >
              Fast
            </div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#c6c6cc]">Support Tanggap</div>
          </div>

        </div>
      </section>

      {/* Pricing Packages Area */}
      <section className="py-24 relative z-10" id="packages">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">Pilih Paket Hosting Anda</h2>
            <p className="text-xs md:text-sm text-[#c6c6cc] max-w-lg mx-auto">Kami menyediakan cluster hardware enterprise berskala tinggi untuk melayani jutaan pemain game serentak.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.filter(p => p.active !== false).map((pkg) => {
              const outOfStock = pkg.stockAmount <= 0;
              return (
                <div 
                  key={pkg.id} 
                  className={`glass-card rounded-2xl p-8 relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                    pkg.badge ? 'border-2' : ''
                  }`}
                  style={{ 
                    borderColor: pkg.badge ? (config.primaryThemeHex || '#6366f1') : 'rgba(255,255,255,0.08)' 
                  }}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <span 
                      style={{ backgroundColor: config.primaryThemeHex || '#6366f1' }}
                      className="absolute top-4 right-4 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md"
                    >
                      {pkg.badge}
                    </span>
                  )}

                  {/* Stock Alert Label */}
                  {outOfStock && (
                    <span className="absolute top-4 left-4 bg-red-500/10 text-red-500 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full animate-pulse">
                      Out Of Stock
                    </span>
                  )}

                  <div>
                    {/* Header info */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                        {pkg.icon === 'Zap' ? <Zap className="w-5 h-5 text-indigo-400" /> : pkg.icon === 'Server' ? <Server className="w-5 h-5 text-indigo-400" /> : <Cpu className="w-5 h-5 text-indigo-400" />}
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-extrabold text-white">{pkg.name}</h3>
                        <p className="text-xs text-[#c6c6cc]">{pkg.subtitle}</p>
                      </div>
                    </div>

                    {/* Cost */}
                    <div className="mb-6 flex items-baseline">
                      <span className="text-3xl font-extrabold text-white">{formatRupiah(pkg.price)}</span>
                      <span className="text-xs text-[#c6c6cc] ml-1.5">{pkg.id === 'dedicated-extreme' ? '/node' : '/ GB'}</span>
                    </div>

                    {/* Processor Hardware block */}
                    <div className="mb-6 bg-white/[0.02] p-4 rounded-xl border border-white/5 flex items-center gap-3">
                      <Cpu className="w-5 h-5 text-indigo-300" />
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-[#c6c6cc]">Processor</span>
                        <span className="text-xs text-white font-semibold">{pkg.processor}</span>
                      </div>
                    </div>

                    <div className="mb-6 space-y-1 text-xs text-[#c6c6cc]">
                      <div className="flex justify-between py-1 border-b border-white/[0.03]">
                        <span>Format Memory</span>
                        <span className="text-white font-medium">{pkg.ram}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/[0.03]">
                        <span>Storage</span>
                        <span className="text-white font-medium">{pkg.storage}</span>
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="border-t border-white/5 pt-6 space-y-3 mb-8">
                      {(pkg.features || []).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span className="text-white">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ordering CTAs */}
                  <button
                    disabled={outOfStock}
                    onClick={() => startCheckout(pkg)}
                    style={{ 
                      backgroundColor: outOfStock ? 'rgba(255,255,255,0.05)' : (config.primaryThemeHex || '#6366f1'),
                      color: outOfStock ? '#71717a' : 'white'
                    }}
                    className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                      outOfStock 
                        ? 'cursor-not-allowed text-[#71717a]' 
                        : 'hover:brightness-110 active:scale-95 shadow-[0_4px_14px_rgba(99,102,241,0.2)]'
                    }`}
                  >
                    {outOfStock ? 'Out Of Stock' : 'Pesan Sekarang'}
                  </button>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Keunggulan Section */}
      <section className="py-24 bg-[#0a0f1d]/30 backdrop-blur-md border-y border-white/5 relative z-10" id="features">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">Keunggulan Infrastruktur Kami</h2>
            <p className="text-xs md:text-sm text-[#c6c6cc] max-w-lg mx-auto">Kami didukung oleh infrastruktur jaringan enterprise global berkecepatan ultra dan proteksi DDoS tingkat lanjut.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 glass-card rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[#e2e2e2] mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">CPU High Performance</h4>
              <p className="text-xs text-[#c6c6cc] leading-relaxed">Menyediakan prosesor AMD Ryzen 9 7950X & AMD EPYC berkecepatan hingga 5.7 GHz untuk stabilitas frame rate game tertinggi.</p>
            </div>

            <div className="p-6 glass-card rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[#e2e2e2] mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">Proteksi DDoS</h4>
              <p className="text-xs text-[#c6c6cc] leading-relaxed">Perisai pertahanan andalan berlapis-lapis gratis untuk meraup dan menangkal serangan siber DDoS di atas 1 Gbps.</p>
            </div>

            <div className="p-6 glass-card rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[#e2e2e2] mb-5">
                <HardDrive className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">SSD NVMe</h4>
              <p className="text-xs text-[#c6c6cc] leading-relaxed">Penyimpanan disk kustom piringan NVMe M.2 yang melesat cepat, melipat gandakan kecepatan loading dunia permainan Anda.</p>
            </div>

            <div className="p-6 glass-card rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[#e2e2e2] mb-5">
                <Gauge className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">Uptime Tinggi</h4>
              <p className="text-xs text-[#c6c6cc] leading-relaxed">Cluster node redundan menjamin tingkat ketersediaan seumur hidup hingga 99.9% agar server Anda selalu siap dinikmati.</p>
            </div>

            <div className="p-6 glass-card rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[#e2e2e2] mb-5">
                <Headphones className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">Fast Support</h4>
              <p className="text-xs text-[#c6c6cc] leading-relaxed">Responsivitas bantuan cepat WhatsApp dari tim teknis berpengalaman kami untuk memecahkan hambatan startup harian.</p>
            </div>

            <div className="p-6 glass-card rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[#e2e2e2] mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">Keamanan Maksimal</h4>
              <p className="text-xs text-[#c6c6cc] leading-relaxed">Enkripsi tangguh berlapis-lapis mengamankan seluruh informasi login credential server dan database pemain dari eksploitasi jahat.</p>
            </div>

            <div className="p-6 glass-card rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[#e2e2e2] mb-5">
                <Network className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">Optimized For Gaming</h4>
              <p className="text-xs text-[#c6c6cc] leading-relaxed">Konfigurasi kernel Linux kustom yang dioptimalkan murni untuk melayani game latency ultra-rendah dan penanganan paket cepat.</p>
            </div>

            <div className="p-6 glass-card rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[#e2e2e2] mb-5">
                <RotateCw className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">Deployment Cepat</h4>
              <p className="text-xs text-[#c6c6cc] leading-relaxed">Setelah pembayaran terverifikasi, server game langsung dideploy secara otomatis oleh robot pintar kami dalam 30 detik.</p>
            </div>

          </div>

        </div>
      </section>

      {/* Testimonials section with slider */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center relative z-10" id="testimonials">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-extrabold text-white mb-4">Apa Kata Pelanggan Kami</h2>
          <p className="text-xs text-[#c6c6cc] uppercase tracking-widest font-bold">Testimoni Real-Time Pelanggan Setia Gaven Store</p>
        </div>

        <div className="glass-card p-10 rounded-2xl relative overflow-hidden max-w-2xl mx-auto">
          {config.testimonials && config.testimonials.length > 0 ? (
            <div className="space-y-6 transition-all duration-500">
              {/* Stars rendering - Star Icons exclusively, no raw emojis */}
              <div className="flex justify-center gap-1">
                {Array.from({ length: config.testimonials[testimonialIndex]?.stars || 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-sm md:text-lg text-white font-medium italic leading-relaxed">
                "{config.testimonials[testimonialIndex]?.content}"
              </blockquote>

              <div>
                <p className="font-bold text-white text-sm">{config.testimonials[testimonialIndex]?.author}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#c6c6cc]">{config.testimonials[testimonialIndex]?.game} Server Owner</p>
              </div>

              {/* Slider Dots */}
              <div className="flex justify-center gap-2.5 pt-4">
                {config.testimonials.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setTestimonialIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      testimonialIndex === idx ? 'w-6 bg-indigo-500' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-[#c6c6cc]">Belum ada ulasan testimoni.</p>
          )}
        </div>
      </section>

      {/* Accordion FAQ Area */}
      <section className="py-24 max-w-3xl mx-auto px-6 relative z-10" id="faq">
        <h2 className="font-heading text-3xl font-extrabold text-white mb-10 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {(config.faqs || []).map((faq) => (
            <div 
              key={faq.id}
              className="accordion-item glass-card rounded-xl overflow-hidden cursor-pointer transition-all border border-white/5 hover:border-white/10" 
              onClick={() => toggleAccordion(faq.id)}
            >
              <div className="flex justify-between items-center p-6">
                <h5 className="font-bold text-xs md:text-sm text-white">{faq.question}</h5>
                <ChevronDown className={`w-4 h-4 text-[#c6c6cc] transition-transform duration-300 shrink-0 ${activeAccordion === faq.id ? 'transform rotate-180 text-indigo-400' : ''}`} />
              </div>
              
              {activeAccordion === faq.id && (
                <div className="px-6 pb-6 text-xs text-[#c6c6cc] leading-relaxed border-t border-white/5 pt-4 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Support / Contact details info */}
      <section className="py-16 bg-[#0a0f1d]/20 backdrop-blur-md border-t border-white/5 relative z-10" id="support">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="font-heading text-2xl font-bold text-white mb-3">Butuh Bantuan Lebih Lanjut?</h3>
          <p className="text-xs text-[#c6c6cc] mb-8 max-w-md mx-auto">Kami siap menangani pertanyaan setup atau konfigurasi world backup Anda kapan saja.</p>
          
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a 
              href={`https://wa.me/${config.whatsappContact.replace(/[^0-9]/g, '')}`} 
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 bg-[#25D366] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:scale-105 active:scale-95 transition-all text-center"
            >
              <Phone className="w-4 h-4" /> Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer Area */}
      <footer className="bg-[#0c1222]/80 backdrop-blur-xl border-t border-white/5 py-12 px-6 md:px-10 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              {config.logoUrl ? (
                <img 
                  src={config.logoUrl} 
                  alt={`${config.brandName || 'Store'} Logo`} 
                  className="w-8 h-8 object-contain rounded-lg bg-white/5 border border-white/10 p-0.5" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <div className="w-3.5 h-3.5 border-t-2 border-r-2 transform rotate-45 translate-y-0.5" style={{ borderColor: config.primaryThemeHex || '#6366f1' }}></div>
                </div>
              )}
              <span className="font-heading text-sm font-extrabold text-white tracking-tight">{config.brandName || 'Gaven Store'}</span>
            </div>
            
            <p className="text-xs text-[#c6c6cc]/80 leading-relaxed">
              Hosting Game Cepat, Stabil, dan Terpercaya. Infrastruktur game berlatensi ultra-rendah andalan Anda.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-xs">
            
            <div>
              <h6 className="font-bold text-white mb-4 uppercase tracking-widest text-[#c6c6cc]">Produk</h6>
              <ul className="space-y-2.5 text-[#c6c6cc]">
                <li><a className="hover:text-white transition-colors" href="#packages">Lite Node</a></li>
                <li><a className="hover:text-white transition-colors" href="#packages">Standard EPYC</a></li>
                <li><a className="hover:text-white transition-colors" href="#packages">Medium Ryzen 9</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-bold text-white mb-4 uppercase tracking-widest text-[#c6c6cc]">Navigasi</h6>
              <ul className="space-y-2.5 text-[#c6c6cc]">
                <li><a className="hover:text-white transition-colors" href="#packages">Paket</a></li>
                <li><a className="hover:text-white transition-colors" href="#features">Keunggulan</a></li>
                <li><a className="hover:text-white transition-colors" href="#faq">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-bold text-white mb-4 uppercase tracking-widest text-[#c6c6cc]">Social Media</h6>
              <ul className="space-y-2.5 text-[#c6c6cc]">
                <li><a className="hover:text-white transition-colors" href={config.tiktokUrl || '#'}>TikTok</a></li>
                <li><a className="hover:text-white transition-colors" href={config.instagramUrl || '#'}>Instagram</a></li>
                <li><a className="hover:text-white transition-colors" href={config.discordUrl || '#'}>Discord</a></li>
              </ul>
            </div>

          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#c6c6cc]">
          <p>© 2026 {config.brandName || 'Gaven Store'}. Hosting Game Cepat, Stabil, dan Terpercaya.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer" onClick={onNavigateToDashboard}>Admin Management Console</span>
          </div>
        </div>
      </footer>

      {/* Interactive 6-step Checkout Modal */}
      {checkoutPackage && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="glass-card bg-[#0f172a]/95 border border-white/10 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl relative mx-auto my-8">
            
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-15">
              <button 
                onClick={() => setCheckoutPackage(null)} 
                className="text-[#c6c6cc] hover:text-white bg-white/5 hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all"
              >
                ✕
              </button>
            </div>

            {/* Steps Tracker Rendered Professionally in Header */}
            {!isSuccess && (
              <div className="px-8 pt-8 pb-4 border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingBag className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-heading text-lg font-bold text-white">Alur Pembelian</h3>
                </div>
                
                {/* Visual Step Indicator Nodes */}
                <div className="grid grid-cols-7 gap-1 relative">
                  {[1, 2, 3, 4, 5, 6, 7].map((st) => (
                    <div key={st} className="flex flex-col items-center">
                      <div 
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                          checkoutStep === st 
                            ? 'bg-indigo-500 text-white ring-4 ring-indigo-500/10' 
                            : checkoutStep > st 
                              ? 'bg-[#10b981] text-white' 
                              : 'bg-white/5 border border-white/10 text-[#c6c6cc]'
                        }`}
                      >
                        {checkoutStep > st ? '✓' : st}
                      </div>
                      <span className="text-[8px] uppercase tracking-wider text-[#c6c6cc] mt-1 hidden sm:block text-center">
                        {st === 1 ? 'RAM' : st === 2 ? 'Paket' : st === 3 ? 'Game' : st === 4 ? 'Versi' : st === 5 ? 'Software' : st === 6 ? 'Akun' : 'Bayar'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Success screen vs Steps Forms Container */}
            {isSuccess ? (
              <div className="p-8 text-center animate-fade-in space-y-6">
                <div className="w-16 h-16 bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-heading text-2xl font-black text-white">Pesanan Terkirim!</h3>
                  <p className="text-xs text-[#c6c6cc] leading-relaxed max-w-sm mx-auto">
                    Terima kasih, order telah diteruskan ke database Admin Panel Gaven Store. Status order saat ini adalah <strong>Pending</strong> menunggu verifikasi transfer Anda.
                  </p>
                </div>

                <div className="bg-white/5 p-5 rounded-xl border border-white/10 text-left text-xs space-y-2.5 max-w-sm mx-auto font-sans">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-[#c6c6cc]">Reference ID:</span>
                    <span className="font-mono text-indigo-400 font-bold">{checkoutTxId}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-[#c6c6cc]">Paket & Game:</span>
                    <span className="text-white font-semibold">{checkoutPackage?.name} ({selectedRam}GB) - {selectedGame}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1 block">
                    <span className="text-[#c6c6cc]">Egg Software:</span>
                    <span className="text-white">{selectedEgg} ({selectedVersion})</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-[#c6c6cc]">Biaya Paket:</span>
                    <span className="text-white font-black text-sm">{formatRupiah((checkoutPackage?.price || 0) * selectedRam)}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2 max-w-sm mx-auto">
                  {(() => {
                    const waText = `*DETAIL PESANAN GAVEN STORE*\n\n> Reference ID: \n*﹝${checkoutTxId}﹞*\n\n> Paket & Game: \n*﹝${checkoutPackage?.name} ( ${selectedRam} GB ) - ${selectedGame}﹞*\n\n> Software egg:\n*﹝${selectedEgg}﹞*\n\n> Gmail Buyer:\n*﹝${gmail}﹞*\n\n> Username Buyer:\n*﹝${username}﹞*\n\n> Password Buyer:\n*﹝${password}﹞*\n\n> Biaya Paket:\n*﹝${formatRupiah((checkoutPackage?.price || 0) * selectedRam)}﹞*\n\n﹝❗﹞ \`\`\`Kirim Bukti Transfer Dan Admin Akan Memproses Secepatnya\`\`\``;
                    const waUrl = `https://wa.me/${config.whatsappContact.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waText)}`;
                    
                    return (
                      <a 
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-[#25D366] text-white text-xs font-bold py-3.5 rounded-lg flex items-center justify-center gap-1.5 active:scale-98 transition-all hover:brightness-105"
                      >
                        Konfirmasi via WhatsApp
                      </a>
                    );
                  })()}
                  <button 
                    onClick={() => setCheckoutPackage(null)}
                    className="w-full text-xs font-semibold text-[#c6c6cc] hover:text-white py-2"
                  >
                    Kembali ke Toko
                  </button>
                </div>
              </div>
            ) : (
              /* ACTIVE STEPS HANDLERS */
              <div className="p-8">
                
                {/* STEP 1: CHOOSE RAM CAPACITY */}
                {checkoutStep === 1 && (
                  <div className="space-y-6 animate-fade-in text-xs">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-white mb-1.5 font-sans">Langkah 1: Tentukan Kapasitas RAM Server ({selectedRam} GB)</h4>
                      <p className="text-[11px] text-[#c6c6cc] mb-4 font-sans leading-relaxed">
                        Geser slider atau klik preset kapasitas RAM untuk server game Anda (pilihan dari 1 GB hingga 32 GB):
                      </p>
                    </div>

                    {/* Interactive Slider custom styled with theme color track */}
                    <div className="bg-white/[0.02] p-5 rounded-xl border border-white/5 space-y-4 font-sans">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[#c6c6cc] font-medium">Kapasitas RAM terpilih:</span>
                        <span className="text-2xl font-black text-white font-mono">{selectedRam} GB</span>
                      </div>
                      
                      <div className="relative pt-2">
                        <input 
                          type="range"
                          min="1"
                          max="32"
                          step="1"
                          value={selectedRam}
                          onChange={(e) => setSelectedRam(parseInt(e.target.value))}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-800 accent-indigo-500 hover:accent-indigo-400 focus:outline-none"
                          style={{
                            background: `linear-gradient(to right, ${config.primaryThemeHex || '#6366f1'} 0%, ${config.primaryThemeHex || '#6366f1'} ${(selectedRam - 1) / 31 * 100}%, #1e293b ${(selectedRam - 1) / 31 * 100}%, #1e293b 100%)`
                          }}
                        />
                        <div className="flex justify-between text-[10px] text-[#8e8e99] font-mono mt-2 px-1">
                          <span>1 GB</span>
                          <span>8 GB</span>
                          <span>16 GB</span>
                          <span>24 GB</span>
                          <span>32 GB</span>
                        </div>
                      </div>
                    </div>

                    {/* Presets Grid */}
                    <div className="space-y-2 font-sans">
                      <label className="block text-[#c6c6cc] font-bold uppercase tracking-wider text-[10px]">Preset RAM Populer</label>
                      <div className="grid grid-cols-5 gap-2 font-mono">
                        {[1, 2, 4, 8, 12, 16, 20, 24, 28, 32].map((gb) => (
                          <button
                            key={gb}
                            type="button"
                            onClick={() => setSelectedRam(gb)}
                            className={`py-2 px-1 text-center rounded-lg text-xs font-black border transition-all ${
                              selectedRam === gb 
                                ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' 
                                : 'bg-white/[0.01] border-white/5 text-[#c6c6cc] hover:bg-white/5'
                            }`}
                          >
                            {gb}GB
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Live price calculation preview */}
                    <div className="bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/15 flex justify-between items-baseline font-sans">
                      <span className="text-[#c6c6cc] font-semibold text-[11px]">Estimasi Biaya ({checkoutPackage.name}):</span>
                      <div className="text-right">
                        <span className="text-[10px] text-[#8e8e99] block font-mono">({formatRupiah(checkoutPackage.price)} x {selectedRam} GB)</span>
                        <span className="text-base font-black text-white font-mono">{formatRupiah(checkoutPackage.price * selectedRam)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: CHOOSE PACKAGE */}
                {checkoutStep === 2 && (
                  <div className="space-y-4 animate-fade-in font-sans">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-white mb-1.5">Langkah 2: Pilih Tier Server Nodes</h4>
                      <p className="text-[11px] text-[#c6c6cc] mb-4">Ganti paket aktif atau konfirmasikan pilihan Anda di bawah ini:</p>
                    </div>

                    <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                      {packages.filter(p => p.active !== false && p.stockAmount > 0).map((pkg) => (
                        <label 
                          key={pkg.id} 
                          onClick={() => setCheckoutPackage(pkg)}
                          className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            checkoutPackage.id === pkg.id 
                              ? 'border-indigo-500 bg-indigo-500/5' 
                              : 'border-white/5 bg-white/[0.02] hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input 
                              type="radio" 
                              name="checkout-pkg" 
                              checked={checkoutPackage.id === pkg.id} 
                              onChange={() => setCheckoutPackage(pkg)}
                              className="accent-indigo-500"
                            />
                            <div>
                              <span className="text-xs font-bold text-white block">{pkg.name}</span>
                              <span className="text-[10px] text-[#c6c6cc] block leading-tight">{pkg.processor} ({pkg.storage})</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-extrabold text-[#6366f1] block">{formatRupiah(pkg.price)}/GB</span>
                            <span className="text-[10px] text-[#8e8e99] block font-semibold">Total: {formatRupiah(pkg.price * selectedRam)}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: SELECT GAME */}
                {checkoutStep === 3 && (
                  <div className="space-y-4 animate-fade-in font-sans">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-white mb-1.5">Langkah 3: Pilih Game</h4>
                      <p className="text-[11px] text-[#c6c6cc] mb-4">Pilih jenis server game yang ingin Anda jalankan:</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 max-h-[200px] overflow-y-auto pr-1">
                      {GAMES.map((game) => (
                        <div 
                          key={game.name}
                          onClick={() => setSelectedGame(game.name)}
                          className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                            selectedGame === game.name 
                              ? 'border-indigo-500 bg-indigo-500/5' 
                              : 'border-white/5 bg-white/[0.01] hover:bg-white/5'
                          }`}
                        >
                          <span className="text-xs font-bold text-white block mb-1">{game.name}</span>
                          <span className="text-[10px] text-[#c6c6cc] block leading-tight">{game.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4: SELECT VERSION */}
                {checkoutStep === 4 && (
                  <div className="space-y-4 animate-fade-in font-sans">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-white mb-1.5 font-sans">Langkah 4: Pilih Versi Game ({selectedGame})</h4>
                      <p className="text-[11px] text-[#c6c6cc] mb-4">Pilih versi rilis game or gunakan rilis mutakhir:</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {(VERSIONS_BY_GAME[selectedGame] || ['Versi terbaru']).map((ver) => (
                        <button
                          key={ver}
                          type="button"
                          onClick={() => setSelectedVersion(ver)}
                          className={`p-3 text-left rounded-lg text-xs font-bold border transition-all ${
                            selectedVersion === ver 
                              ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' 
                              : 'bg-white/[0.01] border-white/5 text-[#c6c6cc] hover:bg-white/5'
                          }`}
                        >
                          {ver}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5: SELECT EGG SOFTWARE */}
                {checkoutStep === 5 && (
                  <div className="space-y-4 animate-fade-in font-sans">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-white mb-1.5">Langkah 5: Pilih Software / Egg ({selectedGame})</h4>
                      <p className="text-[11px] text-[#c6c6cc] mb-4">Spesifikasi software startup loader di panel:</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[180px] overflow-y-auto pr-1">
                      {(EGGS_BY_GAME[selectedGame] || ['Egg Kustom']).map((egg) => (
                        <button
                          key={egg}
                          type="button"
                          onClick={() => setSelectedEgg(egg)}
                          className={`p-3 text-left rounded-lg text-xs font-semibold border transition-all truncate ${
                            selectedEgg === egg 
                              ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' 
                              : 'bg-white/[0.01] border-white/5 text-[#c6c6cc] hover:bg-white/5'
                          }`}
                          title={egg}
                        >
                          {egg}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 6: FILL CREDENTIALS FORM */}
                {checkoutStep === 6 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-white mb-1.5">Langkah 6: Akun Akses Panel</h4>
                      <p className="text-[11px] text-[#c6c6cc] mb-4 font-sans">Informasi login ini digunakan untuk mendaftarkan akun Pterodactyl Anda:</p>
                    </div>

                    <div className="space-y-3 font-sans text-xs">
                      <div>
                        <label className="block text-[#c6c6cc] mb-1 font-semibold">Alamat Email (Gmail)</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#c6c6cc]/40"><Mail className="w-4 h-4" /></span>
                          <input 
                            required
                            type="email"
                            className="w-full pl-9 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                            placeholder="nama@gmail.com"
                            value={gmail}
                            onChange={(e) => setGmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#c6c6cc] mb-1 font-semibold">Username Game Panel</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#c6c6cc]/40"><User className="w-4 h-4" /></span>
                          <input 
                            required
                            type="text"
                            className="w-full pl-9 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                            placeholder="contoh: rafi_gaming"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#c6c6cc] mb-1 font-semibold">Password Akses Panel</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#c6c6cc]/40"><Lock className="w-4 h-4" /></span>
                          <input 
                            required
                            type="password"
                            className="w-full pl-9 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                            placeholder="Password aman..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        
                        {/* Password strength progress bar and indicator label */}
                        {password && (
                          <div className="mt-2.5 space-y-1">
                            <div className="flex justify-between text-[10px] items-center font-sans">
                              <span className="text-[#c6c6cc]">Kekuatan Password:</span>
                              <span className={`font-bold uppercase ${
                                strength === 'Kuat' ? 'text-emerald-400' : strength === 'Sedang' ? 'text-amber-400' : 'text-red-400'
                              }`}>{strength}</span>
                            </div>
                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full transition-all duration-300 ${
                                strength === 'Kuat' ? 'w-full bg-emerald-500' : strength === 'Sedang' ? 'w-2/3 bg-amber-500' : 'w-1/3 bg-red-500'
                              }`} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 7: PAYMENT SELECTION */}
                {checkoutStep === 7 && (
                  <form onSubmit={handleConfirmCheckout} className="space-y-4 animate-fade-in text-xs font-sans">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-white mb-1.5">Langkah 7: Selesaikan Pembayaran</h4>
                      <p className="text-[11px] text-[#c6c6cc] mb-3">Pilih metode pembayaran dan selesaikan transfer:</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 font-sans font-semibold">
                      {['DANA', 'GOPAY', 'QRIS'].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method as any)}
                          className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all ${
                            paymentMethod === method 
                              ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' 
                              : 'bg-white/[0.01] border-white/5 text-[#c6c6cc] hover:bg-white/5'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>

                    {/* QRIS / Wallet Instruction Panel */}
                    <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 text-center space-y-3 font-sans">
                      {paymentMethod === 'QRIS' ? (
                        <div className="space-y-2">
                          <span className="block text-[10px] font-bold text-[#c6c6cc] uppercase tracking-wider">Pindai Kode QRIS</span>
                          <div className="w-32 h-32 bg-white rounded-lg p-2 mx-auto flex items-center justify-center">
                            {config.qrisUrl ? (
                              <img src={config.qrisUrl} alt="QRIS Gateway" className="w-full h-full object-contain" />
                            ) : (
                              <QrCode className="w-24 h-24 text-black" />
                            )}
                          </div>
                          <span className="block text-[10px] text-[#c6c6cc]">Aman dan instan didukung semua e-wallet Indonesia.</span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="block text-[10px] font-bold text-[#c6c6cc] uppercase tracking-wider">Nomor Rekening {paymentMethod}</span>
                          <div className="text-lg font-mono font-black text-white selection:bg-indigo-500/50">
                            {paymentMethod === 'DANA' ? (config.danaNumber || '085179514462') : (config.gopayNumber || '085179514462')}
                          </div>
                          <span className="block text-[10px] text-[#c6c6cc]">a.n. GAVEN INFRASTRUCTURES.</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2.5 text-xs font-sans">
                      <div>
                        <label className="block text-[#c6c6cc] mb-1 font-semibold">Nama Pengirim Transfer / Atas Nama Rekening</label>
                        <input 
                          required
                          type="text"
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                          placeholder="Masukkan nama pengirim untuk validasi..."
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="pt-2 bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/10 flex justify-between items-baseline font-sans">
                      <span className="font-semibold text-[#c6c6cc]">Total Transfer:</span>
                      <span className="text-base font-black text-white font-mono">{formatRupiah(checkoutPackage.price * selectedRam)}</span>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-indigo-500 text-white font-bold py-3.5 rounded-xl block hover:brightness-110 shadow-[0_4px_14px_rgba(99,102,241,0.3)] transition-all uppercase font-sans text-xs tracking-wider"
                    >
                      Saya Sudah Membayar
                    </button>
                  </form>
                )}

                {/* MODAL FOOTER BUTTONS CONTROLS */}
                {!isSuccess && (
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 text-xs text-[#c6c6cc]">
                    <button
                      type="button"
                      disabled={checkoutStep === 1}
                      onClick={() => setCheckoutStep(prev => prev - 1)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 font-bold rounded-lg transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                    >
                      Kembali
                    </button>
                    <span className="font-sans">Langkah {checkoutStep} dari 7</span>
                    {checkoutStep < 7 ? (
                      <button
                        type="button"
                        onClick={() => {
                          // Validation checks before advancing
                          if (checkoutStep === 6 && (!gmail || !username || !password)) {
                            alert('Silakan isi seluruh formulir credential panel.');
                            return;
                          }
                          setCheckoutStep(prev => prev + 1);
                        }}
                        className="px-5 py-2 hover:brightness-110 font-bold rounded-lg transition-all text-white font-sans"
                        style={{ backgroundColor: config.primaryThemeHex || '#6366f1' }}
                      >
                        Lanjut
                      </button>
                    ) : (
                      <span /> // Covered by pembayaran submit button
                    )}
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}

      {/* Floating purchase notification bubble in bottom-left */}
      <div 
        className={`fixed bottom-8 left-8 z-50 glass-card bg-slate-900/95 border border-indigo-500/30 p-4 rounded-xl flex items-center gap-4 max-w-sm transition-all duration-500 transform ${
          showNotification ? 'translate-x-0 opacity-100' : '-translate-x-[150%] opacity-0'
        }`}
        id="notification-popup"
      >
        <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 shrink-0">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-white leading-normal">{notifName} baru saja membeli</p>
          <p className="text-[11px] text-indigo-400 font-semibold leading-normal">{notifProduct}</p>
        </div>
      </div>

      {/* WhatsApp Floating Action Button */}
      <a 
        target="_blank"
        rel="noreferrer"
        href={`https://wa.me/${config.whatsappContact.replace(/[^0-9]/g, '')}`} 
        className="fixed bottom-8 right-8 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all text-center flex items-center justify-center cursor-pointer"
        title="Hubungi Admin WhatsApp"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.237 3.484 8.417 0 6.556-5.332 11.892-11.891 11.892-1.999 0-3.956-.503-5.69-1.448l-6.306 1.652zm6.599-3.835c1.611.958 3.513 1.462 5.441 1.462 5.732 0 10.391-4.659 10.391-10.392 0-2.774-1.084-5.388-3.053-7.357-1.968-1.969-4.58-3.053-7.351-3.053-5.733 0-10.391 4.659-10.391 10.391 0 1.944.512 3.843 1.482 5.444l-1.104 4.045 4.144-1.086zm10.962-7.31c-.301-.151-1.784-.881-2.062-.982-.278-.1-.482-.151-.684.151-.202.302-.782.982-.958 1.183-.176.202-.352.227-.654.076-.301-.151-1.274-.469-2.426-1.496-.897-.8-1.502-1.787-1.678-2.089-.176-.302-.019-.465.132-.615.136-.135.301-.352.453-.529.151-.176.202-.302.302-.503.101-.201.05-.378-.026-.529-.076-.151-.684-1.649-.937-2.258-.247-.594-.497-.513-.684-.522-.176-.008-.378-.01-.58-.01-.202 0-.53.076-.807.378-.278.302-1.06 1.036-1.06 2.53 0 1.493 1.086 2.934 1.237 3.136.151.202 2.138 3.264 5.178 4.57.723.311 1.287.496 1.728.636.726.231 1.387.198 1.91.12.583-.087 1.784-.73 2.036-1.436.252-.705.252-1.309.176-1.436-.076-.126-.278-.202-.58-.352z"></path>
        </svg>
      </a>

    </div>
  );
}
