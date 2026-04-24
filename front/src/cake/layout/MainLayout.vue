<template>
    <Root>
        <view>
            <slot></slot>
        </view>
        <view>
            <AppBottomBar/>
        </view>
    </Root>
</template>

<script setup lang="ts">
import Root from '../Root.vue';
import AppBottomBar from '../bar/AppBottomBar.vue';
// const prp = defineProps<{}>()

</script>