import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { nextTick, type App } from "vue";

// 1. 导入核心方法和组件
import { library } from '@fortawesome/fontawesome-svg-core'
import { runinfreeAsync } from "@/tool/util/future";
import { uiStore } from "@/memory/app/ui-store";
// 2. 导入你需要的具体图标（例如：咖啡图标和用户图标）

// https://fontawesome.com/search?q=home&ic=free-collection
// 
export const fontawesome_install = () => {
    runinfreeAsync(async () => {
        const { faCoffee } = await import('@fortawesome/free-solid-svg-icons')
        const { faUser, faHouse, faPenToSquare } = await import('@fortawesome/free-regular-svg-icons')
        // 3. 将图标添加到库中
        const ICONS = [ faHouse, faUser, faPenToSquare ]
        library.add(ICONS)

        //
        await nextTick()
        setTimeout(() => { const ui = uiStore(); ui.icon_load_status = 1 }, 500);
    })
}

export const install_font_awesome_icon = (vue: App) => {
    
    vue.component('FontAwesomeIcon', FontAwesomeIcon)
    
}