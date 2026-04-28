<template>
    <app-layout>
        <o-button @tap="uniRouter.gopg('home')">前往HOME</o-button>
    </app-layout>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import AppLayout from '@/cake/layout/AppLayout.vue';
import uniRouter from '@/tool/uni/uni-router';

// const prp = defineProps<{}>()

</script>