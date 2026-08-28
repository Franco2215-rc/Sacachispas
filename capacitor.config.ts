import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.pakova.cocacolaarrow',
  appName: 'Coca-ColaArrow',
  // Carpeta generada por `next build` con output: 'export'
  webDir: 'out',
  android: {
    // Permite que el WebView cargue los assets locales correctamente
    allowMixedContent: true,
  },
}

export default config
