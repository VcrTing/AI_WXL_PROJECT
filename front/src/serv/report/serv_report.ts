import { business } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"

export const serv_sql_select = async (sql: string): Promise<MANY> => {
    let src: NET_RES<MANY> = await business.pos('select', null, { sql })
    return net_tool.ser_result_many(src)
}