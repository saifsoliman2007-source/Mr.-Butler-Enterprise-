import React, { useRef, useState } from 'react';
import { Camera, Image as ImageIcon, X, Sparkles, RefreshCw } from 'lucide-react';

export interface ImageInputProps {
  label?: string;
  value: string | null; // URL or base64
  onChange: (image: string | null) => void;
  helperText?: string;
  disabled?: boolean;
  isRTL?: boolean;
  aspectRatio?: 'square' | 'wide';
  className?: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  label = 'Garment Photo or Stain Detail',
  value,
  onChange,
  helperText = 'Upload a photo for cobbler/tailor inspection',
  disabled = false,
  isRTL = false,
  aspectRatio = 'wide',
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target?.result as string);
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`w-full flex flex-col space-y-1.5 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {label && (
        <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          disabled={disabled}
          className="sr-only"
        />

        {value ? (
          <div className={`relative w-full rounded-2xl overflow-hidden border-2 border-[#00444D] dark:border-[#ABEDFA] bg-slate-900 group shadow-md ${
            aspectRatio === 'square' ? 'h-48 sm:h-56' : 'h-36 sm:h-44'
          }`}>
            <img
              src={value}
              alt="Uploaded Preview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-xl bg-white/90 text-slate-900 text-xs font-bold flex items-center gap-1.5 hover:bg-white transition cursor-pointer shadow-lg"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isRTL ? 'تغيير الصورة' : 'Change'}</span>
              </button>

              <button
                type="button"
                onClick={() => onChange(null)}
                className="p-2 rounded-xl bg-rose-600/90 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-rose-600 transition cursor-pointer shadow-lg"
              >
                <X className="w-3.5 h-3.5" />
                <span>{isRTL ? 'حذف' : 'Remove'}</span>
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => !disabled && fileInputRef.current?.click()}
            disabled={disabled}
            className={`w-full rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer p-4 ${
              aspectRatio === 'square' ? 'min-h-[190px] sm:min-h-[220px]' : 'min-h-[130px] sm:min-h-[140px]'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="p-3 rounded-2xl bg-[#E6EEFF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA]">
              <Camera className="w-6 h-6" />
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {isRTL ? 'التقاط صورة أو رفع من المعرض' : 'Take Photo or Choose from Library'}
              </span>
              {helperText && (
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                  {helperText}
                </p>
              )}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
