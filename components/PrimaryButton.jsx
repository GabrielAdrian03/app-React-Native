import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { botonStyles as styles } from '../styles/componentStyles';

export default function PrimaryButton({ titulo, onPress, tipo = 'principal', estiloCustom }) {
  // Definimos estilos dinámicos según el tipo de botón
  const esPeligro = tipo === 'peligro';
  
  return (
    <TouchableOpacity 
      style={[
        styles.botonBase, 
        esPeligro ? styles.botonPeligro : styles.botonNormal,
        estiloCustom //pasa márgenes o anchos específicos
      ]} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <Text style={[styles.textoBase, esPeligro ? styles.textoPeligro : styles.textoNormal]}>
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}
