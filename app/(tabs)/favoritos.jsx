import { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
//maneja la animación del Swipe
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import ProductCard from '../../components/ProductCard';
import { guardarFavoritos } from '../../hooks/useFavoritos';
import {
  favoritosStyles,
  globalScreenStyles,
} from '../../styles/screenStyles';

export default function FavoritosScreen() {
  const router = useRouter();
  const [productosFavoritos, setProductosFavoritos] = useState([]);

  // Cargar favoritos
  useFocusEffect(
    useCallback(() => {
      let activo = true;

      const cargarFavoritos = async () => {
        try {
          const favoritosGuardados = await AsyncStorage.getItem('favoritos');

          if (!activo) return;

          const favoritos = favoritosGuardados
            ? JSON.parse(favoritosGuardados)
            : [];

          setProductosFavoritos(
            Array.isArray(favoritos) ? favoritos : []
          );
        } catch (error) {
          console.error('Error al recuperar favoritos:', error);
        }
      };

      cargarFavoritos();

      return () => {
        activo = false;
      };
    }, [])
  );

  // Guardar el nuevo orden
  const guardarNuevoOrden = async (nuevaLista) => {
    setProductosFavoritos(nuevaLista);

    try {
      await guardarFavoritos(nuevaLista);
    } catch (error) {
      console.error('Error al guardar el orden:', error);
    }
  };

  // Eliminar producto de favoritos
  const eliminarFavorito = async (idAEliminar) => {
    const listaActualizada = productosFavoritos.filter(
      (item) => String(item.id) !== String(idAEliminar)
    );

    setProductosFavoritos(listaActualizada);

    try {
      await guardarFavoritos(listaActualizada);
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
    }
  };

  const quitarFavoritoDeLaLista = (idAEliminar) => {
    setProductosFavoritos((favoritos) =>
      favoritos.filter((item) => String(item.id) !== String(idAEliminar))
    );
  };

  const renderRightActions = (id, progress, dragX) => {
    const styleAnimado = useAnimatedStyle(() => {
      // Reanimated utiliza su propia lógica de interpolación interna
      const scale = dragX.value < -80 ? 1 : Math.max(0, (dragX.value + 80) / 80);
      return {
        transform: [{ scale }],
      };
    });

    return (
      <TouchableOpacity
        style={localStyles.botonEliminarSwipe}
        onPress={() => eliminarFavorito(id)}
        activeOpacity={0.8}
      >
        <Animated.View style={styleAnimado}>
          <FontAwesome name="trash" size={24} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  // Formatear producto
  const formatearProducto = (item) => ({
    id: item.id,
    titulo: item.titulo || item.title || 'Producto sin título',
    precio: item.precio ?? item.price ?? 0,
    descripcion: item.descripcion || item.description || '',
    imagen: item.imagen || item.image || '',
  });

  // Renderizar tarjetas
  const renderItem = ({ item, drag, isActive }) => {
    const producto = formatearProducto(item);

    return (
      <ScaleDecorator>
        <Swipeable
          // Se invierte el orden para asegurar que las animaciones lean los SharedValues correctos.
          renderRightActions={(dragX, progress) =>
            renderRightActions(producto.id, progress, dragX)
          }
          enabled={!isActive}
          rightThreshold={40}
        >
          <TouchableOpacity
            onLongPress={drag}
            delayLongPress={250}
            disabled={isActive}
            activeOpacity={0.9}
          >
            <View style={[
              { backgroundColor: '#fff' },
              isActive && {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 10,
                opacity: 0.9
              }
            ]}>
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
          </TouchableOpacity>
        </Swipeable>
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView style={globalScreenStyles.contenedorGlobal}>
      <View style={globalScreenStyles.contenedorContenido}>

        <Text style={globalScreenStyles.tituloPantalla}>
          Mis Favoritos
        </Text>

        {productosFavoritos.length === 0 ? (
          <View style={favoritosStyles.contenedorVacio}>
            <Text style={favoritosStyles.textoVacio}>
              No tenés productos guardados aún.
            </Text>
          </View>
        ) : (
          <DraggableFlatList
            data={productosFavoritos}
            keyExtractor={(item) => `favorito-id-${item.id}`}
            renderItem={renderItem}
            onDragEnd={({ data }) => guardarNuevoOrden(data)}
            showsVerticalScrollIndicator={false}
            activationDistance={20}
            delayLongPress={200}
            containerStyle={{ flex: 1 }}
          />
        )}

      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  textoInstruccion: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
    fontStyle: 'italic',
  },

  botonEliminarSwipe: {
    backgroundColor: '#dc3545',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '84%',
    borderRadius: 8,
    marginBottom: 12,
  },
});
