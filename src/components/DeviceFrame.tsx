import React from 'react';
import { DeviceType, Orientation } from '../types';
import { Smartphone, Tablet, Monitor, TabletSmartphone, Laptop } from 'lucide-react';

interface DeviceFrameProps {
  deviceType: DeviceType;
  orientation?: Orientation;
  children: React.ReactNode;
  showFrame?: boolean;
  onDeviceChange?: (device: DeviceType) => void;
  onToggleFrame?: () => void;
}

export const DEVICE_CONFIGS: Record<DeviceType, {
  name: string;
  icon: React.ElementType;
  width: string;
  landscapeWidth: string;
  height: string;
  landscapeHeight: string;
  aspectClass: string;
  badge: string;
}> = {
  android_phone: {
    name: 'Android Phone',
    icon: Smartphone,
    width: '380px',
    landscapeWidth: '780px',
    height: '780px',
    landscapeHeight: '400px',
    aspectClass: 'max-w-[380px]',
    badge: 'Pixel 8 / Galaxy S24',
  },
  iphone: {
    name: 'iPhone 16 Pro',
    icon: Smartphone,
    width: '393px',
    landscapeWidth: '810px',
    height: '810px',
    landscapeHeight: '410px',
    aspectClass: 'max-w-[393px]',
    badge: 'iPhone 16 Pro',
  },
  foldable_folded: {
    name: 'Foldable (Folded)',
    icon: TabletSmartphone,
    width: '340px',
    landscapeWidth: '820px',
    height: '820px',
    landscapeHeight: '380px',
    aspectClass: 'max-w-[340px]',
    badge: 'Cover Screen (23.1:9)',
  },
  foldable_unfolded: {
    name: 'Foldable (Unfolded)',
    icon: TabletSmartphone,
    width: '720px',
    landscapeWidth: '820px',
    height: '820px',
    landscapeHeight: '720px',
    aspectClass: 'max-w-[720px]',
    badge: 'Inner Canvas (7.6" 4:3)',
  },
  android_tablet: {
    name: 'Android Tablet',
    icon: Tablet,
    width: '800px',
    landscapeWidth: '960px',
    height: '920px',
    landscapeHeight: '740px',
    aspectClass: 'max-w-[800px]',
    badge: 'Galaxy Tab S9',
  },
  ipad: {
    name: 'iPad Pro',
    icon: Tablet,
    width: '834px',
    landscapeWidth: '1024px',
    height: '960px',
    landscapeHeight: '780px',
    aspectClass: 'max-w-[834px]',
    badge: 'iPad Pro 11"',
  },
  desktop: {
    name: 'Desktop Web',
    icon: Monitor,
    width: '100%',
    landscapeWidth: '100%',
    height: 'auto',
    landscapeHeight: 'auto',
    aspectClass: 'w-full max-w-7xl',
    badge: 'Web Browser (Fluid Desktop)',
  },
};

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  deviceType,
  orientation = 'portrait',
  children,
}) => {
  const config = DEVICE_CONFIGS[deviceType];
  const isLandscape = orientation === 'landscape' && deviceType !== 'desktop';
  const width = isLandscape ? config.landscapeWidth : config.width;

  return (
    <div className="w-full flex-1 flex justify-center items-start py-3 sm:py-6 px-3 sm:px-6 transition-all duration-300">
      <div 
        className={`w-full ${config.aspectClass} flex flex-col transition-all duration-300 rounded-3xl overflow-hidden shadow-sm bg-white dark:bg-slate-900`}
        style={deviceType !== 'desktop' ? { maxWidth: width } : undefined}
      >
        {children}
      </div>
    </div>
  );
};

