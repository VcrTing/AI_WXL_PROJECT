<template>
    <view>
        <view v-for="(v, i) in bars">
            <view v-if="v.type=='input'">
                <o-input :label="v.label">
                    <input class="" v-model="v.__v" :placeholder="v.placeholder"/>
                </o-input>
            </view>
        </view>
        <view>
            <o-button color="pri" :ioading="aii.ioading" @tap="func.submit">搜索</o-button>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OInput from '@/ui/form/OInput.vue';
import { reactive, ref, watch } from 'vue';

const prp = defineProps<{
    bars: CoFilterBars
}>()
const searchitem = ref()

const aii = reactive({
    ioading: false
})

const func = {
    submit: () => {

    },
    reset: () => {

    }
}

watch(() => prp.bars, () => {
    console.log('内部发生变动 bar =', prp.bars)
},
{
    deep: true
})
</script>