import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { AidanLogo, BluePhone, PrimaryButton } from '@/components/AidanUI';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <BluePhone>
      <View style={styles.logo}><AidanLogo size={118} /></View>
      <Text style={styles.title}>CADASTRE-SE</Text>
      <View style={styles.form}>
        <TextInput value={fullName} onChangeText={setFullName} placeholder="Nome Completo" placeholderTextColor="#C4C4C4" style={styles.input} />
        <TextInput value={username} onChangeText={setUsername} placeholder="Nome de Usuário" placeholderTextColor="#C4C4C4" autoCapitalize="none" style={styles.input} />
        <TextInput value={contact} onChangeText={setContact} placeholder="Número do celular ou email" placeholderTextColor="#C4C4C4" keyboardType="email-address" autoCapitalize="none" style={styles.input} />
        <TextInput value={password} onChangeText={setPassword} placeholder="Senha" placeholderTextColor="#C4C4C4" secureTextEntry style={styles.input} />
        <TextInput value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirmar Senha" placeholderTextColor="#C4C4C4" secureTextEntry style={styles.input} />
      </View>
      <Text style={styles.terms}>Ao continuar, você concorda com os <Text style={styles.link}>Termos de Uso</Text> e está ciente da <Text style={styles.link}>Declaração de Privacidade</Text></Text>
      <PrimaryButton label="Continuar" href="/verify-code" />
    </BluePhone>
  );
}

const styles = StyleSheet.create({
  logo: { alignItems: 'center', marginTop: 5, marginBottom: 35 },
  title: { color: '#FFFFFF', fontSize: 23, fontWeight: '900', textAlign: 'center', marginBottom: 50 },
  form: { gap: 11, marginBottom: 31 },
  input: {
    height: 42,
    borderRadius: 5,
    backgroundColor: '#F3F3F3',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    color: '#333333',
    fontSize: 15,
    paddingHorizontal: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
    outlineStyle: 'none'
  } as any,
  terms: { color: '#FFFFFF', fontSize: 9.5, lineHeight: 12.5, fontWeight: '600', marginBottom: 9 },
  link: { textDecorationLine: 'underline', fontWeight: '900' }
});
