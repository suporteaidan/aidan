import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomArea, Card, Phone, PrimaryButton, TopBar } from '@/components/AidanUI';

export default function EarnDashboardScreen() {
  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Ganhe comprando ou entregando" />
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo(a) de volta!</Text>
        <Text style={styles.subtitle}>Obrigado por ajudar a conectar economia e oportunidades.</Text>
        <View style={styles.metrics}>
          <Metric icon="cash-outline" label="Total ganho" value="R$ 1.250" />
          <Metric icon="checkmark" label="Pedidos concluídos" value="36" />
          <Metric icon="star-outline" label="Avaliação" value="4,8" />
        </View>
        <PrimaryButton label="Ver oportunidades" href="/shopping-list" style={styles.button} />
        <Text style={styles.recentTitle}>Atividades recentes</Text>
        <Activity text="Concluído" detail="Ontem · 16:52" />
        <Activity text="Concluído" detail="19 de abr. · 10:21" />
      </View>
      <BottomArea active="home" />
    </Phone>
  );
}

function Metric({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return <Card style={styles.metric}><Ionicons name={icon} size={28} color="#4B5CFF" /><Text style={styles.metricLabel}>{label}</Text><Text style={styles.metricValue}>{value}</Text></Card>;
}

function Activity({ text, detail }: { text: string; detail: string }) {
  return <View style={styles.activity}><Ionicons name="checkmark-circle" size={30} color="#5865F2" /><View><Text style={styles.activityTitle}>{text}</Text><Text style={styles.activityDetail}>{detail}</Text></View><View style={{ flex: 1 }} /><Ionicons name="chevron-forward" size={20} color="#C9D0DC" /></View>;
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 18, paddingTop: 22, paddingBottom: 105 },
  title: { color: '#111827', fontSize: 25, fontWeight: '900', textAlign: 'center', marginBottom: 11 },
  subtitle: { color: '#536174', fontSize: 16, lineHeight: 23, textAlign: 'center', marginHorizontal: 27, marginBottom: 28 },
  metrics: { flexDirection: 'row', gap: 8, marginBottom: 30 },
  metric: { flex: 1, minHeight: 108, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  metricLabel: { color: '#222222', fontSize: 13, fontWeight: '700', textAlign: 'center', marginTop: 8 },
  metricValue: { color: '#111111', fontSize: 21, fontWeight: '900', marginTop: 6 },
  button: { backgroundColor: '#5865F2', marginBottom: 20 },
  recentTitle: { color: '#111827', fontSize: 20, fontWeight: '900', marginBottom: 10 },
  activity: { minHeight: 57, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, borderBottomColor: '#DDE4EE' },
  activityTitle: { color: '#111827', fontSize: 19, fontWeight: '900' },
  activityDetail: { color: '#536174', fontSize: 14 }
});
