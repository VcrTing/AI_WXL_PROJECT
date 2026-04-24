<template>
    <view>
        <OPan :conf="APP_PAN_LOGIN">
            <OPanInnerY :conf="APP_PAN_LOGIN">
                <VwAuthLogin/>
            </OPanInnerY>
        </OPan>
    </view>
</template>

<script setup lang="ts">
import OPan from '@/ui/pan/OPan.vue';
import OPanInnerY from '@/ui/pan/OPanInnerY.vue';
import VwAuthLogin from './VwAuthLogin.vue';
import { APP_PAN_LOGIN } from '@/conf/conf-app';

// const prp = defineProps<{}>()

const funn = {

}


</script>