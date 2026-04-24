import { tiperr } from "../uni/uni-global"
import { is_str } from "../util/typed"

const ser_result_many = (src: NET_RES<MANY>): MANY => {
    if (is_str(src)) {
        tiperr(src + '')
        return [ ]
    }
    else {
        const res: HttpResult<MANY> = src as HttpResult<MANY>
        return res.data || [ ]
    }
}

export default {
    ser_result_many
}