import React from 'react';
import { 
  CheckCircle2, 
  Download, 
  Calendar, 
  Share2, 
  ArrowRight, 
  QrCode, 
  Package, 
  ShieldCheck 
} from 'lucide-react';

export interface ConfirmationPanelProps {
  orderId?: string;
  serviceTitle?: string;
  scheduledTime?: string;
  totalPaid?: string;
  customerName?: string;
  onTrackOrder?: () => void;
  onReturnHome?: () => void;
  onDownloadReceipt?: () => void;
  className?: string;
}

export const ConfirmationPanel: React.FC<ConfirmationPanelProps> = ({
  orderId = 'MB-99042',
  serviceTitle = 'Bespoke Dry Cleaning & Laundry',
  scheduledTime = 'Today, between 04:00 PM - 05:00 PM',
  totalPaid = '$142.50',
  customerName = 'Mr. Bruce Wayne',
  onTrackOrder,
  onReturnHome,
  onDownloadReceipt,
  className = ''
}) => {
  return (
    <div className={`max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md text-center space-y-6 ${className}`}>
      {/* Animated Success Badge */}
      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border-4 border-emerald-50 dark:border-emerald-900 shadow-sm animate-in zoom-in-50 duration-300">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <div>
        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
          Order Successfully Dispatched
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#00444D] dark:text-white mt-1">
          Thank You, {customerName}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Your reservation has been recorded. Our white-glove valet chauffeur is assigned to your address.
        </p>
      </div>

      {/* Booking Pass Voucher Token */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-left space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Tracking Pass Code</span>
            <div className="font-mono text-base font-bold text-[#00444D] dark:text-[#ABEDFA]">
              {orderId}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300">
            <QrCode className="w-6 h-6" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Service</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{serviceTitle}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Amount Settled</span>
            <span className="font-semibold text-[#00444D] dark:text-[#FFE088]">{totalPaid}</span>
          </div>
          <div className="col-span-2 pt-1">
            <span className="text-slate-400 block text-[10px]">Valet Arrival Window</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{scheduledTime}</span>
          </div>
        </div>
      </div>

      {/* Secondary Actions: Add to Calendar, Download Receipt */}
      <div className="flex items-center justify-center gap-3 pt-1">
        <button
          onClick={onDownloadReceipt}
          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Receipt PDF</span>
        </button>

        <button
          onClick={() => {
            alert('Booking added to your device calendar.');
          }}
          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Add to Calendar</span>
        </button>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        {onTrackOrder && (
          <button
            onClick={onTrackOrder}
            className="w-full py-3.5 rounded-xl bg-[#00444D] hover:bg-[#0D5D68] text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Package className="w-4 h-4 text-[#FFE088]" />
            <span>Track Valet Chauffeur Live</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {onReturnHome && (
          <button
            onClick={onReturnHome}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            Return to Concierge Home
          </button>
        )}
      </div>
    </div>
  );
};
