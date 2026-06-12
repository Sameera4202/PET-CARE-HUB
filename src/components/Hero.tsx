import React from 'react';
import { Sparkles, Calendar, ArrowRight, Play, Heart, Star, Award } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onBookClick: () => void;
}

export default function Hero({ onShopClick, onBookClick }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-32">
      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#4FC3F7]/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FF80AB]/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#BA68C8]/20 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '10s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF59D]/80 border border-yellow-300 text-yellow-800 text-[11px] font-bold uppercase tracking-wider shadow-sm animate-bounce">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Summer Paw-ty Sale: Use PARADISE20 for 20% Off!</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 leading-[1.1] tracking-tight">
              Everything Your Pet <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4FC3F7] via-[#BA68C8] to-[#FF80AB]">
                Needs in One Place
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-lg leading-relaxed">
              Indulge your beloved companions with award-winning premium nutrition, designer-tier accessories, and relaxing salon-grade spa grooming experiences crafted with unconditional love.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
              <button
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-2 bg-[#4FC3F7] hover:bg-[#29B6F6] text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-[#4FC3F7]/40 hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Shop Premium Raw</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2 bg-white/70 hover:bg-white text-slate-800 border border-slate-200 font-bold py-4 px-8 rounded-2xl shadow-sm transition-all hover:shadow hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#BA68C8]" />
                <span>Book Grooming Spa</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 mt-4 border-t border-slate-200/50 w-full max-w-md">
              <div>
                <span className="block text-2xl font-extrabold text-slate-800">15k+</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Happy Pets</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-slate-800">4.9★</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Reviews Rating</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-slate-800">100%</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Pet Safe Certified</span>
              </div>
            </div>

          </div>

          {/* Hero Right Media (Happy Pet Montage & Floating shapes) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96">
              
              {/* Outer glowing frames */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF80AB]/30 via-[#BA68C8]/30 to-[#4FC3F7]/30 blur-xl animate-pulse"></div>
              
              {/* Central Pet Image Container */}
              <div className="relative w-full h-full rounded-full border-8 border-white bg-slate-100 shadow-2xl overflow-hidden flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80" 
                  alt="Happy Dog" 
                  className="w-full h-full object-cover select-none"
                />
              </div>

              {/* Float Badge 1 (Cat lover) */}
              <div className="absolute -top-3 -left-3 glass-card rounded-2xl p-3 flex items-center gap-2.5 shadow-lg animate-float-paw border border-white">
                <div className="w-9 h-9 rounded-full bg-[#FF80AB]/15 flex items-center justify-center text-lg">🐱</div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500">Kitten Approved</div>
                  <div className="text-xs font-extrabold text-slate-800">100% Real Salmon</div>
                </div>
              </div>

              {/* Float Badge 2 (Grooming award) */}
              <div className="absolute bottom-6 -right-6 glass-card rounded-2xl p-3.5 flex items-center gap-3 shadow-xl border border-white" style={{ animationDelay: '1.5s' }}>
                <div className="w-10 h-10 rounded-full bg-[#FFF59D] flex items-center justify-center text-amber-600">
                  <Award className="w-5.5 h-5.5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500">Spa Style</div>
                  <div className="text-xs font-extrabold text-[#BA68C8]">Best Salon 2026</div>
                </div>
              </div>

              {/* Floating Paw animations around */}
              <div className="absolute top-1/4 right-[5%] text-3xl animate-bounce" style={{ animationDuration: '4s' }}>🐾</div>
              <div className="absolute bottom-1/4 left-[5%] text-2xl animate-bounce" style={{ animationDuration: '3s' }}>✨</div>
              <div className="absolute bottom-[5%] right-1/3 text-3xl animate-bounce" style={{ animationDuration: '5s' }}>🐠</div>
              <div className="absolute top-[8%] right-1/2 text-2xl animate-bounce" style={{ animationDuration: '3.5s' }}>🦜</div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
