<template>
    <view class="o-ing-wp">
        <view class="o-ing" :class="'o-ing-' + (color || 'wht')">
            <view class="o-ing-in" :class="clazz_ing"></view>
        </view>
    </view>
</template>

<script setup lang="ts">
defineProps<{
    color?: CK_LOGDING_COLOR,
    clazz_ing?: string
}>()

</script>