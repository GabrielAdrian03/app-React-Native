import { Platform, StyleSheet } from 'react-native';
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
  },
  contenedorFilaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16, // Espaciado inferior
    paddingHorizontal: 4,
  },
  textoDestacado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colores.textoPrincipal,
  },
  textoCantidad: {
    fontSize: 14,
    color: '#666666', //contador de articulos
    fontWeight: '500',
  },
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

export const localStyles = StyleSheet.create({
  fondoModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)', // Fondo negro con 95% de opacidad
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorCerrar: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  textoCerrar: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  imagenPantallaCompleta: {
    width: '100%',
    height: '80%',
  },
  contenedorFilaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16, 
    paddingHorizontal: 4,
  },
  textoDestacado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  textoCantidad: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  contenedorCarga: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorMensaje: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarga: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  textoError: {
    color: '#c00',
    fontSize: 16,
    textAlign: 'center',
  },
});

export const styles = StyleSheet.create({
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
