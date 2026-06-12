import React from 'react';
import { Search, Heart, ShoppingCart, User, PawPrint, Bell } from 'lucide-react';
import { CartItem, Product } from '../types';

interface HeaderProps {
  cart: CartItem[];
  wishlist: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenProfile: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({
  cart,
  wishlist,
  onOpenCart,
  onOpenWishlist,
  onOpenProfile,
  searchQuery,
  setSearchQuery,
  activeSection,
  setActiveSection
}: HeaderProps) {
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'pet-food-sec' },
    { name: 'Grooming Services', id: 'grooming-sec' },
    { name: 'About Us', id: 'about-sec' },
    { name: 'Contact Us', id: 'contact-sec' }
  ];

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // Find offset
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-1.5 cursor-pointer group flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 group-hover:scale-105 transition-all">
              <PawPrint className="w-4.5 h-4.5" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-slate-800">
              PetCare <span className="text-violet-600">Hub</span>
            </span>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-[13px] font-bold transition-all relative py-1 ${
                  activeSection === link.id
                    ? 'text-violet-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-violet-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Search, Cart, Profile */}
          <div className="flex items-center gap-2.5">
            
            {/* Profile */}
            <button 
              onClick={onOpenProfile}
              className="p-2 rounded-full hover:bg-slate-50 text-slate-500 transition-all border border-transparent hover:border-slate-100"
              title="Profile"
            >
              <User className="w-4.5 h-4.5" />
            </button>

            {/* Shopping Cart */}
            <button 
              onClick={onOpenCart}
              className="p-2 rounded-full hover:bg-slate-50 text-slate-500 transition-all border border-transparent hover:border-slate-100 relative"
              title="Your Cart"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              <span className="absolute top-0.5 right-0.5 bg-violet-600 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {totalCartItems > 0 ? totalCartItems : 2}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
