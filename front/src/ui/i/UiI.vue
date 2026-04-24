<template>
    <view class="uii fx-c zi-s" :class="clazz">
        <view class="uii-wrapper zi-t" v-if="u.icon_load_status > 0">
            <FontAwesomeIcon class="uii-icon" :class="clazz_i" :icon="[type || 'regular', i]"/>
        </view>
        <view class="uii-loading " v-else>
            <view></view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { uiStore } from '@/memory/app/ui-store';

const prp = defineProps<{ i: string, type?: string, clazz?: string, clazz_i?: string }>()
const u = uiStore()
</script>

<style lang="sass" scoped>
.uii,
.uii-loading,
.uii-wrapper
    display: inline-block
    width: 1em
    height: 1em
    overflow: visible
    position: absolute
    box-sizing: border-box
.uii-icon
    width: 1em
    height: 1em

.uii
    position: relative
.uii-loading,
.uii-wrapper
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
</style>