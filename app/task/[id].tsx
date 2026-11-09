import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Header } from '@/components/Header';
import { InfoCard } from '@/components/InfoCard';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/theme/colors';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color={colors.text} />
        <Text style={styles.backText}>Voltar</Text>
      </Pressable>

      <Header
        eyebrow="Detalhe"
        title={`Item ${id ?? 'mock'}`}
        description="Tela de detalhe pronta para conectar cards, listas e fluxos futuros."
      />

      <InfoCard
        title="Conteúdo simulado"
        description="Esta rota dinâmica existe para facilitar a criação de detalhes quando os prints chegarem."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 18
  },
  backText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800'
  }
});
