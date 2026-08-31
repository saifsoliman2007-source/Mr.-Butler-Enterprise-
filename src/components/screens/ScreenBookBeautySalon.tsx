import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { 
  Sparkle, 
  Scissors, 
  Sparkles, 
  Heart, 
  User, 
  CheckCircle2, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Home, 
  Building2,
  Crown
} from 'lucide-react';

interface ScreenBookBeautySalonProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const ScreenBookBeautySalon: React.FC<ScreenBookBeautySalonProps> = ({ onNavigate, lang }) => {
  const [selectedTreatment, setSelectedTreatment] = useState('haircut');
  const [selectedStylist, setSelectedStylist] = useState('julian');
  const [locationType, setLocationType] = useState<'home' | 'suite'>('home');
  const [isBooked, setIsBooked] = useState(false);

  const treatments = [
    { id: 'haircut', title: 'Haircut & Styling', price: '$85', desc: 'Precision cut, wash, and bespoke styling', icon: Scissors },
    { id: 'facial', title: 'Facial & Skin Therapy', price: '$120', desc: 'Deep hydration with luxury botannicals', icon: Sparkles },
    { id: 'manicure', title: 'Executive Manicure', price: '$55', desc: 'Nail shaping, cuticle grooming & buff', icon: Sparkle },
    { id: 'shave', title: 'Royal Hot Towel Shave', price: '$65', desc: 'Straight-razor shave with soothing essential oils', icon: Crown },
  ];

  const stylists = [
    { id: 'julian', name: 'Master Stylist Julian', rating: '5.0 ★', spec: 'Bespoke Grooming & Cut', avatar: '✂️' },
    { id: 'elena', name: 'Artisan Elena', rating: '4.9 ★', spec: 'Facial Therapy & Skin', avatar: '💆' },
    { id: 'arthur', name: 'Barber Arthur', rating: '5.0 ★', spec: 'Hot Towel Shave & Beard', avatar: '💈' },
  ];

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#0F172A] text-[#121C2A] dark:text-white flex flex-col justify-between transition-colors pb-12">
      
      {/* Recurring Header */}
      <RecurringAppHeader 
        currentScreen="book_beauty_salon" 
        onNavigate={onNavigate} 
        lang={lang} 
        title="Mr. Butler"
        statusMessage="Private salon stylists ready for in-home or suite appointments."
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
            Beauty & Grooming Salon
          </span>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#00444D] dark:text-white tracking-tight">
            Beauty & Grooming Suites
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Personalized grooming, rejuvenating skin treatments, and hair styling in the comfort of your home or private suite.
          </p>
        </div>

        {/* 1. Treatment Menu (Bento Grid) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
            1. Select Treatment
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {treatments.map(item => {
              const Icon = item.icon;
              const isSelected = selectedTreatment === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedTreatment(item.id)}
                  className={`p-4 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all ${
                    isSelected
                      ? 'bg-[#00444D] text-white border-[#00444D] shadow-md'
                      : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-[#EFF4FF]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white/20 text-[#FFE088]' : 'bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA]'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs">{item.title}</h4>
                      <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <span className={`font-bold text-xs ${isSelected ? 'text-[#FFE088]' : 'text-[#00444D] dark:text-[#ABEDFA]'}`}>
                    {item.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Choose Stylist */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              2. Choose Stylist or Specialist
            </label>
            <span className="text-[11px] text-slate-400">Available on Demand</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stylists.map(stylist => {
              const isSelected = selectedStylist === stylist.id;
              return (
                <button
                  key={stylist.id}
                  onClick={() => setSelectedStylist(stylist.id)}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                    isSelected
                      ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA] shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800'
                  }`}
                >
                  <span className="text-2xl">{stylist.avatar}</span>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800 dark:text-white">
                      {stylist.name}
                    </h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {stylist.spec}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                      {stylist.rating}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Location Preference */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
            3. Service Location
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setLocationType('home')}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                locationType === 'home'
                  ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA]'
                  : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#00444D] text-white">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-white block">
                  Private In-Home Session
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Stylist brings sanitized tools & luxury chair protective coverings.
                </span>
              </div>
            </button>

            <button
              onClick={() => setLocationType('suite')}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                locationType === 'suite'
                  ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA]'
                  : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#00444D] text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-white block">
                  VIP Salon Partner Suite
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Reserved private booth with beverage service & spa amenities.
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => setIsBooked(true)}
            className="w-full bg-[#00444D] hover:bg-[#0D5D68] text-white font-semibold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border-b-2 border-[#CCA730]"
          >
            <span>Confirm Beauty Appointment</span>
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
              Appointment Reserved!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Your appointment with {stylists.find(s => s.id === selectedStylist)?.name} is confirmed. Session type: {locationType === 'home' ? 'In-Home Session' : 'VIP Suite'}.
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
