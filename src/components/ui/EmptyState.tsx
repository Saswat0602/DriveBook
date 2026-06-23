import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { spacing, typography } from '../../theme';

interface EmptyStateProps extends ViewProps {
  title: string;
  description?: string;
}

export const EmptyState = ({ title, description, style, ...props }: EmptyStateProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]} {...props}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {description && (
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {description}
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
  title: {
    ...typography.subheading,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    textAlign: 'center',
  },
});
