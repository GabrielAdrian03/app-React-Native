import { SafeAreaView } from 'react-native-safe-area-context'; // 👈 EL CORRECTO
import { View, Text, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import ProductCard from '../../components/ProductCard';
import { misProductos } from '../../data/products';
import { globalScreenStyles, favoritosStyles } from '../../styles/screenStyles';

export default function FavoritosScreen() {
  const router = useRouter();
  const productosFavoritos = misProductos.filter(p => p.id === 1 || p.id === 3);

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
