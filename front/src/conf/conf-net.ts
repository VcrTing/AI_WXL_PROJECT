import { userStore } from "@/memory/user/user-store"
import { NET_ENDPOINTS_APP, NET_ENDPOINTS_BKD, NET_ENDPOINTS_BUSINESS } from "./conf-endpoints"

// 1. 用户 role 要设置对，
// 2. role 的权限要设置对
// 3. 接口要开放 token 访问。
// 4. 用户不能是 blocked = true
export const NET_BASIC_YOU = {
    saak: 'vcrting@163.com', // 'vcrting@163.com',
    spec: 'qiong123456'
}


const IS_DEV_MODE = true

const __API_NAME_STRAPI = 'api'

const __LINK_STRAPI = IS_DEV_MODE ? 'http://localhost:1337' : ''

const __API_NAME_BACKEND = ''

const __LINK_BACKEND =  'http://localhost:7070'

// 数据来源
export const FILE: string = 'FILE'
// 数据来源
export const APP: string = 'APP'
export const BKD: string = 'BKD'
export const BUSINESS: string = 'BUSINESS'
// 全局配置
export const NET = {
    // 负责 应用、不使用 TOKEN 的东西，
    APP: {
        URI: __LINK_STRAPI, API: __API_NAME_STRAPI,
        TIMEOUT_GET: 1000 * 30, TIMEOUT_POS: 1000 * 30,
        IS_LOG: true,
        JWT_FUNCTION: (): string => {
            return ''
        }
    },
    BKD: {
        URI: __LINK_BACKEND, API: __API_NAME_BACKEND,
        TIMEOUT_GET: 1000 * 30, TIMEOUT_POS: 1000 * 30,
        IS_LOG: true,
        JWT_FUNCTION: (): string => {
            return userStore().token_auth || ''
        }
    },
    BUSINESS: {
        URI: __LINK_BACKEND, API: __API_NAME_BACKEND,
        TIMEOUT_GET: 1000 * 30, TIMEOUT_POS: 1000 * 30,
        IS_LOG: true,
        JWT_FUNCTION: (): string => {
            return userStore().token_auth || ''
        }
    }
}


/**
 * 网络 LINK 合集 ====================================================================================================
 */
// 网站的 endpoint，key 名字和 上面的要对应
export const NET_ENDPOINTS = <ONEO>{
    'APP': NET_ENDPOINTS_APP,
    'BKD': NET_ENDPOINTS_BKD,
    'BUSINESS': NET_ENDPOINTS_BUSINESS
}

/**
 * 网络错误信息 ====================================================================================================
 */
export const NET_ERRORS_TXT = <ONE>{
    'request:fail': '网络波动 / 本次未检测到服务器。',
    'request:fail timeout': '网络超时，请重试。',
    'Internal Server Error': '接口请求出错，请联络管理员。现在这个情况一般是登录失效了'
}