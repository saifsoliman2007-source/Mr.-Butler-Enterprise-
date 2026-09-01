import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { 
  DatePicker, 
  TimePicker, 
  AddressInput, 
  AddressValue, 
  ImageInput, 
  TextInput,
  ServiceTypeGrid,
  ItemQuantityStepper
} from '../forms';
import { 
  Footprints, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Wrench, 
  Droplets, 
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

interface ScreenBookShoeRepairProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
}

export type ShoeTreatmentType = 'polish' | 'resole' | 'dye' | 'shield';

export interface FootwearItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  serviceType: ShoeTreatmentType;
  prices: Record<ShoeTreatmentType, number>;
  count: number;
}

export const ScreenBookShoeRepair: React.FC<ScreenBookShoeRepairProps> = ({ 
  onNavigate, 
  lang,
  onLanguageChange 
}) => {
  const isRTL = lang === 'ar';

  const [items, setItems] = useState<FootwearItem[]>([
    {
      id: 'oxfords',
      name: 'Oxfords & Dress Shoes',
      nameAr: 'أوكسفورد وأحذية رسمية',
      description: 'Full-grain calfskin, brogues, monk straps',
      descriptionAr: 'جلد عجل طبيعي، بروغ، أحذية رسمية بإبزيم',
      serviceType: 'polish',
      prices: { polish: 25, resole: 65, dye: 45, shield: 20 },
      count: 1,
    },
    {
      id: 'heels',
      name: 'Heels & Luxury Pumps',
      nameAr: 'كعب وأحذية نسائية راقية',
      description: 'Stilettos, designer red soles, tip reinforcement',
      descriptionAr: 'كعب رفيع، نعل مصمم، تدعيم مقدمة الحذاء',
      serviceType: 'resole',
      prices: { polish: 25, resole: 45, dye: 40, shield: 20 },
      count: 1,
    },
    {
      id: 'boots',
      name: 'Leather & Chelsea Boots',
      nameAr: 'أحذية جلدية وبوت تشيلسي',
      description: 'Goodyear welted boots, elastic gore revive',
      descriptionAr: 'بوت مخيط غوديير، تجديد المطاط والجلد',
      serviceType: 'dye',
      prices: { polish: 30, resole: 75, dye: 55, shield: 25 },
      count: 0,
    },
    {
      id: 'sneakers',
      name: 'Designer Sneakers',
      nameAr: 'سنيكرز وأحذية رياضية فاخرة',
      description: 'Suede detailing, midsole unyellowing & deep clean',
      descriptionAr: 'تنظيف شمواه دقيق، تبييض النعل الأوسط',
      serviceType: 'shield',
      prices: { polish: 20, resole: 55, dye: 35, shield: 20 },
      count: 0,
    },
    {
      id: 'loafers',
      name: 'Suede & Velvet Loafers',
      nameAr: 'لوفرز وأحذية مخملية',
      description: 'Delicate suede nap restoration & heel tip',
      descriptionAr: 'استعادة ملمس الشمواه المخملي وكعب خفيف',
      serviceType: 'polish',
      prices: { polish: 25, resole: 60, dye: 45, shield: 22 },
      count: 0,
    }
  ]);

  const [shoePhoto, setShoePhoto] = useState<string | null>(null);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [dropoffDate, setDropoffDate] = useState(new Date().toISOString().split('T')[0]);
  const [dropoffTime, setDropoffTime] = useState('02:00 PM - 04:00 PM');
  const [address, setAddress] = useState<AddressValue>({
    street: '1007 Mountain Drive',
    unit: 'Penthouse A',
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

  const updateItemServiceType = (id: string, newType: ShoeTreatmentType) => {
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
        currentScreen="book_shoe_repair" 
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
            {isRTL ? 'صيانة وتلميع الأحذية الفاخرة' : 'Shoe Fix & Repair'}
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {isRTL ? 'ترميم احترافي، استبدال النعل وتلميع فرنسي شمعي. اختر الأحذية ونوع المعالجة المطلوبة.' : 'Expert restoration, sole replacement, and mirror-shine polishing with white-glove pickup.'}
          </p>
        </div>

        {/* 1. Select Footwear & Treatments Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Footprints className="w-3.5 h-3.5 text-[#00444D] dark:text-[#ABEDFA] shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] tracking-wide truncate">
                {isRTL ? '١. اختيار الأحذية ونوع المعالجة' : '1. Select Footwear & Treatments'}
              </h2>
            </div>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-[#E6EEFF] dark:bg-slate-800 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 self-start sm:self-auto">
              {isRTL ? `${totalItems} أزواج محددة` : `${totalItems} pairs selected`}
            </span>
          </div>

          {/* Footwear catalog */}
          <div className="space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 px-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <span>{isRTL ? 'قائمة الأحذية وخيارات المعالجة' : 'Footwear Catalog & Restoration Options'}</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {isRTL ? 'اختر نوع المعالجة والعدد لكل نوع' : 'Select treatment & pair quantity'}
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
                            {isRTL ? 'للزوج' : 'pair'}
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
                    <ServiceTypeGrid<ShoeTreatmentType>
                      columns={4}
                      size="xs"
                      isRTL={isRTL}
                      value={item.serviceType}
                      onChange={(svc) => updateItemServiceType(item.id, svc)}
                      ariaLabel={`Treatment for ${isRTL ? item.nameAr : item.name}`}
                      options={[
                        {
                          id: 'polish',
                          label: 'Mirror Polish',
                          labelAr: 'تلميع شمعي',
                          price: item.prices.polish,
                          icon: Sparkles
                        },
                        {
                          id: 'resole',
                          label: 'Sole & Heel',
                          labelAr: 'نعل وكعب',
                          price: item.prices.resole,
                          icon: Wrench
                        },
                        {
                          id: 'dye',
                          label: 'Color Dye',
                          labelAr: 'تجديد اللون',
                          price: item.prices.dye,
                          icon: Droplets
                        },
                        {
                          id: 'shield',
                          label: 'Nano Shield',
                          labelAr: 'عزل نانو',
                          price: item.prices.shield,
                          icon: ShieldCheck
                        }
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Photos & Custom Notes */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] border-b border-slate-100 dark:border-slate-800 pb-2">
            {isRTL ? '٢. صور الحذاء والتعليمات الخاصة' : '2. Photos & Artisan Instructions'}
          </h2>

          <ImageInput
            label={isRTL ? 'صورة الحذاء أو الخدش (اختياري)' : 'Shoe / Scratch Photo (Optional)'}
            value={shoePhoto}
            onChange={setShoePhoto}
            helperText={isRTL ? 'يساعد صانع الأحذية على تقييم نوع الجلد وعمق الخدوش' : 'Helps our master cobbler assess leather patina, welt condition, and scuffs'}
            isRTL={isRTL}
          />

          <TextInput
            label={isRTL ? 'تعليمات خاصة للورشة' : 'Special Cobbler Instructions'}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder={isRTL ? 'مثال: حماية النعل بنعل مطاطي خفيف دون تغيير اللون الأصلي...' : 'e.g., Apply brass toe plates, keep natural edge finish...'}
            isRTL={isRTL}
          />
        </div>

        {/* 3. Pickup Date & Time */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] border-b border-slate-100 dark:border-slate-800 pb-2">
            {isRTL ? '٣. موعد استلام الفاليه' : '3. Schedule Valet Pickup'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DatePicker
              label={isRTL ? 'تاريخ الاستلام' : 'Pickup Date'}
              value={dropoffDate}
              onChange={setDropoffDate}
              isRTL={isRTL}
            />
            <TimePicker
              label={isRTL ? 'نافذة الوقت' : 'Time Window'}
              value={dropoffTime}
              onChange={setDropoffTime}
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

        {/* 4. Pickup Address */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] border-b border-slate-100 dark:border-slate-800 pb-2">
            {isRTL ? '٤. عنوان الاستلام والتسليم' : '4. Residence / Delivery Address'}
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
                {isRTL ? 'إجمالي خدمة صيانة الأحذية' : 'Estimated Cobbler Total'}
              </span>
            </div>
            <div className="text-right rtl:text-left">
              <span className="font-mono text-lg sm:text-xl font-bold text-[#FFE088]">
                ${calculatedTotal}
              </span>
              <span className="text-[10px] text-white/60 block">
                {isRTL ? `${totalItems} أزواج محددة` : `${totalItems} pairs`}
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
              {isRTL ? 'تأكيد حجز صيانة الأحذية' : 'Confirm Footwear Valet'}
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
                  {isRTL ? 'تم تأكيد استلام الأحذية' : 'Shoe Valet Confirmed'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {isRTL ? `سيقوم مندوب الفاليه باستلام الأحذية في ${dropoffDate} خلال الفترة ${dropoffTime}. ستصلك حقيبة الأحذية المخصصة.` : `Our valet will arrive to collect your footwear on ${dropoffDate} during ${dropoffTime}. Custom footwear dust bags provided.`}
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
