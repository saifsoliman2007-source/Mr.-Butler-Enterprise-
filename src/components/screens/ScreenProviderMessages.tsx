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
  CheckCheck,
  Camera,
  Image as ImageIcon,
  X,
  ZoomIn
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
  const [pendingAttachedImage, setPendingAttachedImage] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption?: string; sender?: string } | null>(null);
  const [showImagePicker, setShowImagePicker] = useState(false);

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
        text: 'Rest assured, My Lord. We have hand-shielded every button before steam hand-pressing. Here is the intake inspection confirmation.',
        timestamp: '10:18 AM',
        imageUrl: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&auto=format&fit=crop&q=80',
        imageCaption: 'Ultrasonic spot-treatment station ready for delicate lapel cleaning',
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
        text: 'Could we ensure the silk hem is taken up exactly 1.5 inches as shown in this fitting reference?',
        timestamp: '11:20 AM',
        imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=80',
        imageCaption: 'Fitting Drape & Measurement Reference',
        isRead: true,
      },
      {
        id: 'msg-5',
        orderId: 'ord-102',
        senderRole: 'provider',
        senderName: 'Master Artisan',
        text: 'Understood, My Lady. We have pinned the waist taper with precision chalk lines. Starting silk blind-stitching now.',
        timestamp: '11:25 AM',
        imageUrl: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=600&auto=format&fit=crop&q=80',
        imageCaption: 'Silk basting in progress at atelier bench',
        isRead: true,
      }
    ],
    'ord-103': [
      {
        id: 'msg-6',
        orderId: 'ord-103',
        senderRole: 'customer',
        senderName: 'Prince Khalid',
        text: 'Please use Saphir Medaille d\'Or polish for the calfskin patina.',
        timestamp: '09:45 AM',
        imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=80',
        imageCaption: 'Toe Box & Leather Condition',
        isRead: true,
      },
      {
        id: 'msg-7',
        orderId: 'ord-103',
        senderRole: 'provider',
        senderName: 'Master Artisan',
        text: 'Applied Saphir Médaille d’Or beeswax cream with champagne gloss glaze.',
        timestamp: '09:50 AM',
        imageUrl: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80',
        imageCaption: 'Mirror gloss glaze completed',
        isRead: true,
      }
    ],
    'ord-104': [
      {
        id: 'msg-8',
        orderId: 'ord-104',
        senderRole: 'customer',
        senderName: 'Countess Victoria',
        text: 'Here is the style inspiration for my Parisian blowout for the diplomatic gala.',
        timestamp: '09:00 AM',
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
        imageCaption: 'Parisian Blowout & Gloss Reference Look',
        isRead: true,
      }
    ],
    'ord-105': [
      {
        id: 'msg-9',
        orderId: 'ord-105',
        senderRole: 'customer',
        senderName: 'Sir Arthur Pendelton',
        text: 'Here is Barnaby’s photo. He prefers gentle lavender shampoo and scissors trim only.',
        timestamp: '08:30 AM',
        imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80',
        imageCaption: 'Barnaby (Golden Retriever) Grooming Reference',
        isRead: true,
      }
    ]
  });

  const currentMessages = messagesMap[activeOrderId] || [];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() && !pendingAttachedImage) return;

    const newMsg: ProviderMessage = {
      id: `msg-${Date.now()}`,
      orderId: activeOrderId,
      senderRole: 'provider',
      senderName: 'Master Artisan',
      text: text.trim() || 'Attached service photo for your inspection.',
      imageUrl: pendingAttachedImage || undefined,
      imageCaption: pendingAttachedImage ? 'Artisan Service Verification Asset' : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    setMessagesMap(prev => ({
      ...prev,
      [activeOrderId]: [...(prev[activeOrderId] || []), newMsg]
    }));

    setInputText('');
    setPendingAttachedImage(null);
    setShowImagePicker(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPendingAttachedImage(result);
        setShowImagePicker(false);
      };
      reader.readAsDataURL(file);
    }
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
                    {/* Attached Photo Display */}
                    {msg.imageUrl && (
                      <div className="mb-2.5 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 group relative">
                        <img
                          src={msg.imageUrl}
                          alt={msg.imageCaption || 'Attached photo'}
                          referrerPolicy="no-referrer"
                          className="w-full max-h-56 object-cover cursor-pointer hover:scale-[1.02] transition duration-200"
                          onClick={() => setLightboxImage({
                            url: msg.imageUrl!,
                            caption: msg.imageCaption || msg.text,
                            sender: msg.senderName
                          })}
                        />
                        <button
                          type="button"
                          onClick={() => setLightboxImage({
                            url: msg.imageUrl!,
                            caption: msg.imageCaption || msg.text,
                            sender: msg.senderName
                          })}
                          className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 text-white backdrop-blur-xs text-[10px] font-medium flex items-center gap-1 opacity-90 hover:opacity-100 cursor-pointer"
                        >
                          <ZoomIn className="w-3 h-3" />
                          <span>Expand</span>
                        </button>
                        {msg.imageCaption && (
                          <div className={`p-1.5 text-[11px] font-medium ${isProvider ? 'bg-[#00333A] text-white/90' : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'}`}>
                            {msg.imageCaption}
                          </div>
                        )}
                      </div>
                    )}

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

          {/* Pending Photo Preview Bar */}
          {pendingAttachedImage && (
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border-t border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={pendingAttachedImage}
                  alt="Ready to send"
                  className="w-10 h-10 rounded-lg object-cover border border-emerald-300 dark:border-emerald-700"
                />
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block">
                    Photo Attached
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 truncate block">
                    Will be sent with your next message
                  </span>
                </div>
              </div>
              <button
                onClick={() => setPendingAttachedImage(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

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

          {/* Message Input Box with Photo Attachment */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            
            {/* Attachment Button */}
            <div className="relative">
              <label className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 hover:text-[#00444D] transition cursor-pointer flex items-center justify-center">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

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
              disabled={!inputText.trim() && !pendingAttachedImage}
              className="p-2.5 rounded-xl bg-[#00444D] text-white hover:bg-[#00333A] disabled:opacity-40 transition cursor-pointer flex items-center justify-center shadow-xs"
            >
              <Send className="w-4 h-4 text-[#FFE088]" />
            </button>
          </div>

        </div>

      </div>

      {/* Image Lightbox Modal */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="relative max-w-3xl w-full bg-white dark:bg-slate-900 rounded-2xl p-4 overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#00444D] dark:text-[#FFE088]" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {lightboxImage.caption || 'Inspection & Consultation Asset'}
                  </h4>
                  {lightboxImage.sender && (
                    <span className="text-[11px] text-slate-400">
                      Sent by: {lightboxImage.sender}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden bg-black/5 dark:bg-black/40 flex items-center justify-center max-h-[65vh]">
              <img
                src={lightboxImage.url}
                alt="Expanded view"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[65vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
