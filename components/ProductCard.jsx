import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFavoritos } from '../hooks/useFavoritos';
//import { cardStyles as styles } from '../styles/componentStyles';

import { StyleSheet } from 'react-native';
import { Colores, Sombras, Tipografia } from '../constants/theme';

export default function ProductCard({
  producto,
  onPress,
  onToggleFavoritoCallback = null,
}) {
  const { esFavorito, toggleFavorito } = useFavoritos(
    producto.id,
    producto
  );

  const handleToggle = async () => {
    const actualizado = await toggleFavorito();

    if (actualizado && onToggleFavoritoCallback) {
      onToggleFavoritoCallback();
    }
  };

  return (
    <View style={styles.tarjeta}>
      <TouchableOpacity
        style={styles.contenido}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: producto.imagen }}
          style={styles.imagen}
          resizeMode="cover"
        />

        <View style={styles.contenedorInfo}>
          <Text style={styles.titulo} numberOfLines={2}>
            {producto.titulo}
          </Text>

          <Text style={styles.precio}>
            ${Number(producto.precio ?? 0).toLocaleString('es-AR')}
          </Text>

          <Text
            style={styles.descripcion}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {producto.descripcion}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonFavorito}
        onPress={handleToggle}
        activeOpacity={0.5}
      >
        <FontAwesome
          name={esFavorito ? 'star' : 'star-o'}
          size={24}
          color={esFavorito ? '#FFD700' : '#999'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: Colores.blanco,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 330,
    overflow: 'hidden',
    ...Sombras.suave,
  },

  contenido: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },

  imagen: {
    width: 110,
    height: 110,
    borderRadius: 12,
  },

  contenedorInfo: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },

  botonFavorito: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titulo: {
    ...Tipografia.subtitulo,
    color: Colores.textoPrincipal,
  },

  precio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colores.primario,
    marginVertical: 4,
  },

  descripcion: {
    ...Tipografia.detalle,
    color: Colores.textoSecundario,
  },
});