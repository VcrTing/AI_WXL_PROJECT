<template>
    <view>
        <view :class="clazz">
            <view>
                <view v-for="(v, i) in data" :key="i">
                    <view class="app-mh px fx-aii-btn-def">
                        {{ v[ tit ] }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { serv_sql_select } from '@/serv/report/serv_report';
import sql_tooi from '@/tool/business/sql_tooi';
import { ref, watch } from 'vue';

const prp = withDefaults(defineProps<{
    sql: string
    modelValue: string
    tit: string
    clazz?: string
}>(), {
    modelValue: '',
    tit: 'id'
})
const emt = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()
const data = ref<MANY>()
const ioading = ref(false)

const funn = {
    // 
    fetching: async () => {
        const __sql = sql_tooi.replace_txt(prp.sql, prp.modelValue)
        const src: MANY = await serv_sql_select(__sql)
        data.value = src
    }
}

watch(() => prp.modelValue, () => {
    funn.fetching()
})
</script>