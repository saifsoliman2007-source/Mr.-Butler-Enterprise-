import React, { useState } from 'react';
import { ScreenId, Language, ProviderOrder } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { 
  DatePicker, 
  TimePicker, 
  AddressInput, 
  AddressValue, 
  TextInput, 
  ImageInput,
  ServiceTypeGrid,
  ItemQuantityStepper
} from '../forms';
import { 
  Dog, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  Heart, 
  ShieldCheck, 
  ArrowRight, 
  ShoppingBag, 
  Clock,
  Eye
} from 'lucide-react';

interface ScreenBookPetCareProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
  onBookingSubmit?: (orderData: Partial<ProviderOrder>) => void;
}

export type PetCareTier = 'essential' | 'full' | 'vip';

export interface PetProgramItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  serviceType: PetCareTier;
  prices: Record<PetCareTier, number>;
  count: number;
}

export const ScreenBookPetCare: React.FC<ScreenBookPetCareProps> = ({ 
  onNavigate, 
  lang,
  onLanguageChange,
  onBookingSubmit 
}) => {
  const isRTL = lang === 'ar';

  const [items, setItems] = useState<PetProgramItem[]>([
    {
      id: 'spa',
      name: 'Hydrotherapy & Spa Grooming',
      nameAr: 'سبا واستحمام فاخر',
      description: 'Organic coat bath, nail clipping, ear cleansing & gentle blowout',
      descriptionAr: 'استحمام عضوي للفرو، قص أظافر، تنظيف أذنين وتجفيف لطيف',
      serviceType: 'full',
      prices: { essential: 55, full: 80, vip: 120 },
      count: 1,
    },
    {
      id: 'walking',
      name: 'Private VIP Walk & Exercise',
      nameAr: 'تمشية خاصة ومرافقة رياضية',
      description: 'Solo walking with live GPS tracking, hydration and paw wiping',
      descriptionAr: 'تمشية فردية مع تتبع مباشر ومسح الأقدام بعد الجولة',
      serviceType: 'full',
      prices: { essential: 30, full: 45, vip: 70 },
      count: 0,
    },
    {
      id: 'sitting',
      name: 'In-Residence Pet Sitting',
      nameAr: 'جليس حيوانات أليفة مقيم',
      description: 'Attentive home companionship, feeding routine, and photo updates',
      descriptionAr: 'مرافقة منزلية، جدول تغذية منتظم وتحديثات بالصور',
      serviceType: 'full',
      prices: { essential: 65, full: 95, vip: 145 },
      count: 0,
    },
    {
      id: 'vet',
      name: 'Concierge Vet & Health Check',
      nameAr: 'فحص بيطري وتطعيمات منزلية',
      description: 'Licensed veterinarian house visit, vaccine booster, wellness check',
      descriptionAr: 'زيارة طبيب بيطري مرخص، تطعيمات وقائية وفحص صحي شامل',
      serviceType: 'vip',
      prices: { essential: 90, full: 135, vip: 190 },
      count: 0,
    },
    {
      id: 'play',
      name: 'Enrichment & Interactive Play',
      nameAr: 'تدريب ولعب تفاعلي',
      description: 'Mental stimulation puzzles, agility training and positive reward play',
      descriptionAr: 'ألعاب ذكاء لتنشيط الذهن، تمارين رشاقة ومكافآت إيجابية',
      serviceType: 'essential',
      prices: { essential: 40, full: 60, vip: 90 },
      count: 0,
    }
  ]);

  const [petType, setPetType] = useState<'dog' | 'cat' | 'other'>('dog');
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petPhoto, setPetPhoto] = useState<string | null>(null);
  const [medicalNotes, setMedicalNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:00 AM - 11:00 AM');
  const [address, setAddress] = useState<AddressValue>({
    street: '1007 Mountain Drive',
    unit: 'Villa 14',
    city: 'Dubai Marina',
    postalCode: '00000',
  });
  const [isBooked, setIsBooked] = useState(false);

  const updateItemCount = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextCount = Math.max(0, item.count + delta);
        return { ...item, count: nextCount };
      }
      return item;
    }));
  };

  const updateItemServiceType = (id: string, newType: PetCareTier) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, serviceType: newType };
      }
      return item;
    }));
  };

  const totalItems = items.reduce((sum, item) => sum + item.count, 0);
  const calculatedTotal = items.reduce((sum, item) => sum + (item.count * item.prices[item.serviceType]), 0);

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#0F172A] text-[#121C2A] dark:text-white flex flex-col justify-between transition-colors pb-8" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Recurring Header */}
      <RecurringAppHeader 
        currentScreen="book_pet_care" 
        onNavigate={onNavigate} 
        lang={lang} 
        onLanguageChange={onLanguageChange}
        title="Mr. Butler"
      />

      <main className="flex-1 max-w-2xl mx-auto w-full px-3.5 sm:px-5 py-4 sm:py-5 space-y-4 sm:space-y-5">
        
        {/* Breadcrumb Navigation */}
        <div>
          <button
            onClick={() => onNavigate('our_services')}
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#00444D] dark:text-[#ABEDFA] hover:underline cursor-pointer transition-colors"
          >
            {isRTL ? <ArrowRight className="w-3 h-3" /> : <ArrowLeft className="w-3 h-3" />}
            <span>{isRTL ? 'العودة للخدمات' : 'Back to Services'}</span>
          </button>
        </div>

        <div>
          <h1 
            className="font-serif text-xl sm:text-2xl font-bold text-[#00444D] dark:text-white tracking-tight leading-tight"
            style={{ fontFamily: "'Libre Caslon Text', Georgia, serif" }}
          >
            {isRTL ? 'خدمات رعاية الحيوانات الأليفة' : 'Pet Care Services'}
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {isRTL ? 'رعاية فائقة، استحمام وسبا فاخر، تمشية خاصة وزيارات بيطرية معتمدة. حدد الخدمات ومستوى الرعاية.' : 'White-glove grooming, hydrotherapy spa, private dog walking, and certified veterinary visits.'}
          </p>
        </div>

        {/* 1. Select Pet Programs & Tier Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Dog className="w-3.5 h-3.5 text-[#00444D] dark:text-[#ABEDFA] shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] tracking-wide truncate">
                {isRTL ? '١. اختيار برامج الرعاية والمستوى' : '1. Select Care Programs & Tier'}
              </h2>
            </div>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-[#E6EEFF] dark:bg-slate-800 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 self-start sm:self-auto">
              {isRTL ? `${totalItems} خدمات محددة` : `${totalItems} services selected`}
            </span>
          </div>

          {/* Programs catalog */}
          <div className="space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 px-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <span>{isRTL ? 'قائمة الخدمات وخيارات الرعاية' : 'Programs Catalog & Care Options'}</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {isRTL ? 'اختر مستوى الرعاية والعدد لكل برنامج' : 'Select care tier & pet/session count'}
              </span>
            </div>

            <div className="bg-[#F8F9FF] dark:bg-slate-800/50 rounded-xl border border-[#E2E8F0] dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {items.map(item => (
                <div key={item.id} className="p-3 space-y-2.5 hover:bg-white/60 dark:hover:bg-slate-800/80 transition-colors">
                  {/* Item header: title, price & stepper */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-xs sm:text-[13px] text-[#00444D] dark:text-white leading-snug">
                          {isRTL ? item.nameAr : item.name}
                        </h4>
                        <span className="font-mono text-[11px] font-bold text-[#00444D] dark:text-[#FFE088]">
                          ${item.prices[item.serviceType]}
                          <span className="text-[9px] font-sans font-normal text-slate-400 ml-0.5 rtl:ml-0 rtl:mr-0.5">
                            {isRTL ? 'للأليف' : 'pet'}
                          </span>
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                        {isRTL ? item.descriptionAr : item.description}
                      </p>
                    </div>

                    {/* Quantity Stepper with plus and minus */}
                    <ItemQuantityStepper
                      count={item.count}
                      onIncrement={() => updateItemCount(item.id, 1)}
                      onDecrement={() => updateItemCount(item.id, -1)}
                      itemName={isRTL ? item.nameAr : item.name}
                      size="sm"
                    />
                  </div>

                  {/* Grid-based Service Type Selector inline beside item */}
                  <div className="pt-1">
                    <ServiceTypeGrid<PetCareTier>
                      columns={3}
                      size="xs"
                      isRTL={isRTL}
                      value={item.serviceType}
                      onChange={(svc) => updateItemServiceType(item.id, svc)}
                      ariaLabel={`Care tier for ${isRTL ? item.nameAr : item.name}`}
                      options={[
                        {
                          id: 'essential',
                          label: 'Essential',
                          labelAr: 'أساسي',
                          price: item.prices.essential,
                          icon: Clock
                        },
                        {
                          id: 'full',
                          label: 'Full Care',
                          labelAr: 'شامل',
                          price: item.prices.full,
                          icon: Sparkles
                        },
                        {
                          id: 'vip',
                          label: 'VIP Deluxe',
                          labelAr: 'فاخر ملكي',
                          price: item.prices.vip,
                          icon: Heart
                        }
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Pet Information */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Heart className="w-3.5 h-3.5 text-[#00444D] dark:text-[#ABEDFA] shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] tracking-wide truncate">
                {isRTL ? '٢. معلومات الحيوان الأليف' : '2. Pet Profile & Information'}
              </h2>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400">
              {isRTL ? 'بيانات أليفك' : 'Pet details'}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1.5">
              {isRTL ? 'نوع الأليف:' : 'Pet Type:'}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'dog', label: isRTL ? 'كلب' : 'Dog', icon: '🐕' },
                { id: 'cat', label: isRTL ? 'قط' : 'Cat', icon: '🐈' },
                { id: 'other', label: isRTL ? 'آخر' : 'Other Companion', icon: '🐾' }
              ].map(type => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setPetType(type.id as any)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    petType === type.id
                      ? 'bg-[#00444D] text-white border-[#00444D]'
                      : 'bg-white dark:bg-slate-800 border-[#D9E3F6] dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-[#E6EEFF]'
                  }`}
                >
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextInput
              label={isRTL ? 'اسم الأليف' : 'Pet Name'}
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder={isRTL ? 'مثال: ليو، ماكس...' : 'e.g., Winston, Bella...'}
              isRTL={isRTL}
            />
            <TextInput
              label={isRTL ? 'السلالة / العمر' : 'Breed / Age'}
              value={petBreed}
              onChange={(e) => setPetBreed(e.target.value)}
              placeholder={isRTL ? 'مثال: جولدن ريتريفر - سنتان' : 'e.g., French Bulldog, 3 yrs'}
              isRTL={isRTL}
            />
          </div>

          <ImageInput
            label={isRTL ? 'صورة للأليف (اختياري)' : 'Pet Photo (Optional)'}
            value={petPhoto}
            onChange={setPetPhoto}
            helperText={isRTL ? 'تساعد أخصائي الرعاية على التعرف على أليفك مسبقاً' : 'Allows our handler to recognize your companion upon arrival'}
            isRTL={isRTL}
          />

          <TextInput
            label={isRTL ? 'تعليمات طبية أو غذائية' : 'Dietary / Behavioral Notes'}
            value={medicalNotes}
            onChange={(e) => setMedicalNotes(e.target.value)}
            placeholder={isRTL ? 'مثال: حساسية من الدجاج، يفضل عدم لمس الأذنين...' : 'e.g., Chicken allergy, gentle with left paw, loves tennis ball...'}
            isRTL={isRTL}
          />
        </div>

        {/* 3. Schedule Date & Time */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] border-b border-slate-100 dark:border-slate-800 pb-2">
            {isRTL ? '٣. موعد الرعاية' : '3. Appointment Date & Time'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DatePicker
              label={isRTL ? 'تاريخ الموعد' : 'Date'}
              value={date}
              onChange={setDate}
              isRTL={isRTL}
            />
            <TimePicker
              label={isRTL ? 'نافذة الوقت' : 'Time Window'}
              value={time}
              onChange={setTime}
              options={[
                '08:00 AM - 10:00 AM',
                '10:00 AM - 12:00 PM',
                '01:00 PM - 03:00 PM',
                '03:00 PM - 05:00 PM',
                '05:00 PM - 07:00 PM'
              ]}
              isRTL={isRTL}
            />
          </div>
        </div>

        {/* 4. Service Address */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] border-b border-slate-100 dark:border-slate-800 pb-2">
            {isRTL ? '٤. موقع تقديم الخدمة' : '4. In-Residence / Pickup Address'}
          </h2>
          <AddressInput
            label={isRTL ? 'عنوان الإقامة' : 'Residence Location'}
            value={address}
            onChange={setAddress}
            isRTL={isRTL}
          />
        </div>

        {/* Order Summary & Submit Bar */}
        <div className="bg-[#00444D] text-white rounded-2xl p-4 sm:p-5 shadow-md space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#FFE088]" />
              <span className="text-xs font-semibold text-white/90">
                {isRTL ? 'إجمالي خدمات رعاية الأليف' : 'Estimated Pet Care Total'}
              </span>
            </div>
            <div className="text-right rtl:text-left">
              <span className="font-mono text-lg sm:text-xl font-bold text-[#FFE088]">
                ${calculatedTotal}
              </span>
              <span className="text-[10px] text-white/60 block">
                {isRTL ? `${totalItems} خدمات` : `${totalItems} services`}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const selectedItemsList = items
                .filter(it => it.count > 0)
                .map(it => ({
                  id: `it-${it.id}`,
                  name: `${isRTL ? it.nameAr : it.name} (${it.serviceType})`,
                  quantity: it.count,
                  price: it.prices[it.serviceType],
                  notes: `Pet: ${petName || 'Companion'} (${petType}, ${petBreed || 'Standard'}), Notes: ${medicalNotes || 'None'}`
                }));

              if (onBookingSubmit) {
                onBookingSubmit({
                  category: 'Pet Care Services',
                  serviceTitle: `VIP Pet Care & Grooming for ${petName || 'Companion'}`,
                  items: selectedItemsList.length > 0 ? selectedItemsList : [
                    { id: 'it-default', name: 'Concierge Pet Care & Wellness Session', quantity: totalItems || 1, price: calculatedTotal || 80 }
                  ],
                  estimatedPrice: calculatedTotal || 80,
                  requestedDateTime: `${date} (${time})`,
                  customerAddress: `${address.street}, ${address.unit || ''}`.trim(),
                  customerDistrict: address.city || 'Mayfair District',
                  customerNotes: `Pet: ${petName || 'Companion'} (${petBreed || petType}). ${medicalNotes}`.trim(),
                  uploadedImages: petPhoto ? [petPhoto] : [],
                });
              }
              setIsBooked(true);
            }}
            disabled={totalItems === 0}
            className="w-full py-3 px-4 rounded-xl bg-[#FFE088] text-[#00444D] hover:bg-[#FFD566] disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isRTL ? 'تأكيد حجز رعاية الحيوان الأليف' : 'Confirm Pet Care Booking'}
            </span>
          </button>
        </div>

        {/* Confirmation Modal */}
        {isBooked && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-5 text-center space-y-4 shadow-2xl border border-[#D9E3F6] dark:border-slate-800 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-[#E6EEFF] dark:bg-slate-800 text-[#00444D] dark:text-[#FFE088] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#00444D] dark:text-white" style={{ fontFamily: "'Libre Caslon Text', Georgia, serif" }}>
                  {isRTL ? 'تم تأكيد موعد رعاية الأليف' : 'Pet Care Appointment Confirmed'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {isRTL 
                    ? `تم جدولة الموعد في ${date} خلال الفترة ${time}. تم إرسال صورة الأليف والمعلومات الصحية إلى مقدم خدمة رعاية الحيوانات الأليفة.` 
                    : `Your pet care session has been booked for ${date} during ${time}. Your pet's photo and health profile have been dispatched to our certified handler.`}
                </p>
              </div>

              {petPhoto && (
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5 text-left rtl:text-right">
                  <img
                    src={petPhoto}
                    alt="Pet Intake Photo"
                    className="w-10 h-10 rounded-lg object-cover border border-slate-300 dark:border-slate-600"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-emerald-600 block">
                      {isRTL ? 'تم ربط صورة الأليف بالطلب' : 'Pet Photo Linked to Order'}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate block">
                      {petName ? `${petName} (${petBreed || petType})` : (isRTL ? 'جاهز لمشرف الرعاية' : 'Ready for handler review')}
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsBooked(false);
                    onNavigate('provider_order_details');
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#00444D] text-white font-bold text-xs hover:bg-[#0D5D68] cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-[#FFE088]" />
                  <span>{isRTL ? 'معاينة في تفاصيل الطلب لمزود الخدمة' : 'View in Provider Order Details'}</span>
                </button>
                <button
                  onClick={() => {
                    setIsBooked(false);
                    onNavigate('our_services');
                  }}
                  className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 cursor-pointer"
                >
                  {isRTL ? 'العودة للخدمات' : 'Back to Services'}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
