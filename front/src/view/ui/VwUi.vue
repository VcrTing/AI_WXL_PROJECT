<template>
    <view>
        <ui-bg :src="''">
            <view class="">
                <view><button class="btn btn-def py-s px" @tap="func.changeTheme">切换主题，当前主题: {{ ui.theme_name }}</button></view>
            </view>
            <view class="px-row">
                <view class="py">
                    <view class="mr btn btn-app btn-def">提交</view>
                </view>
                <view class="fx-i bg-con con">
                    <view class="h1">标H</view>
                    <view class="h2">标H</view>
                    <view class="h3">标H</view>
                    <view class="h4">标H</view>
                    <view class="h5">标H</view>
                    <view class="h6">标H</view>
                    <view class="h7">标H</view>
                    <view class="h8">标H</view>
                    <view class="h9">标H</view>
                </view>
                <view class="py">
                    <view class="bg-con con">
                        <view class="tih">文字TEXT。this is my love.</view>
                        <view class="tix">[标准] 文字TEXT。this is my love.</view>
                        <view class="tid">文字TEXT。this is my love.</view>
                        <view class="tiw">文字TEXT。this is my love.</view>
                        <view class="tin">文字TEXT。this is my love.</view>
                        <view class="tis">文字TEXT。this is my love.</view>
                        <view class="tit">文字TEXT。this is my love.</view>
                        <view class="sus">文字TEXT。this is my love.</view>
                    </view>
                </view>
                
                <view class="py">
                    <view class="bg-con con">
                        <view @tap="() => (h = 12)" class="fx-c" :style="{
                            'height': (h + 'px')
                        }">监听重排。</view>
                        <view class="row py fx-s">
                            <view class="px-s pri">你好，HELLO.</view>
                            <view class="px-s">
                                <ui-i i="user" clazz="pri"/>
                            </view>
                        </view>
                        <view class="py row fx-s">
                            <view class="px-s d-ib"><button class="btn btn-pri px py-s">主题</button></view>
                            <view class="px-s d-ib"><view class="btn btn-pri px py-s">主题</view></view>
                            <view class="px-s d-ib"><view class="px py-s btn fx-aii-btn-pri">主题</view></view>
                            <view class="px-s d-ib"><view class="px py-s btn btn-pri-txt">主题</view></view>
                        </view>
                        <view class="py row fx-s">
                            <view class="px-s d-ib"><button class="btn btn-pri-out px py-s">主题</button></view>
                            <view class="px-s d-ib"><view class="btn btn-pri-out px py-s">主题</view></view>
                            <view class="px-s d-ib"><view class="btn fx-aii-btn-pri-out px py-s">主题</view></view>
                            <view class="px-s d-ib"><button class="btn btn-pri-iht px py-s">主题</button></view>
                        </view>
                    </view>
                </view>

                <view>
                    <view style="min-height: 60vh"></view>
                </view>
            </view>
        </ui-bg>
    </view>
</template>

<script setup lang="ts">
import { uiStore } from '@/memory/app/ui-store';
import UiBg from '@/ui/easy/UiBg.vue';
import UiI from '@/ui/i/UiI.vue';
import { ref } from 'vue';

const bg = "https://img2.baidu.com/it/u=3022728256,411287705&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1085"
// const prp = defineProps<{}>()
const ui = uiStore()

const h = ref(12)

const func = {
    changeTheme: () => {
        ui.changeThemeName(ui.theme_name == 'dark' ? 'light' : 'dark');
        h.value += 10
    },
}
</script>