import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useContext, useEffect, useState } from 'react';
import { Alert, DeviceEventEmitter, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../../components/PrimaryButton';
import { UserContext } from '../../context/UserContext';
import { authStore } from '../../data/authStore';
import { cartStore } from '../../data/cartStore';
import { globalScreenStyles, perfilStyles as styles } from '../../styles/screenStyles';

export default function PerfilScreen() {
  const { user, changePhoto } = useContext(UserContext);
  const [itemsCarrito, setItemsCarrito] = useState(cartStore.obtenerItems());

  useEffect(() => {
    const desuscribir = cartStore.suscribir((nuevosItems) => {
      setItemsCarrito(nuevosItems);
    });
    return () => desuscribir();
  }, []);

  // Cálculo del total de la compra
  const precioTotal = itemsCarrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const gestionarCompra = () => {
    Alert.alert(
      "¡Compra Realizada!", 
      `Tu pedido por un total de $${precioTotal.toLocaleString('es-AR')} ha sido procesado con éxito.`,
      [{ text: "Buenísimo", onPress: () => cartStore.vaciarCarrito() }]
    );
  };

  // 🛠️ Función para abrir la Galería de fotos
  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tus fotos para cambiar el avatar.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect:[1, 1],
      quality: 0.7,
    });

    if (!resultado.canceled && resultado.assets[0].uri) {
      changePhoto(resultado.assets[0].uri);
    }
  };

  // 🛠️ Función para tomar foto desde la Cámara
  const abrirCamara = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara para tomar tu foto.');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect:[1, 1],
      quality: 0.7,
    });

    if (!resultado.canceled && resultado.assets[0].uri) {
      changePhoto(resultado.assets[0].uri);
    }
  };

  // Opciones de selección de imagen
  const seleccionarImagen = () => {
    Alert.alert(
      "Foto de Perfil",
      "Selecciona una opción para actualizar tu foto",
      [
        { text: "Cámara", onPress: abrirCamara },
        { text: "Galería", onPress: abrirGaleria },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };


  return (
    <SafeAreaView style={globalScreenStyles.contenedorGlobal}>
      <ScrollView contentContainerStyle={styles.scrollContenedor} showsVerticalScrollIndicator={false}>
        
        {/* Tarjeta del Usuario */}
        <View style={styles.tarjetaUsuario}>
          <TouchableOpacity onPress={seleccionarImagen} activeOpacity={0.8}>
            {user.avatarUri ? (
              <Image source={{ uri: user.avatarUri }} style={[styles.avatarSimulado, { width: 80, height: 80, borderRadius: 40 }]} />
            ) : (
            <View style={styles.avatarSimulado}>
              <Text style={styles.textoAvatar}> {user.name.charAt(0)} </Text>
              <View style={{ position: 'absolute', botom: 0, right: 0, backgroundColor: '#007AFF', borderRadius: 10, padding: 4 }}>
                <FontAwesome name="camera" size={10} color="fff" />
              </View>
            </View>
            )}
          </TouchableOpacity>

          <View style={styles.infoUsuario}>
            <Text style={styles.nombre}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>

        </View>

        {/*Carrito de Compras */}
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
                <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text style={{ fontWeight: '500', color: '#333', fontSize: 15 }} numberOfLines={1}>
                      {item.titulo}
                    </Text>
                    <Text style={{ fontSize: 13, color: '#007AFF', fontWeight: 'bold', marginTop: 2 }}>
                      ${ (item.precio * item.cantidad).toLocaleString('es-AR') }
                    </Text>
                  </View>

                  {/*BOTONES (+ / - / -0 es eliminar) */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    {/* Botón para restar cantidad */}
                    <TouchableOpacity 
                      onPress={() => cartStore.restarProducto(item.id)}
                      style={{ backgroundColor: '#f0f0f0', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: -2 }}>-</Text>
                    </TouchableOpacity>

                    <Text style={{ marginHorizontal: 12, fontWeight: 'bold', fontSize: 15 }}>{item.cantidad}</Text>

                    {/* Botón para sumar cantidad */}
                    <TouchableOpacity 
                      onPress={() => cartStore.agregarProducto({id:item.id, titulo:item.titulo, precio:item.precio, imagen:item.imagen})}
                      style={{ backgroundColor: '#f0f0f0', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: -2 }}>+</Text>
                    </TouchableOpacity>

                    {/* Botón eliminar producto */}
                    <TouchableOpacity 
                      onPress={() => item?.id && cartStore.eliminarProducto(item.id)}
                      style={{ backgroundColor: '#ffebe9', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}
                    >
                      <Text style={{ color: '#FF3B30', fontSize: 12, fontWeight: '600' }}>Borrar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {/*TOTAL */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, marginBottom: 16, paddingTop: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Total General:</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' }}>
                  ${precioTotal.toLocaleString('es-AR')}
                </Text>
              </View>

              {/*FINALIZAR COMPRA */}
              <PrimaryButton 
                titulo="Finalizar Compra" 
                onPress={gestionarCompra}
                estiloCustom={{ marginBottom: 8 }}
              />
            </View>
          )}
        </View>

        {/* Botón de Cerrar Sesión */}
        <PrimaryButton titulo="Cerrar Sesión" 
        tipo="peligro" 
        onPress={async () => {
          await authStore.eliminarToken();
          Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
          DeviceEventEmitter.emit('cerrar_sesion_global');
        }} />
      </ScrollView>
    </SafeAreaView>
  );
}
