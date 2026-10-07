import { Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { cardStyles as styles } from '../styles/componentStyles';
import { useFavoritos } from '../hooks/useFavoritos';

export default function ProductCard({ producto, onPress }) {
  const { esFavorito, toggleFavorito } = useFavoritos(producto.id, producto);

  return (
    <TouchableOpacity style={styles.tarjeta} onPress={onPress} activeOpacity={0.7}>
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
          ${producto.precio.toLocaleString('es-AR')}
        </Text>
        <Text style={styles.descripcion} numberOfLines={1}>
          {producto.descripcion}
        </Text>
      </View>

      {/* Botón de favorito */}
      <TouchableOpacity 
        style={styles.botonFavorito} 
        onPress={toggleFavorito}
        activeOpacity={0.7}>
        <FontAwesome 
          name={esFavorito ? 'star' : 'star-o'} 
          size={24} 
          color={esFavorito ? '#FFD700' : '#999'} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
