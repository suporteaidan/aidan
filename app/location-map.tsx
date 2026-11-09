import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BluePhone, PrimaryButton } from '@/components/AidanUI';

export default function LocationMapScreen() {
  return (
    <BluePhone>
      <View style={styles.mapPreview}>
        <View style={styles.road} />
        <Text style={[styles.mapText, { top: 120, left: 38 }]}>CTME BOX CAMPECHE</Text>
        <Text style={[styles.mapText, { top: 257, left: 50 }]}>Campeche Park</Text>
        <View style={styles.callout}><Text style={styles.calloutStrong}>Você está aqui?</Text><Text style={styles.calloutText}>Ajuste a localização</Text></View>
        <Ionicons name="location" size={48} color="#E52C2C" style={styles.pin} />
        <View style={styles.target}><Ionicons name="radio-button-on" size={28} color="#C7C7C7" /></View>
      </View>
      <PrimaryButton label="Continuar" href="/welcome" style={styles.button} />
    </BluePhone>
  );
}

const styles = StyleSheet.create({
  mapPreview: { height: 526, borderRadius: 15, backgroundColor: '#EFF4F8', overflow: 'hidden', marginHorizontal: -27, marginTop: -45, marginBottom: 39, position: 'relative' },
  road: { position: 'absolute', width: 36, height: 700, backgroundColor: '#FFF0A6', left: 158, top: -80, transform: [{ rotate: '5deg' }] },
  mapText: { position: 'absolute', color: '#B7B7B7', fontSize: 15, fontWeight: '700' },
  callout: { position: 'absolute', width: 145, height: 73, borderRadius: 3, backgroundColor: '#FFFFFF', left: 88, top: 174, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 4, elevation: 3 },
  calloutStrong: { color: '#5C5C5C', fontSize: 12, fontWeight: '900' },
  calloutText: { color: '#5C5C5C', fontSize: 12 },
  pin: { position: 'absolute', left: 138, top: 263 },
  target: { position: 'absolute', left: 188, top: 114 },
  button: { marginHorizontal: -3 }
});
