<template>
	<view>
		<u-toast ref="uToastRef" />
	</view>
</template>

<script setup lang="ts">
import { future } from '@/tool/util/future'
import { ref, watch } from 'vue'

const prp = defineProps({
    msg: { type: String },
    type: { type: String, default: 'error' },
    duration: { type: Number, default: 2400 }
})
const emt = defineEmits([ 'close' ])

const uToastRef = ref()
const running = ref(false)

watch(() => prp.msg, () => {
    if (!prp.msg) return;
    future(running, () => new Promise((rev) => {
        uToastRef.value?.show({
            title: prp.msg,
            type: prp.type || 'error',
            duration: (prp.type === 'error' ? (prp.duration + 800) : prp.duration),
            callback: () => { emt('close'); rev(true) }
        })
    }))
})
</script>