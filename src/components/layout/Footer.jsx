import React from 'react';
import { PROJECT_INFO } from '../../data/projectData';
import { sound } from '../../utils/audio';
import { ArrowUp, ShieldCheck, Cpu, ExternalLink } from 'lucide-react';

export function Footer({ onOpenSpecs }) {
  const scrollToTop = () => {
    sound.playBeep(980, 0.05);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030508] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-left relative overflow-hidden">
      {/* Background accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Institutional Credit (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-900 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center font-heading font-black text-sm text-cyan-400">
                  P7
                </div>
              </div>
              <span className="font-heading font-bold text-xl text-white">
                PneuPick
              </span>
              <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                TEAM 7
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              Autonomous 3-Axis Pneumatic Material Handling & ASRS Robot. 
              Developed by Team 7 at SRM Institute of Science and Technology.
            </p>

            <div className="pt-2 text-xs font-mono-tech text-slate-500 space-y-1">
              <div>INSTITUTION: SRM Institute of Science and Technology</div>
              <div>DEPARTMENTS: SIESED • SPACED • SAMBED • MCSOCD</div>
              <div>FRAMEWORK: 100% Spark-Free Pneumatic Gantry</div>
            </div>
          </div>

          {/* Column 2: Quick Jump Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
              PROJECT SECTIONS
            </h4>
            <ul className="space-y-2 text-xs font-mono-tech">
              <li>
                <a href="#overview" className="hover:text-cyan-400 transition-colors">
                  &gt; Problem & Advantage
                </a>
              </li>
              <li>
                <a href="#kinematics" className="hover:text-cyan-400 transition-colors">
                  &gt; 3-Axis Kinematics & DCVs
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-cyan-400 transition-colors">
                  &gt; 3D Gantry Testbed Sandbox
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-cyan-400 transition-colors">
                  &gt; 5-Step Operational Pipeline
                </a>
              </li>
              <li>
                <a href="#electronics" className="hover:text-cyan-400 transition-colors">
                  &gt; ESP32 & LCD Hardware
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-cyan-400 transition-colors">
                  &gt; Prototyping Archive
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-cyan-400 transition-colors">
                  &gt; Team 7 Engineers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Documentation & Spec Sheet (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
              ENGINEERING DOCUMENTATION
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on the certified project report covering 600mm vertical travel, dual 200mm horizontal carriage, 100mm Z-axis extension, and dual-contour jaw mechanics.
            </p>
            <button
              onClick={() => {
                onOpenSpecs();
                sound.playBeep(880, 0.04);
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-xs font-mono-tech text-cyan-300 hover:text-white transition-all flex items-center gap-2"
            >
              <span>VIEW FULL TECHNICAL SPEC SHEET</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} PneuPick • Team 7. SRM Institute of Science and Technology. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
