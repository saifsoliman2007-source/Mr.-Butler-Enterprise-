import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { 
  SegmentedControl, 
  Toggle, 
  DatePicker, 
  TimePicker, 
  AddressInput, 
  AddressValue, 
  ImageInput, 
  Checkbox,
  TextInput 
} from '../forms';
import { 
  Sparkles, 
  Plus, 
  Minus, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  Leaf,
  Shirt
} from 'lucide-react';

interface ScreenBookDryCleaningProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
}

interface GarmentItem {
  id: string;
  name: string;
  price: number;
  description: string;
  count: number;
}

export const ScreenBookDryCleaning: React.FC<ScreenBookDryCleaningProps> = ({ 
  onNavigate, 
  lang,
  onLanguageChange,
}) => {
  const isRTL = lang === 'ar';

  const [selectedService, setSelectedService] = useState<'dry_clean' | 'wash_fold' | 'ironing'>('dry_clean');
  const [starchLevel, setStarchLevel] = useState<'none' | 'light' | 'medium' | 'crisp'>('light');
  const [ecoFriendly, setEcoFriendly] = useState(true);
  const [fragranceFree, setFragranceFree] = useState(false);
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('08:00 AM - 10:00 AM');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [garmentPhoto, setGarmentPhoto] = useState<string | null>(null);
  const [address, setAddress] = useState<AddressValue>({
    street: '1007 Mountain Drive',
    unit: 'East Wing Suite 4',
    city: 'Dubai Marina',
    postalCode: '00000',
  });
  const [isBooked, setIsBooked] = useState(false);

  const [items, setItems] = useState<GarmentItem[]>([
    { id: 'suit', name: isRTL ? 'بدلة توكسيدو قطعتين' : 'Two-Piece Suits & Tuxedos', price: 24, description: isRTL ? 'كي يدوي مع شماعات مخصصة' : 'Hand pressed with contoured hangers', count: 2 },
    { id: 'dress', name: isRTL ? 'فساتين سهرة وأقمشة رقيقة' : 'Evening Gowns & Dresses', price: 32, description: isRTL ? 'فحص دقيق للأقمشة الحساسة' : 'Delicate fabric inspection & gentle clean', count: 1 },
    { id: 'shirt', name: isRTL ? 'قمصان رسمية كلاسيكية' : 'Executive Dress Shirts', price: 8, description: isRTL ? 'عناية بالياقات ولمسات نهائية يدوية' : 'Collar stay alignment & hand finishing', count: 4 },
    { id: 'silk', name: isRTL ? 'حرير وكشمير' : 'Silk, Cashmere & Delicates', price: 18, description: isRTL ? 'معالجة بمذيبات عضوية خالية من السموم' : 'Zero-toxin eco-solvent treatment', count: 0 },
    { id: 'bedding', name: isRTL ? 'مفارش قطن مصري فاخر' : 'Egyptian Cotton Linens', price: 15, description: isRTL ? 'تعقيم مع طي متقن' : 'Sanitized & crisply folded', count: 0 },
  ]);

  const updateItemCount = (id: string, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, count: Math.max(0, item.count + delta) };
      }
      return item;
    }));
  };

  const totalItems = items.reduce((sum, item) => sum + item.count, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.count), 0);
  const total = subtotal;

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#0F172A] text-[#121C2A] dark:text-white flex flex-col justify-between transition-colors pb-12" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Recurring Header */}
      <RecurringAppHeader 
        currentScreen="book_dry_cleaning" 
        onNavigate={onNavigate} 
        lang={lang} 
        onLanguageChange={onLanguageChange}
        title="Mr. Butler"
        statusMessage={isRTL ? 'مواعيد الاستلام متوفرة اليوم في منطقتك.' : 'Valet slots available today in your district.'}
      />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('our_services')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00444D] dark:text-[#ABEDFA] hover:underline cursor-pointer"
          >
            {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{isRTL ? 'العودة للخدمات' : 'Back to Services'}</span>
          </button>
          <span className="text-[11px] font-mono text-slate-400">
            {isRTL ? 'خدمة العناية بالملابس الفاخرة' : 'Imperial Garment Care'}
          </span>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#00444D] dark:text-white tracking-tight">
            {isRTL ? 'الغسيل والتنظيف الجاف' : 'Dry Cleaning & Laundry'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isRTL ? 'اختر الملابس، تفاصيل العناية، وموعد خدمة الاستلام الفاخرة من منزلك.' : 'Select garments, tailoring preferences, and schedule white-glove valet pickup.'}
          </p>
        </div>

        {/* 1. Service Selection using Shared SegmentedControl */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider block">
            {isRTL ? '١. نوع الخدمة المطلوبة' : '1. Select Care Type'}
          </label>
          <SegmentedControl<'dry_clean' | 'wash_fold' | 'ironing'>
            options={[
              { value: 'dry_clean', label: isRTL ? 'تنظيف جاف وكي' : 'Dry Clean & Press' },
              { value: 'wash_fold', label: isRTL ? 'غسيل وطي' : 'Wash & Fold' },
              { value: 'ironing', label: isRTL ? 'كي بالبخار اليدوي' : 'Artisan Steam & Ironing' },
            ]}
            value={selectedService}
            onChange={(val) => setSelectedService(val)}
            isRTL={isRTL}
          />
        </div>

        {/* 2. Garment Selection Catalog with Counters */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider block">
            {isRTL ? '٢. تحديد الملابس والقطع' : '2. Select Garments & Items'}
          </label>
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-[#E2E8F0] dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs overflow-hidden">
            {items.map(item => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#00444D] dark:text-white">
                      {item.name}
                    </span>
                    <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA]">
                      ${item.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 bg-[#F8F9FF] dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-[#D9E3F6] dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => updateItemCount(item.id, -1)}
                    disabled={item.count === 0}
                    aria-label={`Decrease ${item.name}`}
                    className="p-1 rounded-lg text-slate-500 hover:text-black dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center font-bold text-xs">
                    {item.count}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateItemCount(item.id, 1)}
                    aria-label={`Increase ${item.name}`}
                    className="p-1 rounded-lg text-[#00444D] dark:text-[#ABEDFA] hover:bg-[#E6EEFF] dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Tailoring & Care Preferences */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider block">
            {isRTL ? '٣. تفضيلات النشا والكي' : '3. Starch & Fabric Preferences'}
          </label>
          <SegmentedControl<'none' | 'light' | 'medium' | 'crisp'>
            options={[
              { value: 'none', label: isRTL ? 'بدون نشا' : 'None' },
              { value: 'light', label: isRTL ? 'نشا خفيف' : 'Light' },
              { value: 'medium', label: isRTL ? 'نشا متوسط' : 'Medium' },
              { value: 'crisp', label: isRTL ? 'نشا قوي' : 'Crisp' },
            ]}
            value={starchLevel}
            onChange={(lvl) => setStarchLevel(lvl)}
            isRTL={isRTL}
          />
        </div>

        {/* Eco Options & Toggles */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-[#E2E8F0] dark:border-slate-800 space-y-3 shadow-xs">
          <Toggle
            checked={ecoFriendly}
            onChange={setEcoFriendly}
            label={isRTL ? 'مذيبات عضوية صديقة للبيئة' : 'Eco-Organic Solvents'}
            description={isRTL ? 'معالجة لطيفة خالية من السموم والمواد الكيميائية القاسية' : 'Non-toxic, hypo-allergenic garment-safe wash'}
            isRTL={isRTL}
          />

          <div className="h-px bg-slate-100 dark:bg-slate-800" />

          <Toggle
            checked={fragranceFree}
            onChange={setFragranceFree}
            label={isRTL ? 'غسيل بدون عطور صناعية' : 'Fragrance-Free Finish'}
            description={isRTL ? 'ملائم لأصحاب البشرة الحساسة' : 'Ideal for sensitive skin and bespoke silks'}
            isRTL={isRTL}
          />
        </div>

        {/* 4. Service Address Primitive */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-[#E2E8F0] dark:border-slate-800 shadow-xs">
          <AddressInput
            label={isRTL ? 'عنوان استلام وتسليم الملابس' : 'Valet Pickup & Delivery Address'}
            value={address}
            onChange={setAddress}
            isRTL={isRTL}
          />
        </div>

        {/* 5. Date & Time Picker Primitives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-[#E2E8F0] dark:border-slate-800 shadow-xs">
            <DatePicker
              label={isRTL ? 'تاريخ الاستلام' : 'Valet Pickup Date'}
              value={pickupDate}
              onChange={setPickupDate}
              isRTL={isRTL}
            />
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-[#E2E8F0] dark:border-slate-800 shadow-xs">
            <TimePicker
              label={isRTL ? 'الفترة الزمنية للاستلام' : 'Pickup Time Window'}
              value={pickupTime}
              onChange={setPickupTime}
              isRTL={isRTL}
            />
          </div>
        </div>

        {/* 6. Garment Photo Upload (Special Instructions) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-[#E2E8F0] dark:border-slate-800 space-y-4 shadow-xs">
          <ImageInput
            label={isRTL ? 'صورة للبقع أو تعليمات الغسيل الخاصة (اختياري)' : 'Stain Photo or Care Tag Detail (Optional)'}
            value={garmentPhoto}
            onChange={setGarmentPhoto}
            helperText={isRTL ? 'التقط صورة للبقعة ليتعامل معها خبير الأقمشة بعناية خاصة' : 'Take a photo of specific stains or delicate couture care tags'}
            isRTL={isRTL}
          />

          <TextInput
            label={isRTL ? 'ملاحظات إضافية للسيد باتلر' : 'Special Concierge Notes'}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder={isRTL ? 'مثال: يرجى وضع علامات خياطة على ياقة القميص الأزرق...' : 'e.g., Please pay special attention to the lapel on the tuxedo...'}
            isRTL={isRTL}
          />
        </div>

        {/* Order Summary & Confirm Action */}
        <div className="bg-gradient-to-br from-white to-[#F8F9FF] dark:from-slate-900 dark:to-slate-800 p-5 sm:p-6 rounded-3xl border border-[#D9E3F6] dark:border-slate-700 space-y-4 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>{isRTL ? `القطع المحددة (${totalItems})` : `Selected Items (${totalItems})`}</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>{isRTL ? 'خدمة الاستلام والتسليم الفاخرة' : 'White-Glove Valet Collection & Delivery'}</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {isRTL ? 'مجانية بالكامل' : 'Complimentary'}
            </span>
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block">
                {isRTL ? 'إجمالي التكلفة المقدرة' : 'Total Estimate'}
              </span>
              <span className="font-serif text-2xl font-bold text-[#00444D] dark:text-white">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => setIsBooked(true)}
              disabled={totalItems === 0}
              className="bg-[#00444D] hover:bg-[#0D5D68] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed border-b-2 border-[#CCA730] cursor-pointer"
            >
              {isRTL ? 'تأكيد طلب الاستلام' : 'Confirm Valet Pickup'}
            </button>
          </div>
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
              {isRTL ? 'تم تأكيد موعد الاستلام!' : 'Valet Dispatched!'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {isRTL 
                ? `تم تعيين موعد الاستلام لعدد ${totalItems} قطعة في ${pickupDate} خلال الفترة ${pickupTime}.` 
                : `Your Mr. Butler valet has been assigned. We will collect ${totalItems} items at ${pickupDate} during ${pickupTime}.`}
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsBooked(false);
                  onNavigate('our_services');
                }}
                className="w-full py-2.5 bg-[#00444D] text-white rounded-xl font-semibold text-xs shadow-md cursor-pointer"
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
