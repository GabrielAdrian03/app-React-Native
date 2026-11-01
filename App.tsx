import {
  Alert,
  Image,
  LogBox,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';
import { styles } from "./styles/screenStyles";

// Silenciar la advertencia ruidosa de Reanimated
LogBox.ignoreLogs(['[Reanimated] Dependencies should only be used on the web']);



export default function App() {
  const comprar = (nombreProducto) => {
    Alert.alert(
      'Confirmeishon',
      `¿Seguro quieres comprar ${nombreProducto}? ¡Es una estafa piramidal!`, 
      [
        { text: 'Sal de ahi Esponja!!!', style: 'cancel' },
        { 
          text: 'Ok...', 
          onPress: () => Alert.alert('Éxito', `¡Gracias por comprar ${nombreProducto}!`) 
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.pantalla}>
      {/* highlight-start */}
      {/* 2. Recorremos el arreglo usando .map() para renderizar las tarjetas automáticamente */}
      {PRODUCTOS.map((producto) => (
        <View key={producto.id} style={styles.tarjeta}>
          <Image 
            source={{ uri: producto.foto }} 
            style={styles.foto} 
            resizeMode="cover" 
          />
          <View style={styles.cuerpo}>
            <Text style={styles.titulo}>{producto.titulo}</Text>
            <Text style={styles.desc}>{producto.desc}</Text>
            <Text style={styles.precio}>{producto.precio}</Text>
            
            <Pressable 
              onPress={() => comprar(producto.titulo)}
              style={({ pressed }) => [
                styles.boton,
                pressed && styles.botonPressed
              ]}
            >
              <Text style={styles.textoBoton}>Comprar ahora, extranjero</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
