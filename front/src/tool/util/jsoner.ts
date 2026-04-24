
import { appState } from '@/memory/global'

// 例子：{'codeParam':'Bdate','nameParam':''}
// 例子：[{label: '大货',value: '大货'},{ label: '样布',value: '样布'}]


const stringify = <T> (src: T): string => JSON.stringify( src )

const parse = <T> (src: string | undefined): T | null => {
    try {
        if (!src) return null
        try {
            src = src.toString().trim()
            return JSON.parse(src)
        } 
        catch (err) {
            if (appState.document) {
                return eval('(' + src + ')')
            }
            /*
            let evai = null; // new Interpreter({})
            console.log('eval5 ->', src)
            // return eval('(' + src + ')')
            const res = evai.evaluate(src.trim().trim())
            console.log('res =', res, typeof res, res instanceof Object)
            */
            return <T>{ }
        }
    } catch (err) { 
        console.log('弹出错误，json 序列化有问题')
        return <T>{ } }
}


const duplicate = <T> (src: T): T | null => parse( stringify( src ) )

const __replace_str = (__e: String) => {
    return __e.replace(/'/gi, '"')
}

const __ser_colon_item = (__cn: string): string => {

    if (__cn.startsWith("'")) {
        // __cn =__replace_str(__cn)
        // console.log('_es 01 =', __cn)
    }
    else if (__cn.startsWith('"')) {
        // console.log('_es 02 =', __cn)
    }
    else {
        __cn = "'" + __cn + "'"
        // __cn =__replace_str(__cn)
        console.log('_es 03 =', __cn)
    }
    return __cn
}

const __ser_spiite_item = (_item: string): string => {
    // 是否有 { 开头
    let _has_open = false
    // 是否有 } 结尾
    let _has_close = false

    const _LEN = _item.length

    // 字符串必须长
    if (_LEN > 2) {

        // 先走 {
        if (_item.startsWith('{')) {
            _has_open = true
            _item = _item.substring(1, _LEN)
        } 

        // 再 : 切割
        const _colons: string[] = _item.split(":")

        // 再 雪莲花 : list
        _colons.map((__e: string, i: number) => {

            _has_close = false
            const __LEN = __e.length

            // 先处理 KEY
            if (i == 0) {
                __e = __ser_colon_item(__e)
            }
            // 再处理 VALUE
            else if (i == 1) {

                if (__e.endsWith("}")) {
                    _has_close = true
                    __e = __e.substring(0, __LEN - 1)
                }

                // 值
                // 需要区分 数字 / 字符串
                // 但是统一使用 字符串
                __e = __ser_colon_item(__e)
                
                if (_has_close) {
                    __e = __e + '}'
                    console.log('_es } =', __e)
                }
            }
            else {
                console.log('这是个垃圾 JSON 格式字符串, 根据 : 切割失败')
            }

            return __e
        })

        // 最后 整合
        let _res_colons: string = _colons.join(":")
        if (_has_open) {
            _res_colons = '{' + _res_colons
        }
        
        // 在此返回
        return _res_colons
    }
    else {
        console.log('报错，垃圾字符串')
    }
    return ''
}

const test_example = (src: string) => {
    
		let __json_str = src ? src.toString().trim().trim() : ''

		// 先用 : 分割
		const json_split_arr_1 = __json_str.split(',')
		console.log(json_split_arr_1)
		//
		const _step_1 = json_split_arr_1.map((jsa1) => {
			let e = jsa1 != undefined ? jsa1.toString().trim() : '';
            // return __ser_spiite_item(e)
            e = __ser_spiite_item(e)
			console.log(e)
            
            // ,
            // e = e.replace(/\',/gi, '\",')
            // e = e.replace(/,\'/gi, ',\"')
            e = e.replace(/\':\'/gi, '\":\"')
            
            return e
		})

        let _step_2 = _step_1.join(',')

        // :
        // _step_2 = _step_2.replace(/\':\'/gi, '\":\"')
            _step_2 = _step_2.replace(/\',/gi, '\",')
            _step_2 = _step_2.replace(/,\'/gi, ',\"')

        // {}
        _step_2 = _step_2.replace(/\{\'/gi, '\{\"')
        _step_2 = _step_2.replace(/\'\}/gi, '\"\}')

		console.log('res_seriai =', _step_2)
}

export default {
    parse,
    stringify,
    duplicate,
    
    test_example
}