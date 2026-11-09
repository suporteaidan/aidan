import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AidanLogo, BluePhone, Card, PrimaryButton } from '@/components/AidanUI';

export default function VerifyCodeScreen() {
  const [code, setCode] = useState(['1', '2', '3', '4', '5']);

  const updateCode = (value: string, index: number) => {
    const next = [...code];
    next[index] = value.replace(/[^0-9]/g, '').slice(-1);
    setCode(next);
  };

  return (
    <BluePhone>
      <View style={styles.logo}><AidanLogo size={112} /></View>
      <Text style={styles.title}>VERIFIQUE SEU CÓDIGO</Text>
      <Card style={styles.card}>
        <Ionicons name="shield-checkmark-outline" size={42} color="#111111" />
        <Text style={styles.cardText}>Enviamos um código de 5{`\n`}dígitos para o seu email:{`\n`}dara98dasilva@gmail.com</Text>
        <View style={styles.codeRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              value={digit}
              onChangeText={(value) => updateCode(value, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              style={styles.codeBox}
            />
          ))}
        </View>
      </Card>
      <Text style={styles.resend}>Reenviar Código</Text>
      <Text style={styles.help}>Não recebeu? Verifique sua caixa de Spam, o sinal de seu telefone ou clique para reenviar.</Text>
      <PrimaryButton label="Continuar" href="/location" />
    </BluePhone>
  );
}

const styles = StyleSheet.create({
  logo: { alignItems: 'center', marginTop: 0, marginBottom: 36 },
  title: { color: '#FFFFFF', fontSize: 18, fontWeight: '900', textAlign: 'center', marginBottom: 25 },
  card: { minHeight: 216, borderColor: '#FFFFFF', alignItems: 'center', paddingTop: 24, paddingHorizontal: 16, marginBottom: 17 },
  cardText: { color: '#2E2E2E', fontSize: 15, lineHeight: 21, textAlign: 'center', marginTop: 14, marginBottom: 24, fontWeight: '500' },
  codeRow: { flexDirection: 'row', gap: 12 },
  codeBox: {
    width: 38,
    height: 38,
    borderRadius: 7,
    backgroundColor: '#EFEFEF',
    color: '#333333',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 2,
    outlineStyle: 'none'
  } as any,
  resend: { color: '#FFFFFF', fontSize: 10, fontWeight: '900', textAlign: 'center', marginBottom: 21 },
  help: { color: '#FFFFFF', fontSize: 11, lineHeight: 15, fontWeight: '600', marginBottom: 12 }
});
