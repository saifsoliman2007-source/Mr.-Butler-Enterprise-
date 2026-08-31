import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { translations } from '../../data/translations';
import { getLocalizedNavLabel } from '../navigation/NavHierarchy';
import { RecurringAppHeader } from '../RecurringAppHeader';
import { 
  Bell, 
  Tag, 
  Star, 
  MessageSquarePlus, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Crown,
  Gift,
  Clock,
  Send,
  Coffee,
  Plane,
  Wine
} from 'lucide-react';

interface ScreenConciergeProps {
  subSection?: 'overview' | 'offers' | 'recommendations' | 'special_requests';
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const ScreenConcierge: React.FC<ScreenConciergeProps> = ({
  subSection = 'overview',
  onNavigate,
  lang,
  onLanguageChange
}) => {
  const isRTL = lang === 'ar';
  const t = translations[lang] || translations.en;
  const [activeTab, setActiveTab] = useState<'offers' | 'recommendations' | 'special_requests'>(
    subSection === 'offers' 
      ? 'offers' 
      : subSection === 'recommendations' 
        ? 'recommendations' 
        : subSection === 'special_requests' 
          ? 'special_requests' 
          : 'offers'
  );

  const [requestText, setRequestText] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const offers = [
    {
      id: 'off-1',
      title: 'Silk & Cashmere Season Pass',
      badge: 'Exclusive',
      discount: '30% Off',
      desc: 'Complimentary eco-solvent treatment for fine wool & delicate silks.',
      actionRoute: 'book_dry_cleaning' as ScreenId,
      icon: Crown
    },
    {
      id: 'off-2',
      title: 'Bespoke Tailoring Initial Fitting',
      badge: 'Complimentary',
      discount: '$0 Consultation',
      desc: 'In-home master tailor measurement consultation with fabric swatches.',
      actionRoute: 'book_tailoring' as ScreenId,
      icon: Sparkles
    },
    {
      id: 'off-3',
      title: 'Artisan Shoe Glazing & Protection',
      badge: 'Weekend Special',
      discount: 'Buy 2 Get 1 Free',
      desc: 'Saphir Médaille d’Or mirror shine polishing and weatherproofing.',
      actionRoute: 'book_shoe_repair' as ScreenId,
      icon: Tag
    }
  ];

  const recommendations = [
    {
      title: 'Pre-Travel Wardrobe Preparation',
      category: 'Concierge Recommendation',
      desc: 'Let your butler steam, fold into tissue, and pack your luggage for international trips.',
      icon: Plane
    },
    {
      title: 'Cellar & Wine Tasting Sommelier Glassware',
      category: 'Household Curated',
      desc: 'Ultrasonic crystal glass sanitization and temperature cellar checks.',
      icon: Wine
    },
    {
      title: 'Morning Espresso & Fresh Pastry Courier',
      category: 'Daily Butler Routine',
      desc: 'Delivered directly to your residence door at 07:30 AM sharp.',
      icon: Coffee
    }
  ];

  const handleSendSpecialRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setRequestText('');
    }, 4000);
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      <RecurringAppHeader 
        currentScreen="concierge" 
        onNavigate={onNavigate} 
        lang={lang} 
        onLanguageChange={onLanguageChange}
      />
      <div 
        dir={isRTL ? 'rtl' : 'ltr'}
        className="min-h-full w-full bg-[#EFF4FF] dark:bg-[#0B1120] text-slate-900 dark:text-white p-4 sm:p-6 lg:p-8 space-y-6 select-none flex-1"
      >
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#00444D] via-[#0D5D68] to-[#002D33] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFE088]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE088]/20 border border-[#FFE088]/30 text-[#FFE088] text-xs font-semibold uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5" />
            <span>{getLocalizedNavLabel('navConcierge', lang)}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Imperial Butler Concierge
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
            {getLocalizedNavLabel('navCatalogSummary', lang)}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/15 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('offers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'offers'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>{getLocalizedNavLabel('navOffers', lang)}</span>
          </button>

          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'recommendations'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>{getLocalizedNavLabel('navRecommendations', lang)}</span>
          </button>

          <button
            onClick={() => setActiveTab('special_requests')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'special_requests'
                ? 'bg-white text-[#00444D] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>{getLocalizedNavLabel('navSpecialRequests', lang)}</span>
          </button>

          <button
            onClick={() => onNavigate('google_drive')}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer bg-[#FFE088] text-[#241A00] hover:bg-[#F3D477] shadow-sm ml-auto"
          >
            <span>Google Drive Vault</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tab Content: Offers */}
      {activeTab === 'offers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-[#00444D] dark:text-[#ABEDFA]">
              {getLocalizedNavLabel('navOffers', lang)} & Privileges
            </h2>
            <span className="text-xs text-slate-500 font-mono">Updated Today</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offers.map((offer) => {
              const OfferIcon = offer.icon;
              return (
                <div 
                  key={offer.id}
                  className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-[#E6EEFF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA]">
                        <OfferIcon className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#CCA730]/15 text-[#CCA730] border border-[#CCA730]/30">
                        {offer.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                        {offer.title}
                      </h3>
                      <div className="text-sm font-extrabold text-[#00444D] dark:text-[#FFE088] mt-0.5">
                        {offer.discount}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {offer.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate(offer.actionRoute)}
                    className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#00444D] hover:bg-[#0D5D68] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Claim Privilege</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content: Recommendations */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-[#00444D] dark:text-[#ABEDFA]">
              {getLocalizedNavLabel('navRecommendations', lang)}
            </h2>
            <span className="text-xs text-slate-500 font-mono">Tailored for your Residence</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3"
                >
                  <div className="p-2.5 w-fit rounded-xl bg-[#E6EEFF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA]">
                    <ItemIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#CCA730] uppercase font-bold">
                      {item.category}
                    </span>
                    <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                  <button
                    onClick={() => setActiveTab('special_requests')}
                    className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA] hover:underline flex items-center gap-1.5 pt-2 cursor-pointer"
                  >
                    <span>Request Butler Arrangement</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content: Special Requests */}
      {activeTab === 'special_requests' && (
        <div className="bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-sm space-y-5">
          <div className="space-y-1 text-center">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#00444D] dark:text-[#ABEDFA]">
              {getLocalizedNavLabel('navSpecialRequests', lang)}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Have an exceptional request or bespoke lifestyle task? Your Butler team is ready.
            </p>
          </div>

          {requestSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                Request Transmitted to Dispatch
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                Your concierge is reviewing the details and will confirm via notification within 10 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendSpecialRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Detailed Instructions for Butler
                </label>
                <textarea
                  rows={4}
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  placeholder="e.g., Please pick up 3 tuxedo shirts tomorrow at 8 AM, hand-iron only with light French starch, and deliver by Friday 4 PM."
                  className="w-full p-3.5 rounded-xl border border-[#D9E3F6] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00444D]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-400 font-bold block">RESPONSE TIME</span>
                  <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA]">Priority Under 15 Min</span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-400 font-bold block">SERVICE PROTOCOL</span>
                  <span className="text-xs font-bold text-[#00444D] dark:text-[#ABEDFA]">White-Glove Insured</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] py-3 px-6 rounded-2xl bg-[#00444D] hover:bg-[#0D5D68] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Request to Butler Concierge</span>
              </button>
            </form>
          )}
        </div>
      )}
      </div>
    </div>
  );
};
