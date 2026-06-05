import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldAlert, ArrowLeft } from 'lucide-react';
import { AppConfig } from '../types';

interface AdminLoginProps {
  config: AppConfig;
  onLoginSuccess: () => void;
  onBackToStore: () => void;
}

export default function AdminLogin({ config, onLoginSuccess, onBackToStore }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorStatus(null);
    setIsSubmitting(true);

    // Simulated short realistic mainframe connection delay
    setTimeout(() => {
      const targetUsername = config.adminUsername || 'admin';
      const targetPassword = config.adminPassword || 'gavenstoreadmin123';
      
      if (username.trim() === targetUsername && password === targetPassword) {
        onLoginSuccess();
      } else {
        setErrorStatus('Username atau password yang Anda masukkan salah. Silahkan hubungi administrator sistem.');
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      
      {/* Background radial atmosphere glow */}
      <div 
        className="absolute w-[450px] h-[450px] rounded-full blur-[140px] opacity-[0.12] pointer-events-none z-0" 
        style={{ 
          background: `radial-gradient(circle, ${config.primaryThemeHex || '#6366f1'} 0%, transparent 70%)`,
          top: '30%', 
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        
        {/* Back Link */}
        <button 
          onClick={onBackToStore}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#c6c6cc] hover:text-white mb-6 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/5 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali Ke Store
        </button>

        <div className="glass-card bg-slate-900/60 border border-white/10 p-8 rounded-2xl shadow-2xl space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mx-auto text-indigo-400">
              <Lock className="w-6 h-6" />
            </div>
            
            <div>
              <h2 className="font-heading text-xl font-bold tracking-tight text-white">Administrator Secure Portal</h2>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#c6c6cc] opacity-75">Gaven Store Root Access</p>
            </div>
          </div>

          {/* Error Alert Display */}
          {errorStatus && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 text-xs text-red-400">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                {errorStatus}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs font-sans">
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#c6c6cc] uppercase tracking-wider">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#c6c6cc]/40">
                  <User className="w-4 h-4" />
                </span>
                
                <input 
                  required
                  type="text" 
                  name="admin-username"
                  autoComplete="username"
                  placeholder="Masukkan username root..."
                  className="w-full pl-9 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholderRef-[#c6c6cc]/20 focus:outline-none focus:border-indigo-500 text-xs transition-colors"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-[#c6c6cc] uppercase tracking-wider">Password Access Key</label>
              </div>
              
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#c6c6cc]/40">
                  <Lock className="w-4 h-4" />
                </span>
                
                <input 
                  required
                  type={showPassword ? 'text' : 'password'} 
                  name="admin-password"
                  autoComplete="current-password"
                  placeholder="Masukkan password Anda..."
                  className="w-full pl-9 pr-10 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholderRef-[#c6c6cc]/20 focus:outline-none focus:border-indigo-500 text-xs transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#c6c6cc]/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-500 text-white font-bold py-3.5 rounded-xl block hover:brightness-110 shadow-[0_4px_14px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center text-xs uppercase tracking-wider"
              style={{ backgroundColor: config.primaryThemeHex || '#6366f1' }}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Sign In Securely'
              )}
            </button>

          </form>

        </div>

      </div>
      
    </div>
  );
}
