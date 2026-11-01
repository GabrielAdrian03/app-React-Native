import AsyncStorage from '@react-native-async-storage/async-storage';
import { File, Paths } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { createContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

export const UserContext = createContext(null);

const initialUser = {
  name: 'Cirujano',
  email: 'antonio@anto.com',
  avatarUri: null,
};

// Copia la foto de la caché a la carpeta de documentos (no se limpia sola).
// Si algo falla, devuelve la URI temporal para no perder la foto.
const guardarPermanente = (uriTemporal) => {
  try {
    const destino = new File(Paths.document, `avatar-${Date.now()}.jpg`);
    new File(uriTemporal).copy(destino);
    return destino.uri;
  } catch (error) {
    console.error('Error copiando la foto a almacenamiento permanente:', error);
    return uriTemporal;
  }
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const inicializar = async () => {
      let perfil = initialUser;
      let huboCambio = false;

      // 1. Cargar el perfil guardado
      try {
        const perfilGuardado = await AsyncStorage.getItem('perfil_usuario');
        if (perfilGuardado) {
          perfil = JSON.parse(perfilGuardado);
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      }

      // 2. Recuperar la foto si Android mató la app mientras la cámara estaba abierta
      if (Platform.OS === 'android') {
        try {
          const pendiente = await ImagePicker.getPendingResultAsync();

          if (pendiente && !pendiente.code && !pendiente.canceled && pendiente.assets?.[0]?.uri) {
            perfil = { ...perfil, avatarUri: guardarPermanente(pendiente.assets[0].uri) };
            huboCambio = true;
          } else if (pendiente?.code) {
            console.error('Error recuperando imagen:', pendiente.message);
          }
        } catch (error) {
          console.error('Error al recuperar resultado pendiente:', error);
        }
      }

      setUser(perfil);

      if (huboCambio) {
        AsyncStorage.setItem('perfil_usuario', JSON.stringify(perfil)).catch((e) =>
          console.error('Error guardando perfil:', e)
        );
      }
    };

    inicializar();
  }, []);

  const updateProfile = async (patch) => {
    setUser((prev) => {
      const nuevoEstado = { ...prev, ...patch };
      // Guardar de inmediato en el almacenamiento persistente
      AsyncStorage.setItem('perfil_usuario', JSON.stringify(nuevoEstado)).catch((e) =>
        console.error('Error guardando perfil:', e)
      );
      return nuevoEstado;
    });
  };

  const changePhoto = (uriTemporal) => updateProfile({ avatarUri: guardarPermanente(uriTemporal) });

  return (
    <UserContext.Provider value={{ user, updateProfile, changePhoto }}>
      {children}
    </UserContext.Provider>
  );
}
