import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { 
  Scissors, 
  Ruler, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles,
  Home,
  Package
} from 'lucide-react';

interface ScreenBookTailoringProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const ScreenBookTailoring: React.FC<ScreenBookTailoringProps> = ({ onNavigate, lang }) => {
  const [serviceType, setServiceType] = useState<'hemming' | 'resizing' | 'repair'>('hemming');
  const [garmentCategory, setGarmentCategory] = useState('Suits & Blazers');
  const [fittingMethod, setFittingMethod] = useState<'valet_home' | 'sample_garment'>('valet_home');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#0F172A] text-[#121C2A] dark:text-white flex flex-col justify-between transition-colors pb-12">
      
      {/* Recurring Header */}
      <RecurringAppHeader 
        currentScreen="book_tailoring" 
        onNavigate={onNavigate} 
        lang={lang} 
        title="Mr. Butler"
        statusMessage="Master tailor available for in-home fitting this Thursday."
      />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        
        {/* Breadcrumb & Title */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('our_services')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00444D] dark:text-[#ABEDFA] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Services</span>
          </button>
          <span className="text-[11px] font-mono text-slate-400">
            Bespoke Alterations
          </span>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#00444D] dark:text-white tracking-tight">
            Tailoring & Alterations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Impeccable adjustments for a flawless fit. Schedule an in-person measurement or drop off your garments.
          </p>
        </div>

        {/* 1. Service Type Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
            1. Select Alteration Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'hemming', title: 'Hemming & Length', desc: 'Pants, skirts, coats & sleeves', icon: Ruler },
              { id: 'resizing', title: 'Bespoke Resizing', desc: 'Taking in waist, chest, or tapering', icon: Scissors },
              { id: 'repair', title: 'Master Repair', desc: 'Zippers, lining, tear re-weaving', icon: Sparkles }
            ].map(svc => {
              const Icon = svc.icon;
              const isSelected = serviceType === svc.id;
              return (
                <button
                  key={svc.id}
                  onClick={() => setServiceType(svc.id as any)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-[#00444D] text-white border-[#00444D] shadow-md'
                      : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-[#EFF4FF]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-[#FFE088]' : 'text-[#00444D] dark:text-[#ABEDFA]'}`} />
                  <div>
                    <h4 className="font-bold text-xs">{svc.title}</h4>
                    <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                      {svc.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Garment Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
            2. Garment Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['Suits & Blazers', 'Trousers & Slacks', 'Formal Gowns', 'Shirts & Blouses'].map(garment => (
              <button
                key={garment}
                onClick={() => setGarmentCategory(garment)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  garmentCategory === garment
                    ? 'bg-[#00444D] text-white border-[#00444D]'
                    : 'bg-white dark:bg-slate-900 border-[#D9E3F6] dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {garment}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Fitting Method */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
            3. Fitting & Measurement Preference
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setFittingMethod('valet_home')}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                fittingMethod === 'valet_home'
                  ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA]'
                  : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#00444D] text-white">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-white block">
                  Private In-Home Fitting
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  A master tailor will visit your residence with pinning tools.
                </span>
              </div>
            </button>

            <button
              onClick={() => setFittingMethod('sample_garment')}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                fittingMethod === 'sample_garment'
                  ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA]'
                  : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#00444D] text-white">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-white block">
                  Match Sample Garment
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Provide a best-fitting item for us to replicate exact dimensions.
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* 4. Notes */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
            4. Special Fitting Instructions
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="E.g., Take in 1.5 inches at the waist, maintain original cuff finish on tuxedo trousers."
            className="w-full bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-xl p-3 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#00444D] h-20 resize-none"
          />
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => setIsBooked(true)}
            className="w-full bg-[#00444D] hover:bg-[#0D5D68] text-white font-semibold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border-b-2 border-[#CCA730]"
          >
            <span>Schedule Fitting Appointment</span>
          </button>
        </div>

      </main>

      {/* Confirmation Modal */}
      {isBooked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 border border-[#CCA730] shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-[#B0EDF4] dark:bg-teal-950 mx-auto flex items-center justify-center text-[#00444D] dark:text-[#ABEDFA]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#00444D] dark:text-white">
              Fitting Scheduled!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Master tailor appointment registered for {garmentCategory} ({serviceType}). Valet will bring measuring garments.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsBooked(false);
                  onNavigate('our_services');
                }}
                className="w-full py-2.5 bg-[#00444D] text-white rounded-xl font-semibold text-xs shadow"
              >
                Back to Services Directory
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
