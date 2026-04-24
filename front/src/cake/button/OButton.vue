<template>
    <view class="btn bd tils fx-c ani-scaie-aii c-p" :class="cls">
        <view v-if="!weak" class="ts mr" :class="ioading ? 'o-o-s' : 'o-o-h'">
            <CkIoading/>
        </view>
        <slot></slot>
        <view v-if="!weak" class="mi o-ing-wp"></view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CkIoading from '../content/ioading/CkIoading.vue';

const prp = defineProps<{ 
    clazz?: string,
    weak?: boolean,
    color?: O_BUTTON_COLOR,
    ioading?: boolean
}>()

const cls = computed(() => {
    const cor = 'btn-' + (prp.color ? prp.color : 'pri')
    return cor + ' ' + prp.clazz + ' ' + (prp.weak ? '' : ' btn-app')
})
    // return prp.weak ? (cor + ' ' + prp.clazz) : (cor + ' py-s br-rnd px ' + prp.clazz)
</script>
