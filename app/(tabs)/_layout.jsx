import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colores } from '../../constants/theme';
import { UserProvider } from '../../context/UserContext';

export default function TabsLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colores.primario,
            tabBarInactiveTintColor: '#8e8e93',
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopWidth: 1,
              borderTopColor: '#e0e0e0',
              height: 90,
              paddingBottom: 20,
              paddingTop: 8,
              position: 'absolute', 
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
            },
          }}
        >
          {/* INICIO */}
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              headerShown: false, 
              tabBarIcon: ({ color, focused }) => (
                <Ionicons 
                  name={focused ? 'home' : 'home-outline'} 
                  size={24} 
                  color={color} 
                />
              ),
            }}
          />

          {/* FAVORITOS */}
          <Tabs.Screen
            name="favoritos"
            options={{
              title: 'Favoritos',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <Ionicons 
                  name={focused ? 'heart' : 'heart-outline'} 
                  size={24} 
                  color={color} 
                />
              ),
            }}
          />

          {/* MI PERFIL Y CARRITO (Limpio y corregido) */}
          <Tabs.Screen
            name="perfil"
            options={{
              title: 'Mi Perfil',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <Ionicons 
                  name={focused ? 'person' : 'person-outline'} 
                  size={24} 
                  color={color} 
                />
              ),
            }}
          />
        </Tabs>

      </UserProvider>
    </GestureHandlerRootView>
  );
}
