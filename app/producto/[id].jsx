import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import PrimaryButton from '../../components/PrimaryButton';
import { productDetailStyles as styles, localStyles } from '../../styles/screenStyles';
import { cartStore } from '../../data/cartStore';
import { useFavoritos } from '../../hooks/useFavoritos';

export default function DetalleProductoScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  
  const  [producto, setProducto] = useState();
  const [cargando, setCargando] = useState();

  //extrae el id
  const id = params?.id;

  const { esFavorito, toggleFavorito, comprobarFavorito } = useFavoritos(id, producto);

  useFocusEffect(
    useCallback(() => {
      if (id) {
        comprobarFavorito();
      }
    }, [id])
  );

  //obtener la info de 1 solo producto
  useEffect(() => {
    const obtenerProductoDetalle = async () => {
      if (!id || id == 'undefined') return;
      try {
        const respuesta = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!respuesta.ok) {
          throw new Error("Error del servidor", respuesta.status)
        }
        const item = await respuesta.json();
        if (item) {
          //traduce del ingles
          setProducto({
            id: item.id,
            titulo: item.title,
            precio: item.price,
            descripcion: item.description,
            imagen: item.image
          });
        }
      } catch (error) {
        console.error('Error al acargar e producto desde la API', error);
      } finally {
        setCargando(false); //apaga la animacion de carga
      }
    };
    obtenerProductoDetalle();
  }, [id]);

  if (cargando) {
    return (
      <SafeAreaView style={styles.contenedorError}>
        <ActivityIndicator size="large" color="3a04fc" />
        <Text style={[styles.textoError, {marginTop: 12}]}>Cargando detalle del producto </Text>
      </SafeAreaView>
    )
  }

  //Si no hay producto frena el renderizado
  if (!producto) {
    return (
      <SafeAreaView style={styles.contenedorError}>
        <Text style={styles.textoError}>El Producto ya no existe.</Text>
        <PrimaryButton 
          titulo="Volver al Inicio" 
          onPress={() => router.replace('/(tabs)')}
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

          <PrimaryButton 
          titulo="Agregar al Carrito" 
          onPress={() => {
            cartStore.agregarProducto(producto); 
          alert(`Se agregó ${producto.titulo} al carrito!`)}} />

          <PrimaryButton
            titulo={esFavorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
            tipo="favoritos"
            onPress={toggleFavorito}
            estiloCustom={{ marginTop: 12}}
          />
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
