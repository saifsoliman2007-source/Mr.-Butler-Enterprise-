import React, { useState } from 'react';
import { Language, ScreenId, ProviderOrder, OrderStatus, CourierStatus, ProviderInspectionPhoto } from '../../types';
import { translations } from '../../data/translations';
import { OrderStatusBadge } from './ScreenProviderDashboard';
import { canTransitionOrder, getNextValidStates, getCourierStatusForOrderStatus } from '../../data/providerData';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Clock, 
  Truck, 
  CheckCircle2, 
  DollarSign, 
  Sparkles, 
  MessageSquare, 
  AlertCircle, 
  Bot, 
  FileText, 
  Camera, 
  Check, 
  X, 
  Send,
  HelpCircle,
  ShieldCheck,
  Building,
  RotateCcw,
  Upload,
  Image as ImageIcon,
  ZoomIn,
  Eye,
  CheckCheck
} from 'lucide-react';

interface ScreenProviderOrderDetailsProps {
  order: ProviderOrder;
  onNavigate: (screen: ScreenId) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  onOpenChat: (orderId: string) => void;
  onAddProviderPhoto?: (orderId: string, photo: ProviderInspectionPhoto) => void;
  lang: Language;
}

const LIFECYCLE_STEPS: { status: OrderStatus; label: string }[] = [
  { status: 'NEW', label: 'New Booking' },
  { status: 'ACCEPTED', label: 'Accepted' },
  { status: 'CONFIRMED', label: 'Confirmed' },
  { status: 'IN_PROGRESS', label: 'In-Service' },
  { status: 'READY', label: 'Ready' },
  { status: 'OUT_FOR_DELIVERY', label: 'Out For Delivery' },
  { status: 'COMPLETED', label: 'Completed' },
];

export const ScreenProviderOrderDetails: React.FC<ScreenProviderOrderDetailsProps> = ({
  order,
  onNavigate,
  onUpdateOrderStatus,
  onOpenChat,
  onAddProviderPhoto,
  lang,
}) => {
  const t = translations[lang] || translations.en;
  const isRTL = lang === 'ar';

  const [selectedImage, setSelectedImage] = useState<{ url: string; caption?: string; stage?: string; sender?: string } | null>(null);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('Capacity fully booked for requested slot');
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustedPrice, setAdjustedPrice] = useState(order.estimatedPrice);
  const [adjustedTime, setAdjustedTime] = useState(order.requestedDateTime);
  const [customActionToast, setCustomActionToast] = useState('');

  // Provider Photo Upload / Send State
  const [showSendPhotoModal, setShowSendPhotoModal] = useState(false);
  const [photoStage, setPhotoStage] = useState<ProviderInspectionPhoto['stage']>('In-Progress Work');
  const [photoCaption, setPhotoCaption] = useState('');
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState('');
  const [localProviderPhotos, setLocalProviderPhotos] = useState<ProviderInspectionPhoto[]>(order.providerUploadedImages || []);

  // Category specific preset artisan photos for demo/quick selection
  const getCategoryPresets = () => {
    switch (order.category) {
      case 'Laundry & Dry Cleaning':
        return [
          {
            label: 'Ultrasonic Spot Wand Treatment',
            url: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Delicate stain lifted via ultrasonic eco-solvent treatment'
          },
          {
            label: 'Steam Hand-Pressing',
            url: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Zero-pressure steam pressing applied to silk lapels'
          },
          {
            label: 'Garment Valet Packaging',
            url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Cedar hanger and breathable garment bag sealed for dispatch'
          }
        ];
      case 'Tailoring':
        return [
          {
            label: 'Chalk Line Basting & Pinning',
            url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Waist taper pinned according to bespoke measurement profile'
          },
          {
            label: 'Precision Seam Stitching',
            url: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Silk thread blind stitch applied to wool trouser cuffs'
          },
          {
            label: 'Final Tailored Drape Check',
            url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Blazer silhouette aligned and pressed for delivery'
          }
        ];
      case 'Shoe Fix & Repair':
        return [
          {
            label: 'Leather Nourish & French Cream',
            url: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Saphir Medaille d’Or cream applied to repair toe cap scratch'
          },
          {
            label: 'Artisan Sole Stitching',
            url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Vibram protective layer attached with Goodyear welt stitch'
          },
          {
            label: 'High-Gloss Spit Shine Polish',
            url: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Mirror gloss patina buffed and waterproofed'
          }
        ];
      case 'Beauty Salon':
        return [
          {
            label: 'Sanitized Stylist Station & Kit',
            url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Biodynamic ampoules and sanitized tools prepared for suite visit'
          },
          {
            label: 'In-Progress Blowout & Styling',
            url: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Volumizing caviar mask and Parisian wave styling in progress'
          },
          {
            label: 'Completed Bespoke Style Look',
            url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Finished haircut and styling matched to client reference photo'
          }
        ];
      case 'Pet Care':
        return [
          {
            label: 'Hydrotherapy Bubble Bath',
            url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Hypoallergenic lavender spa bath and conditioning rinse'
          },
          {
            label: 'Scissor Cut & Paw Care',
            url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Precision breed scissor trim and paw balm applied'
          },
          {
            label: 'Groomed & Ready for Valet Return',
            url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Full grooming complete, awaiting climate-controlled valet transit'
          }
        ];
      default:
        return [
          {
            label: 'Inspection Standard Asset',
            url: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&auto=format&fit=crop&q=80',
            defaultCaption: 'Artisan service inspection record'
          }
        ];
    }
  };

  const getCategoryPhotoTitle = () => {
    switch (order.category) {
      case 'Laundry & Dry Cleaning':
        return 'Garment Condition & Care Label Photos (Received from Client)';
      case 'Tailoring':
        return 'Fit & Alteration Reference Photos (Received from Client)';
      case 'Shoe Fix & Repair':
        return 'Footwear Wear & Sole Damage Photos (Received from Client)';
      case 'Beauty Salon':
        return 'Hair & Style Inspiration Photos (Received from Client)';
      case 'Pet Care':
        return 'Pet Profile & Grooming Reference (Received from Client)';
      default:
        return 'Item Photos (Received from Client)';
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setSelectedPhotoUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendPhotoSubmit = () => {
    if (!selectedPhotoUrl) return;

    const newPhoto: ProviderInspectionPhoto = {
      id: `p-img-${Date.now()}`,
      url: selectedPhotoUrl,
      caption: photoCaption || `Artisan ${photoStage} record`,
      stage: photoStage,
      timestamp: 'Just now',
      uploadedBy: 'Master Artisan'
    };

    setLocalProviderPhotos(prev => [newPhoto, ...prev]);
    if (onAddProviderPhoto) {
      onAddProviderPhoto(order.id, newPhoto);
    }

    setShowSendPhotoModal(false);
    setSelectedPhotoUrl('');
    setPhotoCaption('');
    setCustomActionToast(`Photo sent to client (${photoStage})`);
    setTimeout(() => setCustomActionToast(''), 3500);
  };

  const currentStepIndex = LIFECYCLE_STEPS.findIndex(s => s.status === order.status);

  const handleStateTransition = (nextStatus: OrderStatus) => {
    onUpdateOrderStatus(order.id, nextStatus);
    setCustomActionToast(`Order status updated to ${nextStatus}`);
    setTimeout(() => setCustomActionToast(''), 3500);
  };

  const handleDeclineSubmit = () => {
    onUpdateOrderStatus(order.id, 'CANCELLED', `Declined by provider: ${declineReason}`);
    setShowDeclineModal(false);
    setCustomActionToast('Order has been declined and client notified.');
    setTimeout(() => setCustomActionToast(''), 3500);
  };

  const handleAdjustSubmit = () => {
    setShowAdjustModal(false);
    setCustomActionToast(`Change proposal sent to client ($${adjustedPrice}, ${adjustedTime})`);
    setTimeout(() => setCustomActionToast(''), 3500);
  };

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#070D18] text-[#1E293B] dark:text-slate-100 flex flex-col p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9E3F6] dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('provider_orders')}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#00444D] dark:text-[#FFE088]" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-[#00444D] dark:text-[#FFE088] bg-[#00444D]/5 dark:bg-[#FFE088]/10 px-2.5 py-0.5 rounded-lg border border-[#00444D]/15 dark:border-[#FFE088]/20">
                {order.orderNumber}
              </span>
              <h1 className="font-serif font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                {order.serviceTitle}
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {order.category} • Client: {order.customerName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <OrderStatusBadge status={order.status} />

          <button
            onClick={() => onOpenChat(order.id)}
            className="px-3.5 py-2 rounded-xl bg-[#00444D] text-white hover:bg-[#00333A] font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#FFE088]" />
            <span>Chat With Client</span>
          </button>
        </div>
      </div>

      {/* Toast Notification if triggered */}
      {customActionToast && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{customActionToast}</span>
        </div>
      )}

      {/* Lifecycle Stepper Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088] flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>Order State Machine Lifecycle</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
          {LIFECYCLE_STEPS.map((step, idx) => {
            const isPast = currentStepIndex > idx;
            const isCurrent = currentStepIndex === idx;
            const isFuture = currentStepIndex < idx;

            return (
              <div
                key={step.status}
                className={`p-2.5 rounded-xl border text-center transition flex flex-col justify-between ${
                  isCurrent
                    ? 'border-[#00444D] bg-[#00444D]/10 dark:border-[#FFE088] dark:bg-[#FFE088]/15 font-bold shadow-xs'
                    : isPast
                    ? 'border-emerald-300 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 font-medium'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  {isPast ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : isCurrent ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00444D] dark:bg-[#FFE088] animate-ping" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                  )}
                </div>
                <span className="text-[11px] leading-tight block">
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Column (Details, Items, Photos) & Right Column (Actions & AI Assistant) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Structured Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Customer Information Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>1. Client Information & Verification</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium">Name:</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {order.customerName}
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                    Verified VIP
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{order.customerPhone}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{order.customerEmail}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">{order.customerDistrict}</span>
                    <span className="text-[11px] text-slate-500">{order.customerAddress}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 pt-1">
                  <Truck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Fulfillment: <strong className="text-slate-800 dark:text-slate-200">{order.deliveryRequirement}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Service Breakdown */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>2. Itemized Service Manifest</span>
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {order.items.map((item, idx) => (
                <div key={item.id || idx} className="py-3 flex items-start justify-between text-xs gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {item.name}
                      </span>
                      <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    {item.notes && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
                        Item note: {item.notes}
                      </p>
                    )}
                  </div>

                  <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Items Subtotal:</span>
                <span className="font-mono">${order.items.reduce((a, b) => a + (b.price * b.quantity), 0)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Valet Concierge Transit:</span>
                <span className="font-mono text-emerald-600">Complimentary Butler Delivery</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#00444D] dark:text-[#FFE088] pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Total Amount:</span>
                <span className="font-mono font-serif text-base">${order.estimatedPrice}</span>
              </div>
            </div>
          </div>

          {/* Customer Special Notes & Two-Way Inspection Photos */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#00444D] dark:text-[#FFE088]" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088]">
                  3. Visual Inspection & Photo Exchange Center
                </h3>
              </div>
              <button
                onClick={() => {
                  setSelectedPhotoUrl(getCategoryPresets()[0]?.url || '');
                  setPhotoCaption(getCategoryPresets()[0]?.defaultCaption || '');
                  setShowSendPhotoModal(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-[#00444D] text-white hover:bg-[#00333A] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs self-start sm:self-auto"
              >
                <Upload className="w-3.5 h-3.5 text-[#FFE088]" />
                <span>Send Photo to Client</span>
              </button>
            </div>

            {order.customerNotes && (
              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <User className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                  <span>Client Special Instructions:</span>
                </div>
                <p className="italic pl-5 font-serif text-[13px]">"{order.customerNotes}"</p>
              </div>
            )}

            {/* Sub-Section 1: Photos Received from Client */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  {getCategoryPhotoTitle()}
                </span>
                <span className="text-[11px] font-mono font-medium text-slate-400">
                  {order.uploadedImages?.length || 0} attached
                </span>
              </div>

              {order.uploadedImages && order.uploadedImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {order.uploadedImages.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage({
                        url: imgUrl,
                        caption: `Client Reference Asset #${i + 1}`,
                        stage: 'Client Intake Upload',
                        sender: order.customerName
                      })}
                      className="group relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-4/3 cursor-pointer shadow-2xs bg-slate-100 dark:bg-slate-800"
                    >
                      <img
                        src={imgUrl}
                        alt={`Client asset ${i + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-2 text-left">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider block">
                          Client Reference #{i + 1}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
                        <ZoomIn className="w-4 h-4" />
                        <span>Inspect</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs text-slate-400 italic">
                  No initial photos uploaded by client at booking.
                </div>
              )}
            </div>

            {/* Sub-Section 2: Photos Sent by Provider / Artisan */}
            <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Artisan Progress & Inspection Records (Sent to Client)</span>
                </span>
                <span className="text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  {localProviderPhotos.length} dispatched
                </span>
              </div>

              {localProviderPhotos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {localProviderPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex gap-3 items-center"
                    >
                      <button
                        onClick={() => setSelectedImage({
                          url: photo.url,
                          caption: photo.caption,
                          stage: photo.stage,
                          sender: photo.uploadedBy
                        })}
                        className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 relative group cursor-pointer"
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <ZoomIn className="w-3.5 h-3.5" />
                        </div>
                      </button>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#00444D] text-white">
                            {photo.stage}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {photo.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-200 font-medium truncate mt-1">
                          {photo.caption}
                        </p>
                        <span className="text-[10px] text-slate-400 block">
                          By: {photo.uploadedBy}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-center space-y-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    No inspection or in-progress photos have been shared with the client yet.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedPhotoUrl(getCategoryPresets()[0]?.url || '');
                      setPhotoCaption(getCategoryPresets()[0]?.defaultCaption || '');
                      setShowSendPhotoModal(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-[#00444D] dark:text-[#FFE088] hover:bg-slate-50 transition cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Send First Progress Photo</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Valet Courier Status Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088] flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              <span>4. Valet Courier & Doorstep Transit Status</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Current Valet Stage</span>
                <span className="font-bold text-sm text-[#00444D] dark:text-[#FFE088]">
                  {order.courierStatus || getCourierStatusForOrderStatus(order.status)}
                </span>
              </div>
              <span className="text-[11px] bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 font-bold px-2.5 py-1 rounded-full border border-sky-200 dark:border-sky-800">
                GPS Valet Tracking Active
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Actions Panel & AI Advisor */}
        <div className="space-y-6">
          
          {/* Action Control Panel */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Order Decision & Action Center</span>
            </h3>

            <div className="space-y-2">
              {order.status === 'NEW' && (
                <>
                  <button
                    onClick={() => handleStateTransition('ACCEPTED')}
                    className="w-full py-3 px-4 rounded-xl bg-[#00444D] text-white font-bold text-xs hover:bg-[#00333A] transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Check className="w-4 h-4 text-[#FFE088]" />
                    <span>Accept Order</span>
                  </button>

                  <button
                    onClick={() => setShowAdjustModal(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Request Schedule / Price Change</span>
                  </button>

                  <button
                    onClick={() => setShowDeclineModal(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Decline Order</span>
                  </button>
                </>
              )}

              {order.status === 'ACCEPTED' && (
                <>
                  <button
                    onClick={() => handleStateTransition('CONFIRMED')}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Order & Schedule</span>
                  </button>
                  <button
                    onClick={() => setShowDeclineModal(true)}
                    className="w-full py-2 px-4 rounded-xl bg-slate-100 text-slate-600 text-xs hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <span>Cancel Order</span>
                  </button>
                </>
              )}

              {order.status === 'CONFIRMED' && (
                <button
                  onClick={() => handleStateTransition('IN_PROGRESS')}
                  className="w-full py-3 px-4 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Artisan In-Progress Service</span>
                </button>
              )}

              {order.status === 'IN_PROGRESS' && (
                <button
                  onClick={() => handleStateTransition('READY')}
                  className="w-full py-3 px-4 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Ready for Valet Dispatch</span>
                </button>
              )}

              {order.status === 'READY' && (
                <button
                  onClick={() => handleStateTransition('OUT_FOR_DELIVERY')}
                  className="w-full py-3 px-4 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>Dispatch Valet Courier</span>
                </button>
              )}

              {order.status === 'OUT_FOR_DELIVERY' && (
                <button
                  onClick={() => handleStateTransition('COMPLETED')}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Delivered & Completed</span>
                </button>
              )}

              {order.status === 'COMPLETED' && (
                <div className="p-3 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                  ✓ Order Fully Completed & Payment Settled
                </div>
              )}

              {order.status === 'CANCELLED' && (
                <div className="p-3 text-center bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-600 font-bold">
                  Order Cancelled
                </div>
              )}
            </div>
          </div>

          {/* AI Assistive Advisor Panel */}
          <div className="p-5 rounded-2xl bg-linear-to-b from-[#003840] to-[#00272D] text-white border border-[#00525E] shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#FFE088]/20 text-[#FFE088]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#FFE088] uppercase tracking-wider">
                  AI Assistive Inspection Advisor
                </h4>
                <p className="text-[11px] text-white/70">Smart Defect & Pricing Observations</p>
              </div>
            </div>

            {order.aiSummary && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Executive Summary</span>
                <p className="text-xs text-white/90 leading-relaxed font-medium">
                  {order.aiSummary}
                </p>
              </div>
            )}

            {order.aiDefectObservation && (
              <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFE088]">Defect Analysis</span>
                <p className="text-xs text-white/90 leading-relaxed">
                  {order.aiDefectObservation}
                </p>
              </div>
            )}

            {order.aiSuggestedResponse && (
              <div className="space-y-2 pt-1 border-t border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Suggested Message to Client</span>
                <p className="text-xs text-slate-200 italic bg-black/20 p-2.5 rounded-lg border border-white/5">
                  "{order.aiSuggestedResponse}"
                </p>
                <button
                  onClick={() => onOpenChat(order.id)}
                  className="w-full py-2 px-3 rounded-lg bg-[#FFE088] text-[#00333A] font-bold text-xs hover:bg-[#FFD768] transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open in Chat & Send</span>
                </button>
              </div>
            )}

            <p className="text-[10px] text-white/50 pt-2 border-t border-white/10">
              * AI is assistive only and cannot bind or modify orders without merchant action.
            </p>
          </div>

        </div>

      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="relative max-w-3xl w-full bg-white dark:bg-slate-900 rounded-2xl p-4 overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#00444D] dark:text-[#FFE088]" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {selectedImage.caption || 'Order Inspection Asset'}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    {selectedImage.stage && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#00444D] text-white">
                        {selectedImage.stage}
                      </span>
                    )}
                    {selectedImage.sender && (
                      <span className="text-[11px] text-slate-400">
                        Uploaded by: {selectedImage.sender}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden bg-black/5 dark:bg-black/40 flex items-center justify-center max-h-[65vh]">
              <img
                src={selectedImage.url}
                alt={selectedImage.caption || 'Expanded view'}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[65vh] object-contain rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              <span>Order Ref: {order.orderNumber}</span>
              <button
                onClick={() => {
                  setSelectedImage(null);
                  onOpenChat(order.id);
                }}
                className="text-[#00444D] dark:text-[#FFE088] font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discuss in Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Photo to Client Modal */}
      {showSendPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="max-w-lg w-full bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#00444D] dark:text-[#FFE088]" />
                <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                  Send Inspection Photo to Client
                </h3>
              </div>
              <button
                onClick={() => setShowSendPhotoModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Service Type Indicator */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-500">Service Category:</span>
              <span className="font-bold text-[#00444D] dark:text-[#FFE088]">{order.category}</span>
            </div>

            {/* Step 1: Select Stage */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                1. Select Inspection / Service Stage
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'Intake Inspection', label: 'Intake Inspection' },
                  { id: 'In-Progress Work', label: 'In-Progress Work' },
                  { id: 'Quality Passed', label: 'Quality Passed' },
                  { id: 'Completed Result', label: 'Completed Result' },
                ].map((stage) => (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setPhotoStage(stage.id as any)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border text-center transition cursor-pointer ${
                      photoStage === stage.id
                        ? 'bg-[#00444D] text-white border-[#00444D]'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {stage.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Photo Source (Upload or Preset) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                2. Select or Upload Artisan Photo
              </label>

              {/* Upload Native File Button */}
              <div className="flex items-center gap-2">
                <label className="flex-1 py-2 px-3 rounded-xl border border-dashed border-[#00444D]/40 dark:border-[#FFE088]/40 hover:bg-[#00444D]/5 dark:hover:bg-[#FFE088]/5 text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 cursor-pointer transition">
                  <Camera className="w-3.5 h-3.5 text-[#00444D] dark:text-[#FFE088]" />
                  <span>Upload Local File / Take Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Quick Artisan Presets */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] text-slate-400 font-medium block">
                  Or select verified artisan demonstration asset:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {getCategoryPresets().map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedPhotoUrl(preset.url);
                        setPhotoCaption(preset.defaultCaption);
                      }}
                      className={`relative rounded-xl overflow-hidden border p-1 text-left flex flex-col gap-1 transition cursor-pointer ${
                        selectedPhotoUrl === preset.url
                          ? 'border-[#00444D] dark:border-[#FFE088] ring-2 ring-[#00444D]/30'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-14 object-cover rounded-lg"
                      />
                      <span className="text-[9px] font-semibold text-slate-700 dark:text-slate-300 leading-tight line-clamp-2">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Photo Caption / Artisan Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                3. Diagnostic Note / Artisan Caption for Client
              </label>
              <textarea
                rows={2}
                value={photoCaption}
                onChange={(e) => setPhotoCaption(e.target.value)}
                placeholder="e.g., Delicate wool lapel steam-pressed and verified..."
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Preview of Selected Photo */}
            {selectedPhotoUrl && (
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                <img
                  src={selectedPhotoUrl}
                  alt="Selected Preview"
                  className="w-12 h-12 rounded-lg object-cover border border-slate-300 dark:border-slate-600 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-emerald-600 block">Ready to send</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 truncate font-medium">
                    {photoCaption || 'No caption entered'}
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowSendPhotoModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!selectedPhotoUrl}
                onClick={handleSendPhotoSubmit}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00444D] text-white hover:bg-[#00333A] disabled:opacity-50 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-[#FFE088]" />
                <span>Send to Client</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decline Order Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
              Decline / Cancel Order
            </h3>
            <p className="text-xs text-slate-500">
              Please choose a reason for declining this order. The client will be politely informed by the Mr. Butler Concierge.
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Reason for Cancellation
              </label>
              <select
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-800"
              >
                <option value="Capacity fully booked for requested slot">Capacity fully booked for requested slot</option>
                <option value="Outside current valet delivery zone">Outside current valet delivery zone</option>
                <option value="Specialized fabric / material beyond current equipment">Specialized material beyond current equipment</option>
                <option value="Emergency maintenance at workshop">Emergency maintenance at workshop</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                onClick={() => setShowDeclineModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Back
              </button>
              <button
                onClick={handleDeclineSubmit}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Adjust Time / Price Modal */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
              Request Change to Booking
            </h3>
            <p className="text-xs text-slate-500">
              Propose an alternative slot or updated rate estimate. Client must approve before booking proceeds.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Proposed Schedule
                </label>
                <input
                  type="text"
                  value={adjustedTime}
                  onChange={(e) => setAdjustedTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Adjusted Price ($ / SAR)
                </label>
                <input
                  type="number"
                  value={adjustedPrice}
                  onChange={(e) => setAdjustedPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                onClick={() => setShowAdjustModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAdjustSubmit}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00444D] text-white hover:bg-[#00333A]"
              >
                Send Proposal to Client
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
