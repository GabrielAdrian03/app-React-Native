import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useFavoritos(productoId, productoCompleto) {
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    const comprobarFavorito = async () => {
      try {
        const favoritosGuardados = await AsyncStorage.getItem('favoritos');
        const favoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
        setEsFavorito(favoritos.some((fav) => fav.id === productoId));
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      }
    };
    comprobarFavorito();
  }, [productoId]);

  const toggleFavorito = async () => {
    try {
      const favoritosGuardados = await AsyncStorage.getItem('favoritos');
      let favoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];

      if (esFavorito) {
        favoritos = favoritos.filter((fav) => fav.id !== productoId);
      } else {
        favoritos.push(productoCompleto);
      }

      await AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));
      setEsFavorito(!esFavorito);
    } catch (error) {
      console.error('Error al guardar favorito:', error);
    }
  };

  return { esFavorito, toggleFavorito };
}
