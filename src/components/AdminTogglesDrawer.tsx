import React from 'react';
import { FeatureToggles } from '../types';
import { Sliders, X, Check, ShieldAlert, RotateCcw } from 'lucide-react';

interface AdminTogglesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  toggles: FeatureToggles;
  onToggleChange: (toggles: FeatureToggles) => void;
}

export const AdminTogglesDrawer: React.FC<AdminTogglesDrawerProps> = ({
  isOpen,
  onClose,
  toggles,
  onToggleChange,
}) => {
  if (!isOpen) return null;

  const handleToggle = (key: keyof FeatureToggles) => {
    onToggleChange({
      ...toggles,
      [key]: !toggles[key],
    });
  };

  const resetDefaults = () => {
    onToggleChange({
      googleAuth: true,
      facebookAuth: true,
      appleAuth: true,
      emailReg: true,
      emailOtp: true,
      phoneOtp: false, // Default disabled per specification
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-md bg-slate-900 text-slate-100 h-full border-l border-slate-800 shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-amber-200">
                Administrator Feature Toggles
              </h2>
              <p className="text-xs text-slate-400">
                Mr. Butler Security & Authentication Matrix
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

        {/* Informational banner */}
        <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex gap-2.5 items-start">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            Authentication methods adapt dynamically based on administrator security policies. Toggling options here updates all consumer and provider flows instantly.
          </span>
        </div>

        {/* Toggle Items */}
        <div className="mt-6 space-y-4 flex-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Quick Access / Social OAuth
          </p>

          <ToggleRow
            label="Google Authentication"
            description="Allow registration and sign in via Google OAuth 2.0"
            checked={toggles.googleAuth}
            onChange={() => handleToggle('googleAuth')}
          />

          <ToggleRow
            label="Facebook Authentication"
            description="Allow login via Facebook Login SDK"
            checked={toggles.facebookAuth}
            onChange={() => handleToggle('facebookAuth')}
          />

          <ToggleRow
            label="Apple Authentication"
            description="Sign in with Apple (Shown when enabled)"
            checked={toggles.appleAuth}
            onChange={() => handleToggle('appleAuth')}
          />

          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-4">
            Standard Verification & Credentials
          </p>

          <ToggleRow
            label="Email Registration"
            description="Enable standard email & password registration flow"
            checked={toggles.emailReg}
            onChange={() => handleToggle('emailReg')}
          />

          <ToggleRow
            label="Email OTP Verification"
            description="Require 6-digit email code verification step"
            checked={toggles.emailOtp}
            onChange={() => handleToggle('emailOtp')}
          />

          <ToggleRow
            label="Phone Number OTP Verification"
            description="SMS OTP challenge (Disabled by default per MEDS spec)"
            checked={toggles.phoneOtp}
            badge={toggles.phoneOtp ? 'Enabled' : 'Disabled (Default)'}
            onChange={() => handleToggle('phoneOtp')}
          />
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={resetDefaults}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 transition"
          >
            Save & Apply Policy
          </button>
        </div>

      </div>
    </div>
  );
};

const ToggleRow: React.FC<{
  label: string;
  description: string;
  checked: boolean;
  badge?: string;
  onChange: () => void;
}> = ({ label, description, checked, badge, onChange }) => (
  <div
    onClick={onChange}
    className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 hover:border-slate-600 transition cursor-pointer flex items-center justify-between gap-3"
  >
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-200">{label}</span>
        {badge && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">
            {badge}
          </span>
        )}
      </div>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
    
    <div
      className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center shrink-0 ${
        checked ? 'bg-amber-500 justify-end' : 'bg-slate-700 justify-start'
      }`}
    >
      <div className="w-5 h-5 rounded-full bg-slate-950 shadow-md flex items-center justify-center">
        {checked && <Check className="w-3 h-3 text-amber-400" />}
      </div>
    </div>
  </div>
);
