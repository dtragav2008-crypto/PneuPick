import React from 'react';
import { ArrowRight, Play, ShieldAlert, Cpu, Activity, Compass, ChevronDown } from 'lucide-react';
import { PneuPickScene } from '../three/PneuPickScene';
import { sound } from '../../utils/audio';

export function Hero({ onRunAutoDemo, isAutoDemo, robotState }) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#05070B] tech-grid">
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 py-6">
        {/* Left Column: Technical Narrative & Call-to-Actions */}
        <div className="w-full lg:w-1/2 space-y-6 text-left">
          {/* Institutional Department Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono-tech text-cyan-300 shadow-lg shadow-cyan-950/40">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>SRM INSTITUTE OF SCIENCE AND TECHNOLOGY • TEAM 7</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight text-white uppercase leading-[1.08]">
            AUTONOMOUS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              3-AXIS PNEUMATIC
            </span> <br />
            ASRS ROBOT
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
            PneuPick delivers high-speed, modular material retrieval using 
            <strong className="text-white font-medium"> 100% pneumatic linear actuation</strong>. 
            Powered by an ESP32 central unit, 5/3 & 5/2 directional control valves, 
            and dual-profile jaws capable of grasping both 60 mm cubes and spherical objects without spark hazards.
          </p>

          {/* Key Engineering Specification Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 max-w-lg">
            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-left">
              <span className="text-[10px] font-mono-tech text-cyan-400 block uppercase">Y-Axis Stroke</span>
              <span className="text-lg font-heading font-bold text-white">600 mm</span>
              <span className="text-[10px] text-slate-400 block">5/3 Valve Hold</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-left">
              <span className="text-[10px] font-mono-tech text-orange-400 block uppercase">X-Axis Span</span>
              <span className="text-lg font-heading font-bold text-white">200 mm</span>
              <span className="text-[10px] text-slate-400 block">Dual Cylinders</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-left">
              <span className="text-[10px] font-mono-tech text-emerald-400 block uppercase">Z-Axis Reach</span>
              <span className="text-lg font-heading font-bold text-white">100 mm</span>
              <span className="text-[10px] text-slate-400 block">Shelf Penetration</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-left">
              <span className="text-[10px] font-mono-tech text-amber-400 block uppercase">Safety Rating</span>
              <span className="text-lg font-heading font-bold text-white">SPARK-FREE</span>
              <span className="text-[10px] text-slate-400 block">Zero Servo Heat</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => {
                onRunAutoDemo();
                sound.playPneumaticExhaust(0.4, 2800);
              }}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-mono-tech text-sm font-bold uppercase tracking-wider transition-all shadow-xl ${
                isAutoDemo
                  ? 'bg-amber-400 text-black shadow-amber-400/40 animate-pulse'
                  : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-cyan-500/30 hover:scale-[1.02]'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isAutoDemo ? 'Running Auto Sequence' : 'Test Auto Cycle'}</span>
            </button>

            <a
              href="#simulator"
              onClick={() => sound.playBeep(880, 0.05)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-mono-tech text-sm text-slate-200 bg-slate-900/80 border border-slate-700 hover:border-cyan-500/50 hover:text-white transition-all hover:bg-slate-800/80"
            >
              <span>Interactive 3D Sandbox</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive 3D Centerpiece Viewport */}
        <div className="w-full lg:w-1/2 h-[420px] sm:h-[500px] lg:h-[560px] relative rounded-2xl overflow-hidden glass-panel-cyan p-1 group">
          {/* Top Telemetry Header inside 3D container */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 text-xs font-mono-tech text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE 3D GANTRY SIMULATOR</span>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono-tech text-slate-300">
              PAYLOAD: <span className="text-cyan-400 font-bold uppercase">{robotState.payloadType}</span>
            </div>
          </div>

          {/* Interactive 3D Canvas */}
          <div className="w-full h-full">
            <PneuPickScene
              xPos={robotState.xPos}
              yPos={robotState.yPos}
              zPos={robotState.zPos}
              gripperOpen={robotState.gripperOpen}
              payloadType={robotState.payloadType}
              hasPayload={robotState.hasPayload}
              valveActive={robotState.valveActive}
              cameraPosition={[3.4, 2.2, 4.0]}
            />
          </div>

          {/* Floating Bottom Telemetry Indicators */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-2 text-[11px] font-mono-tech">
            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-slate-800 text-slate-400">
              PRESSURE: <span className="text-emerald-400 font-semibold">{robotState.pressure} BAR</span>
            </span>
            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-slate-800 text-slate-400">
              X: <span className="text-cyan-400">{(robotState.xPos * 200).toFixed(0)}mm</span> | 
              Y: <span className="text-cyan-400">{(robotState.yPos * 600).toFixed(0)}mm</span> | 
              Z: <span className="text-cyan-400">{(robotState.zPos * 100).toFixed(0)}mm</span>
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Down Anchor */}
      <div className="w-full flex justify-center pt-4 z-10">
        <a 
          href="#overview"
          onClick={() => sound.playBeep(700, 0.05)}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <span className="text-[10px] font-mono-tech tracking-widest uppercase">EXPLORE SYSTEM</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
