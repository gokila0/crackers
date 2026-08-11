import React, { useState } from 'react';
import { Palette, Sun, Moon, Check } from 'lucide-react';

export const THEMES = [
  {
    id: 'maroon',
    name: 'Festive Maroon',
    color: '#8b0000',
    accent: '#f59e0b',
    gradient: 'from-red-900 to-amber-600',
  },
  {
    id: 'sapphire',
    name: 'Royal Sapphire',
    color: '#1e3a8a',
    accent: '#f59e0b',
    gradient: 'from-blue-900 to-amber-500',
  },
  {
    id: 'emerald',
    name: 'Emerald Fireworks',
    color: '#065f46',
    accent: '#eab308',
    gradient: 'from-emerald-900 to-yellow-500',
  },
  {
    id: 'violet',
    name: 'Imperial Purple',
    color: '#581c87',
    accent: '#f97316',
    gradient: 'from-purple-900 to-orange-500',
  },
];

export default function ThemeSelector({ colorTheme, setColorTheme, mode, setMode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181329] border border-amber-500/30 text-amber-400 hover:border-amber-400 transition-all text-xs font-extrabold shadow-sm active:scale-95 cursor-pointer"
        title="Customize Website Colors"
      >
        <Palette className="w-4 h-4 text-amber-400 animate-pulse" />
        <span className="hidden sm:inline">Theme Colors</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Dropdown */}
          <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#140f22] border border-amber-500/40 shadow-2xl p-4 z-50 space-y-3 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Palette className="w-4 h-4" /> Color Palette
              </span>
              <button
                onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
                title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {mode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {THEMES.map((theme) => {
                const isActive = colorTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setColorTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/30 shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: theme.color }}
                    >
                      {isActive && <Check className="w-2.5 h-2.5 text-amber-300 stroke-[3]" />}
                    </span>
                    <span className="truncate">{theme.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
