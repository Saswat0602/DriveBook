export const colors = {
  light: {
    background: '#F8F9FA',
    surface: '#FFFFFF',
    primary: '#2563EB',
    secondary: '#475569',
    text: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  },
  dark: {
    background: '#0F172A',
    surface: '#1E293B',
    primary: '#3B82F6',
    secondary: '#94A3B8',
    text: '#F8F9FA',
    textSecondary: '#CBD5E1',
    border: '#334155',
    error: '#F87171',
    success: '#34D399',
    warning: '#FBBF24',
  },
};

export type ThemeColors = typeof colors.light;
