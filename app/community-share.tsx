import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomArea, Card, Field, Phone, PrimaryButton, TopBar } from '@/components/AidanUI';

export default function CommunityShareScreen() {
  const [opinion, setOpinion] = useState('');

  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Comunidade" />
      <View style={styles.content}>
        <Text style={styles.prompt}>Ajude outros usuários com{`\n`}a sua opinião</Text>
        <Text style={styles.question}>Conta pra gente: vale a pena?</Text>
        <View style={styles.row}><Field placeholder="Marca" small /><Field placeholder="Nome do Produto" small /></View>
        <Card style={styles.textArea}>
          <TextInput value={opinion} onChangeText={setOpinion} placeholder="Sua Opinião" placeholderTextColor="#C4C4C4" multiline textAlignVertical="top" style={styles.textAreaInput} />
        </Card>
        <Text style={styles.rate}>Dê uma nota</Text>
        <Text style={styles.stars}>☆☆☆☆☆</Text>
        <Card style={styles.photo}><Ionicons name="camera-outline" size={30} color="#4F62FF" /><View><Text style={styles.photoTitle}>Foto do produto</Text><Text style={styles.photoDesc}>Envie uma foto</Text></View></Card>
        <PrimaryButton label="Compartilhar" href="/community" style={styles.button} />
      </View>
      <BottomArea active="home" />
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 112 },
  prompt: { color: '#5865F2', fontSize: 16, lineHeight: 21, fontWeight: '900', marginLeft: 80, marginBottom: 26 },
  question: { color: '#5865F2', fontSize: 15, fontWeight: '900', marginBottom: 18 },
  row: { flexDirection: 'row', gap: 14, marginBottom: 11 },
  textArea: { height: 148, padding: 13, marginBottom: 16 },
  placeholder: { color: '#C4C4C4', fontSize: 15 },
  textAreaInput: { flex: 1, color: '#333333', fontSize: 15, padding: 0, outlineStyle: 'none' } as any,
  rate: { color: '#333333', fontSize: 14, marginBottom: 4 },
  stars: { color: '#B87500', fontSize: 27, textAlign: 'center', marginBottom: 13 },
  photo: { height: 53, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 20, marginBottom: 21 },
  photoTitle: { color: '#555555', fontSize: 13, fontWeight: '800' },
  photoDesc: { color: '#777777', fontSize: 12 },
  button: { backgroundColor: '#5865F2' }
});
