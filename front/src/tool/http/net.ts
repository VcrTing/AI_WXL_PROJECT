import { netser_err, netser_succ } from "./netser"


class NeTooi {
    // 组装 uri
    // 注意，有没有 / 尾巴有时候也会出错
    _uri(api: string, endpoint: string, suffix: string | null = ''): string { return api + '/' + endpoint + (suffix ?  '/' + suffix : '') }

    _headers (jwt: string | null, isF: boolean = false): ONE { 
        const res = <ONE>{ 
            'Content-Type': isF ? `multipart/form-data` : 'application/json' 
        }
        if (jwt) { 
            res['Authorization'] = 'Bearer ' + jwt 
            console.log('-- 启用 TOKEN 访问，Authorization = ', res['Authorization'].substring(0, 20))
            // res['X-Access-Token'] = jwt
            // res['VcrTing-Token'] = jwt
            // res['Access-Control-Request-Headers'] = jwt
        } 
        return res 
    }
    _params (condition: any, res: string = '?'): string {  
        if (JSON.stringify(condition) != '{}') { 
            for (const k in condition) { res += ( k + '=' + condition[k] + '&' ) }
        } return res }

    _config (
        method: 'GET' | 'POST' | 'PUT' | 'DELETE', 
        url: string,
        data: ONE,
        header: ONE, 
        timeout: number
    ) { return { url, data, method, header, timeout, dataType: 'json' } }

    TIMEOUT;
    TIMEOUT_S;
    constructor(timeout_get: number, timeout_pos: number) { this.TIMEOUT = timeout_get; this.TIMEOUT_S = timeout_pos; }

    //
    _config_get(url: string, params: ONE | null, jwt: string = '', is_file: boolean = false) {
        return this._config('GET', url, params ? params : {}, this._headers(jwt, is_file), this.TIMEOUT)
    }
    _config_pos(url: string, data: ONE | null, jwt: string = '', is_file: boolean = false) {
        return this._config('POST', url, data ? data : {}, this._headers(jwt, is_file), this.TIMEOUT_S)
    }
    _config_put(url: string, data: ONE | null, jwt: string = '', is_file: boolean = false) {
        return this._config('PUT', url, data ? data : {}, this._headers(jwt, is_file), this.TIMEOUT_S)
    }
    _config_dei(url: string, data: ONE | null, jwt: string = '', is_file: boolean = false) {
        return this._config('DELETE', url, data ? data : {}, this._headers(jwt, is_file), this.TIMEOUT_S)
    }
}

export class Net extends NeTooi {

    // 网站后端 domain
    domain;
    // 存放 endpoints 的 MAP
    endpoints;
    tag;
    // 获取 JWT 的方法
    jwt;
    // 是否 打印
    is_log;

    constructor(api: string, endpoints: ONE, tag: string, jwt: () => string, timeout_get: number, timeout_pos: number, is_log: boolean) {
        super(timeout_get, timeout_pos);
        this.domain = api; this.endpoints = endpoints; this.jwt = jwt;
        this.is_log = is_log;
        this.tag = tag;
    }

    // 创建 URL
    build_url(url_name: string, url_suffix: string | null = '') { return this._uri(this.domain, this.endpoints[url_name], url_suffix); }

    // 里面使用 uni.request 作请求
    adapter<T = any>(config: UniApp.RequestOptions): NET_RES_PROMISE<T> {
        return new Promise(resolve => {
            uni.request({
                ...config,
                fail: (err) => resolve(netser_err(err, this.tag) as NET_RES<T>),
                success: (res) => {
                    resolve(netser_succ<T>(res, this.tag));
                },
            });
        });
    }
    // get 方法支持泛型
    get<T = any>(
        url_name: string,
        url_suffix: string | null,
        params: ONE | null
    ): NET_RES_PROMISE<T> {
        const __url = this.build_url(url_name, url_suffix);
        const __config = this._config_get(__url, params || {}, this.jwt(), false);
        if (this.is_log) {
            console.log("GET", __url, __config);
        }
        return this.adapter<T>(__config);
    }

    // pos 方法支持泛型
    pos<T = any>(
        url_name: string,
        url_suffix: string | null,
        params: ONE | null
    ): NET_RES_PROMISE<T> {
        // console.log(this.domain, this.endpoints[url_name], this.build_url(url_name, url_suffix));
        const __url = this.build_url(url_name, url_suffix);
        const __config = this._config_pos(__url, params || {}, this.jwt(), false);
        if (this.is_log) {
            console.log("POS", __url, __config);
        }
        return this.adapter<T>(__config);
    }

    // put 方法支持泛型
    put<T = any>(
        url_name: string,
        url_suffix: string | null,
        params: ONE | null
    ): NET_RES_PROMISE<T> {
        // console.log(this.domain, this.endpoints[url_name], this.build_url(url_name, url_suffix));
        const __url = this.build_url(url_name, url_suffix);
        const __config = this._config_put(__url, params || {}, this.jwt(), false);
        if (this.is_log) {
            console.log("PUT", __url, __config);
        }
        return this.adapter<T>(__config);
    }

    // del 方法支持泛型
    del<T = any>(
        url_name: string,
        url_suffix: string | null,
        params: ONE | null
    ): NET_RES_PROMISE<T> {
        // console.log(this.domain, this.endpoints[url_name], this.build_url(url_name, url_suffix));
        const __url = this.build_url(url_name, url_suffix);
        const __config = this._config_dei(__url, params || {}, this.jwt(), false);
        if (this.is_log) {
            console.log("DEL", __url, __config);
        }
        return this.adapter<T>(__config);
    }
}