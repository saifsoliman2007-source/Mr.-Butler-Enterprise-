/**
 * Mr. Butler Enterprise API Client
 * Facilitates typed communication between the React frontend and the Express backend.
 */

export interface ServiceItem {
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

export interface OrderItem {
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

export interface ConciergeOffer {
  id: string;
  title: string;
  titleAr: string;
  code: string;
  discount: string;
  description: string;
  descriptionAr: string;
  validUntil: string;
  tier: string;
}

export interface AIChatResponse {
  success: boolean;
  text: string;
  mode: string;
  proposedAction?: {
    id: string;
    type: 'schedule_valet' | 'add_garments' | 'apply_privilege' | 'request_tailor';
    title: string;
    description: string;
    financialImpact: string;
    targetScreen?: string;
    status: 'pending' | 'confirmed' | 'rejected';
  };
  model?: string;
  fallback?: boolean;
  timestamp: string;
}

/**
 * Health Check API
 */
export async function getBackendHealth() {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend health check error:', err);
    return { status: 'offline', error: String(err) };
  }
}

/**
 * Fetch Services Catalog
 */
export async function getServices(category?: string): Promise<ServiceItem[]> {
  try {
    const url = category ? `/api/services?category=${encodeURIComponent(category)}` : '/api/services';
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.services || [];
  } catch (err) {
    console.warn('Error fetching services:', err);
    return [];
  }
}

/**
 * Fetch Active Orders
 */
export async function getOrders(): Promise<OrderItem[]> {
  try {
    const res = await fetch('/api/orders');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.orders || [];
  } catch (err) {
    console.warn('Error fetching orders:', err);
    return [];
  }
}

/**
 * Create New Valet Booking Order
 */
export async function createOrder(payload: {
  serviceId: string;
  customerName?: string;
  roomOrResidence?: string;
  specialInstructions?: string;
}): Promise<{ success: boolean; order?: OrderItem; error?: string }> {
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to create order' };
  }
}

/**
 * Update Order Status
 */
export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return await res.json();
  } catch (err) {
    console.warn('Error updating order status:', err);
    return { success: false };
  }
}

/**
 * Fetch Concierge Offers
 */
export async function getConciergeOffers(): Promise<ConciergeOffer[]> {
  try {
    const res = await fetch('/api/concierge/offers');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.offers || [];
  } catch (err) {
    console.warn('Error fetching concierge offers:', err);
    return [];
  }
}

/**
 * Send AI Message to Backend (Gemini-backed)
 */
export async function sendAIChat(payload: {
  query: string;
  mode?: string;
  language?: string;
}): Promise<AIChatResponse> {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err: any) {
    console.warn('AI Chat API call encountered error:', err);
    return {
      success: false,
      text: payload.language === 'ar'
        ? 'عذراً، يواجه نظام المساعد الذكي تحدياً مؤقتاً في الاتصال. سنكون في خدمتك مجدداً خلال لحظات.'
        : 'Our intelligent concierge is currently undergoing synchronized maintenance. We remain at your service.',
      mode: payload.mode || 'recommend',
      fallback: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
}
