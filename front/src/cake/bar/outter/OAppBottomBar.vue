<template>
    <view>
        <view class="o-app-bottom-bar">
            <view class="mh-app-bottom-bar" :class="clazz">
                <slot></slot>
                <view></view>
            </view>
        </view>

        <view v-if="mat" class="mh-app-bottom-bar"></view>
    </view>
</template>

<script setup lang="ts">
// const prp = defineProps<{}>()
defineProps<{
    mat?: boolean,
    clazz?: string
}>()
</script>