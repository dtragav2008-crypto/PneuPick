import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../../data/projectData';
import { sound } from '../../utils/audio';
import { Image as ImageIcon, ZoomIn, X, ChevronLeft, ChevronRight, Wrench } from 'lucide-react';

export function ProjectGallery() {
  const [activeModalItem, setActiveModalItem] = useState(null);

  const openLightbox = (item) => {
    setActiveModalItem(item);
    sound.playBeep(920, 0.04);
  };

  const closeLightbox = () => {
    setActiveModalItem(null);
    sound.playBeep(720, 0.04);
  };

  return (
    <section id="gallery" className="py-24 bg-[#070B14] relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono-tech text-cyan-300 mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>FABRICATION & PROTOTYPING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
            PROJECT SHOWCASE & WORKSHOP ARCHIVE
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Authentic documentation of Team 7's hands-on engineering journey at SRM Institute of Science and Technology. 
            From precision frame machining to ESP32 firmware development and pneumatic subsystem integration.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all duration-300 flex flex-col text-left hover:-translate-y-1.5 shadow-xl"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent opacity-80" />
                
                {/* Hover Zoom Badge */}
                <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 backdrop-blur-md border border-cyan-500/30 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 uppercase">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Caption and Information */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
                  <span>SRMIST ENGINEERING</span>
                  <span className="text-cyan-400 group-hover:underline">EXPAND VIEW &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div 
            className="max-w-4xl w-full bg-[#0a0f1d] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-black/70 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Full Image */}
            <div className="w-full max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-auto max-h-[65vh] object-contain"
              />
            </div>

            {/* Modal Info Footer */}
            <div className="p-6 text-left space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-tech px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase">
                  {activeModalItem.category}
                </span>
                <span className="text-xs font-mono-tech text-slate-400">
                  SRM INSTITUTE OF SCIENCE AND TECHNOLOGY
                </span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">
                {activeModalItem.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {activeModalItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
