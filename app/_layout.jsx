import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, DeviceEventEmitter, View } from 'react-native'; // 👈 Importamos DeviceEventEmitter
import { authStore } from '../data/authStore';
import LoginScreen from './login';

export default function RootLayout() {
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [estaCargando, setEstaCargando] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      const token = await authStore.obtenerToken();
      if (token) {
        setEstaLogueado(true);
      }
      setEstaCargando(false);
    };
    verificarSesion();

    const suscripcionCierre = DeviceEventEmitter.addListener('cerrar_sesion_global', async () => {
      await authStore.eliminarToken(); // Borra el token en segundo plano
      setEstaLogueado(false);          // Cambia el estado y bloquea la app volviendo al Login
    });


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
