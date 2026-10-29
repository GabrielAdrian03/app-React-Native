import { useState, useEffect, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_FAVORITOS = 'favoritos';
const suscriptores = new Set();

const notificarFavoritos = (favoritos) => {
  suscriptores.forEach((suscriptor) => suscriptor(favoritos));
};

export async function guardarFavoritos(favoritos) {
  await AsyncStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
  notificarFavoritos(favoritos);
}

export function useFavoritos(productoId, productoCompleto) {
  const [esFavorito, setEsFavorito] = useState(false);
  const revision = useRef(0);

  const comprobarFavorito = useCallback(async () => {
    const revisionActual = revision.current;

    try {
      const favoritosGuardados = await AsyncStorage.getItem(CLAVE_FAVORITOS);
      const favoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];

      if (revisionActual === revision.current) {
        setEsFavorito(
          Array.isArray(favoritos) &&
          favoritos.some((favorito) => String(favorito.id) === String(productoId))
        );
      }
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  }, [productoId]);

  useEffect(() => {
    const suscriptor = (favoritos) => {
      revision.current += 1;
      setEsFavorito(
        favoritos.some((favorito) => String(favorito.id) === String(productoId))
      );
    };

    suscriptores.add(suscriptor);
    if (productoId) {
      Promise.resolve().then(comprobarFavorito);
    }

    return () => suscriptores.delete(suscriptor);
  }, [productoId, comprobarFavorito]);

  const toggleFavorito = async () => {
    try {
      const favoritosGuardados = await AsyncStorage.getItem(CLAVE_FAVORITOS);
      const favoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
      const listaActual = Array.isArray(favoritos) ? favoritos : [];
      const yaEsFavorito = listaActual.some(
        (favorito) => String(favorito.id) === String(productoId)
      );

      if (yaEsFavorito) {
        await guardarFavoritos(
          listaActual.filter((favorito) => String(favorito.id) !== String(productoId))
        );
      } else {
        if (!productoCompleto) return false;
        await guardarFavoritos([...listaActual, productoCompleto]);
      }
      return true;
    } catch (error) {
      console.error('Error al guardar favorito:', error);
      return false;
    }
  };

  return { esFavorito, toggleFavorito, comprobarFavorito };
}
