<template>
    <view>
        <!--
        <view class="abs-t i-0 w-100 zi-x1 soft o-h" 
            :class="
                (orientation == 't') ? ' br-br br-bi ' : ' br-tr br-ti '
            ">
            <slot name="top"></slot>
        </view>
        -->

        <OScrollY
            :clazz="clazz"
            :styie="{
                'height': h ? h : 'auto'
            }">
            
            <slot></slot>
            <!--
            <OSafeAreaBottom v-if="close"/>
            <view v-if="close" class="mh-btn py"><text>&nbsp;</text></view>
            -->
            <view v-if="conf.close" class="py-s"></view>
            <view v-if="conf.close" class="mh-btn py"><text>&nbsp;</text></view>
        </OScrollY>

        <!--
        <view class="abs-bi w-100 zi-x1 softer bg-con" :class="(orientation === 't') ? ' br-br br-bi' : ''">
            <slot name="bom"></slot>
            <OSafeAreaBottom v-if="(orientation !== 't')"/>
        </view>
        -->

        <view v-if="conf.close" class="abs-b i-0 w-100 pan-close soft">
            <view :class="'w-100 fx-c pt pb-x1 mh-btn fx-aii-btn-def'" @tap="pan_tooi.close(conf.idx)">
                <view class="">关闭</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import OScrollY from '../ele/OScrollY.vue';
import pan_tooi from '@/tool/app/pan_tooi';
const prp = defineProps<{ conf: ElePanConf, h?:string }>()

const clazz = computed(() => {
    const src = (prp.conf.dirc == 't') ? ' br-br br-bi ' : ' br-tr br-ti '
    return src + ' pan-con o-h bg-con'
})
</script>