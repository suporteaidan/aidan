import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Phone, TopBar } from '@/components/AidanUI';
import { nfeApi } from '@/api/services/nfe';
import type { NfeImportResponse } from '@/api/contracts';
import { env } from '@/config/env';

export default function ImportReceiptScreen() {
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<NfeImportResponse | null>(null);

  const submit = async () => {
    setError('');
    setSuccess(null);
    if (env.useMocks) {
      setError('Modo demonstração: desligue EXPO_PUBLIC_USE_MOCKS para importar um cupom real.');
      return;
    }
    try {
      const parsed = new URL(url.trim());
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') throw Error();
    } catch {
      setError('Insira uma URL válida de QR Code NFC-e.');
      return;
    }
    setBusy(true);
    try {
      const result = await nfeApi.importFromQrCodeUrl({ qr_code_url: url.trim() });
      setSuccess(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao importar cupom fiscal.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Phone bordered contentStyle={styles.phone}>
      <TopBar title="Escanear cupons" backHref="/home" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Ionicons name="barcode-outline" size={72} color="#5865F2" />
        <Text style={styles.title}>Importar cupom fiscal NFC-e</Text>
        <Text style={styles.help}>Cole o link público do QR Code do seu cupom. A leitura direta da câmera será adicionada em uma próxima etapa.</Text>
        <TextInput value={url} onChangeText={setUrl} multiline autoCapitalize="none" autoCorrect={false} keyboardType="url" placeholder="https://..." placeholderTextColor="#AAA" style={styles.input} editable={!busy} />
        <Pressable onPress={() => { void submit(); }} disabled={busy} style={[styles.button, busy && styles.disabled]}>
          {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Importar cupom</Text>}
        </Pressable>
        {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
        {success && (
          <View style={styles.result}>
            <Ionicons name="checkmark-circle" color="#16A34A" size={30}/>
            <Text style={styles.resultTitle}>Cupom importado com sucesso</Text>
            <Text>ID: {success.id}</Text>
            <Text>Chave NFC-e: {success.nfe_key}</Text>
            <Text>Mercado ID: {success.market_id}</Text>
            <Text style={styles.help}>O endpoint atual confirma a importação. Exibir os produtos exige uma futura rota de consulta.</Text>
          </View>
        )}
      </ScrollView>
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 22, paddingTop: 30, paddingBottom: 40, alignItems: 'center', gap: 20 },
  title: { color: '#202124', fontSize: 19, fontWeight: '800', textAlign: 'center' },
  help: { color: '#666', fontSize: 13, lineHeight: 19, textAlign: 'center' },
  input: { width: '100%', borderWidth: 1, borderColor: '#C5CCFF', backgroundColor: '#F8F8FF', borderRadius: 8, minHeight: 95, padding: 13, fontSize: 14, color: '#202124', textAlignVertical: 'top' },
  button: { width: '100%', height: 50, borderRadius: 7, backgroundColor: '#5865F2', alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  disabled: { opacity: 0.7 },
  error: { color: '#A52125', textAlign: 'center', fontSize: 12 },
  result: { width: '100%', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#D8EEDA', alignItems: 'center', gap: 8 },
  resultTitle: { fontSize: 16, fontWeight: '700' },
});
