import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Clock, 
  RefreshCw, 
  CheckCircle, 
  Eye, 
  Search, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight,
  Database,
  Sliders,
  Menu,
  FileDown,
  Trash2
} from 'lucide-react';
import { Order, Package, AppConfig } from '../types';

interface AdminDashboardProps {
  orders: Order[];
  packages: Package[];
  config: AppConfig;
  onUpdateOrders: (updatedOrders: Order[]) => void;
  onNavigateToSettings: () => void;
  onOpenMobileMenu: () => void;
}

export default function AdminDashboard({ orders, packages, config, onUpdateOrders, onNavigateToSettings, onOpenMobileMenu }: AdminDashboardProps) {
  // Local state for table pagination and search filter
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState<'30days' | '7days' | '24hours'>('30days');
  const itemsPerPage = 5;

  // Real-time chart height randomizer effect to simulate live streaming charts
  const [chartHeights, setChartHeights] = useState<number[]>([40, 65, 50, 85, 60, 75, 55, 80, 45, 95, 70, 85, 65, 50, 100]);
  useEffect(() => {
    const timer = setInterval(() => {
      setChartHeights((prev) => 
        prev.map((val) => {
          if (Math.random() > 0.7) {
            const delta = Math.floor(Math.random() * 15) - 7;
            return Math.min(100, Math.max(15, val + delta));
          }
          return val;
        })
      );
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  // Filter orders by query
  const filteredOrders = orders.filter((ord) => 
    ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ord.package.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ord.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ord.game && ord.game.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination calculation
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Dynamic calculations based on state + offset to make it perfectly proportional
  const calculatedTotalOrders = 120 + orders.length;
  const calculatedSelesai = 95 + orders.filter(o => o.status === 'Selesai').length;
  const calculatedPending = orders.filter(o => o.status === 'Pending').length;
  const calculatedDiproses = 12 + orders.filter(o => o.status === 'Diproses').length;

  const handleStatusChange = (orderId: string, newStatus: 'Pending' | 'Diproses' | 'Selesai') => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    });
    onUpdateOrders(updated);
  };

  const handleDeleteOrder = (orderId: string) => {
    const consent = window.confirm(`Apakah Anda yakin ingin menghapus order ID ${orderId}?`);
    if (consent) {
      const updated = orders.filter(o => o.id !== orderId);
      onUpdateOrders(updated);
      setCurrentPage(1);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'Product', 'Customer', 'Gmail', 'Game', 'Egg', 'Status', 'Amount', 'Date'];
    const rows = orders.map(o => [o.id, o.package, o.customer, o.gmail || '', o.game || '', o.egg || '', o.status, `IDR ${o.amount}`, o.date]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Gaven_Store_Orders_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper formatting numbers to Rupiah
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num).replace('IDR', 'Rp');
  };

  return (
    <div className="flex-grow w-full bg-transparent text-[#e2e2e2] min-h-screen">
      
      {/* Search Header and Meta elements */}
      <header className="sticky top-0 w-full z-40 bg-slate-950/20 backdrop-blur-xl border-b border-white/5 h-20 flex items-center justify-between px-6 md:px-10 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
        <div className="flex items-center gap-4">
          <button onClick={onOpenMobileMenu} className="lg:hidden text-white bg-white/5 p-2 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="font-heading text-lg md:text-xl font-bold text-white tracking-tight">Overview Dashboard</h2>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-white/5 px-4 py-2 rounded-lg border border-white/10 gap-3 group focus-within:border-indigo-500 transition-all">
            <Search className="w-4 h-4 text-[#c6c6cc]" />
            <input 
              className="bg-transparent border-none focus:ring-0 text-xs p-0 w-64 placeholder:text-[#c6c6cc]/40 text-[#e2e2e2] focus:outline-none" 
              placeholder="Cari transaksi ID, paket..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer p-2 hover:bg-white/5 rounded-lg text-[#c6c6cc]" onClick={onNavigateToSettings}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full glow-secondary"></span>
            </div>
            
            {/* Divider */}
            <div className="w-px h-6 bg-white/10"></div>

            {/* Profile badge */}
            <div className="flex items-center gap-3 select-none">
              <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs text-indigo-400">
                GA
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-white leading-none">Gunawan Access</div>
                <div className="text-[10px] text-[#c6c6cc] leading-none mt-1">Super-Admin</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Core Section */}
      <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
        
        {/* Mobile search bar alternative */}
        <div className="md:hidden flex items-center bg-white/5 px-4 py-3 rounded-xl border border-white/10 gap-3">
          <Search className="w-4 h-4 text-[#c6c6cc]" />
          <input 
            className="bg-transparent border-none text-xs p-0 w-full placeholder:text-[#c6c6cc]/40 text-[#e2e2e2] focus:outline-none" 
            placeholder="Cari transaksi ID, paket..."
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Bento Stats row */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          
          {/* Card: Total Order */}
          <div className="glass-card p-6 rounded-xl flex flex-col justify-between group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-indigo-500/10 rounded-lg">
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-indigo-400 font-semibold text-[10px]">+14.2%</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#c6c6cc] uppercase tracking-wider">Total Order</p>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white mt-1">{calculatedTotalOrders}</h3>
            </div>
          </div>

          {/* Card: Pending */}
          <div className="glass-card p-6 rounded-xl flex flex-col justify-between group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-yellow-400/10 rounded-lg">
                <Clock className="w-4 h-4 text-yellow-400" />
              </div>
              <span className="text-yellow-400 font-semibold text-[10px]">Live</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#c6c6cc] uppercase tracking-wider">Pending</p>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white mt-1">{calculatedPending}</h3>
            </div>
          </div>

          {/* Card: Diproses */}
          <div className="glass-card p-6 rounded-xl flex flex-col justify-between group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-indigo-500/10 rounded-lg">
                <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <span className="text-indigo-400 font-semibold text-[10px]">+5.4%</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#c6c6cc] uppercase tracking-wider">Diproses</p>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white mt-1">{calculatedDiproses}</h3>
            </div>
          </div>

          {/* Card: Selesai */}
          <div className="glass-card p-6 rounded-xl flex flex-col justify-between group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-green-400 font-semibold text-[10px]">+22.1%</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#c6c6cc] uppercase tracking-wider">Selesai</p>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white mt-1">{calculatedSelesai}</h3>
            </div>
          </div>

          {/* Card: Pengunjung */}
          <div className="glass-card p-6 rounded-xl flex flex-col justify-between group col-span-2 lg:col-span-1">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-indigo-500/10 rounded-lg">
                <Eye className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-indigo-400 font-semibold text-[10px]">+32.4%</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#c6c6cc] uppercase tracking-wider">Pengunjung</p>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white mt-1">4.5K</h3>
            </div>
          </div>

        </section>

        {/* Dynamic Traffic Graph & Feeds */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Traffic stats bar graph */}
          <section className="lg:col-span-2 glass-card rounded-xl p-6 md:p-8 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="font-heading text-sm font-bold text-white">Server CPU Request Traffic</h4>
                <p className="text-[11px] text-[#c6c6cc]">Simulasi response and physical node allocations</p>
              </div>
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as any)}
                className="bg-[#1e293b] border-white/5 rounded-lg text-[10px] text-white px-3 py-1.5 focus:outline-none"
              >
                <option value="30days">Last 30 Days</option>
                <option value="7days">Last 7 Days</option>
                <option value="24hours">Last 24 Hours</option>
              </select>
            </div>

            {/* Simulated interactive charts */}
            <div className="relative h-40 w-full bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.05),transparent)] border-b border-white/10 flex items-end px-2 pb-1">
              <div className="absolute inset-0 flex items-end justify-between px-1.5 md:px-3">
                {chartHeights.slice(0, 12).map((h, idx) => {
                  return (
                    <div 
                      key={idx}
                      style={{ height: `${h}%` }}
                      className="w-2.5 md:w-3.5 rounded-t bg-indigo-500/40 hover:bg-indigo-500 transition-all duration-300"
                    ></div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between mt-3 text-[9px] uppercase font-bold tracking-wider text-[#c6c6cc]">
              <span>Hari 1</span>
              <span>Hari 10</span>
              <span>Hari 20</span>
              <span>Hari 30</span>
            </div>
          </section>

          {/* Node Status lists */}
          <section className="glass-card rounded-xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h4 className="font-heading text-sm font-bold text-white mb-6">Datacenter Nodes Status</h4>
              <div className="space-y-4">
                
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
                  <div className="flex-1 text-xs">
                    <p className="font-semibold text-white">Cyber 1 Jakarta Center</p>
                    <p className="text-[10px] text-[#c6c6cc] mt-0.5">Core Ryzen 9 Node • 2ms Latency</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
                  <div className="flex-1 text-xs">
                    <p className="font-semibold text-white">Equinix SG1 Singapore</p>
                    <p className="text-[10px] text-[#c6c6cc] mt-0.5">Standard EPYC Node • 12ms Latency</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
                  <div className="flex-1 text-xs">
                    <p className="font-semibold text-white">US-West Node</p>
                    <p className="text-[10px] text-[#c6c6cc] mt-0.5">Valheim/Palworld Node • 140ms Latency</p>
                  </div>
                </div>

              </div>
            </div>
            
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl mt-4">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-indigo-400">Physical Stack</span>
              <div className="font-bold text-white text-[11px] mt-0.5">CPU Allocations: 92% Busy</div>
            </div>
          </section>

        </div>

        {/* Recent orders pagination list of data */}
        <section className="glass-card rounded-xl overflow-hidden">
          <div className="px-6 md:px-8 py-5 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h4 className="font-heading text-sm font-bold text-white">Data Log Order Transaksi</h4>
            <button 
              onClick={handleExportCSV}
              className="bg-white/5 hover:bg-white/10 text-xs font-semibold px-4 py-2 rounded-lg border border-white/10 transition-all text-[#e2e2e2] flex items-center gap-1.5"
            >
              <FileDown className="w-3.5 h-3.5" /> Export Excel/CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs">
              <thead>
                <tr className="bg-slate-900/50 text-[#c6c6cc] border-b border-white/5">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Pelanggan / Akun</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Game & Soft</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Ubah Status</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-right">Biaya (Rupiah)</th>
                  <th className="px-6 py-4 text-center font-bold uppercase tracking-wider">Opsi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/[0.01] transition-colors">
                      
                      {/* Trx ID */}
                      <td className="px-6 py-4 font-mono text-indigo-400 font-bold">{ord.id}</td>
                      
                      {/* Customer Details */}
                      <td className="px-6 py-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[9px] font-bold text-indigo-400 font-heading">
                            {ord.customerInitial}
                          </div>
                          <span className="font-bold text-white text-[11px]">{ord.customer}</span>
                        </div>
                        {ord.gmail && (
                          <div className="text-[10px] text-[#c6c6cc] font-mono leading-none">{ord.gmail}</div>
                        )}
                      </td>

                      {/* Game & Loader version info */}
                      <td className="px-6 py-4 leading-normal text-[#c6c6cc]">
                        <span className="text-white font-bold">{ord.package}</span>
                        {ord.game && (
                          <div className="text-[10px] text-[#c6c6cc]">
                            {ord.game} ({ord.egg ? ord.egg : ord.version})
                          </div>
                        )}
                      </td>

                      {/* Editable Interactive Dropdown status */}
                      <td className="px-6 py-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value as any)}
                          className={`px-2 py-1 text-[11px] font-bold rounded-lg border focus:outline-none bg-slate-900 cursor-pointer ${
                            ord.status === 'Selesai'
                              ? 'text-green-400 border-green-500/20'
                              : ord.status === 'Diproses'
                                ? 'text-indigo-400 border-indigo-500/20'
                                : 'text-yellow-400 border-yellow-500/20'
                          }`}
                        >
                          <option value="Pending" className="text-yellow-400 bg-slate-950">Pending</option>
                          <option value="Diproses" className="text-indigo-400 bg-slate-950">Diproses</option>
                          <option value="Selesai" className="text-green-400 bg-slate-950">Selesai</option>
                        </select>
                      </td>

                      {/* Costs */}
                      <td className="px-6 py-4 text-right font-mono font-bold text-white">
                        {formatRupiah(ord.amount)}
                      </td>

                      {/* Pruning Order Operations Item */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDeleteOrder(ord.id)}
                          className="p-1 px-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded border border-red-500/20 transition-all text-[10px]"
                          title="Hapus Log Transaksi"
                        >
                          <Trash2 className="w-3.5 h-3.5 mx-auto" />
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-12 text-center text-[#c6c6cc] text-xs">
                      Tidak ada data log transaksi yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination section container */}
          <div className="px-6 md:px-8 py-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#c6c6cc] bg-[#1a1c1c]/10">
            <span>Showing {Math.min(filteredOrders.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredOrders.length, currentPage * itemsPerPage)} of {filteredOrders.length} entries</span>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-7 h-7 flex items-center justify-center rounded border border-white/5 bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all font-sans"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button 
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-7 h-7 flex items-center justify-center rounded font-semibold text-[11px] ${
                    currentPage === idx + 1 
                      ? 'bg-indigo-500 text-white font-extrabold shadow' 
                      : 'border border-white/5 bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="w-7 h-7 flex items-center justify-center rounded border border-white/5 bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all font-sans"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
