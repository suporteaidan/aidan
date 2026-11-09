import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card, Phone, PrimaryButton } from '@/components/AidanUI';

export default function EconomyChoiceScreen() {
  const [isDefault, setIsDefault] = useState(false);

  return (
    <Phone bordered contentStyle={styles.phone}>
      <View style={styles.top}><Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={28} color="#111" /></Pressable></View>
      <View style={styles.content}>
        <Card onPress={() => router.push('/cart-time')} style={[styles.choice, styles.timeChoice]}>
          <Ionicons name="time-outline" size={38} color="#7CA7FF" />
          <View style={styles.choiceText}><Text style={styles.choiceTitle}>Economize{`\n`}TEMPO</Text><Text style={styles.choiceDesc}>O menor preço no menor tempo!{`\n`}Nessa opção o AIDAN te mostra o mercado com o melhor preço.</Text><Text style={styles.choiceFooter}>Simples, Ágil e Inteligente!</Text></View>
        </Card>
        <Text style={styles.or}>OU</Text>
        <Card onPress={() => router.push('/cart-money')} style={[styles.choice, styles.moneyChoice]}>
          <Ionicons name="cash-outline" size={38} color="#4AD6A6" />
          <View style={styles.choiceText}><Text style={styles.choiceTitle}>Economize{`\n`}DINHEIRO</Text><Text style={styles.choiceDesc}>Descubra os melhores preços perto de você!{`\n`}O AIDAN te ajuda a comparar produtos e preços de cada mercado.</Text><Text style={styles.choiceFooter}>Dinâmico, Inteligente e Eficiente!</Text></View>
        </Card>
        <Pressable onPress={() => setIsDefault(!isDefault)} style={styles.checkboxRow}><Ionicons name={isDefault ? 'checkbox' : 'square-outline'} size={22} color={isDefault ? '#5865F2' : '#444'} /><Text style={styles.defaultText}>Tornar sua escolha padrão?</Text></Pressable>
        <PrimaryButton label="finalizar" href="/cart-money" style={styles.button} />
      </View>
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  top: { paddingTop: 27, paddingHorizontal: 28, height: 83 },
  content: { paddingHorizontal: 28 },
  choice: { minHeight: 160, borderWidth: 3, borderRadius: 8, flexDirection: 'row', padding: 10, alignItems: 'center' },
  timeChoice: { borderColor: '#CFE0FF' },
  moneyChoice: { borderColor: '#CEF5E6' },
  choiceText: { flex: 1, alignItems: 'center' },
  choiceTitle: { color: '#24324B', fontSize: 20, fontWeight: '900', textAlign: 'center', lineHeight: 23 },
  choiceDesc: { color: '#555555', fontSize: 11.5, lineHeight: 15, textAlign: 'center', marginTop: 7 },
  choiceFooter: { color: '#333333', fontSize: 11, fontWeight: '700', marginTop: 6 },
  or: { color: '#333333', fontSize: 15, fontWeight: '900', textAlign: 'center', marginVertical: 31 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginTop: 63, marginLeft: 2, gap: 10 },
  defaultText: { color: '#333333', fontSize: 13 },
  button: { backgroundColor: '#5865F2', marginTop: 39 },
  nav: { position: 'absolute', left: 0, right: 0, bottom: 0 }
});
