import React, { useState } from 'react';
import { 
  Brush, 
  Save, 
  Trash, 
  Edit, 
  Plus, 
  X, 
  Check, 
  SlidersHorizontal,
  UploadCloud,
  Layers,
  Database,
  Smartphone,
  Info,
  HelpCircle,
  MessageSquare,
  Star,
  Bell,
  Sparkles,
  Link,
  ChevronDown
} from 'lucide-react';
import { AppConfig, Package, Testimonial, FAQItem } from '../types';

interface AdminSettingsProps {
  config: AppConfig;
  packages: Package[];
  onSaveConfig: (updatedConfig: AppConfig) => void;
  onUpdatePackages: (updatedPackages: Package[]) => void;
}

export default function AdminSettings({ config, packages, onSaveConfig, onUpdatePackages }: AdminSettingsProps) {
  // Config Form State
  const [brandName, setBrandName] = useState(config.brandName || 'Gaven Store');
  const [whatsappContact, setWhatsappContact] = useState(config.whatsappContact || '+62 877-4593-5987');
  const [primaryThemeHex, setPrimaryThemeHex] = useState(config.primaryThemeHex || '#6366f1');
  const [danaNumber, setDanaNumber] = useState(config.danaNumber || '085179514462');
  const [gopayNumber, setGopayNumber] = useState(config.gopayNumber || '085179514462');
  const [globalLiveFeed, setGlobalLiveFeed] = useState(config.globalLiveFeed ?? true);
  const [displayInterval, setDisplayInterval] = useState(config.displayInterval || 10);
  const [logoPreview, setLogoPreview] = useState<string>(config.logoUrl || '');
  const [qrisPreview, setQrisPreview] = useState<string>(config.qrisUrl || '');

  // Hero custom text
  const [heroTitle, setHeroTitle] = useState(config.heroTitle || 'Hosting Game Cepat, Stabil, dan Terjangkau');
  const [heroSubtitle, setHeroSubtitle] = useState(config.heroSubtitle || 'Jalankan server Minecraft, Terraria, GTA V, Rust, CS2, dan game lainnya dengan performa tinggi, uptime maksimal, dan dukungan cepat.');

  // Live pops configs
  const [notificationNamesStr, setNotificationNamesStr] = useState((config.notificationNames || []).join(', '));
  const [notificationProductsStr, setNotificationProductsStr] = useState((config.notificationProducts || []).join(', '));

  // Social Links
  const [tiktokUrl, setTiktokUrl] = useState(config.tiktokUrl || '#');
  const [instagramUrl, setInstagramUrl] = useState(config.instagramUrl || '#');
  const [discordUrl, setDiscordUrl] = useState(config.discordUrl || '#');

  // Admin Credentials State
  const [adminUsername, setAdminUsernameState] = useState(config.adminUsername || 'admin');
  const [adminPassword, setAdminPasswordState] = useState(config.adminPassword || 'gavenstoreadmin123');

  // FAQs local state
  const [faqs, setFaqs] = useState<FAQItem[]>(config.faqs || []);
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  // Testimonials local state
  const [testimonials, setTestimonials] = useState<Testimonial[]>(config.testimonials || []);
  const [newTestiStars, setNewTestiStars] = useState(5);
  const [newTestiContent, setNewTestiContent] = useState('');
  const [newTestiAuthor, setNewTestiAuthor] = useState('');
  const [newTestiGame, setNewTestiGame] = useState('Minecraft');

  // Packages Inventory States
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [editPkgName, setEditPkgName] = useState('');
  const [editPkgSubtitle, setEditPkgSubtitle] = useState('');
  const [editPkgPrice, setEditPkgPrice] = useState(0);
  const [editPkgProcessor, setEditPkgProcessor] = useState('');
  const [editPkgRam, setEditPkgRam] = useState('');
  const [editPkgStorage, setEditPkgStorage] = useState('');
  const [editPkgStockAmount, setEditPkgStockAmount] = useState(0);
  const [editPkgFeaturesStr, setEditPkgFeaturesStr] = useState('');
  const [editPkgActive, setEditPkgActive] = useState(true);

  // Add Package State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgSubtitle, setNewPkgSubtitle] = useState('');
  const [newPkgPrice, setNewPkgPrice] = useState(0);
  const [newPkgProcessor, setNewPkgProcessor] = useState('');
  const [newPkgRam, setNewPkgRam] = useState('');
  const [newPkgStorage, setNewPkgStorage] = useState('');
  const [newPkgStockAmount, setNewPkgStockAmount] = useState(10);
  const [newPkgFeaturesStr, setNewPkgFeaturesStr] = useState('SSD NVMe, DDoS Protection, Uptime Tinggi, Fast Support');
  const [newPkgIcon, setNewPkgIcon] = useState<'Cpu' | 'Server' | 'Zap'>('Cpu');

  // Message notifications
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        triggerNotification('File Logo dipilih!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQrisUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrisPreview(reader.result as string);
        triggerNotification('QRIS Gateway berhasil didata!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Convert comma-separated string back to array
  const parseCommaStr = (str: string): string[] => {
    return str.split(',').map(s => s.trim()).filter(s => s !== '');
  };

  const handleSaveGlobalConfig = () => {
    // Generate arrays from commas strings
    const finalNames = parseCommaStr(notificationNamesStr);
    const finalProducts = parseCommaStr(notificationProductsStr);

    const updated: AppConfig = {
      brandName,
      whatsappContact,
      primaryThemeHex,
      danaNumber,
      gopayNumber,
      globalLiveFeed,
      displayInterval: Number(displayInterval) || 10,
      logoUrl: logoPreview,
      qrisUrl: qrisPreview,
      heroTitle,
      heroSubtitle,
      faqs,
      testimonials,
      notificationNames: finalNames,
      notificationProducts: finalProducts,
      tiktokUrl,
      instagramUrl,
      discordUrl,
      buyerNameMasking: finalNames.slice(0, 5).join(', '), // Fallback legacy Compatibility
      adminUsername,
      adminPassword
    };

    onSaveConfig(updated);
    triggerNotification('Seluruh konfigurasi website berhasil disimpan!');
  };

  const triggerNotification = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => {
      setSaveStatus(null);
    }, 4000);
  };

  // FAQs management actions
  const handleAddFaq = () => {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    const newItem: FAQItem = {
      id: `faq-${Date.now()}`,
      question: newFaqQuestion.trim(),
      answer: newFaqAnswer.trim()
    };
    setFaqs([...faqs, newItem]);
    setNewFaqQuestion('');
    setNewFaqAnswer('');
    triggerNotification('FAQ baru ditambahkan.');
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs(faqs.filter(item => item.id !== id));
    triggerNotification('FAQ dihapus.');
  };

  // Testimonials management actions
  const handleAddTesti = () => {
    if (!newTestiAuthor.trim() || !newTestiContent.trim()) return;
    const newItem: Testimonial = {
      id: `testi-${Date.now()}`,
      stars: Number(newTestiStars) || 5,
      content: newTestiContent.trim(),
      author: newTestiAuthor.trim(),
      game: newTestiGame
    };
    setTestimonials([...testimonials, newItem]);
    setNewTestiAuthor('');
    setNewTestiContent('');
    triggerNotification('Testimoni baru ditambahkan.');
  };

  const handleDeleteTesti = (id: string) => {
    setTestimonials(testimonials.filter(item => item.id !== id));
    triggerNotification('Testimoni ulasan dihapus.');
  };

  // Edit package handles
  const handleStartEdit = (pkg: Package) => {
    setEditingPackageId(pkg.id);
    setEditPkgName(pkg.name);
    setEditPkgSubtitle(pkg.subtitle);
    setEditPkgPrice(pkg.price);
    setEditPkgProcessor(pkg.processor);
    setEditPkgRam(pkg.ram);
    setEditPkgStorage(pkg.storage);
    setEditPkgStockAmount(pkg.stockAmount ?? 10);
    setEditPkgFeaturesStr((pkg.features || []).join(', '));
    setEditPkgActive(pkg.active ?? true);
  };

  const handleSaveEditPkg = (id: string) => {
    const updatedFeatures = parseCommaStr(editPkgFeaturesStr);
    const stockStatusVal: 'In Stock' | 'Sold Out' = editPkgStockAmount <= 0 ? 'Sold Out' : 'In Stock';

    const updated = packages.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          name: editPkgName,
          subtitle: editPkgSubtitle,
          price: Number(editPkgPrice) || 0,
          processor: editPkgProcessor,
          ram: editPkgRam,
          storage: editPkgStorage,
          stockAmount: Number(editPkgStockAmount),
          stockStatus: stockStatusVal,
          features: updatedFeatures,
          active: editPkgActive
        };
      }
      return p;
    });
    
    onUpdatePackages(updated);
    setEditingPackageId(null);
    triggerNotification('Spesifikasi paket berhasil diperbarui.');
  };

  const handleDeletePackage = (id: string) => {
    const consent = window.confirm('Apakah Anda yakin ingin menghapus paket produk ini dari Gaven Store?');
    if (consent) {
      const updated = packages.filter((p) => p.id !== id);
      onUpdatePackages(updated);
      triggerNotification('Produk paket berhasil dinonaktifkan.');
    }
  };

  const handleAddNewPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgName || !newPkgPrice) return;

    const parsedFeatures = parseCommaStr(newPkgFeaturesStr);
    const stockStatusVal: 'In Stock' | 'Sold Out' = newPkgStockAmount <= 0 ? 'Sold Out' : 'In Stock';

    const newPkg: Package = {
      id: `pkg-${Date.now()}`,
      name: newPkgName,
      subtitle: newPkgSubtitle || 'Kustom Node Gaming',
      price: Number(newPkgPrice) || 6500,
      processor: newPkgProcessor || 'AMD Ryzen 9 7950X',
      ram: newPkgRam || '1GB RAM ECC',
      storage: newPkgStorage || '10GB NVMe SSD',
      icon: newPkgIcon,
      stockStatus: stockStatusVal,
      stockAmount: Number(newPkgStockAmount),
      features: parsedFeatures,
      active: true
    };

    onUpdatePackages([...packages, newPkg]);
    setShowAddModal(false);
    triggerNotification('Paket server game baru ditambahkan ke toko!');

    // Reset fields
    setNewPkgName('');
    setNewPkgSubtitle('');
    setNewPkgPrice(0);
    setNewPkgProcessor('');
    setNewPkgRam('');
    setNewPkgStorage('');
    setNewPkgStockAmount(10);
    setNewPkgFeaturesStr('SSD NVMe, DDoS Protection, Uptime Tinggi, Fast Support');
  };

  return (
    <div className="flex-1 w-full bg-transparent text-[#e2e2e2] min-h-screen px-6 md:px-10 py-10">
      
      {/* Toast Notification overlay */}
      {saveStatus && (
        <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50 bg-[#10b981] text-white px-6 py-3 rounded-xl shadow-lg border border-emerald-400 font-bold text-xs flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" /> {saveStatus}
        </div>
      )}

      {/* Main Settings Panel Wrapper */}
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="font-heading text-xl md:text-2xl font-black text-white">Konfigurasi Website Admin</h1>
            <p className="text-xs text-[#c6c6cc]">Kelola data produk, nama brand, FAQ, ulasan testimoni, dan live alert notifications tanpa mengubah kode.</p>
          </div>
          
          <button 
            type="button"
            onClick={handleSaveGlobalConfig}
            style={{ backgroundColor: primaryThemeHex }}
            className="text-white text-xs font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all self-stretch md:self-auto text-center justify-center justify-items-center"
          >
            <Save className="w-4 h-4" /> Simpan Semua Perubahan
          </button>
        </div>

        {/* SECTION 1: CORE BRAND & THEME CONFIGS */}
        <section className="glass-card p-6 md:p-8 rounded-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Brush className="w-5 h-5 text-indigo-400" />
            <h3 className="font-heading text-sm font-bold text-white">Identitas & Gaya Website</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
            <div className="space-y-1.5 col-span-1 md:col-span-2">
              <label className="block text-[#c6c6cc] font-semibold">Nama Brand / Website</label>
              <input 
                type="text" 
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                placeholder="cth: Gaven Store"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#c6c6cc] font-semibold">Warna Utama (Hex)</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={primaryThemeHex}
                  onChange={(e) => setPrimaryThemeHex(e.target.value)}
                  className="w-12 h-10 rounded bg-white/5 border border-white/10 p-1 cursor-pointer shrink-0"
                />
                <input 
                  type="text" 
                  value={primaryThemeHex}
                  onChange={(e) => setPrimaryThemeHex(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono"
                  placeholder="#6366f1"
                />
              </div>
            </div>
          </div>

          {/* Store Logo Upload Area */}
          <div className="grid grid-cols-1 gap-6 text-xs font-sans pt-4 border-t border-white/[0.03]">
            <div className="space-y-3">
              <label className="block text-[#c6c6cc] font-semibold">Upload Logo Toko / Store</label>
              <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap bg-white/[0.01] p-4 rounded-xl border border-white/5">
                <label className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer font-bold text-xs flex items-center gap-2 text-white whitespace-nowrap transition-all">
                  <UploadCloud className="w-4 h-4 text-indigo-400" /> Pilih Asset Logo Toko
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>
                {logoPreview ? (
                  <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/10">
                    <img 
                      src={logoPreview} 
                      alt="Logo Store Preview" 
                      className="w-10 h-10 object-contain rounded bg-slate-900 border border-white/10 p-1" 
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-[11px] text-emerald-400 font-bold block">Logo Aktif Terpasang</span>
                      <button 
                        type="button" 
                        onClick={() => {
                          setLogoPreview('');
                          triggerNotification('Logo Toko dihapus!');
                        }}
                        className="text-red-400 hover:text-red-300 font-bold text-[10px] uppercase font-sans mt-0.5 tracking-wider"
                      >
                        Hapus Logo
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="text-[11px] text-[#8e8e99] italic">Belum ada logo khusus. Tampilan akan menggunakan ikon geometric default.</span>
                )}
              </div>
            </div>
          </div>

          {/* Hero Banner Title & Subtitle */}
          <div className="grid grid-cols-1 gap-6 text-xs font-sans pt-4 border-t border-white/[0.03]">
            <div className="space-y-1.5">
              <label className="block text-[#c6c6cc] font-semibold">Main Heading Hero Title</label>
              <input 
                type="text" 
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                placeholder="cth: Hosting Game Cepat, Stabil, dan Terjangkau"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#c6c6cc] font-semibold">Subheading Hero Subtitle</label>
              <textarea 
                rows={3}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500 font-sans leading-relaxed"
                placeholder="Deskripsi panjang branding landing page..."
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: WHATSAPP & payment details */}
        <section className="glass-card p-6 md:p-8 rounded-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Smartphone className="w-5 h-5 text-indigo-400" />
            <h3 className="font-heading text-sm font-bold text-white">Kontak & Pembayaran Gateway</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
            <div className="space-y-1.5">
              <label className="block text-[#c6c6cc] font-semibold">Nomor WhatsApp CS</label>
              <input 
                type="text" 
                value={whatsappContact}
                onChange={(e) => setWhatsappContact(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                placeholder="cth: +62 877-4593-5987"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#c6c6cc] font-semibold">Nomor Akun DANA</label>
              <input 
                type="text" 
                value={danaNumber}
                onChange={(e) => setDanaNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500 font-mono"
                placeholder="085179514462"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#c6c6cc] font-semibold">Nomor Akun GoPay</label>
              <input 
                type="text" 
                value={gopayNumber}
                onChange={(e) => setGopayNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500 font-mono"
                placeholder="085179514462"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans pt-4 border-t border-white/[0.03]">
            <div className="space-y-3">
              <span className="block text-[#c6c6cc] font-semibold">Upload Image QRIS</span>
              <div className="flex items-center gap-4">
                <label className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer font-bold text-xs flex items-center gap-1.5 text-white">
                  <UploadCloud className="w-4 h-4" /> Pilih file QRIS
                  <input type="file" accept="image/*" className="hidden" onChange={handleQrisUpload} />
                </label>
                {qrisPreview && (
                  <span className="text-xs text-indigo-400 font-semibold truncate max-w-[120px]">QRIS Aktif Terpasang</span>
                )}
              </div>
            </div>

            <div className="space-y-1.5 col-span-1 md:col-span-2">
              <label className="block text-[#c6c6cc] font-semibold">Link Video/Social URLs (TikTok, Instagram, Discord)</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input 
                  type="text" 
                  value={tiktokUrl}
                  onChange={(e) => setTiktokUrl(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-[10px]"
                  placeholder="TikTok Link..."
                />
                <input 
                  type="text" 
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-[10px]"
                  placeholder="Instagram Link..."
                />
                <input 
                  type="text" 
                  value={discordUrl}
                  onChange={(e) => setDiscordUrl(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-[10px]"
                  placeholder="Discord Invite Link..."
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans pt-4 border-t border-white/[0.03]">
            <div className="space-y-1.5">
              <label className="block text-[#c6c6cc] font-semibold">User Admin (Username Login)</label>
              <input 
                type="text" 
                value={adminUsername}
                onChange={(e) => setAdminUsernameState(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500 font-mono"
                placeholder="admin"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[#c6c6cc] font-semibold">Password Admin (Sandi Login)</label>
              <input 
                type="text" 
                value={adminPassword}
                onChange={(e) => setAdminPasswordState(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500 font-mono"
                placeholder="gavenstoreadmin123"
              />
            </div>
          </div>
        </section>

        {/* SECTION 3: LIVE popups customizer */}
        <section className="glass-card p-6 md:p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-indigo-400" />
              <h3 className="font-heading text-sm font-bold text-white">Notifikasi Pembelian Langsung (Virtual Live-Feed)</h3>
            </div>
            
            <label className="inline-flex items-center cursor-pointer relative">
              <input 
                type="checkbox" 
                checked={globalLiveFeed}
                onChange={() => setGlobalLiveFeed(!globalLiveFeed)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-6 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[#c6c6cc] font-semibold">Tampilkan Interval Notifikasi (detik)</label>
                <input 
                  type="number" 
                  value={displayInterval}
                  onChange={(e) => setDisplayInterval(Number(e.target.value) || 10)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none"
                  placeholder="10"
                />
              </div>
              <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 flex items-start gap-2.5 text-[11px] text-[#c6c6cc] leading-relaxed">
                <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Pemberitahuan virtual simulasi pembelian live akan dimunculkan di halaman toko berdasarkan daftar nama pembeli dan penawaran produk yang Anda isikan di bawah.</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#c6c6cc] font-semibold">Daftar Nama Pembeli (Pisahkan dengan koma)</label>
              <input 
                type="text" 
                value={notificationNamesStr}
                onChange={(e) => setNotificationNamesStr(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500 font-sans"
                placeholder="Andi, Rizky, Fajar, Dimas, Reza..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#c6c6cc] font-semibold">Daftar Produk Terlaris (Pisahkan dengan koma)</label>
              <input 
                type="text" 
                value={notificationProductsStr}
                onChange={(e) => setNotificationProductsStr(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500 font-sans"
                placeholder="Hosting Minecraft 4GB, Hosting Terraria 2GB..."
              />
            </div>
          </div>
        </section>

        {/* SECTION 4: TESTIMONIALS EDITOR */}
        <section className="glass-card p-6 md:p-8 rounded-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
            <h3 className="font-heading text-sm font-bold text-white">Ulasan Testimoni Pelanggan (Tanpa Emojis)</h3>
          </div>

          {/* Testimonial List Grid */}
          <div className="space-y-3">
            {testimonials.map((testi, idx) => (
              <div key={testi.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex justify-between items-start gap-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{testi.author}</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] uppercase tracking-wider text-[#c6c6cc]">{testi.game}</span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: testi.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#c6c6cc] font-medium italic">"{testi.content}"</p>
                </div>
                <button 
                  type="button"
                  onClick={() => handleDeleteTesti(testi.id)}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg border border-red-500/20 transition-all font-bold shrink-0 text-center"
                >
                  <Trash className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add testimonial form */}
          <div className="bg-white/[0.01] border border-dashed border-white/10 rounded-xl p-5 text-xs space-y-4">
            <span className="block font-bold text-white"><Plus className="w-4 h-4 inline mr-1" /> Tambah Ulasan Kustom</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[#c6c6cc] text-[11px] font-semibold">Nama Pengirim</label>
                <input 
                  type="text" 
                  value={newTestiAuthor}
                  onChange={(e) => setNewTestiAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white focus:outline-none"
                  placeholder="Rian MC"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#c6c6cc] text-[11px] font-semibold">Game Server</label>
                <input 
                  type="text" 
                  value={newTestiGame}
                  onChange={(e) => setNewTestiGame(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white focus:outline-none"
                  placeholder="Minecraft"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#c6c6cc] text-[11px] font-semibold">Peringkat (Bintang)</label>
                <select 
                  value={newTestiStars}
                  onChange={(e) => setNewTestiStars(Number(e.target.value) || 5)}
                  className="w-full px-3 py-2 rounded bg-[#131d31] border border-white/10 text-white focus:outline-none"
                >
                  <option value={5}>5 Bintang</option>
                  <option value={4}>4 Bintang</option>
                  <option value={3}>3 Bintang</option>
                  <option value={2}>2 Bintang</option>
                  <option value={1}>1 Bintang</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[#c6c6cc] text-[11px] font-semibold">Ulasan Singkat</label>
              <input 
                type="text" 
                value={newTestiContent}
                onChange={(e) => setNewTestiContent(e.target.value)}
                className="w-full px-3 py-2.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none"
                placeholder="Server sangat lancar dan admin cepat merespon..."
              />
            </div>

            <button 
              type="button"
              onClick={handleAddTesti}
              className="px-5 py-2.5 bg-indigo-500 rounded-lg text-white font-bold hover:brightness-110 active:scale-95 transition-all"
            >
              Simpan Ulasan
            </button>
          </div>
        </section>

        {/* SECTION 5: FAQS CONFIGURABILITY */}
        <section className="glass-card p-6 md:p-8 rounded-2xl space-y-6" id="faq-section">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <h3 className="font-heading text-sm font-bold text-white">FAQ (Frequently Asked Questions) Accordion</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex justify-between items-start gap-4">
                <div className="text-xs space-y-1.5">
                  <span className="block font-bold text-white">Q: {faq.question}</span>
                  <p className="text-xs text-[#c6c6cc] leading-relaxed">A: {faq.answer}</p>
                </div>
                <button 
                  type="button"
                  onClick={() => handleDeleteFaq(faq.id)}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded bg-white/5 border border-red-500/20 transition-all font-bold shrink-0 font-sans"
                >
                  <Trash className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add FAQ form */}
          <div className="bg-white/[0.01] border border-dashed border-white/10 rounded-xl p-5 text-xs space-y-4">
            <span className="block font-bold text-white"><Plus className="w-4 h-4 inline mr-1" /> Tambah FAQ Baru</span>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[#c6c6cc] font-semibold">Pertanyaan FAQ</label>
                <input 
                  type="text" 
                  value={newFaqQuestion}
                  onChange={(e) => setNewFaqQuestion(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white focus:outline-none"
                  placeholder="Apakah tersedia backup?"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#c6c6cc] font-semibold">Jawaban FAQ</label>
                <textarea 
                  rows={2}
                  value={newFaqAnswer}
                  onChange={(e) => setNewFaqAnswer(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white focus:outline-none"
                  placeholder="Ya, sistem secara otomatis mencadangkan data server Anda setiap hari..."
                />
              </div>
            </div>

            <button 
              type="button"
              onClick={handleAddFaq}
              className="px-5 py-2.5 bg-indigo-500 rounded-lg text-white font-bold hover:brightness-110 active:scale-95 transition-all"
            >
              Tambahkan FAQ
            </button>
          </div>
        </section>

        {/* SECTION 6: INVENTORY LIST & STOCK CONTROLS */}
        <section className="glass-card p-6 md:p-8 rounded-2xl space-y-6" id="inventory-section">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-indigo-400" />
              <h3 className="font-heading text-sm font-bold text-white">Inventaris Paket / Produk Selling Nodes</h3>
            </div>
          </div>

          <div className="space-y-4">
            {packages.map((pkg) => {
              const outOfStock = (pkg.stockAmount ?? 0) <= 0;
              const isEditing = editingPackageId === pkg.id;

              return (
                <div 
                  key={pkg.id} 
                  className={`p-5 rounded-xl border transition-all ${
                    isEditing ? 'border-indigo-500 bg-indigo-500/5' : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                  }`}
                >
                  {isEditing ? (
                    /* EDITING ACTIVE MODE */
                    <div className="space-y-4 text-xs font-sans">
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="font-bold text-indigo-400">Sedang Mengedit: {pkg.name}</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleSaveEditPkg(pkg.id)}
                            className="bg-emerald-500 hover:brightness-110 p-2 rounded text-white font-bold"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => setEditingPackageId(null)}
                            className="bg-white/10 hover:bg-white/20 p-2 rounded text-[#c6c6cc]"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <label className="text-[#c6c6cc] font-semibold">Nama Paket</label>
                          <input type="text" value={editPkgName} onChange={(e) => setEditPkgName(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[#c6c6cc] font-semibold">Biaya (Rupiah flat)</label>
                          <input type="number" value={editPkgPrice} onChange={(e) => setEditPkgPrice(Number(e.target.value) || 0)} className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded font-mono" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[#c6c6cc] font-semibold">Model CPU / Processor</label>
                          <input type="text" value={editPkgProcessor} onChange={(e) => setEditPkgProcessor(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[#c6c6cc] font-semibold">Sisa Stok Produk (amount)</label>
                          <input type="number" value={editPkgStockAmount} onChange={(e) => setEditPkgStockAmount(Number(e.target.value) || 0)} className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1 col-span-2">
                          <label className="text-[#c6c6cc] font-semibold">Fitur (Pisahkan dengan koma)</label>
                          <input type="text" value={editPkgFeaturesStr} onChange={(e) => setEditPkgFeaturesStr(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[#c6c6cc] font-semibold">Status Aktif Paket</label>
                          <select value={editPkgActive ? 'Ya' : 'Tidak'} onChange={(e) => setEditPkgActive(e.target.value === 'Ya')} className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded">
                            <option value="Ya">Aktif (Tampil di Toko)</option>
                            <option value="Tidak">Nonaktif (Sembunyikan)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* RENDER ONLY VIEW MODE */
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs font-sans">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <h4 className="font-bold text-sm text-white">{pkg.name}</h4>
                          <span className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold ${
                            outOfStock ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-400'
                          }`}>
                            {outOfStock ? 'Stok Habis' : `Tersedia: ${pkg.stockAmount ?? 0} Unit`}
                          </span>
                          
                          {pkg.active === false && (
                            <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500 text-[9px] uppercase tracking-wider font-bold">Nonaktif</span>
                          )}
                        </div>

                        <p className="text-[#c6c6cc] text-[11px] mb-1">
                          {pkg.processor} • RAM {pkg.ram} • Storage {pkg.storage}
                        </p>
                        <div className="font-bold text-indigo-400">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(pkg.price)}
                        </div>
                      </div>

                      <div className="flex gap-2 self-start sm:self-auto">
                        <button 
                          onClick={() => handleStartEdit(pkg)}
                          className="bg-white/5 hover:bg-white/10 border border-white/10 text-[#c6c6cc] p-2.5 rounded-lg transition-all"
                          title="Edit Paket"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* MODAL: ADD CUSTOM PACKAGE */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="glass-card bg-[#0f172a] border border-white/10 w-full max-w-lg p-6 rounded-2xl space-y-6 relative">
            <div className="absolute top-4 right-4">
              <button onClick={() => setShowAddModal(false)} className="text-[#c6c6cc] hover:text-white bg-white/5 max-w-[32px] p-1.5 rounded-full">
                ✕
              </button>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold text-white"><Plus className="w-5 h-5 inline text-indigo-400 mr-1" /> Buat Paket Server Kustom</h3>
              <p className="text-[11px] text-[#c6c6cc] mt-1">Isi formulir spesifikasi produk game server baru Anda di bawah ini:</p>
            </div>

            <form onSubmit={handleAddNewPackage} className="space-y-4 text-xs font-sans">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#c6c6cc] font-semibold">Nama Paket</label>
                  <input required type="text" value={newPkgName} onChange={(e) => setNewPkgName(e.target.value)} className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white" placeholder="Premium Node" />
                </div>
                <div className="space-y-1">
                  <label className="text-[#c6c6cc] font-semibold">Flat Price / bln (Rupiah)</label>
                  <input required type="number" value={newPkgPrice} onChange={(e) => setNewPkgPrice(Number(e.target.value) || 0)} className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white font-mono" placeholder="25000" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#c6c6cc] font-semibold">Subjudul Singkat / Keterangan</label>
                <input type="text" value={newPkgSubtitle} onChange={(e) => setNewPkgSubtitle(e.target.value)} className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white" placeholder="Sangat direkomendasikan untuk cluster vanilla" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[#c6c6cc] font-semibold">Processor / Core</label>
                  <input type="text" value={newPkgProcessor} onChange={(e) => setNewPkgProcessor(e.target.value)} className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white" placeholder="AMD EPYC 7763" />
                </div>
                <div className="space-y-1">
                  <label className="text-[#c6c6cc] font-semibold">Format RAM / memory</label>
                  <input type="text" value={newPkgRam} onChange={(e) => setNewPkgRam(e.target.value)} className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white" placeholder="1GB RAM ECC" />
                </div>
                <div className="space-y-1">
                  <label className="text-[#c6c6cc] font-semibold">Merek Storage</label>
                  <input type="text" value={newPkgStorage} onChange={(e) => setNewPkgStorage(e.target.value)} className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white" placeholder="10GB NVMe SSD" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#c6c6cc] font-semibold">Jumlah Sisa Stok Unit</label>
                  <input type="number" value={newPkgStockAmount} onChange={(e) => setNewPkgStockAmount(Number(e.target.value) || 0)} className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white font-mono" placeholder="10" />
                </div>
                <div className="space-y-1">
                  <label className="text-[#c6c6cc] font-semibold">Ikon Tampilan</label>
                  <select value={newPkgIcon} onChange={(e) => setNewPkgIcon(e.target.value as any)} className="w-full px-3 py-2.5 rounded bg-slate-900 border border-white/10 text-white">
                    <option value="Cpu">Cpu Socket (Lite)</option>
                    <option value="Server">Server Stack (Standar)</option>
                    <option value="Zap">Lightning Bolt (Medium/Extreme)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#c6c6cc] font-semibold">Fitur Unggulan (Pisahkan dengan koma)</label>
                <input type="text" value={newPkgFeaturesStr} onChange={(e) => setNewPkgFeaturesStr(e.target.value)} className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white" />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-indigo-505 rounded-xl font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: primaryThemeHex }}
              >
                Simpan & Deploy Paket
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
