import { bkd } from "@/tool/http/http"
import { query_build_options } from "../plugins/vue_query"
import { useQueryClient, type FetchQueryOptions, type QueryObserverOptions } from "@tanstack/vue-query"
import { userStore } from "@/memory/user/user-store"
import { serv_login } from "@/serv/auth/serv_auth"

// 登录查询的唯一标识 key（可按需加入 username 使其独立）
const query_key_login = ['auth', 'login']

/**
 * 登录查询配置（用于预取）
 * @param username 用户名
 * @param password 密码
 * @param options 额外的查询观察者选项
 * @returns FetchQueryOptions 对象
 */
const api_auth_login = (
  username: string,
  password: string,
  options?: QueryObserverOptions
): FetchQueryOptions => ({
  queryKey: [...query_key_login, username],   // 用 username 区分不同用户的缓存
  queryFn: async () => {
    // 调用登录接口，注意这里假设 app.post 接受 (url, data, config) 三个参数
    const response = await serv_login(username, password)
    // 可根据实际接口返回结构调整（例如只返回 token 或用户信息）
    return response
  },
  // 登录数据一般不需要长时间缓存，可设置 staleTime 为 0
  ...query_build_options(0, options)
})

/**
 * 主动触发登录预取（例如在应用启动或路由守卫中调用）
 * @param username 用户名
 * @param password 密码
 */
export const startApiLogin = (username: string = '', password: string = '') => {
  const queryClient = useQueryClient()
  // 立即预取登录数据，结果会存入缓存
  if (username == '') {
    const us = userStore()
    username = us.auth_username
    password = us.auth_password
  }
  //
  queryClient.prefetchQuery(api_auth_login(username, password))
}