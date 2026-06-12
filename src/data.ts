import { Product, CustomerReview, Coupon, GroomingService, PremiumPackage } from './types';

// Let's define the exact product items matching the reference image.
// Pet Food Section items:
export const PET_FOODS: Product[] = [
  // --- DOG FOOD (6 items) ---
  {
    id: 'food-dog-puppy',
    name: 'Puppy Food',
    description: 'Special formulation enriched with DHA for puppy brain development and strong bones.',
    price: 699,
    rating: 4.8,
    reviewsCount: 120,
    category: 'food',
    subcategory: 'Dog Food',
    image: 'https://images.unsplash.com/photo-1589924691106-07a2cdd51a37?w=500&auto=format&fit=crop&q=80',
    stock: 25,
    tags: ['Puppy', 'DHA', 'Premium']
  },
  {
    id: 'food-dog-adult',
    name: 'Adult Dog Food',
    description: 'Complete daily balanced protein meal for active adult dogs.',
    price: 899,
    rating: 4.9,
    reviewsCount: 180,
    category: 'food',
    subcategory: 'Dog Food',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=500&auto=format&fit=crop&q=80',
    stock: 30,
    tags: ['Adult', 'Premium', 'Protein']
  },
  {
    id: 'food-dog-senior',
    name: 'Senior Dog Food',
    description: 'Joint care and easy digestive blend formula for senior dogs.',
    price: 799,
    rating: 4.7,
    reviewsCount: 95,
    category: 'food',
    subcategory: 'Dog Food',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500&auto=format&fit=crop&q=80',
    stock: 12,
    tags: ['Senior', 'Joint-Care', 'Digestive']
  },
  {
    id: 'food-dog-wet',
    name: 'Wet Dog Food',
    description: 'Juicy chunks of gravy meat in a convenient easy-open tin can.',
    price: 399,
    rating: 4.6,
    reviewsCount: 140,
    category: 'food',
    subcategory: 'Dog Food',
    image: 'https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?w=500&auto=format&fit=crop&q=80',
    stock: 40,
    tags: ['Wet-Food', 'Can', 'Gravy']
  },
  {
    id: 'food-dog-dry',
    name: 'Dry Dog Food',
    description: 'High quality dry kibbles promoting healthy teeth and gums.',
    price: 999,
    rating: 4.8,
    reviewsCount: 220,
    category: 'food',
    subcategory: 'Dog Food',
    image: 'https://images.unsplash.com/photo-1608454527339-62ffa47c170a?w=500&auto=format&fit=crop&q=80',
    stock: 18,
    tags: ['Dry', 'kibbles', 'Teeth']
  },
  {
    id: 'food-dog-grainfree',
    name: 'Grain-Free Dog Food',
    description: '100% grain-free formula optimized for dogs with sensitive stomachs.',
    price: 1199,
    rating: 4.9,
    reviewsCount: 310,
    category: 'food',
    subcategory: 'Dog Food',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80',
    stock: 15,
    tags: ['Grain-Free', 'Sensitive', 'Hypoallergenic']
  },

  // --- CAT FOOD (6 items) ---
  {
    id: 'food-cat-kitten',
    name: 'Kitten Food',
    description: 'High calcium and taurine formulation custom-tailored for baby kittens.',
    price: 349,
    rating: 4.9,
    reviewsCount: 165,
    category: 'food',
    subcategory: 'Cat Food',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500&auto=format&fit=crop&q=80',
    stock: 20,
    tags: ['Kitten', 'Calcium', 'Taurine']
  },
  {
    id: 'food-cat-adult',
    name: 'Adult Cat Food',
    description: 'Daily nutritional diet program with real red meat and poultry for active felines.',
    price: 599,
    rating: 4.7,
    reviewsCount: 195,
    category: 'food',
    subcategory: 'Cat Food',
    image: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?w=500&auto=format&fit=crop&q=80',
    stock: 32,
    tags: ['Adult', 'Poultry', 'Complete']
  },
  {
    id: 'food-cat-senior',
    name: 'Senior Cat Food',
    description: 'Anti-aging health formula optimized for senior indoor cats.',
    price: 649,
    rating: 4.8,
    reviewsCount: 88,
    category: 'food',
    subcategory: 'Cat Food',
    image: 'https://images.unsplash.com/photo-1589733901241-5e5148e88fb5?w=500&auto=format&fit=crop&q=80',
    stock: 10,
    tags: ['Senior', 'Indoor', 'Vitamins']
  },
  {
    id: 'food-cat-wet',
    name: 'Wet Cat Food',
    description: 'Premium salmon and tuna slices in delicious moisture broth tin cans.',
    price: 299,
    rating: 4.7,
    reviewsCount: 112,
    category: 'food',
    subcategory: 'Cat Food',
    image: 'https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=500&auto=format&fit=crop&q=80',
    stock: 50,
    tags: ['Wet', 'Salmon', 'Tuna']
  },
  {
    id: 'food-cat-dry',
    name: 'Dry Cat Food',
    description: 'Crunchy daily dry cat food packed with healthy ocean fish proteins.',
    price: 549,
    rating: 4.6,
    reviewsCount: 140,
    category: 'food',
    subcategory: 'Cat Food',
    image: 'https://images.unsplash.com/photo-1544438380-1845a7b41951?w=500&auto=format&fit=crop&q=80',
    stock: 22,
    tags: ['Dry', 'OceanFish', 'Crunchy']
  },
  {
    id: 'food-cat-hairball',
    name: 'Hairball Control Food',
    description: 'Special dietary fibers to naturally prevent hairball formulation in grooming cats.',
    price: 639,
    rating: 4.8,
    reviewsCount: 130,
    category: 'food',
    subcategory: 'Cat Food',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&auto=format&fit=crop&q=80',
    stock: 14,
    tags: ['Hairball', 'Fibers', 'Indoor']
  },

  // --- BIRD FOOD (5 items) ---
  {
    id: 'food-bird-parrot',
    name: 'Parrot Food',
    description: 'Premium seed mix enriched with dried tropical fruits and healthy nuts.',
    price: 389,
    rating: 4.8,
    reviewsCount: 64,
    category: 'food',
    subcategory: 'Bird Food',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop&q=80',
    stock: 15,
    tags: ['Parrot', 'Seeds', 'Nuts']
  },
  {
    id: 'food-bird-budgie',
    name: 'Budgie Food',
    description: 'Finest triple-cleaned yellow millet grains customized for active budgerigars.',
    price: 259,
    rating: 4.7,
    reviewsCount: 48,
    category: 'food',
    subcategory: 'Bird Food',
    image: 'https://images.unsplash.com/photo-1608454527339-62ffa47c170a?w=500&auto=format&fit=crop&q=80',
    stock: 18,
    tags: ['Budgie', 'Millet', 'Seeds']
  },
  {
    id: 'food-bird-cockatiel',
    name: 'Cockatiel Food',
    description: 'Sunflower and oat groats mix optimized for adult cockatiel diet programs.',
    price: 299,
    rating: 4.6,
    reviewsCount: 52,
    category: 'food',
    subcategory: 'Bird Food',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500&auto=format&fit=crop&q=80',
    stock: 14,
    tags: ['Cockatiel', 'Sunflower', 'Oats']
  },
  {
    id: 'food-bird-canary',
    name: 'Canary Food',
    description: 'High energy seed mix with canary grass seeds for healthy singing birds.',
    price: 239,
    rating: 4.9,
    reviewsCount: 40,
    category: 'food',
    subcategory: 'Bird Food',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500&auto=format&fit=crop&q=80',
    stock: 16,
    tags: ['Canary', 'Grass-Seeds', 'Singing']
  },
  {
    id: 'food-bird-lovebird',
    name: 'Lovebird Food',
    description: 'Nutritious balanced grains custom formulated for small affectionate lovebirds.',
    price: 279,
    rating: 4.8,
    reviewsCount: 35,
    category: 'food',
    subcategory: 'Bird Food',
    image: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?w=500&auto=format&fit=crop&q=80',
    stock: 11,
    tags: ['Lovebird', 'Grains', 'Balanced']
  },

  // --- FISH FOOD (4 items) ---
  {
    id: 'food-fish-flake',
    name: 'Flake Food',
    description: 'Multi-nutrient color enhancing flakes that do not cloud aquarium water.',
    price: 199,
    rating: 4.7,
    reviewsCount: 88,
    category: 'food',
    subcategory: 'Fish Food',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=80',
    stock: 50,
    tags: ['Flakes', 'Goldfish', 'Clarity']
  },
  {
    id: 'food-fish-pellet',
    name: 'Pellet Food',
    description: 'Premium slow sinking pellets enriched with vitamins for mid-water feeding fish.',
    price: 229,
    rating: 4.8,
    reviewsCount: 74,
    category: 'food',
    subcategory: 'Fish Food',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80',
    stock: 45,
    tags: ['Pellets', 'Sinking', 'Vitamins']
  },
  {
    id: 'food-fish-freezedried',
    name: 'Freeze-Dried Food',
    description: '100% natural pure freeze-dried krill and brine shrimp rich in natural carotenoids.',
    price: 319,
    rating: 4.9,
    reviewsCount: 92,
    category: 'food',
    subcategory: 'Fish Food',
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=500&auto=format&fit=crop&q=80',
    stock: 30,
    tags: ['Freeze-Dried', 'Krill', 'Natural']
  },
  {
    id: 'food-fish-spirulina',
    name: 'Spirulina Food',
    description: 'Vegetable rich spirulina tablets that stick to glass for herbivorous bottom sleepers.',
    price: 279,
    rating: 4.8,
    reviewsCount: 61,
    category: 'food',
    subcategory: 'Fish Food',
    image: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?w=500&auto=format&fit=crop&q=80',
    stock: 25,
    tags: ['Spirulina', 'Tablets', 'Algae']
  },

  // --- SMALL PET FOOD (4 items) ---
  {
    id: 'food-small-rabbit',
    name: 'Rabbit Food',
    description: 'High fiber Timothy hay pellets with sweet carrot bits for healthy digestion.',
    price: 299,
    rating: 4.8,
    reviewsCount: 110,
    category: 'food',
    subcategory: 'Small Pet Food',
    image: 'https://images.unsplash.com/photo-1615678815958-5910c6811c25?w=500&auto=format&fit=crop&q=80',
    stock: 24,
    tags: ['Rabbit', 'Timothy-Hay', 'Fibers']
  },
  {
    id: 'food-small-hamster',
    name: 'Hamster Food',
    description: 'Diverse seed, nut and fruit medley tailored for active burrowing hamsters.',
    price: 179,
    rating: 4.6,
    reviewsCount: 82,
    category: 'food',
    subcategory: 'Small Pet Food',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80',
    stock: 35,
    tags: ['Hamster', 'Nuts', 'Medley']
  },
  {
    id: 'food-small-guineapig',
    name: 'Guinea Pig Food',
    description: 'Vitamin C fortified pellet diet block formulation to support guinea pig health.',
    price: 269,
    rating: 4.7,
    reviewsCount: 75,
    category: 'food',
    subcategory: 'Small Pet Food',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80',
    stock: 20,
    tags: ['Guinea-Pig', 'Vitamin-C', 'Pellets']
  },
  {
    id: 'food-small-turtle',
    name: 'Turtle Food',
    description: 'Floating calcium calcium-rich sticks that help construct strong shells.',
    price: 239,
    rating: 4.5,
    reviewsCount: 56,
    category: 'food',
    subcategory: 'Small Pet Food',
    image: 'https://images.unsplash.com/photo-1525900184423-ed21b9623838?w=500&auto=format&fit=crop&q=80',
    stock: 19,
    tags: ['Turtle', 'Sticks', 'Calcium']
  }
];

// Pet Accessories Section items:
export const PET_ACCESSORIES: Product[] = [
  // --- ROW 1 (6 items) ---
  {
    id: 'acc-collars',
    name: 'Collars',
    description: 'Chic, premium blue hand-stitched leather dog collar with metallic security buckle.',
    price: 299,
    rating: 4.8,
    reviewsCount: 142,
    category: 'accessory',
    subcategory: 'Collars',
    image: 'https://images.unsplash.com/photo-1591584530633-6a548bb4ff4b?w=400&auto=format&fit=crop&q=80',
    stock: 50,
    tags: ['Collar', 'Leather', 'Luxury']
  },
  {
    id: 'acc-leashes',
    name: 'Leashes',
    description: 'Ergonomic easy grip braided nylon retrieval dog control leash.',
    price: 399,
    rating: 4.7,
    reviewsCount: 96,
    category: 'accessory',
    subcategory: 'Leashes',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&auto=format&fit=crop&q=80',
    stock: 45,
    tags: ['Leash', 'Nylon', 'Ergonomic']
  },
  {
    id: 'acc-harnesses',
    name: 'Harnesses',
    description: 'Adjustably padded anti-pull outdoor supportive harness vest structure.',
    price: 599,
    rating: 4.9,
    reviewsCount: 160,
    category: 'accessory',
    subcategory: 'Harnesses',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&auto=format&fit=crop&q=80',
    stock: 30,
    tags: ['Harness', 'Anti-Pull', 'Outdoor']
  },
  {
    id: 'acc-carriers',
    name: 'Pet Carriers',
    description: 'Heavy duty airline approved travel crate with wire mesh security door.',
    price: 999,
    rating: 4.6,
    reviewsCount: 78,
    category: 'accessory',
    subcategory: 'Pet Carriers',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400&auto=format&fit=crop&q=80',
    stock: 14,
    tags: ['Carrier', 'Travel', 'Airline-Approved']
  },
  {
    id: 'acc-beds',
    name: 'Pet Beds',
    description: 'Orthopedic pressure-relieving memory foam soft pet bed.',
    price: 1499,
    rating: 4.9,
    reviewsCount: 245,
    category: 'accessory',
    subcategory: 'Pet Beds',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?w=400&auto=format&fit=crop&q=80',
    stock: 12,
    tags: ['Bed', 'Memory-Foam', 'Orthopedic']
  },
  {
    id: 'acc-bowls',
    name: 'Pet Bowls',
    description: 'Rust-resistant double coated stainless steel food and water bowl.',
    price: 249,
    rating: 4.8,
    reviewsCount: 185,
    category: 'accessory',
    subcategory: 'Pet Bowls',
    image: 'https://images.unsplash.com/photo-1576201835787-098848c613dd?w=400&auto=format&fit=crop&q=80',
    stock: 60,
    tags: ['Bowl', 'Stainless-Steel', 'Double-Coated']
  },

  // --- ROW 2 (7 items) ---
  {
    id: 'acc-feedingstands',
    name: 'Feeding Stands',
    description: 'Beautifully crafted elevated mahogany bamboo wood frame with dual stainless bowls.',
    price: 799,
    rating: 4.8,
    reviewsCount: 84,
    category: 'accessory',
    subcategory: 'Feeding Stands',
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&auto=format&fit=crop&q=80',
    stock: 15,
    tags: ['Stand', 'Wooden', 'Elevated']
  },
  {
    id: 'acc-cages',
    name: 'Cages',
    description: 'Spacious black protective wire steel pet cage playing playpen.',
    price: 1199,
    rating: 4.7,
    reviewsCount: 62,
    category: 'accessory',
    subcategory: 'Cages',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&auto=format&fit=crop&q=80',
    stock: 10,
    tags: ['Cage', 'Steel', 'Spacious']
  },
  {
    id: 'acc-aquariums',
    name: 'Aquariums',
    description: 'Frameless glass fish tank with LED filter pump system landscape kit.',
    price: 2999,
    rating: 4.8,
    reviewsCount: 54,
    category: 'accessory',
    subcategory: 'Aquariums',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&auto=format&fit=crop&q=80',
    stock: 8,
    tags: ['Aquarium', 'Glass', 'LED']
  },
  {
    id: 'acc-terrariums',
    name: 'Terrariums',
    description: 'Voguish geometric brass framed indoor reptile/plant glass terrarium.',
    price: 899,
    rating: 4.7,
    reviewsCount: 46,
    category: 'accessory',
    subcategory: 'Terrariums',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=400&auto=format&fit=crop&q=80',
    stock: 12,
    tags: ['Terrarium', 'Geometric', 'Indoor']
  },
  {
    id: 'acc-litterboxes',
    name: 'Litter Boxes',
    description: 'Fully hooded top entry odor-locking hygienic kitty litter tray box.',
    price: 699,
    rating: 4.8,
    reviewsCount: 114,
    category: 'accessory',
    subcategory: 'Litter Boxes',
    image: 'https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=400&auto=format&fit=crop&q=80',
    stock: 16,
    tags: ['Litter-Box', 'Hooded', 'Odor-Lock']
  },
  {
    id: 'acc-brushes',
    name: 'Grooming Brushes',
    description: 'Gentle deshedding slicker brush with self-cleaning eject button.',
    price: 299,
    rating: 4.9,
    reviewsCount: 182,
    category: 'accessory',
    subcategory: 'Grooming Brushes',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&auto=format&fit=crop&q=80',
    stock: 35,
    tags: ['Brush', 'Deshedding', 'Self-Cleaning']
  },
  {
    id: 'acc-combs',
    name: 'Grooming Combs',
    description: 'Static-free steel dual-spacing professional dog and cat grooming hair comb.',
    price: 199,
    rating: 4.7,
    reviewsCount: 93,
    category: 'accessory',
    subcategory: 'Grooming Combs',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&auto=format&fit=crop&q=80',
    stock: 40,
    tags: ['Comb', 'Steel', 'Static-Free']
  }
];

// Compiled ALL_PRODUCTS flat list:
export const ALL_PRODUCTS: Product[] = [...PET_FOODS, ...PET_ACCESSORIES];

// Grooming Stylishs options list:
export interface GroomingStyle {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
}

export const GROOMING_STYLES: GroomingStyle[] = [
  {
    id: 'groom-teddy',
    name: 'Teddy Cut',
    subtitle: 'Fluffy & cute look',
    price: 799,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'groom-lion',
    name: 'Lion Cut',
    subtitle: 'Stylish lion style',
    price: 899,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'groom-puppy',
    name: 'Puppy Cut',
    subtitle: 'Neat & clean look',
    price: 699,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'groom-poodle',
    name: 'Poodle Cut',
    subtitle: 'Classic poodle style',
    price: 999,
    image: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'groom-summer',
    name: 'Summer Cut',
    subtitle: 'Cool & short style',
    price: 749,
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'groom-asian',
    name: 'Asian Fusion Cut',
    subtitle: 'Trendy asian style',
    price: 999,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'groom-creative',
    name: 'Creative Color Style',
    subtitle: 'Color & trendy look',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'groom-show',
    name: 'Show Style Cut',
    subtitle: 'Perfect for shows',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?w=500&auto=format&fit=crop&q=80'
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    petPhoto: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=150&auto=format&fit=crop&q=80',
    author: 'Elena Rostova',
    petName: 'Milo',
    petBreed: 'Toy Poodle',
    reviewText: 'My poodle milo loves the new Teddy Cut! Highly anti-anxiety and completely painless. Recommend to everyone!',
    rating: 5,
    date: '2026-05-18',
    isVerified: true
  }
];

export const COUPONS: Coupon[] = [
  { code: 'PARADISE20', discountType: 'percentage', value: 20, description: '20% off entire order' },
  { code: 'WOOFGROW', discountType: 'fixed', value: 200, description: '₹200 flat discount' }
];

export interface GalleryItem {
  id: string;
  category: 'all' | 'Dogs' | 'Cats' | 'Birds' | 'Fish' | 'Grooming' | 'Happy Families';
  url: string;
  title: string;
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'gal-1', category: 'Dogs', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500', title: 'Happy Golden', caption: 'Playful retriever puppy' }
];

export const GROOMING_SERVICES: GroomingService[] = [
  {
    id: 'gro-ser-1',
    name: 'Standard Bath',
    petType: 'dog',
    description: 'Fresh bath treatment',
    duration: '1 hr',
    price: 1199,
    benefits: ['Clean hair'],
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500'
  }
];

export const PREMIUM_PACKAGES: PremiumPackage[] = [
  {
    id: 'pack-1',
    name: 'Royal Spa Pack',
    price: 1999,
    duration: '2 hrs',
    description: 'Ultimate body care package',
    inclusions: ['Premium wash'],
    badge: 'Best Value',
    colorClass: 'bg-violet-500'
  }
];
