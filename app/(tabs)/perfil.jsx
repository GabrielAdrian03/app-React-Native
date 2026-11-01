import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  DeviceEventEmitter,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import CamaraModal from '../../components/CamaraModal';
import PrimaryButton from '../../components/PrimaryButton';
import { UserContext } from '../../context/UserContext';
import { authStore } from '../../data/authStore';
import { cartStore } from '../../data/cartStore';
import { globalScreenStyles, perfilStyles as styles } from '../../styles/screenStyles';

export default function PerfilScreen() {
  const { user, changePhoto, updateProfile } = useContext(UserContext);
  const insets = useSafeAreaInsets();
  const [itemsCarrito, setItemsCarrito] = useState(cartStore.obtenerItems());
  const [camaraVisible, setCamaraVisible] = useState(false);
  const [fotoVisible, setFotoVisible] = useState(false);

  // Guarda la imagen en el perfil si el resultado es válido
  const procesarImagen = (resultado) => {
    if (resultado && !resultado.canceled && resultado.assets?.[0]?.uri) {
      changePhoto(resultado.assets[0].uri);
    }
  };

  useEffect(() => {
    const desuscribir = cartStore.suscribir((nuevosItems) => {
      setItemsCarrito(nuevosItems);
    });
    return () => desuscribir();
  }, []);

  // Cálculo del total de la compra
  const precioTotal = itemsCarrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const gestionarCompra = () => {
    Alert.alert(
      '¡Compra Realizada!',
      `Tu pedido por un total de $${precioTotal.toLocaleString('es-AR')} ha sido procesado con éxito.`,
      [{ text: 'Buenísimo', onPress: () => cartStore.vaciarCarrito() }]
    );
  };

  // Abrir la galería de fotos
  const abrirGaleria = async () => {
    try {
      const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permiso.granted) {
        Alert.alert('Permiso denegado', 'Necesitamos acceso a tus fotos para cambiar el avatar.');
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      procesarImagen(resultado);
    } catch (error) {
      console.error('Error al abrir la galería', error);
    }
  };

  // Abrir la cámara dentro de la app (modal con expo-camera)
  const abrirCamara = () => setCamaraVisible(true);

  const alTomarFoto = (uri) => {
    changePhoto(uri);
    setCamaraVisible(false);
  };

  // Quitar la foto de perfil (con confirmación)
  const quitarFoto = () => {
    Alert.alert('Quitar foto', '¿Querés eliminar tu foto de perfil?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Quitar', style: 'destructive', onPress: () => updateProfile({ avatarUri: null }) },
    ]);
  };

  // Ver la foto en pantalla completa (solo si hay foto)
  const verFoto = () => {
    if (user.avatarUri) setFotoVisible(true);
  };

  return (
    <SafeAreaView style={globalScreenStyles.contenedorGlobal}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Perfil',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#3a04fc' },
          headerTintColor: '#fff',
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContenedor} showsVerticalScrollIndicator={false}>
        {/* Tarjeta del usuario */}
        <View style={[estilos.tarjeta, { alignItems: 'center' }]}>
          <TouchableOpacity onPress={verFoto} activeOpacity={user.avatarUri ? 0.8 : 1}>
            {user.avatarUri ? (
              <Image source={{ uri: user.avatarUri }} style={estilos.avatar} />
            ) : (
              <View style={[estilos.avatar, estilos.avatarVacio]}>
                <Text style={estilos.inicial}>{user.name.charAt(0)}</Text>
              </View>
            )}
          </TouchableOpacity>

          <Text style={estilos.nombre}>{user.name}</Text>
          <Text style={estilos.email}>{user.email}</Text>
        </View>

        {/* Tarjeta de foto de perfil */}
        <View style={estilos.tarjeta}>
          <Text style={estilos.tituloTarjeta}>Foto de perfil</Text>
          <Text style={estilos.descripcion}>
            Elegí una imagen de tu galería o capturá una nueva con la cámara del dispositivo.
          </Text>

          <TouchableOpacity style={estilos.botonPrimario} onPress={abrirGaleria} activeOpacity={0.85}>
            <FontAwesome name="image" size={16} color="#fff" style={{ marginRight: 10 }} />
            <Text style={estilos.textoBotonPrimario}>Elegir de la galería</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botonSecundario} onPress={abrirCamara} activeOpacity={0.85}>
            <FontAwesome name="camera" size={16} color="#1d4ed8" style={{ marginRight: 10 }} />
            <Text style={estilos.textoBotonSecundario}>Tomar una fotografía</Text>
          </TouchableOpacity>

          {user.avatarUri ? (
            <TouchableOpacity onPress={quitarFoto} style={{ alignSelf: 'center', marginTop: 14, padding: 4 }}>
              <Text style={estilos.textoQuitar}>Quitar foto de perfil</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Carrito de compras */}
        <Text style={[globalScreenStyles.textoDestacado, { fontSize: 18, marginBottom: 10 }]}>
          Mi Carrito ({itemsCarrito.reduce((acc, item) => acc + item.cantidad, 0)})
        </Text>

        <View style={[styles.contenedorMenu, { padding: 16 }]}>
          {itemsCarrito.length === 0 ? (
            <Text style={{ color: '#888', textAlign: 'center', paddingVertical: 20 }}>
              El carrito está vacío. ¡Agregá unos auriculares!
            </Text>
          ) : (
            <View>
              {itemsCarrito.map((item) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f0f0f0',
                  }}
                >
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text style={{ fontWeight: '500', color: '#333', fontSize: 15 }} numberOfLines={1}>
                      {item.titulo}
                    </Text>
                    <Text style={{ fontSize: 13, color: '#007AFF', fontWeight: 'bold', marginTop: 2 }}>
                      ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                    </Text>
                  </View>

                  {/* Botones: restar / sumar / borrar */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => cartStore.restarProducto(item.id)}
                      style={{
                        backgroundColor: '#f0f0f0',
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: -2 }}>-</Text>
                    </TouchableOpacity>

                    <Text style={{ marginHorizontal: 12, fontWeight: 'bold', fontSize: 15 }}>{item.cantidad}</Text>

                    <TouchableOpacity
                      onPress={() =>
                        cartStore.agregarProducto({
                          id: item.id,
                          titulo: item.titulo,
                          precio: item.precio,
                          imagen: item.imagen,
                        })
                      }
                      style={{
                        backgroundColor: '#f0f0f0',
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 12,
                      }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: -2 }}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => item?.id && cartStore.eliminarProducto(item.id)}
                      style={{ backgroundColor: '#ffebe9', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}
                    >
                      <Text style={{ color: '#FF3B30', fontSize: 12, fontWeight: '600' }}>Borrar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {/* Total */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 16,
                  marginBottom: 16,
                  paddingTop: 10,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Total General:</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' }}>
                  ${precioTotal.toLocaleString('es-AR')}
                </Text>
              </View>

              {/* Finalizar compra */}
              <PrimaryButton titulo="Finalizar Compra" onPress={gestionarCompra} estiloCustom={{ marginBottom: 8 }} />
            </View>
          )}
        </View>

        {/* Botón de cerrar sesión */}
        <PrimaryButton
          titulo="Cerrar Sesión"
          tipo="peligro"
          onPress={async () => {
            await authStore.eliminarToken();
            Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
            DeviceEventEmitter.emit('cerrar_sesion_global');
          }}
        />
      </ScrollView>

      {/* Cámara dentro de la app */}
      <CamaraModal
        visible={camaraVisible}
        onCerrar={() => setCamaraVisible(false)}
        onFotoTomada={alTomarFoto}
      />

      {/* Visor de la foto de perfil */}
      <Modal
        visible={fotoVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFotoVisible(false)}
        statusBarTranslucent
      >
        <View style={estilos.fondoVisor}>
          {/* Tocar el fondo cierra el visor */}
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setFotoVisible(false)} />

          {user.avatarUri ? (
            <Image source={{ uri: user.avatarUri }} style={estilos.imagenVisor} resizeMode="contain" />
          ) : null}

          <TouchableOpacity
            onPress={() => setFotoVisible(false)}
            style={[estilos.botonCerrarVisor, { top: insets.top + 12 }]}
          >
            <FontAwesome name="close" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#2563eb',
    backgroundColor: '#1f2937',
  },
  avatarVacio: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a04fc',
  },
  inicial: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  nombre: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  email: {
    marginTop: 4,
    fontSize: 14,
    color: '#6b7280',
  },
  tituloTarjeta: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
  },
  descripcion: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  botonPrimario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
  },
  textoBotonPrimario: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  botonSecundario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  textoBotonSecundario: {
    color: '#1d4ed8',
    fontSize: 15,
    fontWeight: '600',
  },
  textoQuitar: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
  },
  fondoVisor: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagenVisor: {
    width: '100%',
    height: '80%',
  },
  botonCerrarVisor: {
    position: 'absolute',
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});