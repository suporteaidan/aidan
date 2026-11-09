import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const logo = require('../assets/aidan-logo.png');

export default function SplashScreen() {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.55)).current;
  const logoRotate = useRef(new Animated.Value(-10)).current;
  const wordOpacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 520,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 58,
          useNativeDriver: true
        }),
        Animated.timing(logoRotate, {
          toValue: 0,
          duration: 680,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        })
      ]),
      Animated.parallel([
        Animated.timing(wordOpacity, {
          toValue: 1,
          duration: 420,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(progress, {
          toValue: 1,
          duration: 760,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false
        })
      ])
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/login');
    }, 1850);

    return () => clearTimeout(timer);
  }, [logoOpacity, logoScale, logoRotate, wordOpacity, progress]);

  const rotate = logoRotate.interpolate({
    inputRange: [-10, 0],
    outputRange: ['-10deg', '0deg']
  });

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <View style={styles.page}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.logoWrap,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }, { rotate }]
            }
          ]}
        >
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </Animated.View>

        <Animated.Text style={[styles.word, { opacity: wordOpacity }]}>AIDAN</Animated.Text>

        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Platform.OS === 'web' ? '#F5F5F5' : '#5865F2'
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 347 : undefined,
    minHeight: 739,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5865F2',
    borderRadius: Platform.OS === 'web' ? 22 : 0,
    paddingHorizontal: 38
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 190,
    height: 156
  },
  word: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 8,
    marginTop: 6,
    marginLeft: 8
  },
  progressTrack: {
    width: 150,
    height: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginTop: 30
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#7FEFBF'
  }
});
