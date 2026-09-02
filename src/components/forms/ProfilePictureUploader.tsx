import React, { useRef, useState } from 'react';
import { 
  Camera, 
  Upload, 
  Trash2, 
  Sparkles, 
  Check, 
  User, 
  Building2, 
  RefreshCw, 
  Image as ImageIcon,
  Shirt,
  Scissors,
  Footprints,
  Sparkle,
  Dog,
  ShieldCheck
} from 'lucide-react';

export interface ProfilePictureUploaderProps {
  type?: 'consumer' | 'provider';
  value?: string | null;
  onChange: (image: string | null) => void;
  label?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded-2xl';
  isRTL?: boolean;
  disabled?: boolean;
  className?: string;
}

// Curated high-resolution presets for Consumers
const CONSUMER_AVATAR_PRESETS = [
  {
    id: 'c-1',
    name: 'Executive Gentleman',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'c-2',
    name: 'Elegance Lady',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'c-3',
    name: 'Sartorial Master',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'c-4',
    name: 'Haute Chic',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'c-5',
    name: 'Distinguished VIP',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
  },
];

// Curated high-resolution brand logos & shop emblems for Service Providers
const PROVIDER_LOGO_PRESETS = [
  {
    id: 'p-1',
    name: 'Royal Silk Valet',
    category: 'Laundry & Dry Cleaning',
    url: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=300&auto=format&fit=crop&q=80',
    icon: Shirt,
  },
  {
    id: 'p-2',
    name: 'Savile Sartorial Tailors',
    category: 'Tailoring',
    url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&auto=format&fit=crop&q=80',
    icon: Scissors,
  },
  {
    id: 'p-3',
    name: 'Bespoke Cobbler House',
    category: 'Shoe Fix & Repair',
    url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&auto=format&fit=crop&q=80',
    icon: Footprints,
  },
  {
    id: 'p-4',
    name: 'Luxe Aesthetics Studio',
    category: 'Beauty Salon',
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&auto=format&fit=crop&q=80',
    icon: Sparkle,
  },
  {
    id: 'p-5',
    name: 'Royal Paws Grooming Spa',
    category: 'Pet Care',
    url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=300&auto=format&fit=crop&q=80',
    icon: Dog,
  },
];

export const ProfilePictureUploader: React.FC<ProfilePictureUploaderProps> = ({
  type = 'consumer',
  value,
  onChange,
  label,
  helperText,
  size = 'md',
  shape = type === 'consumer' ? 'circle' : 'rounded-2xl',
  isRTL = false,
  disabled = false,
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPresets, setShowPresets] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const presets = type === 'consumer' ? CONSUMER_AVATAR_PRESETS : PROVIDER_LOGO_PRESETS;

  const defaultLabel = type === 'consumer'
    ? (isRTL ? 'صورة الملف الشخصي' : 'Profile Picture')
    : (isRTL ? 'شعار المؤسسة / صورة مقدم الخدمة' : 'Business Logo / Provider Photo');

  const defaultHelper = type === 'consumer'
    ? (isRTL ? 'اختر صورة واضحة لتخصيص حساب السيد باتلر الخاص بك' : 'Upload or select a photo to personalize your Butler profile')
    : (isRTL ? 'ارفع شعار متجرك لعرضه للعملاء في بطاقات الخدمة' : 'Upload your official brand logo for VIP service cards');

  // Size mapping
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-36 sm:h-36',
    xl: 'w-40 h-40 sm:w-44 sm:h-44',
  }[size];

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
      setIsLoading(false);
    };
    reader.onerror = () => {
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const roundedClass = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';

  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleFileChange}
        disabled={disabled}
        className="sr-only"
        aria-label="Upload profile picture"
      />

      {/* Main Avatar Container */}
      <div className="relative group flex flex-col items-center">
        
        {/* Glow Ring / Frame */}
        <div 
          onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`relative ${sizeClasses} ${roundedClass} p-1 bg-gradient-to-tr from-[#00444D] via-[#0F172A] to-[#CCA730] shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
            isDragOver ? 'ring-4 ring-[#00444D] dark:ring-[#FFE088] scale-105' : ''
          } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {/* Inner Image Surface */}
          <div className={`w-full h-full ${roundedClass} overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 relative flex items-center justify-center`}>
            {value ? (
              <img
                src={value}
                alt="Profile Preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-2 text-center">
                {type === 'consumer' ? (
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-[#00444D] dark:text-[#FFE088]/80 mb-1 stroke-[1.5]" />
                ) : (
                  <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#00444D] dark:text-[#FFE088]/80 mb-1 stroke-[1.5]" />
                )}
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 leading-tight">
                  {isRTL ? 'إضافة صورة' : 'Add Photo'}
                </span>
              </div>
            )}

            {/* Hover Overlay */}
            {!disabled && (
              <div className={`absolute inset-0 bg-black/50 ${roundedClass} opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white gap-1 p-1`}>
                <Camera className="w-5 h-5 text-[#FFE088]" />
                <span className="text-[10px] font-bold tracking-tight text-center px-1">
                  {value ? (isRTL ? 'تغيير' : 'Change') : (isRTL ? 'رفع' : 'Upload')}
                </span>
              </div>
            )}

            {/* Loading Spinner */}
            {isLoading && (
              <div className={`absolute inset-0 bg-black/60 ${roundedClass} flex items-center justify-center`}>
                <RefreshCw className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
          </div>

          {/* Camera Action Badge */}
          {!disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              title={isRTL ? 'التقاط أو رفع صورة' : 'Take or upload photo'}
              className="absolute bottom-0 right-0 p-2 rounded-full bg-[#00444D] dark:bg-[#005D68] text-white hover:bg-[#0D5D68] border-2 border-white dark:border-slate-900 shadow-md transition-transform hover:scale-110 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-[#FFE088]" />
            </button>
          )}
        </div>

      </div>

      {/* Label and Helper Text */}
      <div className="text-center space-y-0.5 max-w-xs">
        <label className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 block">
          {label || defaultLabel}
        </label>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {helperText || defaultHelper}
        </p>
      </div>

      {/* Action Buttons: Upload / Preset Gallery / Remove */}
      {!disabled && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <Upload className="w-3.5 h-3.5 text-[#00444D] dark:text-[#FFE088]" />
            <span>{isRTL ? 'رفع من الجهاز' : 'Upload File'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95 ${
              showPresets
                ? 'bg-[#00444D] text-white border-[#00444D]'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#CCA730]" />
            <span>{isRTL ? 'النماذج الجاهزة' : 'Choose Preset'}</span>
          </button>

          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1 transition-all shadow-2xs cursor-pointer active:scale-95"
              title={isRTL ? 'إزالة الصورة' : 'Remove picture'}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isRTL ? 'إزالة' : 'Remove'}</span>
            </button>
          )}
        </div>
      )}

      {/* Preset Quick Tray Drawer */}
      {showPresets && !disabled && (
        <div className="w-full max-w-sm mt-2 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-2 animate-fade-in">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#CCA730]" />
              {type === 'consumer' 
                ? (isRTL ? 'نماذج الشخصيات الفاخرة' : 'VIP Avatar Presets')
                : (isRTL ? 'شعارات الحرفيين المعتمدة' : 'Master Artisan Logo Presets')}
            </span>
            <button
              type="button"
              onClick={() => setShowPresets(false)}
              className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold cursor-pointer"
            >
              {isRTL ? 'إغلاق' : 'Close'}
            </button>
          </div>

          <div className="grid grid-cols-5 gap-2 pt-1">
            {presets.map((preset) => {
              const isSelected = value === preset.url;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    onChange(preset.url);
                    setShowPresets(false);
                  }}
                  title={preset.name}
                  className={`group relative aspect-square ${roundedClass} overflow-hidden border-2 transition-all cursor-pointer p-0.5 ${
                    isSelected
                      ? 'border-[#00444D] dark:border-[#FFE088] ring-2 ring-[#00444D]/20 scale-105'
                      : 'border-slate-200 dark:border-slate-700 hover:border-[#CCA730] hover:scale-105'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover ${roundedClass}`}
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#00444D]/60 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
