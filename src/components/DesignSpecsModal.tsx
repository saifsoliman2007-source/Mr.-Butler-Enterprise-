import React from 'react';
import { X, CheckCircle2, ShieldCheck, Smartphone, Globe, Layers, Cpu, Compass, Sparkles, Box, Layout, Image as ImageIcon, MapPin } from 'lucide-react';
import { EGEC } from './EGEC';
import stitchFlowAsset from '../assets/images/mr_butler_stitch_screen_flow.png';

interface DesignSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSpecsModal: React.FC<DesignSpecsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 text-slate-100 w-full max-w-4xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <EGEC size="sm" shape="rounded-xl" withAura={true} withSheen={true} withBeacon={true} beaconStatus="online" />
            <div>
              <h2 className="font-bold text-xl text-white">
                Mr. Butler Enterprise Architectural Reference
              </h2>
              <p className="text-xs text-slate-400">
                MEDS • APPLICATION SHELL • EBIA • EGEC • SCREEN-SPECIFIC CONTENT
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-8 text-sm text-slate-300 leading-relaxed">
          
          {/* MR. BUTLER ESM Hierarchy & 3 Pillars */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Box className="w-5 h-5 text-[#3B82F6]" />
                MR. BUTLER ESM (Enterprise System Model)
              </h3>
              <span className="text-[10px] font-mono bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/30 px-2 py-0.5 rounded-full font-bold">
                Tri-Pillar Governance
              </span>
            </div>

            {/* Tree Chart Visualization */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre className="text-[#60A5FA] leading-relaxed font-semibold">
{`ESM (Enterprise System Model)
│
├── MEDS
│   └── Visual / interaction design system (Tokens, Typography, Surfaces, Glassmorphism)
│
├── EBIA
│   └── Protected official brand assets (Authentic Master Crest Artwork)
│
├── EGEC
│   └── Official logo presentation enclosure (3D Crystal Glass, Refraction, Optical Bezel)
│
├── MRES
│   └── Registration & authentication experience (Unified Engine, Roles, OTP, Flows)
│
└── APPLICATION SHELL
    │
    ├── Global Header (TopBar with live status & master emblem)
    ├── Global Navigation (Screen jumper, breadcrumbs, role switch)
    ├── Content Canvas (Adaptive viewports for 6 responsive form factors)
    ├── Global Actions (Device preset switches, orientation, inspection tools)
    ├── Language (Multilingual translation engine: EN, AR [RTL], FR, ES, DE)
    ├── Accessibility (WCAG 2.1 AA, 44px touch targets, dynamic font scaling)
    ├── Theme (Deep Navy Slate & Twilight Dark Mode support)
    ├── Notifications (Live aria-live alerts, toasts, validation states)
    └── Shared Components (EGEC, OTPInput, PasswordStrength, DeviceFrame)`}
              </pre>
            </div>

            {/* Tri-Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-indigo-950/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-indigo-300">MEDS</span>
                  <span className="text-[10px] font-mono text-indigo-400 font-extrabold uppercase">Design System</span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  <strong>Mr. Butler Enterprise Design System</strong>: Visual & interaction language, tokens, typography, surfaces, Glassmorphism, Claymorphism, components, accessibility.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-300">MRES</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-extrabold uppercase">Engine</span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  <strong>Mr. Butler Registration & Experience Service</strong>: Unified authentication engine, role switching, OTP lifecycle, validation schemas, security policies.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-300">MEVI</span>
                  <span className="text-[10px] font-mono text-amber-400 font-extrabold uppercase">Visual Identity</span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  <strong>Mr. Butler Enterprise Visual Identity</strong>: Official master branding, EBIA asset governance, crystal glass optics, heraldic crest enforcement.
                </p>
              </div>
            </div>
            
            {/* Detailed Component Breakdown */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              <LayerCard 
                badge="APPLICATION SHELL" 
                title="Enterprise Application Structure" 
                desc="The permanent outer framework of the application: global header, navigation, content canvas, system controls, responsive behavior, and shared interaction structure across 6 form factors."
                icon={Layout}
                color="border-blue-500/30 bg-blue-950/20 text-blue-300"
              />
              <LayerCard 
                badge="EGEC" 
                title="Enterprise Glass Emblem Component" 
                desc="The reusable 3D glass presentation enclosure that displays EBIA. It provides the crystal-glass surface, optical depth, luxury frame, shadows, reflections and tactile presentation without altering the underlying official logo."
                icon={Sparkles}
                color="border-cyan-500/30 bg-cyan-950/20 text-cyan-300"
              />
              <LayerCard 
                badge="EBIA / OFFICIAL MASTER LOGO" 
                title="Enterprise Brand Image Asset" 
                desc="The official, protected Mr. Butler artwork/assets. The master logo is treated as a real asset—not something AI should redraw, regenerate, recolor, or reinterpret."
                icon={ImageIcon}
                color="border-amber-500/30 bg-amber-950/20 text-amber-300"
              />
              <LayerCard 
                badge="SCREEN-SPECIFIC CONTENT" 
                title="Business & Experience Layer" 
                desc="The actual purpose and content of a particular screen: registration fields, service discovery, booking options, orders, offers, concierge functions, etc. It changes from screen to screen while inheriting the four layers above."
                icon={Layers}
                color="border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
              />
            </div>
          </div>

          {/* Section: Stitch Screen Flow Blueprint */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#3B82F6]" />
              Master Screen Flow Blueprint
            </h3>
            <p className="text-xs text-slate-400">
              Complete interconnected screen workflow diagram matching the official enterprise registration & authentication lifecycle.
            </p>
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-2 shadow-inner">
              <img 
                src={stitchFlowAsset} 
                alt="Mr. Butler Stitch Screen Flow" 
                className="w-full h-auto rounded-lg object-contain max-h-96 mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Section 2: Safe Area Standard & Content Canvas Specifications */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              Content Canvas & Safe Area Standard
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-300">SAFE AREA STANDARD (No primary content touches physical edge)</span>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  welcome_screen_material_update.html
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">MOBILE HORIZONTAL</div>
                  <div className="text-emerald-400 font-bold text-sm">16dp (16px)</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">TABLET HORIZONTAL</div>
                  <div className="text-emerald-400 font-bold text-sm">24dp (24px)</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">DESKTOP HORIZONTAL</div>
                  <div className="text-emerald-400 font-bold text-sm">32dp (32px)</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">MINIMUM VERTICAL</div>
                  <div className="text-emerald-400 font-bold text-sm">24dp (24px)</div>
                </div>
              </div>
              <div className="text-xs text-slate-300 space-y-1 pt-1">
                <p><strong>Environment Insets:</strong> Integrates CSS <code>env(safe-area-inset-top)</code>, <code>env(safe-area-inset-bottom)</code>, <code>env(safe-area-inset-left)</code>, and <code>env(safe-area-inset-right)</code>.</p>
                <p><strong>Platform Insets:</strong> Compensates for Android system bars, iOS safe areas, foldable hinge clearance, dynamic keyboard appearance, and landscape orientations.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Screen Architecture Matrix */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#3B82F6]" />
              Screen Matrix (Screen 0 through Screen 11 & Concierge Suites)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <ScreenSpecBadge number="Screen 0" title="Splash Screen" desc="Luxury emblem animation, motto, auto-advance or interactive proceed." />
              <ScreenSpecBadge number="Screen 1" title="Welcome" desc="Brand logo, 5 core services visual cards, Consumer / Provider role entry, Footer links & language." />
              <ScreenSpecBadge number="Screen 2" title="Registration Method" desc="Quick Access (Google, FB, Apple toggles), Divider, Email Reg trigger, Sign in link." />
              <ScreenSpecBadge number="Screen 3" title="Consumer Registration" desc="Email, Password, Confirm Password, Password Strength indicator with inline validation." />
              <ScreenSpecBadge number="Screen 4" title="Consumer Verification" desc="6-digit OTP input, Resend code countdown timer, Change Email link, Verify trigger." />
              <ScreenSpecBadge number="Screen 5" title="Consumer Reg Complete" desc="Success confirmation card, Navigates directly to Consumer Home." />
              <ScreenSpecBadge number="Screen 6" title="Provider Registration" desc="Business Name, Phone Number, Address, Email, Password, Strength validation." />
              <ScreenSpecBadge number="Screen 7" title="Provider Verification" desc="Business Email OTP verification step." />
              <ScreenSpecBadge number="Screen 8" title="Provider Reg Complete" desc="Success confirmation card, Navigates to Service Provider Dashboard Setup." />
              <ScreenSpecBadge number="Screen 9" title="Sign In" desc="Unified Sign In screen supporting Quick Access & Email/Password login, Forgot Password link." />
              <ScreenSpecBadge number="Screen 10" title="Forgot Password" desc="Email address recovery submission." />
              <ScreenSpecBadge number="Screen 11" title="Reset Password" desc="OTP Verification + New Password setting with live strength meter." />
            </div>
          </div>

          {/* Section 3: Design Tokens & Palette */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#3B82F6]" />
              MEDS Design Tokens & Aesthetics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <ColorToken name="Primary Slate" hex="#0F172A" label="Deep Navy Slate" />
              <ColorToken name="Interactive Blue" hex="#3B82F6" label="Royal Azure" />
              <ColorToken name="Deep Sapphire" hex="#1D4ED8" label="Sapphire Cobalt" />
              <ColorToken name="Verified Emerald" hex="#10B981" label="Status Indicator" />
              <ColorToken name="Light Canvas" hex="#F8FAFC" label="Crisp Clean Neutral" />
              <ColorToken name="Border Stroke" hex="#E2E8F0" label="Precision Line" />
              <ColorToken name="Body Text" hex="#1E293B" label="High Contrast" />
              <ColorToken name="Muted Slate" hex="#64748B" label="Secondary Subtext" />
            </div>
          </div>

          {/* Section 4: Accessibility & WCAG 2.1 AA */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#10B981]" />
              Accessibility Specifications
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span><strong>Touch Target Minimum:</strong> All interactive buttons, inputs, and toggles meet or exceed 44×44px.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span><strong>Contrast Ratio:</strong> Text on buttons and inputs enforces WCAG 2.1 AA contrast ratio (≥ 4.5:1).</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span><strong>Screen Reader Announcements:</strong> Live aria-live feedback for OTP resends, validation errors, and screen changes.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span><strong>Dynamic Text Scaling:</strong> Fully reactive typography scaling from 80% to 150% without clipping labels.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#3B82F6] text-white font-bold hover:bg-blue-600 transition"
          >
            Close Specifications
          </button>
        </div>

      </div>
    </div>
  );
};

const LayerCard: React.FC<{ badge: string; title: string; desc: string; icon: React.ElementType; color: string }> = ({
  badge,
  title,
  desc,
  icon: Icon,
  color,
}) => (
  <div className={`p-4 rounded-xl border ${color} space-y-1.5`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 font-bold text-xs">
        <Icon className="w-4 h-4" />
        <span>{title}</span>
      </div>
      <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-white/10">
        {badge}
      </span>
    </div>
    <p className="text-xs text-slate-300 leading-relaxed font-normal">{desc}</p>
  </div>
);

const ScreenSpecBadge: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
    <div>
      <span className="text-[#3B82F6] font-bold">{number}:</span>{' '}
      <span className="text-slate-200 font-semibold">{title}</span>
    </div>
    <p className="text-[11px] text-slate-400 mt-1 font-sans">{desc}</p>
  </div>
);

const ColorToken: React.FC<{ name: string; hex: string; label: string }> = ({ name, hex, label }) => (
  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
    <div className="w-full h-8 rounded-lg shadow-inner border border-white/10" style={{ backgroundColor: hex }} />
    <div>
      <p className="text-slate-200 font-bold text-[11px]">{name}</p>
      <p className="text-slate-400 text-[10px]">{hex} - {label}</p>
    </div>
  </div>
);

