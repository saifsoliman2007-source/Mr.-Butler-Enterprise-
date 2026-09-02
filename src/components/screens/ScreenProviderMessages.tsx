import React, { useState } from 'react';
import { Language, ScreenId, ProviderOrder, ProviderMessage } from '../../types';
import { translations } from '../../data/translations';
import { OrderStatusBadge } from './ScreenProviderDashboard';
import { 
  ArrowLeft, 
  MessageSquare, 
  Send, 
  Paperclip, 
  Sparkles, 
  Bot, 
  Check, 
  Clock, 
  User, 
  Phone, 
  Languages, 
  ChevronRight,
  Package,
  Search,
  CheckCheck
} from 'lucide-react';

interface ScreenProviderMessagesProps {
  orders: ProviderOrder[];
  selectedOrderId?: string;
  onNavigate: (screen: ScreenId) => void;
  onSelectOrder: (order: ProviderOrder) => void;
  lang: Language;
}

interface ChatThread {
  orderId: string;
  customerName: string;
  orderNumber: string;
  serviceTitle: string;
  status: ProviderOrder['status'];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const ScreenProviderMessages: React.FC<ScreenProviderMessagesProps> = ({
  orders,
  selectedOrderId,
  onNavigate,
  onSelectOrder,
  lang,
}) => {
  const t = translations[lang] || translations.en;
  const isRTL = lang === 'ar';

  const [activeOrderId, setActiveOrderId] = useState<string>(
    selectedOrderId || (orders.length > 0 ? orders[0].id : '')
  );
  const [inputText, setInputText] = useState('');
  const [showAiSuggestions, setShowAiSuggestions] = useState(true);
  const [enableLiveTranslate, setEnableLiveTranslate] = useState(false);

  // Current active order
  const activeOrder = orders.find(o => o.id === activeOrderId) || orders[0];

  // Mock messages mapped per order
  const [messagesMap, setMessagesMap] = useState<Record<string, ProviderMessage[]>>({
    'ord-101': [
      {
        id: 'msg-1',
        orderId: 'ord-101',
        senderRole: 'customer',
        senderName: 'Lord Harrington',
        text: 'Good afternoon, please take extra care with the mother-of-pearl buttons on the tuxedo jacket.',
        timestamp: '10:14 AM',
        isRead: true,
      },
      {
        id: 'msg-2',
        orderId: 'ord-101',
        senderRole: 'provider',
        senderName: 'Master Artisan',
        text: 'Rest assured, My Lord. We will hand-shield every button before steam hand-pressing.',
        timestamp: '10:18 AM',
        isRead: true,
      },
      {
        id: 'msg-3',
        orderId: 'ord-101',
        senderRole: 'system',
        senderName: 'Mr. Butler Dispatch',
        text: 'Valet courier has collected items from Al Olaya residence.',
        timestamp: '10:30 AM',
        isRead: true,
      }
    ],
    'ord-102': [
      {
        id: 'msg-4',
        orderId: 'ord-102',
        senderRole: 'customer',
        senderName: 'Lady Kensington',
        text: 'Could we ensure the silk hem is taken up exactly 1.5 inches?',
        timestamp: '11:20 AM',
        isRead: true,
      }
    ],
    'ord-103': [
      {
        id: 'msg-5',
        orderId: 'ord-103',
        senderRole: 'customer',
        senderName: 'Prince Khalid',
        text: 'Please use Saphir Medaille d\'Or polish for the calfskin patina.',
        timestamp: '09:45 AM',
        isRead: true,
      }
    ]
  });

  const currentMessages = messagesMap[activeOrderId] || [];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: ProviderMessage = {
      id: `msg-${Date.now()}`,
      orderId: activeOrderId,
      senderRole: 'provider',
      senderName: 'Master Artisan',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    setMessagesMap(prev => ({
      ...prev,
      [activeOrderId]: [...(prev[activeOrderId] || []), newMsg]
    }));

    setInputText('');
  };

  const aiCannedReplies = [
    activeOrder?.aiSuggestedResponse || 'We have received your garment and commenced custom treatment.',
    'Valet courier has been dispatched with temperature-controlled garment transport.',
    'Inspection completed in pristine order. Ready for scheduled delivery.',
    'Thank you for your instructions. We will ensure delicate hand-finishing.'
  ];

  return (
    <div className="min-h-full w-full bg-[#F8F9FF] dark:bg-[#070D18] text-[#1E293B] dark:text-slate-100 flex flex-col p-4 sm:p-6 lg:p-8 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#D9E3F6] dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('provider_dashboard')}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#00444D] dark:text-[#FFE088]" />
          </button>
          <div>
            <h1 className="font-serif font-bold text-lg sm:text-xl text-[#00444D] dark:text-[#FFE088]">
              Client Concierge & Direct Chat
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct communication with VIP clients and Mr. Butler Concierge
            </p>
          </div>
        </div>

        <button
          onClick={() => setEnableLiveTranslate(!enableLiveTranslate)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition ${
            enableLiveTranslate
              ? 'bg-[#00444D] text-white border-[#00444D] dark:bg-[#FFE088] dark:text-slate-900'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
          }`}
        >
          <Languages className="w-3.5 h-3.5" />
          <span>Live Translation: {enableLiveTranslate ? 'ON (AR/EN)' : 'OFF'}</span>
        </button>
      </div>

      {/* Main Container: Split View (Conversations List + Chat Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-[520px]">
        
        {/* Left: Chat Threads List */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex flex-col space-y-2 shadow-xs">
          <div className="px-2 py-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00444D] dark:text-[#FFE088]">
              Active Client Conversations
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 overflow-y-auto space-y-1">
            {orders.map((order) => {
              const isSelected = order.id === activeOrderId;
              const msgs = messagesMap[order.id] || [];
              const last = msgs.length > 0 ? msgs[msgs.length - 1] : null;

              return (
                <button
                  key={order.id}
                  onClick={() => setActiveOrderId(order.id)}
                  className={`w-full text-left p-3 rounded-xl transition cursor-pointer flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-[#00444D]/10 dark:bg-[#FFE088]/15 border border-[#00444D]/20 dark:border-[#FFE088]/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {order.customerName}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {order.orderNumber}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {last ? last.text : order.serviceTitle}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <OrderStatusBadge status={order.status} />
                    <span className="text-[10px] text-slate-400">
                      {last ? last.timestamp : 'Today'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Area */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col shadow-xs overflow-hidden">
          
          {/* Chat Header */}
          {activeOrder && (
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#00444D] text-[#FFE088] flex items-center justify-center font-bold text-sm">
                  {activeOrder.customerName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {activeOrder.customerName}
                    </h3>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                      VIP Client
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>{activeOrder.serviceTitle}</span>
                    <span>•</span>
                    <span className="font-mono">{activeOrder.orderNumber}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectOrder(activeOrder);
                  onNavigate('provider_order_details');
                }}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition cursor-pointer flex items-center gap-1"
              >
                <span>View Order</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          )}

          {/* Messages Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FBFBFF] dark:bg-[#070D18]">
            {currentMessages.map((msg) => {
              const isProvider = msg.senderRole === 'provider';
              const isSystem = msg.senderRole === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="flex justify-center my-2">
                    <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border border-slate-200 dark:border-slate-700">
                      <Sparkles className="w-3 h-3 text-[#00444D] dark:text-[#FFE088]" />
                      <span>{msg.text}</span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isProvider ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-slate-400 px-1 mb-0.5">
                    {msg.senderName} • {msg.timestamp}
                  </span>

                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                      isProvider
                        ? 'bg-[#00444D] text-white rounded-br-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    {enableLiveTranslate && (
                      <p className="mt-1.5 pt-1.5 border-t border-white/20 text-[11px] opacity-80 italic">
                        {isRTL ? 'Translated: ' + msg.text : 'الترجمة الآلية: ' + msg.text}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Assistive Suggestions Bar */}
          {showAiSuggestions && (
            <div className="p-3 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#00444D] dark:text-[#FFE088] uppercase tracking-wider flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5" />
                  <span>AI Assistive One-Tap Responses</span>
                </span>
                <button
                  onClick={() => setShowAiSuggestions(false)}
                  className="text-[10px] text-slate-400 hover:text-slate-600"
                >
                  Hide
                </button>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {aiCannedReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(reply)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#00444D] text-slate-700 dark:text-slate-200 text-xs whitespace-nowrap cursor-pointer transition shadow-2xs text-left"
                  >
                    "{reply.length > 45 ? reply.slice(0, 45) + '...' : reply}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input Box */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Type message to client or concierge..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FF] dark:bg-slate-800 text-xs sm:text-sm outline-none focus:border-[#00444D]"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-[#00444D] text-white hover:bg-[#00333A] disabled:opacity-40 transition cursor-pointer flex items-center justify-center"
            >
              <Send className="w-4 h-4 text-[#FFE088]" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
