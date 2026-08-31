import React, { useState, useRef } from 'react';
import { UploadCloud, File, X, CheckCircle2, AlertCircle } from 'lucide-react';

export interface UploadedFile {
  name: string;
  size: string;
  type: string;
}

export interface UploadProps {
  label?: string;
  description?: string;
  accept?: string;
  maxSizeMB?: number;
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  disabled?: boolean;
  isRTL?: boolean;
  className?: string;
}

export const Upload: React.FC<UploadProps> = ({
  label = 'Upload Garment Care Specifications / Invoices',
  description = 'Supports PDF, JPG, PNG up to 15MB each',
  accept = '.pdf,.png,.jpg,.jpeg',
  maxSizeMB = 15,
  files,
  onFilesChange,
  disabled = false,
  isRTL = false,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileList = Array.from(e.dataTransfer.files);
      const newFiles: UploadedFile[] = fileList.map((f: globalThis.File) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        type: f.type,
      }));
      onFilesChange([...files, ...newFiles]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files);
      const newFiles: UploadedFile[] = fileList.map((f: globalThis.File) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        type: f.type,
      }));
      onFilesChange([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className={`w-full flex flex-col space-y-2 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {label && (
        <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}

      {/* Drag & Drop Surface */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`w-full border-2 border-dashed rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[#00444D] bg-[#EFF4FF] dark:bg-slate-800'
            : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/80'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFileInput}
          disabled={disabled}
          className="sr-only"
        />

        <div className="w-11 h-11 rounded-2xl bg-[#E6EEFF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA] flex items-center justify-center mb-2 shadow-xs">
          <UploadCloud className="w-6 h-6" />
        </div>

        <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
          {isRTL ? 'اسحب وأفلت الملفات هنا، أو' : 'Drag & drop files here, or'}{' '}
          <span className="text-[#00444D] dark:text-[#ABEDFA] underline">{isRTL ? 'تصفح جهازك' : 'browse'}</span>
        </p>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
          {description}
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-1.5 pt-1">
          {files.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 shadow-xs text-xs animate-fadeIn"
            >
              <div className="flex items-center gap-2 truncate">
                <File className="w-4 h-4 text-[#00444D] dark:text-[#ABEDFA] flex-shrink-0" />
                <span className="font-medium text-slate-800 dark:text-slate-200 truncate">{file.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">({file.size})</span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(idx);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
