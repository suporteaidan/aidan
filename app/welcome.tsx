import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { FloatingShapes, Phone } from '@/components/AidanUI';

const shopCart = require('../assets/shop-cart.png');

export default function WelcomeScreen() {
  const cartTranslateX = useRef(new Animated.Value(-280)).current;
  const cartOpacity = useRef(new Animated.Value(0)).current;
  const cartScale = useRef(new Animated.Value(0.94)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(260),
      Animated.parallel([
        Animated.timing(cartOpacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true
        }),
        Animated.spring(cartTranslateX, {
          toValue: 0,
          friction: 7,
          tension: 54,
          useNativeDriver: true
        }),
        Animated.spring(cartScale, {
          toValue: 1,
          friction: 6,
          tension: 48,
          useNativeDriver: true
        })
      ])
    ]).start();
  }, [cartTranslateX, cartOpacity, cartScale]);

  return (
    <Phone backgroundColor="#45CFC5" bordered={false} contentStyle={styles.phone}>
      <Pressable style={styles.tapArea} onPress={() => router.replace('/home')}>
        <FloatingShapes />
        <Text style={styles.title}>BEM-VINDO AO{`\n`}AIDAN</Text>
        <Text style={styles.subtitle}>Economizar com inteligência{`\n`}começa agora</Text>

        <Animated.View
          style={[
            styles.cartAnimation,
            {
              opacity: cartOpacity,
              transform: [{ translateX: cartTranslateX }, { scale: cartScale }]
            }
          ]}
        >
          <Image source={shopCart} style={styles.cartImage} resizeMode="contain" />
        </Animated.View>

        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dotActive} />
        </View>
      </Pressable>
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: { backgroundColor: '#48CFC5' },
  tapArea: { flex: 1, paddingHorizontal: 38, paddingTop: 70, backgroundColor: '#48CFC5' },
  title: { color: '#FFFFFF', textAlign: 'center', fontSize: 24, lineHeight: 39, fontWeight: '900', marginBottom: 40 },
  subtitle: { color: '#FFFFFF', textAlign: 'center', fontSize: 16, lineHeight: 23, fontWeight: '600' },
  cartAnimation: { width: 250, height: 200, alignSelf: 'center', marginTop: 78, alignItems: 'center', justifyContent: 'center' },
  cartImage: { width: 236, height: 188 },
  dots: { flexDirection: 'row', gap: 12, justifyContent: 'center', marginTop: 85 },
  dot: { width: 11, height: 11, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.30)' },
  dotActive: { width: 11, height: 11, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.50)' }
});
