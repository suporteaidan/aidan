import { StyleSheet, Text, View } from 'react-native';
import { BluePhone, PrimaryButton } from '@/components/AidanUI';

export default function ForgotPasswordScreen() {
  return (
    <BluePhone>
      <View style={styles.content}>
        <Text style={styles.title}>Recuperar senha</Text>
        <Text style={styles.body}>A recuperação de senha ainda não está disponível no backend Aidan. Por segurança, não enviaremos um código fictício nem alteraremos sua senha.</Text>
        <PrimaryButton label="Voltar ao login" href="/login" />
      </View>
    </BluePhone>
  );
}
const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', gap: 25 },
  title: { color: '#FFFFFF', fontWeight: '900', fontSize: 22, textAlign: 'center' },
  body: { color: '#FFFFFF', fontSize: 14, lineHeight: 22, textAlign: 'center' },
});
