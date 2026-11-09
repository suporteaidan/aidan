import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

type HeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function Header({ eyebrow, title, description }: HeaderProps) {
  return (
    <View style={styles.wrapper}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
    marginBottom: 22
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase'
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24
  }
});
