

interface HttpResult<T> {
    data: T
    code?: number
    msg?: string
    meta: HttpResultPagination
}
type NET_RES<T = any> = HttpResult<T> | T | string
type NET_RES_PROMISE<T = any> = Promise<NET_RES<T>>


interface AuthResult {
    jwt: string
    user: User
    // phonedata: AppPhoneWX
    // statusCode: number
    // message: string
}

interface IPage<T = any> {
    /** 当前页数据列表 */
    records: T[];
    /** 总记录数 */
    total: number;
    /** 每页大小 */
    size: number;
    /** 当前页码 */
    current: number;
    /** 总页数 */
    pages: number;
}