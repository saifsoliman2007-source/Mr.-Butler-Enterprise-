import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
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
  Scissors, 
  Ruler, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles,
  Home,
  Package,
  ArrowRight,
  ShoppingBag,
  Layers
} from 'lucide-react';

interface ScreenBookTailoringProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
}

export type TailoringServiceType = 'hemming' | 'resizing' | 'repair';

export interface TailoringGarmentItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  serviceType: TailoringServiceType;
  prices: Record<TailoringServiceType, number>;
  count: number;
}

export const ScreenBookTailoring: React.FC<ScreenBookTailoringProps> = ({ 
  onNavigate, 
  lang,
  onLanguageChange 
}) => {
  const isRTL = lang === 'ar';
  
  const [items, setItems] = useState<TailoringGarmentItem[]>([
    {
      id: 'suits',
      name: 'Suits & Blazers',
      nameAr: 'بدل وسترات رسمية',
      description: 'Jacket sleeves, chest taper, shoulder adjustment',
      descriptionAr: 'تقصير أكمام السترة، تضييق الصدر، تعديل الأكتاف',
      serviceType: 'resizing',
      prices: { hemming: 45, resizing: 85, repair: 55 },
      count: 1,
    },
    {
      id: 'trousers',
      name: 'Trousers & Slacks',
      nameAr: 'بناطيل وسراويل',
      description: 'Hem cuffs, waist take-in, leg tapering',
      descriptionAr: 'ثني الحاشية، تضييق الخصر، تقليم الساقين',
      serviceType: 'hemming',
      prices: { hemming: 30, resizing: 50, repair: 35 },
      count: 1,
    },
    {
      id: 'gowns',
      name: 'Formal Gowns & Dresses',
      nameAr: 'فساتين سهرة ومناسبات',
      description: 'Floor length hem, bodice fit, strap adjustments',
      descriptionAr: 'تقصير الطول، ضبط الصدر، تعديل الشيالات',
      serviceType: 'resizing',
      prices: { hemming: 60, resizing: 110, repair: 65 },
      count: 0,
    },
    {
      id: 'shirts',
      name: 'Shirts & Blouses',
      nameAr: 'قمصان وبلوزات فاخرة',
      description: 'Sleeve shortening, collar refit, darts insertion',
      descriptionAr: 'تقصير الأكمام، ضبط الياقة، درزات تضييق',
      serviceType: 'hemming',
      prices: { hemming: 25, resizing: 40, repair: 30 },
      count: 0,
    },
    {
      id: 'outerwear',
      name: 'Coats & Outerwear',
      nameAr: 'معاطف وأردية شتوية',
      description: 'Relining, sleeve adjustment, zipper replacement',
      descriptionAr: 'تجديد البطانة، تقصير الأكمام، تبديل السحاب',
      serviceType: 'repair',
      prices: { hemming: 55, resizing: 95, repair: 70 },
      count: 0,
    }
  ]);

  const [fittingMethod, setFittingMethod] = useState<'valet_home' | 'sample_garment'>('valet_home');
  const [garmentPhoto, setGarmentPhoto] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('10:00 AM - 12:00 PM');
  const [address, setAddress] = useState<AddressValue>({
    street: '1007 Mountain Drive',
    unit: 'East Wing Suite 4',
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

  const updateItemServiceType = (id: string, newType: TailoringServiceType) => {
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
        currentScreen="book_tailoring" 
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
            {isRTL ? 'الخياطة والتفصيل والتعديل' : 'Tailoring & Alterations'}
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {isRTL ? 'تعديلات دقيقة لمقاس مثالي. اختر القطع، نوع التعديل لكل قطعة، وموعد أخذ المقاسات.' : 'Impeccable adjustments for a flawless fit. Select garments, choose service type per item, and schedule fitting.'}
          </p>
        </div>

        {/* 1. Select Garments & Service Type Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Scissors className="w-3.5 h-3.5 text-[#00444D] dark:text-[#ABEDFA] shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] tracking-wide truncate">
                {isRTL ? '١. اختيار القطع ونوع التعديل' : '1. Select Garments & Service Type'}
              </h2>
            </div>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-[#E6EEFF] dark:bg-slate-800 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 self-start sm:self-auto">
              {isRTL ? `${totalItems} قطع محددة` : `${totalItems} items selected`}
            </span>
          </div>

          {/* Garment selection catalog */}
          <div className="space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 px-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <span>{isRTL ? 'قائمة الملابس والتعديلات' : 'Garment Catalog & Alteration Options'}</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {isRTL ? 'اختر نوع التعديل والكمية لكل قطعة' : 'Select service type & quantity per garment'}
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
                    <ServiceTypeGrid<TailoringServiceType>
                      columns={3}
                      size="xs"
                      isRTL={isRTL}
                      value={item.serviceType}
                      onChange={(svc) => updateItemServiceType(item.id, svc)}
                      ariaLabel={`Alteration service type for ${isRTL ? item.nameAr : item.name}`}
                      options={[
                        {
                          id: 'hemming',
                          label: 'Hemming',
                          labelAr: 'تقصير وثني',
                          price: item.prices.hemming,
                          icon: Ruler
                        },
                        {
                          id: 'resizing',
                          label: 'Resizing',
                          labelAr: 'تعديل المقاس',
                          price: item.prices.resizing,
                          icon: Scissors
                        },
                        {
                          id: 'repair',
                          label: 'Repair',
                          labelAr: 'إصلاح ورتق',
                          price: item.prices.repair,
                          icon: Sparkles
                        }
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Measurements & Fitting Method */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Ruler className="w-3.5 h-3.5 text-[#00444D] dark:text-[#ABEDFA] shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] tracking-wide truncate">
                {isRTL ? '٢. المقاسات والصور' : '2. Measurements & Fitting'}
              </h2>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400">
              {isRTL ? 'حدد طريقة أخذ المقاس' : 'Choose measurement method'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setFittingMethod('valet_home')}
              className={`p-3 rounded-xl border text-left rtl:text-right flex items-start gap-2.5 transition-all cursor-pointer ${
                fittingMethod === 'valet_home'
                  ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA] shadow-2xs'
                  : 'bg-[#F8F9FF] dark:bg-slate-800/40 border-[#E2E8F0] dark:border-slate-800'
              }`}
            >
              <div className="p-2 rounded-lg bg-[#00444D] text-white shrink-0">
                <Home className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-bold text-xs text-slate-800 dark:text-white block">
                  {isRTL ? 'زيارة قياس منزلي خاصة' : 'Private In-Home Fitting'}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 leading-tight">
                  {isRTL ? 'يزورك خياط محترف في مقر إقامتك مع أدوات القياس.' : 'A master tailor will visit your residence with pinning tools.'}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFittingMethod('sample_garment')}
              className={`p-3 rounded-xl border text-left rtl:text-right flex items-start gap-2.5 transition-all cursor-pointer ${
                fittingMethod === 'sample_garment'
                  ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA] shadow-2xs'
                  : 'bg-[#F8F9FF] dark:bg-slate-800/40 border-[#E2E8F0] dark:border-slate-800'
              }`}
            >
              <div className="p-2 rounded-lg bg-[#00444D] text-white shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-bold text-xs text-slate-800 dark:text-white block">
                  {isRTL ? 'مطابقة قطعة قياس نموذجية' : 'Match Sample Garment'}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 leading-tight">
                  {isRTL ? 'تسليم قطعة ذات مقاس مثالي لنقوم بنسخ مقاساتها بدقة.' : 'Provide a best-fitting item for us to replicate exact dimensions.'}
                </span>
              </div>
            </button>
          </div>

          <ImageInput
            label={isRTL ? 'صورة للقطعة أو موضع التعديل (اختياري)' : 'Garment Photo or Fitting Pin Detail (Optional)'}
            value={garmentPhoto}
            onChange={setGarmentPhoto}
            helperText={isRTL ? 'صورة توضح موضع التقصير أو تفاصيل القماش' : 'Help our master tailor assess the seam lines, drape, and hem allowance'}
            isRTL={isRTL}
          />

          <TextInput
            label={isRTL ? 'ملاحظات وتفاصيل التعديل' : 'Special Fitting Notes'}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={isRTL ? 'مثال: تضييق الخصر بمقدار ١.٥ بوصة مع الحفاظ على الحاشية الأصلية...' : 'e.g., Take in 1.5 inches at the waist, maintain original cuff finish...'}
            isRTL={isRTL}
          />
        </div>

        {/* 3. Schedule Fitting Date & Time */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] border-b border-slate-100 dark:border-slate-800 pb-2">
            {isRTL ? '٣. موعد القياس أو الاستلام' : '3. Schedule Fitting or Valet Pickup'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DatePicker
              label={isRTL ? 'تاريخ الموعد' : 'Fitting Date'}
              value={date}
              onChange={setDate}
              isRTL={isRTL}
            />
            <TimePicker
              label={isRTL ? 'نافذة الوقت' : 'Time Window'}
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

        {/* 4. Pickup & Delivery Address */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4.5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-3.5">
          <h2 className="text-xs sm:text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] border-b border-slate-100 dark:border-slate-800 pb-2">
            {isRTL ? '٤. عنوان الزيارة والاستلام' : '4. In-Residence / Pickup Address'}
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
                {isRTL ? 'إجمالي طلب الخياطة المبدئي' : 'Estimated Tailoring Total'}
              </span>
            </div>
            <div className="text-right rtl:text-left">
              <span className="font-mono text-lg sm:text-xl font-bold text-[#FFE088]">
                ${calculatedTotal}
              </span>
              <span className="text-[10px] text-white/60 block">
                {isRTL ? `${totalItems} قطع محددة` : `${totalItems} garments`}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-white/70">
            <span>{isRTL ? 'القياس والتعديل' : 'Fitting & Adjustments'}</span>
            <span className="font-medium text-white">
              {fittingMethod === 'valet_home' ? (isRTL ? 'زيارة خياط خاصة' : 'Private Master Tailor Visit') : (isRTL ? 'مطابقة عينة' : 'Sample Garment Replication')}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsBooked(true)}
            disabled={totalItems === 0}
            className="w-full py-3 px-4 rounded-xl bg-[#FFE088] text-[#00444D] hover:bg-[#FFD566] disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isRTL ? 'تأكيد حجز الخياطة والقياس' : 'Confirm Tailoring Appointment'}
            </span>
          </button>
        </div>

        {/* Confirmation Modal / State */}
        {isBooked && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-5 text-center space-y-4 shadow-2xl border border-[#D9E3F6] dark:border-slate-800">
              <div className="w-12 h-12 rounded-full bg-[#E6EEFF] dark:bg-slate-800 text-[#00444D] dark:text-[#FFE088] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#00444D] dark:text-white" style={{ fontFamily: "'Libre Caslon Text', Georgia, serif" }}>
                  {isRTL ? 'تم تأكيد موعد الخياطة' : 'Tailoring Booking Confirmed'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {isRTL ? `تم جدولة الموعد في ${date} خلال الفترة ${time}. سيتواصل معك الخياط المختص قبل الموعد.` : `Your fitting has been scheduled for ${date} during ${time}. Our master tailor will coordinate prior to arrival.`}
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
