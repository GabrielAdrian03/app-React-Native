import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, FlatList } from 'react-native';
import { useRouter, Stack } from 'expo-router'; // 1. Importa Stack
import ProductCard from '../../components/ProductCard';
import { misProductos } from '../../data/products';
import { globalScreenStyles as styles } from '../../styles/screenStyles';

export default function InicioScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.contenedorGlobal}>
      {/* 2. Configura el Header aquí */}
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Home', // Texto que aparecerá en el header
          headerTitleAlign: 'center',
          // Puedes agregar estilos personalizados aquí si lo deseas:
          headerStyle: { backgroundColor: '#3a04fc' },
          headerTintColor: '#fff',
        }} 
      />

      <View style={styles.contenedorContenido}>

        <Image 
          source={require('../../assets/banner.png')} 
          style={{ width: '100%', height: 120, alignSelf: 'center', marginBottom: 20 }} 
        />

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
