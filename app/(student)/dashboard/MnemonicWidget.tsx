'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Mnemonic {
  id: string;
  title: string;
  acronym: string;
  description: string;
}

const THEMES = [
  { id: 'brand', name: 'Brand Default', bg: 'linear-gradient(135deg, #0A2018 0%, #0F2E22 40%, #133828 70%, #174030 100%)', text: 'text-emerald-50', accent: 'text-emerald-400', badgeBg: 'bg-emerald-500/20 text-emerald-300' },
  { id: 'ocean', name: 'Ocean Blue', bg: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)', text: 'text-blue-50', accent: 'text-blue-300', badgeBg: 'bg-blue-500/30 text-blue-100' },
  { id: 'sunrise', name: 'Sunrise Amber', bg: 'linear-gradient(135deg, #78350f 0%, #b45309 50%, #f59e0b 100%)', text: 'text-amber-50', accent: 'text-amber-300', badgeBg: 'bg-amber-500/30 text-amber-100' },
  { id: 'amethyst', name: 'Amethyst', bg: 'linear-gradient(135deg, #2e1065 0%, #581c87 50%, #7e22ce 100%)', text: 'text-purple-50', accent: 'text-purple-300', badgeBg: 'bg-purple-500/30 text-purple-100' }
];

export function MnemonicWidget() {
  const supabase = createClient();
  const [mnemonic, setMnemonic] = useState<Mnemonic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [themeId, setThemeId] = useState('brand');
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  useEffect(() => {
    // Load saved theme
    const saved = localStorage.getItem('nurse_fiti_mnemonic_theme');
    if (saved && THEMES.find(t => t.id === saved)) {
      setThemeId(saved);
    }

    const fetchMnemonic = async () => {
      try {
        const { data, error } = await supabase
          .from('mnemonics')
          .select('*')
          .order('created_at', { ascending: true });

        if (error || !data || data.length === 0) {
          setIsLoading(false);
          return;
        }

        const now = Date.now();
        const dayIndex = Math.floor((now - new Date().getTimezoneOffset() * 60000) / 86400000);
        const currentIndex = dayIndex % data.length;

        setMnemonic(data[currentIndex]);
      } catch (e) {
        console.error('Failed to load mnemonic', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMnemonic();
  }, [supabase]);

  const changeTheme = (id: string) => {
    setThemeId(id);
    localStorage.setItem('nurse_fiti_mnemonic_theme', id);
    setIsThemeMenuOpen(false);
  };

  if (isLoading) return null;
  if (!mnemonic) return null; // Gracefully hide if no mnemonics

  const currentTheme = THEMES.find(t => t.id === themeId) || THEMES[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl group"
      style={{
        background: currentTheme.bg,
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
      }}
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none mix-blend-overlay" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/20 rounded-full blur-3xl pointer-events-none mix-blend-overlay" />

      {/* Floating Icon Animation */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 right-6 text-6xl sm:text-8xl opacity-10 pointer-events-none drop-shadow-2xl"
      >
        🧠
      </motion.div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className={`${currentTheme.badgeBg} text-[11px] font-bold uppercase px-3 py-1 rounded-full tracking-wider border border-white/10 backdrop-blur-sm`}>
              ✨ Mnemonic of the Day
            </span>
            
            {/* Theme Switcher Toggle */}
            <div className="relative">
              <button 
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10"
                title="Change Theme"
              >
                🎨
              </button>
              
              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute left-0 mt-2 p-2 bg-white rounded-xl shadow-2xl z-50 flex gap-2 border border-gray-100"
                  >
                    {THEMES.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => changeTheme(theme.id)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${themeId === theme.id ? 'border-blue-500 scale-110' : 'border-transparent'}`}
                        style={{ background: theme.bg }}
                        title={theme.name}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <h2 className={`text-2xl sm:text-3xl font-bold ${currentTheme.text} mb-2 tracking-tight`}>
            {mnemonic.title}
          </h2>
          
          <div className="inline-block px-4 py-2 bg-black/20 rounded-lg border border-white/10 backdrop-blur-md mb-4">
            <p className={`font-mono font-semibold ${currentTheme.accent} tracking-wide text-sm sm:text-base`}>
              {mnemonic.acronym}
            </p>
          </div>
          
          <p className={`${currentTheme.text} opacity-90 text-sm sm:text-base leading-relaxed line-clamp-2 md:line-clamp-none max-w-2xl`}>
            {mnemonic.description}
          </p>
        </div>
        
        <div className="flex-shrink-0 mt-4 md:mt-0">
          <Link href="/mnemonics">
            <button className={`
              w-full md:w-auto relative overflow-hidden group/btn
              bg-white/10 hover:bg-white/20 text-white
              border border-white/20 backdrop-blur-md
              font-semibold px-6 py-3 rounded-xl transition-all duration-300
              shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]
              flex items-center justify-center gap-2
            `}>
              <span>View Archive & Download</span>
              <span className="text-xl group-hover/btn:translate-x-1 transition-transform">📚</span>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
