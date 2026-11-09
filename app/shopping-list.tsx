import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomArea, Card, Phone, PrimaryButton, SearchBox, TopBar } from '@/components/AidanUI';
import { Ionicons } from '@expo/vector-icons';
import { cartItems } from '@/data/mock';

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export default function ShoppingListScreen() {
  const [search, setSearch] = useState('');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const filteredItems = cartItems.filter((row) => normalize(`${row.item} ${row.qty} ${row.best}`).includes(normalize(search)));
  const toggleItem = (item: string) => setCheckedItems((current) => ({ ...current, [item]: !current[item] }));

  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Lista de Compras" />
      <View style={styles.content}>
        <SearchBox value={search} onChangeText={setSearch} />
        <Text style={styles.mail}>✉️</Text>
        <Card style={styles.listCard}>
          <Text style={styles.listTitle}>LISTA</Text>
          <View style={styles.tableHeader} />
          {filteredItems.map((row) => {
            const checked = !!checkedItems[row.item];

            return (
              <Pressable key={row.item} onPress={() => toggleItem(row.item)} style={styles.itemRow}>
                <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                  {checked && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
                </View>
                <Text style={[styles.itemName, checked && styles.itemNameChecked]}>{row.item}</Text>
                <Text style={[styles.qty, checked && styles.itemNameChecked]}>{row.qty}</Text>
              </Pressable>
            );
          })}
          {filteredItems.length === 0 && <Text style={styles.empty}>Nenhum item encontrado</Text>}
          <View style={styles.emptyRows}>{Array.from({ length: Math.max(2, 6 - filteredItems.length) }).map((_, i) => <View key={i} style={styles.emptyLine} />)}</View>
        </Card>
        <PrimaryButton label="Escolha seu perfil de economia" href="/saving-splash" style={styles.button} />
      </View>
      <BottomArea active="list" />
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 112 },
  mail: { color: '#5865F2', fontSize: 26, marginTop: 17, marginLeft: 9, marginBottom: 4 },
  listCard: { minHeight: 398, borderColor: '#5865F2', borderRadius: 11, overflow: 'hidden', marginBottom: 25 },
  listTitle: { color: '#5865F2', fontSize: 17, fontWeight: '900', textAlign: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#5865F2' },
  tableHeader: { height: 8 },
  itemRow: { height: 26, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  checkbox: { width: 15, height: 15, borderWidth: 2, borderColor: '#EEEEEE', marginRight: 10, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: '#5865F2', borderColor: '#5865F2' },
  itemName: { color: '#333333', fontSize: 11, flex: 1 },
  itemNameChecked: { color: '#5865F2', textDecorationLine: 'line-through' },
  qty: { color: '#333333', fontSize: 11, width: 44 },
  empty: { color: '#888888', fontSize: 12, textAlign: 'center', paddingVertical: 26 },
  emptyRows: { flex: 1, paddingHorizontal: 18 },
  emptyLine: { height: 26, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  button: { backgroundColor: '#5865F2' }
});
