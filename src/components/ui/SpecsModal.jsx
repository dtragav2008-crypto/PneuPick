import React from 'react';
import { TECHNICAL_SPECS, PROJECT_INFO } from '../../data/projectData';
import { sound } from '../../utils/audio';
import { X, FileText, CheckCircle2, Download, ShieldCheck } from 'lucide-react';

export function SpecsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="max-w-3xl w-full max-h-[88vh] bg-[#070b14] border border-cyan-500/30 rounded-2xl flex flex-col shadow-2xl relative overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-black/40">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono-tech px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase">
                ENGINEERING SPEC SHEET
              </span>
              <span className="text-xs font-mono-tech text-slate-400">
                TEAM 7 • SRMIST
              </span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-white">
              {PROJECT_INFO.name} Technical Specifications
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playBeep(700, 0.04);
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs sm:text-sm text-slate-300 leading-relaxed">
            All parameters derived directly from the certified engineering documentation for the 
            PneuPick compact autonomous 3-axis pneumatic material handling gantry robot.
          </div>

          <div className="rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <tbody className="divide-y divide-slate-800">
                {TECHNICAL_SPECS.map((spec, i) => (
                  <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 font-mono-tech text-slate-400 w-2/5">
                      {spec.label}
                    </td>
                    <td className="py-3 px-4 font-medium text-white">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-black/60 flex items-center justify-between">
          <span className="text-xs font-mono-tech text-slate-500">
            STATUS: CERTIFIED SPECIFICATION
          </span>
          <button
            onClick={() => {
              sound.playBeep(980, 0.05);
              window.print();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono-tech transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>PRINT / EXPORT DATA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
