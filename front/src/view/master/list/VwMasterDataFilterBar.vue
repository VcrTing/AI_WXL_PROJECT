<template>
    <view>
        <view v-for="(v, i) in bar">
            <view v-if="v.type=='search'" @tap="func.openSearch(v)">
                <ui-input :label="v.label">
                    <input class="" v-model="v.__v" placeholder="搜索框"/>
                </ui-input>
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
                        <view class="h5">{{ searchitem.label }}</view>
                    </view>
                    <view class="">
                        <input class="app-mh px-row" v-model="searchitem.__v" placeholder="搜索框"/>
                    </view>
                    <co-search-content v-model="searchitem.__v" :sql="searchitem.sql" :clazz="'mh-16em'"/>
                </view>
            </o-pan-inner-y>
        </o-pan>
    </view>
</template>

<script setup lang="ts">
import CoSearchContent from '@/components/search/CoSearchContent.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import UiInput from '@/ui/form/UiInput.vue';
import OPan from '@/ui/pan/OPan.vue';
import OPanInnerY from '@/ui/pan/OPanInnerY.vue';
import { ref, watch } from 'vue';

// const prp = defineProps<{}>()
const searchitem = ref()
const pan_search = <ElePanConf>{ idx: 1001, dirc: 'b', opacity: 0.2, close: true }

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
        type: "search",
        __v: '', k: 'ItemCode', label: '货号'
    },
    {
        sql: "",
        type: "timed",
        __v: '', k: 'startTime', label: '开始时间'
    },
    {
        sql: "",
        type: "timed",
        __v: '', k: 'endTime', label: '结束时间'
    },
    {
        sql: "", menu: [ { value: '2025', label: '2025' }, { value: '2026', label: '2026' }, { value: '2027', label: '2027' } ],
        type: "menu",
        __v: '', k: 'endTime', label: '年份'
    }
])

watch(() => bar.value, () => {
    console.log('内部发生变动')
})
</script>