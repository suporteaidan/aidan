import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { Header } from '@/components/Header';
import { InfoCard } from '@/components/InfoCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, radius } from '@/theme/colors';

export default function OnboardingScreen() {
  return (
    <Screen style={styles.screen}>
      <View style={styles.hero}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>A</Text>
        </View>
        <Header
          eyebrow="Aidan Showcase"
          title="Uma demonstração navegável direto no Android"
          description="Esta versão mostra somente as telas, com conteúdo mockado, responsivo e pronto para validar o comportamento do app no celular real."
        />
      </View>

      <View style={styles.stack}>
        <InfoCard title="Sem backend por enquanto" description="As ações simulam navegação, estados visuais e fluxo de apresentação." />
        <InfoCard title="Foco em tela" description="Depois dos prints, trocamos cada placeholder pelas telas finais do Aidan." />
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Entrar na demonstração" href="/(tabs)/home" />
        <PrimaryButton label="Ver mapa de telas" href="/(tabs)/showcase" variant="secondary" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  hero: {
    gap: 22
  },
  logoCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary
  },
  logoText: {
    color: colors.surface,
    fontSize: 36,
    fontWeight: '900'
  },
  stack: {
    gap: 14,
    marginTop: 18
  },
  actions: {
    gap: 12,
    marginTop: 28,
    marginBottom: 8
  }
});
