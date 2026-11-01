import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Sortable from 'react-native-sortables';

import ProductCard from '../../components/ProductCard';
import { guardarFavoritos } from '../../hooks/useFavoritos';

import {
  favoritosStyles,
  globalScreenStyles,
} from '../../styles/screenStyles';

export default function FavoritosScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos
  useFocusEffect(
    useCallback(() => {
      let activo = true;

      const cargarFavoritos = async () => {
        try {
          const guardados = await AsyncStorage.getItem('favoritos');

          if (!activo) return;

          const productos = guardados ? JSON.parse(guardados) : [];

          setFavorites(Array.isArray(productos) ? productos : []);
        } catch (error) {
          console.error('Error al cargar favoritos:', error);
        }
      };

      cargarFavoritos();

      return () => {
        activo = false;
      };
    }, [])
  );

  // Guardar nuevo orden
  const handleDragEnd = async ({ order }) => {
    const nuevoOrden = order(favorites);

    setFavorites(nuevoOrden);

    try {
      await guardarFavoritos(nuevoOrden);
    } catch (error) {
      console.error('Error al guardar el orden:', error);
    }
  };

  // Eliminar favorito
  const quitarFavoritoDeLaLista = async (id) => {
    const actualizados = favorites.filter(
      item => String(item.id) !== String(id)
    );

    setFavorites(actualizados);

    try {
      await guardarFavoritos(actualizados);
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
    }
  };

  // Normalizar producto
  const formatearProducto = (item) => ({
    id: item.id,
    titulo: item.titulo || item.title || 'Producto sin título',
    precio: item.precio ?? item.price ?? 0,
    descripcion: item.descripcion || item.description || '',
    imagen: item.imagen || item.image || '',
  });

  // Acción que aparece al deslizar
  const renderRightActions = (producto) => {
    return (
      <TouchableOpacity
        style={styles.botonEliminar}
        onPress={() => quitarFavoritoDeLaLista(producto.id)}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={26}
          color="#fff"
        />

        <Text style={styles.textoEliminar}>
          Eliminar
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={globalScreenStyles.contenedorGlobal}>
            <Stack.Screen 
              options={{
                headerShown: true,
                title: 'Favoritos',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#3a04fc' },
                headerTintColor: '#fff',
              }} 
            />
      <View style={globalScreenStyles.contenedorContenido}>


        {favorites.length === 0 ? (
          <View style={favoritosStyles.contenedorVacio}>
            <Text style={favoritosStyles.textoVacio}>
              No tenés productos guardados aún.
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contenedorLista}
          >
            <Sortable.Flex
              flexDirection="column"
              flexWrap="nowrap"
              alignItems="stretch"
              gap={16}
              dragActivationDelay={250}
              activeItemScale={1.02}
              activeItemOpacity={0.9}
              onDragEnd={handleDragEnd}
            >
              {favorites.map((item) => {
                const producto = formatearProducto(item);

                return (
                  <View
                    key={String(item.id)}
                    style={styles.filaProducto}
                  >
                    <Swipeable
                      renderRightActions={() =>
                        renderRightActions(producto)
                      }
                      rightThreshold={40}
                      overshootRight={false}
                      friction={2}
                    >
                      <View style={styles.contenidoTarjeta}>
                        <View style={styles.iconoArrastre}>
                          <MaterialCommunityIcons
                            name="drag-vertical"
                            size={30}
                            color="#777"
                          />
                        </View>

                        <View style={styles.tarjetaProducto}>
                          <ProductCard
                            producto={producto}
                            onPress={() =>
                              router.push(`/producto/${producto.id}`)
                            }
                            onToggleFavoritoCallback={() =>
                              quitarFavoritoDeLaLista(producto.id)
                            }
                          />
                        </View>
                      </View>
                    </Swipeable>
                  </View>
                );
              })}
            </Sortable.Flex>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedorLista: {
    paddingBottom: 20,
  },

  filaProducto: {
    width: '100%',
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  contenidoTarjeta: {
    width: '100%',
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
  },

  iconoArrastre: {
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tarjetaProducto: {
    flex: 1,
    minWidth: 0,
  },

  botonEliminar: {
    width: 90,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },

  textoEliminar: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});
