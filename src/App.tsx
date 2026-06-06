import React, { useState, useEffect } from 'react';
import { 
  getStoredData, 
  setStoredData, 
  INITIAL_CONFIG, 
  INITIAL_PACKAGES, 
  INITIAL_ORDERS 
} from './data';
import { Package, Order, AppConfig } from './types';
import GavenStore from './components/GavenStore';
import AdminLogin from './components/AdminLogin';
import AdminSidebar from './components/AdminSidebar';
import AdminDashboard from './components/AdminDashboard';
import AdminSettings from './components/AdminSettings';
import { 
  Users, 
  HelpCircle, 
  CheckCircle,
  Menu,
  Database,
  Sliders,
  Send,
  Radio,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Plus
} from 'lucide-react';

export default function App() {
  // Global React states (synchronized with localStorage)
  const [config, setConfig] = useState<AppConfig>(() => 
    getStoredData<AppConfig>('gaven_config', INITIAL_CONFIG)
  );

  const [packages, setPackages] = useState<Package[]>(() => {
    const pkgs = getStoredData<Package[]>('gaven_packages', INITIAL_PACKAGES);
    const filtered = pkgs.filter(p => ['lite', 'standar', 'medium'].includes(p.id));
    return filtered.map(p => {
      if (p.id === 'lite') return { ...p, price: 6500, processor: 'Intel Xeon E5-2680 V4' };
      if (p.id === 'standar') return { ...p, price: 10000, processor: 'AMD EPYC 7543' };
      if (p.id === 'medium') return { ...p, price: 20000, processor: 'AMD Ryzen 9 7950X' };
      return p;
    });
  });

  const [orders, setOrders] = useState<Order[]>(() => 
    getStoredData<Order[]>('gaven_orders', INITIAL_ORDERS)
  );

  // View state: 'store' | 'login' | 'admin' (with sub-tabs managed by activeTab)
  const [currentView, setCurrentView] = useState<'store' | 'login' | 'admin'>('store');
  const [activeTab, setActiveTab] = useState<string>('dashboard'); // 'dashboard', 'settings', 'campaigns', 'users', 'support'
  
  // Mobile responsive sidebar drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadedFromServer, setLoadedFromServer] = useState(false);

  // Synchronize state from server on mount
  useEffect(() => {
    async function loadData() {
      try {
        const configRes = await fetch('/api/config').then(r => r.json());
        const packagesRes = await fetch('/api/packages').then(r => r.json());
        const ordersRes = await fetch('/api/orders').then(r => r.json());

        if (configRes && !configRes._use_default) {
          setConfig(configRes);
          setStoredData('gaven_config', configRes);
        } else {
          // Unsaved on server, send local current config
          await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
          });
        }

        if (packagesRes && !packagesRes._use_default) {
          // Ensure structure remains correct
          setPackages(packagesRes);
          setStoredData('gaven_packages', packagesRes);
        } else {
          // Unsaved on server, send local current packages
          await fetch('/api/packages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(packages)
          });
        }

        if (ordersRes && !ordersRes._use_default) {
          setOrders(ordersRes);
          setStoredData('gaven_orders', ordersRes);
        } else {
          // Unsaved on server, send local current orders
          await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orders)
          });
        }
      } catch (err) {
        console.error('Error fetching data from Gaven Server:', err);
      } finally {
        setLoadedFromServer(true);
      }
    }
    loadData();
  }, []);

  // Synchronize state writes to localStorage & Gaven Server Database
  useEffect(() => {
    setStoredData('gaven_config', config);
    if (loadedFromServer) {
      fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      }).catch(err => console.error('Error saving config to server:', err));
    }
  }, [config, loadedFromServer]);

  useEffect(() => {
    setStoredData('gaven_packages', packages);
    if (loadedFromServer) {
      fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packages)
      }).catch(err => console.error('Error saving packages to server:', err));
    }
  }, [packages, loadedFromServer]);

  useEffect(() => {
    setStoredData('gaven_orders', orders);
    if (loadedFromServer) {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orders)
      }).catch(err => console.error('Error saving orders to server:', err));
    }
  }, [orders, loadedFromServer]);

  // Handle order insertion from Checkout modal
  const handleAddNewOrder = (newOrder: Order) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
  };

  // Switch to Gaven public store view
  const handleReturnToStore = () => {
    setCurrentView('store');
    setMobileMenuOpen(false);
  };

  // Switch to Gaven Admin view (Bypassed securely from Sandbox header link)
  const handleGoToAdmin = (targetTab: string = 'dashboard') => {
    setCurrentView('admin');
    setActiveTab(targetTab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#e2e2e2] relative font-sans antialiased overflow-x-hidden selection:bg-indigo-500/30">
      
      {/* Background ambient glow circles according to the Frosted Glass design */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] opacity-60"></div>
        <div className="absolute -bottom-60 -right-40 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] opacity-60"></div>
        <div className="absolute top-[35%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] opacity-40"></div>
      </div>
      
      {/* VIEW DETERMINATOR MATCHING SECURE BLUEPRINT */}
      
      {/* 1. STOREFRONT VIEW */}
      {currentView === 'store' && (
        <GavenStore 
          config={config}
          packages={packages}
          onOrderCompleted={handleAddNewOrder}
          onNavigateToDashboard={() => handleGoToAdmin('dashboard')}
          onNavigateToLogin={() => {
            setCurrentView('login');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
        />
      )}

      {/* 2. AUTH SECRET LOGIN SCREEN */}
      {currentView === 'login' && (
        <AdminLogin 
          config={config}
          onLoginSuccess={() => {
            setCurrentView('admin');
            setActiveTab('dashboard');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          onBackToStore={() => {
            setCurrentView('store');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
        />
      )}

       {/* 3. MANAGER DASHBOARD WORKSPACE */}
      {currentView === 'admin' && (
        <div className="flex min-h-screen pt-1">
          
          {/* Desktop sidebar */}
          <div className="hidden lg:block shrink-0">
            <AdminSidebar 
              currentTab={activeTab}
              onTabChange={setActiveTab}
              brandName={config.brandName}
              onLogout={handleReturnToStore}
            />
          </div>

          {/* Mobile responsive drawer menu backdrop */}
          {mobileMenuOpen && (
            <div 
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/85 backdrop-blur-sm z-50 transition-all"
            ></div>
          )}

          {/* Mobile sidebar view drawer */}
          <div className={`lg:hidden fixed top-0 bottom-0 left-0 w-64 bg-slate-950 z-50 transform transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <AdminSidebar 
              currentTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setMobileMenuOpen(false);
              }}
              brandName={config.brandName}
              onLogout={handleReturnToStore}
              onClose={() => setMobileMenuOpen(false)}
            />
          </div>

          {/* Dynamic inner screen routers */}
          <div className="flex-grow min-h-screen lg:pl-64">
            
            {activeTab === 'dashboard' && (
              <AdminDashboard 
                orders={orders}
                packages={packages}
                config={config}
                onUpdateOrders={setOrders}
                onNavigateToSettings={() => setActiveTab('settings')}
                onOpenMobileMenu={() => setMobileMenuOpen(true)}
              />
            )}

            {activeTab === 'settings' && (
              <AdminSettings 
                config={config}
                packages={packages}
                onSaveConfig={setConfig}
                onUpdatePackages={setPackages}
                onOpenMobileMenu={() => setMobileMenuOpen(true)}
              />
            )}

            {/* Campaign view panel matching design blueprint */}
            {activeTab === 'campaigns' && (
              <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 text-xs font-sans">
                
                <header className="mb-8 flex justify-between items-center pb-5 border-b border-white/5">
                  <div>
                    <h2 className="font-heading text-lg md:text-xl font-bold text-white">Active Campaigns</h2>
                    <p className="text-xs text-[#c6c6cc]">Urus promosi serta voucher broadcast server game secara terpusat.</p>
                  </div>
                  <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white bg-white/5 p-2 rounded-lg">
                    <Menu className="w-5 h-5" />
                  </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Campaign Card 1 */}
                  <div className="glass-card p-6 rounded-xl relative overflow-hidden">
                    <span className="absolute top-4 right-4 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-green-500/20">Active</span>
                    <Radio className="w-8 h-8 text-indigo-400 mb-4" />
                    <h3 className="font-heading font-bold text-white text-sm mb-1">Hyper-Scale Deployment</h3>
                    <p className="text-xs text-[#c6c6cc] mb-4">Promosi global peluncuran cluster hardware Ryzen 9 terbaru.</p>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-2">
                      <div className="bg-indigo-500 h-full" style={{ width: '78%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#c6c6cc]">
                      <span>Progress</span>
                      <span>73% Allocated</span>
                    </div>
                  </div>

                  {/* Campaign Card 2 */}
                  <div className="glass-card p-6 rounded-xl relative overflow-hidden">
                    <span className="absolute top-4 right-4 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-green-500/20">Active</span>
                    <Radio className="w-8 h-8 text-indigo-400 mb-4" />
                    <h3 className="font-heading font-bold text-white text-sm mb-1">Minecraft Holiday Sale</h3>
                    <p className="text-xs text-[#c6c6cc] mb-4">Pemberian potongan harga spesial 15% untuk pembelian paket Lite/Standar.</p>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-2">
                      <div className="bg-indigo-500 h-full" style={{ width: '45%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#c6c6cc]">
                      <span>Progress</span>
                      <span>45% Claimed</span>
                    </div>
                  </div>

                  {/* Custom create promotion container */}
                  <div className="p-6 rounded-xl border border-dashed border-white/10 flex flex-col justify-center items-center text-center bg-white/[0.01]">
                    <Sliders className="w-8 h-8 text-[#c6c6cc] mb-3" />
                    <h4 className="font-heading text-xs font-semibold text-white">Buat Campaign Baru</h4>
                    <p className="text-xs text-[#c6c6cc] mb-4 max-w-[200px]">Buat kode voucher kustom serta flash sales diskon lainnya.</p>
                    <button className="bg-white/5 hover:bg-white/10 text-xs font-semibold px-4 py-2 border border-white/10 rounded-lg transition-all text-white flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" /> Konfigurasi Promo
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* Users / Security administrators view matching design blueprint */}
            {activeTab === 'users' && (
              <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 text-xs font-sans">
                
                <header className="mb-8 flex justify-between items-center pb-5 border-b border-white/5">
                  <div>
                    <h2 className="font-heading text-lg md:text-xl font-bold text-white">Security & Authorized Administrators</h2>
                    <p className="text-xs text-[#c6c6cc]">Kelola aksesibilitas root admin server game di bawah ini.</p>
                  </div>
                  <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white bg-white/5 p-2 rounded-lg">
                    <Menu className="w-5 h-5" />
                  </button>
                </header>

                <div className="glass-card rounded-xl overflow-hidden">
                  <div className="px-6 py-5 border-b border-white/10 bg-white/[0.01] flex justify-between items-center">
                    <h3 className="font-heading text-xs font-semibold text-white">Authorized Users</h3>
                    <button className="bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-lg">Tambahkan Admin</button>
                  </div>

                  <div className="divide-y divide-white/5">
                    
                    <div className="p-6 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 overflow-hidden shrink-0 flex items-center justify-center text-xs font-black text-indigo-400">
                          AG
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Amma Gunawan</p>
                          <p className="text-[10px] text-[#c6c6cc]">AmmaGunawan@gmail.com • Owner / Root</p>
                        </div>
                      </div>
                      <span className="bg-indigo-500/10 border border-indigo-500/35 text-indigo-400 px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider">Super Admin</span>
                    </div>

                    <div className="p-6 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c6c6cc] text-xs font-bold uppercase">
                          TN
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Toni Nugroho</p>
                          <p className="text-[10px] text-[#c6c6cc]">toni.nugroho@gavenstore.co.id • Customer Support Representative</p>
                        </div>
                      </div>
                      <span className="bg-white/5 text-[#c6c6cc] px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider">Level 1 Support</span>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* Support and quick instruction help card tab */}
            {activeTab === 'support' && (
              <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-8 text-xs font-sans">
                
                <header className="mb-8 flex justify-between items-center pb-5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-400" />
                    <h2 className="font-heading text-lg md:text-xl font-bold text-white">Knowledge Base & Support</h2>
                  </div>
                  <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white bg-white/5 p-2 rounded-lg">
                    <Menu className="w-5 h-5" />
                  </button>
                </header>

                <div className="glass-card p-8 rounded-xl space-y-6">
                  
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-white text-sm">Gaven Store Support Representative Simulator</h3>
                    <p className="text-xs text-[#c6c6cc] leading-relaxed">
                      Lakukan ujicoba sinkronisasi real-time secara dua arah:
                    </p>
                  </div>

                  <hr className="border-white/5" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <div className="space-y-1">
                      <h4 className="font-bold text-white flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-400" /> 1. Sisi Pelanggan
                      </h4>
                      <p className="text-[11px] text-[#c6c6cc] leading-relaxed">Pilih paket game apa saja di beranda utama Gaven Store publik, masukkan nama Anda, lakukan simulasi pembayaran, dan lihat live popup instan dan logs order yang ditambahkan di Admin dashboard.</p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-white flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-400" /> 2. Sisi Administrator
                      </h4>
                      <p className="text-[11px] text-[#c6c6cc] leading-relaxed">Ubah harga paket (Lite, Standar, Medium), tambahkan paket performa baru di tab inventory, ganti nama brand, atau status stock produk di setingan admin, dan beranda store langsung tersinkronisasi murni.</p>
                    </div>
                  </div>

                  <hr className="border-white/5" />

                  <button 
                    onClick={handleReturnToStore}
                    className="w-full bg-indigo-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all text-xs uppercase cursor-pointer"
                  >
                    Buka Beranda Publik Gaven Store <ArrowRight className="w-4 h-4" />
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
