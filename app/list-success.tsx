import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Phone, PrimaryButton } from '@/components/AidanUI';

export default function ListSuccessScreen() {
  return (
    <Phone bordered contentStyle={styles.phone}>
      <View style={styles.content}>
        <View style={styles.personArt}><Ionicons name="person" size={118} color="#4A78F7" /><View style={styles.bagLeft}/><View style={styles.bagRight}/></View>
        <Text style={styles.title}>Pronto.{`\n`}Lista concluída!</Text>
        <Card style={styles.infoCard}>
          <Text style={styles.big}>Compra Mista</Text>
          <Text style={styles.copy}>Você economizou{`\n`}nessa compra:</Text>
          <Text style={styles.percent}>44%</Text>
          <Text style={styles.copy}>Produtos comparados:</Text>
          <Text style={styles.number}>7</Text>
        </Card>
        <PrimaryButton label="Voltar para a tela inicial" href="/home" style={styles.button} />
      </View>
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#DDF4FF' },
  content: { paddingHorizontal: 22, paddingTop: 54, alignItems: 'center' },
  personArt: { height: 188, width: 230, alignItems: 'center', justifyContent: 'center' },
  bagLeft: { position: 'absolute', left: 42, bottom: 36, width: 34, height: 47, backgroundColor: '#F6E2B8', borderRadius: 4 },
  bagRight: { position: 'absolute', right: 30, bottom: 31, width: 43, height: 56, backgroundColor: '#7BA8F4', borderRadius: 4 },
  title: { color: '#3A3A3A', fontSize: 22, lineHeight: 30, fontWeight: '900', marginBottom: 25, alignSelf: 'flex-start', marginLeft: 32 },
  infoCard: { width: 270, minHeight: 250, backgroundColor: '#EAF7FF', borderColor: '#CFEFFF', paddingHorizontal: 40, paddingVertical: 24, marginBottom: 45 },
  big: { color: '#3A3A3A', fontSize: 29, fontWeight: '900', marginBottom: 19 },
  copy: { color: '#3A3A3A', fontSize: 19, lineHeight: 22, fontWeight: '700' },
  percent: { color: '#4A78F7', fontSize: 48, fontWeight: '900', marginVertical: 2 },
  number: { color: '#3A3A3A', fontSize: 29, fontWeight: '900' },
  button: { width: '100%', backgroundColor: '#5865F2' }
});
