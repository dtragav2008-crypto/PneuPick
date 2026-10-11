import React, { useState } from 'react';
import { WORKFLOW_STEPS } from '../../data/projectData';
import { sound } from '../../utils/audio';
import { Workflow, ArrowRight, CheckCircle2, ChevronRight, Play } from 'lucide-react';

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="workflow" className="py-24 bg-[#070B14] relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono-tech text-cyan-300 mb-3">
            <Workflow className="w-3.5 h-3.5" />
            <span>OPERATIONAL PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
            AUTONOMOUS RETRIEVAL CYCLE
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            From operator coordinate entry on the 4×4 keypad or Bluetooth mobile app to 
            closed-center pneumatic locking and jaw extraction, explore the 5-step automated workflow.
          </p>
        </div>

        {/* 5-Step Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.step}
                onClick={() => {
                  setActiveStep(idx);
                  sound.playBeep(800 + idx * 80, 0.04);
                }}
                className={`p-5 rounded-2xl cursor-pointer text-left transition-all relative border ${
                  isActive
                    ? 'glass-panel-cyan border-cyan-400 shadow-xl shadow-cyan-950/40 -translate-y-1'
                    : 'glass-panel border-slate-800/80 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-mono-tech font-black ${
                    isActive ? 'text-cyan-400' : 'text-slate-600'
                  }`}>
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-black/40 border border-slate-800 text-slate-300">
                    {step.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-white text-base mb-1">
                  {step.title}
                </h3>
                <span className="text-xs font-mono-tech text-cyan-400/80 block mb-2">
                  {step.subtitle}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>

                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-400 rotate-45 hidden md:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Stage Breakdown Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono-tech text-cyan-400 uppercase tracking-widest">
              STAGE {WORKFLOW_STEPS[activeStep].step} EXECUTION LOGIC
            </span>
            <h4 className="text-2xl font-heading font-bold text-white">
              {WORKFLOW_STEPS[activeStep].title} — {WORKFLOW_STEPS[activeStep].subtitle}
            </h4>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              {WORKFLOW_STEPS[activeStep].description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveStep((prev) => (prev > 0 ? prev - 1 : WORKFLOW_STEPS.length - 1));
                sound.playBeep(750, 0.03);
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono-tech text-slate-300 hover:text-white"
            >
              PREVIOUS
            </button>
            <button
              onClick={() => {
                setActiveStep((prev) => (prev < WORKFLOW_STEPS.length - 1 ? prev + 1 : 0));
                sound.playBeep(850, 0.03);
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs font-mono-tech hover:bg-cyan-400"
            >
              NEXT STAGE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
