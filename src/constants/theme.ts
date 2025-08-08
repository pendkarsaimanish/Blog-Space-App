export const COLORS = {
  // Primary colors from BlogSpace design
  primary: '#3B82F6', // Blue accent from the design
  primaryLight: '#60A5FA',
  primaryDark: '#2563EB',
  
  // Secondary colors
  secondary: '#8B5CF6', // Purple from gradient
  secondaryLight: '#A78BFA',
  
  // Background colors
  background: '#F8FAFC', // Light gray background
  surface: '#FFFFFF', // White cards
  surfaceVariant: '#F1F5F9', // Light gray for cards
  
  // Text colors
  textPrimary: '#1E293B', // Dark gray for main text
  textSecondary: '#64748B', // Medium gray for secondary text
  textTertiary: '#94A3B8', // Light gray for tertiary text
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  
  // Border colors
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  
  // Dark mode colors
  darkBackground: '#0F172A',
  darkSurface: '#1E293B',
  darkTextPrimary: '#F8FAFC',
  darkTextSecondary: '#CBD5E1',
  darkBorder: '#334155',
};

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 28,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  base: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
};

export const SIZES = {
  // Font sizes - optimized for mobile
  ...FONT_SIZES,
  
  // Spacing - optimized for mobile
  ...SPACING,
  
  // Border radius
  radiusSm: 4,
  radiusBase: 8,
  radiusLg: 12,
  radiusXl: 16,
  radiusFull: 9999,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};
