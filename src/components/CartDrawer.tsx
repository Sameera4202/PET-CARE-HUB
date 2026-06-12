import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, Sparkles, ShoppingBag, MapPin, CheckCircle2, Ticket, ShieldCheck, Tag } from 'lucide-react';
import { CartItem, Product, Coupon } from '../types';
import { COUPONS } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (pId: string, delta: number) => void;
  onRemoveItem: (pId: string) => void;
  onClearCart: () => void;
  onAddNotification: (text: string, type: 'success' | 'info') => void;
  onNewOrder: (order: { id: string; items: CartItem[]; price: number; couponUsed?: string }) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onAddNotification,
  onNewOrder
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'tracking'>('cart');

  // Checkout inputs
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    cardNum: '',
    cardExp: '',
    cardCvv: ''
  });

  const [checkoutErrors, setCheckoutErrors] = useState('');
  const [mockOrderId, setMockOrderId] = useState('');
  const [trackingStatus, setTrackingStatus] = useState<string>('Ordered & Confirmed');

  if (!isOpen) return null;

  const currentSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = (currentSubtotal * appliedCoupon.value) / 100;
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const shippingFee = currentSubtotal > 1000 ? 0 : 99;
  const currentTotal = Math.max(0, currentSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = () => {
    const codeMatch = couponCode.trim().toUpperCase();
    const coupon = COUPONS.find(c => c.code === codeMatch);

    if (coupon) {
      setAppliedCoupon(coupon);
      onAddNotification(`Promo coupon applied: ${coupon.description}!`, 'success');
      setCouponCode('');
    } else {
      onAddNotification("Coupon code is invalid! Try PARADISE20 or WOOFGROW.", 'info');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    onAddNotification("Discount coupon removed.", 'info');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutErrors('');

    // Quick validations
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode || !shippingInfo.phone) {
      setCheckoutErrors('Please enter your shipping address details!');
      return;
    }
    if (!shippingInfo.cardNum || !shippingInfo.cardExp || !shippingInfo.cardCvv) {
      setCheckoutErrors('Please specify your mock credit card details for check-out!');
      return;
    }

    // Success complete transaction
    const finalId = `PET-${Math.floor(100000 + Math.random() * 900000)}`;
    setMockOrderId(finalId);
    setCheckoutStep('tracking');
    setTrackingStatus('Preparing in Warehouse');

    onNewOrder({
      id: finalId,
      items: [...cart],
      price: Number(currentTotal.toFixed(2)),
      couponUsed: appliedCoupon?.code
    });

    onAddNotification(`Woohoo! Order ${finalId} successfully completed!`, 'success');
    onClearCart();
    
    // Simulate tracking timeline shifts
    setTimeout(() => {
      setTrackingStatus('Custom Grooming Kit Dispatched');
    }, 6000);
    setTimeout(() => {
      setTrackingStatus('Out with Delivery Courier 🚚');
    }, 12000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Black backdrop overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Cart Container Drawer panel sliding from right */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBFBFE] shadow-2xl flex flex-col overflow-y-auto">
          
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <ShoppingBag className="w-5.5 h-5.5 text-[#4FC3F7]" />
              <span>
                {checkoutStep === 'cart' && "Your Shopping Bag"}
                {checkoutStep === 'checkout' && "Secure Checkout Form"}
                {checkoutStep === 'tracking' && "Mock Live Order Status"}
              </span>
            </h3>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CHECKOUT STEP 1: CART LISTING VIEW */}
          {checkoutStep === 'cart' && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-[#4FC3F7]/10 text-[#4FC3F7] rounded-full flex items-center justify-center text-3xl mb-4 select-none">
                    🛍️
                  </div>
                  <h4 className="text-base font-bold text-slate-800">Your Cart is Empty</h4>
                  <p className="text-xs text-slate-500 mt-2">Browse our high-protein Dog/Cat Foods & stylish beds sections to add treats!</p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 bg-[#4FC3F7] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-center justify-between"
                    >
                      <div className="w-16 h-13 rounded-lg overflow-hidden flex-shrink-0 bg-slate-50">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold text-[#4FC3F7] uppercase bg-[#4FC3F7]/10 px-2 py-0.5 rounded-md">
                          {item.product.subcategory}
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-800 truncate mt-1">
                          {item.product.name}
                        </h4>
                        <div className="text-slate-400 text-[10px] mt-0.5">
                          Unit price: ₹{item.product.price}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-200/50">
                          <button 
                            onClick={() => onUpdateQty(item.product.id, -1)}
                            className="p-1 hover:bg-white text-slate-600 rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-extrabold text-slate-800 px-1">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQty(item.product.id, 1)}
                            className="p-1 hover:bg-white text-slate-600 rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button 
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[10px] text-rose-500 font-bold hover:underline flex items-center gap-0.5"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Del</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CHECKOUT STEP 2: ADDRESS & MOCK CREDIT CARD VIEW */}
          {checkoutStep === 'checkout' && (
            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                {checkoutErrors && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium rounded-xl flex gap-2">
                    <span className="text-rose-600">🚨</span>
                    <span>{checkoutErrors}</span>
                  </div>
                )}

                {/* Shipping Details */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#BA68C8]" />
                    <span>Shipping Address</span>
                  </h4>

                  <input
                    type="text"
                    required
                    placeholder="Recipient Full Name *"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    className="w-full bg-white border border-slate-250 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-[#BA68C8]/30"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Street Address Details *"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    className="w-full bg-white border border-slate-250 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-[#BA68C8]/30"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="City *"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="w-full bg-white border border-slate-250 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-[#BA68C8]/30"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Postal / Zip Code *"
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                      className="w-full bg-white border border-slate-250 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-[#BA68C8]/30"
                    />
                  </div>

                  <input
                    type="tel"
                    required
                    placeholder="Contact Phone Number *"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full bg-white border border-slate-250 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-[#BA68C8]/30"
                  />
                </div>

                {/* Billing Details */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#4FC3F7]" />
                    <span>Mock Credit Card Info</span>
                  </h4>

                  <input
                    type="text"
                    required
                    placeholder="16-Digit Card Number *"
                    maxLength={16}
                    value={shippingInfo.cardNum}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, cardNum: e.target.value })}
                    className="w-full bg-white border border-slate-250 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-[#4FC3F7]/30 font-mono"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="MM/YY Exp *"
                      maxLength={5}
                      value={shippingInfo.cardExp}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, cardExp: e.target.value })}
                      className="w-full bg-white border border-slate-250 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-[#4FC3F7]/30"
                    />
                    <input
                      type="password"
                      required
                      placeholder="3-Digit CVV *"
                      maxLength={3}
                      value={shippingInfo.cardCvv}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, cardCvv: e.target.value })}
                      className="w-full bg-white border border-slate-250 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-[#4FC3F7]/30 font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl flex items-start gap-2 border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                    This is a secure offline sandbox payment demo. No actual funds will be processed or transferred.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#4FC3F7] to-[#BA68C8] hover:from-[#29B6F6] hover:to-[#ab5ebd] text-white font-extrabold rounded-2xl text-xs shadow-md transition-all uppercase tracking-widest mt-2"
                >
                  Authorized & Place Secure Order
                </button>

                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full text-center py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  ← Return to Shopping Bag
                </button>
              </form>
            </div>
          )}

          {/* CHECKOUT STEP 3: ORDER TRACKING TIMELINE WORKFLOW */}
          {checkoutStep === 'tracking' && (
            <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
              
              <div className="text-center py-6 bg-slate-50 rounded-3xl border border-slate-100 p-6">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-base font-black text-slate-800 mt-4">Order Placed Successfully!</h4>
                <p className="text-xs text-slate-500 mt-1">Receipt emailed to details. Your pet is going to love these!</p>

                <div className="mt-6 px-4 py-2 bg-emerald-500/10 text-emerald-800 rounded-xl text-xs font-black uppercase tracking-wider inline-block">
                  ID: {mockOrderId}
                </div>
              </div>

              {/* Steps timeline tracker diagram */}
              <div className="py-8 px-4 space-y-6 flex-1">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Delivery Timeline:</h5>
                <div className="space-y-6 relative pl-6 border-l border-slate-200">
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow"></span>
                    <h5 className="text-xs font-bold text-emerald-600">Ordered & Packaging Verified</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">Approved successfully at 2026 local terminal</p>
                  </div>
                  
                  <div className="relative">
                    <span className={`absolute -left-[30px] top-0 w-4 h-4 rounded-full border-4 border-white shadow ${
                      trackingStatus !== 'Ordered & Confirmed' ? 'bg-[#BA68C8]' : 'bg-slate-300'
                    }`}></span>
                    <h5 className={`text-xs font-bold ${
                      trackingStatus !== 'Ordered & Confirmed' ? 'text-slate-800' : 'text-slate-400'
                    }`}>
                      In Warehouse Dispatch
                    </h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Products loaded in sterile Pet Safe crates</p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[30px] top-0 w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow"></span>
                    <h5 className="text-xs font-bold text-slate-400">Arrived via Fast Delivery Courier</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">1-3 Day local standard tracking guarantees</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="w-full py-3.5 bg-slate-800 text-white font-bold rounded-2xl text-xs shadow-sm hover:bg-slate-900 transition-all uppercase"
              >
                Close Status Screen
              </button>

            </div>
          )}

          {/* Subtotal summary footer block (Visible in Step 1 or 2) */}
          {checkoutStep !== 'tracking' && cart.length > 0 && (
            <div className="p-6 bg-white border-t border-slate-100 space-y-4">
              
              {/* Promo code modifier in Step 1 */}
              {checkoutStep === 'cart' && (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Coupon Code (PARADISE20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full border border-slate-200 bg-slate-50/50 rounded-xl py-2 pl-8 pr-3 text-xs uppercase"
                    />
                    <Ticket className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl"
                  >
                    Apply code
                  </button>
                </div>
              )}

              {/* Coupon chip */}
              {appliedCoupon && (
                <div className="flex items-center justify-between p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] font-bold text-emerald-800">
                  <div className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon: {appliedCoupon.code} Applied</span>
                  </div>
                  <button 
                    onClick={handleRemoveCoupon}
                    className="text-xs text-rose-500 font-extrabold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Pricing lists details */}
              <div className="space-y-1.5 text-xs text-slate-600 font-semibold">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span>₹{currentSubtotal.toFixed(0)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon Reward</span>
                    <span>-₹{discountAmount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE (Over ₹1000)' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100 text-slate-800 font-black text-sm">
                  <span>Estimated Total</span>
                  <span className="text-[#4FC3F7]">₹{currentTotal.toFixed(0)}</span>
                </div>
              </div>

              {checkoutStep === 'cart' && (
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-4 bg-gradient-to-r from-[#4FC3F7] via-[#BA68C8] to-[#FF80AB] text-white font-black rounded-2xl text-xs uppercase tracking-widest text-center"
                >
                  Proceed to Secure Checkout
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
