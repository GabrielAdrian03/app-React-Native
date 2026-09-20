import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { Colores, Tipografia } from '../constants/theme'
import { authStore } from '../data/authStore';

export default function LoginScreen({ onLoginExitoso }) {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const manejarLogin = async () => {

    if (!usuario.trim() || !contrasenia.trim()) {
      Alert.alert("Error", "Por favor, completá todos los campos.");
      return;
    }

    // Simulamos una validación (Podés usar cualquier usuario y clave)
    if (usuario.toLowerCase() === 'admin' && contrasenia === '1234') {
        await authStore.guardarToken('token-secreto-123'); // Guardamos el estado de login
        onLoginExitoso();
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos.\n(mandale admin / 1234 guacho)");
    }
  };

  return (
    <SafeAreaView style={styles.contenedorGlobal}>
      <View style={styles.tarjetaLogin}>
        <Text style={styles.logo}>🛒 Mi Tiendita</Text>
        <Text style={styles.subtitulo}>Iniciá sesión para continuar</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#999"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={contrasenia}
          onChangeText={setContrasenia}
          secureTextEntry={true} // Oculta el texto de la clave
        />

        <PrimaryButton 
          titulo="Ingresar" 
          onPress={manejarLogin}
          estiloCustom={{ marginTop: 10 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedorGlobal: {
    flex: 1,
    backgroundColor: Colores.fondo,
    justifyContent: 'center',
    padding: 20,
  },
  tarjetaLogin: {
    backgroundColor: Colores.blanco,
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  logo: {
    ...Tipografia.tituloGrande,
    textAlign: 'center',
    color: Colores.primario,
    marginBottom: 4,
  },
  subtitulo: {
    ...Tipografia.detalle,
    color: Colores.textoSecundario,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 15,
    backgroundColor: '#fafafa',
    color: Colores.textoPrincipal,
  },
});
