import { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/auth/AuthProvider';
import { env } from '@/config/env';

const logo = require('../assets/aidan-logo.png');
const googleIcon = require('../assets/google-g.png');

export default function LoginScreen() {
  const { registered } = useLocalSearchParams<{ registered?: string }>();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleGoogle = () => {
    if (env.useMocks) { router.push('/google-account'); return; }
    Alert.alert('Em desenvolvimento', 'Login com Google só será ativado quando o backend oferecer verificação OAuth/OIDC. Use email e senha por enquanto.');
  };

  const handleLogin = async () => {
    if (busy) return;
    setError('');
    if (env.useMocks) { router.replace('/home'); return; }
    if (!/^\S+@\S+\.\S+$/.test(email.trim()) || !password) {
      setError('Digite um email válido e sua senha.');
      return;
    }
    setBusy(true);
    try {
      await login({ email: email.trim(), password });
      router.replace('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.page}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>FAÇA LOGIN OU CRIE UMA CONTA</Text>
          {registered === '1' && !env.useMocks && <Text style={styles.notice}>Cadastro concluído. Entre com seu email e senha.</Text>}
          <Pressable accessibilityRole="button" style={styles.googleButton} onPress={handleGoogle}>
            <Image source={googleIcon} style={styles.googleIcon} resizeMode="contain" />
            <Text style={styles.googleText}>Continuar com o Google</Text>
          </Pressable>
          <Text style={styles.divider}>ou</Text>
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#BDBDBD" keyboardType="email-address" autoCapitalize="none" autoComplete="email" value={email} onChangeText={setEmail} editable={!busy} />
          <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#BDBDBD" secureTextEntry autoComplete="current-password" value={password} onChangeText={setPassword} editable={!busy} onSubmitEditing={() => { void handleLogin(); }} />
          <Pressable style={styles.forgotButton} onPress={() => router.push('/forgot-password')}>
            <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
          </Pressable>
          {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
          <Pressable accessibilityRole="button" disabled={busy} style={[styles.loginButton, busy && styles.disabled]} onPress={() => { void handleLogin(); }}>
            {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.loginText}>Entrar</Text>}
          </Pressable>
          <Pressable style={styles.signupButton} onPress={() => router.push('/register')}>
            <Text style={styles.signupText}>Ainda não possui uma conta? Cadastre-se</Text>
          </Pressable>
          {env.useMocks && <Text style={styles.demo}>Modo demonstração (sem autenticação real)</Text>}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, alignItems: 'center', backgroundColor: Platform.OS === 'web' ? '#F5F5F5' : '#5865F2' },
  keyboard: { flex: 1, width: '100%', alignItems: 'center' },
  scroll: { flex: 1, width: '100%', maxWidth: Platform.OS === 'web' ? 347 : undefined, backgroundColor: '#5865F2' },
  container: { flexGrow: 1, minHeight: 730, alignItems: 'center', backgroundColor: '#5865F2', borderRadius: Platform.OS === 'web' ? 22 : 0, paddingHorizontal: 38, paddingTop: 55, paddingBottom: 35 },
  logo: { width: 184, height: 151, marginBottom: 50 },
  title: { width: '100%', color: '#FFFFFF', fontSize: 14, lineHeight: 18, fontWeight: '500', letterSpacing: 0.2, textAlign: 'center', marginBottom: 23 },
  googleButton: { width: '100%', height: 42, borderRadius: 5, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', elevation: 2 },
  googleIcon: { width: 29, height: 24, position: 'absolute', left: 18 },
  googleText: { color: '#333333', fontSize: 15 },
  divider: { color: '#FFFFFF', fontSize: 12, fontWeight: '700', lineHeight: 16, marginTop: 10, marginBottom: 13, textTransform: 'uppercase' },
  input: { width: '100%', height: 42, borderRadius: 5, backgroundColor: '#F3F3F3', color: '#333333', fontSize: 15, marginBottom: 16, paddingHorizontal: 18 },
  forgotButton: { alignSelf: 'flex-end', marginTop: -7, marginBottom: 15 },
  forgotText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  loginButton: { width: '100%', height: 46, backgroundColor: '#3100F5', alignItems: 'center', justifyContent: 'center', elevation: 3 },
  loginText: { color: '#FFFFFF', fontSize: 18, fontWeight: '500' },
  signupButton: { marginTop: 17 },
  signupText: { color: '#FFFFFF', fontSize: 13, textAlign: 'center' },
  error: { color: '#FFF4C3', marginBottom: 11, fontSize: 12, textAlign: 'center' },
  notice: { color: '#DDFCE5', fontSize: 11, marginBottom: 10, textAlign: 'center' },
  demo: { color: '#DFE3FF', textAlign: 'center', fontSize: 10, marginTop: 22 },
  disabled: { opacity: 0.7 },
});
