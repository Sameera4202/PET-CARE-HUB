export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: 'food' | 'accessory';
  subcategory: string; // e.g., 'Dog Food', 'Cat Food', 'Pet Beds', 'Leashes'
  image: string;
  isBestseller?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  stock: number;
  tags?: string[];
}

export interface GroomingService {
  id: string;
  name: string;
  petType: 'dog' | 'cat';
  description: string;
  duration: string;
  price: number;
  benefits: string[];
  image: string;
}

export interface PremiumPackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  inclusions: string[];
  badge: string;
  colorClass: string;
}

export interface GroomingBooking {
  id: string;
  serviceId: string;
  serviceName: string;
  petName: string;
  petType: 'dog' | 'cat';
  petBreed: string;
  date: string;
  timeSlot: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  notes?: string;
  status: 'pending' | 'confirmed';
  price: number;
}

export interface CustomerReview {
  id: string;
  avatar: string;
  petPhoto: string;
  author: string;
  petName: string;
  petBreed: string;
  reviewText: string;
  rating: number;
  date: string;
  isVerified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  description: string;
}
