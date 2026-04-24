<template>
    <Root>
        <view>
            <slot></slot>
        </view>
        <view>
            <AppBottomBar/>
            <CoTip :msg="apps.tip_msg" :type="apps.tip_type" @close="apps.tipHide()"/>
        </view>
    </Root>
</template>

<script setup lang="ts">
import CoTip from '@/components/tip/CoTip.vue';
import Root from '../Root.vue';
import AppBottomBar from '../bar/AppBottomBar.vue';
import { appStore } from '@/memory/app/app-store';
// const prp = defineProps<{}>()

const apps = appStore()
</script>