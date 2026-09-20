# 🛒 Mi Tiendita App (React Native + Expo Router)

¡Hola! Esta es una aplicación móvil de catálogo y carrito de compras armada con **Expo (SDK 57)**. Toda la navegación se maneja de forma automática mediante carpetas y archivos gracias a **Expo Router**.

---

## 📁 ¿Cómo está organizado el proyecto? (Para no perderse)

El cerebro de la app está en la carpeta `app/`. Cada archivo o carpeta adentro se convierte en una pantalla del celular de manera mágica:

*   **`app/_layout.jsx`**: El jefe supremo de la app. Revisa si iniciaste sesión. Si tenés sesión, te deja pasar; si no, te clava la pantalla de Login en la cara.
*   **`app/login.jsx`**: El formulario para entrar. (Usuario: `admin` | Clave: `1234`).
*   **`app/(tabs)/`**: Una carpeta con paréntesis. Los paréntesis significan "Grupo". Todo lo que esté adentro comparte la **barra de navegación de abajo**.
    *   `_layout.jsx`: Dibuja los botones de abajo (Inicio, Favoritos, Perfil).
    *   `index.jsx`: La pantalla de Inicio (`/`). Muestra la lista de productos.
    *   `favoritos.jsx`: La pantalla de favoritos (`/favoritos`).
    *   `perfil.jsx`: Tu perfil, donde además pusimos el **Carrito de Compras** en vivo y el botón de cerrar sesión.
*   **`app/producto/[id].jsx`**: Los corchetes significan "Ruta Dinámica". Es una sola pantalla que se adapta al producto que toques (ej: `/producto/1`, `/producto/2`). Abre a pantalla completa tapando la barra de abajo.

### 📦 Otras carpetas importantes:
*   `components/`: Botones y tarjetas reutilizables (para no escribir el mismo código mil veces).
*   `constants/Theme.js`: El tarro de pintura de la app. Si cambiás un color acá, cambia en toda la app de golpe.
*   `styles/`: Archivos sueltos de diseño para que las pantallas no tengan 500 líneas de código visual.
*   `data/`: Los datos de prueba (los auriculares de Antonio, remeras, etc.) y los "Stores" (mini bases de datos en memoria para el carrito y la sesión).

---

## 🧠 ¿Cómo funciona la "Magia" por detrás?

### 1. El Carrito en Vivo (`data/cartStore.js`)
No usamos librerías raras. Es un archivo de JavaScript simple que guarda tu lista de compras en una variable. Cuando tocás "Agregar al Carrito", el archivo le suma 1 al producto y le pega un grito a la pantalla de Perfil para que se actualice sola en tiempo real.

### 2. Guardar la Sesión (`data/authStore.js`)
Usamos `expo-secure-store`. Cuando ponés la clave bien, la app guarda un "Token" (un pase libre) adentro del chip seguro de tu celular. Si cerrás la app y la volvés a abrir, la raíz lee ese chip, ve que el pase sigue ahí y entrás directo sin escribir la contraseña.

### 3. El Grito Global de Cerrar Sesión
Cuando tocás "Cerrar Sesión" en el perfil, la app usa una herramienta nativa (`DeviceEventEmitter`) para mandarle una alerta a la raíz. La raíz la escucha, borra el token del chip y te manda instantáneamente al Login, bloqueando el resto de las pantallas.

---

## 🛠️ Cómo arrancar el proyecto en tu PC

Si te bajás este código en otra computadora o querés levantarlo de cero:

1.  **Instalar las dependencias (las tuercas del auto):**
    Abre la terminal en la carpeta del proyecto y ejecuta:
    ```bash
    npm install
    ```
    *Si te llega a tirar errores raros de versiones de React, forzalo con:*
    ```bash
    npm install --legacy-peer-deps
    ```

2.  **Encender el motor de Expo:**
    Ejecuta el servidor de desarrollo:
    ```bash
    npx expo start
    ```

3.  **Verlo en tu celular:**
    *   Descargate la app **Expo Go** en tu teléfono (Play Store o App Store).
    *   Asegurate de que tu PC y tu celular estén conectados **al mismo Wi-Fi**.
    *   Escaneá el código QR que te aparece en la pantalla de la compu con la cámara de tu celular y ¡listo!

### Aviso sobre la terminal:
*   Si cambiás nombres de carpetas y la app se vuelve ree loca, cerrá la terminal y ejecutá `npx expo start -c` (la `-c` borra el chip de memoria vieja de Expo y arranca limpio).
*   Si la pantalla se congela y no tomó un cambio, apretá la tecla **`r`** en la terminal para forzar la recarga del celular.
