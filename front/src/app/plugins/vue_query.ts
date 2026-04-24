import type { App } from "vue"


import { VueQueryPlugin, QueryClient, type QueryOptions, type QueryObserverOptions } from '@tanstack/vue-query'

// 秒数
const MS = 1000

export const query_build_options = <TData = unknown>(
  staleMinute: number,
  options?: QueryObserverOptions<TData>
) => ({
  retry: 0,
  keepPreviousData: true,
  staleTime: staleMinute * 60 * MS,
  suspense: false,
  cacheTime: staleMinute * 3 * 60 * MS,
  refetchOnWindowFocus: false,
  ...options,
})

const queryClient = new QueryClient({
    defaultOptions: {
        queries: query_build_options(1)
    }
})

export const install_vue_query = (vue: App) => {
    vue.use(VueQueryPlugin, { queryClient })
}