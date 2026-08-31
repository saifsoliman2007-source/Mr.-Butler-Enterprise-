import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// -------------------------------------------------------------
// 1. In-Memory Enterprise Data Stores
// -------------------------------------------------------------

interface ServiceItem {
  id: string;
  name: string;
  nameAr: string;
  category: 'dry_cleaning' | 'tailoring' | 'shoe_repair' | 'beauty_salon' | 'pet_care';
  categoryLabel: string;
  basePrice: number;
  currency: string;
  turnaroundTime: string;
  turnaroundTimeAr: string;
  description: string;
  descriptionAr: string;
  badge?: string;
  status: 'available' | 'peak_capacity' | 'waitlist_only';
}

const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'dc-tuxedo',
    name: 'Bespoke Tuxedo & Evening Suit Organic Care',
    nameAr: 'العناية العضوية ببدلات السهرة الرسمية',
    category: 'dry_cleaning',
    categoryLabel: 'Dry Cleaning & Laundry',
    basePrice: 24.00,
    currency: 'USD',
    turnaroundTime: '24 Hours',
    turnaroundTimeAr: '٢٤ ساعة',
    description: 'Eco-friendly liquid silicone solvent treatment with contoured cedar hanger framing.',
    descriptionAr: 'معالجة بمذيبات السيليكون السائل الصديقة للبيئة مع شماعة خشب الأرز المصممة خصيصاً.',
    badge: 'Signature',
    status: 'available'
  },
  {
    id: 'dc-shirt-press',
    name: 'Artisan Executive Shirt Hand Pressing',
    nameAr: 'كي القمصان التنفيذية اليدوي الدقيق',
    category: 'dry_cleaning',
    categoryLabel: 'Dry Cleaning & Laundry',
    basePrice: 8.00,
    currency: 'USD',
    turnaroundTime: '12 Hours',
    turnaroundTimeAr: '١٢ ساعة',
    description: 'Hand-shaped collar stays, mother-of-pearl button inspection, and custom starch tuning.',
    descriptionAr: 'تعديل ياقات القمصان، وفحص أزرار عرق اللؤلؤ، مع ضبط مستوى النشا حسب الطلب.',
    badge: 'Popular',
    status: 'available'
  },
  {
    id: 'tl-suit-fitting',
    name: 'Master Tailor In-Residence Fitting & Alteration',
    nameAr: 'جلسة قياس وتعديل البدلات مع الخياط الحرفي',
    category: 'tailoring',
    categoryLabel: 'Bespoke Tailoring',
    basePrice: 65.00,
    currency: 'USD',
    turnaroundTime: '48 Hours',
    turnaroundTimeAr: '٤٨ ساعة',
    description: 'Private fitting consultation at your penthouse or suite for taper, hem, or waist restructuring.',
    descriptionAr: 'استشارة قياس خاصة في جناحك أو مقر إقامتك لتقصير، تضييق، أو إعادة هيكلة الخصر.',
    badge: 'Artisan',
    status: 'available'
  },
  {
    id: 'sh-patina-revive',
    name: 'Italian Leather Hand-Polished Patina Glaze',
    nameAr: 'تلميع واستعادة رونق وتعتيق الأحذية الإيطالية',
    category: 'shoe_repair',
    categoryLabel: 'Shoe & Leather Care',
    basePrice: 45.00,
    currency: 'USD',
    turnaroundTime: '24 Hours',
    turnaroundTimeAr: '٢٤ ساعة',
    description: 'Deep beeswax hydration, Saphir Médaille d\'Or mirror gloss finish, and cedar shoetrees.',
    descriptionAr: 'ترطيب عميق بشمع العسل الطبيعي وتلميع زجاجي بطبقة سافير الذهبية الفاخرة.',
    badge: 'Luxury',
    status: 'available'
  },
  {
    id: 'bt-executive-groom',
    name: 'Private In-Suite Barbering & Styling Ritual',
    nameAr: 'جلسة حلاقة وتصفيف شعر خاصة في الجناح',
    category: 'beauty_salon',
    categoryLabel: 'Beauty & Grooming',
    basePrice: 55.00,
    currency: 'USD',
    turnaroundTime: 'Instant Scheduling',
    turnaroundTimeAr: 'حجز فوري',
    description: 'Hot eucalyptus towel compress, precision straight razor shave, and organic scalp massage.',
    descriptionAr: 'كمادات منشفة الأوكالبتوس الساخنة، حلاقة بالموس الكلاسيكي وتدليك لفروة الرأس.',
    badge: 'Exclusive',
    status: 'available'
  },
  {
    id: 'pt-royal-groom',
    name: 'Royal Companion Spa & Gentle Grooming',
    nameAr: 'سبا وعناية فاخرة بالحيوانات الأليفة',
    category: 'pet_care',
    categoryLabel: 'Pet Care & Spa',
    basePrice: 40.00,
    currency: 'USD',
    turnaroundTime: 'Same Day',
    turnaroundTimeAr: 'نفس اليوم',
    description: 'Hypoallergenic botanical shampoo, paw balm treatment, and bespoke coat trim.',
    descriptionAr: 'شامبو نباتي مضاد للحساسية، بلسم ترطيب للمخالب، وقص معطف الشعر باحترافية.',
    badge: 'Gentle Care',
    status: 'available'
  }
];

interface Order {
  id: string;
  orderNumber: string;
  serviceId: string;
  serviceName: string;
  category: string;
  customerName: string;
  roomOrResidence: string;
  status: 'valet_dispatched' | 'at_artisan_atelier' | 'quality_inspection' | 'out_for_delivery' | 'delivered' | 'cancelled';
  statusLabel: string;
  statusLabelAr: string;
  price: number;
  currency: string;
  createdAt: string;
  estimatedDelivery: string;
  butlerName: string;
  specialInstructions?: string;
}

let ORDERS_STORE: Order[] = [
  {
    id: 'ord-99482',
    orderNumber: 'MB-99482',
    serviceId: 'dc-tuxedo',
    serviceName: 'Italian Two-Piece Tuxedo Organic Clean',
    category: 'Dry Cleaning',
    customerName: 'Alexander Vance',
    roomOrResidence: 'Penthouse 42B, Palm Jumeirah',
    status: 'out_for_delivery',
    statusLabel: 'Out for Delivery (15 mins)',
    statusLabelAr: 'في طريق التوصيل (١٥ دقيقة)',
    price: 48.00,
    currency: 'USD',
    createdAt: new Date(Date.now() - 3600000 * 22).toISOString(),
    estimatedDelivery: 'Today at 6:30 PM',
    butlerName: 'Butler Charles Montgomery',
    specialInstructions: 'Return in heavy breathable canvas garment bag with light lavender sachet.'
  },
  {
    id: 'ord-99419',
    orderNumber: 'MB-99419',
    serviceId: 'sh-patina-revive',
    serviceName: 'Oxford Calfskin Glaze & Sole Dressing',
    category: 'Shoe Restoration',
    customerName: 'Alexander Vance',
    roomOrResidence: 'Penthouse 42B, Palm Jumeirah',
    status: 'at_artisan_atelier',
    statusLabel: 'At Master Artisan Atelier',
    statusLabelAr: 'في ورشة كبار الحرفيين',
    price: 45.00,
    currency: 'USD',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    estimatedDelivery: 'Tomorrow at 10:00 AM',
    butlerName: 'Valet Jacques Pierre'
  }
];

interface ConciergeRequest {
  id: string;
  title: string;
  category: string;
  details: string;
  submittedAt: string;
  status: 'received' | 'valet_assigned' | 'in_progress' | 'completed';
  assignedButler: string;
}

let CONCIERGE_REQUESTS: ConciergeRequest[] = [
  {
    id: 'req-101',
    title: 'Vintage Chanel Tweed Jacket Preservation',
    category: 'Special Request',
    details: 'Requires hand spot-cleaning and climate-controlled cedar containment.',
    submittedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'valet_assigned',
    assignedButler: 'Senior Valet Edward Hughes'
  }
];

const CONCIERGE_OFFERS = [
  {
    id: 'offer-gala-2026',
    title: 'Spring Gala Season Wardrobe Refresh',
    titleAr: 'تجهيز خزانة موسم الحفلات والفعاليات',
    code: 'IMPERIAL25',
    discount: '25% OFF',
    description: 'Complimentary white-glove pickup and express 12-hour turnaround on 3+ formal pieces.',
    descriptionAr: 'استلام مجاني وتجهيز سريع خلال ١٢ ساعة لأي ٣ قطع رسمية أو أكثر.',
    validUntil: '2026-09-30',
    tier: 'Platinum & Imperial'
  },
  {
    id: 'offer-leather-care',
    title: 'Heritage Leather Shoe Restoration Privilege',
    titleAr: 'ميزة العناية وتلميع الأحذية الجلدية الأصيلة',
    code: 'SAPHIRGLOSS',
    discount: 'Complimentary Glaze',
    description: 'Enjoy free mirror toe polishing with any bespoke sole conditioning booking.',
    descriptionAr: 'احصل على تلميع زجاجي مجاني لمقدمة الحذاء مع أي حجز لترطيب وتجديد النعل.',
    validUntil: '2026-10-15',
    tier: 'All Members'
  }
];

// -------------------------------------------------------------
// 2. Server-Side Gemini AI Client (Lazy Initialized)
// -------------------------------------------------------------
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// -------------------------------------------------------------
// 3. API Routes
// -------------------------------------------------------------

// 3.1 Health Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    system: 'Mr. Butler Enterprise Backend Service',
    version: '2.4.0',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    activeServices: SERVICES_CATALOG.length,
    activeOrdersCount: ORDERS_STORE.length
  });
});

// 3.2 Services Endpoints
app.get('/api/services', (req: Request, res: Response) => {
  const { category } = req.query;
  if (category && typeof category === 'string') {
    const filtered = SERVICES_CATALOG.filter(s => s.category === category);
    return res.json({ services: filtered });
  }
  res.json({ services: SERVICES_CATALOG });
});

app.get('/api/services/:id', (req: Request, res: Response) => {
  const service = SERVICES_CATALOG.find(s => s.id === req.params.id);
  if (!service) {
    return res.status(404).json({ error: 'Service not found in Mr. Butler catalog' });
  }
  res.json({ service });
});

// 3.3 Orders Endpoints
app.get('/api/orders', (req: Request, res: Response) => {
  res.json({ orders: ORDERS_STORE });
});

app.get('/api/orders/:id', (req: Request, res: Response) => {
  const order = ORDERS_STORE.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json({ order });
});

app.post('/api/orders', (req: Request, res: Response) => {
  const { serviceId, customerName, roomOrResidence, specialInstructions } = req.body;
  const service = SERVICES_CATALOG.find(s => s.id === serviceId);

  const orderNum = `MB-${Math.floor(10000 + Math.random() * 90000)}`;
  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    orderNumber: orderNum,
    serviceId: serviceId || 'dc-custom',
    serviceName: service ? service.name : 'Bespoke Valet Order',
    category: service ? service.categoryLabel : 'White Glove Valet',
    customerName: customerName || 'Distinguished Guest',
    roomOrResidence: roomOrResidence || 'Suite 404',
    status: 'valet_dispatched',
    statusLabel: 'Valet Dispatched for Pickup',
    statusLabelAr: 'تم إرسال الخادم للاستلام',
    price: service ? service.basePrice : 24.00,
    currency: 'USD',
    createdAt: new Date().toISOString(),
    estimatedDelivery: 'Tomorrow at 6:00 PM',
    butlerName: 'Butler Charles Montgomery',
    specialInstructions: specialInstructions || ''
  };

  ORDERS_STORE.unshift(newOrder);
  res.status(201).json({ success: true, order: newOrder });
});

app.patch('/api/orders/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  const orderIndex = ORDERS_STORE.findIndex(o => o.id === req.params.id || o.orderNumber === req.params.id);

  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  ORDERS_STORE[orderIndex].status = status;
  res.json({ success: true, order: ORDERS_STORE[orderIndex] });
});

// 3.4 Concierge Endpoints
app.get('/api/concierge/offers', (req: Request, res: Response) => {
  res.json({ offers: CONCIERGE_OFFERS });
});

app.get('/api/concierge/requests', (req: Request, res: Response) => {
  res.json({ requests: CONCIERGE_REQUESTS });
});

app.post('/api/concierge/requests', (req: Request, res: Response) => {
  const { title, category, details } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Request title is required' });
  }

  const newRequest: ConciergeRequest = {
    id: `req-${Date.now()}`,
    title,
    category: category || 'Special Privilege',
    details: details || '',
    submittedAt: new Date().toISOString(),
    status: 'received',
    assignedButler: 'Butler In-Residence Dispatch'
  };

  CONCIERGE_REQUESTS.unshift(newRequest);
  res.status(201).json({ success: true, request: newRequest });
});

// 3.5 AI Assistant & Concierge Route (Server-Side Gemini Integration)
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  const { query, mode = 'recommend', language = 'en', history = [] } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query text is required.' });
  }

  const isRTL = language === 'ar';
  const ai = getAIClient();

  // If Gemini API key is available, generate real AI response
  if (ai) {
    try {
      const systemInstruction = `
You are the prestigious, polished, and impeccably articulate "Mr. Butler AI Concierge", representing the ultra-luxury Mr. Butler Imperial Valet & Concierge enterprise.
You assist distinguished guests with:
1. Garment care, fabric curation, eco-organic solvents, steam vs dry cleaning choices.
2. Bespoke tailoring, cuff & hem adjustments, silhouette styling.
3. Handcrafted leather shoes, patina restoration, Saphir beeswax conditioning.
4. Beauty & grooming rituals, private in-suite styling.
5. Royal pet care & gentle grooming.
6. Translating couture garment tags from French/Italian to English/Arabic.
7. Calculating price estimates and scheduling valet pickup windows.

CRITICAL ENTERPRISE POLICY (MEDS v2.4):
- AI is strictly advisory and safeguarded.
- You must never unilaterally execute financial transactions or bookings.
- If recommending an action, provide clear structured details (action title, description, financial impact, target service).
- Language: If language is 'ar', reply in elegant, courteous Arabic (فصحى راقية). If 'en', reply in refined British English etiquette.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `Mode: ${mode}\nLanguage: ${language}\nUser query: ${query}`,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || '';

      // Determine if a safeguarded action proposal should accompany the response
      let proposedAction: any = null;
      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes('suit') || lowerQuery.includes('tuxedo') || lowerQuery.includes('dry clean') || mode === 'recommend') {
        proposedAction = {
          id: `act-${Date.now()}`,
          type: 'schedule_valet',
          title: isRTL ? 'جدولة استلام بدلة السهرة الفاخرة' : 'Schedule Valet Pickup for Tuxedo',
          description: isRTL ? 'معالجة بمذيبات عضوية خالية من السموم مع شماعة خشبية فاخرة' : 'Includes organic solvent cycle and complimentary contoured cedar hanger.',
          financialImpact: '$24.00',
          targetScreen: 'book_dry_cleaning',
          status: 'pending'
        };
      } else if (lowerQuery.includes('shoe') || lowerQuery.includes('leather') || lowerQuery.includes('polish')) {
        proposedAction = {
          id: `act-${Date.now()}`,
          type: 'request_tailor',
          title: isRTL ? 'جلسة تلميع وترطيب الأحذية الإيطالية' : 'Schedule Saphir Shoe Glaze Valet',
          description: isRTL ? 'ترطيب عميق بشمع العسل مع تلميع زجاجي' : 'Deep beeswax hydration and mirror gloss edge dressing.',
          financialImpact: '$45.00',
          targetScreen: 'book_shoe_repair',
          status: 'pending'
        };
      }

      return res.json({
        success: true,
        text: responseText,
        mode,
        proposedAction,
        model: 'gemini-3.7-flash',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } catch (error: any) {
      console.error('Gemini API execution error:', error?.message || error);
      // Fall through to domain fallback below if API fails
    }
  }

  // Domain Fallback when API key is unconfigured or during offline mode
  let fallbackText = '';
  let fallbackAction: any = null;

  switch (mode) {
    case 'recommend':
      fallbackText = isRTL
        ? 'بناءً على الأقمشة الصيفية الرقيقة (الحرير والكتان)، ننصح بخدمة الكي بالبخار اليدوي بدرجة نشا خفيفة للحفاظ على رونق الياقات.'
        : 'For delicate summer linens and silk garments, our master tailors recommend artisan hand steaming with light starch to protect weave integrity.';
      fallbackAction = {
        id: `act-${Date.now()}`,
        type: 'add_garments',
        title: isRTL ? 'إضافة ٣ قمصان كتان للطلب' : 'Add 3 Linen Dress Shirts to Order',
        description: isRTL ? 'كي يدوي مع ضبط الياقات ومذيبات عضوية' : 'Includes collar stay alignment and non-toxic finish.',
        financialImpact: '$24.00 ($8/shirt)',
        targetScreen: 'book_dry_cleaning',
        status: 'pending'
      };
      break;

    case 'explain':
      fallbackText = isRTL
        ? 'تستخدم منشآتنا مذيبات السيليكون السائل الصديقة للبيئة بدلاً من مادة البيركلوروإيثيلين السامة، مما يحمي ألياف الكشمير بنسبة 100% ويمنع الروائح الكيميائية.'
        : 'Our facility utilizes closed-loop liquid silicone organic solvents instead of harsh perchloroethylene. This guarantees zero fabric shrinkage and leaves garments hypoallergenic.';
      break;

    case 'guide':
      fallbackText = isRTL
        ? 'دليل حجز الخدمة: ١. اختر الملابس من القائمة. ٢. حدد مستوى النشا المطلوب. ٣. اختر الموعد المناسب لخدمة الاستلام.'
        : 'Step-by-Step Valet Guide: 1. Select your couture items. 2. Specify starch preference. 3. Choose your preferred pickup window.';
      fallbackAction = {
        id: `act-${Date.now()}`,
        type: 'schedule_valet',
        title: isRTL ? 'فتح صفحة حجز التنظيف الجاف' : 'Open Dry Cleaning & Laundry Booking',
        description: isRTL ? 'تعبئة مسبقة لعنوان الجناح الافتراضي' : 'Pre-fills with your default residence at Dubai Marina.',
        financialImpact: 'Complimentary White-Glove Collection',
        targetScreen: 'book_dry_cleaning',
        status: 'pending'
      };
      break;

    case 'translate':
      fallbackText = isRTL
        ? 'ترجمة تعليمات الغسيل: "Lavare a secco solo con solventi idrocarburici" تعني "تنظيف جاف فقط باستخدام المذيبات الهيدروكربونية الخفيفة، يُمنع استخدام الماء أو التبييض الكلوري".'
        : 'Couture Tag Translation: "Lavare a secco solo con solventi idrocarburici" translates to "Professional Dry Clean Only with gentle hydrocarbon solvents; do not machine wash or bleach."';
      break;

    case 'assist':
      fallbackText = isRTL
        ? 'حساب التكلفة المقدرة: بدلتان رسميتان ($48) + 4 قمصان ($32) = $80.00 إجمالي. خدمة الاستلام والتوصيل مجانية.'
        : 'Estimate Calculation: 2 Tuxedos ($48) + 4 Executive Shirts ($32) = $80.00 estimated total with complimentary valet dispatch.';
      break;

    case 'summarize':
      fallbackText = isRTL
        ? 'ملخص الطلبات النشطة: طلب #MB-99482 قيد التوصيل الآن بواسطة خادم النبلاء تشارلز. موعد الوصول المتوقع خلال 15 دقيقة.'
        : 'Active Orders Summary: Order #MB-99482 is in transit via Butler Charles Montgomery. Estimated delivery window: 15 minutes.';
      break;

    case 'needs':
    default:
      fallbackText = isRTL
        ? 'تدقيق صحة خزانة الملابس: 4 أزواج من الأحذية الإيطالية بحاجة إلى تلميع وترطيب الجلد قبل تغير الموسم.'
        : 'Wardrobe Health Audit: 4 pairs of handcrafted leather oxfords require seasonal hydration and cedar rest.';
      fallbackAction = {
        id: `act-${Date.now()}`,
        type: 'request_tailor',
        title: isRTL ? 'جدولة استعادة رونق الأحذية الفاخرة' : 'Schedule Shoe Restoration Valet',
        description: isRTL ? 'ترطيب الجلد بشمع النحل وتجديد الحواف' : 'Italian leather beeswax conditioning & edge dressing.',
        financialImpact: '$45.00',
        targetScreen: 'book_shoe_repair',
        status: 'pending'
      };
      break;
  }

  res.json({
    success: true,
    text: fallbackText,
    mode,
    proposedAction: fallbackAction,
    fallback: true,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
});

// -------------------------------------------------------------
// 4. Vite Dev Middleware / Production Static Server Setup
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Mr. Butler Enterprise] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
