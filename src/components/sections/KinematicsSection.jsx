import React, { useState } from 'react';
import { KINEMATICS_AXES } from '../../data/projectData';
import { sound } from '../../utils/audio';
import { ArrowDownUp, MoveHorizontal, CornerDownRight, HandMetal, Gauge, Cpu, RefreshCw, Zap } from 'lucide-react';

export function KinematicsSection() {
  const [selectedAxisIndex, setSelectedAxisIndex] = useState(0);
  const [valveState, setValveState] = useState({
    yValve: 'center', // 'up' | 'center' | 'down'
    xValve: 'left',   // 'left' | 'right'
    zValve: 'retract', // 'extend' | 'retract'
    gripper: 'open'   // 'open' | 'clamp'
  });

  const selectedAxis = KINEMATICS_AXES[selectedAxisIndex];

  const handleYValveChange = (newState) => {
    setValveState(prev => ({ ...prev, yValve: newState }));
    sound.playPneumaticExhaust(0.35, newState === 'center' ? 1800 : 2400);
    sound.playSolenoidClick();
  };

  const handleXValveChange = (newState) => {
    setValveState(prev => ({ ...prev, xValve: newState }));
    sound.playPneumaticExhaust(0.3, 2200);
    sound.playSolenoidClick();
  };

  const handleZValveChange = (newState) => {
    setValveState(prev => ({ ...prev, zValve: newState }));
    sound.playPneumaticExhaust(0.25, 2600);
    sound.playSolenoidClick();
  };

  const handleGripperChange = (newState) => {
    setValveState(prev => ({ ...prev, gripper: newState }));
    sound.playPneumaticExhaust(0.2, 3200);
    sound.playSolenoidClick();
  };

  return (
    <section id="kinematics" className="py-24 bg-[#05070B] relative overflow-hidden border-t border-slate-800">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono-tech text-cyan-300 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>MECHANICAL & FLUID ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
            3-AXIS CARTESIAN KINEMATICS & VALVE MANIFOLD
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Every movement on PneuPick is governed by precision pneumatic cylinder stroke lengths 
            and dedicated Directional Control Valves (DCVs). 
            Select an axis below to inspect its stroke specifications, valve flow topologies, and mechanical force delivery.
          </p>
        </div>

        {/* Axis Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {KINEMATICS_AXES.map((axis, index) => {
            const isSelected = selectedAxisIndex === index;
            return (
              <button
                key={axis.axis}
                onClick={() => {
                  setSelectedAxisIndex(index);
                  sound.playBeep(900 + index * 100, 0.04);
                }}
                className={`p-4 rounded-xl text-left border transition-all relative overflow-hidden ${
                  isSelected
                    ? 'glass-panel-cyan border-cyan-400/80 shadow-lg shadow-cyan-950/40'
                    : 'glass-panel border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono-tech uppercase font-bold" style={{ color: axis.color }}>
                    AXIS 0{index + 1}
                  </span>
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-black/40 border border-slate-700 text-slate-300">
                    {axis.stroke.split(' ')[0]} {axis.stroke.split(' ')[1]}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-white text-base mb-1">
                  {axis.axis}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {axis.valve}
                </p>
                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Axis Deep Dive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Mechanical Specifications & Functionality */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 text-left space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono-tech text-cyan-400 uppercase tracking-widest block">
                  SUBSYSTEM INSPECTION
                </span>
                <h3 className="text-2xl font-heading font-bold text-white mt-1">
                  {selectedAxis.axis}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono-tech bg-slate-900 border border-cyan-500/30 text-cyan-300">
                {selectedAxis.valve}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {selectedAxis.details}
            </p>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono-tech text-slate-400 block uppercase">
                KINEMATIC ROLE & APPLICATION:
              </span>
              <p className="text-sm text-cyan-200 font-medium">
                {selectedAxis.function}
              </p>
            </div>

            {/* Subsystem Technical Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {Object.entries(selectedAxis.specs).map(([key, val]) => (
                <div key={key} className="p-3 rounded-lg bg-black/40 border border-slate-800/80">
                  <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-sm font-heading font-bold text-white mt-0.5 block">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Directional Control Valve (DCV) Spool Simulator */}
          <div className="lg:col-span-5 glass-panel-cyan rounded-2xl p-6 sm:p-8 text-left space-y-6 relative">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-heading font-bold text-white uppercase tracking-tight">
                  LIVE VALVE SIMULATOR
                </h3>
              </div>
              <span className="text-xs font-mono-tech text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                ACTIVE SOLENOID COILS
              </span>
            </div>

            {/* Interactive Valve Controls */}
            <div className="space-y-4">
              {/* Y-Axis 5/3 DCV */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-white font-bold">5/3 DCV (Y-Axis 600mm):</span>
                  <span className="text-cyan-400 uppercase font-semibold">State: {valveState.yValve}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => handleYValveChange('up')}
                    className={`py-2 px-1 text-xs font-mono-tech rounded transition-all ${
                      valveState.yValve === 'up'
                        ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/30'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    EXTEND UP
                  </button>
                  <button
                    onClick={() => handleYValveChange('center')}
                    className={`py-2 px-1 text-xs font-mono-tech rounded transition-all ${
                      valveState.yValve === 'center'
                        ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/30'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    CLOSED HOLD
                  </button>
                  <button
                    onClick={() => handleYValveChange('down')}
                    className={`py-2 px-1 text-xs font-mono-tech rounded transition-all ${
                      valveState.yValve === 'down'
                        ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/30'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    RETRACT DOWN
                  </button>
                </div>
              </div>

              {/* X-Axis Dual 5/2 DCVs */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-white font-bold">Dual 5/2 DCVs (X-Axis 200mm):</span>
                  <span className="text-orange-400 uppercase font-semibold">State: {valveState.xValve}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleXValveChange('left')}
                    className={`py-2 text-xs font-mono-tech rounded transition-all ${
                      valveState.xValve === 'left'
                        ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/30'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    GANTRY LEFT (PORT 4)
                  </button>
                  <button
                    onClick={() => handleXValveChange('right')}
                    className={`py-2 text-xs font-mono-tech rounded transition-all ${
                      valveState.xValve === 'right'
                        ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/30'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    GANTRY RIGHT (PORT 2)
                  </button>
                </div>
              </div>

              {/* Z-Axis 5/2 DCV */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-white font-bold">5/2 DCV (Z-Axis 100mm):</span>
                  <span className="text-emerald-400 uppercase font-semibold">State: {valveState.zValve}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleZValveChange('extend')}
                    className={`py-2 text-xs font-mono-tech rounded transition-all ${
                      valveState.zValve === 'extend'
                        ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/30'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    PENETRATE SHELF (+100mm)
                  </button>
                  <button
                    onClick={() => handleZValveChange('retract')}
                    className={`py-2 text-xs font-mono-tech rounded transition-all ${
                      valveState.zValve === 'retract'
                        ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/30'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    RETRACT TO CLEARANCE (0mm)
                  </button>
                </div>
              </div>

              {/* Gripper Clamp */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-white font-bold">End-Effector Jaw Clamp:</span>
                  <span className="text-cyan-400 uppercase font-semibold">{valveState.gripper}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleGripperChange('clamp')}
                    className={`py-2 text-xs font-mono-tech rounded transition-all ${
                      valveState.gripper === 'clamp'
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    CLAMP PAYLOAD (45 N)
                  </button>
                  <button
                    onClick={() => handleGripperChange('open')}
                    className={`py-2 text-xs font-mono-tech rounded transition-all ${
                      valveState.gripper === 'open'
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    RELEASE JAWS (35mm)
                  </button>
                </div>
              </div>
            </div>

            {/* Pneumatic Flow Telemetry Note */}
            <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono-tech text-cyan-300 flex items-center justify-between">
              <span>AIR FLOW: 620 L/MIN</span>
              <span>PRESSURE: 6.0 BAR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
