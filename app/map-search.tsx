import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Phone, SearchBox, TopBar } from '@/components/AidanUI';

const places = [
  ['950 m', 'Mercado Alternativo', 'Rua Lauro Linhares - Trindade, Floria...'],
  ['2,7 km', 'Mercado São Jorge', 'Rua Bocaiúva - Centro, Florianópolis...'],
  ['1,3 km', 'Mercado Brito', 'Servidão da Felicidade - Saco dos Li...'],
  ['5,9 km', 'Mercadoteca Florianópolis', 'Saco Grande, Florianópolis - SC'],
  ['9,0 km', 'Mercado Floripa', 'Centro, Florianópolis - SC'],
  ['650 m', 'Mini Mercado Carlinho', 'Rua Prof. Lauro Linhares - Trindade...'],
  ['1,1 km', 'Frutas e Verduras Fernandes', 'Trindade, Florianópolis - SC']
];

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export default function MapSearchScreen() {
  const [search, setSearch] = useState('Mercado');
  const filteredPlaces = places.filter((p) => normalize(`${p[1]} ${p[2]}`).includes(normalize(search)));

  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Mapa Interativo" />
      <View style={styles.search}><SearchBox value={search} onChangeText={setSearch} autoFocus /></View>
      <View style={styles.suggestions}>
        <View style={styles.recent}><Ionicons name="time-outline" size={26} color="#777" /><Text style={styles.recentText}>{search || 'mercado'}</Text><Ionicons name="return-down-back" size={19} color="#444" /></View>
        {filteredPlaces.map((p) => (
          <Pressable key={p[1]} onPress={() => router.push('/map-result')} style={styles.place}>
            <Text style={styles.distance}>{p[0]}</Text><Ionicons name="location-outline" size={25} color="#777" /><View style={{ flex: 1 }}><Text style={styles.placeTitle}>{p[1]}</Text><Text style={styles.placeAddress}>{p[2]}</Text></View><Ionicons name="return-down-back" size={18} color="#444" />
          </Pressable>
        ))}
        {filteredPlaces.length === 0 && <Text style={styles.empty}>Nenhum local encontrado</Text>}
      </View>
      <View style={styles.fakeKeyboard}>
        <View style={styles.suggestionBar}><Text style={styles.suggestionText}>▦</Text><Text style={styles.suggestionText}>{search || 'mercado'}</Text><Text style={styles.suggestionText}>mercados</Text><Text style={styles.suggestionText}>🛒</Text><Text style={styles.suggestionText}>🎙</Text></View>
        {['q w e r t y u i o p','a s d f g h j k l','⇧ z x c v b n m ⌫'].map((r) => <Text key={r} style={styles.keys}>{r}</Text>)}
        <Text style={styles.keys}>?123     ,   ☺        espaço        .       🔍</Text>
      </View>
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  search: { paddingHorizontal: 18, paddingTop: 31, paddingBottom: 20 },
  suggestions: { height: 298, borderWidth: 2, borderColor: '#3484FF', borderLeftWidth: 0, borderRightWidth: 0, backgroundColor: '#FFFFFF' },
  recent: { height: 52, flexDirection: 'row', alignItems: 'center', gap: 20, paddingHorizontal: 20 },
  recentText: { color: '#333333', fontSize: 16, flex: 1, fontWeight: '600' },
  place: { height: 53, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 8 },
  distance: { color: '#777777', fontSize: 11, width: 36 },
  placeTitle: { color: '#555555', fontSize: 15, fontWeight: '700' },
  placeAddress: { color: '#777777', fontSize: 11 },
  empty: { color: '#888888', fontSize: 12, textAlign: 'center', paddingVertical: 24 },
  fakeKeyboard: { height: 211, backgroundColor: '#F5F5F5', paddingTop: 6 },
  suggestionBar: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 14 },
  suggestionText: { color: '#777777', fontSize: 15 },
  keys: { color: '#555555', fontSize: 26, lineHeight: 44, letterSpacing: 12, paddingLeft: 10 }
});
