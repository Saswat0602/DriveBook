import React from 'react';
import { View, Text, StyleSheet, ViewProps, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { spacing, typography } from '../../theme';

interface SectionHeaderProps extends ViewProps {
  title: string;
  actionTitle?: string;
  onActionPress?: () => void;
}

export const SectionHeader = ({
  title,
  actionTitle,
  onActionPress,
  style,
  ...props
}: SectionHeaderProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]} {...props}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {actionTitle && onActionPress && (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.8}>
          <Text style={[styles.action, { color: colors.primary }]}>{actionTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  title: {
    ...typography.subheading,
  },
  action: {
    ...typography.body,
    fontWeight: '600',
  },
});
