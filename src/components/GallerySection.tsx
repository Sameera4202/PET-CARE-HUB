import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { ZoomIn, X, Image as ImageIcon, Camera } from 'lucide-react';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Dogs' | 'Cats' | 'Birds' | 'Fish' | 'Grooming' | 'Happy Families'>('all');
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

  const categories = ['all', 'Dogs', 'Cats', 'Birds', 'Fish', 'Grooming', 'Happy Families'] as const;

  const filteredItems = GALLERY_ITEMS.filter(
    item => selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <section className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF80AB] bg-[#FF80AB]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            📸 Snapshots of Bliss
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Our Happy Pets Gallery
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-3">
            A beautiful glimpse into raw, adorable, tail-wagging happiness. Explore our grooming glowups and happy family moments.
          </p>
        </div>

        {/* Filter Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 hover:scale-[1.02] text-xs font-bold rounded-full transition-all capitalize ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#FF80AB] to-[#BA68C8] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'View All Snaps' : cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => setActiveImageIdx(idx)}
              className="relative group rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-white"
            >
              {/* Aspect box ratio */}
              <div className="h-64 sm:h-72 w-full overflow-hidden">
                <img 
                  src={item.url} 
                  alt={item.caption} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Hover overlay details */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] uppercase font-bold text-[#FF80AB] tracking-widest bg-white/10 px-2 py-0.5 rounded-full inline-block backdrop-blur-sm self-start mb-2">
                  {item.category}
                </span>
                <p className="text-white text-xs font-semibold leading-relaxed mb-4">
                  {item.caption}
                </p>
                <div className="flex items-center gap-2 text-white/85 text-xs font-bold uppercase tracking-wider">
                  <ZoomIn className="w-4 h-4 text-[#FFF59D]" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zoom Lightbox Modal overlay */}
        {activeImageIdx !== null && (
          <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-sm">
            <button 
              onClick={() => setActiveImageIdx(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full flex flex-col items-center">
              <div className="bg-slate-900 rounded-3xl overflow-hidden p-2 shadow-2xl relative">
                <img 
                  src={filteredItems[activeImageIdx].url} 
                  alt={filteredItems[activeImageIdx].caption} 
                  className="max-h-[70vh] max-w-full rounded-2xl object-contain"
                />
              </div>
              <div className="text-center mt-4 text-white">
                <span className="text-[10px] uppercase font-bold text-[#FF80AB] tracking-widest">
                  {filteredItems[activeImageIdx].category}
                </span>
                <p className="text-sm font-semibold mt-1">
                  {filteredItems[activeImageIdx].caption}
                </p>
              </div>

              {/* Next & Previous navigation buttons inside overlay */}
              <div className="flex gap-4 mt-6">
                <button
                  disabled={activeImageIdx === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIdx(prev => prev !== null ? prev - 1 : null);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white font-bold text-xs"
                >
                  ← First
                </button>
                <button
                  disabled={activeImageIdx === filteredItems.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIdx(prev => prev !== null ? prev + 1 : null);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white font-bold text-xs"
                >
                  Next →
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
