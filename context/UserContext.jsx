import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

const initialUser = {
  name: 'Cirujano',
  email: 'antonio@anto.com',
  avatarUri: null,
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const cargarPerfilLocal = async () => {
      try {
        const perfilGuardado = await AsyncStorage.getItem('perfil_usuario');
        if (perfilGuardado) {
          setUser(JSON.parse(perfilGuardado));
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      }
    };
    cargarPerfilLocal();
  }, []);

  const updateProfile = async (patch) => {
    setUser((prev) => {
      const nuevoEstado = { ...prev, ...patch };
      // Guardar de inmediato en el almacenamiento persistente
      AsyncStorage.setItem('perfil_usuario', JSON.stringify(nuevoEstado)).catch(e => 
        console.error('Error guardando perfil:', e)
      );
      return nuevoEstado;
    });
  };

  const changePhoto = (avatarUri) => updateProfile({ avatarUri });

  return (
    <UserContext.Provider value={{ user, updateProfile, changePhoto }}>
      {children}
    </UserContext.Provider>
  );
}
