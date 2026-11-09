import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const googleIcon = require('../assets/google-g.png');
const daraProfile = require('../assets/dara-profile.png');

export default function GoogleAccountScreen() {
  const goToDemo = () => router.replace('/register');
  const goBack = () => router.back();

  return (
    <View style={styles.page}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.headerArea}>
          <View style={styles.topLine} />

          <Pressable style={styles.googleRow} onPress={goBack}>
            <Image source={googleIcon} style={styles.googleIcon} resizeMode="contain" />
            <Text style={styles.googleRowText}>Fazer Login com o Google</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Escolha uma conta</Text>

          <View style={styles.subtitleRow}>
            <Text style={styles.subtitleText}>para prosseguir para </Text>
            <Text style={styles.brandText}>Aidan</Text>
          </View>

          <Pressable style={styles.accountButton} onPress={goToDemo}>
            <Image source={daraProfile} style={styles.avatar} resizeMode="cover" />
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>Dara Vitória</Text>
              <Text style={styles.accountEmail}>dara98dasilva@gmail.com</Text>
            </View>
          </Pressable>

          <Pressable style={styles.otherAccountButton} onPress={goToDemo}>
            <Ionicons name="person-circle-outline" size={22} color="#5F6368" />
            <Text style={styles.otherAccountText}>Usar outra conta</Text>
          </Pressable>

          <View style={styles.separator} />

          <Text style={styles.privacyText}>
            Consulte a <Text style={styles.linkText}>Política de Privacidade</Text> e os <Text style={styles.linkText}>Termos de Serviço</Text> do app Figma antes de usá-lo.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.languageText}>Português (Brasil)</Text>
          <Ionicons name="caret-down" size={12} color="#3C4043" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5'
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 347,
    minHeight: 739,
    backgroundColor: '#FFFFFF',
    borderRadius: Platform.OS === 'web' ? 22 : 0,
    overflow: 'hidden'
  },
  headerArea: {
    paddingTop: 45,
    backgroundColor: '#FFFFFF'
  },
  topLine: {
    height: 1,
    backgroundColor: '#DADCE0',
    marginHorizontal: 19,
    marginBottom: 4
  },
  googleRow: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 19,
    borderBottomWidth: 1,
    borderBottomColor: '#DADCE0'
  },
  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 12
  },
  googleRowText: {
    color: '#3C4043',
    fontSize: 14,
    fontWeight: '500'
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 35
  },
  title: {
    color: '#202124',
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '400',
    marginBottom: 14
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 28
  },
  subtitleText: {
    color: '#3C4043',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400'
  },
  brandText: {
    color: '#5E6BFF',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700'
  },
  accountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12
  },
  accountInfo: {
    flex: 1
  },
  accountName: {
    color: '#202124',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500'
  },
  accountEmail: {
    color: '#5F6368',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400'
  },
  otherAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 6
  },
  otherAccountText: {
    color: '#202124',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    marginLeft: 12
  },
  separator: {
    height: 1,
    backgroundColor: '#DADCE0',
    marginTop: 2,
    marginBottom: 35
  },
  privacyText: {
    color: '#5F6368',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400'
  },
  linkText: {
    color: '#1967D2',
    fontWeight: '500'
  },
  footer: {
    position: 'absolute',
    left: 25,
    right: 25,
    bottom: 91,
    flexDirection: 'row',
    alignItems: 'center'
  },
  languageText: {
    color: '#3C4043',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    marginRight: 50
  }
});
