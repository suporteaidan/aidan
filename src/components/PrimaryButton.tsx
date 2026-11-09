import { Href, router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius } from '@/theme/colors';

type PrimaryButtonProps = {
  label: string;
  href?: Href;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
};

export function PrimaryButton({ label, href, onPress, variant = 'primary' }: PrimaryButtonProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    if (href) {
      router.push(href);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondary,
        pressed && styles.pressed
      ]}
    >
      <Text style={[styles.label, variant === 'secondary' && styles.secondaryLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: 18
  },
  secondary: {
    backgroundColor: colors.surfaceSoft
  },
  label: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '800'
  },
  secondaryLabel: {
    color: colors.primaryDark
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }]
  }
});
