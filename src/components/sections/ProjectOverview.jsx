import React, { useState } from 'react';
import { ShieldCheck, Flame, Zap, Gauge, RefreshCw, Layers, Check, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../../utils/audio';

export function ProjectOverview() {
  const [activeTab, setActiveTab] = useState('pneumatic');

  const comparisonData = [
    {
      feature: "Intrinsic Safety / Spark Risk",
      pneumatic: "100% Spark-Free; Zero electrical discharge risk in volatile or combustible environments.",
      electric: "Motor brushes and power switching pose electrical arcing risks requiring ATEX enclosures.",
      winner: "pneumatic"
    },
    {
      feature: "Force-to-Weight Ratio",
      pneumatic: "Extreme power density; Lightweight cylinders produce up to 345 N thrust with minimal carriage inertia.",
      electric: "Heavy copper windings and gearbox assemblies increase moving carriage mass significantly.",
      winner: "pneumatic"
    },
    {
      feature: "Mechanical Wear & Overheating",
      pneumatic: "No overheating during stall or clamped hold states; compressed air cools internal chambers.",
      electric: "Sustained stall holding generates rapid coil heating, requiring active heatsinks or encoders.",
      winner: "pneumatic"
    },
    {
      feature: "Dual Payload Compliance",
      pneumatic: "Inherent air compressibility provides natural cushioning for delicate spheres and 60mm cubes.",
      electric: "Requires complex current feedback or strain gauges to avoid crushing non-rigid payloads.",
      winner: "pneumatic"
    },
    {
      feature: "Maintenance & Cycle Speed",
      pneumatic: "Instantaneous solenoid valve switching (<20ms) with low-wear polyurethane seal packs.",
      electric: "Lead screws and timing belts suffer backlash, belt stretching, and recurrent lubricating maintenance.",
      winner: "pneumatic"
    }
  ];

  return (
    <section id="overview" className="py-24 bg-[#070B14] relative overflow-hidden border-t border-slate-800/80">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 tech-dots opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono-tech text-cyan-300 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>ENGINEERING PARADIGM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
            THE PNEUMATIC ADVANTAGE IN AUTOMATED STORAGE
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Conventional Automated Storage & Retrieval Systems (ASRS) frequently suffer from heavy moving masses, 
            high motor thermal loads, and severe spark hazards in chemical, pharmaceutical, and dust-laden warehouses. 
            <strong> PneuPick replaces bulky multi-axis electric drive trains with high-velocity pneumatic cylinders</strong>, 
            creating an intrinsically safe, lightweight, and high-efficiency Cartesian gantry.
          </p>
        </div>

        {/* 3 Pillars of Innovation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl glass-panel-cyan text-left relative group hover:border-cyan-400/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              Explosion-Safe Cartesian Gantry
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Operating entirely via compressed air across all 3 linear axes ensures zero electrical arcing or frictional thermal spikes at the end-effector and moving joints.
            </p>
            <div className="mt-4 pt-4 border-t border-cyan-500/20 flex items-center justify-between text-xs font-mono-tech text-cyan-400">
              <span>ATEX COMPLIANT POTENTIAL</span>
              <span>100% SPARK-FREE</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel text-left relative group hover:border-orange-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform">
              <Gauge className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              5/3 Closed-Center Intermediate Hold
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              The 600 mm vertical Y-axis uses a 3-position 5/3 directional control valve to trap equal pressure on both sides of the piston, securely locking the carriage at any shelf tier height.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono-tech text-orange-400">
              <span>CLOSED-CENTER LOCK</span>
              <span>MULTI-TIER ACCESS</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel text-left relative group hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              Universal Dual-Geometry Jaw
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Engineered with contoured V-grooves and resilient silicone grip inserts, the end-effector reliably grasps flat 60 mm cube faces and curved spherical tennis balls with zero slippage.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono-tech text-emerald-400">
              <span>COMPLIANT CONTACT</span>
              <span>CUBE + SPHERE</span>
            </div>
          </div>
        </div>

        {/* Technical Comparison Table: Pneumatic vs Electric Motors */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-heading font-bold text-white uppercase tracking-tight">
                Architectural Benchmark: Pneumatics vs Conventional Servos
              </h3>
              <p className="text-xs font-mono-tech text-slate-400 mt-1">
                Evaluation of physical kinematics, thermal resilience, and warehouse safety
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setActiveTab('pneumatic');
                  sound.playBeep(840, 0.04);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech transition-all ${
                  activeTab === 'pneumatic'
                    ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                PneuPick Architecture
              </button>
              <button
                onClick={() => {
                  setActiveTab('all');
                  sound.playBeep(840, 0.04);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech transition-all ${
                  activeTab === 'all'
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Side-by-Side Matrix
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-mono-tech text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Evaluation Metric</th>
                  <th className="py-3 px-4 text-cyan-400 bg-cyan-950/20">PneuPick (Pneumatic 3-Axis)</th>
                  <th className="py-3 px-4 text-slate-400">Traditional Electric Motors / Servos</th>
                  <th className="py-3 px-4 text-center">Safety Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-sm">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-850/30 transition-colors">
                    <td className="py-4 px-4 font-medium text-white text-xs sm:text-sm font-heading">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-cyan-200 bg-cyan-950/10 text-xs sm:text-sm leading-relaxed">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{row.pneumatic}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-400 text-xs sm:text-sm leading-relaxed">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{row.electric}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[11px] font-mono-tech font-bold uppercase">
                        OPTIMAL
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
