import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, FlatList, Text, ActivityIndicator } from 'react-native';
import { useRouter, Stack } from 'expo-router'; 
import ProductCard from '../../components/ProductCard';
import PrimaryButton from "../../components/PrimaryButton"
import { globalScreenStyles as styles, localStyles } from '../../styles/screenStyles';


export default function InicioScreen() {
  const router = useRouter();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [refrescando, setRefrescando] = useState(false)


  const obtenerProductosAPI = async () => {
    try {
      setError(null);
      const respuesta = await fetch('https://fakestoreapi.com/products/');
      if (!respuesta) {
        throw new Error('no se pudo obtener los productos')
      }
      const datos = await respuesta.json();
      setProductos(datos)
    } catch (err) {
      setError(err.mesagge || 'Ocurrió un problema de red.');
    } finally {
      setCargando(false);
      setRefrescando(false)
    }
  }

  useEffect(() => {
    obtenerProductosAPI();
  }, []);

  const alRefrescar = useCallback(() => {
    setRefrescando(true);
    obtenerProductosAPI();
  }, []);

  return (
    <SafeAreaView style={styles.contenedorGlobal}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Productos',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#3a04fc' },
          headerTintColor: '#fff',
        }} 
      />

      <View style={styles.contenedorContenido}>
        {/* mientras carga... */}
        {cargando ? (
          <View style={localStyles.contenedorCarga}>
            <ActivityIndicator size="large" color="#3a04fc"/>
            <Text style={localStyles.textoCarga}> Cargando Productos</Text>
          </View>
        ) : error ? (

          <View style={localStyles.contenedorMensaje}>
            <Text style={localStyles.textoError}> {error} </Text>
            <PrimaryButton
            titulo="Reintentar"
            onPress={obtenerProductosAPI}
            estiloCustom={{ marginTop: 16, width: 'auto', paddingHorizontal: 24 }}
            />
            </View>
        ) : (

        <FlatList
          data={productos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            //por si cambian
            <ProductCard 
            producto={{
              id:item.id,
              titulo: item.title,
              precio: item.price,
              descripcion: item.description,
              imagen: item.image
            }} 
            onPress={() => router.push(`/producto/${item.id}`)} />
          )}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              {/* Banner */}
              <Image 
                source={require('../../assets/banner.png')} 
                style={{ width: '100%', height: 120, alignSelf: 'center', marginBottom: 20, borderRadius: 8 }} 
              />
              
              {/* Fila de Destacado y cantidad de artículos */}
              <View style={styles.contenedorFilaInfo}>
                <Text style={styles.textoDestacado}>Destacados</Text>
                <Text style={styles.textoCantidad}>
                  {productos.length} {productos.length === 1 ? 'artículo' : 'artículos'}
                </Text>
              </View>
            </View>
          }
        />
        )}
      </View>
    </SafeAreaView>
  );
}
