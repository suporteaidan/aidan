import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '@/components/Header';
import { InfoCard } from '@/components/InfoCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/theme/colors';

export default function ProfileScreen() {
  return (
    <Screen>
      <Header
        eyebrow="Perfil"
        title="Lucas"
        description="Área visual do usuário com dados mockados para a apresentação."
      />

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>L</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Lucas</Text>
          <Text style={styles.email}>aidan.demo@app.local</Text>
        </View>
      </View>

      <View style={styles.metrics}>
        <InfoCard title="4" description="Telas navegáveis" />
        <InfoCard title="100%" description="Mock local" />
      </View>

      <View style={styles.options}>
        <View style={styles.optionRow}>
          <Ionicons name="phone-portrait-outline" size={22} color={colors.primary} />
          <Text style={styles.optionText}>Otimizado para Android real</Text>
        </View>
        <View style={styles.optionRow}>
          <Ionicons name="resize-outline" size={22} color={colors.primary} />
          <Text style={styles.optionText}>Layout responsivo por largura de tela</Text>
        </View>
        <View style={styles.optionRow}>
          <Ionicons name="git-branch-outline" size={22} color={colors.primary} />
          <Text style={styles.optionText}>Fluxos prontos para receber novas telas</Text>
        </View>
      </View>

      <PrimaryButton label="Voltar para o início" href="/(tabs)/home" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: 18,
    marginBottom: 16
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary
  },
  avatarText: {
    color: colors.surface,
    fontSize: 30,
    fontWeight: '900'
  },
  profileInfo: {
    flex: 1,
    gap: 4
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900'
  },
  email: {
    color: colors.muted,
    fontSize: 14
  },
  metrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18
  },
  options: {
    gap: 12,
    marginBottom: 22
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: 16
  },
  optionText: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '700'
  }
});
