import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Field, Phone, PrimaryButton, TopBar } from '@/components/AidanUI';

export default function BuyForOthersScreen() {
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  return (
    <Phone bordered scroll contentStyle={styles.phone}>
      <TopBar title="Comprar para outros" />
      <View style={styles.content}>
        <Text style={styles.label}>Complete seu perfil</Text>
        <View style={styles.fields}>
          <Field value="Dara Vitória da Silva" />
          <Field value="(49) 0000-0000" />
          <View style={styles.row}><Field value="24/02/1998" small /><Field value="Feminino" small /></View>
          <Field value="dara98dasilva@gmail.com" />
          <Field placeholder="Endereço de moradia" />
          <Field placeholder="Documento CPF ou CNH" />
        </View>
        <Text style={styles.label2}>Dados bancários</Text>
        <View style={styles.fields}>
          <Field placeholder="Banco Inter" />
          <View style={styles.row}><Field placeholder="Agência" small /><Field placeholder="Conta Corrente" small /></View>
        </View>
        <Card style={styles.docCard}>
          <Ionicons name="camera-outline" size={30} color="#4F62FF" />
          <View><Text style={styles.docTitle}>Foto do documento</Text><Text style={styles.docDesc}>Envie uma foto</Text></View>
        </Card>
        <Pressable onPress={() => setAcceptedTerms(!acceptedTerms)} style={styles.terms}><Ionicons name={acceptedTerms ? 'checkbox' : 'square-outline'} size={18} color={acceptedTerms ? '#5865F2' : '#555'} /><Text style={styles.termsText}>Concordo com os <Text style={styles.termsLink}>termos de uso</Text></Text></Pressable>
        <PrimaryButton label="Finalizar" href="/earn-dashboard" style={styles.button} />
      </View>
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 95 },
  label: { color: '#333333', fontSize: 16, marginBottom: 13 },
  label2: { color: '#333333', fontSize: 15, marginTop: 13, marginBottom: 9 },
  fields: { gap: 11 },
  row: { flexDirection: 'row', gap: 13 },
  docCard: { height: 54, flexDirection: 'row', alignItems: 'center', gap: 18, paddingHorizontal: 14, marginTop: 8 },
  docTitle: { color: '#555555', fontSize: 13, fontWeight: '800' },
  docDesc: { color: '#777777', fontSize: 12 },
  terms: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 9 },
  termsText: { color: '#555555', fontSize: 13 },
  termsLink: { color: '#4B5CFF' },
  button: { backgroundColor: '#5865F2', height: 61 },
  nav: { position: 'absolute', left: 0, right: 0, bottom: 0 }
});
