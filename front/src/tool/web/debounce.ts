
export const debounce = (func: Function, delay: number = 0) => {
    let timer: number | undefined = undefined
    timer = setTimeout(() => { // 核心
        
        func ? func() : undefined;
        if (timer) clearTimeout(timer); timer = undefined
    }, 
    delay)
}