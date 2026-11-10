import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DaraAvatar, Field, Phone, PrimaryButton, TopBar } from '@/components/AidanUI';
import { useAuth } from '@/auth/AuthProvider';
import { env } from '@/config/env';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { session, logout } = useAuth();
  const signOut = () => { void logout().then(() => router.replace('/login')); };
  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Perfil" rightLabel="Sair" onRightPress={signOut} />
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <View style={styles.avatarWrap}>{env.useMocks ? <DaraAvatar size={54} /> : <Ionicons name="person-circle-outline" size={54} color="#5865F2" />}<View style={styles.camera}><Ionicons name="camera-outline" size={11} color="#333" /></View></View>
          <Text style={styles.sectionTitle}>Dados Pessoais</Text>
        </View>
        <View style={styles.fields}>
          <Field value={env.useMocks ? "Dara Vitória da Silva" : (session?.name ?? "")} placeholder="Nome" />
          <Field value={env.useMocks ? "(49) 0000-0000" : ""} placeholder="Telefone" />
          <View style={styles.row}><Field value={env.useMocks ? "24/02/1998" : ""} placeholder="Nascimento" small /><Field value={env.useMocks ? "Feminino" : ""} placeholder="Gênero" small /></View>
          <Field value={env.useMocks ? "dara98dasilva@gmail.com" : (session?.email ?? "")} placeholder="Email" />
        </View>
        <View style={styles.securityTitle}><Ionicons name="shield-checkmark-outline" size={27} color="#111" /><Text style={styles.sectionTitle}>Segurança</Text></View>
        <View style={styles.fields}><Field placeholder="Senha                                         >" /><Field placeholder="Conta para recuperação                 >" /></View>
        {!env.useMocks && <Text style={styles.pending}>Alterações nesta tela ainda não são salvas. A API de perfil será implementada em breve.</Text>}
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
  pending: { color: '#777', fontSize: 11, marginTop: 20 },
  nav: { position: 'absolute', left: 0, right: 0, bottom: 0 }
});
