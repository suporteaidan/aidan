import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BottomArea, IconLine, Phone, TopBar } from '@/components/AidanUI';

export default function SettingsScreen() {
  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Configurações" />
      <View style={styles.content}>
        <IconLine icon="notifications" text="Notificações" />
        <IconLine icon="lock-closed" text="Privacidade" />
        <IconLine icon="help-circle-outline" text="Central de Ajuda" />
        <IconLine icon="information-circle-outline" text="Termos de Uso" />
        <IconLine icon="shield-checkmark-outline" text="Política de Privacidade" />
        <IconLine icon="information-circle-outline" text="Sobre o app" />
        <Pressable onPress={() => router.back()} style={styles.deleteRow}><Ionicons name="close" size={31} color="#333" /><Text style={styles.deleteText}>Excluir conta</Text></Pressable>
      </View>
      <BottomArea active="home" />
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 32, paddingTop: 38 },
  deleteRow: { flexDirection: 'row', alignItems: 'center', minHeight: 52 },
  deleteText: { color: '#3E3E3E', fontSize: 15, marginLeft: 13 }
});
