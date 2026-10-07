import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import { Colores } from '../../constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // Color del ícono y texto cuando la pestaña está activa (Azul de tu Theme)
        tabBarActiveTintColor: Colores.primario,
        // Color cuando la pestaña está inactiva
        tabBarInactiveTintColor: '#8e8e93',
        // Estilo visual de la barra de abajo
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
      {/* 🏠 PESTAÑA 1: INICIO */}
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

      {/* ❤️ PESTAÑA 2: FAVORITOS */}
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

      {/* 👤 PESTAÑA 3: MI PERFIL (CARRITO) */}
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
  );
}
