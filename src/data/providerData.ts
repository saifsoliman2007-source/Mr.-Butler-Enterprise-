import { ProviderOrder, ProviderBusinessProfile, ProviderMessage, OrderStatus, CourierStatus } from '../types';

export const INITIAL_PROVIDER_PROFILE: ProviderBusinessProfile = {
  businessName: 'Royal Silk Cleaners & Master Tailors',
  crNumber: 'CR-1010489271',
  businessAddress: '742 Enterprise Boulevard, Olaya District, Suite 400',
  serviceCategory: 'Laundry & Dry Cleaning',
  contactPerson: 'Master Artisan Pierre Dubois',
  phone: '+966 50 892 4110',
  email: 'concierge@royalsilk-butler.com',
  operatingHours: '08:00 AM - 10:00 PM (Sat - Thu)',
  serviceAreas: [
    'Downtown Central',
    'Al Olaya Financial District',
    'Diplomatic Quarter',
    'Palm Gardens',
    'Al Nakheel Heights'
  ],
  pickupDeliveryAvailable: true,
  basePricing: 45,
  verified: true,
  description: 'Certified Mr. Butler Master Valet establishment specializing in eco-solvent dry cleaning, cashmere care, bespoke tuxedo alterations, and handcrafted leather goods maintenance.',
  rating: 4.98,
  totalOrders: 342
};

export const INITIAL_PROVIDER_ORDERS: ProviderOrder[] = [
  {
    id: 'ord-1',
    orderNumber: 'ORD-9401',
    customerName: 'Lord Alistair Sterling',
    customerPhone: '+966 55 123 9988',
    customerEmail: 'sterling@estate-holdings.com',
    customerAddress: 'Villa 14, Royal Palm Compound, Gate 2',
    customerDistrict: 'Diplomatic Quarter',
    category: 'Laundry & Dry Cleaning',
    serviceTitle: 'Bespoke Tuxedo & Silk Gown Steam Clean',
    items: [
      { id: 'item-1', name: 'Italian Wool 3-Piece Tuxedo', quantity: 1, price: 95, notes: 'Delicate lapel silk satin' },
      { id: 'item-2', name: 'Mulberry Silk Evening Gown', quantity: 1, price: 85, notes: 'Hand-sewn beadwork on bodice' },
      { id: 'item-3', name: 'Egyptian Cotton Dress Shirts', quantity: 3, price: 45, notes: 'French cuff starch medium' }
    ],
    requestedDateTime: 'Today, 04:30 PM',
    deliveryRequirement: 'Valet Pickup & Delivery',
    courierStatus: 'Awaiting Pickup',
    estimatedPrice: 225,
    customerNotes: 'Please ensure cedar wood coat hangers and breathable garment bags. Preparing for state gala tomorrow night.',
    uploadedImages: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&auto=format&fit=crop&q=80'
    ],
    status: 'NEW',
    statusHistory: [
      { status: 'NEW', timestamp: '12 mins ago', note: 'Order placed by Lord Sterling via Butler VIP Concierge' }
    ],
    specialInstructions: 'VIP Priority Service. Handle silk lapels with zero-pressure eco steam.',
    aiSummary: 'High-value gala garment bundle. 3 items with fragile beadwork and silk satin. Priority turnaround requested.',
    aiDefectObservation: 'Subtle water stain spotted near hemline of silk gown; recommend organic ultrasonic spot cleaning prior to steam bath.',
    aiSuggestedPricing: 225,
    aiSuggestedResponse: 'Good afternoon Lord Sterling. We have reviewed your gala garments and our Master Cleaner will personally supervise the ultrasonic steam treatment.',
    unreadMessages: 1
  },
  {
    id: 'ord-2',
    orderNumber: 'ORD-9402',
    customerName: 'Lady Catherine Vance',
    customerPhone: '+966 50 443 2190',
    customerEmail: 'catherine.vance@vance-corp.com',
    customerAddress: 'Penthouse 42B, Al Faisaliah Tower Residences',
    customerDistrict: 'Al Olaya Financial District',
    category: 'Tailoring',
    serviceTitle: 'Savile Row Suit Tapering & Hem Adjustment',
    items: [
      { id: 'item-4', name: 'Double-Breasted Cashmere Blazer', quantity: 1, price: 110, notes: 'Taper waist 1.5 inches' },
      { id: 'item-5', name: 'Pleated Wool Trousers', quantity: 2, price: 60, notes: 'Shorten hem by 2cm, blind stitch' }
    ],
    requestedDateTime: 'Today, 06:00 PM',
    deliveryRequirement: 'Valet Pickup & Delivery',
    courierStatus: 'Picked Up',
    estimatedPrice: 170,
    customerNotes: 'Measurements were taken during last month fitting. Keep excess fabric inside seams.',
    uploadedImages: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80'
    ],
    status: 'ACCEPTED',
    statusHistory: [
      { status: 'NEW', timestamp: '1 hour ago', note: 'Order submitted' },
      { status: 'ACCEPTED', timestamp: '35 mins ago', note: 'Accepted by Artisan Master Pierre' }
    ],
    specialInstructions: 'Use horn buttons and pure silk lining thread.',
    aiSummary: 'Precision tailoring for repeat VIP client. Waist reduction and cuff hemming.',
    aiSuggestedResponse: 'Greetings Lady Catherine, we have received your garments and will adhere strictly to your tailored measurement profile.',
    unreadMessages: 0
  },
  {
    id: 'ord-3',
    orderNumber: 'ORD-9398',
    customerName: 'His Excellency Tariq Al-Mansoor',
    customerPhone: '+966 54 990 1122',
    customerEmail: 'tariq.mansoor@ambassador.gov',
    customerAddress: 'Palace Compound 7, Embassy Row',
    customerDistrict: 'Diplomatic Quarter',
    category: 'Shoe Fix & Repair',
    serviceTitle: 'Artisan Oxford Patina Restoration & Vibram Resole',
    items: [
      { id: 'item-6', name: 'John Lobb Calfskin Oxford Shoes', quantity: 1, price: 140, notes: 'Burgundy antique mirror shine' },
      { id: 'item-7', name: 'Berluti Leather Loafers', quantity: 1, price: 90, notes: 'Heel edge burnish & conditioning' }
    ],
    requestedDateTime: 'Tomorrow, 10:00 AM',
    deliveryRequirement: 'Valet Pickup & Delivery',
    courierStatus: 'In Service',
    estimatedPrice: 230,
    customerNotes: 'Deep scratch on the right toe cap needs leather filler and color match.',
    uploadedImages: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&auto=format&fit=crop&q=80'
    ],
    status: 'IN_PROGRESS',
    statusHistory: [
      { status: 'NEW', timestamp: 'Yesterday, 02:00 PM' },
      { status: 'ACCEPTED', timestamp: 'Yesterday, 02:30 PM' },
      { status: 'CONFIRMED', timestamp: 'Yesterday, 03:00 PM' },
      { status: 'IN_PROGRESS', timestamp: 'Today, 09:00 AM', note: 'Cobbler artisan applying French beeswax nourish' }
    ],
    specialInstructions: 'Hand-burnished toe box; apply Saphir Medaille d’Or cream.',
    aiSummary: 'Luxury footwear restoration with toe cap scratch repair.',
    aiDefectObservation: 'Toe cap abrasion requires 3 layers of pigment emulsion before high-gloss spit shine.',
    aiSuggestedPricing: 230,
    unreadMessages: 2
  },
  {
    id: 'ord-4',
    orderNumber: 'ORD-9390',
    customerName: 'Countess Elena Rostova',
    customerPhone: '+966 56 321 0099',
    customerEmail: 'elena@rostova-atelier.com',
    customerAddress: 'Penthouse 12, Kingdom Tower Sky Suites',
    customerDistrict: 'Al Olaya Financial District',
    category: 'Beauty Salon',
    serviceTitle: 'At-Home Caviar Hair Spa & Parisian Blowout',
    items: [
      { id: 'item-8', name: 'Deep Restorative Caviar Hair Ritual', quantity: 1, price: 180, notes: 'Organic Keratin & Argon serum' },
      { id: 'item-9', name: 'Couture Styling & Makeup Session', quantity: 1, price: 150, notes: 'Natural dewy finish' }
    ],
    requestedDateTime: 'Today, 02:00 PM',
    deliveryRequirement: 'In-Store Dropoff',
    estimatedPrice: 330,
    customerNotes: 'Master Stylist Nicole requested.',
    status: 'CONFIRMED',
    statusHistory: [
      { status: 'NEW', timestamp: 'Yesterday' },
      { status: 'ACCEPTED', timestamp: 'Yesterday' },
      { status: 'CONFIRMED', timestamp: 'Yesterday', note: 'Stylist kit sterilized and assigned' }
    ],
    specialInstructions: 'Allergies: zero synthetic fragrances. Use certified biodynamic products.',
    aiSummary: 'Premium salon appointment confirmed for 2:00 PM with master stylist.',
    unreadMessages: 0
  },
  {
    id: 'ord-5',
    orderNumber: 'ORD-9385',
    customerName: 'Sir Arthur Pendelton',
    customerPhone: '+966 50 119 4433',
    customerEmail: 'arthur@pendelton-equestrian.com',
    customerAddress: 'Mansion 3, Al Nakheel Heights',
    customerDistrict: 'Al Nakheel Heights',
    category: 'Pet Care',
    serviceTitle: 'Royal Poodle Spa Bath, Styling & Dental Care',
    items: [
      { id: 'item-10', name: 'Full Canine Hydrotherapy Bath & Scissor Cut', quantity: 1, price: 120 },
      { id: 'item-11', name: 'Ultrasonic Teeth Whitening & Paw Balm', quantity: 1, price: 65 }
    ],
    requestedDateTime: 'Today, 11:30 AM',
    deliveryRequirement: 'Valet Pickup & Delivery',
    courierStatus: 'Ready',
    estimatedPrice: 185,
    customerNotes: 'Champion Show Poodle “Barnaby”. Very friendly temperament.',
    uploadedImages: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=80'
    ],
    status: 'READY',
    statusHistory: [
      { status: 'NEW', timestamp: 'Yesterday' },
      { status: 'ACCEPTED', timestamp: 'Yesterday' },
      { status: 'CONFIRMED', timestamp: 'Yesterday' },
      { status: 'IN_PROGRESS', timestamp: 'Today, 08:30 AM' },
      { status: 'READY', timestamp: 'Today, 11:00 AM', note: 'Grooming finished, awaiting valet return vehicle' }
    ],
    specialInstructions: 'Lavender calming mist applied during blow dry.',
    aiSummary: 'Pet spa service completed. Ready for VIP climate-controlled transit.',
    unreadMessages: 0
  },
  {
    id: 'ord-6',
    orderNumber: 'ORD-9372',
    customerName: 'Dr. Faisal Al-Sabah',
    customerPhone: '+966 55 881 2233',
    customerEmail: 'faisal@medical-center.org',
    customerAddress: 'Building 18, North Medical Villas',
    customerDistrict: 'Downtown Central',
    category: 'Laundry & Dry Cleaning',
    serviceTitle: 'Medical Lab Coat & Linen Sanitization',
    items: [
      { id: 'item-12', name: 'Antimicrobial Steam Pressed Lab Coats', quantity: 5, price: 75 },
      { id: 'item-13', name: 'Egyptian Cotton Scrubs', quantity: 4, price: 40 }
    ],
    requestedDateTime: 'Yesterday, 05:00 PM',
    deliveryRequirement: 'Valet Pickup & Delivery',
    courierStatus: 'Delivered',
    estimatedPrice: 115,
    status: 'COMPLETED',
    statusHistory: [
      { status: 'NEW', timestamp: '2 days ago' },
      { status: 'ACCEPTED', timestamp: '2 days ago' },
      { status: 'CONFIRMED', timestamp: '2 days ago' },
      { status: 'IN_PROGRESS', timestamp: 'Yesterday, 09:00 AM' },
      { status: 'READY', timestamp: 'Yesterday, 02:00 PM' },
      { status: 'OUT_FOR_DELIVERY', timestamp: 'Yesterday, 04:00 PM' },
      { status: 'COMPLETED', timestamp: 'Yesterday, 05:15 PM', note: 'Delivered and verified by client signature' }
    ],
    unreadMessages: 0
  },
  {
    id: 'ord-7',
    orderNumber: 'ORD-9366',
    customerName: 'Baroness Sophia Von Berg',
    customerPhone: '+966 54 229 8811',
    customerEmail: 'sophia@vonberg.ch',
    customerAddress: 'Suite 901, Four Seasons Residences',
    customerDistrict: 'Downtown Central',
    category: 'Tailoring',
    serviceTitle: 'Evening Dress Zips & Hem Rework',
    items: [
      { id: 'item-14', name: 'Vintage Sequin Gown Zip Replacement', quantity: 1, price: 70 }
    ],
    requestedDateTime: '3 days ago',
    deliveryRequirement: 'In-Store Dropoff',
    estimatedPrice: 70,
    status: 'CANCELLED',
    statusHistory: [
      { status: 'NEW', timestamp: '3 days ago' },
      { status: 'CANCELLED', timestamp: '3 days ago', note: 'Client rescheduled international flight' }
    ],
    unreadMessages: 0
  }
];

export const INITIAL_PROVIDER_MESSAGES: Record<string, ProviderMessage[]> = {
  'ord-1': [
    {
      id: 'msg-1',
      orderId: 'ord-1',
      sender: 'customer',
      senderName: 'Lord Alistair Sterling',
      content: 'Good day. Please take special note of the silk lining on the tux.',
      translatedContent: 'طاب يومكم. يرجى أخذ الحيطة والحذر الشديد لبطانة الحرير في بدلة التوكسيدو.',
      timestamp: '15 mins ago'
    },
    {
      id: 'msg-2',
      orderId: 'ord-1',
      sender: 'provider',
      senderName: 'Master Artisan Pierre',
      content: 'Understood my Lord. Our certified master dry-cleaner will oversee the organic solvent cycle personally.',
      translatedContent: 'مفهوم يا سيدي. سيشرف كبير المتخصصين في التنظيف الجاف شخصياً على دورة المذيب العضوي.',
      timestamp: '10 mins ago'
    }
  ],
  'ord-3': [
    {
      id: 'msg-3',
      orderId: 'ord-3',
      sender: 'customer',
      senderName: 'H.E. Tariq Al-Mansoor',
      content: 'Is it possible to complete the shoe mirror polish before my diplomatic reception tomorrow?',
      translatedContent: 'هل يمكن إنهاء تلميع الحذاء الفائق قبل حفل الاستقبال الدبلوماسي غداً؟',
      timestamp: '1 hour ago'
    },
    {
      id: 'msg-4',
      orderId: 'ord-3',
      sender: 'provider',
      senderName: 'Master Cobbler Giovanni',
      content: 'Yes Your Excellency, we are applying the 4th layer of beeswax now. It will be dispatched by 08:00 AM.',
      translatedContent: 'نعم سعادة السفير، نحن نضع الطبقة الرابعة من شمع العسل الآن. وسيتم إرسالها بحلول الثامنة صباحاً.',
      timestamp: '45 mins ago'
    }
  ]
};

/**
 * State Machine Transition Rules
 * NEW -> ACCEPTED -> CONFIRMED -> PICKUP_SCHEDULED -> IN_PROGRESS -> READY -> OUT_FOR_DELIVERY -> COMPLETED
 * Any state before COMPLETED can transition to CANCELLED with a reason.
 */
export const ORDER_STATE_MACHINE: Record<OrderStatus, OrderStatus[]> = {
  NEW: ['ACCEPTED', 'CANCELLED'],
  ACCEPTED: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PICKUP_SCHEDULED', 'IN_PROGRESS', 'CANCELLED'],
  PICKUP_SCHEDULED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['READY', 'CANCELLED'],
  READY: ['OUT_FOR_DELIVERY', 'COMPLETED', 'CANCELLED'],
  OUT_FOR_DELIVERY: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: []
};

export function getNextValidStates(currentStatus: OrderStatus): OrderStatus[] {
  return ORDER_STATE_MACHINE[currentStatus] || [];
}

export function canTransitionOrder(from: OrderStatus, to: OrderStatus): boolean {
  const allowed = ORDER_STATE_MACHINE[from] || [];
  return allowed.includes(to);
}

export function getCourierStatusForOrderStatus(status: OrderStatus): CourierStatus {
  switch (status) {
    case 'NEW':
    case 'ACCEPTED':
      return 'Awaiting Pickup';
    case 'CONFIRMED':
    case 'PICKUP_SCHEDULED':
      return 'Picked Up';
    case 'IN_PROGRESS':
      return 'In Service';
    case 'READY':
      return 'Ready';
    case 'OUT_FOR_DELIVERY':
      return 'Out for Delivery';
    case 'COMPLETED':
      return 'Delivered';
    default:
      return 'Awaiting Pickup';
  }
}
