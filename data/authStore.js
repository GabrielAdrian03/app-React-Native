import * as SecureStore from 'expo-secure-store';

export const authStore = {
  // Guarda el token en el chip seguro del teléfono
  guardarToken: async (token) => {
    try {
      await SecureStore.setItemAsync('user_session_token', token);
    } catch (error) {
      console.log('Error al guardar el token', error);
    }
  },

  // Lee el token cuando la app se inicia
  obtenerToken: async () => {
    try {
      return await SecureStore.getItemAsync('user_session_token');
    } catch (error) {
      console.log('Error al obtener el token', error);
      return null;
    }
  },

  // Borra el token cuando el usuario cierra sesión
  eliminarToken: async () => {
    try {
      await SecureStore.deleteItemAsync('user_session_token');
    } catch (error) {
      console.log('Error al borrar el token', error);
    }
  }
};
