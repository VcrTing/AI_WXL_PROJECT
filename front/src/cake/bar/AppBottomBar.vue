<template>
    <OAppBottomBar :mat="mat" clazz="bg-bar">
        <view class="fx-c px-row w-100 ta-c jc-sa">
            <view 
                class="d-ib fx-c br c-p tid app-bottom-bar-item"
                    v-for="(v, i) in bars" :key="i"
                    :class="(code == v.respond_standard_code) ? 'app-bottom-bar-item-iive ' + v.clazz_iive : v.clazz_die"
                    @tap="v.func()"
                >
                <view class="pt-s">
                    <view class="h5 fx-c app-bottom-bar-item-icon">
                        <UiI clazz="" :i="v.icon" :type="v.icon_type"/>
                    </view>
                    <view v-if="v.tit" class="mw-3em px-s pt-t soft fx-c">
                        <view class="fs-s app-bottom-bar-item-txt">{{ v.tit }}</view>
                    </view>
                </view>
            </view>
        </view>
    </OAppBottomBar>
</template>

<script setup lang="ts">
import uniRouter from '@/tool/uni/uni-router';
import { onLaunch } from '@dcloudio/uni-app';
import { computed, reactive } from 'vue';
import OAppBottomBar from './outter/OAppBottomBar.vue';
import { APP_BAR } from '@/conf/conf-app';
import UiI from '@/ui/i/UiI.vue';

onLaunch(() => { uni.hideTabBar({ success: () => { } }) });
defineProps<{ mat?: boolean }>()

const bars = APP_BAR

const code = computed((): string => {
    const info: Page.PageInstance = uniRouter.info()
    const n: string = info.route ? info.route : ''
    const src: CoAppBottomBarItem[] = bars
    for (let i= 0; i< src.length; i ++) {
        const _code: string = src[i].respond_standard_code
        if (n.indexOf(_code) > -1) { return _code }
    }
    return ''
})
</script>