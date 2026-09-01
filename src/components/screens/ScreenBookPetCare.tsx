import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { DatePicker, TimePicker, AddressInput, AddressValue } from '../forms';
import { 
  Dog, 
  Cat, 
  Scissors, 
  Footprints, 
  Home, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight
} from 'lucide-react';

interface ScreenBookPetCareProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const ScreenBookPetCare: React.FC<ScreenBookPetCareProps> = ({ onNavigate, lang }) => {
  const isRTL = lang === 'ar';
  const [serviceType, setServiceType] = useState<'grooming' | 'walking' | 'sitting'>('grooming');
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [petName, setPetName] = useState('Titus');
  const [breed, setBreed] = useState('Great Dane');
  const [instructions, setInstructions] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('10:00 AM - 12:00 PM');
  const [address, setAddress] = useState<AddressValue>({
    street: '1007 Mountain Drive',
    unit: 'Penthouse A',
    city: 'Dubai Marina',
    postalCode: '00000',
  });
  const [isBooked, setIsBooked] = useState(false);

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#0F172A] text-[#121C2A] dark:text-white flex flex-col justify-between transition-colors pb-12" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Recurring Header */}
      <RecurringAppHeader 
        currentScreen="book_pet_care" 
        onNavigate={onNavigate} 
        lang={lang} 
        title="Mr. Butler"
        statusMessage={isRTL ? "فريق العناية بالحيوانات الأليفة معتمد وجاهز لتقديم أفضل رعاية." : "Certified companion valets on standby in your neighborhood."}
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
            {isRTL ? 'رعاية الحيوانات الأليفة الفاخرة' : 'Companion Valet Care'}
          </span>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#00444D] dark:text-white tracking-tight">
            {isRTL ? 'خدمات رعاية الحيوانات الأليفة' : 'Pet Care & Valet'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isRTL ? 'استحمام وقص معقم، نزهات ممتعة في الحدائق المجاورة، ورعاية منزلية راقية بأعلى معايير الأمان.' : 'Exceptional grooming, energizing strolls, and trusted in-home companion care.'}
          </p>
        </div>

        {/* 1. Select Service (Choose pet care service) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '١. اختيار نوع الخدمة' : '1. Select Service'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'اختر الرعاية المناسبة' : 'Choose pet care service'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'grooming', title: isRTL ? 'سبا واستحمام ملكي' : 'Royal Spa Grooming', desc: isRTL ? 'قص فراء، حمام علاجي وقص أظافر' : 'Bespoke coat trim, bath & nail buffing', icon: Scissors },
              { id: 'walking', title: isRTL ? 'نزهة خاصة ونشاط' : 'Energizing Walking', desc: isRTL ? 'جولة ٤٥ دقيقة في مسارات خضراء' : 'Private 45-minute neighborhood stroll', icon: Footprints },
              { id: 'sitting', title: isRTL ? 'رعاية منزلية واستضافة' : 'In-Home Valet Sitting', desc: isRTL ? 'مرافقة واهتمام بالوجبات والدواء' : 'Attentive companionship & feeding', icon: Home }
            ].map(svc => {
              const Icon = svc.icon;
              const isSelected = serviceType === svc.id;
              return (
                <button
                  key={svc.id}
                  onClick={() => setServiceType(svc.id as any)}
                  className={`p-4 rounded-2xl border text-left rtl:text-right flex flex-col gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00444D] text-white border-[#00444D] shadow-md'
                      : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-[#EFF4FF]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-white/20 text-[#FFE088]' : 'bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA]'}`}>
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

        {/* 2. Pet Profile (Enter pet details & notes) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '٢. ملف الحيوان الأليف' : '2. Pet Profile'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'تفاصيل الأليف والملاحظات' : 'Enter pet details & notes'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pet Type Switcher */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                {isRTL ? 'النوع' : 'Species'}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPetType('dog')}
                  className={`flex-1 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer transition-colors ${
                    petType === 'dog'
                      ? 'bg-[#00444D] text-white border-[#00444D]'
                      : 'border-[#D9E3F6] dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Dog className="w-4 h-4" />
                  <span>{isRTL ? 'كلب' : 'Canine'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPetType('cat')}
                  className={`flex-1 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer transition-colors ${
                    petType === 'cat'
                      ? 'bg-[#00444D] text-white border-[#00444D]'
                      : 'border-[#D9E3F6] dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Cat className="w-4 h-4" />
                  <span>{isRTL ? 'قطة' : 'Feline'}</span>
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                {isRTL ? 'اسم الأليف' : 'Companion Name'}
              </span>
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
            <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
              {isRTL ? 'السلالة / الحجم' : 'Breed / Size'}
            </span>
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              placeholder="Great Dane / Large"
              className="w-full bg-[#F8F9FF] dark:bg-slate-800 border border-[#D9E3F6] dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-[#00444D]"
            />
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
              {isRTL ? 'تعليمات خاصة ونظام التغذية' : 'Temperament & Dietary Notes'}
            </span>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder={isRTL ? 'أليف ودود، يحب المشي الهادئ في الحديقة، حساس تجاه الأصوات العالية.' : 'Gentle giant, loves calm walks along the park, sensitive to loud sirens.'}
              className="w-full bg-[#F8F9FF] dark:bg-slate-800 border border-[#D9E3F6] dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#00444D] h-20 resize-none"
            />
          </div>

        </div>

        {/* 3. Select Date & Time (Choose service date & time window) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '٣. تحديد التاريخ والوقت' : '3. Select Date & Time'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'اختر وقت الخدمة' : 'Choose service date & time'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              label={isRTL ? 'تاريخ الخدمة' : 'Service Date'}
              value={date}
              onChange={setDate}
              isRTL={isRTL}
            />
            <TimePicker
              label={isRTL ? 'فترة الحضور' : 'Time Window'}
              value={time}
              onChange={setTime}
              isRTL={isRTL}
            />
          </div>
        </div>

        {/* 4. Location (Set service location & address) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '٤. موقع تقديم الخدمة' : '4. Location'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'عنوان الإقامة' : 'Set service location & address'}
            </span>
          </div>

          <AddressInput
            label={isRTL ? 'عنوان حضور فاليه الأليف' : 'Service Address'}
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
              {isRTL ? 'تم تأكيد موعد رعاية الأليف!' : 'Pet Service Booked!'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {isRTL 
                ? `تم تعيين فاليه رعاية الأليف لـ ${petName} (${breed}) بتاريخ ${date} في ${time}.`
                : `Your pet valet has been assigned for ${petName} (${breed}) - ${serviceType} on ${date} during ${time}.`}
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

