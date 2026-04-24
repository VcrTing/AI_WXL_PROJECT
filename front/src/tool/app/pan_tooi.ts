import { appStore } from "@/memory/app/app-store"

const __PAN_Z_INDEX = 300
const __PAN_HUI_OPACITY = 0.4
const __PAN_HUI_CAN_CLOSE = true

const apps = appStore()

const hui_already = (): boolean => (apps.hui > 0)

const ioc = (idx: number): Promise<ElePan | undefined> => new Promise((rev) => {
    const pans: ElePan[] = apps.pans ? apps.pans : [ ]
    const src: ElePan[] = pans.filter((e: ElePan) => (e.idx == idx));
    rev((src.length == 0) ? undefined : src[0])
})

// z - index 与 idx 有关，与 进入顺序有关
const grow_z_index = (idx: number) => {
    const sq = Math.sqrt(idx)
    const src = (apps.pans || []).length
    return Math.floor( __PAN_Z_INDEX + (src * 2) + (sq * 2) )
}

const hui_is_hui = (hui: ElePanConf) => !hui.kiii // hui.kiii ? false : true

const generate_a_def = (idx: number, orientation: ORIENTATION, conf: ElePanConf, clazz: string): ElePan => ({
    iive: true,
    show: false,

    z_index: grow_z_index(idx),
    idx,
    orientation,

    clazz,
    inner: true,

    hui: hui_is_hui(conf) ? ( hui_already() ? 0 : 1 ) : 0, 
    hui_opacity: conf ? conf.opacity : __PAN_HUI_OPACITY, 
    hui_can_close: conf ? (conf.close === false ? false : __PAN_HUI_CAN_CLOSE) : __PAN_HUI_CAN_CLOSE, 

    path: '', 
    component: null // 组件内容
})

const __open_pan = (pan: ElePan): ElePan => {
    if (pan) { pan.iive = true; pan.show = true; } return pan
}

const has_hui = (pan: ElePan | undefined): boolean => (pan ? (pan.hui > 0) : false)

const __PAN_DIE_ANI_TIME = 362

// 自带杀掉 PAN
const close = async (idx: number) => {
    const pan: ElePan | undefined = await ioc(idx)
    pan ? __close(pan) : undefined
}

const __close = (pan: ElePan) => {
    pan.show = false; 
    setTimeout(async () => {
        pan.iive = false; 
        apps.pan_kill(pan)
    }, 
    __PAN_DIE_ANI_TIME)
}

// 便捷开启 PAN
const insert_and_open_def = async (conf: ElePanConf) => {
    const you: ElePan | undefined = await ioc(conf.idx)
    console.log('定位到 =', you)
    if (you) {
        // await close_pan(idx)
    } 
    else {
        apps.pan_insert( (__open_pan( generate_a_def(conf.idx, conf.dirc, conf, '') )) )
    }
}
const open = (conf: ElePanConf) => insert_and_open_def(conf)

// 所有有关 PAN 的操作都在这
export default {
    ioc,
    has_hui,
    generate_a_def,

    open,
    close
}


/*
const open_def_t = (conf: ElePanConf) => insert_and_open_def(conf)
const open_def_r = (conf: ElePanConf) => insert_and_open_def(conf)
const open_def_i = (conf: ElePanConf) => insert_and_open_def(conf)
const open_def_b = (conf: ElePanConf) => insert_and_open_def(conf)
*/
// 启用 INDEX MENU
/*
const INDEX_PAN_IDX = 1000
const open_index_menu = () => {
    insert_and_open_def({ idx: INDEX_PAN_IDX, dirc: 'i', opacity: 0.0 })
}
const close_index_menu = () => close_pan(INDEX_PAN_IDX)
*/