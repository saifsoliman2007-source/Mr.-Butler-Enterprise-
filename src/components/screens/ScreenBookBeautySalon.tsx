import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { 
  DatePicker, 
  TimePicker, 
  AddressInput, 
  AddressValue, 
  ServiceTypeGrid,
  ItemQuantityStepper
} from '../forms';
import { 
  Sparkle, 
  Scissors, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  Home, 
  Crown, 
  ArrowRight,
  ShoppingBag,
  HeartHandshake
} from 'lucide-react';

interface ScreenBookBeautySalonProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
}

export type BeautyPackageTier = 'essential' | 'signature' | 'vip';

export interface BeautyServiceItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  serviceType: BeautyPackageTier;
  prices: Record<BeautyPackageTier, number>;
  count: number;
}

export const ScreenBookBeautySalon: React.FC<ScreenBookBeautySalonProps> = ({ 
  onNavigate, 
  lang,
  onLanguageChange 
}) => {
  const isRTL = lang === 'ar';

  const [items, setItems] = useState<BeautyServiceItem[]>([
    {
      id: 'haircut',
      name: 'Haircut & Bespoke Styling',
      nameAr: 'قص وتصفيف الشعر الفاخر',
      description: 'Precision cut, luxury hair wash, blowdry & styling',
      descriptionAr: 'قص دقيق، غسيل علاجي، تجفيف وتصفيف راقٍ',
      serviceType: 'signature',
      prices: { essential: 65, signature: 95, vip: 140 },
      count: 1,
    },
    {
      id: 'facial',
      name: 'Facial & Skin Therapy',
      nameAr: 'عناية وترطيب البشرة العميقة',
      description: 'Deep pore cleansing, botanical serum & jade roller',
      descriptionAr: 'تنظيف عميق، سيروم نباتي فاخر ومساج باليشم',
      serviceType: 'signature',
      prices: { essential: 85, signature: 130, vip: 185 },
      count: 0,
    },
    {
      id: 'manicure',
      name: 'Executive Manicure & Pedicure',
      nameAr: 'مانيكير وبيديكير تنفيذي',
      description: 'Nail shaping, dead skin removal, massage & polish',
      descriptionAr: 'تشكيل الأظافر، إزالة الجلد الميت، مساج وتلميع',
      serviceType: 'essential',
      prices: { essential: 55, signature: 80, vip: 115 },
      count: 0,
    },
    {
      id: 'shave',
      name: 'Royal Hot Towel Shave',
      nameAr: 'حلاقة ملكية بالفوطة الساخنة',
      description: 'Straight-razor classic shave, essential oils, balm',
      descriptionAr: 'حلاقة بالموس الكلاسيكي، زيوت عطرية وبلسم مهدئ',
      serviceType: 'vip',
      prices: { essential: 50, signature: 75, vip: 105 },
      count: 0,
    },
    {
      id: 'massage',
      name: 'Head & Neck Relaxation Therapy',
      nameAr: 'مساج الرأس والرقبة العلاجي',
      description: 'Aromatherapy pressure points, tension relief',
      descriptionAr: 'تدليك بالزيوت العطرية لنقاط الضغط وإزالة الإجهاد',
      serviceType: 'signature',
      prices: { essential: 60, signature: 90, vip: 135 },
      count: 0,
    }
  ]);

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

  const stylists = [
    { id: 'julian', name: isRTL ? 'مصفف الشعر جوليان' : 'Master Stylist Julian', rating: '5.0 ★', spec: isRTL ? 'تصفيف وقص احترافي' : 'Bespoke Grooming & Cut', avatar: '✂️' },
    { id: 'elena', name: isRTL ? 'أخصائية البشرة إيلينا' : 'Artisan Elena', rating: '4.9 ★', spec: isRTL ? 'علاج وتغذية البشرة' : 'Facial Therapy & Skin', avatar: '💆' },
    { id: 'arthur', name: isRTL ? 'الحلاق الملكي آرثر' : 'Barber Arthur', rating: '5.0 ★', spec: isRTL ? 'حلاقة كلاسيكية ولحية' : 'Hot Towel Shave & Beard', avatar: '💈' },
  ];

  const updateItemCount = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextCount = Math.max(0, item.count + delta);
        return { ...item, count: nextCount };
      }
      return item;
    }));
  };

  const updateItemServiceType = (id: string, newType: BeautyPackageTier) => {
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
        currentScreen="book_beauty_salon" 
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
            {isRTL ? 'خدمات صالون التجميل والعناية' : 'Beauty Salon Services'}
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {isRTL ? 'عناية شخصية فائقة، علاجات تجديد البشرة، وتصفيف الشعر في راحة منزلك أو جناحك الخاص.' : 'Personalized grooming, rejuvenating skin treatments, and hair styling in the comfort of your home or private suite.'}
          </p>
        </div>

        {/* 1. Select Beauty Services & Package Tiers */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Sparkles className="w-3.5 h-3.5 text-[#00444D] dark:text-[#ABEDFA] shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] tracking-wide truncate">
                {isRTL ? '١. اختيار جلسات العناية والباقة' : '1. Select Treatments & Package Tiers'}
              </h2>
            </div>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-[#E6EEFF] dark:bg-slate-800 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 self-start sm:self-auto">
              {isRTL ? `${totalItems} جلسات محددة` : `${totalItems} sessions selected`}
            </span>
          </div>

          {/* Services catalog */}
          <div className="space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 px-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <span>{isRTL ? 'قائمة الجلسات وخيارات الباقات' : 'Services Catalog & Package Options'}</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {isRTL ? 'اختر مستوى الباقة والعدد لكل جلسة' : 'Select package tier & guest/session count'}
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
                            {isRTL ? 'للجلسة' : 'session'}
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
                    <ServiceTypeGrid<BeautyPackageTier>
                      columns={3}
                      size="xs"
                      isRTL={isRTL}
                      value={item.serviceType}
                      onChange={(svc) => updateItemServiceType(item.id, svc)}
                      ariaLabel={`Package tier for ${isRTL ? item.nameAr : item.name}`}
                      options={[
                        {
                          id: 'essential',
                          label: 'Essential',
                          labelAr: 'أساسي',
                          price: item.prices.essential,
                          icon: Sparkle
                        },
                        {
                          id: 'signature',
                          label: 'Signature',
                          labelAr: 'متميز',
                          price: item.prices.signature,
                          icon: Sparkles
                        },
                        {
                          id: 'vip',
                          label: 'VIP Luxury',
                          labelAr: 'ملكي فاخر',
                          price: item.prices.vip,
                          icon: Crown
                        }
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Select Professional / Stylist */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Crown className="w-3.5 h-3.5 text-[#00444D] dark:text-[#ABEDFA] shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] tracking-wide truncate">
                {isRTL ? '٢. اختيار الأخصائي أو المصفف' : '2. Select Stylist or Artisan'}
              </h2>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400">
              {isRTL ? 'طاقم معتمد' : 'Certified talent'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {stylists.map(stylist => {
              const isSelected = selectedStylist === stylist.id;
              return (
                <button
                  key={stylist.id}
                  type="button"
                  onClick={() => setSelectedStylist(stylist.id)}
                  className={`p-3 rounded-xl border text-left rtl:text-right flex items-center gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA] shadow-2xs'
                      : 'bg-[#F8F9FF] dark:bg-slate-800/40 border-[#E2E8F0] dark:border-slate-800'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-700 shadow-2xs flex items-center justify-center text-base shrink-0">
                    {stylist.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-800 dark:text-white truncate">{stylist.name}</h4>
                      <span className="text-[10px] text-amber-600 font-bold">{stylist.rating}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{stylist.spec}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Schedule Date & Time */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] border-b border-slate-100 dark:border-slate-800 pb-2">
            {isRTL ? '٣. موعد الجلسة' : '3. Appointment Date & Time'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DatePicker
              label={isRTL ? 'تاريخ الموعد' : 'Date'}
              value={date}
              onChange={setDate}
              isRTL={isRTL}
            />
            <TimePicker
              label={isRTL ? 'الوقت المفضل' : 'Preferred Window'}
              value={time}
              onChange={setTime}
              options={[
                '09:00 AM - 11:00 AM',
                '11:00 AM - 01:00 PM',
                '02:00 PM - 04:00 PM',
                '04:00 PM - 06:00 PM',
                '06:00 PM - 08:00 PM'
              ]}
              isRTL={isRTL}
            />
          </div>
        </div>

        {/* 4. Location Address */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] border-b border-slate-100 dark:border-slate-800 pb-2">
            {isRTL ? '٤. عنوان وموقع الجلسة' : '4. In-Suite / Home Location'}
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
                {isRTL ? 'إجمالي جلسات الصالون' : 'Estimated Salon Total'}
              </span>
            </div>
            <div className="text-right rtl:text-left">
              <span className="font-mono text-lg sm:text-xl font-bold text-[#FFE088]">
                ${calculatedTotal}
              </span>
              <span className="text-[10px] text-white/60 block">
                {isRTL ? `${totalItems} جلسات` : `${totalItems} sessions`}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsBooked(true)}
            disabled={totalItems === 0}
            className="w-full py-3 px-4 rounded-xl bg-[#FFE088] text-[#00444D] hover:bg-[#FFD566] disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isRTL ? 'تأكيد حجز جلسة الصالون' : 'Confirm Salon Appointment'}
            </span>
          </button>
        </div>

        {/* Confirmation Modal */}
        {isBooked && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-5 text-center space-y-4 shadow-2xl border border-[#D9E3F6] dark:border-slate-800">
              <div className="w-12 h-12 rounded-full bg-[#E6EEFF] dark:bg-slate-800 text-[#00444D] dark:text-[#FFE088] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#00444D] dark:text-white" style={{ fontFamily: "'Libre Caslon Text', Georgia, serif" }}>
                  {isRTL ? 'تم تأكيد موعد الصالون' : 'Salon Appointment Confirmed'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {isRTL ? `تم تأكيد حجز الموعد في ${date} خلال الفترة ${time}. سيصل خبير الصالون مع كافة الأدوات المعقمة.` : `Your booking is confirmed for ${date} during ${time}. Our specialist will arrive with sanitized, salon-grade equipment.`}
                </p>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => onNavigate('our_services')}
                  className="w-full py-2.5 rounded-xl bg-[#00444D] text-white font-bold text-xs hover:bg-[#0D5D68] cursor-pointer"
                >
                  {isRTL ? 'العودة للخدمات' : 'Back to Services'}
                </button>
                <button
                  onClick={() => setIsBooked(false)}
                  className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 cursor-pointer"
                >
                  {isRTL ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
