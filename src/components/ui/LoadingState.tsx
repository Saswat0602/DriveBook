import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewProps, Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { spacing, typography } from '../../theme';

interface LoadingStateProps extends ViewProps {
  message?: string;
}

export const LoadingState = ({ message, style, ...props }: LoadingStateProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]} {...props}>
      <ActivityIndicator size="large" color={colors.primary} />
      {message && (
        <Text style={[styles.message, { color: colors.textSecondary }]}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  message: {
    ...typography.body,
    marginTop: spacing.md,
  },
});
