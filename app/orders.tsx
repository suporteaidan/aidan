import { StyleSheet, Text, View } from 'react-native';
import { BottomArea, Card, Phone, TopBar } from '@/components/AidanUI';

export default function OrdersScreen() {
  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Pedidos" />
      <View style={styles.content}>
        <Text style={styles.section}>Histórico de Pedidos</Text>
        <Text style={styles.date}>08 de Julho de 2025</Text>
        <Order value="75,00" delivery="5,00" total="80,00" economy="20%" name="Paulo Sergio" />
        <Text style={styles.date}>10 de Junho de 2025</Text>
        <Order value="100,00" economy="13%" />
        <Text style={styles.date}>5 de Junho de 2025</Text>
        <Order value="250,00" economy="25%" />
        <Text style={[styles.section, { marginTop: 18 }]}>Histórico de Economia</Text>
        <View style={styles.chart}>
          {[20, 38, 51, 34, 27].map((h, index) => <View key={index} style={styles.barWrap}><Text style={styles.percent}>{h}%</Text><View style={[styles.bar, { height: h * 2.2 }]} /><Text style={styles.month}>{['Julho','Junho','Agosto','Setembro','Dezembro'][index]}</Text></View>)}
        </View>
      </View>
      <BottomArea active="orders" />
    </Phone>
  );
}

function Order({ value, delivery, total, economy, name }: { value: string; delivery?: string; total?: string; economy: string; name?: string }) {
  return <Card style={styles.order}><Text style={styles.orderTitle}>Pedido Concluído - Nº 9578</Text><Text style={styles.orderText}>Valor da compra {value}</Text>{delivery && <Text style={styles.orderText}>Entrega {delivery}<Text style={styles.name}>                         {name}</Text></Text>}{total && <Text style={styles.total}>Total {total}</Text>}<Text style={styles.economy}>Economia {economy}</Text></Card>;
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 18, paddingTop: 17, paddingBottom: 112 },
  section: { color: '#333333', fontSize: 14, marginBottom: 14 },
  date: { color: '#555555', fontSize: 12, marginBottom: 3 },
  order: { minHeight: 82, padding: 10, marginBottom: 6 },
  orderTitle: { color: '#444444', fontSize: 12, textAlign: 'center', marginBottom: 10 },
  orderText: { color: '#444444', fontSize: 9.5, marginBottom: 5 },
  name: { color: '#777777', fontSize: 8 },
  total: { color: '#333333', fontSize: 10, fontWeight: '800' },
  economy: { color: '#23D5A3', fontSize: 10, fontWeight: '900' },
  chart: { height: 188, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 13, paddingBottom: 27, borderTopWidth: 1, borderColor: '#DDDDDD', marginHorizontal: 36, marginTop: 36 },
  barWrap: { alignItems: 'center' },
  percent: { color: '#444444', fontSize: 10, marginBottom: 5 },
  bar: { width: 27, borderRadius: 4, backgroundColor: '#95E6DF' },
  month: { color: '#444444', fontSize: 8, marginTop: 6 }
});
