import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, DaraAvatar, Phone, PrimaryButton } from '@/components/AidanUI';

export default function DeliverySuccessScreen() {
  return (
    <Phone bordered contentStyle={styles.phone}>
      <View style={styles.content}>
        <View style={styles.truckArt}><Ionicons name="bus" size={130} color="#4A78F7" /><View style={styles.glow} /></View>
        <Text style={styles.title}>Pronto! Sua compra está{`\n`}a caminho com o AIDAN</Text>
        <Card style={styles.infoCard}>
          <View style={styles.deliverer}><DaraAvatar size={42} /><Text style={styles.delivererName}>Entregador João A.</Text></View>
          <Info icon="calendar-outline" text="Previsão de entrega\nEntre 13:00 e 14:30" />
          <Info icon="cart-outline" text="Mercado selecionado\nAngeloni" />
          <Info icon="person-outline" text="Forma de entrega\nVia colaborador AIDAN" />
          <Text style={styles.savings}>Economia de 26,32%</Text>
        </Card>
        <PrimaryButton label="Acompanhar entrega em tempo real" href="/map-result" style={styles.button} />
        <PrimaryButton label="Voltar para a tela inicial" href="/home" style={styles.button} />
      </View>
    </Phone>
  );
}

function Info({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  return <View style={styles.info}><Ionicons name={icon} size={29} color="#3F75FF" /><Text style={styles.infoText}>{text}</Text></View>;
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#DDF4FF' },
  content: { paddingHorizontal: 22, paddingTop: 54, alignItems: 'center' },
  truckArt: { height: 154, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  glow: { position: 'absolute', bottom: 17, width: 210, height: 12, backgroundColor: 'rgba(68,100,255,0.25)', borderRadius: 6 },
  title: { color: '#3A3A3A', fontSize: 22, lineHeight: 30, fontWeight: '900', marginBottom: 26, alignSelf: 'flex-start', marginLeft: 32 },
  infoCard: { width: 270, minHeight: 253, backgroundColor: '#EAF7FF', borderColor: '#CFEFFF', paddingHorizontal: 16, paddingVertical: 13, marginBottom: 16 },
  deliverer: { flexDirection: 'row', alignItems: 'center', gap: 13, marginBottom: 8 },
  delivererName: { color: '#3A5964', fontSize: 17, fontWeight: '700' },
  info: { flexDirection: 'row', alignItems: 'center', gap: 17, marginTop: 7 },
  infoText: { color: '#3A5964', fontSize: 17, lineHeight: 20 },
  savings: { color: '#3F75FF', fontSize: 24, fontWeight: '900', marginTop: 13 },
  button: { width: '100%', backgroundColor: '#5865F2', marginTop: 16 }
});
