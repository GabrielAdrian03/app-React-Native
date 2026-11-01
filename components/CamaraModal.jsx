import { FontAwesome } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Cámara dentro de la app: la app nunca pasa a segundo plano,
// así que Android no la mata por falta de memoria.
export default function CamaraModal({ visible, onCerrar, onFotoTomada }) {
  const camaraRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [permiso, pedirPermiso] = useCameraPermissions();
  const [lado, setLado] = useState('front');
  const [listo, setListo] = useState(false);
  const [procesando, setProcesando] = useState(false);

  // Al cerrar el modal la cámara se desmonta, así que reiniciamos el estado
  useEffect(() => {
    if (!visible) {
      setListo(false);
      setProcesando(false);
    }
  }, [visible]);

  const tomarFoto = async () => {
    if (!camaraRef.current || !listo || procesando) return;

    try {
      setProcesando(true);
      const foto = await camaraRef.current.takePictureAsync({ quality: 0.5 });
      if (foto?.uri) {
        onFotoTomada(foto.uri);
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    } finally {
      setProcesando(false);
    }
  };

  const alternarCamara = () => {
    setListo(false);
    setLado((actual) => (actual === 'front' ? 'back' : 'front'));
  };

  const renderContenido = () => {
    // Todavía se está consultando el permiso
    if (!permiso) {
      return <View style={estilos.centrado} />;
    }

    // Sin permiso: pedirlo
    if (!permiso.granted) {
      return (
        <View style={estilos.centrado}>
          <Text style={estilos.mensaje}>Necesitamos acceso a la cámara para tomar tu foto.</Text>
          <TouchableOpacity style={estilos.botonPermiso} onPress={pedirPermiso}>
            <Text style={estilos.textoBotonPermiso}>Dar permiso</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCerrar} style={{ marginTop: 16 }}>
            <Text style={{ color: '#ccc' }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <CameraView
          ref={camaraRef}
          style={StyleSheet.absoluteFill}
          facing={lado}
          onCameraReady={() => setListo(true)}
        />

        {/* Botón cerrar */}
        <TouchableOpacity
          onPress={onCerrar}
          style={[estilos.botonCircular, { position: 'absolute', top: insets.top + 12, left: 16 }]}
        >
          <FontAwesome name="close" size={20} color="#fff" />
        </TouchableOpacity>

        {/* Controles inferiores */}
        <View style={[estilos.controles, { paddingBottom: insets.bottom + 24 }]}>
          <View style={{ width: 48 }} />

          <TouchableOpacity
            onPress={tomarFoto}
            disabled={!listo || procesando}
            activeOpacity={0.7}
            style={[estilos.botonDisparo, (!listo || procesando) && { opacity: 0.5 }]}
          >
            {procesando ? <ActivityIndicator color="#3a04fc" /> : <View style={estilos.centroDisparo} />}
          </TouchableOpacity>

          <TouchableOpacity onPress={alternarCamara} style={estilos.botonCircular}>
            <FontAwesome name="refresh" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onCerrar} statusBarTranslucent>
      <View style={estilos.contenedor}>{renderContenido()}</View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#000',
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  mensaje: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  botonPermiso: {
    backgroundColor: '#3a04fc',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  textoBotonPermiso: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  botonCircular: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controles: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  botonDisparo: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centroDisparo: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 3,
    borderColor: '#3a04fc',
    backgroundColor: '#fff',
  },
});