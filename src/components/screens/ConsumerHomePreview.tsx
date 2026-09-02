import React, { useState } from 'react';
import { Language, ScreenId, RegistrationData } from '../../types';
import { translations } from '../../data/translations';
import { EGEC } from '../EGEC';
import { ProfilePictureUploader } from '../forms';
import { 
  Shirt, 
  Scissors, 
  Footprints, 
  Sparkles, 
  Dog, 
  Clock, 
  PlusCircle, 
  Bell, 
  ChevronRight, 
  Search, 
  CheckCircle2, 
  UserCheck, 
  LogOut,
  Camera,
  X,
  User
} from 'lucide-react';

interface ConsumerHomePreviewProps {
  email: string;
  registrationData?: RegistrationData;
  onUpdateRegistrationData?: (data: Partial<RegistrationData>) => void;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const ConsumerHomePreview: React.FC<ConsumerHomePreviewProps> = ({
  email,
  registrationData,
  onUpdateRegistrationData,
  onNavigate,
  lang,
}) => {
  const t = translations[lang] || translations.en;
  const isRTL = lang === 'ar';
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const currentPhoto = registrationData?.profilePicture || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80';
  const displayName = registrationData?.fullName || 'Master Wayne';

  const categories = [
    { title: t.serviceLaundry, icon: Shirt, badge: 'Express 24h', color: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#E2E8F0]', target: 'book_dry_cleaning' },
    { title: t.serviceTailoring, icon: Scissors, badge: 'Master Tailor', color: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#E2E8F0]', target: 'book_tailoring' },
    { title: t.serviceShoe, icon: Footprints, badge: 'Cobbler Restores', color: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#E2E8F0]', target: 'book_shoe_repair' },
    { title: t.serviceSalon, icon: Sparkles, badge: 'At-Home Salon', color: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#E2E8F0]', target: 'book_beauty_salon' },
    { title: t.servicePet, icon: Dog, badge: 'Gentle Grooming', color: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#E2E8F0]', target: 'book_pet_care' },
  ];

  const recentRequests = [
    { id: 'BUTLER-8942', service: 'Italian Suit Tailoring & Steam', status: 'Valet en route', time: 'Today, 2:30 PM', butler: 'Alfred S.' },
    { id: 'BUTLER-8910', service: 'Equestrian Boot Polishing', status: 'In Restoration', time: 'Yesterday', butler: 'Giles M.' },
  ];

  return (
    <div className="min-h-full w-full bg-[#F8FAFC] dark:bg-slate-950 text-[#1E293B] dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-slate-800">
        <div className="flex items-center gap-3">
          {/* Interactive Consumer Avatar */}
          <div className="relative cursor-pointer group" onClick={() => setIsPhotoModalOpen(true)}>
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#00444D] dark:border-[#FFE088] shadow-sm relative group-hover:ring-2 group-hover:ring-[#CCA730] transition-all">
              <img 
                src={currentPhoto} 
                alt={displayName} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 absolute -bottom-0.5 -right-0.5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#0F172A] dark:text-white">
                {displayName}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                VIP Consumer
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] font-mono">
              {email || registrationData?.email || 'client@mrbutler.com'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={() => setIsPhotoModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#00444D] dark:text-[#FFE088] text-xs font-bold hover:bg-slate-50 transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{isRTL ? 'تعديل الصورة' : 'Edit Photo'}</span>
          </button>

          <button className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#475569] dark:text-slate-300 relative cursor-pointer">
            <Bell className="w-4 h-4 text-[#3B82F6]" />
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] absolute top-1.5 right-1.5" />
          </button>
          <button
            onClick={() => onNavigate(1)}
            title="Sign Out"
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#64748B] hover:text-red-500 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Greeting Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#00444D] via-[#0F172A] to-[#002D33] text-white border border-[#005763] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#FFE088] uppercase tracking-widest">
              Bespoke Household Portal
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-800">
              Active Member
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            {isRTL ? `مرحباً بك، ${displayName}` : `Welcome back, ${displayName}`}
          </h1>
          <p className="text-xs text-slate-300 font-normal max-w-md">
            {t.consumerHomeSub}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('our_services')}
          className="px-4 py-2.5 rounded-xl bg-[#FFE088] text-[#00444D] font-bold text-xs hover:bg-[#FFD700] transition flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isRTL ? 'طلب خدمة جديدة' : 'New Valet Request'}</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-[#0F172A] dark:text-white">
            Request Personal Services
          </h2>
          <span className="text-xs text-[#1D4ED8] dark:text-blue-400 font-semibold">5 Services Ready</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div
                key={index}
                onClick={() => onNavigate(cat.target as ScreenId)}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#00444D] dark:hover:border-[#FFE088] transition shadow-xs flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#0F172A] dark:text-slate-100 group-hover:text-[#00444D] dark:group-hover:text-[#FFE088] transition-colors">
                      {cat.title}
                    </h3>
                    <span className="text-[10px] text-[#64748B]">{cat.badge}</span>
                  </div>
                </div>
                <PlusCircle className="w-4 h-4 text-[#64748B] group-hover:text-[#00444D] dark:group-hover:text-[#FFE088] transition-colors" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Requests */}
      <div className="space-y-3">
        <h2 className="font-bold text-sm text-[#0F172A] dark:text-white">
          {t.recentOrders}
        </h2>

        <div className="space-y-2">
          {recentRequests.map((req) => (
            <div key={req.id} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between text-xs shadow-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 font-mono font-bold text-[#1D4ED8] dark:text-blue-400">
                  <span>{req.id}</span>
                  <span className="text-[#64748B]">•</span>
                  <span className="text-[#0F172A] dark:text-slate-300 font-sans">{req.service}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
                  <span>Valet: {req.butler}</span>
                  <span>•</span>
                  <span>{req.time}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300 border border-[#E2E8F0] dark:border-blue-800 text-[10px] font-bold">
                {req.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Return Action */}
      <div className="pt-2 text-center">
        <button
          onClick={() => onNavigate(1)}
          className="text-xs text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] hover:underline cursor-pointer"
        >
          Return to Mr. Butler Welcome Portal
        </button>
      </div>

      {/* Interactive Consumer Profile Picture Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fade-in relative">
            <button
              onClick={() => setIsPhotoModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                {isRTL ? 'تحديث صورة العميل' : 'Update Consumer Profile Photo'}
              </h3>
              <p className="text-xs text-slate-500">
                {isRTL ? 'ارفع صورة شخصية أو اختر من النماذج الفاخرة' : 'Upload your portrait or select from our curated VIP presets'}
              </p>
            </div>

            <div className="py-2 flex justify-center">
              <ProfilePictureUploader
                type="consumer"
                value={currentPhoto}
                onChange={(newPhoto) => {
                  if (onUpdateRegistrationData) {
                    onUpdateRegistrationData({ profilePicture: newPhoto || undefined });
                  }
                }}
                label=""
                helperText=""
                size="lg"
                isRTL={isRTL}
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#00444D] text-white font-bold text-xs hover:bg-[#00333A] transition cursor-pointer shadow-sm"
              >
                {isRTL ? 'حفظ وإغلاق' : 'Save & Close'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

