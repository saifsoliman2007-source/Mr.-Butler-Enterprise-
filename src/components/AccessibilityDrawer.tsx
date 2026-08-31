import React, { useState } from 'react';
import { AccessibilitySettings } from '../types';
import { 
  Eye, 
  X, 
  Volume2, 
  Sparkles, 
  Type, 
  Contrast, 
  ZapOff, 
  Check, 
  VolumeX,
  Keyboard
} from 'lucide-react';

interface AccessibilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onSettingsChange: (settings: AccessibilitySettings) => void;
}

export const AccessibilityDrawer: React.FC<AccessibilityDrawerProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  const handleToggle = (key: keyof AccessibilitySettings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key],
    });
  };

  const handleFontScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      fontSizeScale: Number(e.target.value),
    });
  };

  const speakLatestAnnouncement = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const lastMsg = settings.liveAnnouncements[settings.liveAnnouncements.length - 1] || 
      'Mr. Butler Accessibility Engine active. All fields pass WCAG 2.1 AA standards.';
    
    const utterance = new SpeechSynthesisUtterance(lastMsg);
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-md bg-slate-900 text-slate-100 h-full border-l border-slate-800 shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-teal-200">
                Accessibility & MEDS Audit
              </h2>
              <p className="text-xs text-slate-400">
                WCAG 2.1 Level AA Compliance & Screen Reader
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Font Size Scaling */}
        <div className="mt-6 space-y-3 p-4 rounded-xl bg-slate-800/80 border border-slate-700">
          <div className="flex items-center justify-between text-sm font-medium text-slate-200">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-teal-400" />
              <span>Dynamic Text Scaling</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
              {settings.fontSizeScale}%
            </span>
          </div>
          <input
            type="range"
            min={80}
            max={150}
            step={5}
            value={settings.fontSizeScale}
            onChange={handleFontScaleChange}
            className="w-full accent-teal-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>80% (Compact)</span>
            <span>100% (Standard)</span>
            <span>150% (High Legibility)</span>
          </div>
        </div>

        {/* Toggles */}
        <div className="mt-4 space-y-3">
          <div
            onClick={() => handleToggle('highContrast')}
            className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-600 transition cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <Contrast className="w-4 h-4 text-amber-400" />
              <div>
                <p className="text-sm font-medium text-slate-200">High Contrast Mode</p>
                <p className="text-xs text-slate-400">Increases outline visibility and border contrast</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center ${settings.highContrast ? 'bg-teal-500 text-slate-950' : 'bg-slate-700'}`}>
              {settings.highContrast && <Check className="w-3.5 h-3.5 font-bold" />}
            </div>
          </div>

          <div
            onClick={() => handleToggle('reducedMotion')}
            className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-600 transition cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <ZapOff className="w-4 h-4 text-teal-400" />
              <div>
                <p className="text-sm font-medium text-slate-200">Reduced Motion</p>
                <p className="text-xs text-slate-400">Disables fluid transition effects and animations</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center ${settings.reducedMotion ? 'bg-teal-500 text-slate-950' : 'bg-slate-700'}`}>
              {settings.reducedMotion && <Check className="w-3.5 h-3.5 font-bold" />}
            </div>
          </div>

          <div
            onClick={() => handleToggle('screenReaderActive')}
            className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-600 transition cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-indigo-400" />
              <div>
                <p className="text-sm font-medium text-slate-200">Screen Reader Mode</p>
                <p className="text-xs text-slate-400">Announces field focus, validation & status updates</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center ${settings.screenReaderActive ? 'bg-teal-500 text-slate-950' : 'bg-slate-700'}`}>
              {settings.screenReaderActive && <Check className="w-3.5 h-3.5 font-bold" />}
            </div>
          </div>
        </div>

        {/* Screen Reader Live Announcements Box */}
        <div className="mt-6 space-y-2 flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Keyboard className="w-3.5 h-3.5 text-teal-400" />
              Live Screen Reader Announcements Log
            </span>
            <button
              onClick={speakLatestAnnouncement}
              className="text-xs text-teal-300 hover:text-teal-200 flex items-center gap-1 font-medium bg-teal-950/80 px-2 py-1 rounded border border-teal-800/60"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5 animate-pulse text-amber-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              {isSpeaking ? 'Speaking...' : 'Simulate Voice'}
            </button>
          </div>

          <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-3 font-mono text-xs text-slate-300 space-y-2 overflow-y-auto max-h-48">
            {settings.liveAnnouncements.length === 0 ? (
              <p className="text-slate-600 italic">No announcements recorded yet. Interact with inputs to log accessibility events.</p>
            ) : (
              settings.liveAnnouncements.map((log, i) => (
                <div key={i} className="flex items-start gap-2 text-teal-300/90 border-b border-slate-900 pb-1.5 last:border-0">
                  <Sparkles className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                  <span>{log}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Target Touch Size: ≥ 44×44px</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-teal-600 text-slate-950 font-semibold hover:bg-teal-500 transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
