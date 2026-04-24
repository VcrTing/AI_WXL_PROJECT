import { has_v, must_arr, must_one } from "./valued";

const DEV_DOC_ID = 'id'

export const arrhas = (arr: any[], v: string | number = ''): boolean => (arr.indexOf(v) > -1);


export const arrfindi = <T>(arr: T[], tar: number | string, k: string = 'idx'): number => {
    let _i = -1
    for (let i= 0; i< arr.length; i++ ) {
        if ((arr[i] || { })[k] == tar) {
            _i = i
        }
    }
    return _i
}
export const arrfind = <T>(arr: T[], tar: number | string, k: string = 'idx'): T => (arr[ arrfindi(arr, tar, k) ])

export const arrsaixuan = <T extends ONE>(datas: T[], exits: T[], k: string = 'id') => {
    const res: T[] = [ ]
    let __has = false
    for (let j= 0; j< datas.length; j++ ) {
        const __v: string = datas[j][ k ]
        exits.map((e: ONE) => {
            if (__v === e[k]) {
                __has = true
            }
        })
        if (!__has) {
            res.push(datas[j])
        }
        __has = false
    }
    return res
}

export const onecopy = (target: ONE, source: ONE): ONE => {
	for (const k in source) { target[ k ] = source[ k ] }
    return target
}

export const arrimit = <T>(src: MANY, imit: number): T => {
    src = src || [ ]
    imit = imit || 1
    const res = [ ]
    for (let j= 0; j< src.length; j++ ) {
        if (j < imit) {
            res.push(src[j])
        }
    }
    return (res as T)
}

export const arrgotv = (src: MANY, k: string = DEV_DOC_ID) => {
    return must_arr(src).map((e: ONE) => e[k]) //.filter(v => has_v(v))
}

export const arrsort = <T>(src: T, k: string, ahead_small: boolean = false) => {
    return must_arr(src).sort((a: ONE, b: ONE) => {
        return ahead_small ? 
            (a[k] || 0) - (b[k] || 0) :
            (b[k] || 0) - (a[k] || 0)
    })
}

export const arrcoii = (src: MANY, k: string = DEV_DOC_ID) => {
    return src.map((e: ONE) => (e[ k ]))
}

export const arrlen_same = (src: MANY, tar: MANY): boolean => {
    return must_arr(src).length === must_arr(tar).length
}