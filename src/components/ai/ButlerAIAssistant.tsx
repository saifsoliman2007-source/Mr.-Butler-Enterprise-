import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { useNotifications } from '../../context/NotificationContext';
import { sendAIChat } from '../../services/apiClient';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Languages, 
  Calculator, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  X, 
  ArrowRight, 
  ArrowLeft,
  Shirt,
  Calendar,
  Layers,
  Sparkle
} from 'lucide-react';
import { SegmentedControl, TextInput } from '../forms';

interface ButlerAIAssistantProps {
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onClose?: () => void;
  compact?: boolean;
}

export type AIMode = 'recommend' | 'explain' | 'guide' | 'translate' | 'assist' | 'summarize' | 'needs';

interface ProposedAction {
  id: string;
  type: 'schedule_valet' | 'add_garments' | 'apply_privilege' | 'request_tailor';
  title: string;
  description: string;
  financialImpact: string;
  targetScreen?: ScreenId;
  status: 'pending' | 'confirmed' | 'rejected';
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  mode?: AIMode;
  proposedAction?: ProposedAction;
  metadata?: {
    tags?: string[];
    translatedText?: string;
    sourceLang?: string;
  };
}

export const ButlerAIAssistant: React.FC<ButlerAIAssistantProps> = ({
  onNavigate,
  lang,
  onClose,
  compact = false
}) => {
  const isRTL = lang === 'ar';
  const { addNotification } = useNotifications();

  const [activeMode, setActiveMode] = useState<AIMode>('recommend');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: isRTL 
        ? 'أهلاً بك. أنا المساعد الذكي لمستر باتلر. كيف يمكنني إرشادك اليوم في العناية بالملابس، الترجمة، أو جدولة خدمات النبلاء؟' 
        : 'Good day. I am your Mr. Butler Intelligent Valet Assistant. How may I assist you with wardrobe care, couture translation, or valet scheduling?',
      timestamp: 'Just now',
      mode: 'recommend'
    },
    {
      id: 'msg-2',
      sender: 'ai',
      text: isRTL
        ? 'اكتشفنا أن لديك بدلة سهرة قطعتين لم تخضع للتنظيف العضوي منذ 4 أشهر. بناءً على موسم الحفلات القادم، نقترح جدولة موعد تنظيف بالبخار اللطيف.'
        : 'Wardrobe Audit Insight: Your two-piece Italian Tuxedo was last serviced 4 months ago. Ahead of the gala season, we recommend scheduling an organic steam refresh.',
      timestamp: 'Just now',
      mode: 'needs',
      proposedAction: {
        id: 'action-1',
        type: 'schedule_valet',
        title: isRTL ? 'جدولة استلام البدلة الفاخرة' : 'Schedule Valet Pickup for Tuxedo',
        description: isRTL ? 'استلام منزلي مع شماعة مخصصة ومعالجة خالية من السموم' : 'Includes complimentary contoured cedar hanger and organic solvent cycle.',
        financialImpact: '$24.00 (Standard Flat Rate)',
        targetScreen: 'book_dry_cleaning',
        status: 'pending'
      }
    }
  ]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await sendAIChat({
        query: text,
        mode: activeMode,
        language: lang
      });

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        timestamp: response.timestamp || 'Just now',
        mode: activeMode,
        proposedAction: response.proposedAction as ProposedAction | undefined
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      generateLocalAIResponse(text, activeMode);
    } finally {
      setIsTyping(false);
    }
  };

  const generateLocalAIResponse = (query: string, mode: AIMode) => {
    let responseText = '';
    let action: ProposedAction | undefined = undefined;

    switch (mode) {
      case 'recommend':
        responseText = isRTL
          ? 'بناءً على الأقمشة الصيفية الرقيقة (الحرير والكتان)، ننصح بخدمة الكي بالبخار اليدوي بدرجة نشا خفيفة للحفاظ على رونق الياقات.'
          : 'For delicate summer linens and silk garments, our master tailors recommend artisan hand steaming with light starch to protect weave integrity.';
        action = {
          id: `act-${Date.now()}`,
          type: 'add_garments',
          title: 'Add 3 Linen Dress Shirts to Order',
          description: 'Includes collar stay alignment and non-toxic finish.',
          financialImpact: '$24.00 total ($8/shirt)',
          targetScreen: 'book_dry_cleaning',
          status: 'pending'
        };
        break;

      case 'explain':
        responseText = isRTL
          ? 'تستخدم منشآتنا مذيبات السيليكون السائل الصديقة للبيئة بدلاً من مادة البيركلوروإيثيلين السامة، مما يحمي ألياف الكشمير بنسبة 100% ويمنع الروائح الكيميائية.'
          : 'Our facility utilizes closed-loop liquid silicone organic solvents instead of harsh perchloroethylene. This guarantees zero fabric shrinkage and leaves garments hypoallergenic.';
        break;

      case 'guide':
        responseText = isRTL
          ? 'دليل حجز الخدمة: ١. اختر الملابس من القائمة. ٢. حدد مستوى النشا المطلوب. ٣. اختر الموعد المناسب لخدمة الاستلام. هل تود الانتقال لصفحة الحجز؟'
          : 'Step-by-Step Valet Guide: 1. Select your couture items. 2. Specify starch preference. 3. Choose your preferred pickup window. Would you like to proceed to booking?';
        action = {
          id: `act-${Date.now()}`,
          type: 'schedule_valet',
          title: 'Open Dry Cleaning & Laundry Booking',
          description: 'Pre-fills with your default residence at Dubai Marina.',
          financialImpact: 'Complimentary White-Glove Collection',
          targetScreen: 'book_dry_cleaning',
          status: 'pending'
        };
        break;

      case 'translate':
        responseText = isRTL
          ? 'ترجمة تعليمات الغسيل: "Lavare a secco solo con solventi idrocarburici" تعني "تنظيف جاف فقط باستخدام المذيبات الهيدروكربونية الخفيفة، يُمنع استخدام الماء أو التبييض الكلوري".'
          : 'Couture Tag Translation: "Lavare a secco solo con solventi idrocarburici" translates to "Professional Dry Clean Only with gentle hydrocarbon solvents; do not machine wash or bleach."';
        break;

      case 'assist':
        responseText = isRTL
          ? 'حساب التكلفة المقدرة: بدلتان رسميتان ($48) + 4 قمصان ($32) = $80.00 إجمالي. خدمة الاستلام والتوصيل مجانية.'
          : 'Estimate Calculation: 2 Tuxedos ($48) + 4 Executive Shirts ($32) = $80.00 estimated total with complimentary valet dispatch.';
        break;

      case 'summarize':
        responseText = isRTL
          ? 'ملخص الطلبات النشطة: طلب #MB-99482 قيد التوصيل الآن بواسطة خادم النبلاء تشارلز. موعد الوصول المتوقع خلال 15 دقيقة.'
          : 'Active Orders Summary: Order #MB-99482 is in transit via Butler Charles Montgomery. Estimated delivery window: 15 minutes.';
        break;

      case 'needs':
        responseText = isRTL
          ? 'تدقيق صحة خزانة الملابس: 4 أزواج من الأحذية الإيطالية بحاجة إلى تلميع وترطيب الجلد قبل تغير الموسم.'
          : 'Wardrobe Health Audit: 4 pairs of handcrafted leather oxfords require seasonal hydration and cedar rest.';
        action = {
          id: `act-${Date.now()}`,
          type: 'request_tailor',
          title: 'Schedule Shoe Restoration Valet',
          description: 'Italian leather beeswax conditioning & edge dressing.',
          financialImpact: '$45.00',
          targetScreen: 'book_shoe_repair',
          status: 'pending'
        };
        break;
    }

    const aiMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: responseText,
      timestamp: 'Just now',
      mode,
      proposedAction: action
    };

    setMessages(prev => [...prev, aiMsg]);
  };

  const handleActionDecision = (messageId: string, confirm: boolean) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.proposedAction) {
        const updatedStatus = confirm ? 'confirmed' : 'rejected';
        
        if (confirm) {
          addNotification({
            type: 'booking_update',
            title: `AI Proposal Applied: ${msg.proposedAction.title}`,
            message: `User confirmed action. ${msg.proposedAction.description}`,
            actionScreen: msg.proposedAction.targetScreen,
            actionLabel: 'View Booking'
          });

          if (msg.proposedAction.targetScreen) {
            onNavigate(msg.proposedAction.targetScreen);
          }
        }

        return {
          ...msg,
          proposedAction: {
            ...msg.proposedAction,
            status: updatedStatus
          }
        };
      }
      return msg;
    }));
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 rounded-3xl flex flex-col shadow-xl overflow-hidden transition-all ${
        compact ? 'h-[520px]' : 'h-[620px]'
      }`}
    >
      {/* AI Assistant Header */}
      <div className="p-4 bg-gradient-to-r from-[#00444D] via-[#0D5D68] to-[#002D33] text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFE088] text-[#00444D] flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-base font-bold tracking-tight">
                {isRTL ? 'مساعد مستر باتلر الذكي' : 'Butler AI Concierge'}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-mono font-bold">
                MEDS v2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-200 font-light">
              {isRTL ? 'إرشاد، ترجمة، واقتراحات معتمدة بدون تعديل تلقائي' : 'Guidance, Couture Translation & Safeguarded Actions'}
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close AI Assistant"
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Mode Selector Tabs */}
      <div className="px-3 py-2 bg-[#F8F9FF] dark:bg-slate-850 border-b border-[#D9E3F6] dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {(
          [
            { id: 'recommend', label: isRTL ? 'توصيات' : 'Recommend', icon: Sparkles },
            { id: 'explain', label: isRTL ? 'شرح الأقمشة' : 'Explain Fabric', icon: HelpCircle },
            { id: 'guide', label: isRTL ? 'إرشاد الحجز' : 'Booking Guide', icon: Calendar },
            { id: 'translate', label: isRTL ? 'ترجمة البطاقات' : 'Translate Tags', icon: Languages },
            { id: 'assist', label: isRTL ? 'حاسبة التكلفة' : 'Estimate Cost', icon: Calculator },
            { id: 'summarize', label: isRTL ? 'ملخص الطلبات' : 'Summarize', icon: FileText },
            { id: 'needs', label: isRTL ? 'تدقيق الخزانة' : 'Wardrobe Audit', icon: Shirt },
          ] as { id: AIMode; label: string; icon: React.ElementType }[]
        ).map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveMode(tab.id);
                handleSendMessage(
                  tab.id === 'recommend' ? 'Recommend care routine for bespoke clothing' :
                  tab.id === 'explain' ? 'Explain eco-organic dry cleaning solvents' :
                  tab.id === 'guide' ? 'Guide me through scheduling a valet' :
                  tab.id === 'translate' ? 'Translate Italian couture label: Lavare a secco' :
                  tab.id === 'assist' ? 'Estimate total for 2 tuxedos and 4 shirts' :
                  tab.id === 'summarize' ? 'Summarize my recent orders and status' :
                  'Audit my wardrobe care requirements'
                );
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                isActive
                  ? 'bg-[#00444D] text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'
              }`}
            >
              <TabIcon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                isAI 
                  ? 'bg-[#00444D] text-[#FFE088] shadow-xs' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white'
              }`}>
                {isAI ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[75%] space-y-2 ${isAI ? 'text-left rtl:text-right' : 'text-right rtl:text-left'}`}>
                <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isAI
                    ? 'bg-white dark:bg-slate-900 border border-[#D9E3F6] dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-xs'
                    : 'bg-[#00444D] text-white shadow-md'
                }`}>
                  {msg.text}
                </div>

                {/* Explicit Action Proposal Card (Safeguard) */}
                {msg.proposedAction && (
                  <div className="p-4 bg-white dark:bg-slate-900 border-2 border-[#CCA730] rounded-2xl shadow-md space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#00444D] dark:text-[#ABEDFA]">
                        <ShieldAlert className="w-4 h-4 text-[#CCA730]" />
                        <span>{isRTL ? 'إجراء مقترح (يتطلب موافقتك)' : 'Action Proposal (User Confirmation Required)'}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        msg.proposedAction.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : msg.proposedAction.status === 'rejected'
                            ? 'bg-slate-100 text-slate-500'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {msg.proposedAction.status.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white">
                        {msg.proposedAction.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        {msg.proposedAction.description}
                      </p>
                      <div className="text-[11px] font-mono text-[#00444D] dark:text-[#ABEDFA] font-semibold mt-1">
                        Pricing Impact: {msg.proposedAction.financialImpact}
                      </div>
                    </div>

                    {msg.proposedAction.status === 'pending' ? (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleActionDecision(msg.id, true)}
                          className="flex-1 py-2 bg-[#00444D] hover:bg-[#0D5D68] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isRTL ? 'تأكيد وتطبيق' : 'Confirm & Apply'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleActionDecision(msg.id, false)}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
                        >
                          {isRTL ? 'إلغاء' : 'Dismiss'}
                        </button>
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-400 font-mono italic">
                        {msg.proposedAction.status === 'confirmed' 
                          ? '✓ Action verified and confirmed by user.' 
                          : '✕ Action proposal dismissed.'}
                      </div>
                    )}
                  </div>
                )}

                <span className="text-[10px] text-slate-400 font-mono px-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic">
            <Sparkles className="w-3.5 h-3.5 text-[#00444D] dark:text-[#ABEDFA] animate-spin" />
            <span>Butler Intelligence analyzing wardrobe records...</span>
          </div>
        )}
      </div>

      {/* Input Composer */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-[#D9E3F6] dark:border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={isRTL ? 'اسأل مستر باتلر عن العناية بالأقمشة أو الخدمات...' : 'Ask Mr. Butler about fabric care, translation, or bookings...'}
          className="flex-1 bg-[#F8F9FF] dark:bg-slate-800 border border-[#D9E3F6] dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00444D]"
        />
        <button
          type="button"
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim()}
          aria-label="Send query to Butler AI"
          className="p-2.5 bg-[#00444D] hover:bg-[#0D5D68] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Safeguard Footer Notice */}
      <div className="px-4 py-1.5 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-[10px] text-slate-500 font-mono">
        Enterprise Policy: AI never executes bookings, payments, or cancellations without explicit confirmation.
      </div>
    </div>
  );
};
