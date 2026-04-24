import { APP_PAN_LOGIN } from "@/conf/conf-app"
import pan_tooi from "@/tool/app/pan_tooi"

// 401
export const for_net_when_401 = (tag: string) => {
    pan_tooi.open(APP_PAN_LOGIN)
}