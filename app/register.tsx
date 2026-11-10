import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { AidanLogo, BluePhone, PrimaryButton } from '@/components/AidanUI';
import { useAuth } from '@/auth/AuthProvider';
import { env } from '@/config/env';

const digits = (s: string) => s.replace(/\D/g, '');

/** Brazilian CPF checksum verification; this is client-side UX only. */
function validCpf(value: string): boolean {
  const n = digits(value);
  if (!/^\d{11}$/.test(n) || /^(\d)\1{10}$/.test(n)) return false;
  for (const length of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < length; i++) sum += Number(n[i]) * (length + 1 - i);
    const check = (sum * 10) % 11;
    if (Number(n[length]) !== (check === 10 ? 0 : check)) return false;
  }
  return true;
}

export default function RegisterScreen() {
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    if (busy) return;
    if (env.useMocks) { router.push('/verify-code'); return; }
    setError('');
    if (!fullName.trim() || !validCpf(cpf) || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Preencha nome, CPF válido e email válido.'); return;
    }
    if (password.length < 8 || password !== confirmPassword) {
      setError('A senha deve ter ao menos 8 caracteres e coincidir com a confirmação.'); return;
    }
    setBusy(true);
    try {
      await register({ name: fullName.trim(), cpf: digits(cpf), email: email.trim().toLowerCase(), password, phone: digits(phone) || undefined });
      // The backend does not provide email verification or tokens on registration.
      router.replace({ pathname: '/login', params: { registered: '1' } });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao cadastrar.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <BluePhone scroll>
      <View style={styles.logo}><AidanLogo size={118} /></View>
      <Text style={styles.title}>CADASTRE-SE</Text>
      <View style={styles.form}>
        <TextInput value={fullName} onChangeText={setFullName} placeholder="Nome completo" placeholderTextColor="#C4C4C4" style={styles.input} editable={!busy} />
        {env.useMocks ? (
          <TextInput value={username} onChangeText={setUsername} placeholder="Nome de usuário (demonstração)" placeholderTextColor="#C4C4C4" style={styles.input} editable={!busy} />
        ) : (
          <TextInput value={cpf} onChangeText={setCpf} placeholder="CPF" keyboardType="number-pad" maxLength={14} placeholderTextColor="#C4C4C4" style={styles.input} editable={!busy} />
        )}
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" autoComplete="email" placeholderTextColor="#C4C4C4" style={styles.input} editable={!busy} />
        <TextInput value={phone} onChangeText={setPhone} placeholder="Celular (opcional)" keyboardType="phone-pad" placeholderTextColor="#C4C4C4" style={styles.input} editable={!busy} />
        <TextInput value={password} onChangeText={setPassword} placeholder="Senha" secureTextEntry autoComplete="new-password" placeholderTextColor="#C4C4C4" style={styles.input} editable={!busy} />
        <TextInput value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirmar senha" secureTextEntry placeholderTextColor="#C4C4C4" style={styles.input} editable={!busy} />
      </View>
      <Text style={styles.terms}>Ao continuar, você concorda com os Termos de Uso e a Política de Privacidade.</Text>
      {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
      {busy && <ActivityIndicator color="#FFFFFF" style={styles.spinner} />}
      <PrimaryButton label={busy ? 'Cadastrando...' : 'Continuar'} onPress={() => { void handleContinue(); }} disabled={busy} />
    </BluePhone>
  );
}

const styles = StyleSheet.create({
  logo: { alignItems: 'center', marginTop: 5, marginBottom: 35 },
  title: { color: '#FFFFFF', fontSize: 23, fontWeight: '900', textAlign: 'center', marginBottom: 36 },
  form: { gap: 11, marginBottom: 22 },
  input: { height: 42, borderRadius: 5, backgroundColor: '#F3F3F3', borderColor: '#D9D9D9', borderWidth: 1, color: '#333333', fontSize: 15, paddingHorizontal: 18, elevation: 1 },
  terms: { color: '#FFFFFF', fontSize: 10, lineHeight: 14, marginBottom: 12 },
  error: { color: '#FFF4C3', textAlign: 'center', marginBottom: 12, fontSize: 12 },
  spinner: { marginBottom: 9 },
});
