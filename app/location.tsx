import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AidanLogo, BluePhone, PrimaryButton } from '@/components/AidanUI';

export default function LocationScreen() {
  const [address, setAddress] = useState('');

  return (
    <BluePhone>
      <View style={styles.logo}><AidanLogo size={108} /></View>
      <Text style={styles.title}>LOCALIZAÇÃO</Text>
      <View style={styles.fields}>
        <View style={styles.inputRow}>
          <Ionicons name="search-outline" size={18} color="#B8BBC3" />
          <TextInput value={address} onChangeText={setAddress} placeholder="Endereço e número" placeholderTextColor="#C4C4C4" style={styles.addressInput} />
        </View>
        <View style={styles.locationCard}>
          <Ionicons name="locate-outline" size={18} color="#6B7C85" />
          <View style={styles.locationTextBox}>
            <Text style={styles.locationTitle}>Usar localização atual</Text>
            <Text style={styles.locationAddress}>R. Lauro Linhares – Trindade, Florianópolis – SC</Text>
          </View>
        </View>
      </View>
      <View style={styles.pin}><Ionicons name="location-outline" size={28} color="#0B1D32" /></View>
      <Text style={styles.text}>Para oferecer ofertas personalizadas e localizar os melhores preços próximos a você, o AIDAN precisará acessar sua localização e tratar seus dados com segurança. Ao continuar, você concorda com os <Text style={styles.link}>Termos LGPD</Text>. Você pode revogar o consentimento a qualquer momento.</Text>
      <PrimaryButton label="Continuar" href="/location-map" />
    </BluePhone>
  );
}

const styles = StyleSheet.create({
  logo: { alignItems: 'center', marginTop: 0, marginBottom: 35 },
  title: { color: '#FFFFFF', fontSize: 17, fontWeight: '600', marginBottom: 28 },
  fields: { gap: 13, marginBottom: 20 },
  inputRow: {
    height: 42,
    borderRadius: 5,
    backgroundColor: '#F3F3F3',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1
  },
  addressInput: { flex: 1, color: '#333333', fontSize: 15, paddingVertical: 0, outlineStyle: 'none' } as any,
  locationCard: {
    minHeight: 50,
    borderRadius: 5,
    backgroundColor: '#F3F3F3',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 7,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1
  },
  locationTextBox: { flex: 1, marginLeft: 6 },
  locationTitle: { color: '#333333', fontSize: 10, fontWeight: '700', marginBottom: 3 },
  locationAddress: { color: '#6B6B6B', fontSize: 10, lineHeight: 13 },
  pin: { alignItems: 'center', marginBottom: 17 },
  text: { color: '#FFFFFF', fontSize: 9.5, lineHeight: 13, textAlign: 'justify', fontWeight: '600', marginBottom: 30 },
  link: { textDecorationLine: 'underline', fontWeight: '900' }
});
