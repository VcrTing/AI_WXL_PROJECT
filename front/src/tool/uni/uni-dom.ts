const __get_current = (e: ONE = { }) => (e.currentTarget || { })
const __get_detail = (e: ONE = { }) => (e.detail || { })

const get_scroll_top = (e: ONE) => (__get_detail(e).scrollTop || 0)

const get_scroll_h = (e: ONE) => (__get_detail(e).scrollHeight || 0)


const get_query = (that: any) => {
    return uni.createSelectorQuery() //.in(that)
}

const run_get_rect = (that: any, domid: string, call: Function) => {
    const qr = get_query(that);
    if (qr) {
        qr.select('#' + domid).boundingClientRect(rct => {
            if (call) call(rct)
        }).exec()
    }
}

export default {
    get_scroll_top,
    get_scroll_h,
    get_query,
    run_get_rect
}