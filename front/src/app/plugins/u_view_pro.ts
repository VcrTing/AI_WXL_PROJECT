import type { App } from "vue"
import uViewPro from 'uview-pro'


export const install_u_view_pro = (vue: App) => {
    vue.use(uViewPro)
}