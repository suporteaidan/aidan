import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '@/theme/colors';

type IconName = keyof typeof Ionicons.glyphMap;

function tabIcon(name: IconName) {
  return function Icon({ color, size }: { color: string; size: number }) {
    return <Ionicons name={name} color={color} size={size} />;
  };
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopColor: colors.border
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700'
        }
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: tabIcon('home-outline') }} />
      <Tabs.Screen name="assistant" options={{ title: 'Aidan', tabBarIcon: tabIcon('chatbubble-ellipses-outline') }} />
      <Tabs.Screen name="showcase" options={{ title: 'Telas', tabBarIcon: tabIcon('albums-outline') }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil', tabBarIcon: tabIcon('person-circle-outline') }} />
    </Tabs>
  );
}
