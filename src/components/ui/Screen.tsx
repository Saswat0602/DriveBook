import React from 'react';
import { View, StyleSheet, SafeAreaView, ViewProps, StatusBar } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface ScreenProps extends ViewProps {
  children: React.ReactNode;
  safeArea?: boolean;
}

export const Screen = ({ children, safeArea = true, style, ...props }: ScreenProps) => {
  const { colors, isDark } = useTheme();

  const Container = safeArea ? SafeAreaView : View;

  return (
    <Container
      style={[
        styles.container,
        { backgroundColor: colors.background },
        style,
      ]}
      {...props}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
