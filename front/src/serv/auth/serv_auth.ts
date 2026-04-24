import { zodAuth, type Auth } from "@/app/zod/zod_entity_user"
import vid_of_serv from "@/app/zodvid/vid_of_serv"
import { bkd } from "@/tool/http/http"

export const serv_login = async (username: string, password: string): Promise<Auth | string> => {
    let src: NET_RES<Auth> = await bkd.pos('login', null, { username, password })
    return vid_of_serv.for_auth<Auth>(zodAuth, src);
}