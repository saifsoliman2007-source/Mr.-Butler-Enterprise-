/**
 * Mr. Butler Enterprise Design Tokens & Responsive Safe Area Standards
 * Reference: welcome_screen_material_update.html + Material 3 / Stitch Design System
 */

export const SAFE_AREA_BASELINE = {
  horizontal: {
    mobile: '16px',     // 16dp Mobile baseline
    tablet: '24px',     // 24dp Tablet baseline
    desktop: '32px',    // 32dp Desktop baseline
  },
  vertical: {
    minimum: '24px',    // 24dp Minimum vertical baseline
    mobile: '24px',
    tablet: '32px',
    desktop: '40px',
  },
  insets: {
    androidSystemBarTop: '24px',
    androidSystemBarBottom: '24px',
    iosNotchTop: '44px',
    iosDynamicIslandTop: '54px',
    iosHomeIndicatorBottom: '34px',
    foldableHingeWidth: '24px',
    keyboardHeightOffset: '240px',
    landscapeSideInset: '32px',
  },
} as const;

export const DESIGN_TOKENS = {
  colors: {
    primary: '#00444d',
    primaryContainer: '#0d5d68',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#92d4e0',
    primaryFixed: '#abedfa',
    primaryFixedDim: '#8fd1de',
    onPrimaryFixed: '#001f24',
    onPrimaryFixedVariant: '#004f58',
    
    secondary: '#29676d',
    secondaryContainer: '#b0edf4',
    onSecondary: '#ffffff',
    onSecondaryContainer: '#306d73',
    secondaryFixed: '#b0edf4',
    secondaryFixedDim: '#95d1d7',
    onSecondaryFixed: '#002023',
    onSecondaryFixedVariant: '#044f55',
    
    tertiary: '#735c00',
    tertiaryContainer: '#cca730',
    onTertiary: '#ffffff',
    onTertiaryContainer: '#4f3d00',
    tertiaryFixed: '#ffe088',
    tertiaryFixedDim: '#e9c349',
    onTertiaryFixed: '#241a00',
    onTertiaryFixedVariant: '#574500',
    
    surface: '#f8f9ff',
    surfaceBright: '#f8f9ff',
    surfaceDim: '#d0dbed',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#eff4ff',
    surfaceContainer: '#e6eeff',
    surfaceContainerHigh: '#dee9fc',
    surfaceContainerHighest: '#d9e3f6',
    onSurface: '#121c2a',
    onSurfaceVariant: '#3f484a',
    outline: '#6f797b',
    outlineVariant: '#bfc8ca',
    
    error: '#ba1a1a',
    errorContainer: '#ffdad6',
    onError: '#ffffff',
    onErrorContainer: '#93000a',
    
    inverseSurface: '#27313f',
    inverseOnSurface: '#eaf1ff',
    inversePrimary: '#8fd1de',
    surfaceTint: '#1e6772',
  },
  typography: {
    fontDisplay: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
    fontBody: "'Manrope', system-ui, -apple-system, sans-serif",
  },
  spacing: {
    touchTargetMin: '44px',
    containerMaxWidth: '1280px',
  },
} as const;

export type ViewportMode = 'mobile' | 'tablet' | 'desktop' | 'foldable';
export type Orientation = 'portrait' | 'landscape';
