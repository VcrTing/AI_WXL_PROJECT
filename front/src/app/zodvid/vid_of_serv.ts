import zod_tool from "@/tool/web/zod_tool"
import type { ZodObject } from "zod"

// 联网登录结果验证
const for_auth = <T>(zodobj: ZodObject, data: NET_RES<T>): T | string => {
    let zs = zodobj.safeParse(data)
    if (zs.success) { return zs.data as T }
    return zod_tool.forerr(zs.error)
}

export default {
    for_auth
}