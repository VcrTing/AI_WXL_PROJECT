<template>
    <view v-if="me && me.iive" class="soft">
        <view 
            v-if="me.show"
            class="pan bg"
            :class="'pan-' + me.orientation"
            :style="{ 'z-index': me.z_index }"
        >
            <view class="pan-inner w-100 h-100 ps-r" :class="'ani-fade-' + me.orientation + '-s'">
                <slot></slot>
            </view>
        </view>

        <view class="pan pan-hui"
            v-if="is_hui && me.show" @tap="func.close"
            :style="{ 'z-index': (me.z_index - 1), 'opacity': (me.hui_opacity || 0) }"
        >
        </view>
    </view>
</template>

<script setup lang="ts">
import pan_tooi from '@/tool/app/pan_tooi';
import { computed, nextTick, ref, watch } from 'vue';
import { must_one } from '@/tool/util/valued';
import { appStore } from '@/memory/app/app-store';
import { future } from '@/tool/util/future';

const prp = defineProps<{ conf: ElePanConf }>()

const apps = appStore()
const me = ref<ElePan | undefined>()
const ioading = ref()
const is_hui = computed(() => pan_tooi.has_hui(me.value))

const func = {
    close: () => {
        if (must_one<ElePan>(me.value).hui_can_close) {
            pan_tooi.close(prp.conf.idx)
        }
    },
    init: () => future(ioading, async () => {
        me.value = await pan_tooi.ioc(prp.conf.idx)
    }),
    watch: () => future(ioading, async () => {
        me.value = await pan_tooi.ioc(prp.conf.idx)
    }),
}

nextTick(func.watch)
watch(apps.pans, func.watch)
</script>