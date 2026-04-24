
export const uni_get_input_v = (e: ONE = {}): SN => {
    const v = e.detail ? e.detail.value : null
    return (v == null || v == undefined) ? '' : v
}

export const uni_get_select_v = (e: ONE = {}): number => {
    const v = e.detail ? e.detail.value : null
    return (v == null || v == undefined) ? 0 : v
}

export const uni_get_switch_v = (e: ONE = {}): boolean => {
    const v = e.detail ? e.detail.value : null
    return v ? v : false
}

const KEY_CODE_ENTER = 'Enter'

export const uni_key_down_enter = (e: ONE = {}): boolean => {
    if (e.code === KEY_CODE_ENTER || e.key === KEY_CODE_ENTER) {
        return true
    }
      
    // 监听ESC键
    if (e.keyCode === 27) {
    }

    return false
}