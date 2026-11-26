import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import AnimatedSplash from './src/components/AnimatedSplash';
import UpdateNotice from './src/components/UpdateNotice';
import HomeScreen from './src/screens/HomeScreen';
import MenuButton from './src/components/MenuButton';
import CardsScreen from './src/screens/CardsScreen';
import CardDetailScreen from './src/screens/CardDetailScreen';
import SpreadsScreen from './src/screens/SpreadsScreen';
import SpreadDetailScreen from './src/screens/SpreadDetailScreen';
import QuizScreen from './src/screens/QuizScreen';
import PersonalArcanaScreen from './src/screens/PersonalArcanaScreen';
import BasicsScreen from './src/screens/BasicsScreen';
import { colors } from './src/theme';
import { RootStackParamList } from './src/types';

// mantém a splash nativa até a splash animada estar desenhada
SplashScreen.preventAutoHideAsync().catch(() => {});

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.bg, card: colors.surface, text: colors.text, border: colors.border, primary: colors.saffron },
};

const icon = (name: keyof typeof Ionicons.glyphMap) =>
  ({ color, size }: { color: string; size: number }) => <Ionicons name={name} size={size} color={color} />;

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerLeft: () => <MenuButton />,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.saffron,
        tabBarInactiveTintColor: colors.muted,
      }}
    >
      <Tab.Screen name="Cartas" component={CardsScreen} options={{ tabBarIcon: icon('albums-outline') }} />
      <Tab.Screen name="Tiragens" component={SpreadsScreen} options={{ tabBarIcon: icon('grid-outline') }} />
      <Tab.Screen name="Quiz" component={QuizScreen} options={{ tabBarIcon: icon('compass-outline') }} />
      <Tab.Screen
        name="Pessoal"
        component={PersonalArcanaScreen}
        options={{ tabBarIcon: icon('person-circle-outline'), headerTitle: 'Arcanos pessoais' }}
      />
      <Tab.Screen name="Guia" component={BasicsScreen} options={{ tabBarIcon: icon('book-outline') }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const hideNativeSplash = useCallback(() => { SplashScreen.hideAsync().catch(() => {}); }, []);
  const finish = useCallback(() => setShowSplash(false), []);

  // a abertura animada aparece sozinha; o app só é montado depois dela
  if (showSplash) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <StatusBar style="light" />
        <AnimatedSplash onReady={hideNativeSplash} onFinish={finish} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <NavigationContainer theme={theme}>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerStyle: { backgroundColor: colors.surface }, headerTintColor: colors.text }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="CardDetail" component={CardDetailScreen} options={{ title: 'Carta' }} />
          <Stack.Screen name="SpreadDetail" component={SpreadDetailScreen} options={{ title: 'Tiragem' }} />
        </Stack.Navigator>
      </NavigationContainer>
      <UpdateNotice />
    </View>
  );
}
