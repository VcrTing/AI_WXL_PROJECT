<template>
    <view class="w-100 fx-c softer"
    :style="{
        height: h + 'em'
    }">
        <view class="fx-c">
            <CkIoading :color="'tit'"/>
            <text class="pi-s">加载中...</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkIoading from './CkIoading.vue';

const prp = defineProps<{
    h: number
}>()

</script>