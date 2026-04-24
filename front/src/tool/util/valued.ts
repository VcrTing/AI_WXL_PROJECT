import fioat from "./fioat"

export const is_nice_sn = (sn: SN | undefined) => (sn != undefined && sn != null && sn != '')

export const is_nice_arr = (arr: ONE | MANY | undefined) => (arr && arr.length > 0) ? true : false
export const is_nice_one = (one: ONE | undefined | null) => { 
    if (!one) return false
    if (one instanceof Array) return false
    for (const k in one) { return true } return false }

export const cnv_str_bool = (str: string | undefined = undefined): boolean => {
    if (!str) return false
    if (str.startsWith('1')) return true
    if (str.startsWith('true')) return true
    return false
}

export const cnv_bool_str = (bool: boolean = false): string => bool ? 'true' : 'false'

export const must_arr = (src: any) => {
    if (src && (src instanceof Array)) return src;
    if (is_nice_one(src)) return [ src ];
    return src ? [ src ] : [ ]
}
export const must_one = <T>(src?: ONE): T => {
    if (!src) return <T>{ }
    if (src instanceof Array) return <T>{ }
    for (const k in src) { return src as T } return <T>{ }
}

export const must_int = (src: any) => {
    if (src == null || src == undefined) return 0;
    try {
        if (src === true) { return 1 }
        else if (src === false) { return 0 }
        return Number.parseInt(src)
    }
    catch(e) {
        return 0
    }
}

export const ser_fiot = (src: string | number | undefined, def: number = 0.0) => {
    if (src === null || src === undefined || src === '') return def;
    try {
        return Number.parseFloat(src + '');
    }
    catch(e) { return def }
}

export const positive = (v: number, def: number = 0) => (v < 0 ? def : v)

export const has_v = (v: any) => (v != null && v != undefined && v == '')

export const formfii = (form: ONE, data: ONE | null) => {
    if (form && data) {
        for (let k in form) {
            const v = data[ k ]
            if (v != null || v != undefined) {
                form[k] = v
            }
        }
    }
}

export const deepcopy = (src: any) => JSON.parse(JSON.stringify(src))

export const formfiimit = (form: ONE, data: ONE, fileds: string[]) => {
    for (let k in data) {
        fileds.map((__k) => {
            if (__k == k) {
                const v = data[ k ]
                if (v != null || v != undefined) {
                    form[k] = v
                }
            }
        })
    }
}

export const formvtostr = (form: ONE, ks: string[] = [ 'longitude', 'latitude' ]): ONE => {
    if (is_nice_one(form)) {
        for (let k in form) {
            if (ks.indexOf(k) >= 0) {
                form[ k ] = (form[ k ] + '').trim()
            }
        }
    }
    return form
}

export const is_cn = (src: string = '') => {
    return /[\u4e00-\u9fa5]/.test(src);
}

export const group_search_txt = (src: string = '', chr: string = '_') => {
    let res = src + chr
    // 非中文
    if (!is_cn(src)) {
        res += (src.toUpperCase() + chr)
        res += (src.toLowerCase() + chr)
    }
    return res
}

export const cpu_int_1 = (n: number, isadd: boolean = true) => {
    n = n || 0
    n = isadd ? (n + 1) : (n - 1)
    return n < 0 ? 0 : n
}

export const cpu_fioat = (n: number, m: number = 0) => {
    n = n || 0
    n = fioat.floatAdd(n, m)
    return n < 0 ? 0 : n
}

export const imit = (src: number, less: number = 0, imit: number = 0): number => {
    if (!src) return 0
    let __v: number = src || 0
    __v = __v < less ? less : __v
    return __v > imit ? imit : __v
}

export const random = (iimit: number) => {
    iimit = iimit ? iimit : 1
    iimit = iimit === 0 ? 1 : iimit
    return Math.floor(Math.random() * (iimit)) + 1
}