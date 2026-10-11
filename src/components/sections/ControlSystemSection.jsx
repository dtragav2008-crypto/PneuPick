import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { Cpu, Bluetooth, Terminal, Monitor, Key, Zap, CheckCircle2 } from 'lucide-react';

export function ControlSystemSection() {
  const [lcdLine1, setLcdLine1] = useState("PNEUPICK SYS: OK");
  const [lcdLine2, setLcdLine2] = useState("PRESS KEY [1-6]");
  const [keypadInput, setKeypadInput] = useState("");

  const keypadKeys = [
    ['1', '2', '3', 'A'],
    ['4', '5', '6', 'B'],
    ['7', '8', '9', 'C'],
    ['*', '0', '#', 'D']
  ];

  const handleKeyPress = (key) => {
    sound.playBeep(1100, 0.04);
    if (key === '#') {
      // Execute command
      setLcdLine1(`DISPATCH: SL-${keypadInput || '01'}`);
      setLcdLine2("PNEU EXECUTING...");
      sound.playSolenoidClick();
      setTimeout(() => {
        setLcdLine1("CYCLE FINISHED");
        setLcdLine2("AWAITING INPUT");
      }, 1500);
      setKeypadInput("");
    } else if (key === '*') {
      // Clear
      setKeypadInput("");
      setLcdLine1("TARGET CLEARED");
      setLcdLine2("ENTER SHELF [1-6]");
    } else {
      const nextInput = (keypadInput + key).slice(-4);
      setKeypadInput(nextInput);
      setLcdLine1(`TARGET SLOT: ${nextInput}`);
      setLcdLine2("PRESS '#' TO RUN");
    }
  };

  return (
    <section id="electronics" className="py-24 bg-[#05070B] relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono-tech text-cyan-300 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>EMBEDDED HARDWARE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
            ESP32 CONTROLLER & TELEMETRY
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            While mechanical forces are entirely pneumatic, coordination and user command parsing 
            are managed by an ESP32 dual-core microcontroller. Test the simulated 16×2 LCD screen 
            and 4×4 keypad interface below.
          </p>
        </div>

        {/* Embedded Stack Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 4 Architecture Pillars */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white mb-1">
                  ESP32 Dual-Core Central Processing Unit
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Tensilica Xtensa dual-core running at 240 MHz. Dedicated FreeRTOS tasks separate real-time pneumatic valve timing sequences from user input and wireless telemetry.
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs font-mono-tech text-cyan-400">
                  <span>240 MHz FREQ</span>
                  <span>FREERTOS KERNEL</span>
                  <span>520 KB SRAM</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Bluetooth className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white mb-1">
                  Bluetooth SPP & BLE Telemetry Link
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Wireless link enables operators to transmit coordinate sequences from mobile terminals or receive cycle diagnostics, pressure warnings, and limit-switch states.
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs font-mono-tech text-blue-400">
                  <span>BT 4.2 BR/EDR</span>
                  <span>SERIAL STREAM</span>
                  <span>115200 BAUD</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white mb-1">
                  Optoisolated Solenoid Driver Manifold
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  High-speed optocouplers electrically isolate delicate 3.3V microcontroller logic from inductive flyback voltages generated by 24V/12V pneumatic solenoid coils.
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs font-mono-tech text-orange-400">
                  <span>2.5 KV ISOLATION</span>
                  <span>FLYBACK DIODES</span>
                  <span>&lt;15ms SWITCHING</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Simulated LCD Display & 4x4 Keypad Module */}
          <div className="lg:col-span-5 glass-panel-cyan rounded-2xl p-6 sm:p-8 text-left space-y-6">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-heading font-bold text-white uppercase tracking-tight">
                  HARDWARE SIMULATOR
                </h3>
              </div>
              <span className="text-[11px] font-mono-tech text-cyan-300">
                16×2 LCD + 4×4 KEYPAD
              </span>
            </div>

            {/* Retro 16x2 Green Character LCD Screen */}
            <div className="p-4 rounded-xl bg-[#092215] border-4 border-[#0e3a24] shadow-inner font-mono text-emerald-400 select-none">
              <div className="bg-[#05180e] p-3 rounded border border-emerald-900/60 shadow-inner">
                <div className="text-base sm:text-lg tracking-widest font-black uppercase text-emerald-300 h-6 truncate">
                  {lcdLine1.padEnd(16, ' ')}
                </div>
                <div className="text-base sm:text-lg tracking-widest font-black uppercase text-emerald-400 h-6 truncate mt-1">
                  {lcdLine2.padEnd(16, ' ')}
                </div>
              </div>
              <div className="text-[10px] text-emerald-600 mt-2 flex justify-between uppercase">
                <span>HD44780 16×2 MATRIX</span>
                <span>BACKLIGHT: ACTIVE</span>
              </div>
            </div>

            {/* 4x4 Tactile Keypad */}
            <div>
              <span className="text-xs font-mono-tech text-slate-400 block mb-2 uppercase">
                PRESS PHYSICAL KEYS TO ENTER COORDINATE:
              </span>
              <div className="grid grid-cols-4 gap-2 bg-black/60 p-3 rounded-xl border border-slate-800">
                {keypadKeys.map((row, rIdx) =>
                  row.map((key, kIdx) => (
                    <button
                      key={`${rIdx}-${kIdx}`}
                      onClick={() => handleKeyPress(key)}
                      className={`h-12 rounded-lg font-mono-tech font-bold text-sm transition-all active:scale-95 shadow-md ${
                        key === '#'
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20'
                          : key === '*'
                          ? 'bg-rose-500 hover:bg-rose-400 text-black shadow-rose-500/20'
                          : ['A', 'B', 'C', 'D'].includes(key)
                          ? 'bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-800'
                          : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                      }`}
                    >
                      {key}
                    </button>
                  ))
                )}
              </div>
            </div>

            <p className="text-xs font-mono-tech text-slate-400 leading-relaxed">
              * Tip: Press numbers to enter target slot coordinate, then press <strong>#</strong> to execute. Press <strong>*</strong> to clear.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
