# Cómo generar el APK "Coca-ColaArrow"

Este proyecto ya está configurado para empaquetarse como app de Android con **Capacitor**.
El código web se exporta de forma estática (`out/`) y Capacitor lo mete dentro de un
WebView nativo para producir el `.apk`.

> No es posible compilar el APK dentro de v0 (no hay Android SDK/Gradle en ese entorno).
> Estos pasos se corren **en tu computadora** una sola vez.

---

## 1. Requisitos (instalar una vez)

- **Node.js 18+** y **pnpm** (o npm).
- **Java JDK 17** (Temurin/OpenJDK).
- **Android Studio** (incluye el Android SDK y Gradle). Ábrelo una vez y deja que
  descargue el SDK por defecto.

Verifica en la terminal:

```bash
node -v
java -version
```

---

## 2. Descargar el proyecto

En v0, botón **···** (arriba a la derecha del bloque) → **Download ZIP**.
Descomprime y entra a la carpeta:

```bash
cd tu-proyecto
pnpm install     # o: npm install
```

---

## 3. Generar los íconos de la app (una vez)

Ya incluí `resources/icon.png` (1024×1024) con el logotipo de Coca-Cola y la botella. Genera todos los tamaños:

```bash
npx @capacitor/assets generate --android
```

---

## 4. Crear el proyecto Android (una vez)

```bash
npx cap add android
```

Esto crea la carpeta `android/`.

---

## 5. Compilar el APK

Cada vez que cambies el código, corre:

```bash
pnpm run android:apk
```

Ese comando hace `next build` → `cap sync android` → `gradlew assembleDebug`.

El APK queda en:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

Copia ese archivo a tu teléfono o tablet Android e instálalo (activa
"Instalar apps de fuentes desconocidas" si te lo pide). ¡Listo!

---

## Alternativa: abrir en Android Studio

Si prefieres botones en vez de terminal:

```bash
pnpm run cap:sync    # next build + cap sync
pnpm run cap:open    # abre Android Studio
```

En Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**.

---

## APK firmado para publicar (Play Store / distribución)

El `assembleDebug` sirve para pruebas. Para una versión firmada de lanzamiento:

1. En Android Studio: **Build → Generate Signed Bundle / APK**.
2. Crea un *keystore* (guárdalo bien, lo necesitarás para cada actualización).
3. Elige **release** y genera el `.apk` o `.aab`.

---

## Datos de la app

- **Nombre:** Coca-ColaArrow
- **App ID:** `com.pakova.cocacolaarrow`
- **Config:** `capacitor.config.ts`
