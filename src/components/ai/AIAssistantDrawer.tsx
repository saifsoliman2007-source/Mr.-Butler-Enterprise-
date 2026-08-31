import React from 'react';
import { ButlerAIAssistant } from './ButlerAIAssistant';
import { ScreenId, Language } from '../../types';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  lang
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col">
        <ButlerAIAssistant
          onNavigate={(screen) => {
            onNavigate(screen);
            onClose();
          }}
          lang={lang}
          onClose={onClose}
          compact={false}
        />
      </div>
    </div>
  );
};
