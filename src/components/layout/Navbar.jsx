import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Play, Cpu, Compass, Layers, ShieldCheck, Users, Image as ImageIcon } from 'lucide-react';
import { sound } from '../../utils/audio';

export function Navbar({ onRunAutoDemo, isAutoDemo, isMuted, onToggleMute, onOpenSpecs }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Kinematics', href: '#kinematics' },
    { name: '3D Sandbox', href: '#simulator' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Control Unit', href: '#electronics' },
    { name: 'Fabrication', href: '#gallery' },
    { name: 'Team 7', href: '#team' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#05070B]/90 backdrop-blur-xl border-b border-cyan-500/20 py-2.5 shadow-2xl shadow-cyan-950/20' 
        : 'bg-gradient-to-b from-[#05070B] via-[#05070B]/70 to-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#" 
          className="flex items-center gap-3 group"
          onClick={() => sound.playBeep(980, 0.05)}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-900 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-shadow">
            <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center font-heading font-black text-lg text-cyan-400 tracking-wider">
              P7
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                PneuPick
              </span>
              <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                TEAM 7
              </span>
            </div>
            <p className="text-[10px] font-mono-tech text-slate-400 tracking-wider uppercase">
              SRMIST • 3-AXIS ASRS ROBOT
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => sound.playBeep(880, 0.03)}
              className="text-xs font-mono-tech uppercase tracking-wider text-slate-300 hover:text-cyan-400 px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls & Telemetry */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Pressure Telemetry Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-mono-tech">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400">PNEU-LINE:</span>
            <span className="text-emerald-400 font-bold">6.2 BAR</span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={() => {
              onToggleMute();
              sound.playBeep(700, 0.05);
            }}
            title={isMuted ? "Unmute Pneumatic Sound Effects" : "Mute Sound Effects"}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Specs Drawer Trigger */}
          <button
            onClick={() => {
              onOpenSpecs();
              sound.playBeep(920, 0.05);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono-tech text-slate-200 hover:text-white hover:border-slate-500 transition-colors"
          >
            SPECS SHEET
          </button>

          {/* Run Auto Demo Button */}
          <button
            onClick={() => {
              onRunAutoDemo();
              sound.playPneumaticExhaust(0.4, 2600);
            }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono-tech font-semibold tracking-wider uppercase transition-all shadow-lg ${
              isAutoDemo 
                ? 'bg-amber-500 text-black shadow-amber-500/30 animate-pulse'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/25 hover:shadow-cyan-400/40'
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isAutoDemo ? 'animate-spin' : ''}`} />
            <span>{isAutoDemo ? 'CYCLE RUNNING...' : 'AUTO CYCLE'}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onToggleMute}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b14]/98 border-b border-cyan-500/20 px-4 pt-4 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-mono-tech uppercase tracking-wider text-slate-300 hover:text-cyan-400 p-2 rounded bg-slate-900/60"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => {
                onOpenSpecs();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono-tech px-3 py-2 rounded bg-slate-800 text-slate-200 border border-slate-700"
            >
              TECHNICAL SPECS
            </button>
            <button
              onClick={() => {
                onRunAutoDemo();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono-tech px-4 py-2 rounded bg-cyan-500 text-black font-bold"
            >
              {isAutoDemo ? 'ABORT CYCLE' : 'RUN AUTO DEMO'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
