import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FloatingShapes, Phone } from '@/components/AidanUI';

export default function SavingSplashScreen() {
  return (
    <Phone backgroundColor="#48CFC5" bordered={false} contentStyle={styles.phone}>
      <Pressable style={styles.tapArea} onPress={() => router.push('/economy-choice')}>
        <FloatingShapes />
        <Text style={styles.title}>Economizar com inteligência</Text>
        <Text style={styles.subtitle}>começa agora</Text>
        <View style={styles.cartArt}>
          <Ionicons name="cart" size={170} color="rgba(255,255,255,0.28)" />
          <Ionicons name="cash" size={62} color="rgba(255,255,255,0.25)" style={styles.cash} />
        </View>
        <View style={styles.dots}><View style={styles.dot}/><View style={styles.dot}/><View style={styles.dotActive}/></View>
      </Pressable>
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#48CFC5' },
  tapArea: { flex: 1, paddingHorizontal: 38, paddingTop: 135, backgroundColor: '#48CFC5' },
  title: { color: '#FFFFFF', textAlign: 'center', fontSize: 18, fontWeight: '900', marginBottom: 31 },
  subtitle: { color: '#FFFFFF', textAlign: 'center', fontSize: 18, lineHeight: 23, fontWeight: '400' },
  cartArt: { alignItems: 'center', justifyContent: 'center', marginTop: 128 },
  cash: { position: 'absolute', top: 49 },
  dots: { flexDirection: 'row', gap: 12, justifyContent: 'center', marginTop: 129 },
  dot: { width: 11, height: 11, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.30)' },
  dotActive: { width: 11, height: 11, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.50)' }
});
