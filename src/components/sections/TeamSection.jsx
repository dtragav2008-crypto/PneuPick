import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../../data/projectData';
import { sound } from '../../utils/audio';
import { Users, ExternalLink, Award } from 'lucide-react';

export function TeamSection() {
  const [selectedDept, setSelectedDept] = useState('ALL');

  const departments = ['ALL', 'SIESED', 'SPACED', 'SAMBED', 'MCSOCD'];

  const filteredMembers = selectedDept === 'ALL'
    ? TEAM_MEMBERS
    : TEAM_MEMBERS.filter(m => m.department === selectedDept);

  return (
    <section id="team" className="py-24 bg-[#05070B] relative overflow-hidden border-t border-slate-800">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono-tech text-cyan-300 mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>ENGINEERING DOSSIER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
            TEAM 7 — SRMIST ENGINEERS
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            The multidisciplinary engineering student collective behind PneuPick at SRM Institute of Science and Technology. 
            Combining mechanical kinematics, pneumatic fluid circuitry, embedded ESP32 programming, and sensor telemetry.
          </p>
        </div>

        {/* Department Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => {
                setSelectedDept(dept);
                sound.playBeep(880, 0.03);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-tech transition-all uppercase tracking-wider ${
                selectedDept === dept
                  ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {dept === 'ALL' ? 'ALL MEMBERS (9)' : dept}
            </button>
          ))}
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between text-left group hover:-translate-y-1 shadow-lg"
            >
              <div className="flex items-start gap-4">
                {/* Member Portrait */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-700 group-hover:border-cyan-400 transition-colors bg-slate-900 shadow-md">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Identity & Department */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 uppercase font-bold">
                      {member.department}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white truncate group-hover:text-cyan-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono-tech text-slate-400 mt-1 line-clamp-2">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {member.institution}
                  </p>
                </div>
              </div>

              {/* LinkedIn Connect Footer */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono-tech text-slate-500">
                  VERIFIED PROFILE
                </span>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playBeep(980, 0.04)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 px-3 py-1.5 rounded-lg border border-cyan-500/30 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.54a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z"/>
                  </svg>
                  <span>LINKEDIN</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
