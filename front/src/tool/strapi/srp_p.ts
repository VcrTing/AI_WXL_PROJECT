import { DEV_CREATE_AT } from "@/conf/conf-dev"

const PAGER_SIZE_DEF = 10

const build_param_pager = (pager: Pager) => {
    return {
        'pagination[page]': pager.page || 1,
        'pagination[pageSize]': pager.pageSize || PAGER_SIZE_DEF
    }
}


const build_param = (param: ONE, pager: Pager, relations: string[]) => {
    let res = <ONE>{ ...param, ...build_param_pager(pager) }
    relations.map(e => {
        res['populate[' + e + '][fields]'] = '*';
        return e;
    });
    return res;
}

const __sort = (t: ONE = { }, k: string = DEV_CREATE_AT, isasc: boolean = false) => {
    t['sort'] = k + ':' + (isasc ? 'asc' : 'desc')
}

const __sorts = (t: ONE = { }, options: MANY = [ ]) => {
    options.map((e: ONE) => {
        const __K: string = e['K'] || DEV_CREATE_AT
        const __ASC: boolean = e['ASC']
        if (__K) {
            t['sort'] = __K + ':' + (__ASC ? 'asc' : 'desc')
        }
    })
}

const __kv = (t: ONE, f: string, k: string, v: string | number) => {
    const __K: string = 'filters[' + k + '][$' + f + ']'
    t[ __K ] = v
}

// {}, filters[id][$in], [ 0, 1 ]
const __eq = (src: ONE , k: string, v: string | number ) => __kv(src, 'eq', k, v)
const __ne = (src: ONE , k: string, v: string | number ) => __kv(src, 'ne', k, v)
const __gt = (src: ONE , k: string, v: string | number ) => __kv(src, 'gt', k, v)
const __like = (src: ONE , k: string, v: string | number ) => __kv(src, 'contains', k, v)
//
const build_filter_in = (target: ONE , key_prefix: string, ins: any[] ) => {
    const __K: string = 'filters[' + key_prefix + '][$in]'
    ins.map((e, i) => {
        const k = __K + '[' + i + ']'
        target[k] = e
    })
    return target
}

export default {
    __eq, __ne, __gt, __like, 
    __sort, __sorts,
    build_filter_in,
    build_param_pager,
    build_param
}