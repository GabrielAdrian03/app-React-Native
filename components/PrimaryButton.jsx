import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { botonStyles as styles } from '../styles/componentStyles';

export default function PrimaryButton({ titulo, onPress, tipo = 'principal', estiloCustom }) {
  // Definimos estilos dinámicos según el tipo de botón
  const esPeligro = tipo === 'peligro';
  const esFavorito = tipo === 'favoritos';
  
  let estiloTipoBoton = styles.botonNormal;
  if (esPeligro) estiloTipoBoton = styles.botonPeligro;
  if (esFavorito) estiloTipoBoton = styles.botonFavorito;

let estiloTipoTexto = styles.textoNormal;
  if (esPeligro) estiloTipoTexto = styles.textoPeligro;
  if (esFavorito) estiloTipoTexto = styles.textoFavorito;

  return (
    <TouchableOpacity 
      style={[
        styles.botonBase, 
        estiloTipoBoton,
        estiloCustom //pasa márgenes o anchos específicos
      ]} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <Text style={[styles.textoBase, estiloTipoTexto]}>
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}
