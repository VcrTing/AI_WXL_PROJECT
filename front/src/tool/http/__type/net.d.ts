
interface UniAppHttpError {
    errMsg: string
}

interface UniappHttpResult {
    data: HttpResult
    errMsg: string
    statusCode: number
}
interface HttpResultPagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

interface AuthResult {
    jwt: string
    user: User
    // phonedata: AppPhoneWX
    // statusCode: number
    // message: string
}

type HttpResultBackend = UniappHttpResult


interface HttpResult<T> {
    data: T
    code?: number
    msg?: string
    meta: HttpResultPagination
}
type NET_RES<T = any> = HttpResult<T> | T | string
type NET_RES_PROMISE<T = any> = Promise<NET_RES<T>>
