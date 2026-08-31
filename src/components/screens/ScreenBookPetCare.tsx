import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { 
  Dog, 
  Cat, 
  Scissors, 
  Footprints, 
  Home, 
  Heart, 
  CheckCircle2, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

interface ScreenBookPetCareProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const ScreenBookPetCare: React.FC<ScreenBookPetCareProps> = ({ onNavigate, lang }) => {
  const [serviceType, setServiceType] = useState<'grooming' | 'walking' | 'sitting'>('grooming');
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [petName, setPetName] = useState('Titus');
  const [breed, setBreed] = useState('Great Dane');
  const [instructions, setInstructions] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#0F172A] text-[#121C2A] dark:text-white flex flex-col justify-between transition-colors pb-12">
      
      {/* Recurring Header */}
      <RecurringAppHeader 
        currentScreen="book_pet_care" 
        onNavigate={onNavigate} 
        lang={lang} 
        title="Mr. Butler"
        statusMessage="Certified companion valets on standby in your neighborhood."
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
            Companion Valet Care
          </span>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#00444D] dark:text-white tracking-tight">
            Pet Care & Valet
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Exceptional grooming, energizing strolls, and trusted in-home companion care.
          </p>
        </div>

        {/* 1. Service Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
            1. Select Pet Service
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'grooming', title: 'Royal Spa Grooming', desc: 'Bespoke coat trim, bath & nail buffing', icon: Scissors },
              { id: 'walking', title: 'Energizing Walking', desc: 'Private 45-minute neighborhood stroll', icon: Footprints },
              { id: 'sitting', title: 'In-Home Valet Sitting', desc: 'Attentive companionship & feeding', icon: Home }
            ].map(svc => {
              const Icon = svc.icon;
              const isSelected = serviceType === svc.id;
              return (
                <button
                  key={svc.id}
                  onClick={() => setServiceType(svc.id as any)}
                  className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all ${
                    isSelected
                      ? 'bg-[#00444D] text-white border-[#00444D] shadow-md'
                      : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-[#EFF4FF]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-white/20 text-[#FFE088]' : 'bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
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

        {/* 2. Companion Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-[#E2E8F0] dark:border-slate-800 space-y-4 shadow-sm">
          <label className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider block">
            2. Companion Details
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pet Type Switcher */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Species</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPetType('dog')}
                  className={`flex-1 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold ${
                    petType === 'dog'
                      ? 'bg-[#00444D] text-white border-[#00444D]'
                      : 'border-[#D9E3F6] dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Dog className="w-4 h-4" />
                  <span>Canine</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPetType('cat')}
                  className={`flex-1 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold ${
                    petType === 'cat'
                      ? 'bg-[#00444D] text-white border-[#00444D]'
                      : 'border-[#D9E3F6] dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Cat className="w-4 h-4" />
                  <span>Feline</span>
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Companion Name</span>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Titus"
                className="w-full bg-[#F8F9FF] dark:bg-slate-800 border border-[#D9E3F6] dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-[#00444D]"
              />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Breed / Size</span>
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              placeholder="Great Dane / Large"
              className="w-full bg-[#F8F9FF] dark:bg-slate-800 border border-[#D9E3F6] dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-[#00444D]"
            />
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Temperament & Dietary Notes</span>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Gentle giant, loves calm walks along the park, sensitive to loud sirens."
              className="w-full bg-[#F8F9FF] dark:bg-slate-800 border border-[#D9E3F6] dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#00444D] h-20 resize-none"
            />
          </div>

        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => setIsBooked(true)}
            className="w-full bg-[#00444D] hover:bg-[#0D5D68] text-white font-semibold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border-b-2 border-[#CCA730]"
          >
            <span>Schedule Pet Care Service</span>
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
              Pet Service Booked!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Your pet valet has been assigned for {petName} ({breed}) - {serviceType}. We look forward to providing royal care.
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
