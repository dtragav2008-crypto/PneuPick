import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/audio';
import { Gauge, CheckCircle2, Cpu } from 'lucide-react';

export function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [pressure, setPressure] = useState(0.0);
  const [stepIndex, setStepIndex] = useState(0);

  const logs = [
    "Mounting ESP32-WROOM-32 Controller...",
    "Calibrating 5/3 DCV Closed-Center Manifold...",
    "Synchronizing Dual 200mm X-Axis Cylinders...",
    "Pressurizing FRL Air Circuit to 6.2 Bar...",
    "Engaging Dual-Contour Jaw Gripper..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            sound.playPneumaticExhaust(0.4, 3000);
            onLoaded();
          }, 350);
          return 100;
        }
        const next = prev + 5;
        setPressure(((next / 100) * 6.2).toFixed(1));
        if (next % 20 === 0) {
          setStepIndex((s) => Math.min(s + 1, logs.length - 1));
          sound.playSolenoidClick();
        }
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-50 bg-[#04060A] flex flex-col items-center justify-center p-6 text-white overflow-hidden tech-grid">
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        {/* Animated Brand Emblem */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-700 p-0.5 shadow-2xl shadow-cyan-500/30 animate-pulse">
            <div className="w-full h-full bg-[#070B14] rounded-[14px] flex items-center justify-center font-heading font-black text-3xl text-cyan-400">
              P7
            </div>
          </div>
          <div className="absolute -inset-2 border border-cyan-500/20 rounded-3xl animate-ping opacity-30" />
        </div>

        <h1 className="text-2xl font-heading font-bold text-white tracking-tight mb-1">
          PNEUPICK SYSTEM INITIALIZATION
        </h1>
        <p className="text-xs font-mono-tech text-cyan-400 tracking-widest uppercase mb-8">
          TEAM 7 • SRMIST CARTESIAN GANTRY ROBOT
        </p>

        {/* Pressure Gauge Metric */}
        <div className="w-full bg-[#0a0f1d] border border-slate-800 rounded-xl p-4 mb-4 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono-tech mb-2">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Gauge className="w-4 h-4 text-cyan-400" />
              SYSTEM AIR CHARGE
            </span>
            <span className="text-cyan-300 font-bold text-sm">
              {pressure} / 6.2 BAR
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-75 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono-tech text-slate-500 mt-2">
            <span>PSI: {(pressure * 14.5).toFixed(0)}</span>
            <span>{progress}% READY</span>
          </div>
        </div>

        {/* Console step status */}
        <div className="w-full h-12 flex items-center justify-center text-center">
          <p className="text-xs font-mono-tech text-slate-300 flex items-center gap-2 animate-fade">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {logs[stepIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}
