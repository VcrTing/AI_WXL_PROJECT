
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

type HttpResultBackend = UniappHttpResult

