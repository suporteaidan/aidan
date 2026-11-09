import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomArea, FakeMap, Phone, SearchBox, TopBar } from '@/components/AidanUI';
import { router } from 'expo-router';

const places = [
  { distance: '950 m', title: 'Mercado Alternativo', address: 'Rua Lauro Linhares - Trindade, Florianópolis - SC' },
  { distance: '2,7 km', title: 'Mercado São Jorge', address: 'Rua Bocaiúva - Centro, Florianópolis - SC' },
  { distance: '1,3 km', title: 'Mercado Brito', address: 'Servidão da Felicidade - Saco dos Limões' },
  { distance: '5,9 km', title: 'Mercadoteca Florianópolis', address: 'Saco Grande, Florianópolis - SC' },
  { distance: '9,0 km', title: 'Mercado Floripa', address: 'Centro, Florianópolis - SC' }
];

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export default function MapScreen() {
  const [search, setSearch] = useState('');
  const filteredPlaces = places.filter((place) => normalize(`${place.title} ${place.address}`).includes(normalize(search)));

  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Mapa Interativo" />
      <View style={styles.search}><SearchBox value={search} onChangeText={setSearch} onSubmitEditing={() => router.push('/map-search')} /></View>
      <View style={styles.mapWrap}>
        <FakeMap />
        {search.trim().length > 0 && (
          <View style={styles.results}>
            {filteredPlaces.map((place) => (
              <Pressable key={place.title} onPress={() => router.push('/map-result')} style={styles.resultRow}>
                <Ionicons name="location-outline" size={20} color="#5865F2" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.resultTitle}>{place.title}</Text>
                  <Text style={styles.resultAddress}>{place.distance} • {place.address}</Text>
                </View>
              </Pressable>
            ))}
            {filteredPlaces.length === 0 && <Text style={styles.empty}>Nenhum local encontrado</Text>}
          </View>
        )}
      </View>
      <BottomArea active="home" />
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  search: { paddingHorizontal: 18, paddingTop: 31, paddingBottom: 40 },
  mapWrap: { flex: 1, position: 'relative' },
  results: { position: 'absolute', left: 22, right: 22, top: 14, backgroundColor: '#FFFFFF', borderRadius: 10, borderWidth: 1, borderColor: '#DDE3FF', overflow: 'hidden', shadowColor: '#000000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 10, elevation: 5 },
  resultRow: { minHeight: 54, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  resultTitle: { color: '#333333', fontSize: 13, fontWeight: '800' },
  resultAddress: { color: '#777777', fontSize: 10, marginTop: 2 },
  empty: { color: '#888888', fontSize: 12, padding: 16, textAlign: 'center' }
});
