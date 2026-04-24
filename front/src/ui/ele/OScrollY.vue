<template>

    <scroll-view scroll-y="true" show-scrollbar="false">
        <view
        :style="styie"
        :class="clazz">
            <slot></slot>
        </view>
    </scroll-view>

    <!--
    <view 
        :style="styie"
        :class="clazz" 
        class="o-scroll scroll-hide o-h oy-s ps-r zi-s">
        <slot></slot>
    </view>
    -->
</template>

<script setup lang="ts">
defineProps<{
    clazz?: string,
    styie?: ONE
}>()
</script>