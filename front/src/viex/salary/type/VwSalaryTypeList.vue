<template>
    <view class="bg-hui">
        <view>
            <co-common-filter-bar :bars="bars"/>
        </view>

        <view class="">
            <view>
                <co-table
                    ref="otable"
                    :item-h="itemH"
                    :data="data"
                >
                    <!-- 循环渲染可见项 -->
                    <view
                    v-for="(item, i) in visibledData"
                    :key="item.id"
                    class="fx-s bg-hui"
                    :style="{ height: itemH + 'px' }"
                    >
                        <!-- 根据你的实际数据结构渲染内容 -->
                        <view class="px-row fx-i">
                            <view class="pi">{{ item['货号'] }}</view>
                            <view class="pi">{{ item['样衣编码'] }}</view>
                        </view>
                    </view>
                </co-table>
            </view>
        </view>
       
    </view>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, shallowRef } from 'vue'
import { appStore } from '@/memory/app/app-store'
import { serv_bb_master } from '@/serv/report/serv_bb_master'
import { is_str } from '@/tool/util/typed'
import CoTable from '@/components/table/CoTable.vue'
import CoCommonFilterBar from '@/components/filter/CoCommonFilterBar.vue'
import { gen_filter_bar_input } from '@/tool/common/filter_bar_tooi'

const itemH = 50

const apps = appStore()
const data = shallowRef<MANY>([ ])

const otable = ref()

// ----- 数据加载（保留原有逻辑）-----
const funn = {
    loaddata: async () => {
        // console.log('发起请求')
        const src: MANY | string = await serv_bb_master({})
        if (is_str(src)) {
            apps.tipError(src)
        } 
        else {
            data.value = src as MANY
            otable.value.rebuildScroll()
        }
    }
}

const visibledData = computed(() => {
    return otable.value?.computedData(data.value) || [ ]
})

nextTick(() => {
  funn.loaddata()
})

const bars = ref([ gen_filter_bar_input('search', '名称') ])
</script>