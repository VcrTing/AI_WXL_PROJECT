<template>
    <view class="ps-r mh-1em">
        <view class="ps-r zi-s" :class="clazz"><slot></slot></view>
        <view class="abs-fuii zi-t">
            <image class="w-100 h-100" mode="aspectFill" :src="src"/>
        </view>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    clazz?: string,
    src: string
}>()

</script>