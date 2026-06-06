import React from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Layers, 
  Radio, 
  Users, 
  HelpCircle, 
  LogOut,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  brandName: string;
  onLogout: () => void;
  onClose?: () => void;
}

export default function AdminSidebar({ currentTab, onTabChange, brandName, onLogout, onClose }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard', name: 'Overview', icon: LayoutDashboard },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'inventory', name: 'Inventory', icon: Layers }, // switches tab settings and highlights inventory!
    { id: 'campaigns', name: 'Campaigns', icon: Radio },
    { id: 'users', name: 'Users', icon: Users },
  ];

  return (
    <aside className="w-64 bg-slate-950/30 backdrop-blur-xl border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 z-50 py-8 select-none shadow-[2px_0_20px_rgba(0,0,0,0.2)]">
      
      {/* Sidebar title */}
      <div className="px-6 mb-10 flex justify-between items-center">
        <div>
          <h1 className="font-heading text-lg md:text-xl font-extrabold text-white tracking-tight">
            {brandName || 'Gaven Admin'}
          </h1>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#c6c6cc] opacity-70 mt-1">
            System Root
          </p>
        </div>
        
        {onClose && (
          <button 
            type="button"
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg bg-white/5 text-[#c6c6cc] hover:text-white hover:bg-white/10 border border-white/10 transition-colors"
            title="Tutup Menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav Link items */}
      <nav className="flex-1 space-y-1 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id || (item.id === 'inventory' && currentTab === 'inventory');
          
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'inventory') {
                  onTabChange('settings'); // Inventory is a section of settings tab!
                  setTimeout(() => {
                    document.getElementById('inventory-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  onTabChange(item.id);
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-150 group text-left ${
                isActive 
                  ? 'bg-secondary-accent/15 text-secondary-accent border-r-4 border-secondary-accent font-semibold' 
                  : 'text-[#c6c6cc] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-secondary-accent' : 'text-[#c6c6cc] group-hover:text-white'}`} />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Support & Logout links */}
      <div className="px-2 mt-auto border-t border-white/5 pt-4 space-y-1">
        <button
          onClick={() => onTabChange('support')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
            currentTab === 'support' 
              ? 'bg-secondary-accent/15 text-secondary-accent' 
              : 'text-[#c6c6cc] hover:bg-white/5 hover:text-white'
          }`}
        >
          <HelpCircle className="w-5 h-5 text-[#c6c6cc]" />
          <span className="text-sm font-medium">Support</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#c6c6cc] hover:bg-red-500/10 hover:text-red-400 transition-all font-medium text-left"
        >
          <LogOut className="w-5 h-5 text-[#c6c6cc] group-hover:text-red-400" />
          <span className="text-sm">Logout Store</span>
        </button>
      </div>

    </aside>
  );
}
