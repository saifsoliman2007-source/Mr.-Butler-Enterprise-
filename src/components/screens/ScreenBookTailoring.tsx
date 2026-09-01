import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { DatePicker, TimePicker, AddressInput, AddressValue, TextInput, ImageInput } from '../forms';
import { 
  Scissors, 
  Ruler, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles,
  Home,
  Package,
  ArrowRight
} from 'lucide-react';

interface ScreenBookTailoringProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const ScreenBookTailoring: React.FC<ScreenBookTailoringProps> = ({ onNavigate, lang }) => {
  const isRTL = lang === 'ar';
  const [serviceType, setServiceType] = useState<'hemming' | 'resizing' | 'repair'>('hemming');
  const [garmentCategory, setGarmentCategory] = useState('Suits & Blazers');
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

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#0F172A] text-[#121C2A] dark:text-white flex flex-col justify-between transition-colors pb-12" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Recurring Header */}
      <RecurringAppHeader 
        currentScreen="book_tailoring" 
        onNavigate={onNavigate} 
        lang={lang} 
        title="Mr. Butler"
        statusMessage={isRTL ? "خياط ماهر متاح للقياس المنزلي هذا الأسبوع." : "Master tailor available for in-home fitting this week."}
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
            {isRTL ? 'خياطة وتعديل راقٍ' : 'Bespoke Alterations'}
          </span>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#00444D] dark:text-white tracking-tight">
            {isRTL ? 'الخياطة والتفصيل والتعديل' : 'Tailoring & Alterations'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isRTL ? 'تعديلات دقيقة لمقاس مثالي. حدد موعد القياس وتفاصيل الخدمة.' : 'Impeccable adjustments for a flawless fit. Schedule an in-person measurement or drop off your garments.'}
          </p>
        </div>

        {/* 1. Select Service (Choose tailoring service) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '١. اختيار الخدمة' : '1. Select Service'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'اختر نوع التعديل' : 'Choose tailoring service'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'hemming', title: isRTL ? 'تقصير وثني الأطراف' : 'Hemming & Length', desc: isRTL ? 'بناطيل، فساتين، معاطف وأكمام' : 'Pants, skirts, coats & sleeves', icon: Ruler },
              { id: 'resizing', title: isRTL ? 'تعديل وتضييق المقاس' : 'Bespoke Resizing', desc: isRTL ? 'تعديل الخصر، الصدر وتضييق الأكمام' : 'Taking in waist, chest, or tapering', icon: Scissors },
              { id: 'repair', title: isRTL ? 'إصلاح وحياكة متقنة' : 'Master Repair', desc: isRTL ? 'سحابات، بطانات، وإعادة رتق' : 'Zippers, lining, tear re-weaving', icon: Sparkles }
            ].map(svc => {
              const Icon = svc.icon;
              const isSelected = serviceType === svc.id;
              return (
                <button
                  key={svc.id}
                  onClick={() => setServiceType(svc.id as any)}
                  className={`p-4 rounded-2xl border text-left rtl:text-right transition-all flex flex-col gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00444D] text-white border-[#00444D] shadow-md'
                      : 'bg-[#F8F9FF] dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-[#E6EEFF]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-[#FFE088]' : 'text-[#00444D] dark:text-[#ABEDFA]'}`} />
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

          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2">
              {isRTL ? 'نوع القطعة المراد تعديلها:' : 'Garment Category:'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { en: 'Suits & Blazers', ar: 'بدل وسترات رسمية' },
                { en: 'Trousers & Slacks', ar: 'بناطيل وسراويل' },
                { en: 'Formal Gowns', ar: 'فساتين سهرة وأعراس' },
                { en: 'Shirts & Blouses', ar: 'قمصان وبلوزات' }
              ].map(garment => (
                <button
                  key={garment.en}
                  onClick={() => setGarmentCategory(garment.en)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    garmentCategory === garment.en
                      ? 'bg-[#00444D] text-white border-[#00444D]'
                      : 'bg-white dark:bg-slate-900 border-[#D9E3F6] dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {isRTL ? garment.ar : garment.en}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Measurements & Photos (Provide measurements and upload garment photos) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '٢. المقاسات والصور' : '2. Measurements & Photos'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'حدد طريقة القياس وصور القطعة' : 'Provide measurements or photos'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setFittingMethod('valet_home')}
              className={`p-4 rounded-2xl border text-left rtl:text-right flex items-start gap-3 transition-all cursor-pointer ${
                fittingMethod === 'valet_home'
                  ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA]'
                  : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#00444D] text-white shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-white block">
                  {isRTL ? 'زيارة قياس منزلي خاصة' : 'Private In-Home Fitting'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isRTL ? 'يزورك خياط محترف في مقر إقامتك مع كافة أدوات القياس.' : 'A master tailor will visit your residence with pinning tools.'}
                </span>
              </div>
            </button>

            <button
              onClick={() => setFittingMethod('sample_garment')}
              className={`p-4 rounded-2xl border text-left rtl:text-right flex items-start gap-3 transition-all cursor-pointer ${
                fittingMethod === 'sample_garment'
                  ? 'bg-[#E6EEFF] dark:bg-slate-800 border-[#00444D] dark:border-[#ABEDFA]'
                  : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#00444D] text-white shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-white block">
                  {isRTL ? 'مطابقة قطعة قياس نموذجية' : 'Match Sample Garment'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isRTL ? 'تسليم قطعة ذات مقاس مثالي لنقوم بنسخ مقاساتها بدقة.' : 'Provide a best-fitting item for us to replicate exact dimensions.'}
                </span>
              </div>
            </button>
          </div>

          <ImageInput
            label={isRTL ? 'صورة للقطعة أو موضع التعديل (اختياري)' : 'Garment Photo or Fitting Pin Detail (Optional)'}
            value={garmentPhoto}
            onChange={setGarmentPhoto}
            helperText={isRTL ? 'صورة توضح موضع التقصير أو تفاصيل القماش لمساعدة الخياط' : 'Help our master tailor assess the seam lines, drape, and hem allowance'}
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

        {/* 3. Select Date & Time (Choose fitting date & time) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#00444D] dark:text-[#ABEDFA] uppercase tracking-wider">
              {isRTL ? '٣. تحديد التاريخ والوقت' : '3. Select Date & Time'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {isRTL ? 'اختر موعد المقابلة' : 'Choose fitting date & time'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              label={isRTL ? 'تاريخ القياس' : 'Fitting Date'}
              value={date}
              onChange={setDate}
              isRTL={isRTL}
            />
            <TimePicker
              label={isRTL ? 'الفترة الزمنية المناسبة' : 'Fitting Time Window'}
              value={time}
              onChange={setTime}
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
              {isRTL ? 'حدد عنوان الإقامة' : 'Set pickup & delivery address'}
            </span>
          </div>

          <AddressInput
            label={isRTL ? 'عنوان الفاليه' : 'Valet Address'}
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
              {isRTL ? 'تم تسجيل موعد الخياطة!' : 'Fitting Scheduled!'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {isRTL 
                ? `تم تحديد موعد الخياطة لـ ${garmentCategory} بتاريخ ${date} في ${time}.`
                : `Master tailor appointment registered for ${garmentCategory} on ${date} during ${time}.`}
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


