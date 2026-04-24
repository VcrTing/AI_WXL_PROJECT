import { arrfindi } from "@/tool/util/iodash";
import { storage } from "@/tool/web/storage";
import { defineStore } from "pinia";
import { ref } from "vue";


const persist = {
    storage: storage,
    key: 'app-store',
    paths: [ 'theme_name' ],
}

export const appStore = defineStore('app', () => {
    
    // 弹出层
    const tip_msg = ref()
    const tip_type = ref()

    //
    const tipHide = () => { tip_msg.value = ''; tip_type.value = '' }
    const tipError = (msg: any) => { tip_msg.value = msg + ''; tip_type.value = ''; console.log('错误 =', msg) }

    //
    const pans = ref<ElePan[]>([])
    const hui = ref()
    const hui_zindex = ref()

    // 方法
    const pan_insert = (pan: ElePan) => {
        // console.log('pan =', pan)
        if (arrfindi(pans.value, pan.idx) < 0) pans.value.push(pan) 
    }
    const pan_kill = (pan: ElePan) => {
        let i: number = arrfindi(pans.value, pan.idx)
        if (i > -1) { pans.value.splice(i, 1) }
    }

    return {
        pans,
        hui,
        hui_zindex,
        pan_insert, 
        pan_kill,

        tip_msg,
        tip_type,
        tipHide,
        tipError
    }
},
{ persist })

