import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, DaraAvatar, Field, Phone, PrimaryButton, TopBar } from '@/components/AidanUI';

export default function ProfileScreen() {
  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Perfil" rightLabel="Sair" />
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <View style={styles.avatarWrap}><DaraAvatar size={54} /><View style={styles.camera}><Ionicons name="camera-outline" size={11} color="#333" /></View></View>
          <Text style={styles.sectionTitle}>Dados Pessoais</Text>
        </View>
        <View style={styles.fields}>
          <Field value="Dara Vitória da Silva" />
          <Field value="(49) 0000-0000" />
          <View style={styles.row}><Field value="24/02/1998" small /><Field value="Feminino        ⌄" small /></View>
          <Field value="dara98dasilva@gmail.com" />
        </View>
        <View style={styles.securityTitle}><Ionicons name="shield-checkmark-outline" size={27} color="#111" /><Text style={styles.sectionTitle}>Segurança</Text></View>
        <View style={styles.fields}><Field placeholder="Senha                                         >" /><Field placeholder="Conta para recuperação                 >" /></View>
        <PrimaryButton label="Próximo" href="/profile-address" style={styles.button} />
      </View>
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 48 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatarWrap: { marginRight: 19, position: 'relative' },
  camera: { position: 'absolute', right: -2, bottom: 3, width: 14, height: 14, borderRadius: 7, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { color: '#333333', fontSize: 15, fontWeight: '500' },
  fields: { gap: 11 },
  row: { flexDirection: 'row', gap: 13 },
  securityTitle: { flexDirection: 'row', alignItems: 'center', gap: 19, marginTop: 31, marginBottom: 20 },
  button: { position: 'absolute', left: 20, right: 20, bottom: -118, backgroundColor: '#5865F2', height: 61 },
  nav: { position: 'absolute', left: 0, right: 0, bottom: 0 }
});
