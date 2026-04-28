<template>
    <app-layout>
        <view>MARK</view>

        <o-button @tap="uniRouter.gopg('money_salary_type')">前往MONEY/SALARY_TYPE</o-button>
    </app-layout>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import AppLayout from '@/cake/layout/AppLayout.vue';
import uniRouter from '@/tool/uni/uni-router';

</script>