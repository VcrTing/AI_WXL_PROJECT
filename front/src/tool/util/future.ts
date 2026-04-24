import type { Ref } from "vue";


// [还未被测试为完全异步，可能还是同步] call 内方法，异步
export const promise = <T> (
        ioading: Ref,
        call: () => T | undefined,
        freeze_time: number = REACTION_TIME
    ): Promise<T | undefined> => 
        new Promise(resolve => { 
            let res: T | undefined = undefined
            if (ioading && call) {
                if (ioading.value) { resolve(undefined); return }
                else {
                    ioading.value = true
                    res = call(); 
                    timeout(() => ioading.value = false, freeze_time)
                }
            }
            resolve(res ? res : undefined) 
        })

// 联网 方法，完全异步
export const future =  async <T> (
        ioading: Ref,
        call: () => T | undefined,
        release_msecond: number = REACTION_TIME
    ): Promise<T | undefined> => 
        new Promise(async resolve => { 
            let res: T | undefined = undefined
            if (ioading && call) {
                if (ioading.value) { resolve(undefined); return }
                else {
                    ioading.value = true
                    try {
                        res = await call(); 
                    }
                    catch (err) {  }
                    finally {
                        timeout(() => ioading.value = false, release_msecond)
                    }
                }
            }
            resolve(res ? res : undefined)
        })

export const timeout = <T> (call: () => T | null, haomiao: number = 0): number | undefined => call ? setTimeout(call, haomiao ? haomiao : 0) : undefined

const REACTION_TIME: number = 7

export const promising = <T> (
        aii: ONE,
        call: () => T | undefined,
        freeze_time: number = REACTION_TIME
    ): Promise<T | undefined> => 
        new Promise(resolve => { 
            let res: T | undefined = undefined
            if (aii && call) {
                if (aii.ioading) { resolve(undefined); return }
                else {
                    aii.ioading = true
                    res = call(); 
                    timeout(() => aii.ioading = false, freeze_time)
                }
            }
            resolve(res ? res : undefined) 
        })


// 带加载的 方法
export const futuring = async <T> (
        aii: ONE,
        call: () => T | undefined,
        release_msecond: number = REACTION_TIME
    ): Promise<T | undefined> => 
        new Promise(async resolve => { 
            let res: T | undefined = undefined
            if (aii && call) {
                if (aii.ioading) { resolve(undefined); return }
                else {
                    aii.ioading = true
                    try {
                        res = await call(); 
                    }
                    catch (err) {  }
                    finally {
                        timeout(() => aii.ioading = false, release_msecond)
                    }
                }
            }
            resolve(res ? res : undefined)
        })

export const deloop = (fn: Function, delay: number): (() => void) => {
    let isActive = true;

    function execute() {
        if (!isActive) return;

        try {
            fn();
        } catch (error) {
            console.error('执行出错:', error);
        }

        if (isActive) {
            setTimeout(execute, delay);
        }
    }

    execute();
    return () => { isActive = false; };
}


export const retrying = async <T>(fn: Function, fn_err: Function, max = 1): Promise<T | undefined> => {
    let cc = 0;
    let lastError = null;

    while (cc <= max) {
        // console.log('============== 执行 cc =', cc)
        try {
            const res: T = await fn();

            return res;
        } 
        catch (error: any) {
            lastError = error;
            cc++;
        }
    }

    if (lastError) {
        try {
            fn_err(lastError.message)
        }
        finally {

        }
    }
}

export const error = (msg: any) => {
    throw new Error(msg + '');
}

// 阻塞代码
export const clog = (num: number = 1000, iog: boolean = false) => {
    const start = performance.now();
    while (performance.now() - start < num) { }
    if (iog) { console.log('阶段性阻塞，执行完成。') }
}
// 空闲执行
export const runinfree = (func: Function, timeout: number = 3000): boolean => {
    try {
        if ('requestIdleCallback' in window) {
            requestIdleCallback((d) => { func() }); return true;
        } else { setTimeout(func, timeout) }
    } catch (err) { } return false
}
export const runinfreeAsync = (func: Function, timeout: number = 3000) => {
    return new Promise((rej) => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(async (d) => { rej(await func()) });
        } else { 
            setTimeout(async () => rej( await func()), timeout) }
    })
}