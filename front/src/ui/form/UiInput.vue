<template>
    <view :class="label ? (' fx-s inp inp-line app-mh bc-inp-b') : ''">
        <view class="tix pr-s" v-if="label">{{ label }}</view>
        <view class="fx-1"><slot></slot></view>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    // modelValue: any,
    label?: string
}>()

/*
// 2. 声明事件：必须命名为 update:modelValue
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// 3. 通过计算属性实现双向绑定（可选，也可直接 emit）
const localValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
*/
</script>