import { useColorScheme } from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { colors, ThemeColors } from '../theme/colors';

export const useTheme = (): { colors: ThemeColors; isDark: boolean } => {
  const systemColorScheme = useColorScheme();
  const mode = useThemeStore((state) => state.mode);

  const isDark =
    mode === 'dark' || (mode === 'system' && systemColorScheme === 'dark');

  return {
    colors: isDark ? colors.dark : colors.light,
    isDark,
  };
};
