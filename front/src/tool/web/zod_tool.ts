
import { z } from 'zod';

export default {
    buildtip: (txt: string, name?: string): { } => {
        return { message: txt }
    },
    nonull: (): { } => {
        return { message: '不为空' }
    },
    forerr: (err: any): string => {
        if (err instanceof z.ZodError) {
            const errs = err.issues || [ ];
            for (let j= 0; j< errs.length; j++ ) {
                const __e = errs[j]
                const __msg = __e.message || '';
                const __path = (__e.path || [ ])
                // console.log('表单验证错误 =', __e, __msg)
                return __path.join('、') + ' ' + __msg;
            }
        }
        // console.log('通过？err =', err)
        return ''
    }
}