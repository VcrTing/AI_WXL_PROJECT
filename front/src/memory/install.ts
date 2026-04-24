
import type { App } from 'vue'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const install_pinia = (vue: App) => {
    
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)

    vue.use(pinia)
}