import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/theme/colors';

type StatusPillProps = {
  status: 'ready' | 'mock' | 'pending';
};

const labels = {
  ready: 'Pronto',
  mock: 'Mock',
  pending: 'Pendente'
};

const tone = {
  ready: colors.success,
  mock: colors.primary,
  pending: colors.warning
};

export function StatusPill({ status }: StatusPillProps) {
  return (
    <View style={[styles.pill, { borderColor: tone[status] }]}>
      <Text style={[styles.label, { color: tone[status] }]}>{labels[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  label: {
    fontSize: 12,
    fontWeight: '800'
  }
});
