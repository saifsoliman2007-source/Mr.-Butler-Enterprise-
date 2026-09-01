import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { DatePicker, TimePicker, AddressInput, AddressValue, ImageInput } from '../forms';
import { 
  Footprints, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Wrench,
  Droplets,
  ArrowRight
} from 'lucide-react';

interface ScreenBookShoeRepairProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const ScreenBookShoeRepair: React.FC<ScreenBookShoeRepairProps> = ({ onNavigate, lang }) => {
  const isRTL = lang === 'ar';
  const [shoeType, setShoeType] = useState('oxfords');
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>(['polish']);
  const [shoePhoto, setShoePhoto] = useState<string | null>(null);
  const [dropoffDate, setDropoffDate] = useState(new Date().toISOString().split('T')[0]);
  const [dropoffTime, setDropoffTime] = useState('02:00 PM - 04:00 PM');
  const [address, setAddress] = useState<AddressValue>({
    street: '1007 Mountain Drive',
    unit: 'Penthouse A',
    city: 'Dubai Marina',
    postalCode: '00000',
  });
  const [isBooked, setIsBooked] = useState(false);

  const toggleTreatment = (id: string) => {
    if (selectedTreatments.includes(id)) {
      setSelectedTreatments(selectedTreatments.filter(t => t !== id));
    } else {
      setSelectedTreatments([...selectedTreatments, id]);
    }
  };

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#0F172A] text-[#121C2A] dark:text-white flex flex-col justify-between transition-colors pb-12" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Recurring Header */}
      <RecurringAppHeader 
        currentScreen="book_shoe_repair" 
        onNavigate={onNavigate} 
        lang={lang} 
        title="Mr. Butler"
        statusMessage={isRTL ? "ورشة صيانة وتلميع الأحذية اليدوية جاهزة للتسليم خلال ٢٤ ساعة." : "Artisan cobbler workshop operational with 24h turnaround."}
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
            {isRTL ? 'خدمة صيانة الأحذية الراقية' : 'Cobbler & Footwear Valet'}
          </span>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#00444D] dark:text-white tracking-tight">
            {isRTL ? 'صيانة وتلميع الأحذية الفاخرة' : 'Shoe Fix & Repair'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isRTL ? 'ترميم احترافي، استبدال النعل وتلميع كالمرآة مع خدمة استلام وتسليم خاصة.' : 'Expert restoration, sole replacement, and mirror-shine polishing with white-glove pickup.'}
          </p>
        </div>

        {/* 1. Select Service (Choose repair service) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '١. اختيار نوع الحذاء والخدمة' : '1. Select Service'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'اختر المعالجة المناسبة' : 'Choose repair service'}
            </span>
          </div>

          {/* Footwear Type Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'oxfords', label: isRTL ? 'أوكسفورد ورسمي' : 'Oxfords & Dress', desc: 'Calfskin, Cordovan' },
              { id: 'heels', label: isRTL ? 'كعب وأحذية نسائية' : 'Heels & Pumps', desc: 'Designer Leather' },
              { id: 'boots', label: isRTL ? 'أحذية جلدية عالية' : 'Leather Boots', desc: 'Chelsea, Riding' },
              { id: 'sneakers', label: isRTL ? 'سنيكرز فاخر' : 'Luxury Sneakers', desc: 'Designer Suede' }
            ].map(type => {
              const isSelected = shoeType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setShoeType(type.id)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00444D] text-white border-[#00444D] shadow-md'
                      : 'bg-[#F8F9FF] dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-[#E6EEFF]'
                  }`}
                >
                  <Footprints className={`w-4 h-4 ${isSelected ? 'text-[#FFE088]' : 'text-[#00444D] dark:text-[#ABEDFA]'}`} />
                  <span className="font-bold text-xs">{type.label}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-slate-200' : 'text-slate-400'}`}>
                    {type.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Restoration Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { id: 'polish', title: isRTL ? 'تلميع شمعي فرنسي فاخر' : 'Mirror Glaze Polish & Shine', price: '$22', desc: 'Saphir Médaille d’Or cream & wax buffing', icon: Sparkles },
              { id: 'resole', title: isRTL ? 'استبدال النعل والكعب' : 'Sole & Heel Replacement', price: '$58', desc: 'Vibram or traditional leather Goodyear welt', icon: Wrench },
              { id: 'dye', title: isRTL ? 'تغذية وتجديد لون الجلد' : 'Deep Condition & Color Revive', price: '$35', desc: 'Nutrient-rich balm & scratch touch-up', icon: Droplets },
              { id: 'shield', title: isRTL ? 'عزل وحماية نانو ضد السوائل' : 'Weather Shield & Nano Coating', price: '$18', desc: 'Rain & stain barrier protection treatment', icon: ShieldCheck }
            ].map(treatment => {
              const Icon = treatment.icon;
              const isSelected = selectedTreatments.includes(treatment.id);
              return (
                <button
                  key={treatment.id}
                  onClick={() => toggleTreatment(treatment.id)}
                  className={`p-3.5 rounded-2xl border text-left rtl:text-right flex items-start justify-between gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA] shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-[#00444D] text-white' : 'bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA]'}`}>
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
                  <span className="font-bold text-xs text-[#00444D] dark:text-[#FFE088] shrink-0">
                    {treatment.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Add Photos (Optional) (Upload shoe photos) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '٢. إضافة صور الحذاء (اختياري)' : '2. Add Photos (Optional)'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'صورة للخدوش أو النعل' : 'Upload shoe photos'}
            </span>
          </div>

          <ImageInput
            label={isRTL ? 'صور الحالة الحالية للحذاء أو التلفيات' : 'Shoe Condition or Specific Scuff Photos'}
            value={shoePhoto}
            onChange={setShoePhoto}
            helperText={isRTL ? 'التقط صورة لمساعدة خبير الصيانة في تقييم نوع الجلد وحالة النعل' : 'Help our cobbler assess leather patina, welt condition, and scuffs'}
            isRTL={isRTL}
          />
        </div>

        {/* 3. Select Date & Time (Choose drop-off date & time) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '٣. تحديد موعد الاستلام' : '3. Select Date & Time'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'اختر وقت حضور الفاليه' : 'Choose drop-off date & time'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              label={isRTL ? 'تاريخ الاستلام' : 'Collection Date'}
              value={dropoffDate}
              onChange={setDropoffDate}
              isRTL={isRTL}
            />
            <TimePicker
              label={isRTL ? 'فترة الاستلام الزمنية' : 'Collection Window'}
              value={dropoffTime}
              onChange={setDropoffTime}
              isRTL={isRTL}
            />
          </div>
        </div>

        {/* 4. Pickup & Delivery (Set pickup & delivery address) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '٤. الاستلام والتسليم' : '4. Pickup & Delivery'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'عنوان الفاليه' : 'Set pickup & delivery address'}
            </span>
          </div>

          <AddressInput
            label={isRTL ? 'عنوان الفاليه لاستلام وتسليم الأحذية' : 'Valet Collection & Delivery Address'}
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
              {isRTL ? 'تم تأكيد طلب العناية بالأحذية!' : 'Shoe Care Confirmed!'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {isRTL 
                ? `سيقوم فاليه مستر باتلر باستلام الحذاء بتاريخ ${dropoffDate} خلال الفترة ${dropoffTime}.`
                : `Mr. Butler cobbler valet assigned for pickup on ${dropoffDate} during ${dropoffTime}.`}
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
