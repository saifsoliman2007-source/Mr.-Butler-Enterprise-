import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Tag, 
  Clock, 
  MapPin, 
  CreditCard 
} from 'lucide-react';

export interface BookingSummaryItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface BookingSummaryProps {
  serviceName: string;
  items: BookingSummaryItem[];
  pickupAddress?: string;
  pickupTime?: string;
  conciergeFee?: number;
  taxRate?: number;
  discountAmount?: number;
  promoCode?: string;
  onApplyPromo?: (code: string) => void;
  onProceedToPayment?: () => void;
  isProcessing?: boolean;
  className?: string;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  serviceName,
  items,
  pickupAddress = 'Penthouse Suite 8B, 1007 Mountain Drive',
  pickupTime = 'Today, 04:00 PM - 05:00 PM',
  conciergeFee = 15.00,
  taxRate = 0.05,
  discountAmount = 0,
  promoCode,
  onProceedToPayment,
  isProcessing = false,
  className = ''
}) => {
  const subtotal = items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const tax = (subtotal + conciergeFee - discountAmount) * taxRate;
  const grandTotal = Math.max(0, subtotal + conciergeFee - discountAmount + tax);

  return (
    <div className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#CCA730] uppercase font-bold tracking-wider">
            Booking Breakdown
          </span>
          <h3 className="font-serif text-lg font-bold text-[#00444D] dark:text-white">
            {serviceName}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#CCA730]" />
          <span>White-Glove</span>
        </div>
      </div>

      {/* Appointment Logistics Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-[#00444D] dark:text-[#ABEDFA] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-700 dark:text-slate-200">Pickup Location:</span>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{pickupAddress}</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-[#00444D] dark:text-[#ABEDFA] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-700 dark:text-slate-200">Scheduled Window:</span>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">{pickupTime}</p>
          </div>
        </div>
      </div>

      {/* Itemized Line Items */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Selected Items ({items.length})
        </h4>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {items.map((item) => (
            <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-mono font-bold text-[10px] text-[#00444D] dark:text-[#ABEDFA]">
                  {item.quantity}×
                </span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{item.name}</span>
              </div>
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                ${(item.unitPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Calculation Subtotal / Fees / Discounts */}
      <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div className="flex justify-between text-slate-500 dark:text-slate-400">
          <span>Items Subtotal</span>
          <span className="font-mono text-slate-700 dark:text-slate-300">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-500 dark:text-slate-400">
          <span>Valet Concierge & Chauffeur Fee</span>
          <span className="font-mono text-slate-700 dark:text-slate-300">${conciergeFee.toFixed(2)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              <span>Privilege Discount {promoCode && `(${promoCode})`}</span>
            </span>
            <span className="font-mono">-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-slate-500 dark:text-slate-400">
          <span>Estimated VAT & Municipal Surcharge (5%)</span>
          <span className="font-mono text-slate-700 dark:text-slate-300">${tax.toFixed(2)}</span>
        </div>
        
        {/* Total Highlight */}
        <div className="flex justify-between items-baseline pt-3 border-t border-slate-200 dark:border-slate-700 text-sm font-bold">
          <span className="text-slate-900 dark:text-white">Estimated Grand Total</span>
          <span className="font-serif text-xl text-[#00444D] dark:text-[#FFE088]">
            ${grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* SLA Quality Guarantee Trust Badge */}
      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 bg-[#F0FDF4] dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-3 rounded-xl">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
        <span>Backed by the Mr. Butler 100% Master Garment Inspection Guarantee.</span>
      </div>

      {/* Action Button */}
      {onProceedToPayment && (
        <button
          onClick={onProceedToPayment}
          disabled={isProcessing || items.length === 0}
          className="w-full py-3.5 rounded-xl bg-[#00444D] hover:bg-[#0D5D68] text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
        >
          <CreditCard className="w-4 h-4 text-[#FFE088]" />
          <span>{isProcessing ? 'Authorizing Valet Request...' : 'Proceed to Secure Payment'}</span>
        </button>
      )}
    </div>
  );
};
