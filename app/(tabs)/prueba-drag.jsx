import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import DraggableFlatList from 'react-native-draggable-flatlist';

const datosIniciales = [
  { id: '1', nombre: 'Producto 1', precio: 15000 },
  { id: '2', nombre: 'Producto 2', precio: 22000 },
  { id: '3', nombre: 'Producto 3', precio: 18000 },
  { id: '4', nombre: 'Producto 4', precio: 35000 },
  { id: '5', nombre: 'Producto 5', precio: 12000 },
  { id: '6', nombre: 'Producto 6', precio: 27000 },
  { id: '7', nombre: 'Producto 7', precio: 19000 },
  { id: '8', nombre: 'Producto 8', precio: 42000 },
];

export default function PruebaDrag() {
  const [datos, setDatos] = useState(datosIniciales);

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <View
        style={[
          styles.tarjeta,
          isActive && styles.tarjetaActiva,
        ]}
      >
        <View style={styles.informacion}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.precio}>
            ${item.precio.toLocaleString('es-AR')}
          </Text>
        </View>

        <Pressable
          style={styles.botonArrastrar}
          onLongPress={drag}
          delayLongPress={200}
          disabled={isActive}
        >
          <MaterialCommunityIcons
            name="drag"
            size={32}
            color="#64748b"
          />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Prueba de arrastre</Text>
        <Text style={styles.subtitulo}>
          Mantené presionado el ícono de seis puntos para mover
          los productos.
        </Text>
      </View>

      <DraggableFlatList
        data={datos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onDragEnd={({ data }) => {
          setDatos(data);
          console.log(
            'Nuevo orden:',
            data.map(item => item.id)
          );
        }}
        activationDistance={0}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        contentContainerStyle={styles.lista}
      />

      <View style={styles.pie}>
        <Text style={styles.textoPie}>
          Productos: {datos.length}
        </Text>

        <Pressable
          style={styles.botonReiniciar}
          onPress={() => setDatos(datosIniciales)}
        >
          <MaterialCommunityIcons
            name="refresh"
            size={18}
            color="#fff"
          />
          <Text style={styles.textoBoton}>Reiniciar orden</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },

  encabezado: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },

  subtitulo: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 6,
    lineHeight: 20,
  },

  lista: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  tarjeta: {
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  tarjetaActiva: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
    elevation: 6,
  },

  informacion: {
    flex: 1,
  },

  nombre: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },

  precio: {
    fontSize: 14,
    color: '#2563eb',
    marginTop: 5,
    fontWeight: '600',
  },

  botonArrastrar: {
    width: 48,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pie: {
    padding: 16,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textoPie: {
    color: '#475569',
    fontWeight: '600',
  },

  botonReiniciar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2563eb',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },

  textoBoton: {
    color: '#fff',
    fontWeight: '600',
  },
});