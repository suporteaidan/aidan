import { Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const logo = require('../assets/aidan-logo.png');
const googleIcon = require('../assets/google-g.png');

export default function LoginScreen() {
  const goToGoogleFlow = () => router.push('/google-account');
  const goToDemo = () => router.replace('/home');

  return (
    <View style={styles.page}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />

          <Text style={styles.title}>FAÇA LOGIN OU CRIE UMA CONTA</Text>

          <Pressable style={styles.googleButton} onPress={goToGoogleFlow}>
            <Image source={googleIcon} style={styles.googleIcon} resizeMode="contain" />
            <Text style={styles.googleText}>Continuar com o Google</Text>
          </Pressable>

          <Text style={styles.divider}>ou</Text>

          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#BDBDBD" keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#BDBDBD" secureTextEntry />

          <Pressable style={styles.forgotButton} onPress={() => router.push('/register')}>
            <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
          </Pressable>

          <Pressable style={styles.loginButton} onPress={goToDemo}>
            <Text style={styles.loginText}>Entrar</Text>
          </Pressable>

          <Pressable style={styles.signupButton} onPress={() => router.push('/register')}>
            <Text style={styles.signupText}>Ainda não possui uma conta? Cadastre-se</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Platform.OS === 'web' ? '#F5F5F5' : '#5865F2'
  },
  keyboard: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 347 : undefined,
    minHeight: 739,
    alignItems: 'center',
    backgroundColor: '#5865F2',
    borderRadius: Platform.OS === 'web' ? 22 : 0,
    paddingHorizontal: 38,
    paddingTop: 55
  },
  logo: {
    width: 184,
    height: 151,
    marginBottom: 50
  },
  title: {
    width: '100%',
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    letterSpacing: 0.2,
    textAlign: 'center',
    marginBottom: 23
  },
  googleButton: {
    width: '100%',
    height: 42,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2
  },
  googleIcon: {
    width: 29,
    height: 24,
    position: 'absolute',
    left: 18
  },
  googleText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '400'
  },
  divider: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    marginTop: 10,
    marginBottom: 13,
    textTransform: 'uppercase'
  },
  input: {
    width: '100%',
    height: 42,
    borderRadius: 5,
    backgroundColor: '#F3F3F3',
    color: '#333333',
    fontSize: 15,
    marginBottom: 16,
    paddingHorizontal: 25,
    outlineStyle: 'none'
  } as any,
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -7,
    marginBottom: 15
  },
  forgotText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700'
  },
  loginButton: {
    width: '100%',
    height: 46,
    backgroundColor: '#3100F5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 3,
    elevation: 3
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500'
  },
  signupButton: {
    marginTop: 17
  },
  signupText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center'
  }
});
