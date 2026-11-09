import { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/theme/colors';
import { useResponsive } from '@/hooks/useResponsive';

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  style?: ViewStyle;
}>;

export function Screen({ children, scroll = true, style }: ScreenProps) {
  const { horizontalPadding } = useResponsive();

  if (!scroll) {
    return <SafeAreaView style={[styles.root, { paddingHorizontal: horizontalPadding }, style]}>{children}</SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPadding }, style]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    paddingTop: 16,
    paddingBottom: 120
  }
});
