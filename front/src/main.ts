import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  //
  install_pinia(app)
  install_vue_query(app)
  install_u_view_pro(app)
  install_font_awesome_icon(app)
  return {
    app,
  }
}

import './ui/index.sass'
import { install_pinia } from './memory/install'
import { install_vue_query } from './app/plugins/vue_query'
import { install_u_view_pro } from './app/plugins/u_view_pro'
import { install_font_awesome_icon } from './app/plugins/font_awesome_icon'

