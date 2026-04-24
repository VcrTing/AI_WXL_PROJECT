import { business } from "@/tool/http/http";
import net_tool from "@/tool/http/net_tool";

export const serv_bb_master = async (params: ONE): Promise<MANY | string> => {
    let src: NET_RES<MANY> = await business.pos('bb_master_list', null, { params })
    return net_tool.ser_result_many(src)
}