import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header } from '@/components/Header';
import { InfoCard } from '@/components/InfoCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/theme/colors';

export default function SummaryScreen() {
  return (
    <Screen>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color={colors.text} />
        <Text style={styles.backText}>Voltar</Text>
      </Pressable>

      <Header
        eyebrow="Resumo"
        title="Objetivo da primeira demo"
        description="Validar sensação de uso, navegação e proporção visual no Android real antes de conectar backend."
      />

      <View style={styles.stack}>
        <InfoCard title="O que entra agora" description="Telas navegáveis, layout responsivo, fluxo inicial, abas e conteúdo mockado." />
        <InfoCard title="O que fica para depois" description="API, autenticação real, persistência, integrações externas e regras de negócio." />
        <InfoCard title="Próximo passo" description="Você manda os prints das telas e eu adapto a estrutura para ficar visualmente igual." />
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Ver mapa de telas" href="/(tabs)/showcase" />
      </View>
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
  },
  stack: {
    gap: 14
  },
  actions: {
    marginTop: 24
  }
});
