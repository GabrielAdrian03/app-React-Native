import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { cardStyles as styles } from '../styles/componentStyles';

export default function ProductCard({ producto, onPress }) {
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
    </TouchableOpacity>
  );
}
