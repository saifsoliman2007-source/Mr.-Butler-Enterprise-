import React, { useState } from 'react';
import { ScreenId, Language, ProviderOrder } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { 
  SegmentedControl, 
  Toggle, 
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
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Shirt, 
  Sparkles, 
  ShoppingBag, 
  Wind,
  Eye,
  Camera
} from 'lucide-react';

interface ScreenBookDryCleaningProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
  onBookingSubmit?: (orderData: Partial<ProviderOrder>) => void;
}

export type ServiceTypeOption = 'dry_clean' | 'wash_fold' | 'ironing';

export interface GarmentCareItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  serviceType: ServiceTypeOption;
  prices: Record<ServiceTypeOption, number>;
  count: number;
}

export const ScreenBookDryCleaning: React.FC<ScreenBookDryCleaningProps> = ({ 
  onNavigate, 
  lang,
  onLanguageChange,
  onBookingSubmit,
}) => {
  const isRTL = lang === 'ar';

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

  const [items, setItems] = useState<GarmentCareItem[]>([
    { 
      id: 'suit', 
      name: 'Two-Piece Suits & Tuxedos', 
      nameAr: 'بدلة توكسيدو قطعتين', 
      description: 'Hand pressed with contoured hangers', 
      descriptionAr: 'كي يدوي مع شماعات مخصصة',
      serviceType: 'dry_clean',
      prices: { dry_clean: 24, wash_fold: 16, ironing: 12 },
      count: 2 
    },
    { 
      id: 'shirt', 
      name: 'Executive Dress Shirts', 
      nameAr: 'قمصان رسمية كلاسيكية', 
      description: 'Collar stay alignment & hand finishing', 
      descriptionAr: 'عناية بالياقات ولمسات نهائية يدوية',
      serviceType: 'dry_clean',
      prices: { dry_clean: 8, wash_fold: 5, ironing: 4 },
      count: 4 
    },
    { 
      id: 'dress', 
      name: 'Evening Gowns & Silk Dresses', 
      nameAr: 'فساتين سهرة وأقمشة رقيقة', 
      description: 'Delicate couture fabric inspection & gentle clean', 
      descriptionAr: 'فحص دقيق للأقمشة الحساسة',
      serviceType: 'dry_clean',
      prices: { dry_clean: 32, wash_fold: 20, ironing: 16 },
      count: 1 
    },
    { 
      id: 'coat', 
      name: 'Cashmere & Wool Overcoats', 
      nameAr: 'معاطف صوف وكشمير', 
      description: 'Deep fiber refresh & lint removal', 
      descriptionAr: 'معالجة جافة للأقمشة الثقيلة',
      serviceType: 'dry_clean',
      prices: { dry_clean: 28, wash_fold: 18, ironing: 14 },
      count: 0 
    },
    { 
      id: 'pants', 
      name: 'Trousers, Slacks & Chinos', 
      nameAr: 'بناطيل رسمية وكاجوال', 
      description: 'Razor-sharp crease alignment & steaming', 
      descriptionAr: 'خط كي حاد ومتناسق مع بخار معقم',
      serviceType: 'ironing',
      prices: { dry_clean: 10, wash_fold: 7, ironing: 6 },
      count: 0 
    },
    { 
      id: 'bedding', 
      name: 'Egyptian Cotton Linens & Bedding', 
      nameAr: 'مفارش وأغطية قطن مصري', 
      description: 'Sanitized, high-temp wash & crisply folded', 
      descriptionAr: 'تعقيم مع طي متقن',
      serviceType: 'wash_fold',
      prices: { dry_clean: 18, wash_fold: 12, ironing: 10 },
      count: 0 
    },
    { 
      id: 'polo', 
      name: 'Everyday Polos & T-Shirts', 
      nameAr: 'قمصان بولو وتيشرتات قطن', 
      description: 'Color-safe gentle wash & flat fold', 
      descriptionAr: 'غسيل معتدل مع حماية الألوان وطي متقن',
      serviceType: 'wash_fold',
      prices: { dry_clean: 7, wash_fold: 5, ironing: 4 },
      count: 0 
    },
    { 
      id: 'towels', 
      name: 'Plush Bath Robes & Towels', 
      nameAr: 'مناشف وأرواب حمام فاخرة', 
      description: 'High-temp sanitization & plush fluffing', 
      descriptionAr: 'تعقيم بالحرارة وانتعاش فائق',
      serviceType: 'wash_fold',
      prices: { dry_clean: 14, wash_fold: 10, ironing: 8 },
      count: 0 
    },
  ]);

  const updateItemServiceType = (id: string, serviceType: ServiceTypeOption) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, serviceType } : item));
  };

  const updateItemCount = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, count: Math.max(0, item.count + delta) };
      }
      return item;
    }));
  };

  const totalItems = items.reduce((sum, item) => sum + item.count, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.prices[item.serviceType] * item.count), 0);

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#0F172A] text-[#121C2A] dark:text-white flex flex-col justify-between transition-colors pb-8" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Recurring Header */}
      <RecurringAppHeader 
        currentScreen="book_dry_cleaning" 
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
            {isRTL ? 'الغسيل والتنظيف الجاف' : 'Dry Cleaning & Laundry'}
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {isRTL ? 'اختر الملابس، نوع الخدمة لكل قطعة، وموعد خدمة الاستلام الفاخرة من منزلك.' : 'Select garments, choose care service type per item, and schedule valet pickup.'}
          </p>
        </div>

        {/* 1. Select Items (Choose care service type grid beside each item) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Shirt className="w-3.5 h-3.5 text-[#00444D] dark:text-[#ABEDFA] shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] tracking-wide truncate">
                {isRTL ? '١. اختيار القطع ونوع الخدمة' : '1. Select Items'}
              </h2>
            </div>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-[#E6EEFF] dark:bg-slate-800 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 self-start sm:self-auto">
              {isRTL ? `${totalItems} قطع محددة` : `${totalItems} items selected`}
            </span>
          </div>

          {/* Garment Selection Catalog with Service Type Grid beside each item */}
          <div className="space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 px-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <span>{isRTL ? 'قائمة الملابس والخدمات' : 'Garment Catalog & Care Options'}</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {isRTL ? 'اختر الخدمة والكمية لكل قطعة' : 'Select service type & quantity per item'}
              </span>
            </div>

            <div className="bg-[#F8F9FF] dark:bg-slate-800/50 rounded-xl border border-[#E2E8F0] dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {items.map(item => (
                <div key={item.id} className="p-3 space-y-2.5 hover:bg-white/60 dark:hover:bg-slate-800/80 transition-colors">
                  {/* Item header: title, description, price & stepper */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-xs sm:text-[13px] text-[#00444D] dark:text-white leading-snug">
                          {isRTL ? item.nameAr : item.name}
                        </h4>
                        <span className="font-mono text-[11px] font-bold text-[#00444D] dark:text-[#FFE088]">
                          ${item.prices[item.serviceType]}
                          <span className="text-[9px] font-sans font-normal text-slate-400 ml-0.5 rtl:ml-0 rtl:mr-0.5">
                            {isRTL ? 'للقطعة' : 'ea'}
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
                    <ServiceTypeGrid<ServiceTypeOption>
                      columns={3}
                      size="xs"
                      isRTL={isRTL}
                      value={item.serviceType}
                      onChange={(svc) => updateItemServiceType(item.id, svc)}
                      ariaLabel={`Service type for ${isRTL ? item.nameAr : item.name}`}
                      options={[
                        {
                          id: 'dry_clean',
                          label: 'Dry Clean',
                          labelAr: 'تنظيف جاف',
                          price: item.prices.dry_clean,
                          icon: Sparkles
                        },
                        {
                          id: 'wash_fold',
                          label: 'Wash & Fold',
                          labelAr: 'غسيل وطي',
                          price: item.prices.wash_fold,
                          icon: Shirt
                        },
                        {
                          id: 'ironing',
                          label: 'Steam & Iron',
                          labelAr: 'كي بالبخار',
                          price: item.prices.ironing,
                          icon: Wind
                        }
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Starch & Eco Options */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
            <div>
              <span className="text-[11px] font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider block mb-1.5">
                {isRTL ? 'درجة النشا' : 'Starch Level'}
              </span>
              <SegmentedControl<'none' | 'light' | 'medium' | 'crisp'>
                options={[
                  { value: 'none', label: isRTL ? 'بدون' : 'None' },
                  { value: 'light', label: isRTL ? 'خفيف' : 'Light' },
                  { value: 'medium', label: isRTL ? 'متوسط' : 'Medium' },
                  { value: 'crisp', label: isRTL ? 'قوي' : 'Crisp' },
                ]}
                value={starchLevel}
                onChange={(lvl) => setStarchLevel(lvl)}
                isRTL={isRTL}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
              <Toggle
                checked={ecoFriendly}
                onChange={setEcoFriendly}
                label={isRTL ? 'مذيبات عضوية' : 'Eco-Organic Solvents'}
                description={isRTL ? 'خالية من المواد الكيميائية' : 'Non-toxic, hypoallergenic'}
                isRTL={isRTL}
              />
              <Toggle
                checked={fragranceFree}
                onChange={setFragranceFree}
                label={isRTL ? 'بدون عطور' : 'Fragrance-Free'}
                description={isRTL ? 'ملائم للبشرة الحساسة' : 'Ideal for sensitive skin'}
                isRTL={isRTL}
              />
            </div>
          </div>
        </div>

        {/* 2. Select Date & Time (Choose drop-off date & time) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 dark:border-slate-800 pb-2">
            <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] tracking-wide">
              {isRTL ? '٢. تحديد موعد الاستلام' : '2. Select Date & Time'}
            </h2>
            <span className="text-[10px] sm:text-[11px] text-slate-400">
              {isRTL ? 'اختر وقت حضور الفاليه' : 'Choose pickup window'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DatePicker
              label={isRTL ? 'تاريخ الاستلام' : 'Valet Pickup Date'}
              value={pickupDate}
              onChange={setPickupDate}
              isRTL={isRTL}
            />
            <TimePicker
              label={isRTL ? 'الفترة الزمنية' : 'Pickup Window'}
              value={pickupTime}
              onChange={setPickupTime}
              isRTL={isRTL}
            />
          </div>
        </div>

        {/* 3. Pickup & Delivery Address */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 dark:border-slate-800 pb-2">
            <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] tracking-wide">
              {isRTL ? '٣. عنوان الاستلام والتسليم' : '3. Pickup & Delivery'}
            </h2>
            <span className="text-[10px] sm:text-[11px] text-slate-400">
              {isRTL ? 'عنوان الفاليه' : 'Valet address'}
            </span>
          </div>

          <AddressInput
            label={isRTL ? 'عنوان استلام وتسليم الملابس' : 'Valet Pickup & Delivery Address'}
            value={address}
            onChange={setAddress}
            isRTL={isRTL}
          />
        </div>

        {/* 4. Special Instructions & Photos (Optional) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 dark:border-slate-800 pb-2">
            <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] tracking-wide">
              {isRTL ? '٤. ملاحظات خاصة وصور (اختياري)' : '4. Special Instructions'}
            </h2>
            <span className="text-[10px] sm:text-[11px] text-slate-400">
              {isRTL ? 'تعليمات إضافية' : 'Optional notes & tag photos'}
            </span>
          </div>

          <ImageInput
            label={isRTL ? 'صورة للبقع أو بطاقة الغسيل' : 'Stain Photo or Care Tag Detail'}
            value={garmentPhoto}
            onChange={setGarmentPhoto}
            helperText={isRTL ? 'التقط صورة للبقعة ليتعامل معها خبير الأقمشة' : 'Photo of specific stains or couture care tags'}
            isRTL={isRTL}
          />

          <TextInput
            label={isRTL ? 'ملاحظات إضافية للفاليه' : 'Special Instructions'}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder={isRTL ? 'مثال: يرجى الانتباه للحرير والياقات...' : 'e.g., Please pay special attention to the tuxedo lapel...'}
            isRTL={isRTL}
          />
        </div>

        {/* Order Summary Strip & Action Button: Continue */}
        <div className="pt-1 space-y-2">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#E6EEFF] dark:bg-slate-800 border border-[#D9E3F6] dark:border-slate-700 text-xs">
            <div className="flex items-center gap-1.5 text-[#00444D] dark:text-[#ABEDFA] font-medium">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isRTL ? 'إجمالي القطع المحددة:' : 'Total Selected:'}</span>
              <span className="font-bold">{totalItems}</span>
            </div>
            <div className="text-right rtl:text-left">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] block">{isRTL ? 'المجموع التقديري' : 'Estimated Total'}</span>
              <span className="font-mono font-bold text-sm text-[#00444D] dark:text-[#FFE088]">${subtotal}</span>
            </div>
          </div>

          <button
            onClick={() => {
              const selectedItemsList = items
                .filter(it => it.count > 0)
                .map(it => ({
                  id: `it-${it.id}`,
                  name: `${isRTL ? it.nameAr : it.name} (${it.serviceType})`,
                  quantity: it.count,
                  price: it.prices[it.serviceType],
                  notes: `Starch: ${starchLevel}, Eco: ${ecoFriendly ? 'Yes' : 'No'}`
                }));

              if (onBookingSubmit) {
                onBookingSubmit({
                  category: 'Laundry & Dry Cleaning',
                  serviceTitle: 'Bespoke Dry Cleaning & Laundry Care',
                  items: selectedItemsList.length > 0 ? selectedItemsList : [
                    { id: 'it-default', name: 'Premium Garment Care & Dry Cleaning', quantity: totalItems || 1, price: subtotal || 45 }
                  ],
                  estimatedPrice: subtotal || 45,
                  requestedDateTime: `${pickupDate} (${pickupTime})`,
                  customerAddress: `${address.street}, ${address.unit || ''}`.trim(),
                  customerDistrict: address.city || 'Mayfair District',
                  customerNotes: specialInstructions || undefined,
                  uploadedImages: garmentPhoto ? [garmentPhoto] : [],
                });
              }
              setIsBooked(true);
            }}
            className="w-full bg-[#00444D] hover:bg-[#0D5D68] text-white font-semibold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border-b-2 border-[#CCA730] cursor-pointer group active:scale-[0.99] min-h-[44px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFE088]" />
            <span>{isRTL ? 'المتابعة وتأكيد الحجز' : 'Continue & Schedule Valet'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#FFE088]" />
          </button>
        </div>

      </main>

      {/* Confirmation Modal */}
      {isBooked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-5 text-center space-y-3.5 border border-[#CCA730] shadow-xl animate-fadeIn">
            <div className="w-11 h-11 rounded-full bg-[#B0EDF4] dark:bg-teal-950 mx-auto flex items-center justify-center text-[#00444D] dark:text-[#ABEDFA]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 
              className="font-serif text-lg font-bold text-[#00444D] dark:text-white"
              style={{ fontFamily: "'Libre Caslon Text', Georgia, serif" }}
            >
              {isRTL ? 'تم تأكيد موعد الاستلام!' : 'Valet Dispatched!'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {isRTL 
                ? `تم تعيين موعد الاستلام لعدد ${totalItems} قطعة في ${pickupDate} خلال الفترة ${pickupTime}. تم إرفاق الصور وملاحظات العناية بالأقمشة بنجاح لمزود الخدمة.` 
                : `Your Mr. Butler valet has been assigned. We will collect ${totalItems} items on ${pickupDate} during ${pickupTime}. Your inspection photos and care instructions have been synchronized to the master artisan.`}
            </p>

            {garmentPhoto && (
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5 text-left rtl:text-right">
                <img
                  src={garmentPhoto}
                  alt="Customer Intake Upload"
                  className="w-10 h-10 rounded-lg object-cover border border-slate-300 dark:border-slate-600"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-emerald-600 block">
                    {isRTL ? 'تم إرسال صورة الفحص لمزود الخدمة' : 'Intake Photo Linked to Order'}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate block">
                    {specialInstructions || (isRTL ? 'جاهز لمعاينة خبير الأقمشة' : 'Ready for artisan inspection')}
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
                className="w-full py-2.5 bg-[#00444D] hover:bg-[#0D5D68] text-white rounded-xl font-bold text-xs shadow-sm cursor-pointer transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-[#FFE088]" />
                <span>{isRTL ? 'معاينة في تفاصيل الطلب لمزود الخدمة' : 'View in Provider Order Details'}</span>
              </button>
              <button
                onClick={() => {
                  setIsBooked(false);
                  onNavigate('our_services');
                }}
                className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
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

