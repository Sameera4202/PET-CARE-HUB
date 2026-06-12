import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import PetBuddyAI from './components/PetBuddyAI';
import { ALL_PRODUCTS, PET_FOODS, PET_ACCESSORIES, GROOMING_STYLES, GroomingStyle } from './data';
import { Product, CartItem, GroomingBooking } from './types';
import { Heart, Search, Eye, ShoppingCart, Check, Star, Mail, Phone, MapPin, Sparkles, X, Gift, Smile, Award, CheckCircle, PawPrint, Calendar, Scissors, HelpCircle } from 'lucide-react';

export default function App() {
  // Navigation active state
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Wishlist storage sync
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('pet_paradise_cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    // Seed default cart items to match reference image drawer badge "2" immediately out of the box!
    return [
      { product: PET_FOODS[0], quantity: 1 },
      { product: PET_ACCESSORIES[0], quantity: 1 }
    ];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pet_paradise_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  const [bookings, setBookings] = useState<GroomingBooking[]>(() => {
    const saved = localStorage.getItem('pet_paradise_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  // UI state toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [bookingGroomingStyle, setBookingGroomingStyle] = useState<GroomingStyle | null>(null);

  // Booking fields
  const [bookingForm, setBookingForm] = useState({
    petName: '',
    petBreed: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    date: '',
    timeSlot: '10:00 AM'
  });

  // User Profile
  const [petProfile, setPetProfile] = useState(() => {
    const saved = localStorage.getItem('pet_paradise_profile2');
    return saved ? JSON.parse(saved) : {
      petName: 'Rocky',
      petType: 'Dog',
      petBreed: 'Golden Retriever',
      petAge: '2 Years',
      favoriteToy: 'Comfort Memory Rest 💤',
      avatarIdx: 0,
      loyaltyPoints: 340
    };
  });

  // Dynamic toasts queue
  const [toasts, setToasts] = useState<{ id: string; text: string; type: 'success' | 'info' }[]>([]);

  // Local contact state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('pet_paradise_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('pet_paradise_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('pet_paradise_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('pet_paradise_profile2', JSON.stringify(petProfile));
  }, [petProfile]);

  // Notifications handler callbacks
  const handleAddToast = (text: string, type: 'success' | 'info' = 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Cart operations updates
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    handleAddToast(`Added ${product.name} to your Basket! 🐾`, 'success');
  };

  const handleUpdateCartQty = (pId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === pId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const handleRemoveFromCart = (pId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== pId));
    handleAddToast("Item removed from your basket.", 'info');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist toggle operations
  const handleToggleWishlist = (product: Product) => {
    const isWished = wishlist.some(item => item.id === product.id);
    if (isWished) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      handleAddToast(`Removed ${product.name} from Wishlist.`, 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      handleAddToast(`Saved ${product.name} to Wishlist! ❤️`, 'success');
    }
  };

  // Profile save
  const handleProfileSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setPetProfile(prev => ({
      ...prev,
      petName: data.get('petName') as string || prev.petName,
      petType: data.get('petType') as string || prev.petType,
      petBreed: data.get('petBreed') as string || prev.petBreed,
      petAge: data.get('petAge') as string || prev.petAge,
      favoriteToy: data.get('favoriteToy') as string || prev.favoriteToy,
      avatarIdx: Number(data.get('avatarIdx')) || 0
    }));
    handleAddToast("Success! Your pet profile updated.", 'success');
    setIsProfileOpen(false);
  };

  // Booking submit helper
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingGroomingStyle) return;

    const newBooking: GroomingBooking = {
      id: `BOOK-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceId: bookingGroomingStyle.id,
      serviceName: bookingGroomingStyle.name,
      petName: bookingForm.petName,
      petType: 'dog',
      petBreed: bookingForm.petBreed,
      date: bookingForm.date || '2026-06-15',
      timeSlot: bookingForm.timeSlot,
      ownerName: bookingForm.ownerName,
      ownerEmail: bookingForm.ownerEmail,
      ownerPhone: bookingForm.ownerPhone,
      status: 'confirmed',
      price: bookingGroomingStyle.price
    };

    setBookings(prev => [newBooking, ...prev]);
    handleAddToast(`Successfully booked ${bookingGroomingStyle.name} Session for ${bookingForm.petName}! 🧼🛁`, 'success');
    setBookingGroomingStyle(null);
    setBookingForm({
      petName: '',
      petBreed: '',
      ownerName: '',
      ownerEmail: '',
      ownerPhone: '',
      date: '',
      timeSlot: '10:00 AM'
    });
  };

  // Contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    handleAddToast("Thank you! Our support hosts will reply within an hour.", 'success');
    setContactForm({ name: '', email: '', message: '' });
  };

  // Filter lists based on Search bar
  const filterBySearch = (list: Product[]) => {
    if (!searchQuery) return list;
    const query = searchQuery.toLowerCase();
    return list.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(query)))
    );
  };

  // Group food products by subcategory
  const dogFoodList = filterBySearch(PET_FOODS.filter(p => p.subcategory === 'Dog Food'));
  const catFoodList = filterBySearch(PET_FOODS.filter(p => p.subcategory === 'Cat Food'));
  const birdFoodList = filterBySearch(PET_FOODS.filter(p => p.subcategory === 'Bird Food'));
  const fishFoodList = filterBySearch(PET_FOODS.filter(p => p.subcategory === 'Fish Food'));
  const smallFoodList = filterBySearch(PET_FOODS.filter(p => p.subcategory === 'Small Pet Food'));

  // Accessories rows (divided to match reference grid composition)
  const accListRow1 = filterBySearch(PET_ACCESSORIES.slice(0, 6));
  const accListRow2 = filterBySearch(PET_ACCESSORIES.slice(6));

  const petAvatars = ['🐶', '🐱', 'parrot_avatar', 'fish_avatar', 'rabbit_avatar', 'hamster_avatar'];

  return (
    <div className="min-h-screen bg-[#F4F3F9] text-slate-800 flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* Dynamic Notifications Toasts panel */}
      <div className="fixed top-20 right-4 z-55 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`p-3.5 rounded-2xl border flex items-center gap-3 shadow-lg pointer-events-auto transition-all transform animate-bounce ${
              toast.type === 'success' 
                ? 'bg-emerald-500 text-white border-emerald-400' 
                : 'bg-white text-slate-800 border-slate-200'
            }`}
          >
            <span className="text-base select-none">
              {toast.type === 'success' ? '✨' : '🐾'}
            </span>
            <span className="text-xs font-black">{toast.text}</span>
          </div>
        ))}
      </div>

      {/* Header element */}
      <Header
        cart={cart}
        wishlist={wishlist}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {}}
        onOpenProfile={() => setIsProfileOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Centered Workspace viewport */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-8 flex-1 space-y-12" id="home">
        
        {/* Welcome Intro Banner (Aligns with User Request #2: everything your pet needs) */}
        <div className="bg-gradient-to-tr from-[#E6E6FA] via-violet-50 to-[#F0F2FE] rounded-[32px] p-6 md:p-8 border border-violet-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-3 max-w-xl md:text-left text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-violet-600 bg-violet-100/50 px-3 py-1 rounded-full inline-block">
              ⭐️ 5-Star Pet Haven
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight leading-tight">
              Everything Your Pet Needs in One Place
            </h1>
            <p className="text-xs text-slate-500 font-bold leading-relaxed">
              Explore professional hormone-free premium food selections, organic durable accessories, and beautiful custom styles with zero-anxiety treatments.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="hidden lg:flex w-24 h-24 bg-white/60 backdrop-blur-md rounded-2xl border border-white items-center justify-center flex-col shadow-xs">
              <span className="text-2xl">🐶</span>
              <span className="text-[10px] font-black text-slate-600 mt-1">Dogs</span>
            </div>
            <div className="hidden lg:flex w-24 h-24 bg-white/60 backdrop-blur-md rounded-2xl border border-white items-center justify-center flex-col shadow-xs">
              <span className="text-2xl">🐱</span>
              <span className="text-[10px] font-black text-slate-600 mt-1">Cats</span>
            </div>
            <div className="hidden lg:flex w-24 h-24 bg-white/60 backdrop-blur-md rounded-2xl border border-white items-center justify-center flex-col shadow-xs">
              <span className="text-2xl">🦜</span>
              <span className="text-[10px] font-black text-slate-600 mt-1">Birds</span>
            </div>
          </div>
        </div>

        {/* =======================================================
            SECTION 1: PET FOOD
           ======================================================= */}
        <section id="pet-food-sec" className="bg-[#FAF5FF] rounded-[40px] p-6 lg:p-10 border border-violet-100/60 shadow-sm relative">
          
          {/* Section banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-violet-50/50 rounded-[32px] p-6 md:p-8 select-none relative overflow-hidden mb-10 border border-violet-50 shadow-sm">
            
            {/* Left label description */}
            <div className="md:col-span-8 flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center text-xl shadow-md shrink-0">
                🐾
              </div>
              <div className="space-y-1.5 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-black text-violet-950 tracking-tight">Pet Food</h2>
                <p className="text-xs sm:text-sm font-semibold text-violet-700/80">
                  Nutritious and balanced food for every pet's health and happiness.
                </p>
              </div>
            </div>

            {/* Right generated asset portrait alignment */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="w-full max-w-[280px] h-32 rounded-2xl overflow-hidden shadow-md border-2 border-white relative">
                <img 
                  src="/src/assets/images/pet_food_banner_1781278899835.jpg" 
                  alt="Pet Food Banner Graphic" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1589924691106-07a2cdd51a37?w=500";
                  }}
                />
              </div>
            </div>

          </div>

          {/* Unified modern, responsive product grid for pet food */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2 select-none">Nutritional Premium Selections</h3>
            
            {(() => {
              const allFoodList = [
                ...dogFoodList,
                ...catFoodList,
                ...birdFoodList,
                ...fishFoodList,
                ...smallFoodList,
              ];

              if (allFoodList.length > 0) {
                return (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6" id="pet-food-grid">
                    {allFoodList.map(food => (
                      <div 
                        key={food.id}
                        id={`food-card-${food.id}`}
                        onClick={() => setQuickViewProduct(food)}
                        className="bg-white border border-slate-150 rounded-3xl p-3.5 shadow-xs hover:shadow-lg hover:border-violet-200 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between min-h-[250px] text-center cursor-pointer group relative overflow-hidden"
                      >
                        {/* Tiny subcategory badge on top left */}
                        <span className="absolute top-2.5 left-2.5 text-[9px] font-black text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-100 uppercase tracking-tight select-none">
                          {food.subcategory === 'Small Pet Food' ? '🐹 Small' : food.subcategory === 'Bird Food' ? '🦜 Bird' : food.subcategory === 'Fish Food' ? '🐠 Fish' : food.subcategory === 'Cat Food' ? '🐱 Cat' : '🐶 Dog'}
                        </span>

                        {/* Image box with premium feel */}
                        <div className="w-full aspect-square p-2 flex items-center justify-center relative bg-slate-50/50 rounded-2xl overflow-hidden border border-slate-100 mt-5 group-hover:bg-violet-50/30 transition-colors">
                          <img 
                            src={food.image} 
                            alt={food.name} 
                            id={`food-img-${food.id}`}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "https://images.unsplash.com/photo-1589924691106-07a2cdd51a37?w=500";
                            }}
                          />
                        </div>
                        
                        {/* Text and price metadata */}
                        <div className="mt-3 w-full flex flex-col items-center flex-1 justify-end">
                          <h4 className="text-xs font-black text-slate-800 leading-tight line-clamp-2 px-1">
                            {food.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-bold mt-1 line-clamp-1">
                            {food.tags?.[0] || 'Premium'} • {food.rating} ⭐
                          </p>
                          
                          {/* Pricing block */}
                          <div className="mt-2.5 pt-2 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 bg-slate-50/50 py-1.5 rounded-xl border border-dotted border-slate-100">
                            <span className="text-xs font-black text-violet-600">₹{food.price}</span>
                            <span className="text-[9px] text-slate-400 font-bold line-through">₹{(food.price * 1.2).toFixed(0)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              } else {
                return (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 max-w-md mx-auto space-y-2">
                    <span className="text-4xl select-none">🥣</span>
                    <h4 className="text-sm font-black text-slate-700">No matching pet food found</h4>
                    <p className="text-xs text-slate-400 font-semibold">Try modifying your search or clearing the query filters.</p>
                  </div>
                );
              }
            })()}
          </div>

        </section>

        {/* =======================================================
            SECTION 2: PET ACCESSORIES
           ======================================================= */}
        <section id="pet-accessories-sec" className="bg-[#FAFDFE] rounded-[40px] p-6 lg:p-10 border border-sky-100/60 shadow-sm relative">
          
          {/* Section banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-sky-50/45 rounded-[32px] p-6 md:p-8 select-none relative overflow-hidden mb-10 border border-sky-50 shadow-sm">
            
            {/* Left label description */}
            <div className="md:col-span-8 flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center text-xl shadow-md shrink-0">
                💎
              </div>
              <div className="space-y-1.5 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-black text-sky-950 tracking-tight">Pet Accessories</h2>
                <p className="text-xs sm:text-sm font-semibold text-sky-700/80">
                  High-quality essentials for a comfortable and happy pet life.
                </p>
              </div>
            </div>

            {/* Right generated asset portrait alignment */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="w-full max-w-[280px] h-32 rounded-2xl overflow-hidden shadow-md border-2 border-white relative">
                <img 
                  src="/src/assets/images/pet_accessories_banner_1781278921353.jpg" 
                  alt="Pet Accessories Banner Graphic" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?w=500";
                  }}
                />
              </div>
            </div>

          </div>

          {/* Divided grid representing two horizontal blocks */}
          <div className="space-y-8">
            
            {/* Accessories Row 1 (Collars, Leashes, Harnesses, Pet Carriers, Pet Beds, Pet Bowls) */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Primary Essentials</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {accListRow1.map(acc => (
                  <div 
                    key={acc.id}
                    onClick={() => setQuickViewProduct(acc)}
                    className="bg-white border border-slate-150 rounded-2xl p-2.5 shadow-xs hover:shadow-md transition-all flex flex-col items-center justify-between h-52 text-center cursor-pointer group"
                  >
                    <div className="w-24 h-24 p-1 flex items-center justify-center relative bg-slate-50/50 rounded-xl overflow-hidden border border-slate-100">
                      <img 
                        src={acc.image} 
                        alt={acc.name} 
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400";
                        }}
                      />
                    </div>
                    <h4 className="text-[11px] font-black text-slate-800 leading-tight mt-2 px-1">
                      {acc.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessories Row 2 (Feeding Stands, Cages, Aquariums, Terrariums, Litter Boxes, Grooming Brushes, Combs) */}
            {accListRow2.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Sensory & Habitat Care</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {accListRow2.map(acc => (
                    <div 
                      key={acc.id}
                      onClick={() => setQuickViewProduct(acc)}
                      className="bg-white border border-slate-150 rounded-2xl p-2.5 shadow-xs hover:shadow-md transition-all flex flex-col items-center justify-between h-52 text-center cursor-pointer group"
                    >
                      <div className="w-24 h-24 p-1 flex items-center justify-center relative bg-slate-50/50 rounded-xl overflow-hidden border border-slate-100">
                        <img 
                          src={acc.image} 
                          alt={acc.name} 
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400";
                          }}
                        />
                      </div>
                      <h4 className="text-[11px] font-black text-slate-800 leading-tight mt-2 px-1">
                        {acc.name}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </section>

        {/* =======================================================
            SECTION 3: PET GROOMING
           ======================================================= */}
        <section id="grooming-sec" className="bg-[#FFF5F5] rounded-[40px] p-6 lg:p-10 border border-rose-100/60 shadow-sm relative">
          
          {/* Section banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-rose-50/50 rounded-[32px] p-6 md:p-8 select-none relative overflow-hidden mb-10 border border-rose-50 shadow-sm">
            
            {/* Left label description */}
            <div className="md:col-span-8 flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center text-xl shadow-md shrink-0">
                ✂️
              </div>
              <div className="space-y-1.5 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-black text-rose-950 tracking-tight">Pet Grooming Stylists</h2>
                <p className="text-xs sm:text-sm font-semibold text-rose-700/80">
                  Professional grooming styles to make your pet look its best.
                </p>
              </div>
            </div>

            {/* Right generated asset portrait alignment */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="w-full max-w-[280px] h-32 rounded-2xl overflow-hidden shadow-md border-2 border-white relative">
                <img 
                  src="/src/assets/images/pet_grooming_banner_1781278941995.jpg" 
                  alt="Pet Grooming Banner Graphic" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500";
                  }}
                />
              </div>
            </div>

          </div>

          {/* Cards block (8 columns aligned horizontal scrolling or exact desktop grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 overflow-x-auto pb-4">
            {GROOMING_STYLES.map(style => (
              <div 
                key={style.id}
                onClick={() => setBookingGroomingStyle(style)}
                className="bg-white rounded-2xl p-3 border border-slate-150 hover:shadow-lg hover:border-slate-200 transition-all flex flex-col justify-between text-center cursor-pointer group min-w-[170px]"
              >
                <div>
                  <div className="rounded-xl h-40 w-full overflow-hidden bg-slate-50 relative mb-3">
                    <img 
                      src={style.image} 
                      alt={style.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400";
                      }}
                    />
                  </div>
                  <h4 className="text-xs font-black text-slate-800 tracking-tight group-hover:text-rose-500 transition-colors">
                    {style.name}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide">
                    {style.subtitle}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-50">
                  <span className="text-xs font-black text-rose-500">₹{style.price}</span>
                  <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wider group-hover:text-rose-400 transition-colors">
                    Book &💈
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* =======================================================
            SECTION 4: ABOUT US
           ======================================================= */}
        <section id="about-sec" className="bg-[#FAF9FF] rounded-[40px] p-6 lg:p-10 border border-indigo-100/60 shadow-sm relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#5C59E8] bg-violet-100 px-3 py-1 rounded-full inline-block">
                📖 Our Narrative
              </span>
              <h2 className="text-2xl sm:text-3.5xl font-black text-slate-800 tracking-tight leading-tight">
                Crafted with Genuine Warmth & Expert Precision
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500/95 leading-relaxed">
                Founded in 2024 by dedicated animal physical therapists and felines-canines nutritionists, PetCare Hub was birthed from a foundational belief: every companion animal is a treasured family node. We do not support mass industrial grains, always displaying full ingredient transparency.
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-400/90 leading-relaxed">
                In addition to raw diets, our specialized waterless wash salons reduce grooming pressure, ensuring beautiful stylish pet looks without sensory distress.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white p-5 rounded-[24px] border border-slate-150 shadow-sm space-y-4">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1 text-center">In-House Veterinarians & Stylists</h4>
              
              <div className="flex items-center gap-3 p-2.5 bg-violet-50/50 rounded-xl border border-violet-100/30">
                <span className="text-xl">🩺</span>
                <div>
                  <h5 className="text-xs font-black text-slate-800">Dr. Angela Brooks, DVM</h5>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Head Nutrition Director</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 bg-rose-50/50 rounded-xl border border-rose-100/30">
                <span className="text-xl">✂️</span>
                <div>
                  <h5 className="text-xs font-black text-slate-800">Theresa Jenkins, MS</h5>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Professional Grooming Artist</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =======================================================
            SECTION 5: CONTACT US
           ======================================================= */}
        <section id="contact-sec" className="bg-[#FCFAF5] rounded-[40px] p-6 lg:p-10 border border-amber-150/60 shadow-sm relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full inline-block">
                📞 Hotline Support
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight">
                Get in Touch
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
                Reach out with dietary, nutritional, or styling scheduling queries. We are available round the clock.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex gap-3 items-center text-xs font-black text-slate-700">
                  <span className="text-base">☎️</span>
                  <span>+1 (800) PET-CARE-HUB</span>
                </div>
                <div className="flex gap-3 items-center text-xs font-black text-slate-700">
                  <span className="text-base">✉️</span>
                  <span>care@petcarehub.com</span>
                </div>
                <div className="flex gap-3 items-center text-xs font-black text-slate-700">
                  <span className="text-base font-bold">📍</span>
                  <span>45 Sunny Paw Boulevard, CA</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-6 rounded-[24px] border border-slate-150 shadow-sm">
              {contactSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <span className="text-3xl text-emerald-500">✓</span>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Message Transmitted</h4>
                  <p className="text-xs text-slate-400 font-semibold">Our veterinary dispatch team will get back to you inside 1 hour.</p>
                  <button 
                    onClick={() => setContactSubmitted(false)}
                    className="mt-2 text-xs font-black text-violet-600 hover:underline"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="John" 
                        value={contactForm.name}
                        onChange={e => setContactForm({...contactForm, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2 text-xs font-bold outline-none focus:border-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="john@example.com" 
                        value={contactForm.email}
                        onChange={e => setContactForm({...contactForm, email: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2 text-xs font-bold outline-none focus:border-violet-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Your Message</label>
                    <textarea 
                      required 
                      rows={3} 
                      placeholder="Ask our veterinarians..." 
                      value={contactForm.message}
                      onChange={e => setContactForm({...contactForm, message: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2 text-xs font-bold outline-none focus:border-violet-600"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-2.5 bg-violet-600 text-white rounded-xl text-xs font-black hover:bg-violet-700 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Submit Care Request
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </main>

      {/* Footer block */}
      <footer className="bg-[#111026] text-slate-400 py-10 border-t border-violet-950/20 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold">
          <div className="flex items-center gap-2">
            <span className="text-base">🐾</span>
            <span className="text-white font-black uppercase text-xs tracking-wider">PetCare Hub</span>
          </div>
          <div>
            &copy; 2026 PetCare Hub. All rights reserved. Registered veterinary studio.
          </div>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* Interactive Item Details Popup Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setQuickViewProduct(null)}></div>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 w-full max-w-lg relative z-10 p-5 space-y-4">
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-50 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-36 h-36 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100/60 p-2">
                <img 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.name} 
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">
                  {quickViewProduct.subcategory}
                </span>
                <h3 className="text-base font-black text-slate-800 tracking-tight leading-tight">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-3">
                  {quickViewProduct.description}
                </p>
                
                <div className="flex items-center gap-2 mt-2 select-none">
                  <div className="flex items-center text-amber-400 text-xs text-center">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="ml-1 text-slate-700 font-extrabold">{quickViewProduct.rating}</span>
                  </div>
                  <span className="text-[10px] text-slate-300 font-bold">|</span>
                  <span className="text-[10px] text-slate-400 font-bold">{quickViewProduct.reviewsCount} reviews</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase">Pricing</span>
                <span className="text-lg font-black text-slate-800">₹{quickViewProduct.price}</span>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    handleToggleWishlist(quickViewProduct);
                  }}
                  className={`p-2 rounded-xl border transition-all ${
                    wishlist.some(w => w.id === quickViewProduct.id)
                      ? 'bg-rose-50 text-rose-500 border-rose-100'
                      : 'hover:bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                  title="Add to wishlist"
                >
                  <Heart className="w-4.5 h-4.5 fill-current" />
                </button>

                <button 
                  onClick={() => {
                    handleAddToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Interactive Stylists Grooming Booking Modal */}
      {bookingGroomingStyle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setBookingGroomingStyle(null)}></div>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 w-full max-w-md relative z-10 p-5 space-y-4">
            <button 
              onClick={() => setBookingGroomingStyle(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-50 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <span className="text-2xl">💈</span>
              <h3 className="text-base font-black text-slate-800 tracking-tight">
                Grooming Appointment
              </h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {bookingGroomingStyle.name} &bull; <span className="text-rose-500">₹{bookingGroomingStyle.price}</span>
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Pet Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Luna" 
                    value={bookingForm.petName}
                    onChange={e => setBookingForm({...bookingForm, petName: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2 text-xs font-bold outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Pet Breed</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Maltese" 
                    value={bookingForm.petBreed}
                    onChange={e => setBookingForm({...bookingForm, petBreed: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2 text-xs font-bold outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Owner Contact Phone</label>
                <input 
                  type="text" 
                  required 
                  placeholder="(123) 456-7890" 
                  value={bookingForm.ownerPhone}
                  onChange={e => setBookingForm({...bookingForm, ownerPhone: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2 text-xs font-bold outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Select Date</label>
                  <input 
                    type="date" 
                    required 
                    value={bookingForm.date}
                    onChange={e => setBookingForm({...bookingForm, date: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-1.5 text-xs font-bold outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Time Slot</label>
                  <select 
                    value={bookingForm.timeSlot}
                    onChange={e => setBookingForm({...bookingForm, timeSlot: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2 text-xs font-bold outline-none focus:border-rose-500"
                  >
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:30 AM</option>
                    <option>01:00 PM</option>
                    <option>03:00 PM</option>
                    <option>04:30 PM</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-rose-500 text-white rounded-xl text-xs font-black hover:bg-rose-600 transition-colors uppercase tracking-wider cursor-pointer"
              >
                Confirm Grooming Session
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Customer profile modal drawer */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsProfileOpen(false)}></div>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 w-full max-w-sm relative z-10 p-5 space-y-4">
            <button 
              onClick={() => setIsProfileOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-50 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <span className="text-3xl">👤</span>
              <h3 className="text-base font-black text-slate-800 tracking-tight">Active Pet Profile</h3>
              <p className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full inline-block">
                Loyalty Balance: {petProfile.loyaltyPoints} Points ⭐
              </p>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-3">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Pet Name</label>
                <input 
                  type="text" 
                  name="petName" 
                  required 
                  defaultValue={petProfile.petName} 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2 text-xs font-bold outline-none focus:border-violet-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Pet Breed / Family type</label>
                <input 
                  type="text" 
                  name="petBreed" 
                  required 
                  defaultValue={petProfile.petBreed} 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2 text-xs font-bold outline-none focus:border-violet-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Pet Age</label>
                  <input 
                    type="text" 
                    name="petAge" 
                    defaultValue={petProfile.petAge} 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2 text-xs font-bold outline-none focus:border-violet-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Favorite Toy</label>
                  <input 
                    type="text" 
                    name="favoriteToy" 
                    defaultValue={petProfile.favoriteToy} 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2 text-xs font-bold outline-none focus:border-violet-600"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-violet-600 text-white rounded-xl text-xs font-black hover:bg-violet-700 transition-colors uppercase tracking-wider cursor-pointer"
              >
                Save Profile updates
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sliding cart drawer mechanism */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onAddNotification={handleAddToast}
        onNewOrder={() => {}}
      />

      {/* Floating AI chatbot companion */}
      <PetBuddyAI />

    </div>
  );
}
