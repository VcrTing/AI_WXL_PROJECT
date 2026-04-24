<template>
    <view>
        <view v-for="(v, i) in bar">
            <view v-if="v.type=='search'" @tap="func.openSearch(v)">
                <o-input :label="v.label">
                    <input class="" v-model="v.__v" placeholder="搜索框"/>
                </o-input>
            </view>
            <view v-if="v.type=='timed'" @tap="func.openTimed(v)">
                <view>
                    <input class="inp inp-app" v-model="v.__v" placeholder="时间框"/>
                </view>
            </view>
            <view v-if="v.type=='menu'" @tap="func.openMenu(v)">
                <view>
                    <input class="inp inp-app" v-model="v.__v" placeholder="下拉框"/>
                </view>
            </view>
        </view>

        <o-pan :conf="pan_search">
            <o-pan-inner-y :conf="pan_search">
                <view v-if="searchitem && searchitem.type">
                    <view class="fx-c app-mh">
                        <view class="h5">{{ searchitem.label }}{{ searchitem.__num }}</view>
                    </view>
                    <view class="fx-s">
                        <input class="app-mh px-row fx-1" v-model="searchitem.__v" placeholder="请输入要搜索的内容"/>
                        <view class="pr-row"><o-button @tap="() => (searchitem.__num += 1)" :ioading="searchitem.ioading">搜索</o-button></view>
                    </view>
                    <co-search-content v-model="searchitem.__v" :item="searchitem" :clazz="'mh-16em'"/>
                </view>
            </o-pan-inner-y>
        </o-pan>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CoSearchContent from '@/components/search/CoSearchContent.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import OInput from '@/ui/form/OInput.vue';
import OPan from '@/ui/pan/OPan.vue';
import OPanInnerY from '@/ui/pan/OPanInnerY.vue';
import { ref, watch } from 'vue';

// const prp = defineProps<{}>()
const searchitem = ref()
const pan_search = <ElePanConf>{ idx: 101, dirc: 'b', opacity: 0.2, close: true }

const func = {
    openSearch: (v: ONE) => {
        searchitem.value = v
        pan_tooi.open(pan_search)
    },
    openMenu: (v: ONE) => {

    },
    openTimed: (v: ONE) => {

    }
}

const bar = ref([
    {
        sql: "select top 10 itemcode code from OITM where itemcode like '%#codeParam#%' order by  ItemCode",
        type: "search", ioading: false, __num: 0,
        __v: '', k: 'ItemCode', label: '货号'
    },
    {
        sql: "",
        type: "timed", ioading: false, __num: 0,
        __v: '', k: 'startTime', label: '开始时间'
    },
    {
        sql: "",
        type: "timed", ioading: false, __num: 0,
        __v: '', k: 'endTime', label: '结束时间'
    },
    {
        sql: "", menu: [ { value: '2025', label: '2025' }, { value: '2026', label: '2026' }, { value: '2027', label: '2027' } ],
        type: "menu", ioading: false, __num: 0,
        __v: '', k: 'U_NF', label: '年份'
    },
    {
        sql: " select distinct U_LX code from OITM where isnull(U_LX,'')<>'' and U_LX like '%#codeParam#%' order by U_LX",
        type: "search", ioading: false, __num: 0,
        __v: '', k: 'U_LX', label: '路线'
    },
])

watch(() => bar.value, () => {
    console.log('内部发生变动')
})
</script>