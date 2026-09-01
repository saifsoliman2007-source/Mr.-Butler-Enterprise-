import React, { useState } from 'react';
import { ScreenId, Language } from '../types';
import { GlobalShellHeader } from './navigation/GlobalShellHeader';
import { GlobalShellDrawer } from './navigation/GlobalShellDrawer';
import { AIAssistantDrawer } from './ai/AIAssistantDrawer';

interface RecurringAppHeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
  onOpenAI?: () => void;
  showStatusBar?: boolean;
  statusMessage?: string;
  title?: string;
}

export const RecurringAppHeader: React.FC<RecurringAppHeaderProps> = ({
  currentScreen,
  onNavigate,
  lang,
  onLanguageChange,
  onOpenAI,
  showStatusBar = true,
  statusMessage,
  title
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  const handleOpenAI = onOpenAI || (() => setIsAIOpen(true));

  return (
    <>
      <GlobalShellHeader
        currentScreen={currentScreen}
        onNavigate={onNavigate}
        lang={lang}
        onLanguageChange={onLanguageChange}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenAI={handleOpenAI}
        showStatusBar={showStatusBar}
        statusMessage={statusMessage}
        title={title}
      />

      <GlobalShellDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentScreen={currentScreen}
        onNavigate={onNavigate}
        lang={lang}
      />

      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onNavigate={onNavigate}
        lang={lang}
      />
    </>
  );
};
