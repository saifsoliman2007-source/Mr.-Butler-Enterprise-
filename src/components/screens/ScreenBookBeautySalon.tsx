import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { DatePicker, TimePicker, AddressInput, AddressValue } from '../forms';
import { 
  Sparkle, 
  Scissors, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  Home, 
  Building2,
  Crown,
  ArrowRight
} from 'lucide-react';

interface ScreenBookBeautySalonProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const ScreenBookBeautySalon: React.FC<ScreenBookBeautySalonProps> = ({ onNavigate, lang }) => {
  const isRTL = lang === 'ar';
  const [selectedTreatment, setSelectedTreatment] = useState('haircut');
  const [selectedStylist, setSelectedStylist] = useState('julian');
  const [locationType, setLocationType] = useState<'home' | 'suite'>('home');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('11:00 AM - 01:00 PM');
  const [address, setAddress] = useState<AddressValue>({
    street: '1007 Mountain Drive',
    unit: 'Master Suite 12',
    city: 'Dubai Marina',
    postalCode: '00000',
  });
  const [isBooked, setIsBooked] = useState(false);

  const treatments = [
    { id: 'haircut', title: isRTL ? 'قص وتصفيف الشعر الفاخر' : 'Haircut & Styling', price: '$85', desc: isRTL ? 'قص دقيق، غسيل علاجي وتصفيف متقن' : 'Precision cut, wash, and bespoke styling', icon: Scissors },
    { id: 'facial', title: isRTL ? 'عناية وترطيب البشرة العميقة' : 'Facial & Skin Therapy', price: '$120', desc: isRTL ? 'ترطيب نباتي فاخر ومساج وجه' : 'Deep hydration with luxury botanicals', icon: Sparkles },
    { id: 'manicure', title: isRTL ? 'مانيكير وبيديكير تنفيذي' : 'Executive Manicure', price: '$55', desc: isRTL ? 'تشكيل الأظافر، تنظيف وتلميع راقٍ' : 'Nail shaping, cuticle grooming & buff', icon: Sparkle },
    { id: 'shave', title: isRTL ? 'حلاقة ملكية بالفوطة الساخنة' : 'Royal Hot Towel Shave', price: '$65', desc: isRTL ? 'موس كلاسيكي حاد وزيوت عطرية مهدئة' : 'Straight-razor shave with soothing essential oils', icon: Crown },
  ];

  const stylists = [
    { id: 'julian', name: isRTL ? 'مصفف الشعر جوليان' : 'Master Stylist Julian', rating: '5.0 ★', spec: isRTL ? 'تصفيف وقص احترافي' : 'Bespoke Grooming & Cut', avatar: '✂️' },
    { id: 'elena', name: isRTL ? 'أخصائية البشرة إيلينا' : 'Artisan Elena', rating: '4.9 ★', spec: isRTL ? 'علاج وتغذية البشرة' : 'Facial Therapy & Skin', avatar: '💆' },
    { id: 'arthur', name: isRTL ? 'الحلاق الملكي آرثر' : 'Barber Arthur', rating: '5.0 ★', spec: isRTL ? 'حلاقة كلاسيكية ولحية' : 'Hot Towel Shave & Beard', avatar: '💈' },
  ];

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#0F172A] text-[#121C2A] dark:text-white flex flex-col justify-between transition-colors pb-12" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Recurring Header */}
      <RecurringAppHeader 
        currentScreen="book_beauty_salon" 
        onNavigate={onNavigate} 
        lang={lang} 
        title="Mr. Butler"
        statusMessage={isRTL ? "خبراء التجميل والتصفيف جاهزون لزيارتكم في الجناح الخاص." : "Private salon stylists ready for in-home or suite appointments."}
      />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        
        {/* Breadcrumb & Title */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('our_services')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00444D] dark:text-[#ABEDFA] hover:underline cursor-pointer"
          >
            {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{isRTL ? 'العودة للخدمات' : 'Back to Services'}</span>
          </button>
          <span className="text-[11px] font-mono text-slate-400">
            {isRTL ? 'صالون التجميل والعناية الشخصية' : 'Beauty & Grooming Salon'}
          </span>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#00444D] dark:text-white tracking-tight">
            {isRTL ? 'خدمات صالون التجميل والعناية' : 'Beauty Salon Services'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isRTL ? 'عناية شخصية فائقة، علاجات تجديد البشرة، وتصفيف الشعر في راحة منزلك أو جناحك الخاص.' : 'Personalized grooming, rejuvenating skin treatments, and hair styling in the comfort of your home or private suite.'}
          </p>
        </div>

        {/* 1. Select Service (Choose beauty service) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '١. اختيار الخدمة' : '1. Select Service'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'اختر جلسة العناية' : 'Choose beauty service'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {treatments.map(item => {
              const Icon = item.icon;
              const isSelected = selectedTreatment === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedTreatment(item.id)}
                  className={`p-4 rounded-2xl border text-left rtl:text-right flex items-start justify-between gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00444D] text-white border-[#00444D] shadow-md'
                      : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-[#EFF4FF]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-white/20 text-[#FFE088]' : 'bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA]'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs">{item.title}</h4>
                      <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <span className={`font-bold text-xs shrink-0 ${isSelected ? 'text-[#FFE088]' : 'text-[#00444D] dark:text-[#ABEDFA]'}`}>
                    {item.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Select Professional (Choose your professional) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '٢. اختيار الأخصائي أو المصفف' : '2. Select Professional'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'متاح حسب الطلب' : 'Choose your professional'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stylists.map(stylist => {
              const isSelected = selectedStylist === stylist.id;
              return (
                <button
                  key={stylist.id}
                  onClick={() => setSelectedStylist(stylist.id)}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA] shadow-xs'
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

        {/* 3. Select Date & Time (Choose appointment time) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '٣. تحديد التاريخ والوقت' : '3. Select Date & Time'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'اختر وقت الجلسة' : 'Choose appointment time'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              label={isRTL ? 'تاريخ الموعد' : 'Appointment Date'}
              value={date}
              onChange={setDate}
              isRTL={isRTL}
            />
            <TimePicker
              label={isRTL ? 'الوقت المفضل' : 'Preferred Time'}
              value={time}
              onChange={setTime}
              isRTL={isRTL}
            />
          </div>
        </div>

        {/* 4. Location (Choose service location) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '٤. موقع الجلسة والعنوان' : '4. Location'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'حدد المكان' : 'Choose service location'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setLocationType('home')}
              className={`p-4 rounded-2xl border text-left rtl:text-right flex items-start gap-3 transition-all cursor-pointer ${
                locationType === 'home'
                  ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA]'
                  : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#00444D] text-white shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-white block">
                  {isRTL ? 'جلسة خاصة في المسكن / الجناح' : 'Private In-Home Session'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isRTL ? 'يحضر المصفف مع كافة الأدوات المعقمة ومستحضرات العناية الفاخرة.' : 'Stylist brings sanitized tools & luxury chair protective coverings.'}
                </span>
              </div>
            </button>

            <button
              onClick={() => setLocationType('suite')}
              className={`p-4 rounded-2xl border text-left rtl:text-right flex items-start gap-3 transition-all cursor-pointer ${
                locationType === 'suite'
                  ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA]'
                  : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#00444D] text-white shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-white block">
                  {isRTL ? 'جناح الصالون الخاص VIP' : 'VIP Partner Salon Suite'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isRTL ? 'مقصورة حصرية مخصصة لك مع خدمات الضيافة والسبا الكاملة.' : 'Reserved private booth with beverage service & spa amenities.'}
                </span>
              </div>
            </button>
          </div>

          <AddressInput
            label={isRTL ? 'عنوان موقع الجلسة' : 'Service Address'}
            value={address}
            onChange={setAddress}
            isRTL={isRTL}
          />
        </div>

        {/* Action Button: Continue */}
        <div className="pt-2">
          <button
            onClick={() => setIsBooked(true)}
            className="w-full bg-[#00444D] hover:bg-[#0D5D68] text-white font-semibold text-base py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 border-b-2 border-[#CCA730] cursor-pointer group active:scale-[0.99]"
          >
            <span>{isRTL ? 'المتابعة' : 'Continue'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#FFE088]" />
          </button>
        </div>

      </main>

      {/* Confirmation Modal */}
      {isBooked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 border border-[#CCA730] shadow-2xl animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-[#B0EDF4] dark:bg-teal-950 mx-auto flex items-center justify-center text-[#00444D] dark:text-[#ABEDFA]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#00444D] dark:text-white">
              {isRTL ? 'تم تأكيد موعد العناية!' : 'Appointment Reserved!'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {isRTL 
                ? `تم حجز موعدك مع ${stylists.find(s => s.id === selectedStylist)?.name} بتاريخ ${date} في ${time}.`
                : `Your appointment with ${stylists.find(s => s.id === selectedStylist)?.name} is confirmed on ${date} during ${time}.`}
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsBooked(false);
                  onNavigate('our_services');
                }}
                className="w-full py-3 bg-[#00444D] text-white rounded-xl font-semibold text-xs shadow cursor-pointer"
              >
                {isRTL ? 'العودة لدليل الخدمات' : 'Back to Services Directory'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

