import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { 
  Sparkles, 
  Scissors, 
  Footprints, 
  Sparkle, 
  Dog, 
  ArrowRight, 
  ArrowLeft,
  Crown, 
  Star, 
  Home, 
  Grid, 
  Receipt
} from 'lucide-react';

interface ScreenOurServicesProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const ScreenOurServices: React.FC<ScreenOurServicesProps> = ({ onNavigate, lang }) => {
  const isRTL = lang === 'ar';

  const services = [
    {
      id: 'book_dry_cleaning' as ScreenId,
      title: isRTL ? 'تنظيف الملابس الجاف والغسيل' : 'Dry Cleaning & Laundry',
      subtitle: isRTL ? 'عناية فائقة بالأقمشة والملابس مع الكي' : 'White-glove garment care & pressing',
      icon: Sparkles,
      tag: isRTL ? 'الأكثر طلباً' : 'Popular',
      color: 'from-blue-500/10 to-teal-500/10 text-[#00444D] dark:text-[#ABEDFA]'
    },
    {
      id: 'book_tailoring' as ScreenId,
      title: isRTL ? 'الخياطة والتفصيل والتعديل' : 'Tailoring & Alterations',
      subtitle: isRTL ? 'قياس منزلي خاص وتعديل دقيق' : 'Bespoke fitting & master stitch repair',
      icon: Scissors,
      tag: isRTL ? 'تفصيل فاخر' : 'Bespoke',
      color: 'from-amber-500/10 to-orange-500/10 text-[#735C00] dark:text-[#FFE088]'
    },
    {
      id: 'book_shoe_repair' as ScreenId,
      title: isRTL ? 'صيانة وتلميع الأحذية' : 'Shoe Fix & Repair',
      subtitle: isRTL ? 'ترميم وتلميع شمعي فرنسي فاخر' : 'Leather polish, resole & restoration',
      icon: Footprints,
      tag: isRTL ? 'حرفي' : 'Artisan',
      color: 'from-emerald-500/10 to-teal-500/10 text-[#00444D] dark:text-[#ABEDFA]'
    },
    {
      id: 'book_beauty_salon' as ScreenId,
      title: isRTL ? 'صالون التجميل والعناية' : 'Beauty Salon Services',
      subtitle: isRTL ? 'تصفيف، علاج البشرة وأجنحة العناية' : 'Styling, facial therapy & manicure suites',
      icon: Sparkle,
      tag: isRTL ? 'فاخر' : 'Luxury',
      color: 'from-purple-500/10 to-pink-500/10 text-purple-700 dark:text-purple-300'
    },
    {
      id: 'book_pet_care' as ScreenId,
      title: isRTL ? 'رعاية الحيوانات الأليفة' : 'Pet Care Services',
      subtitle: isRTL ? 'سبا، نزهات ممتعة واستضافة منزلية' : 'Spa grooming, sitting & daily walks',
      icon: Dog,
      tag: isRTL ? 'رعاية خاصة' : 'Valet Care',
      color: 'from-cyan-500/10 to-blue-500/10 text-[#00444D] dark:text-[#ABEDFA]'
    }
  ];

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#0F172A] text-[#121C2A] dark:text-white flex flex-col justify-between transition-colors pb-16 md:pb-6" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Recurring Application Header Structure */}
      <RecurringAppHeader 
        currentScreen="our_services" 
        onNavigate={onNavigate} 
        lang={lang} 
        showStatusBar={true}
        statusMessage={isRTL ? "فريق مستر باتلر جاهز لتلبية كافة طلباتكم الفاخرة." : "Your Butler is en route to Mr. Wayne's residence."}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col gap-6">
        
        {/* Title Header */}
        <section className="text-start space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B0EDF4] dark:bg-[#0D5D68] text-[#00444D] dark:text-[#ABEDFA] text-xs font-semibold mb-1">
            <Crown className="w-3.5 h-3.5 text-[#CCA730]" />
            <span>{isRTL ? 'دليل خدمات الكونسيرج الإمبراطوري' : 'Imperial Concierge Directory'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#00444D] dark:text-white tracking-tight">
            {isRTL ? 'في خدمتكم دائماً، سيدي.' : 'At Your Service, Sir.'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {isRTL ? 'اختر إحدى فئات الخدمات المتاحة أدناه لطلب الفاليه الفوري أو جدولة المواعيد الخاصة.' : 'Select a service category below to request immediate valet assistance or scheduled appointments.'}
          </p>
        </section>

        {/* Services Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <button
                key={String(svc.id)}
                onClick={() => onNavigate(svc.id)}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#00444D] dark:hover:border-[#ABEDFA] shadow-[0_10px_30px_rgba(0,68,77,0.04)] hover:shadow-[0_15px_35px_rgba(0,68,77,0.12)] transition-all duration-200 flex flex-col items-start text-start group relative overflow-hidden cursor-pointer"
              >
                {/* Subtle gradient hover wash */}
                <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-24 h-24 bg-gradient-to-br from-[#B0EDF4]/30 to-transparent rounded-bl-full rtl:rounded-bl-none rtl:rounded-br-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div className="flex items-center justify-between w-full mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#EFF4FF] dark:bg-slate-800 flex items-center justify-center text-[#00444D] dark:text-[#ABEDFA] group-hover:bg-[#00444D] group-hover:text-white transition-colors border border-[#D9E3F6] dark:border-slate-700">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E6EEFF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA]">
                    {svc.tag}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-[#00444D] dark:text-white group-hover:text-[#0D5D68] dark:group-hover:text-[#ABEDFA] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {svc.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 w-full flex items-center justify-between text-xs font-semibold text-[#00444D] dark:text-[#ABEDFA]">
                  <span>{isRTL ? 'حجز الخدمة' : 'Book Service'}</span>
                  {isRTL ? (
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </button>
            );
          })}
        </section>

        {/* Signature Collection Promotional Card */}
        <section className="bg-gradient-to-r from-[#00444D] via-[#0D5D68] to-[#1E6772] rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-[#CCA730]/40">
          
          {/* Subtle gold ornamentation */}
          <div className="absolute -right-8 -bottom-8 rtl:-right-auto rtl:-left-8 w-40 h-40 bg-[#CCA730]/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2 max-w-lg z-10 text-start">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFE088] text-[#241A00] text-[11px] font-bold">
              <Star className="w-3 h-3 fill-current" />
              <span>{isRTL ? 'باقة الفاليه الحصرية' : 'Signature Valet Tier'}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
              {isRTL ? 'مجموعة مستر باتلر المميزة' : "The Butler's Signature Collection"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {isRTL 
                ? 'استمتع بخدمات إدارة خزانة الملابس المتكاملة، أولوية التسليم الفوري، وأجنحة الكونسيرج الفاخرة.'
                : 'Experience our premium tier of integrated wardrobe management, priority express turnaround, and bespoke concierge suites.'}
            </p>
          </div>

          <div className="z-10 flex-shrink-0">
            <button
              onClick={() => onNavigate('book_dry_cleaning')}
              className="bg-[#FFE088] hover:bg-[#E9C349] text-[#241A00] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              {isRTL ? 'استكشف الباقة الفاخرة' : 'Explore Premium'}
            </button>
          </div>
        </section>

      </main>

    </div>
  );
};
