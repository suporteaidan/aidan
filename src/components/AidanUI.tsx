import { useState, type ReactNode } from 'react';
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { Href } from 'expo-router';

const logo = require('../../assets/aidan-logo.png');
const daraProfile = require('../../assets/dara-profile.png');

export const AIDAN_BLUE = '#5865F2';
export const AIDAN_PURPLE = '#3100F5';
export const AIDAN_GREEN = '#7FEFBF';
export const TEXT = '#292A32';
export const MUTED = '#6D7280';
export const LINE = '#E3E5EA';

type IconName = keyof typeof Ionicons.glyphMap;

type PhoneProps = {
  children: ReactNode;
  backgroundColor?: string;
  bordered?: boolean;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Phone({ children, backgroundColor = '#FFFFFF', bordered = true, scroll = false, contentStyle }: PhoneProps) {
  const frame = [styles.phone, bordered && styles.phoneBorder, { backgroundColor }, contentStyle];

  return (
    <View style={styles.page}>
      {scroll ? (
        <ScrollView style={frame} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={frame}>{children}</View>
      )}
    </View>
  );
}

export function BluePhone({ children, scroll = false }: { children: ReactNode; scroll?: boolean }) {
  return (
    <Phone backgroundColor={AIDAN_BLUE} bordered={false} scroll={scroll} contentStyle={styles.bluePhone}>
      {children}
    </Phone>
  );
}

export function AidanLogo({ size = 122, withText = false }: { size?: number; withText?: boolean }) {
  return (
    <View style={styles.logoBox}>
      <Image source={logo} style={{ width: size, height: size * 0.82 }} resizeMode="contain" />
      {withText && <Text style={styles.logoWord}>AIDAN</Text>}
    </View>
  );
}

export function DaraAvatar({ size = 38 }: { size?: number }) {
  return <Image source={daraProfile} style={{ width: size, height: size, borderRadius: size / 2 }} resizeMode="cover" />;
}

export function PrimaryButton({ label, onPress, href, style, disabled = false }: { label: string; onPress?: () => void; href?: Href; style?: StyleProp<ViewStyle>; disabled?: boolean }) {
  return (
    <Pressable disabled={disabled} onPress={onPress ?? (() => href && router.push(href))} style={({ pressed }) => [styles.primaryButton, disabled && styles.disabled, pressed && !disabled && styles.pressed, style]}>
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

export function Field({ placeholder, value, small = false, icon, tint = false }: { placeholder?: string; value?: string; small?: boolean; icon?: IconName; tint?: boolean }) {
  const [inputValue, setInputValue] = useState(value ?? '');

  return (
    <View style={[styles.field, small && styles.fieldSmall, tint && styles.fieldTint]}>
      {icon && <Ionicons name={icon} size={18} color={tint ? '#6B7C85' : '#B8BBC3'} />}
      <TextInput value={inputValue} onChangeText={setInputValue} placeholder={placeholder} placeholderTextColor="#C4C4C4" style={styles.fieldInput} />
    </View>
  );
}

export function TopBar({ title, backHref, rightLabel, onRightPress }: { title: string; backHref?: Href; rightLabel?: string; onRightPress?: () => void }) {
  const handleRightPress = onRightPress ?? (() => rightLabel === 'Sair' ? router.push('/login') : router.back());

  return (
    <View style={styles.topBar}>
      <Pressable onPress={() => backHref ? router.push(backHref) : router.back()} style={styles.backTap}>
        <Ionicons name="arrow-back" size={28} color="#111827" />
      </Pressable>
      <Text style={styles.topTitle}>{title}</Text>
      {rightLabel ? <Pressable onPress={handleRightPress} style={styles.rightTap}><Text style={styles.rightText}>{rightLabel}</Text></Pressable> : <View style={styles.rightTap} />}
    </View>
  );
}

type SearchBoxProps = {
  value?: string;
  placeholder?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  autoFocus?: boolean;
  onSubmitEditing?: () => void;
};

export function SearchBox({ value = '', placeholder = 'Pesquisar', onPress, onChangeText, editable = true, autoFocus = false, onSubmitEditing }: SearchBoxProps) {
  if (onChangeText) {
    return (
      <View style={styles.searchBox}>
        <Ionicons name="search" size={34} color="#376BFF" />
        <TextInput
          value={value}
          editable={editable}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          placeholderTextColor="#C2C2C2"
          returnKeyType="search"
          style={[styles.searchInput, value ? styles.searchInputValue : null]}
        />
      </View>
    );
  }

  return (
    <Pressable onPress={onPress} style={styles.searchBox}>
      <Ionicons name="search" size={34} color="#376BFF" />
      <Text style={[styles.searchText, value && styles.searchValue]}>{value || placeholder}</Text>
    </Pressable>
  );
}

export function BottomTabs({ active = 'home' }: { active?: 'home' | 'list' | 'orders' }) {
  const activeIcons: Record<'home' | 'list' | 'orders', IconName> = {
    home: 'home',
    list: 'list',
    orders: 'cube'
  };

  const item = (key: 'home' | 'list' | 'orders', icon: IconName, label: string, href: Href) => (
    <Pressable onPress={() => router.push(href)} style={styles.tabItem}>
      <Ionicons name={active === key ? activeIcons[key] : icon} size={26} color="#4B5CFF" />
      <Text style={[styles.tabLabel, active === key && styles.tabLabelActive]}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={styles.bottomTabs}>
      {item('home', 'home-outline', 'início', '/home')}
      {item('list', 'list-outline', 'Lista', '/shopping-list')}
      {item('orders', 'cube-outline', 'Pedidos', '/orders')}
    </View>
  );
}

export function AndroidNavBar() {
  return null;
}

export function BottomArea({ active }: { active?: 'home' | 'list' | 'orders' }) {
  return (
    <View style={styles.bottomArea}>
      {active && <BottomTabs active={active} />}
    </View>
  );
}

export function Card({ children, style, onPress }: { children: ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void }) {
  const content = <View style={[styles.card, style]}>{children}</View>;
  if (!onPress) return content;
  return <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>{content}</Pressable>;
}

export function IconLine({ icon, text, href }: { icon: IconName; text: string; href?: Href }) {
  return (
    <Pressable onPress={() => href && router.push(href)} style={styles.iconLine}>
      <Ionicons name={icon} size={24} color="#4B5CFF" />
      <Text style={styles.iconLineText}>{text}</Text>
      <View style={{ flex: 1 }} />
      {href && <Ionicons name="chevron-forward" size={20} color="#EFEFEF" />}
    </Pressable>
  );
}

export function MiniLogoRow({ text }: { text: string }) {
  return (
    <View style={styles.miniLogoRow}>
      <Image source={logo} style={styles.miniLogo} resizeMode="contain" />
      <Text style={styles.miniLogoText}>{text}</Text>
    </View>
  );
}

export function FakeMap({ withTooltip = false, searchSuggestions = false }: { withTooltip?: boolean; searchSuggestions?: boolean }) {
  const pins = [
    [20, 250], [62, 210], [102, 290], [152, 220], [185, 170], [216, 260], [248, 210], [276, 150]
  ];
  return (
    <View style={styles.mapBox}>
      <View style={styles.mapLineOne} />
      <View style={styles.mapLineTwo} />
      <Text style={[styles.mapLabel, { left: 60, top: 160 }]}>TRINDADE</Text>
      <Text style={[styles.mapLabelSmall, { left: 200, top: 312 }]}>UFSC</Text>
      <Text style={[styles.mapLabelSmall, { left: 86, top: 380 }]}>CAPOEIRAS</Text>
      <View style={styles.mapRadius} />
      <View style={styles.myLocation}><Ionicons name="navigate" size={21} color="#FFFFFF" /></View>
      {pins.map(([left, top], idx) => <Ionicons key={idx} name="location" size={28} color="#FF4A2F" style={{ position: 'absolute', left, top }} />)}
      {withTooltip && (
        <View style={styles.mapTooltip}>
          <Text style={styles.tooltipText}>Item: Banana R$ 2,99</Text>
          <Text style={styles.tooltipText}>(+2) itens da sua sacola</Text>
          <Text style={styles.tooltipLink}>Rotas</Text>
        </View>
      )}
      {searchSuggestions && <View style={styles.keyboardOverlay} />}
    </View>
  );
}

export function FloatingShapes() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={[styles.floatDot, { left: 72, top: 51 }]} />
      <View style={[styles.floatDot, { right: 58, top: 42, opacity: 0.15 }]} />
      <View style={[styles.floatDot, { left: 155, bottom: 120, opacity: 0.45 }]} />
      <Ionicons name="pricetag" size={24} color="rgba(255,255,255,0.12)" style={{ position: 'absolute', right: 28, top: 60, transform: [{ rotate: '20deg' }] }} />
      <Ionicons name="cube" size={24} color="rgba(255,255,255,0.10)" style={{ position: 'absolute', left: 25, top: 280, transform: [{ rotate: '-20deg' }] }} />
      <Ionicons name="pricetag" size={26} color="rgba(255,255,255,0.10)" style={{ position: 'absolute', right: 18, bottom: 200, transform: [{ rotate: '40deg' }] }} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4'
  },
  phone: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 347 : undefined,
    minHeight: 739,
    overflow: 'hidden',
    borderRadius: Platform.OS === 'web' ? 22 : 0
  },
  phoneBorder: {
    borderWidth: Platform.OS === 'web' ? 1 : 0,
    borderColor: '#111111'
  },
  scrollContent: {
    minHeight: 739
  },
  bluePhone: {
    paddingHorizontal: 35,
    paddingTop: 50,
    paddingBottom: 30
  },
  logoBox: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoWord: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '500',
    letterSpacing: 7,
    marginTop: -4
  },
  primaryButton: {
    height: 46,
    borderRadius: 3,
    backgroundColor: AIDAN_PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 3,
    elevation: 3
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700'
  },
  disabled: {
    opacity: 0.45
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }]
  },
  field: {
    minHeight: 42,
    borderRadius: 5,
    backgroundColor: '#F3F3F3',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1
  },
  fieldSmall: {
    flex: 1
  },
  fieldTint: {
    backgroundColor: '#CFF5E6',
    borderColor: '#CFF5E6'
  },
  fieldInput: {
    flex: 1,
    color: '#777777',
    fontSize: 15,
    paddingVertical: 0,
    outlineStyle: 'none'
  } as any,
  topBar: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    paddingHorizontal: 24
  },
  backTap: {
    width: 40,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  topTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: '800',
    flex: 1
  },
  rightTap: {
    width: 54,
    alignItems: 'flex-end'
  },
  rightText: {
    color: '#4B5CFF',
    fontSize: 15,
    fontWeight: '800'
  },
  searchBox: {
    height: 54,
    borderWidth: 3,
    borderColor: '#76EFB8',
    borderLeftColor: '#3A74FF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF'
  },
  searchText: {
    color: '#C2C2C2',
    fontSize: 16,
    marginLeft: 6
  },
  searchValue: {
    color: '#303030'
  },
  searchInput: {
    flex: 1,
    color: '#C2C2C2',
    fontSize: 16,
    marginLeft: 6,
    paddingVertical: 0,
    outlineStyle: 'none'
  } as any,
  searchInputValue: {
    color: '#303030'
  },
  bottomArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  bottomTabs: {
    height: 55,
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 4
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabLabel: {
    color: '#202020',
    fontSize: 10,
    fontWeight: '800'
  },
  tabLabelActive: {
    color: '#202020'
  },
  androidNav: {
    height: 48,
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 65
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2
  },
  iconLine: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 46,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF'
  },
  iconLineText: {
    color: '#3E3E3E',
    fontSize: 15,
    marginLeft: 14
  },
  miniLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  miniLogo: {
    width: 58,
    height: 50,
    marginRight: 8
  },
  miniLogoText: {
    color: '#4B5CFF',
    fontSize: 15,
    fontWeight: '500'
  },
  mapBox: {
    flex: 1,
    backgroundColor: '#FAFDFF',
    position: 'relative',
    overflow: 'hidden'
  },
  mapLineOne: {
    position: 'absolute',
    left: 150,
    top: -20,
    width: 24,
    height: 620,
    backgroundColor: 'rgba(122,159,199,0.14)',
    transform: [{ rotate: '35deg' }]
  },
  mapLineTwo: {
    position: 'absolute',
    left: 10,
    top: 255,
    width: 360,
    height: 16,
    backgroundColor: 'rgba(122,159,199,0.13)',
    transform: [{ rotate: '-35deg' }]
  },
  mapLabel: {
    position: 'absolute',
    fontSize: 14,
    color: '#26323A',
    fontWeight: '800'
  },
  mapLabelSmall: {
    position: 'absolute',
    fontSize: 13,
    color: '#26323A',
    fontWeight: '800'
  },
  mapRadius: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#3D82FF',
    backgroundColor: 'rgba(66,133,244,0.16)',
    left: 99,
    top: 198
  },
  myLocation: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A86F7',
    left: 156,
    top: 254
  },
  mapTooltip: {
    position: 'absolute',
    right: 12,
    top: 78,
    width: 142,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#6E87EE',
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    alignItems: 'center'
  },
  tooltipText: {
    color: '#111111',
    fontSize: 11,
    fontWeight: '600'
  },
  tooltipLink: {
    color: '#3C55FF',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4
  },
  keyboardOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 255,
    backgroundColor: 'rgba(245,245,245,0.98)'
  },
  floatDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.16)'
  }
});
