import React, { useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Safe Area moderna
import { useLocalSearchParams, useRouter } from 'expo-router';
import PrimaryButton from '../../components/PrimaryButton';
import { misProductos } from '../../data/products';
import { productDetailStyles as styles } from '../../styles/screenStyles';
import { cartStore } from '../../data/cartStore';

export default function DetalleProductoScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  
  //extrae el id de forma segura
  const id = params?.id;

  //se busca el producto solo si el ID existe y es válido
  const producto = id ? misProductos.find((p) => p.id === parseInt(id, 10)) : null;

  //Si no hay producto frena el renderizado
  if (!producto) {
    return (
      <SafeAreaView style={styles.contenedorError}>
        <Text style={styles.textoError}>El Producto ya no existe.</Text>
        <PrimaryButton 
          titulo="Volver al Inicio" 
          onPress={() => router.replace('/(tabs)')} // Usamos replace para resetear el flujo
          estiloCustom={{ width: 'auto', paddingHorizontal: 20 }} 
        />
      </SafeAreaView>
    );
  }

  //Si el código llega acá es por que 'producto' tiene datos
  return (
    <SafeAreaView style={styles.contenedorGlobal}>
      <ScrollView contentContainerStyle={styles.scrollContenedor} showsVerticalScrollIndicator={false}>
        {/* Imagen del producto */}
        <TouchableOpacity activeOpacity={0.9} onPress={() => setModalVisible(true)}>
          <Image source={{ uri: producto.imagen }} style={styles.imagen} resizeMode="cover" />
        </TouchableOpacity>

        <View style={styles.contenedorDetalles}>
          <Text style={styles.titulo}>{producto.titulo}</Text>
          <Text style={styles.precio}>${producto.precio.toLocaleString('es-AR')}</Text>
          <View style={styles.divisor} />
          <Text style={styles.subtitulo}>Descripción</Text>
          <Text style={styles.descripcion}>{producto.descripcion}</Text>
          <PrimaryButton titulo="Agregar al Carrito" 
          onPress={() => {
            cartStore.agregarProducto(producto); 
          alert(`Se agregó ${producto.titulo} al carrito!`)}} />
        </View>
      </ScrollView>
      
        {/* Modal para ver la imagen en grande */}
        <Modal 
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}>
            <TouchableOpacity 
            style={localStyles.fondoModal} 
            activeOpacity={1}
            onPress={() => setModalVisible(false)}>

            {/* Boton para cerrar */}
            <SafeAreaView style={localStyles.contenedorCerrar}>
                <Text style={localStyles.textoCerrar}>Cerrar</Text>
            </SafeAreaView>

            <Image source={{ uri: producto.imagen }} 
            style={localStyles.imagenPantallaCompleta}
            resizeMode="contain" />
        </TouchableOpacity>
        </Modal>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  fondoModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)', // Fondo negro con 95% de opacidad
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorCerrar: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  textoCerrar: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  imagenPantallaCompleta: {
    width: '100%',
    height: '80%',
  },
});