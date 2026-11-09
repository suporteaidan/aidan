import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Phone, PrimaryButton, TopBar } from '@/components/AidanUI';

export default function ProfileAddressScreen() {
  const [address, setAddress] = useState('');

  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Perfil" />
      <View style={styles.content}>
        <Text style={styles.title}>Endereço</Text>
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
        <Card style={styles.addressCard}>
          <Ionicons name="home" size={30} color="#8A76FF" style={styles.house} />
          <View style={styles.addressText}>
            <Text style={styles.addressTitle}>Endereço principal</Text>
            <Text style={styles.addressLine}>R. Lauro Linhares, 1775 – Trindade, Florianópolis – SC</Text>
            <Text style={styles.addressSmall}>Bloco Oeste, AP 401 – Condomínio Lauro Linhares</Text>
          </View>
          <Ionicons name="checkmark-circle-outline" size={22} color="#5D63FF" />
        </Card>
        <PrimaryButton label="Salvar alterações" href="/home" style={styles.button} />
      </View>
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 18, paddingTop: 26, paddingBottom: 60 },
  title: { color: '#333333', fontSize: 15, marginBottom: 18 },
  fields: { gap: 14, marginBottom: 31 },
  inputRow: { height: 42, borderRadius: 5, backgroundColor: '#F3F3F3', borderColor: '#D9D9D9', borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, shadowColor: '#000000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.12, shadowRadius: 2, elevation: 1 },
  addressInput: { flex: 1, color: '#333333', fontSize: 15, paddingVertical: 0, outlineStyle: 'none' } as any,
  locationCard: { minHeight: 50, borderRadius: 5, backgroundColor: '#CFF5E6', borderColor: '#CFF5E6', borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, paddingVertical: 7, shadowColor: '#000000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.12, shadowRadius: 2, elevation: 1 },
  locationTextBox: { flex: 1, marginLeft: 6 },
  locationTitle: { color: '#333333', fontSize: 10, fontWeight: '700', marginBottom: 3 },
  locationAddress: { color: '#6B6B6B', fontSize: 10, lineHeight: 13 },
  addressCard: { minHeight: 104, borderRadius: 11, borderWidth: 3, borderLeftColor: '#8D6BFF', borderRightColor: '#7FEFBF', borderTopColor: '#7FEFBF', borderBottomColor: '#8D6BFF', flexDirection: 'row', alignItems: 'center', padding: 14 },
  house: { marginRight: 12 },
  addressText: { flex: 1 },
  addressTitle: { color: '#333333', fontSize: 18, fontWeight: '800', textAlign: 'center', marginBottom: 7 },
  addressLine: { color: '#333333', fontSize: 12, lineHeight: 15 },
  addressSmall: { color: '#333333', fontSize: 11, lineHeight: 14 },
  button: { position: 'absolute', left: 20, right: 20, bottom: -181, backgroundColor: '#5865F2', height: 61 },
  nav: { position: 'absolute', left: 0, right: 0, bottom: 0 }
});
