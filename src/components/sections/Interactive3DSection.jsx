import React, { useState, useEffect } from 'react';
import { PneuPickScene } from '../three/PneuPickScene';
import { sound } from '../../utils/audio';
import { 
  Play, RotateCcw, Box, CircleDot, Gauge, Terminal, 
  Layers, Move, Sliders, ChevronRight, CheckCircle2, AlertCircle 
} from 'lucide-react';

export function Interactive3DSection({ 
  robotState, 
  setRobotState, 
  onRunAutoDemo, 
  isAutoDemo 
}) {
  const [activeSlot, setActiveSlot] = useState(null);
  const [consoleLogs, setConsoleLogs] = useState([
    "[ESP32:INIT] Core 0 & Core 1 Clock: 240 MHz - OK",
    "[PNEU:MANIFOLD] 5/3 DCV + 3x 5/2 DCVs Driver Board Linked",
    "[BT:SPP] HC-05 / BLE Serial Channel Listening on Port 1",
    "[ASRS:HOMING] Baseline Calibration Complete: (X:0, Y:0, Z:0)",
    "[STATUS] Ready for Manual or Matrix Coordinate Dispatch"
  ]);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setConsoleLogs(prev => [...prev.slice(-8), `[${time}] ${msg}`]);
  };

  // Matrix coordinates for 6 shelf compartments:
  // Slots:
  // 0: Tier 1 Left  (Y: 0.15, X: 0.25)
  // 1: Tier 1 Right (Y: 0.15, X: 0.75)
  // 2: Tier 2 Left  (Y: 0.50, X: 0.25)
  // 3: Tier 2 Right (Y: 0.50, X: 0.75)
  // 4: Tier 3 Left  (Y: 0.85, X: 0.25)
  // 5: Tier 3 Right (Y: 0.85, X: 0.75)
  const shelfSlots = [
    { id: 0, tier: 1, pos: 'Left', label: 'T1-L', x: 0.25, y: 0.15, payload: 'cube' },
    { id: 1, tier: 1, pos: 'Right', label: 'T1-R', x: 0.75, y: 0.15, payload: 'ball' },
    { id: 2, tier: 2, pos: 'Left', label: 'T2-L', x: 0.25, y: 0.50, payload: 'cube' },
    { id: 3, tier: 2, pos: 'Right', label: 'T2-R', x: 0.75, y: 0.50, payload: 'ball' },
    { id: 4, tier: 3, pos: 'Left', label: 'T3-L', x: 0.25, y: 0.85, payload: 'cube' },
    { id: 5, tier: 3, pos: 'Right', label: 'T3-R', x: 0.75, y: 0.85, payload: 'ball' },
  ];

  const handleSelectSlot = (slot) => {
    if (isAutoDemo) return;
    setActiveSlot(slot.id);
    addLog(`CMD: DISPATCH TO ${slot.label} (X: ${(slot.x * 200).toFixed(0)}mm, Y: ${(slot.y * 600).toFixed(0)}mm)`);
    sound.playPneumaticExhaust(0.3, 2400);
    sound.playSolenoidClick();

    // Sequence to slot
    setRobotState(prev => ({
      ...prev,
      xPos: slot.x,
      yPos: slot.y,
      zPos: 0.0,
      gripperOpen: true,
      valveActive: true,
      payloadType: slot.payload
    }));

    setTimeout(() => {
      // Extend Z into shelf
      addLog(`[PNEU:Z-AXIS] 5/2 DCV EXTEND -> +100mm SHELF ENTRY`);
      sound.playPneumaticExhaust(0.25, 2800);
      setRobotState(prev => ({ ...prev, zPos: 0.9, valveActive: false }));

      setTimeout(() => {
        // Clamp jaws
        addLog(`[JAW:GRIPPER] CLAMP ENGAGED -> SECURED ${slot.payload.toUpperCase()}`);
        sound.playSolenoidClick();
        setRobotState(prev => ({ ...prev, gripperOpen: false, hasPayload: true, valveActive: true }));

        setTimeout(() => {
          // Retract Z with payload
          addLog(`[PNEU:Z-AXIS] RETRACT TO CORRIDOR WITH RETRIEVED ITEM`);
          sound.playPneumaticExhaust(0.35, 2000);
          setRobotState(prev => ({ ...prev, zPos: 0.0, valveActive: false }));
        }, 600);
      }, 700);
    }, 800);
  };

  const handleResetHome = () => {
    addLog("[CMD:RESET] RETURNING TO HOMING BASELINE");
    sound.playPneumaticExhaust(0.4, 2000);
    sound.playSolenoidClick();
    setActiveSlot(null);
    setRobotState({
      xPos: 0.5,
      yPos: 0.1,
      zPos: 0.0,
      gripperOpen: true,
      hasPayload: false,
      payloadType: 'cube',
      pressure: 6.2,
      valveActive: false
    });
  };

  const toggleGripper = () => {
    const nextState = !robotState.gripperOpen;
    sound.playSolenoidClick();
    sound.playPneumaticExhaust(0.2, nextState ? 2800 : 1900);
    addLog(`[MANUAL:JAW] ${nextState ? 'RELEASED (35mm)' : 'CLAMPED (45 N)'}`);
    setRobotState(prev => ({
      ...prev,
      gripperOpen: nextState,
      hasPayload: nextState ? false : prev.hasPayload,
      valveActive: true
    }));
    setTimeout(() => {
      setRobotState(prev => ({ ...prev, valveActive: false }));
    }, 200);
  };

  const togglePayloadType = (type) => {
    sound.playBeep(850, 0.04);
    addLog(`[PAYLOAD:SELECT] ACTIVE TYPE: ${type.toUpperCase()}`);
    setRobotState(prev => ({
      ...prev,
      payloadType: type,
      hasPayload: true
    }));
  };

  return (
    <section id="simulator" className="py-24 bg-[#04060A] relative overflow-hidden border-t border-slate-800">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono-tech text-cyan-300 mb-3">
              <Sliders className="w-3.5 h-3.5" />
              <span>VIRTUAL HARDWARE TESTBED</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
              INTERACTIVE 3D GANTRY SANDBOX
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2">
              Directly actuate PneuPick's 3-axis pneumatic cylinders, command shelf matrix dispatches, 
              toggle jaw clamping force, and monitor live ESP32 serial telemetry in real time.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetHome}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-mono-tech text-slate-300 hover:text-white transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>HOMING RESET</span>
            </button>
            <button
              onClick={() => {
                onRunAutoDemo();
                addLog("[AUTO] AUTONOMOUS ASRS RETRIEVAL SEQUENCE TRIGGERED");
                sound.playPneumaticExhaust(0.4, 2600);
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider transition-all shadow-lg ${
                isAutoDemo
                  ? 'bg-amber-400 text-black shadow-amber-400/30 animate-pulse'
                  : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-cyan-500/30'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isAutoDemo ? 'ABORT AUTO DEMO' : 'RUN AUTO DEMO'}</span>
            </button>
          </div>
        </div>

        {/* Master Sandbox Grid: 3D Scene + Control Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main 3D Viewport (8 Columns) */}
          <div className="lg:col-span-8 h-[520px] sm:h-[620px] rounded-2xl glass-panel-cyan p-1 relative overflow-hidden group">
            {/* Overlay Telemetry HUD */}
            <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
              <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-cyan-500/30 text-xs font-mono-tech text-cyan-300">
                LINE: {robotState.pressure} BAR ({ (robotState.pressure * 14.5).toFixed(0) } PSI)
              </span>
              <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800 text-xs font-mono-tech text-slate-300">
                VALVE BUS: {robotState.valveActive ? 'SOLENOID FIRING' : 'IDLE / HOLD'}
              </span>
            </div>

            {/* Canvas Scene */}
            <div className="w-full h-full">
              <PneuPickScene
                xPos={robotState.xPos}
                yPos={robotState.yPos}
                zPos={robotState.zPos}
                gripperOpen={robotState.gripperOpen}
                payloadType={robotState.payloadType}
                hasPayload={robotState.hasPayload}
                valveActive={robotState.valveActive}
                cameraPosition={[3.6, 2.4, 3.8]}
              />
            </div>

            {/* Bottom Shelf Selector Bar inside viewport */}
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-300">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="font-bold">SHELF MATRIX SELECT:</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5 w-full sm:w-auto">
                {shelfSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleSelectSlot(slot)}
                    className={`px-2.5 py-1.5 rounded text-xs font-mono-tech font-bold transition-all ${
                      activeSlot === slot.id
                        ? 'bg-cyan-400 text-black shadow-md shadow-cyan-400/30'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Control & Diagnostics Console (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-4 text-left">
            {/* Manual Axis Sliders Panel */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono-tech font-bold text-white uppercase flex items-center gap-1.5">
                  <Move className="w-4 h-4 text-cyan-400" />
                  MANUAL GANTRY ACTUATION
                </span>
                <span className="text-[10px] font-mono-tech text-slate-400">
                  REAL-TIME OVERRIDE
                </span>
              </div>

              {/* X-Axis Horizontal Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono-tech">
                  <span className="text-slate-300">X-Axis Span (Dual 200mm):</span>
                  <span className="text-orange-400 font-bold">{(robotState.xPos * 200).toFixed(0)} mm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  disabled={isAutoDemo}
                  value={robotState.xPos}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setRobotState(prev => ({ ...prev, xPos: val }));
                  }}
                  className="w-full accent-orange-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Y-Axis Vertical Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono-tech">
                  <span className="text-slate-300">Y-Axis Height (600mm / 5/3 DCV):</span>
                  <span className="text-cyan-400 font-bold">{(robotState.yPos * 600).toFixed(0)} mm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  disabled={isAutoDemo}
                  value={robotState.yPos}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setRobotState(prev => ({ ...prev, yPos: val }));
                  }}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Z-Axis Depth Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono-tech">
                  <span className="text-slate-300">Z-Axis Shelf Reach (100mm):</span>
                  <span className="text-emerald-400 font-bold">{(robotState.zPos * 100).toFixed(0)} mm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  disabled={isAutoDemo}
                  value={robotState.zPos}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setRobotState(prev => ({ ...prev, zPos: val }));
                  }}
                  className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Gripper Clamp & Payload Controls */}
              <div className="pt-2 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tech text-slate-300">PNEUMATIC JAW STATE:</span>
                  <button
                    onClick={toggleGripper}
                    disabled={isAutoDemo}
                    className={`px-3 py-1 rounded text-xs font-mono-tech font-bold transition-all ${
                      robotState.gripperOpen
                        ? 'bg-slate-800 text-slate-300 border border-slate-700'
                        : 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                    }`}
                  >
                    {robotState.gripperOpen ? 'RELEASED (OPEN)' : 'CLAMPED (LOCKED)'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tech text-slate-300">PAYLOAD CONTOUR:</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => togglePayloadType('cube')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono-tech ${
                        robotState.payloadType === 'cube'
                          ? 'bg-cyan-500 text-black font-bold'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      <Box className="w-3 h-3" />
                      <span>60mm CUBE</span>
                    </button>
                    <button
                      onClick={() => togglePayloadType('ball')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono-tech ${
                        robotState.payloadType === 'ball'
                          ? 'bg-lime-400 text-black font-bold'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      <CircleDot className="w-3 h-3" />
                      <span>BALL</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ESP32 Real-Time Streaming Serial Console */}
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-mono-tech text-cyan-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="font-bold">ESP32 SERIAL TELEMETRY</span>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-mono-tech text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  115200 BAUD
                </span>
              </div>

              <div className="flex-1 bg-black/60 rounded-lg p-2.5 font-mono-tech text-[11px] text-slate-400 space-y-1 overflow-y-auto max-h-48 border border-slate-900">
                {consoleLogs.map((log, i) => (
                  <div key={i} className="leading-snug">
                    <span className="text-cyan-500/80 mr-1">&gt;</span>
                    <span className={log.includes('CLAMP') || log.includes('DISPATCH') ? 'text-cyan-300 font-bold' : ''}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
