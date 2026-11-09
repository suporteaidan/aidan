import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomArea, FakeMap, Phone, SearchBox, TopBar } from '@/components/AidanUI';

export default function MapResultScreen() {
  const [search, setSearch] = useState('');

  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Mapa Interativo" />
      <View style={styles.search}><SearchBox value={search} onChangeText={setSearch} /></View>
      {search.trim().length > 0 && <View style={styles.filterPill}><Text style={styles.filterText}>Filtrando por: {search}</Text></View>}
      <FakeMap withTooltip />
      <BottomArea active="home" />
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  search: { paddingHorizontal: 18, paddingTop: 31, paddingBottom: 40 },
  filterPill: { position: 'absolute', top: 183, left: 30, right: 30, zIndex: 5, backgroundColor: '#FFFFFF', borderRadius: 10, borderWidth: 1, borderColor: '#DDE3FF', paddingVertical: 9, paddingHorizontal: 12 },
  filterText: { color: '#5865F2', fontSize: 12, fontWeight: '800' }
});
