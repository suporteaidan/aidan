import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Phone, PrimaryButton, TopBar } from '@/components/AidanUI';
import { cartItems } from '@/data/mock';

export default function CartMoneyScreen() {
  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Carrinho" />
      <View style={styles.content}>
        <Text style={styles.mode}>Economia por Dinheiro</Text>
        <Card style={styles.table}>
          <View style={styles.headerRow}><Text style={styles.cellProduct}>Produto</Text><Text style={styles.cell}>Melhor Preço</Text><Text style={styles.cell}>Valor</Text></View>
          {cartItems.map((r) => <View key={r.item} style={styles.row}><Text style={styles.cellProduct}>{r.item.replace(/^[^ ]+ /, '')}</Text><Text style={styles.cell}>{r.best}</Text><Text style={styles.cell}>{r.value}</Text></View>)}
          <View style={styles.spacer} />
          <View style={styles.total}><Text style={styles.cellProduct}>TOTAL</Text><Text style={styles.cell}></Text><Text style={styles.cell}>R$ 75,00</Text></View>
        </Card>
        <DeliveryBox />
        <PrimaryButton label="finalizar" href="/list-success" style={styles.button} />
      </View>
    </Phone>
  );
}

function DeliveryBox() {
  const [checked, setChecked] = useState(false);

  return (
    <Card style={styles.delivery}>
      <Ionicons name="bus" size={30} color="#5865F2" />
      <View style={{ flex: 1 }}>
        <Text style={styles.deliveryTitle}>Entrega pelo AIDAN</Text>
        <Text style={styles.deliveryText}>Conte com entregadores cadastrados para receber suas compras</Text>
        <Pressable onPress={() => setChecked(!checked)} style={styles.request}>
          <Ionicons name={checked ? 'checkbox' : 'square-outline'} size={19} color={checked ? '#5865F2' : '#333'} />
          <Text style={styles.requestText}>Quero solicitar entrega via AIDAN</Text>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 23, paddingTop: 11, paddingBottom: 90 },
  mode: { color: '#333333', fontSize: 13, marginBottom: 22 },
  table: { height: 402, overflow: 'hidden', marginBottom: 9 },
  headerRow: { flexDirection: 'row', height: 33, borderBottomWidth: 1, borderColor: '#E5E5E5', alignItems: 'center' },
  row: { flexDirection: 'row', height: 31, borderBottomWidth: 1, borderColor: '#E5E5E5', alignItems: 'center' },
  cellProduct: { flex: 1, color: '#333333', fontSize: 11, paddingLeft: 7 },
  cell: { width: 102, color: '#333333', fontSize: 10, textAlign: 'center', height: '100%', textAlignVertical: 'center', borderLeftWidth: 1, borderColor: '#E5E5E5' },
  spacer: { flex: 1, borderBottomWidth: 1, borderColor: '#E5E5E5' },
  total: { flexDirection: 'row', height: 31, alignItems: 'center' },
  delivery: { height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, marginBottom: 22 },
  deliveryTitle: { color: '#333333', fontSize: 15, fontWeight: '900' },
  deliveryText: { color: '#555555', fontSize: 8, marginBottom: 3 },
  request: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
  requestText: { color: '#111111', fontSize: 9, fontWeight: '800', marginLeft: 2 },
  button: { backgroundColor: '#5865F2' },
  nav: { position: 'absolute', left: 0, right: 0, bottom: 0 }
});
