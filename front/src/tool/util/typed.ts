
export const _TYPE_OBJECT: string = 'object'
export const _TYPE_STRING: string = 'string'

export const is_arr = (src: unknown): src is any[] => Array.isArray(src)

export const is_obj = (src: unknown): src is Record<string, any> =>
    src !== null && typeof src === _TYPE_OBJECT && !Array.isArray(src)

export const is_str = (src: unknown): src is string =>
    typeof src === _TYPE_STRING

export const is_json = (src: any): boolean => {
    if (!src) return false;
    const v: string = (src + '').trim()
    if (v.startsWith('{') || v.startsWith('[')) {
        return true
    }
    return false
} 