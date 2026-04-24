<template>
  <view class="w-100 h-100">
    <!-- 滚动容器：必须指定高度，启用 scroll-y -->
    <scroll-view
      class="w-100 ps-r bg-con" scroll-y :enhanced="true" :show-scrollbar="true"
      :scroll-top="scrollTop"
      @scroll="funn.handleScroll"
      :style="{ height: containerHeight + 'px' }"
    >
      <!-- 占位元素：撑开总高度 -->
      <view class="d-b" :style="{ height: totalHeight + 'px' }"></view>
      
      <!-- 实际渲染区域：绝对定位，通过 transform 偏移到正确位置 -->
      <view
        class="abs-i t-0 w-100"
        :style="{ 
            'will-change': 'transform',
            transform: `translateY(${offsetY}px)` }"
      >
        <slot></slot>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, shallowRef } from 'vue'

const prp = defineProps<{
    data: MANY,
    itemH: number
}>()

const barH = 300

// ----- 虚拟滚动参数 -----
// const itemH = 50               // 每项固定高度（px）
const containerHeight = ref(600)    // 容器高度（动态获取，此处先写死或通过 uni.getSystemInfo 获取）
const scrollTop = ref(0)            // 当前滚动位置
const startIndex = ref(0)           // 起始索引
const endIndex = ref(0)             // 结束索引
const bufferCount = 2               // 缓冲区项数（上下各多渲染几项，提升滚动流畅度）

// ----- 核心计算 -----
// 列表总高度
const totalHeight = computed(() => (prp.data?.length ?? 0) * prp.itemH)
// 可见数据切片
// const visibleData = computed(() => func.computedData(prp.data))
// 偏移量（用于 transform 将内容定位到正确位置）
const offsetY = computed(() => func.computedStart() * prp.itemH)

// ----- 数据加载（保留原有逻辑）-----
const funn = {
    init: () => {
        func.getContainerHeight()
    },
    handleScroll: (e: any) => {
        // 兼容 uni-app 中 scroll-view 的滚动事件参数
        const { scrollTop: st } = e.detail
        scrollTop.value = st
        // 计算起始索引（无缓冲区）
        func.handleScrollIndex(prp.data, st)
    },
}

const func = {
    handleScrollIndex: (list: MANY, scrollTop: number) => {
        const rawStart = Math.floor(scrollTop / prp.itemH)
        const rawEnd = rawStart + Math.ceil(containerHeight.value / prp.itemH)
        startIndex.value = Math.max(0, rawStart)
        endIndex.value = Math.min(list.length ?? 0, rawEnd)
    },
    // 动态获取容器高度（避免硬编码）
    getContainerHeight: () => {
        const systemInfo = uni.getSystemInfoSync()
        // 示例：屏幕高度减去状态栏、导航栏等（根据实际情况调整）
        containerHeight.value = systemInfo.windowHeight - barH // 减去顶部标题栏等高度
    },
    rebuildScroll: () => {
        // 数据加载后重置滚动位置与索引
        scrollTop.value = 0
        startIndex.value = 0
        endIndex.value = Math.ceil(containerHeight.value / prp.itemH)
    },
    computedStart: () => {
        return Math.max(0, startIndex.value - bufferCount)
    },
    computedEnd: (list: MANY | null) => {
       return Math.min(list?.length || 0, endIndex.value + bufferCount)
    },
    computedData: (list: MANY | null) => {
        if (!list) return [ ]
        const start = func.computedStart()
        const end = func.computedEnd(list)
        return list.slice(start, end)
    }
}

nextTick(funn.init)
defineExpose(func)
</script>