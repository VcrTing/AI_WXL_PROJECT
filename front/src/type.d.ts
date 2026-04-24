/*
    自定义的 全局 类型
*/

declare global {
    type BOOL = 'true' | 'false'

    type ONE = { [k: string]: any }
    type ONEO = { [k: string]: ONE }

    type ONE_NULL = ONE | null

    type MANY = ONE[ ]
    type MANY_NULL = MANY | null
    
    type SNN = string | number | null
    type SNNS = SNN[ ]

    // 异步
    type ONE_PROMISE = Promise<ONE>
    type MANY_PROMISE = Promise<MANY>
    
    // 后端
    type ORDER_BY = 'asc' | 'desc'
}

declare module 'dayjs'

declare module 'pinia-plugin-persistedstate' {
  import type { PiniaPlugin } from 'pinia'
  const plugin: PiniaPlugin
  export default plugin
}

export {};