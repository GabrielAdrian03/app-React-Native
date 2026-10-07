import { StyleSheet } from 'react-native';
import { Colores, Tipografia, Sombras } from '../constants/theme';

export const botonStyles = StyleSheet.create({
  botonBase: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  botonNormal: {
    backgroundColor: Colores.primario,
  },
  botonPeligro: {
    borderColor: Colores.peligro,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  textoBase: {
    ...Tipografia.subtitulo,
  },
  textoNormal: {
    color: Colores.blanco,
  },
  textoPeligro: {
    color: Colores.peligro,
  },
  botonFavorito: {
    backgroundColor: '#e7f5ff',
    borderWidth: 1,
    borderColor: '#d0ebff',
  },
  textoFavorito: {
    color: '#0070f3',
    fontWeight: '600',
  },
});

export const cardStyles = StyleSheet.create({
  tarjeta: {
    backgroundColor: Colores.blanco,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    overflow: 'hidden',
    ...Sombras.suave,
  },
  imagen: {
    width: 110,
    height: 110,
    borderRadius: 12,
  },
  contenedorInfo: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  botonFavorito: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titulo: {
    ...Tipografia.subtitulo,
    color: Colores.textoPrincipal,
  },
  precio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colores.primario,
    marginVertical: 4,
  },
  descripcion: {
    ...Tipografia.detalle,
    color: Colores.textoSecundario,
  },
});
