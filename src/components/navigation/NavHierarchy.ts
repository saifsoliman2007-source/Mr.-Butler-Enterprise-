import { ScreenId, Language } from '../../types';
import { translations } from '../../data/translations';
import {
  Home,
  Sparkles,
  Shirt,
  Scissors,
  Footprints,
  Sparkle,
  Dog,
  Bell,
  Tag,
  Star,
  MessageSquarePlus,
  Package,
  Clock,
  CheckCircle2,
  FileText,
  Building2,
  Crown,
  Layers,
  Palette,
  Eye,
  HardDrive,
  LucideIcon
} from 'lucide-react';

export interface NavChildItem {
  id: ScreenId;
  labelKey: string;
  descKey?: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  id: ScreenId;
  labelKey: string;
  descKey?: string;
  icon: LucideIcon;
  badge?: string;
  children?: NavChildItem[];
}

/**
 * Release 1 Consumer Experience Global Navigation (Requirement 11)
 * The application shell uses:
 * - HOME
 * - CONCIERGE
 * - ORDERS
 * - FOUNDATION
 */
export const RELEASE_1_GLOBAL_NAV: NavSection[] = [
  {
    id: 'welcome',
    labelKey: 'navHome',
    descKey: 'motto',
    icon: Home,
  },
  {
    id: 'our_services',
    labelKey: 'navServices',
    descKey: 'navCatalogSummary',
    icon: Sparkles,
    badge: '5 Core',
    children: [
      {
        id: 'our_services',
        labelKey: 'navAllServices',
        icon: Sparkles,
        badge: 'Directory'
      },
      {
        id: 'book_dry_cleaning',
        labelKey: 'navDryCleaning',
        icon: Shirt,
        badge: 'Eco'
      },
      {
        id: 'book_tailoring',
        labelKey: 'navTailoring',
        icon: Scissors,
        badge: 'Bespoke'
      },
      {
        id: 'book_shoe_repair',
        labelKey: 'navShoeRepair',
        icon: Footprints,
        badge: 'Artisan'
      },
      {
        id: 'book_beauty_salon',
        labelKey: 'navBeautySalon',
        icon: Sparkle,
        badge: 'VIP'
      },
      {
        id: 'book_pet_care',
        labelKey: 'navPetCare',
        icon: Dog,
        badge: 'Gentle'
      }
    ]
  },
  {
    id: 'concierge',
    labelKey: 'navConcierge',
    descKey: 'mottoSub',
    icon: Bell,
    badge: '24/7',
    children: [
      {
        id: 'concierge_offers',
        labelKey: 'navOffers',
        icon: Tag,
        badge: 'New'
      },
      {
        id: 'concierge_recommendations',
        labelKey: 'navRecommendations',
        icon: Star,
        badge: 'Curated'
      },
      {
        id: 'concierge_special_requests',
        labelKey: 'navSpecialRequests',
        icon: MessageSquarePlus,
        badge: 'Direct'
      },
      {
        id: 'google_drive',
        labelKey: 'navGoogleDrive',
        icon: HardDrive,
        badge: 'Cloud'
      }
    ]
  },
  {
    id: 'orders',
    labelKey: 'navOrders',
    icon: Package,
    badge: '2 Active',
    children: [
      {
        id: 'orders_active',
        labelKey: 'navActiveOrders',
        icon: Clock,
        badge: '2'
      },
      {
        id: 'orders_previous',
        labelKey: 'navPreviousOrders',
        icon: CheckCircle2
      },
      {
        id: 'orders_details',
        labelKey: 'navOrderDetails',
        icon: FileText
      }
    ]
  },
  {
    id: 'foundation',
    labelKey: 'navFoundation',
    icon: Layers,
    children: [
      {
        id: 'foundation_enterprise',
        labelKey: 'navEnterpriseInfo',
        icon: Building2
      },
      {
        id: 'foundation_brand',
        labelKey: 'navBrand',
        icon: Crown
      },
      {
        id: 'foundation_components',
        labelKey: 'navSharedComponents',
        icon: Layers
      },
      {
        id: 'foundation_design',
        labelKey: 'navDesign',
        icon: Palette
      },
      {
        id: 'foundation_accessibility',
        labelKey: 'navAccessibility',
        icon: Eye
      }
    ]
  }
];

export const NAV_HIERARCHY: NavSection[] = [
  {
    id: 'welcome',
    labelKey: 'navHome',
    descKey: 'motto',
    icon: Home,
  },
  {
    id: 'our_services',
    labelKey: 'navServices',
    descKey: 'navCatalogSummary',
    icon: Sparkles,
    children: [
      {
        id: 'book_dry_cleaning',
        labelKey: 'navDryCleaning',
        icon: Shirt,
        badge: 'Eco'
      },
      {
        id: 'book_tailoring',
        labelKey: 'navTailoring',
        icon: Scissors,
        badge: 'Bespoke'
      },
      {
        id: 'book_shoe_repair',
        labelKey: 'navShoeRepair',
        icon: Footprints,
        badge: 'Artisan'
      },
      {
        id: 'book_beauty_salon',
        labelKey: 'navBeautySalon',
        icon: Sparkle,
        badge: 'VIP'
      },
      {
        id: 'book_pet_care',
        labelKey: 'navPetCare',
        icon: Dog,
        badge: 'Gentle'
      }
    ]
  },
  {
    id: 'concierge',
    labelKey: 'navConcierge',
    descKey: 'mottoSub',
    icon: Bell,
    badge: '24/7',
    children: [
      {
        id: 'concierge_offers',
        labelKey: 'navOffers',
        icon: Tag,
        badge: 'New'
      },
      {
        id: 'concierge_recommendations',
        labelKey: 'navRecommendations',
        icon: Star,
        badge: 'Curated'
      },
      {
        id: 'concierge_special_requests',
        labelKey: 'navSpecialRequests',
        icon: MessageSquarePlus,
        badge: 'Direct'
      },
      {
        id: 'google_drive',
        labelKey: 'navGoogleDrive',
        icon: HardDrive,
        badge: 'Cloud'
      }
    ]
  },
  {
    id: 'orders',
    labelKey: 'navOrders',
    icon: Package,
    badge: '2 Active',
    children: [
      {
        id: 'orders_active',
        labelKey: 'navActiveOrders',
        icon: Clock,
        badge: '2'
      },
      {
        id: 'orders_previous',
        labelKey: 'navPreviousOrders',
        icon: CheckCircle2
      },
      {
        id: 'orders_details',
        labelKey: 'navOrderDetails',
        icon: FileText
      }
    ]
  },
  {
    id: 'foundation',
    labelKey: 'navFoundation',
    icon: Layers,
    children: [
      {
        id: 'foundation_enterprise',
        labelKey: 'navEnterpriseInfo',
        icon: Building2
      },
      {
        id: 'foundation_brand',
        labelKey: 'navBrand',
        icon: Crown
      },
      {
        id: 'foundation_components',
        labelKey: 'navSharedComponents',
        icon: Layers
      },
      {
        id: 'foundation_design',
        labelKey: 'navDesign',
        icon: Palette
      },
      {
        id: 'foundation_accessibility',
        labelKey: 'navAccessibility',
        icon: Eye
      }
    ]
  }
];

export function getLocalizedNavLabel(key: string, lang: Language): string {
  const currentTranslations = translations[lang] || translations.en;
  return currentTranslations[key] || (translations.en[key] ?? key);
}

export function isSectionActive(section: NavSection, currentScreen: ScreenId): boolean {
  if (section.id === currentScreen) return true;
  if (section.id === 'welcome' && (currentScreen === 0 || currentScreen === 'welcome')) return true;
  if (section.id === 'our_services' && (currentScreen === 'our_services' || currentScreen === 'services' || currentScreen === 'consumer_home')) return true;
  if (section.id === 'concierge' && (currentScreen === 'concierge' || currentScreen === 'concierge_offers' || currentScreen === 'concierge_recommendations' || currentScreen === 'concierge_special_requests' || currentScreen === 'google_drive')) return true;
  if (section.id === 'orders' && (currentScreen === 'orders' || currentScreen === 'orders_active' || currentScreen === 'orders_previous' || currentScreen === 'orders_details')) return true;
  if (section.id === 'foundation' && (currentScreen === 'foundation' || currentScreen === 'foundation_enterprise' || currentScreen === 'foundation_brand' || currentScreen === 'foundation_components' || currentScreen === 'foundation_design' || currentScreen === 'foundation_accessibility')) return true;

  if (section.children) {
    return section.children.some(child => child.id === currentScreen);
  }
  return false;
}
