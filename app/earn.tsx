import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import type { Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card, Phone, PrimaryButton, TopBar } from '@/components/AidanUI';

function Option({ icon, title, desc, selected = false, href }: { icon: keyof typeof Ionicons.glyphMap; title: string; desc: string; selected?: boolean; href?: Href }) {
  return (
    <Card onPress={href ? () => router.push(href) : undefined} style={[styles.option, selected && styles.selected]}>
      <Ionicons name={icon} size={31} color="#5065FF" />
      <View style={{ flex: 1 }}><Text style={styles.optionTitle}>{title}</Text><Text style={styles.optionDesc}>{desc}</Text></View>
    </Card>
  );
}

export default function EarnScreen() {
  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Ganhe comprando ou entregando" />
      <View style={styles.content}>
        <Text style={styles.title}>Ganhe dinheiro com o AIDAN</Text>
        <Text style={styles.subtitle}>Você pode ganhar comprando para outras pessoas, entregando pedidos ou os dois!</Text>
        <View style={styles.art}><Ionicons name="person-outline" size={88} color="#5065FF" /><Ionicons name="cash" size={55} color="#46D39D" style={styles.cash} /></View>
        <View style={styles.options}>
          <Option icon="cart-outline" title="Comprar para outros" desc="Ganhe dinheiro ajudando a comprar." selected href="/buy-for-others" />
          <Option icon="bus-outline" title="Entregar pedidos" desc="Receba entregando rapidamente" />
          <Option icon="briefcase-outline" title="Ambos" desc="Aproveite todas as oportunidades" />
        </View>
        <PrimaryButton label="Salvar alterações" href="/earn-dashboard" style={styles.button} />
      </View>
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 30, paddingTop: 12, paddingBottom: 70 },
  title: { color: '#111827', fontSize: 23, fontWeight: '900', marginBottom: 8 },
  subtitle: { color: '#4B5563', fontSize: 15, lineHeight: 21 },
  art: { height: 116, alignItems: 'center', justifyContent: 'center' },
  cash: { position: 'absolute', right: 88, top: 34 },
  options: { gap: 11, marginTop: 3 },
  option: { minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: 17, paddingHorizontal: 13 },
  selected: { borderColor: '#7FEFBF' },
  optionTitle: { color: '#333333', fontSize: 16, fontWeight: '800' },
  optionDesc: { color: '#505050', fontSize: 13, marginTop: 3 },
  button: { position: 'absolute', left: 26, right: 13, bottom: -111, backgroundColor: '#5865F2', height: 61 },
  nav: { position: 'absolute', left: 0, right: 0, bottom: 0 }
});
