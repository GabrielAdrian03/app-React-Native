import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import asyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../../components/ProductCard';
import { globalScreenStyles, favoritosStyles } from '../../styles/screenStyles';

export default function FavoritosScreen() {
  const router = useRouter();
  const [productosFavoritos, setProductosFavoritos] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const cargarFavoritos = async () => {
        try {
          const favoritosGuardados = await asyncStorage.getItem('favoritos');
          if (favoritosGuardados) {
            setProductosFavoritos(JSON.parse(favoritosGuardados));
          } else {
            setProductosFavoritos([]);
          }
        } catch (error) {
          console.error('Error al cargar los favoritos:', error);
        }
      };

      cargarFavoritos();
    }, [])
  );

  return (
    <SafeAreaView style={globalScreenStyles.contenedorGlobal}>
      <View style={globalScreenStyles.contenedorContenido}>
        <Text style={globalScreenStyles.tituloPantalla}>Mis Favoritos</Text>

        {productosFavoritos.length === 0 ? (
          <View style={favoritosStyles.contenedorVacio}>
            <Text style={favoritosStyles.textoVacio}>No tenés productos guardados aún.</Text>
          </View>
        ) : (
          <FlatList
            data={productosFavoritos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard producto={item} onPress={() => router.push(`/producto/${item.id}`)} />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
