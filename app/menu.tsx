import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomArea, DaraAvatar, IconLine, Phone, SearchBox } from '@/components/AidanUI';
import { env } from '@/config/env';
import { useAuth } from '@/auth/AuthProvider';

const logo = require('../assets/aidan-logo.png');

function HomeDimmed() {
  return (
    <View style={styles.homeUnderlay}>
      <View style={styles.fakeContent}>
        <Ionicons name="menu" size={30} color="#111111" />
        <View style={styles.brandRow}><Image source={logo} style={styles.logo} resizeMode="contain" /><Text style={styles.brandText}>O que vamos comprar hoje?</Text></View>
        <SearchBox />
        <View style={styles.categories}>{['MERCADO', 'COMBUSTÍVEL', 'FARMÁCIA', 'LIVRARIA'].map((label) => <View key={label} style={styles.category}><Text style={styles.categoryText}>{label}</Text></View>)}</View>
        <View style={styles.scanButton}>
          <Text style={styles.scanText}>Escanear cupons</Text>
          <Ionicons name="barcode-outline" size={58} color="#FFFFFF" />
        </View>
      </View>
      <BottomArea active="home" />
    </View>
  );
}

export default function MenuScreen() {
  const { session, logout } = useAuth();
  const slideAnim = useRef(new Animated.Value(-270)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -270,
        duration: 280,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 240,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true
      })
    ]).start(() => router.push('/home'));
  };

  return (
    <Phone bordered contentStyle={styles.phone}>
      <HomeDimmed />
      <Animated.View style={[styles.closeLayer, { opacity: fadeAnim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={closeMenu} />
      </Animated.View>
      <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.drawerHeader}>
          <Text style={styles.menuTitle}>Menu</Text>
          <Ionicons name="notifications-outline" size={24} color="#4B5CFF" />
        </View>
        <View style={styles.profileRow}>
          {env.useMocks ? <DaraAvatar size={38} /> : <Ionicons name="person-circle-outline" size={38} color="#5865F2" />}
          <View style={styles.profileLabel}><Text style={styles.name}>{env.useMocks ? 'Dara Vitória' : (session?.name || session?.email || 'Minha conta')}</Text><Text style={styles.type}>Pessoal</Text></View>
        </View>
        <View style={styles.lines}>
          <IconLine icon="person-outline" text="Perfil" href="/profile" />
          <IconLine icon="bicycle-outline" text="Ganhe comprando ou entregando" href="/earn" />
          <IconLine icon="map-outline" text="Mapa interativo" href="/map" />
          <IconLine icon="people-outline" text="Comunidade" href="/community" />
          <IconLine icon="settings-outline" text="Configurações" href="/settings" />
          <Pressable onPress={() => { void logout().then(() => router.replace('/login')); }} style={styles.signoutRow}>
            <Ionicons name="log-out-outline" size={24} color="#4B5CFF" /><Text style={styles.signoutText}>Sair</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF', position: 'relative' },
  homeUnderlay: { flex: 1, opacity: 0.34, backgroundColor: '#FFFFFF' },
  fakeContent: { paddingHorizontal: 34, paddingTop: 34, paddingBottom: 115, flex: 1 },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginTop: 48, marginBottom: 34 },
  logo: { width: 76, height: 62, marginRight: 6 },
  brandText: { color: '#4B5CFF', fontSize: 15, flex: 1 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 16, rowGap: 17, justifyContent: 'center', marginTop: 52, marginBottom: 83 },
  category: { width: 113, height: 42, borderRadius: 5, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.16, shadowRadius: 2, elevation: 2 },
  categoryText: { color: '#333333', fontSize: 14 },
  scanButton: { height: 113, width: 205, alignSelf: 'center', backgroundColor: '#5865F2', borderRadius: 6, alignItems: 'center', justifyContent: 'center', shadowColor: '#000000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.16, shadowRadius: 3, elevation: 3 },
  scanText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', marginBottom: 2 },
  closeLayer: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.12)' },
  drawer: { position: 'absolute', left: 0, top: 0, width: 260, height: 460, maxHeight: '92%', backgroundColor: '#FFFFFF', borderBottomRightRadius: 17, paddingTop: 19, paddingHorizontal: 30, shadowColor: '#000000', shadowOffset: { width: 8, height: 0 }, shadowOpacity: 0.12, shadowRadius: 18, elevation: 8 },
  drawerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 19 },
  menuTitle: { color: '#333333', fontSize: 16, fontWeight: '900' },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 13, marginBottom: 18 },
  name: { color: '#333333', fontSize: 14, fontWeight: '500' },
  type: { color: '#777777', fontSize: 12 },
  lines: { gap: 0 },
  profileLabel: { flex: 1 },
  signoutRow: { flexDirection: 'row', alignItems: 'center', gap: 14, minHeight: 45 },
  signoutText: { color: '#333333', fontSize: 13 }
});
