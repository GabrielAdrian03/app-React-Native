import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import ProductCard from '../../components/ProductCard';
import { misProductos } from '../../data/products';
import { globalScreenStyles as styles } from '../../styles/screenStyles';

export default function InicioScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.contenedorGlobal}>
      <View style={styles.contenedorContenido}>
        <Text style={styles.tituloPantalla}>Nuestros Productos</Text>
        <FlatList
          data={misProductos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard producto={item} onPress={() => router.push(`/producto/${item.id}`)} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
