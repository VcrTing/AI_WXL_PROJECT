import { tiperr } from "../uni/uni-global"
import { is_obj, is_str } from "../util/typed"

const generate_ipage_def = <T>(current: number = 1, size: number = 0): IPage<T> => ({
    records: <T[]>[],
    total: 0,
    size,
    current,
    pages: 1
})

const ser_result_ipages = <T>(src: NET_RES<IPage<T>>, param: Pager): IPage<T> => {
    if (!is_obj(src)) {
        tiperr('拦截 IPage 错误 = ' + src)
        return generate_ipage_def()
    }
    const res: HttpResult<IPage<T>> = src as HttpResult<IPage<T>>
    if (res.code) { return res.data || generate_ipage_def() }
    return generate_ipage_def()
}

// T
const ser_result_T = <T>(src: NET_RES<T>): T => {
    if (is_obj(src)) {
        if (src && src.code) {
            const res: HttpResult<T> = src as HttpResult<T>
            return (res.data || { }) as T
        }
    }
    tiperr('拦截 T 错误 = ' + src)
    return { } as T
}

// 通用
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
    ser_result_ipages,
    ser_result_T,
    ser_result_many
}