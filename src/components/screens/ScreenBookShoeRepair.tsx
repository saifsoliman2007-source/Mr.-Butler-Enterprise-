import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { 
  Footprints, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Wrench,
  Droplets,
  Crown
} from 'lucide-react';

interface ScreenBookShoeRepairProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const ScreenBookShoeRepair: React.FC<ScreenBookShoeRepairProps> = ({ onNavigate, lang }) => {
  const [shoeType, setShoeType] = useState('oxfords');
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>(['polish']);
  const [isBooked, setIsBooked] = useState(false);

  const toggleTreatment = (id: string) => {
    if (selectedTreatments.includes(id)) {
      setSelectedTreatments(selectedTreatments.filter(t => t !== id));
    } else {
      setSelectedTreatments([...selectedTreatments, id]);
    }
  };

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#0F172A] text-[#121C2A] dark:text-white flex flex-col justify-between transition-colors pb-12">
      
      {/* Recurring Header */}
      <RecurringAppHeader 
        currentScreen="book_shoe_repair" 
        onNavigate={onNavigate} 
        lang={lang} 
        title="Mr. Butler"
        statusMessage="Artisan cobbler workshop operational with 24h turnaround."
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
            Cobbler & Footwear Valet
          </span>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#00444D] dark:text-white tracking-tight">
            Shoe Fix & Repair
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Expert restoration, sole replacement, and mirror-shine polishing with white-glove pickup.
          </p>
        </div>

        {/* 1. Shoe Type Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
            1. Select Footwear Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'oxfords', label: 'Oxfords & Dress', desc: 'Calfskin, Cordovan' },
              { id: 'heels', label: 'Heels & Pumps', desc: 'Stiletto, Designer' },
              { id: 'boots', label: 'Leather Boots', desc: 'Chelsea, Riding' },
              { id: 'sneakers', label: 'Luxury Sneakers', desc: 'Designer Suede' }
            ].map(type => {
              const isSelected = shoeType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setShoeType(type.id)}
                  className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#00444D] text-white border-[#00444D] shadow-md'
                      : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#EFF4FF]'
                  }`}
                >
                  <Footprints className={`w-5 h-5 ${isSelected ? 'text-[#FFE088]' : 'text-[#00444D] dark:text-[#ABEDFA]'}`} />
                  <span className="font-bold text-xs">{type.label}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-slate-200' : 'text-slate-400'}`}>
                    {type.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Restoration Services */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
            2. Select Restoration Treatments
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'polish', title: 'Mirror Glaze Polish & Shine', price: '$22', desc: 'Saphir Médaille d’Or cream & wax buffing', icon: Sparkles },
              { id: 'resole', title: 'Sole & Heel Replacement', price: '$58', desc: 'Vibram or traditional leather Goodyear welt', icon: Wrench },
              { id: 'dye', title: 'Deep Condition & Color Revive', price: '$35', desc: 'Nutrient-rich balm & scratch touch-up', icon: Droplets },
              { id: 'shield', title: 'Weather Shield & Nano Coating', price: '$18', desc: 'Rain & salt protection treatment', icon: ShieldCheck }
            ].map(treatment => {
              const Icon = treatment.icon;
              const isSelected = selectedTreatments.includes(treatment.id);
              return (
                <button
                  key={treatment.id}
                  onClick={() => toggleTreatment(treatment.id)}
                  className={`p-4 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all ${
                    isSelected
                      ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA] shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#00444D] text-white' : 'bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-white">
                        {treatment.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {treatment.desc}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-[#00444D] dark:text-[#ABEDFA]">
                    {treatment.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Valet Collection Box */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider block">
              Valet Dust Bag Collection
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Our valet delivers custom velvet dust bags to protect your shoes in transit.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
            Included
          </span>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => setIsBooked(true)}
            className="w-full bg-[#00444D] hover:bg-[#0D5D68] text-white font-semibold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border-b-2 border-[#CCA730]"
          >
            <span>Book Shoe Restoration</span>
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
              Restoration Requested!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Your valet will collect your {shoeType} with our dust bags. Artisan workshop ETA: 24-48 hours.
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
