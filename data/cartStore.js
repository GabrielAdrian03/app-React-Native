// data/cartStore.js

let itemsCarrito = [];
let suscriptores = [];

const notificar = () => {
  suscriptores.forEach(callback => callback([...itemsCarrito]));
};

export const cartStore = {
  obtenerItems: () => itemsCarrito,

  agregarProducto: (producto) => {
    const existe = itemsCarrito.find(item => item.id === producto.id);
    if (existe) {
      existe.cantidad += 1;
    } else {
      itemsCarrito.push({ ...producto, cantidad: 1 });
    }
    notificar();
  },

  restarProducto: (id) => {
    const existe = itemsCarrito.find(item => item.id === id);
    if (existe) {
      existe.cantidad -= 1;
      if (existe.cantidad <= 0) {
        itemsCarrito = itemsCarrito.filter(item => item.id !== id);
      }
      notificar();
    }
  },

  eliminarProducto: (id) => {
    itemsCarrito = itemsCarrito.filter(item => item.id !== id);
    notificar();
  },

  vaciarCarrito: () => {
    itemsCarrito = [];
    notificar();
  },

  suscribir: (callback) => {
    suscriptores.push(callback);
    return () => {
      suscriptores = suscriptores.filter(cb => cb !== callback);
    };
  }
};
