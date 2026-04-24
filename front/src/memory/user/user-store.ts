import type { Auth } from "@/app/zod/zod_entity_user";
import { storage } from "@/tool/web/storage";
import { defineStore } from "pinia";
import { computed, ref } from "vue";


const persist = {
    storage: storage,
    key: 'user-store',
    paths: [ 'token_auth', 'auth', 'auth_username', 'auth_password' ],
}

export const userStore = defineStore('user', () => {
    // STATE
    const token_auth = ref()

    // 正确登录账密码
    const auth_username = ref('')
    const auth_password = ref('')
    
    // 登录数据
    const auth = ref<Auth>()

    // 常用数据
    const realname = computed(() => (auth.value?.user?.realname || ''))

    const is_login = computed(() => !!auth.value?.jwt)
    
    // 方法
    const saveLoginData = (data: Auth): boolean => {
        console.log('保存登录数据 =', data)
        auth.value = data
        token_auth.value = data.jwt
        return true
    }

    // 
    return {
        auth,
        token_auth,
        auth_username,
        auth_password,

        realname,
        is_login,

        saveLoginData
    }
},
{ persist })

