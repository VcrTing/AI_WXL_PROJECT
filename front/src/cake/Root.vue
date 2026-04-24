<template>
    <view class="o-root w-100 h-100 fs-global ff-global o-h" :class="clazz">
        <view class="bg-pag w-100 h-100 o-s-y scroii-hide">
            <slot></slot>
        </view>

        <vw-auth-login-pan/>
    </view>
</template>

<script setup lang="ts">
import { uiStore } from '@/memory/app/ui-store';
import VwAuthLoginPan from '@/view/auth/VwAuthLoginPan.vue';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const ui = uiStore()

const clazz = computed(() => {
    return 'o-' + ui.theme_name
})
</script>
