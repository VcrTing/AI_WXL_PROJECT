<template>
    <app-layout>
        <vw-auth-login/>
        <vw-master-data/>
    </app-layout>
</template>

<script setup lang="ts">
import AppLayout from '@/cake/layout/AppLayout.vue';
import VwAuthLogin from '@/view/auth/VwAuthLogin.vue';
import VwMasterData from '@/view/master/VwMasterData.vue';

// const prp = defineProps<{}>()

</script>