import { app } from "@/tool/http/http"
import { query_build_options } from "../plugins/vue_query"
import { useQueryClient, type FetchQueryOptions, type QueryObserverOptions, type QueryOptions } from "@tanstack/vue-query"

const query_key_global = [ 'app', 'global', 'one' ]

// 提取网站全局
const api_global = (options?: QueryObserverOptions): FetchQueryOptions => ({
    queryKey: query_key_global,
    queryFn: async () => {
        const src = await app.get('global', null, null)
        return src
    },
    ...query_build_options(10, options)
})

export const startApiGlobal = () => {
    const queryClient = useQueryClient()
    queryClient.prefetchQuery(api_global())
}