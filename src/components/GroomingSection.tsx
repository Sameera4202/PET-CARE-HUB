import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, Check, Scissors, AlertCircle, Heart, User, Phone, Mail, FileText } from 'lucide-react';
import { GROOMING_SERVICES, PREMIUM_PACKAGES } from '../data';
import { GroomingService, PremiumPackage, GroomingBooking } from '../types';

interface GroomingSectionProps {
  onAddBooking: (booking: GroomingBooking) => void;
  bookings: GroomingBooking[];
  onAddNotification: (text: string, type: 'success' | 'info') => void;
}

export default function GroomingSection({ onAddBooking, bookings, onAddNotification }: GroomingSectionProps) {
  const [selectedPetType, setSelectedPetType] = useState<'all' | 'dog' | 'cat'>('all');
  
  // Booking Form State
  const [formData, setFormData] = useState({
    serviceId: GROOMING_SERVICES[0].id,
    packageId: PREMIUM_PACKAGES[0].id,
    petName: '',
    petType: 'dog' as 'dog' | 'cat',
    petBreed: '',
    date: '',
    timeSlot: '09:00 AM',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState<string>('');

  const servicesFiltered = GROOMING_SERVICES.filter(
    s => selectedPetType === 'all' || s.petType === selectedPetType
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (service: GroomingService) => {
    setFormData(prev => ({
      ...prev,
      serviceId: service.id,
      petType: service.petType
    }));
    onAddNotification(`Selected service: ${service.name}`, 'info');
    document.getElementById('booking-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePackageSelect = (pkg: PremiumPackage) => {
    setFormData(prev => ({
      ...prev,
      packageId: pkg.id
    }));
    onAddNotification(`Selected package tier: ${pkg.name}`, 'info');
    document.getElementById('booking-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors('');

    // Validation
    if (!formData.petName || !formData.petBreed || !formData.date || !formData.ownerName || !formData.ownerPhone || !formData.ownerEmail) {
      setFormErrors('Please fill in all required fields marked with *');
      return;
    }

    const selectedService = GROOMING_SERVICES.find(s => s.id === formData.serviceId) || GROOMING_SERVICES[0];
    const selectedPackage = PREMIUM_PACKAGES.find(p => p.id === formData.packageId) || PREMIUM_PACKAGES[0];
    const totalPrice = selectedService.price + selectedPackage.price;

    const newBooking: GroomingBooking = {
      id: `booking-${Date.now()}`,
      serviceId: formData.serviceId,
      serviceName: `${selectedService.name} (${selectedPackage.name})`,
      petName: formData.petName,
      petType: formData.petType,
      petBreed: formData.petBreed,
      date: formData.date,
      timeSlot: formData.timeSlot,
      ownerName: formData.ownerName,
      ownerEmail: formData.ownerEmail,
      ownerPhone: formData.ownerPhone,
      notes: formData.notes,
      status: 'confirmed',
      price: totalPrice
    };

    onAddBooking(newBooking);
    onAddNotification(`Success! Grooming booked for ${formData.petName} on ${formData.date} at ${formData.timeSlot}!`, 'success');

    // Reset non-essential form fields
    setFormData(prev => ({
      ...prev,
      petName: '',
      petBreed: '',
      date: '',
      notes: ''
    }));
  };

  return (
    <section id="grooming" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#BA68C8] bg-[#BA68C8]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            ✂️ 5-Star Pet Spa Salon
          </span>
          <h2 className="text-3.5xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Stylish Grooming & Luxury Spa Treatments
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-3.5">
            Your companions deserve royalty treatment. Filter by pet category below to explore customize styles, warm bubble treatments, and custom detangling options.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-3 mb-10">
          {(['all', 'dog', 'cat'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedPetType(type)}
              className={`px-5 py-2 hover:scale-[1.02] active:scale-95 text-xs font-bold rounded-full transition-all capitalize ${
                selectedPetType === type
                  ? 'bg-[#BA68C8] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {type === 'all' ? 'All Pets' : `${type}s Only`}
            </button>
          ))}
        </div>

        {/* Services Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesFiltered.map((service) => (
            <div 
              key={service.id}
              className="glass-card rounded-2xl overflow-hidden group hover:shadow-xl hover:-translate-y-1.5 transition-all flex flex-col border border-white"
            >
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-800 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                  {service.petType === 'dog' ? '🐶 Dog' : '🐱 Cat'} Service
                </span>
                <span className="absolute bottom-4 right-4 bg-[#BA68C8] text-white font-black text-sm px-3 py-1.5 rounded-xl shadow-lg">
                  ₹{service.price}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-800">{service.name}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-xs mt-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#BA68C8]" />
                    <span>Duration: {service.duration}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-3 font-medium leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100/60">
                  <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Key Inclusion Benefits:</h4>
                  <ul className="space-y-1.5">
                    {service.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-[11px] text-slate-600 font-medium">
                        <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleServiceSelect(service)}
                  className="mt-6 w-full py-2.5 bg-gradient-to-r from-[#BA68C8] to-[#FF80AB] hover:from-[#ab5ebd] hover:to-[#ff6da1] text-white font-extrabold rounded-xl text-xs transition-all tracking-wider shadow-md hover:shadow-lg active:scale-95"
                >
                  Book Service Base
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Packages Grid */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#BA68C8] to-[#FF80AB]">
              💎 Upgrade to the Absolute Best
            </h3>
            <p className="text-xs text-slate-500 mt-1">Combine a base haircut/shampoo session with raw gourmet treats, claw claddings or organic facials.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PREMIUM_PACKAGES.map((pkg) => (
              <div 
                key={pkg.id}
                className="glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between border-2 border-white/80 hover:scale-[1.01] transition-transform shadow-xl"
              >
                {/* Accent Background light blur block */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 filter blur-xl bg-gradient-to-tr ${pkg.colorClass}`}></div>

                <div>
                  <div className="flex justify-between items-start">
                    <span className="inline-block bg-[#BA68C8]/10 text-[#BA68C8] font-bold uppercase text-[10px] tracking-wider px-3 py-1 rounded-full border border-[#BA68C8]/20">
                      {pkg.badge}
                    </span>
                    <span className="text-slate-500 text-xs font-bold">{pkg.duration}</span>
                  </div>

                  <h4 className="text-lg font-black text-slate-800 mt-3">{pkg.name}</h4>
                  <p className="text-xs text-slate-600 font-medium mt-1.5">{pkg.description}</p>
                  
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-800">+₹{pkg.price}</span>
                    <span className="text-slate-400 text-xs">package add-on</span>
                  </div>

                  <ul className="mt-6 space-y-2.5">
                    {pkg.inclusions.map((inc, iIdx) => (
                      <li key={iIdx} className="flex gap-2.5 text-xs text-slate-600 font-semibold items-start">
                        <Check className="w-4 h-4 text-[#BA68C8] flex-shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handlePackageSelect(pkg)}
                  className="mt-8 w-full py-3 border-2 border-[#BA68C8]/30 hover:border-[#BA68C8] hover:bg-[#BA68C8]/5 text-slate-800 font-bold rounded-2xl text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Select {pkg.name.split(' ')[0]}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Before and After transformations */}
        <div className="mt-24 mb-16">
          <div className="text-center mb-12">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#BA68C8] bg-[#BA68C8]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              ✨ 5-Star Makeover Results
            </span>
            <h3 className="text-2.5xl sm:text-3xl font-black text-slate-800 flex items-center justify-center gap-2">
              <Scissors className="w-6 h-6 text-[#BA68C8]" />
              <span>Grooming Case Study Transformations</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 max-w-xl mx-auto">
              Browse actual before-and-after results illustrating custom styling cut types, calming detangling systems, and anti-anxiety spa finish secrets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 'makeover-1',
                petName: 'Milo (Toy Poodle)',
                stylist: 'Master Groomer Jessica',
                comments: 'Transformed untamed locks into our trademark spherical round Teddy Bear style. Cleansed with lavender bubble wash.',
                beforeImg: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&auto=format&fit=crop&q=80',
                afterImg: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&auto=format&fit=crop&q=80',
                style: '🧸 Teddy Bear Trim'
              },
              {
                id: 'makeover-2',
                petName: 'Bella (Bichon Frise)',
                stylist: 'Senior Stylist Arthur',
                comments: 'Treated heavy overgrown fur, detangled lower undercoat, and sculpted gorgeous spherical show fluff contour.',
                beforeImg: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&auto=format&fit=crop&q=80',
                afterImg: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&auto=format&fit=crop&q=80',
                style: '☁️ Spherical Cloud'
              },
              {
                id: 'makeover-3',
                petName: 'Princess (Persian Cat)',
                stylist: 'Feline Specialist Elena',
                comments: 'Moisturized difficult matting under arms safely, performed organic waterless skin dry wrap, and finished with Lion Cut style.',
                beforeImg: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&auto=format&fit=crop&q=80',
                afterImg: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&auto=format&fit=crop&q=80',
                style: '🦁 Royal Lion Cut'
              }
            ].map((caseStudy) => (
              <div 
                key={caseStudy.id} 
                className="glass-panel p-6 rounded-3xl border border-white hover:scale-[1.01] transition-transform shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-extrabold text-slate-800">{caseStudy.petName}</span>
                    <span className="bg-[#BA68C8]/10 text-[#BA68C8] text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#BA68C8]/15">
                      {caseStudy.style}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 relative rounded-2xl overflow-hidden mb-4 bg-slate-50">
                    {/* Before thumbnail frame */}
                    <div className="relative h-40 group">
                      <img 
                        src={caseStudy.beforeImg} 
                        alt="Before Makeover" 
                        className="w-full h-full object-cover filter brightness-[0.80]"
                      />
                      <span className="absolute bottom-2.5 left-2.5 bg-slate-900/85 backdrop-blur-sm text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                        Before (Shaggy)
                      </span>
                    </div>

                    {/* After thumbnail frame */}
                    <div className="relative h-40">
                      <img 
                        src={caseStudy.afterImg} 
                        alt="After Makeover" 
                        className="w-full h-full object-cover border-l border-white shadow-md"
                      />
                      <span className="absolute bottom-2.5 right-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow">
                        After ✨
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] font-bold text-[#BA68C8]">Stylist: {caseStudy.stylist}</p>
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-1.5">
                    "{caseStudy.comments}"
                  </p>
                </div>
                
                <div className="mt-5 pt-3 border-t border-slate-100/60 flex justify-between items-center text-[10px] text-slate-400 font-extrabold uppercase">
                  <span>✨ 100% Pain-Free</span>
                  <span>5-Star Result Choice</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Booking System Form */}
        <div id="booking-form-anchor" className="mt-20 max-w-3xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-white shadow-2xl relative">
          
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-slate-800 flex items-center justify-center gap-2">
              <Calendar className="w-6 h-6 text-[#BA68C8]" />
              <span>Instantly Book Spa Appointment</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1.5">No-deposit required. Free cancellation up to 24 hours prior.</p>
          </div>

          {formErrors && (
            <div className="mb-6 p-4 bg-rose-50/80 border border-rose-200 text-rose-800 rounded-2xl flex gap-2 text-xs font-semibold items-center">
              <AlertCircle className="w-4.5 h-4.5 flex-shrink-0 text-rose-600" />
              <span>{formErrors}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Pet Info */}
            <div className="bg-white/40 p-4 rounded-2xl border border-white/50 space-y-4">
              <h4 className="text-xs font-bold text-[#BA68C8] uppercase tracking-wider">Step 1: Tell us about your Pet</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Pet Name *</label>
                  <input
                    type="text"
                    name="petName"
                    required
                    value={formData.petName}
                    onChange={handleInputChange}
                    placeholder="e.g. Milo or Princess"
                    className="w-full bg-white/70 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#BA68C8]/30 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Pet Breed Breed *</label>
                  <input
                    type="text"
                    name="petBreed"
                    required
                    value={formData.petBreed}
                    onChange={handleInputChange}
                    placeholder="e.g. Golden Retriever"
                    className="w-full bg-white/70 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#BA68C8]/30 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Pet Type *</label>
                  <select
                    name="petType"
                    value={formData.petType}
                    onChange={handleInputChange}
                    className="w-full bg-white/70 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#BA68C8]/30 outline-none"
                  >
                    <option value="dog">🐶 Dog</option>
                    <option value="cat">🐱 Cat</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Service & Package Add-on</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="serviceId"
                      value={formData.serviceId}
                      onChange={handleInputChange}
                      className="w-full bg-white/70 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#BA68C8]/30 outline-none"
                    >
                      {GROOMING_SERVICES.map(s => (
                        <option key={s.id} value={s.id}>{s.name} (₹{s.price})</option>
                      ))}
                    </select>

                    <select
                      name="packageId"
                      value={formData.packageId}
                      onChange={handleInputChange}
                      className="w-full bg-white/70 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#BA68C8]/30 outline-none"
                    >
                      {PREMIUM_PACKAGES.map(p => (
                        <option key={p.id} value={p.id}>{p.name} (+₹{p.price})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* DateTime Selection */}
            <div className="bg-white/40 p-4 rounded-2xl border border-white/50 space-y-4">
              <h4 className="text-xs font-bold text-[#BA68C8] uppercase tracking-wider">Step 2: Choose Date & Time</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    min="2026-06-12"
                    onChange={handleInputChange}
                    className="w-full bg-white/70 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#BA68C8]/30 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Preferred Time-slot *</label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className="w-full bg-white/70 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#BA68C8]/30 outline-none"
                  >
                    <option value="09:00 AM">09:00 AM (Early slot)</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="01:30 PM">01:30 PM (Midday slot)</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="05:30 PM">05:30 PM (Evening slot)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-white/40 p-4 rounded-2xl border border-white/50 space-y-4">
              <h4 className="text-xs font-bold text-[#BA68C8] uppercase tracking-wider">Step 3: Contact Details</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="ownerName"
                    required
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full bg-white/70 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#BA68C8]/30 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="ownerEmail"
                    required
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full bg-white/70 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#BA68C8]/30 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="ownerPhone"
                    required
                    value={formData.ownerPhone}
                    onChange={handleInputChange}
                    placeholder="e.g. +1 (555) 0192"
                    className="w-full bg-white/70 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#BA68C8]/30 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Special instructions or requests</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="e.g. Milo is skin-sensitive to dry heat, please towel-dry, or likes high praise."
                  className="w-full bg-white/70 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#BA68C8]/30 outline-none"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#BA68C8] via-[#FF80AB] to-[#4FC3F7] text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all capitalize text-sm tracking-wider"
            >
              Verify & Securely Confirm Appointment
            </button>

          </form>

        </div>

        {/* Existing active user bookings */}
        {bookings.length > 0 && (
          <div className="mt-16 max-w-3xl mx-auto bg-white/50 p-6 rounded-3xl border border-white">
            <h4 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-1.5">
              <span>📅 Your Scheduled Appointments ({bookings.length})</span>
            </h4>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="inline-block bg-[#BA68C8]/10 text-[#BA68C8] text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded-md mb-1 uppercase">
                      {booking.petType === 'dog' ? '🐶 Dog' : '🐱 Cat'} Client
                    </span>
                    <h5 className="text-sm font-extrabold text-slate-800">
                      {booking.petName} ({booking.petBreed})
                    </h5>
                    <p className="text-[11px] font-bold text-slate-500 mt-0.5 uppercase tracking-wide">
                      {booking.serviceName}
                    </p>
                    {booking.notes && (
                      <p className="text-[10px] text-slate-400 italic mt-1">
                        Note: "{booking.notes}"
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:items-end flex-shrink-0">
                    <span className="text-xs font-black text-slate-700">{booking.date} at {booking.timeSlot}</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full mt-1 border border-emerald-100">
                      Confirmed & Live
                    </span>
                    <span className="text-sm font-black text-[#BA68C8] mt-1">₹{booking.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
