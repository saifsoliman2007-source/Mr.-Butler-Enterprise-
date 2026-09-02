import React, { useState } from 'react';
import { Language, ScreenId, ProviderBusinessProfile, ProviderCategory } from '../../types';
import { translations } from '../../data/translations';
import { EGEC } from '../EGEC';
import { ProfilePictureUploader } from '../forms';
import { 
  ArrowLeft, 
  Building2, 
  Store, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  DollarSign, 
  Truck, 
  Sparkles, 
  Save, 
  CheckCircle2, 
  Phone, 
  Mail, 
  User,
  Star,
  Layers,
  Edit2
} from 'lucide-react';

interface ScreenProviderProfileProps {
  profile: ProviderBusinessProfile;
  onUpdateProfile: (updated: ProviderBusinessProfile) => void;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const ScreenProviderProfile: React.FC<ScreenProviderProfileProps> = ({
  profile,
  onUpdateProfile,
  onNavigate,
  lang,
}) => {
  const t = translations[lang] || translations.en;
  const isRTL = lang === 'ar';

  const [formData, setFormData] = useState<ProviderBusinessProfile>({ ...profile });
  const [toastMsg, setToastMsg] = useState('');
  const [newServiceArea, setNewServiceArea] = useState('');

  const handleSave = () => {
    onUpdateProfile(formData);
    setToastMsg('Business Profile & Service Catalog successfully updated.');
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleAddArea = () => {
    if (newServiceArea.trim() && !formData.serviceAreas.includes(newServiceArea.trim())) {
      setFormData(prev => ({
        ...prev,
        serviceAreas: [...prev.serviceAreas, newServiceArea.trim()]
      }));
      setNewServiceArea('');
    }
  };

  const handleRemoveArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter(a => a !== area)
    }));
  };

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#070D18] text-[#1E293B] dark:text-slate-100 flex flex-col p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9E3F6] dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('provider_dashboard')}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#00444D] dark:text-[#FFE088]" />
          </button>
          <div>
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#00444D] dark:text-[#FFE088]">
              Merchant Profile & Service Catalog
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage commercial registration, service areas, valet logistics & pricing
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-[#00444D] text-white hover:bg-[#00333A] font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-xs self-end sm:self-auto"
        >
          <Save className="w-4 h-4 text-[#FFE088]" />
          <span>Save Changes</span>
        </button>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Grid of Profile Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Card: Business Identity & Verification */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-center flex flex-col items-center">
            
            {/* Merchant Logo / Photo Uploader */}
            <div className="w-full flex justify-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <ProfilePictureUploader
                type="provider"
                value={formData.logo || formData.profilePicture || 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=300&auto=format&fit=crop&q=80'}
                onChange={(img) => setFormData(prev => ({ ...prev, logo: img || undefined, profilePicture: img || undefined }))}
                label="Artisan Brand Logo / Store Photo"
                helperText="Click photo to upload or pick a verified emblem"
                size="md"
                shape="rounded-2xl"
              />
            </div>

            <div className="flex flex-col items-center gap-1">
              <EGEC size="sm" shape="rounded-xl" withAura={true} withSheen={true} withBeacon={true} beaconStatus="verified" />
              <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-white mt-1">
                {formData.businessName}
              </h2>
              <p className="text-xs text-slate-500">{formData.serviceCategory}</p>
            </div>

            <div className="w-full pt-2 space-y-2 text-xs text-left">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-slate-500">Merchant Status</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Merchant</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-slate-500">Commercial Registration</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {formData.crNumber}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-slate-500">Mr. Butler Tier</span>
                <span className="font-bold text-[#00444D] dark:text-[#FFE088]">
                  Tier 1 Gold Artisan
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="p-5 rounded-2xl bg-[#00444D] text-white border border-[#005763] shadow-xs space-y-3">
            <h3 className="font-serif font-bold text-sm text-[#FFE088]">
              Artisan Performance Rating
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold font-serif">{formData.rating} ★</p>
                <p className="text-[11px] text-white/70">Top 1% rated luxury partner</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold font-serif">{formData.totalOrders}</p>
                <p className="text-[11px] text-white/70">VIP Orders Fulfilled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Editable Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Information */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Business Contact & Operating Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  Business / Store Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FF] dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  Primary Service Domain
                </label>
                <select
                  value={formData.serviceCategory}
                  onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value as ProviderCategory })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FF] dark:bg-slate-800"
                >
                  <option value="Laundry & Dry Cleaning">Laundry & Dry Cleaning</option>
                  <option value="Tailoring">Tailoring & Alterations</option>
                  <option value="Shoe Fix & Repair">Shoe Fix & Repair</option>
                  <option value="Beauty Salon">Beauty Salon & Spa</option>
                  <option value="Pet Care">Pet Care & Grooming</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  Authorized Contact Person
                </label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FF] dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  Direct Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FF] dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  Business Address
                </label>
                <input
                  type="text"
                  value={formData.businessAddress}
                  onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FF] dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={formData.operatingHours}
                  onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FF] dark:bg-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Service Areas & Valet Coverage */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Service Area Coverage & Valet Logistics</span>
            </h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                <input
                  type="checkbox"
                  checked={formData.pickupDeliveryAvailable}
                  onChange={(e) => setFormData({ ...formData, pickupDeliveryAvailable: e.target.checked })}
                  className="w-4 h-4 text-[#00444D] rounded"
                />
                <div>
                  <span className="font-bold text-xs text-slate-900 dark:text-white block">
                    Enable Valet Pickup & Delivery Service
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Allows Mr. Butler Concierge couriers to route orders to your workshop
                  </span>
                </div>
              </label>

              <div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Active Service Districts:
                </span>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1 rounded-full bg-[#00444D]/5 dark:bg-[#FFE088]/10 text-[#00444D] dark:text-[#FFE088] text-xs font-semibold border border-[#00444D]/15 dark:border-[#FFE088]/20 flex items-center gap-1.5"
                    >
                      <span>{area}</span>
                      <button
                        onClick={() => handleRemoveArea(area)}
                        className="hover:text-red-500 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 max-w-sm">
                  <input
                    type="text"
                    value={newServiceArea}
                    onChange={(e) => setNewServiceArea(e.target.value)}
                    placeholder="Add new district (e.g. Al Malqa)..."
                    className="flex-1 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-[#F8F9FF] dark:bg-slate-800"
                  />
                  <button
                    onClick={handleAddArea}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-xs font-bold transition cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Catalog */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088] flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Base Pricing & Service Rates</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pricing Schedule Description
                </label>
                <textarea
                  value={formData.basePricing}
                  onChange={(e) => setFormData({ ...formData, basePricing: e.target.value })}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-[#F8F9FF] dark:bg-slate-800"
                />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
