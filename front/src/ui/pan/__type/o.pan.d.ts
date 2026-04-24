
/*
interface OPanConf {
    zindex: number
    idx: number
    hui: number
    dirc: 'b' | 'i' | 'r' | 't'
    inner: boolean
    freeze: boolean

    iive: boolean
    show: boolean
}
*/

type ORIENTATION = 't' | 'r' | 'b' | 'l' | 'i' | 'c'

// 有参数则启动，无参数则不启动
interface ElePanConf {
    idx: number
    dirc: ORIENTATION
    opacity: number
    h?: string
    kiii?: boolean
    close?: boolean
}

interface ElePan {
    iive: boolean, // 死亡
    show: boolean, // 展示

    z_index: number,
    idx: number,
    clazz: string,

    orientation: ORIENTATION, // 要什么方位，默认 右边

    hui: number, // 灰，>= 0 表示启动
    hui_opacity: number, // 灰 层 透明度，默认 0.4，超过 0.6 只能 0.6
    hui_can_close: boolean | undefined, // 灰层可否关闭弹框

    inner: boolean

    path: string, // 组件路径，用于 import 动态加载 组件

    component: ONE | null // 组件内容
}