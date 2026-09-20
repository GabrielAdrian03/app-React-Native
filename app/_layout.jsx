import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, DeviceEventEmitter } from 'react-native'; // 👈 Importamos DeviceEventEmitter
import { Stack } from 'expo-router';
import LoginScreen from './login';
import { authStore } from '../data/authStore';

export default function RootLayout() {
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [estaCargando, setEstaCargando] = useState(true);

  useEffect(() => {
    // 1. Comprobamos sesión al arrancar
    const verificarSesion = async () => {
      const token = await authStore.obtenerToken();
      if (token) {
        setEstaLogueado(true);
      }
      setEstaCargando(false);
    };
    verificarSesion();

    // 2. 👂 ESCUCHADOR GLOBAL: Espera el grito desde el perfil
    const suscripcionCierre = DeviceEventEmitter.addListener('cerrar_sesion_global', async () => {
      await authStore.eliminarToken(); // Borra el token en segundo plano
      setEstaLogueado(false);          // Cambia el estado y bloquea la app volviendo al Login
    });

    // Limpieza al desmontar
    return () => suscripcionCierre.remove();
  }, []);

  if (estaCargando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!estaLogueado) {
    return <LoginScreen onLoginExitoso={() => setEstaLogueado(true)} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="producto/[id]" options={{ title: 'Detalle del Producto' }} />
    </Stack>
  );
}
