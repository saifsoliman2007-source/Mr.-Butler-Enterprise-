import React, { useState } from 'react';
import { Language, ScreenId, ProviderOrder, OrderStatus, CourierStatus } from '../../types';
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
  RotateCcw
} from 'lucide-react';

interface ScreenProviderOrderDetailsProps {
  order: ProviderOrder;
  onNavigate: (screen: ScreenId) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  onOpenChat: (orderId: string) => void;
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
  lang,
}) => {
  const t = translations[lang] || translations.en;
  const isRTL = lang === 'ar';

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('Capacity fully booked for requested slot');
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustedPrice, setAdjustedPrice] = useState(order.estimatedPrice);
  const [adjustedTime, setAdjustedTime] = useState(order.requestedDateTime);
  const [customActionToast, setCustomActionToast] = useState('');

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

          {/* Customer Special Notes & Inspection Photos */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088] flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" />
              <span>3. Inspection Photos & Client Instructions</span>
            </h3>

            {order.customerNotes && (
              <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-300">
                <span className="font-bold block mb-1">Client Special Instructions:</span>
                "{order.customerNotes}"
              </div>
            )}

            {order.uploadedImages && order.uploadedImages.length > 0 ? (
              <div className="space-y-2 pt-2">
                <span className="text-xs text-slate-500 font-medium block">
                  Attached Garment / Defect Inspection Images ({order.uploadedImages.length}):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {order.uploadedImages.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(imgUrl)}
                      className="group relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-4/3 cursor-pointer"
                    >
                      <img
                        src={imgUrl}
                        alt={`Inspection asset ${i + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                        Click to expand
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No garment inspection photos attached for this order.</p>
            )}
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
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="relative max-w-2xl w-full bg-white dark:bg-slate-900 rounded-2xl p-2 overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={selectedImage}
              alt="Expanded view"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
            />
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
