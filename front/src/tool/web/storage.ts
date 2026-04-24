
// 这里是 永久储存在 APP 端的
// 小程序 应该也是 永久储存的数据

// import { authGetters, authState } from "@/memory/global";

// 全程 同步储存
const local = {
    set: <T> (k: string, v: T): void => {
        uni.removeStorageSync(k)
        uni.setStorageSync(k, v)
        // console.log('-----> 已经存入 Storage =', k, v)
    },
    get: <T> (k: string): T => {
        const v = uni.getStorageSync(k);
        // console.log('-----> 取出 Storage =', k, v)
        return v;
    },
    remove: (k: string) => uni.removeStorageSync(k),
    clean: () => uni.clearStorageSync()
}

const session = {
    _global: (): ONE => {
        const app = getApp()
        return app ? app.globalData ? app.globalData : { } : { }
    },
    set: <T> (k: string, v: T): void => {
        const global: ONE = session._global()
        global[ k ] = v
        console.log('-----> 已经存入 Session =', k, v)
    },
    get: <T> (k: string, def: T | undefined = undefined): T | undefined => {
        const global: ONE = session._global()
        const v: T | undefined = global[ k ] ? global[ k ] : def
        console.log('-----> 取出 Session =', k, v)
        return v
    },
    remove: (k: string) => {
        const global: ONE = session._global()
        global[ k ] = undefined
        delete global[ k ]
    } 
}

// 废弃：统一先用 session，也就是 globalData
// 统一使用 local store

const __K_OF_APP_STORAGE = 'VCRT_'

export const storage: AppStorage = {
    getItem: <T> (k: string): T | undefined => {
        return local.get( __K_OF_APP_STORAGE + k )
    },
    setItem: <T> (k: string, v: T): void => {
        local.set( __K_OF_APP_STORAGE + k, v )
    },
    removeItem: (k: string) => {
        local.remove( __K_OF_APP_STORAGE + k )
    }
}


// 构建数据隔离 
// 仓库代表私人仓库
const key_prefix = () => {
    return __K_OF_APP_STORAGE // authGetters.userid + '_' + authGetters.company_id + '-'
}

export const warehouse = {
    get: <T> (k: string): T | undefined => local.get( key_prefix() + k ),
    set: <T> (k: string, v: T): void => local.set( key_prefix() + k, v ),
    remove: (k: string) => local.remove( key_prefix() + k ),
}
