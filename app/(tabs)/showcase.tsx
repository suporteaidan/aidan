import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';
import { StatusPill } from '@/components/StatusPill';
import { showcaseScreens } from '@/data/mockScreens';
import { colors, radius } from '@/theme/colors';

export default function ShowcaseScreen() {
  return (
    <Screen>
      <Header
        eyebrow="Mapa"
        title="Telas da demonstração"
        description="Lista mockada das telas que serão substituídas pelos prints e layouts finais."
      />

      <View style={styles.list}>
        {showcaseScreens.map((screen) => (
          <Pressable
            key={screen.id}
            onPress={() => router.push(screen.route as Href)}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          >
            <View style={styles.cardContent}>
              <StatusPill status={screen.status} />
              <Text style={styles.title}>{screen.title}</Text>
              <Text style={styles.description}>{screen.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={colors.muted} />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 14
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: 16
  },
  cardContent: {
    flex: 1,
    gap: 8
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900'
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }]
  }
});
