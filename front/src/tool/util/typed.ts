
export const _TYPE_OBJECT: string = 'object'
export const _TYPE_STRING: string = 'string'

export const is_arr = (src: ONE | ANYS | null) => src && (src instanceof Array)
export const is_obj = (src: any) => src && (typeof src === _TYPE_OBJECT)
export const is_str = (src: any) => src && (typeof src === _TYPE_STRING)

export const is_json = (src: any): boolean => {
    if (!src) return false;
    const v: string = (src + '').trim()
    if (v.startsWith('{') || v.startsWith('[')) {
        return true
    }
    return false
} 