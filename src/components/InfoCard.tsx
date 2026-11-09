import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/theme/colors';

type InfoCardProps = PropsWithChildren<{
  title?: string;
  description?: string;
}>;

export function InfoCard({ title, description, children }: InfoCardProps) {
  return (
    <View style={styles.card}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: 18,
    gap: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800'
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21
  }
});
