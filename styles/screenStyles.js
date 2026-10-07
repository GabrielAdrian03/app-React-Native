import { StyleSheet } from 'react-native';
import { Colores, Tipografia } from '../constants/theme';

export const globalScreenStyles = StyleSheet.create({
  contenedorGlobal: {
    flex: 1,
    backgroundColor: Colores.fondo,
  },
  contenedorContenido: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 80,
  }
});

export const productDetailStyles = StyleSheet.create({
  contenedorGlobal: {
    flex: 1,
    backgroundColor: Colores.blanco,
  },
  scrollContenedor: {
    paddingBottom: 30,
  },
  imagen: {
    width: '100%',
    height: 300,
  },
  contenedorDetalles: {
    padding: 20,
  },
  titulo: {
    ...Tipografia.tituloGrande,
    color: Colores.textoPrincipal,
    marginBottom: 8,
  },
  precio: {
    fontSize: 22,
    fontWeight: '700',
    color: Colores.primario,
    marginBottom: 16,
  },
  divisor: {
    height: 1,
    backgroundColor: '#eaeaea',
    marginVertical: 16,
  },
  subtitulo: {
    ...Tipografia.subtitulo,
    color: Colores.textoPrincipal,
    marginBottom: 8,
  },
  descripcion: {
    ...Tipografia.cuerpo,
    color: Colores.textoSecundario,
    marginBottom: 24,
  },
  contenedorError: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colores.fondo,
  },
  textoError: {
    ...Tipografia.subtitulo,
    color: Colores.textoPrincipal,
    marginBottom: 16,
  },
});

export const perfilStyles = StyleSheet.create({
  scrollContenedor: {
    padding: 16,
    paddingBottom: 30,
  },
  tarjetaUsuario: {
    backgroundColor: Colores.blanco,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  avatarSimulado: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colores.primario,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textoAvatar: {
    color: Colores.blanco,
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoUsuario: {
    flex: 1,
  },
  nombre: {
    ...Tipografia.subtitulo,
    fontWeight: 'bold',
    color: Colores.textoPrincipal,
  },
  email: {
    ...Tipografia.detalle,
    color: Colores.textoSecundario,
    marginTop: 2,
  },
  contenedorMenu: {
    backgroundColor: Colores.blanco,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colores.borde,
  },
  textoItemContenedor: {
    flex: 1,
  },
  tituloItem: {
    fontSize: 16,
    fontWeight: '500',
    color: Colores.textoPrincipal,
  },
  subtituloItem: {
    ...Tipografia.detalle,
    color: Colores.textoMutado,
    marginTop: 2,
  },
  flecha: {
    fontSize: 22,
    color: '#cccccc',
    marginLeft: 8,
  },
});

export const favoritosStyles = StyleSheet.create({
  contenedorVacio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoVacio: {
    ...Tipografia.cuerpo,
    color: Colores.textoMutado,
    textAlign: 'center',
  },
});
