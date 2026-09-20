import React from 'react';
import { StyleSheet, View, Text, Image, Pressable, Alert, Platform, ScrollView } from 'react-native';

const PRODUCTOS = [
  {
    id: '1',
    titulo: 'Audio-Technica ATH-M20x',
    desc: 'Auriculares piola.',
    precio: 'usd \$49.000',
    foto: 'https://http2.mlstatic.com/D_NQ_NP_2X_804695-MLU77654873467_072024-F.webp',
  },
  {
    id: '2',
    titulo: 'zapatisha de Porteñolandia',
    desc: 'Alta shanta para andar en casa.',
    precio: 'usd \$65.500',
    foto: 'https://acdn-us.mitiendanube.com/stores/493/394/products/baru-negra-de-frente-fondo-blanco-3a62518749755a083d17449132503951-1024-1024.webp',
  },
  {
    id: '3',
    titulo: 'Chaqueta de Ghost Rider',
    desc: 'Chaqueta de cuero estilo motociclista con cierres reforzados y calce perfecto.',
    precio: 'usd \$120.000',
    foto: 'https://acdn-us.mitiendanube.com/stores/934/092/products/chamarra-oz-biker-producto-693b615079d8aaa86d17591977408005-1024-1024.webp',
  },
];

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

const styles = StyleSheet.create({
  pantalla: { 
    paddingVertical: 40, 
    backgroundColor: '#71aae4',
    alignItems: 'center', 
    paddingHorizontal: 20,
    gap: 20
  },
  tarjeta: { 
    width: 300, 
    backgroundColor: '#8372b6',
    borderRadius: 20, 
    overflow: 'hidden',
    ...Platform.select({
      android: { elevation: 6 },
      ios: { 
        shadowColor: '#0A2540', 
        shadowOpacity: 0.12,
        shadowRadius: 12, 
        shadowOffset: { width: 0, height: 6 } 
      },
      web: {
        shadowColor: '#0A2540',
        shadowOpacity: 0.10,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
        borderWidth: 1,
        borderColor: '#E6EAEF'
      }
    }) 
  },
  foto: { 
    width: '100%', 
    height: 180 
  },
  cuerpo: { 
    padding: 20 
  },
  titulo: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#0F3D6E',
    letterSpacing: -0.3
  },
  desc: { 
    fontSize: 14, 
    color: '#65778B', 
    marginTop: 6,
    lineHeight: 18
  },
  precio: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: '#1A1C1E',
    marginTop: 14 
  },
  boton: { 
    backgroundColor: '#1B5FA8', 
    paddingVertical: 14,
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 18,
    elevation: 2
  },
  botonPressed: { 
    backgroundColor: '#0F3E6E', 
    opacity: 0.95,
    transform: [{ scale: 0.98 }] 
  },
  textoBoton: { 
    color: '#FFFFFF', 
    fontWeight: '600', 
    fontSize: 16 
  },
});
