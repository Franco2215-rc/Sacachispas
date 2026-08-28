/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estatico: genera la carpeta `out/` que Capacitor empaqueta en el APK
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Rutas relativas para que los assets carguen desde el sistema de archivos del WebView (file://)
  trailingSlash: true,
}

export default nextConfig
