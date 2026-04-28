
interface StarpiPagerParam {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

interface PageParam {
    page: number
    pageSize: number
}

type Pager = PageParam // StarpiPagerParam