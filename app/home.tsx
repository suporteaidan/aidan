import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomArea, Phone, SearchBox } from '@/components/AidanUI';

const logo = require('../assets/aidan-logo.png');
const categories = ['MERCADO', 'COMBUSTÍVEL', 'FARMÁCIA', 'LIVRARIA'];

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const filteredCategories = categories.filter((label) => normalize(label).includes(normalize(search)));

  return (
    <Phone bordered contentStyle={styles.phone}>
      <View style={styles.content}>
        <Pressable onPress={() => router.push('/menu')} style={styles.menuButton}>
          <Ionicons name="menu" size={30} color="#111111" />
        </Pressable>
        <View style={styles.brandRow}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.brandText}>O que vamos comprar hoje?</Text>
        </View>
        <SearchBox value={search} onChangeText={setSearch} onSubmitEditing={() => router.push('/shopping-list')} />
        <View style={styles.categories}>
          {filteredCategories.map((label) => <Pressable key={label} onPress={() => router.push('/shopping-list')} style={styles.category}><Text style={styles.categoryText}>{label}</Text></Pressable>)}
          {filteredCategories.length === 0 && <Text style={styles.emptySearch}>Nenhuma categoria encontrada</Text>}
        </View>
        <Pressable onPress={() => router.push('/shopping-list')} style={({ pressed }) => [styles.scanButton, pressed && styles.pressed]}>
          <Text style={styles.scanText}>Escanear cupons</Text>
          <Ionicons name="barcode-outline" size={58} color="#FFFFFF" />
        </Pressable>
      </View>
      <BottomArea active="home" />
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 34, paddingTop: 34, paddingBottom: 115, flex: 1 },
  menuButton: { width: 40, height: 40, justifyContent: 'center', marginBottom: 48 },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 34 },
  logo: { width: 76, height: 62, marginRight: 6 },
  brandText: { color: '#4B5CFF', fontSize: 15, flex: 1 },
  categories: { minHeight: 143, flexDirection: 'row', flexWrap: 'wrap', columnGap: 16, rowGap: 17, justifyContent: 'center', marginTop: 52, marginBottom: 83 },
  category: { width: 113, height: 42, borderRadius: 5, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.16, shadowRadius: 2, elevation: 2 },
  categoryText: { color: '#333333', fontSize: 14 },
  emptySearch: { color: '#888888', fontSize: 13, textAlign: 'center', marginTop: 12 },
  scanButton: { height: 113, width: 205, alignSelf: 'center', backgroundColor: '#5865F2', borderRadius: 6, alignItems: 'center', justifyContent: 'center', shadowColor: '#000000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.16, shadowRadius: 3, elevation: 3 },
  scanText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', marginBottom: 2 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] }
});
