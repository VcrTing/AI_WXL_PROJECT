import { storage } from "@/tool/web/storage";
import { defineStore } from "pinia";
import { ref } from "vue";

//
const THEME_DARK = 'dark'
const THEME_LIGHT = 'light'

export type THEME_NAME = 'dark' | 'light'

const persist = {
    storage: storage,
    key: 'ui-store',
    paths: [ 'theme_name' ],
}

export const uiStore = defineStore('ui', () => {
    // STATE
    // 主题名字
    const theme_name = ref<THEME_NAME>(THEME_LIGHT)
    // 图标加载状态
    const icon_load_status = ref<number>(0)

    // FUNCTION
    const changeThemeName = (n: THEME_NAME) => {
        theme_name.value = n
    }

    // 
    return {
        theme_name,
        icon_load_status,
        changeThemeName
    }
},
{ persist })

